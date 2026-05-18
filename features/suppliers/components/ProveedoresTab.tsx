"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"
import { useProveedores } from "../hooks/use-proveedores"
import { NuevoProveedorDialog } from "./NuevoProveedorDialog"
import { ProveedorDetalle } from "./ProveedorDetalle"
import type { ProveedorConSaldo } from "../types"

interface Props {
  puestoId: string | null
}

function formatFecha(iso: string | null) {
  if (!iso) return "—"
  const d = new Date(iso)
  const months = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"]
  return `${d.getDate()} ${months[d.getMonth()]}`
}

function ProveedorCard({
  proveedor,
  onClick,
}: {
  proveedor: ProveedorConSaldo
  onClick: () => void
}) {
  const saldo = Number(proveedor.saldo_pendiente)
  const alDia = saldo <= 0

  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-2xl bg-white px-4 py-4 text-left shadow-sm"
    >
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-semibold text-gray-800">{proveedor.nombre}</span>
        <span className="text-xs text-gray-400">
          Último: {formatFecha(proveedor.ultima_transaccion)}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-end">
          <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">
            {alDia ? "Al día" : "Debe"}
          </span>
          <span className={`text-sm font-bold ${alDia ? "text-[#2D6A4F]" : "text-[#C04422]"}`}>
            S/ {saldo.toFixed(2)}
          </span>
        </div>
        <ChevronRight size={16} className="text-gray-300" />
      </div>
    </button>
  )
}

export function ProveedoresTab({ puestoId }: Props) {
  const [nuevoOpen, setNuevoOpen] = useState(false)
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState<string | null>(null)

  const { data: proveedores = [], isLoading } = useProveedores(puestoId)

  if (proveedorSeleccionado) {
    return (
      <ProveedorDetalle
        proveedorId={proveedorSeleccionado}
        puestoId={puestoId}
        onBack={() => setProveedorSeleccionado(null)}
      />
    )
  }

  const totalDeuda = proveedores.reduce((sum, p) => sum + Math.max(0, Number(p.saldo_pendiente)), 0)

  return (
    <div className="flex flex-1 flex-col px-5 pt-5">
      {/* Resumen total */}
      <div className="mb-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400">
          Debo en total
        </p>
        <p className="text-4xl font-bold text-[#C04422]">S/ {totalDeuda.toFixed(2)}</p>
        <p className="mt-0.5 text-sm text-gray-400">
          {proveedores.length} {proveedores.length === 1 ? "proveedor" : "proveedores"}
        </p>
      </div>

      {/* Encabezado lista */}
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400">
          Mis proveedores
        </p>
        <button
          onClick={() => setNuevoOpen(true)}
          className="rounded-xl bg-[#C04422] px-4 py-2 text-xs font-semibold text-white"
        >
          + Nuevo
        </button>
      </div>

      {/* Lista */}
      {isLoading ? (
        <div className="flex flex-1 items-center justify-center">
          <span className="text-sm text-gray-400">Cargando...</span>
        </div>
      ) : proveedores.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2">
          <p className="text-sm text-gray-400">No tienes proveedores aún</p>
          <button
            onClick={() => setNuevoOpen(true)}
            className="text-sm font-semibold text-[#C04422]"
          >
            + Agregar proveedor
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {proveedores.map((p) => (
            <ProveedorCard
              key={p.id}
              proveedor={p}
              onClick={() => setProveedorSeleccionado(p.id)}
            />
          ))}
        </div>
      )}

      <NuevoProveedorDialog
        open={nuevoOpen}
        onOpenChange={setNuevoOpen}
        puestoId={puestoId}
      />
    </div>
  )
}
