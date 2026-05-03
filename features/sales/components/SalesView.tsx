"use client"

import { useState, useEffect } from "react"
import { TABS, type Tab } from "../types"
import { usePuesto } from "../hooks/use-puesto"
import { usePuestos } from "../hooks/use-puestos"
import { useVentasHoy } from "../hooks/use-ventas-hoy"
import { VenderTab } from "./VenderTab"
import { ResumenTab } from "@/features/reports/components/ResumenTab"

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
  const [activeTab, setActiveTab] = useState<Tab>("Vender")
  const { puestoId, selectPuesto, hydrated } = usePuesto()
  const { data: puestos = [] } = usePuestos()

  // Auto-select first puesto on first visit
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
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Locería</h1>
          <span className="text-sm text-gray-400">{formatDate()}</span>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-5">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`mr-6 border-b-2 pb-3 pt-3 text-sm transition-colors -mb-px ${
                activeTab === tab
                  ? "border-[#C04422] font-semibold text-[#C04422]"
                  : "border-transparent font-medium text-gray-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Vender" ? (
          <VenderTab
            puestos={puestos}
            puestoId={activePuestoId}
            puestoNombre={activePuesto?.nombre ?? ""}
            selectPuesto={selectPuesto}
            totalHoy={totalHoy}
          />
        ) : activeTab === "Resumen" ? (
          <ResumenTab />
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-sm text-gray-400">{activeTab} (próximamente)</p>
          </div>
        )}
      </div>
    </div>
  )
}
