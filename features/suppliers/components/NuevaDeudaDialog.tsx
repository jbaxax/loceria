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
import { deudaSchema, type DeudaData } from "../schemas/proveedor.schema"
import { useRegistrarDeuda } from "../hooks/use-registrar-deuda"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  proveedorId: string
  proveedorNombre: string
}

export function NuevaDeudaDialog({ open, onOpenChange, proveedorId, proveedorNombre }: Props) {
  const { register, handleSubmit, reset, formState: { errors } } =
    useForm<DeudaData>({ resolver: zodResolver(deudaSchema) })

  const { mutate, isPending } = useRegistrarDeuda(proveedorId)

  const onSubmit = (data: DeudaData) => {
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
          <DialogTitle className="text-xl font-bold text-gray-900">Nueva deuda</DialogTitle>
          <p className="text-sm text-gray-400">{dateStr}</p>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400">
              Monto (S/)
            </label>
            <div className="relative">
              <Input
                {...register("monto", { valueAsNumber: true })}
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.00"
                autoFocus
                className="h-14 rounded-xl border border-[#C04422]/40 bg-white px-4 text-lg font-semibold text-gray-900 outline-none focus:border-[#C04422]/60 focus:ring-2 focus:ring-[#C04422]/15"
              />
            </div>
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
              placeholder="ej. 50 platos, tinas..."
              className="h-12 rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#C04422]/40 focus:ring-2 focus:ring-[#C04422]/15"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-2xl bg-[#C04422] py-4 text-base font-semibold text-white transition-opacity active:opacity-80 disabled:opacity-60"
          >
            {isPending ? "Registrando..." : "Registrar deuda"}
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
