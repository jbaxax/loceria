"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { pagoSchema, type PagoData } from "../schemas/proveedor.schema"
import { useRegistrarPago } from "../hooks/use-registrar-pago"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  proveedorId: string
  proveedorNombre: string
}

export function RegistrarPagoDialog({ open, onOpenChange, proveedorId, proveedorNombre }: Props) {
  const { register, handleSubmit, reset, formState: { errors } } =
    useForm<PagoData>({ resolver: zodResolver(pagoSchema) })

  const { mutate, isPending } = useRegistrarPago(proveedorId)

  const onSubmit = (data: PagoData) => {
    mutate(data, {
      onSuccess: () => {
        reset()
        onOpenChange(false)
      },
    })
  }

  const today = new Date()
  const months = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"]
  const dateStr = `${proveedorNombre} · ${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="mx-auto max-w-sm rounded-2xl bg-[#FAF8F5] p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">Registrar pago</DialogTitle>
          <p className="text-sm text-gray-400">{dateStr}</p>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400">
              Monto (S/)
            </label>
            <Input
              {...register("monto", { valueAsNumber: true })}
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0.00"
              autoFocus
              className="h-14 rounded-xl border border-[#2D6A4F]/40 bg-white px-4 text-lg font-semibold text-gray-900 outline-none focus:border-[#2D6A4F]/60 focus:ring-2 focus:ring-[#2D6A4F]/15"
            />
            {errors.monto && (
              <span className="text-xs text-red-500">{errors.monto.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400">
              Nota <span className="normal-case font-normal">(opcional)</span>
            </label>
            <Input
              {...register("nota")}
              placeholder="ej. abono, pagado completo..."
              className="h-12 rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#2D6A4F]/40 focus:ring-2 focus:ring-[#2D6A4F]/15"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-2xl bg-[#2D6A4F] py-4 text-base font-semibold text-white transition-opacity active:opacity-80 disabled:opacity-60"
          >
            {isPending ? "Registrando..." : "Registrar pago"}
          </button>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="text-sm text-gray-500"
          >
            Cancelar
          </button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
