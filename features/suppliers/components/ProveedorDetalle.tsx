"use client"

import { useState } from "react"
import { ChevronLeft, Plus, Minus } from "lucide-react"
import { useProveedorDetalle } from "../hooks/use-proveedor-detalle"
import { useEliminarProveedor } from "../hooks/use-eliminar-proveedor"
import { NuevaDeudaDialog } from "./NuevaDeudaDialog"
import { RegistrarPagoDialog } from "./RegistrarPagoDialog"
import { EditarProveedorDialog } from "./EditarProveedorDialog"
import type { TransaccionRecord } from "../types"

interface Props {
  proveedorId: string
  puestoId: string | null
  onBack: () => void
}

function formatFecha(iso: string) {
  const d = new Date(iso)
  const months = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"]
  return `${d.getDate()} ${months[d.getMonth()]}`
}

function TransaccionItem({ t }: { t: TransaccionRecord }) {
  const esDeuda = t.tipo === "deuda"
  return (
    <div className="flex items-center gap-3 py-3">
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white ${
          esDeuda ? "bg-[#C04422]" : "bg-[#2D6A4F]"
        }`}
      >
        {esDeuda ? <Plus size={14} /> : <Minus size={14} />}
      </div>
      <div className="flex flex-1 flex-col">
        <span className="text-sm font-semibold text-gray-800">
          {esDeuda ? "Deuda" : "Pago"}
        </span>
        {t.nota && <span className="text-xs text-gray-400">{t.nota}</span>}
      </div>
      <div className="flex flex-col items-end gap-0.5">
        <span className={`text-sm font-bold ${esDeuda ? "text-[#C04422]" : "text-[#2D6A4F]"}`}>
          {esDeuda ? "+" : "-"}S/ {Number(t.monto).toFixed(2)}
        </span>
        <span className="text-xs text-gray-400">{formatFecha(t.created_at)}</span>
      </div>
    </div>
  )
}

export function ProveedorDetalle({ proveedorId, puestoId, onBack }: Props) {
  const [deudaOpen, setDeudaOpen] = useState(false)
  const [pagoOpen, setPagoOpen] = useState(false)
  const [editarOpen, setEditarOpen] = useState(false)
  const [confirmEliminar, setConfirmEliminar] = useState(false)

  const { saldo, transacciones } = useProveedorDetalle(proveedorId)
  const { mutate: eliminar, isPending: eliminando } = useEliminarProveedor(puestoId)

  const proveedor = saldo.data
  const lista = transacciones.data ?? []

  const handleEliminar = () => {
    if (!confirmEliminar) {
      setConfirmEliminar(true)
      return
    }
    eliminar(proveedorId, { onSuccess: onBack })
  }

  if (!proveedor) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <span className="text-sm text-gray-400">Cargando...</span>
      </div>
    )
  }

  const saldoPendiente = Number(proveedor.saldo_pendiente)
  const totalDeuda = Number(proveedor.total_deuda)
  const totalPagado = Number(proveedor.total_pagado)
  const alDia = saldoPendiente <= 0

  return (
    <div className="flex flex-1 flex-col px-5 pt-4">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm font-medium text-gray-500"
        >
          <ChevronLeft size={18} />
          <span className="font-semibold text-gray-800">{proveedor.nombre}</span>
        </button>
        <button
          onClick={() => setEditarOpen(true)}
          className="rounded-xl border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-gray-700"
        >
          Editar
        </button>
      </div>

      {/* Saldo card */}
      <div
        className={`mb-4 rounded-2xl px-5 py-4 ${
          alDia ? "bg-[#D1FAE5]" : "bg-[#FEE2E2]"
        }`}
      >
        <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em] text-gray-500">
          Saldo pendiente
        </p>
        <p className={`text-3xl font-bold ${alDia ? "text-[#2D6A4F]" : "text-[#C04422]"}`}>
          S/ {saldoPendiente.toFixed(2)}
        </p>
        <div className="mt-2 flex gap-4 text-xs text-gray-500">
          <span>
            Total deuda: <strong className="text-gray-700">S/ {totalDeuda.toFixed(2)}</strong>
          </span>
          <span>
            Pagado: <strong className="text-gray-700">S/ {totalPagado.toFixed(2)}</strong>
          </span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="mb-6 flex gap-3">
        <button
          onClick={() => setDeudaOpen(true)}
          className="flex-1 rounded-2xl border-2 border-[#C04422] py-3.5 text-sm font-semibold text-[#C04422] transition-colors active:bg-[#FEE2E2]"
        >
          + Registrar deuda
        </button>
        <button
          onClick={() => setPagoOpen(true)}
          className="flex-1 rounded-2xl bg-[#2D6A4F] py-3.5 text-sm font-semibold text-white transition-opacity active:opacity-80"
        >
          ✓ Registrar pago
        </button>
      </div>

      {/* Historial */}
      <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400">
        Historial
      </p>

      {lista.length === 0 ? (
        <p className="py-6 text-center text-sm text-gray-400">Sin transacciones aún</p>
      ) : (
        <div className="flex flex-col divide-y divide-gray-100">
          {lista.map((t) => (
            <TransaccionItem key={t.id} t={t} />
          ))}
        </div>
      )}

      <div className="flex-1" />

      {/* Eliminar */}
      <div className="py-6">
        <button
          onClick={handleEliminar}
          disabled={eliminando}
          className={`w-full text-sm transition-colors ${
            confirmEliminar ? "font-semibold text-red-600" : "text-gray-400"
          }`}
        >
          {eliminando
            ? "Eliminando..."
            : confirmEliminar
            ? "¿Confirmar eliminación?"
            : "Eliminar proveedor"}
        </button>
        {confirmEliminar && (
          <button
            onClick={() => setConfirmEliminar(false)}
            className="mt-2 w-full text-sm text-gray-400"
          >
            Cancelar
          </button>
        )}
      </div>

      <NuevaDeudaDialog
        open={deudaOpen}
        onOpenChange={setDeudaOpen}
        proveedorId={proveedorId}
        proveedorNombre={proveedor.nombre}
      />
      <RegistrarPagoDialog
        open={pagoOpen}
        onOpenChange={setPagoOpen}
        proveedorId={proveedorId}
        proveedorNombre={proveedor.nombre}
      />
      <EditarProveedorDialog
        open={editarOpen}
        onOpenChange={setEditarOpen}
        proveedorId={proveedorId}
        nombreActual={proveedor.nombre}
      />
    </div>
  )
}
