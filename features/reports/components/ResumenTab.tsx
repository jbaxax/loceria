"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { DatePiker, isSameDay } from "@/components/shared/inputs/DatePiker"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useResumenDia } from "../hooks/use-resumen-dia"
import { useDeleteVenta } from "../hooks/use-delete-venta"
import type { VentaItem } from "../types"

const MONTHS = [
  "ene", "feb", "mar", "abr", "may", "jun",
  "jul", "ago", "sep", "oct", "nov", "dic",
]

function totalLabel(date: Date): string {
  const today = new Date()
  if (isSameDay(date, today)) return "TOTAL HOY"
  return `TOTAL ${date.getDate()} ${MONTHS[date.getMonth()].toUpperCase()}.`
}

function startOfToday(): Date {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

function toDateKey(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}

interface DeleteItemDialogProps {
  item: VentaItem
  onConfirm: () => void
}

function DeleteItemDialog({ item, onConfirm }: DeleteItemDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          className="text-gray-300 transition-colors hover:text-red-400"
          aria-label="Eliminar venta"
        >
          <X size={14} />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>¿Eliminar esta venta?</AlertDialogTitle>
          <AlertDialogDescription>
            {item.producto} ×{item.cantidad} — S/ {item.total.toFixed(2)}. Esta acción no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={onConfirm}>
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export function ResumenTab() {
  const [selectedDate, setSelectedDate] = useState<Date>(startOfToday)
  const { data: resumen, isLoading } = useResumenDia(selectedDate)
  const { mutate: deleteVenta } = useDeleteVenta(toDateKey(selectedDate))

  const totalGeneral = resumen?.totalGeneral ?? 0
  const puestos = resumen?.puestos ?? []

  return (
    <div className="flex flex-1 flex-col overflow-y-auto px-5 py-5 gap-5">

      {/* Date picker */}
      <div>
        <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400">
          Ver ventas del día
        </p>
        <DatePiker value={selectedDate} onChange={setSelectedDate} />
      </div>

      {/* Total general */}
      <div>
        <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400">
          {totalLabel(selectedDate)}
        </p>
        <p className="text-4xl font-bold tracking-tight text-gray-900">
          S/ {totalGeneral.toFixed(2)}
        </p>
      </div>

      {/* Por puesto */}
      {puestos.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {puestos.map((p) => (
            <div key={p.puestoId} className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
              <p className="mb-1 text-xs text-gray-500">{p.nombre}</p>
              <p className="text-xl font-bold text-gray-900">S/ {p.total.toFixed(2)}</p>
              <p className="mt-1 text-xs text-gray-400">
                {p.cantidadVentas} {p.cantidadVentas === 1 ? "venta" : "ventas"}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Detalle */}
      {puestos.length > 0 ? (
        <div>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400">
            Detalle
          </p>
          <div className="flex flex-col gap-3">
            {puestos.map((p) => (
              <div
                key={p.puestoId}
                className="overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm"
              >
                {/* Puesto header */}
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm font-semibold text-gray-700">{p.nombre}</span>
                  <span className="text-sm font-bold text-[#C04422]">S/ {p.total.toFixed(2)}</span>
                </div>
                {/* Items */}
                <div className="border-t border-gray-100">
                  {p.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between px-4 py-2.5 border-b border-gray-50 last:border-b-0"
                    >
                      <span className="text-sm text-gray-700">
                        {item.producto} ×{item.cantidad}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">S/ {item.total.toFixed(2)}</span>
                        <DeleteItemDialog
                          item={item}
                          onConfirm={() => deleteVenta(item.id)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        !isLoading && (
          <div className="flex flex-1 items-center justify-center py-10">
            <p className="text-sm text-gray-400">Sin ventas para este día</p>
          </div>
        )
      )}
    </div>
  )
}
