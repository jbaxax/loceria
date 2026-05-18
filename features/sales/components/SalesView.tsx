"use client"

import { useEffect } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { TABS } from "../types"
import { usePuesto } from "../hooks/use-puesto"
import { usePuestos } from "../hooks/use-puestos"
import { useVentasHoy } from "../hooks/use-ventas-hoy"
import { VenderTab } from "./VenderTab"
import { ResumenTab } from "@/features/reports/components/ResumenTab"
import { ProveedoresTab } from "@/features/suppliers/components/ProveedoresTab"

function formatDate() {
  const d = new Date()
  const days = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"]
  const months = [
    "ene", "feb", "mar", "abr", "may", "jun",
    "jul", "ago", "sep", "oct", "nov", "dic",
  ]
  return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]}.`
}

export function SalesView() {
  const { puestoId, selectPuesto, hydrated } = usePuesto()
  const { data: puestos = [] } = usePuestos()

  useEffect(() => {
    if (hydrated && !puestoId && puestos.length > 0) {
      selectPuesto(puestos[0].id)
    }
  }, [hydrated, puestoId, puestos, selectPuesto])

  const activePuestoId = puestoId ?? puestos[0]?.id ?? null
  const activePuesto = puestos.find((p) => p.id === activePuestoId)
  const { data: totalHoy = 0 } = useVentasHoy(activePuestoId, hydrated)

  return (
    <div className="flex min-h-screen justify-center bg-[#EDE8E2]">
      <div className="flex w-full max-w-md flex-col bg-[#FAF8F5] min-h-screen">

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-6 pb-1">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Locería Walter</h1>
          <span className="text-sm text-gray-400">{formatDate()}</span>
        </div>

        <Tabs defaultValue="Vender" className="flex flex-1 flex-col">
          <TabsList
            variant="line"
            className="h-auto w-full justify-start gap-0 rounded-none bg-transparent  pb-0"
          >
            {TABS.map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="flex-1 rounded-none pb-3 pt-3 text-sm font-medium text-gray-400
                  data-[state=active]:bg-transparent data-[state=active]:text-[#C04422]
                  data-[state=active]:font-semibold data-[state=active]:shadow-none
                  after:bg-[#C04422]"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="Vender" className="mt-0 flex flex-1 flex-col">
            <VenderTab
              puestos={puestos}
              puestoId={activePuestoId}
              puestoNombre={activePuesto?.nombre ?? ""}
              selectPuesto={selectPuesto}
              totalHoy={totalHoy}
            />
          </TabsContent>

          <TabsContent value="Resumen" className="mt-0 flex flex-1 flex-col">
            <ResumenTab />
          </TabsContent>

          <TabsContent value="Proveedores" className="mt-0 flex flex-1 flex-col">
            <ProveedoresTab puestoId={activePuestoId} />
          </TabsContent>
        </Tabs>

      </div>
    </div>
  )
}
