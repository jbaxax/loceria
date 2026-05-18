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
import { nuevoProveedorSchema, type NuevoProveedorData } from "../schemas/proveedor.schema"
import { useAgregarProveedor } from "../hooks/use-agregar-proveedor"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  puestoId: string | null
}

export function NuevoProveedorDialog({ open, onOpenChange, puestoId }: Props) {
  const { register, handleSubmit, reset, formState: { errors } } =
    useForm<NuevoProveedorData>({ resolver: zodResolver(nuevoProveedorSchema) })

  const { mutate, isPending } = useAgregarProveedor(puestoId)

  const onSubmit = (data: NuevoProveedorData) => {
    mutate(data.nombre, {
      onSuccess: () => {
        reset()
        onOpenChange(false)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="mx-auto max-w-sm rounded-2xl bg-[#FAF8F5] p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">Nuevo proveedor</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400">
              Nombre
            </label>
            <Input
              {...register("nombre")}
              placeholder="ej. Don Mario"
              autoFocus
              className="h-12 rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#C04422]/40 focus:ring-2 focus:ring-[#C04422]/15"
            />
            {errors.nombre && (
              <span className="text-xs text-red-500">{errors.nombre.message}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-2xl bg-[#C04422] py-4 text-base font-semibold text-white transition-opacity active:opacity-80 disabled:opacity-60"
          >
            {isPending ? "Agregando..." : "Agregar proveedor"}
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
