"use client"

import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { X } from "lucide-react"
import { ventaSchema, defaultItem, type VentaFormData } from "../schemas/venta.schema"
import { useRegistrarVenta } from "../hooks/use-registrar-venta"
import type { PuestoRecord } from "../types"

interface Props {
  puestos: PuestoRecord[]
  puestoId: string | null
  puestoNombre: string
  selectPuesto: (id: string) => void
  totalHoy: number
}

export function VenderTab({ puestos, puestoId, puestoNombre, selectPuesto, totalHoy }: Props) {
  const { register, control, handleSubmit, reset, formState: { errors } } =
    useForm<VentaFormData>({
      resolver: zodResolver(ventaSchema),
      defaultValues: { items: [defaultItem()] },
    })

  const { fields, append, remove } = useFieldArray({ control, name: "items" })
  const { mutate, isPending } = useRegistrarVenta(puestoId)

  const onSubmit = (data: VentaFormData) =>
    mutate(data, { onSuccess: () => reset({ items: [defaultItem()] }) })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-1 flex-col px-5 pt-5"
    >
      {/* Puesto selector */}
      <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400">
        Puesto de venta
      </p>
      <div className="mb-4 grid grid-cols-2 gap-3">
        {puestos.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => selectPuesto(p.id)}
            className={`rounded-2xl py-3.5 text-sm font-semibold transition-all ${
              puestoId === p.id
                ? "bg-[#C04422] text-white"
                : "border border-gray-200 bg-white text-gray-700"
            }`}
          >
            {p.nombre}
          </button>
        ))}
      </div>

      {/* Vendido hoy */}
      <div className="mb-5 flex items-center justify-between rounded-2xl bg-[#FDDDD0] px-4 py-3">
        <span className="text-sm font-medium text-[#C04422]">
          Vendido hoy · {puestoNombre}
        </span>
        <span className="font-bold text-[#C04422]">S/ {totalHoy.toFixed(2)}</span>
      </div>

      {/* Column headers */}
      <div className="mb-2 grid grid-cols-[1fr_5.5rem_3rem_2rem] gap-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400">
          Producto
        </span>
        <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400">
          Precio
        </span>
        <span className="text-center text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400">
          Cant.
        </span>
        <div />
      </div>

      {/* Item rows */}
      <div className="flex flex-col gap-2">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-[1fr_5.5rem_3rem_2rem] items-center gap-2"
          >
            <input
              {...register(`items.${index}.producto`)}
              placeholder="¿Qué vendiste?"
              autoComplete="off"
              className={`rounded-xl border bg-white px-3 py-2.5 text-sm placeholder:text-gray-400 outline-none focus:border-[#C04422]/40 focus:ring-2 focus:ring-[#C04422]/15 ${
                errors.items?.[index]?.producto ? "border-red-300" : "border-gray-200"
              }`}
            />
            <div className="relative">
              <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                S/
              </span>
              <input
                {...register(`items.${index}.precio_unitario`, { valueAsNumber: true })}
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.00"
                className={`w-full rounded-xl border bg-white py-2.5 pr-1.5 pl-7 text-sm outline-none focus:border-[#C04422]/40 focus:ring-2 focus:ring-[#C04422]/15 ${
                  errors.items?.[index]?.precio_unitario ? "border-red-300" : "border-gray-200"
                }`}
              />
            </div>
            <input
              {...register(`items.${index}.cantidad`, { valueAsNumber: true })}
              type="number"
              min="1"
              placeholder="1"
              className={`w-full rounded-xl border bg-white py-2.5 text-center text-sm outline-none focus:border-[#C04422]/40 focus:ring-2 focus:ring-[#C04422]/15 ${
                errors.items?.[index]?.cantidad ? "border-red-300" : "border-gray-200"
              }`}
            />
            <button
              type="button"
              onClick={() => remove(index)}
              disabled={fields.length === 1}
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-gray-100 text-gray-400 transition-colors hover:bg-gray-200 disabled:opacity-30"
            >
              <X size={13} />
            </button>
          </div>
        ))}
      </div>

      {/* Add product */}
      <button
        type="button"
        onClick={() => append(defaultItem())}
        className="mt-3 w-full rounded-2xl border border-dashed border-gray-300 py-3 text-sm text-gray-400 transition-colors hover:bg-gray-50"
      >
        + Agregar producto
      </button>

      <div className="flex-1" />

      {/* Submit */}
      <div className="py-5">
        <button
          type="submit"
          disabled={isPending || !puestoId}
          className="w-full rounded-2xl bg-[#C04422] py-4 text-base font-semibold text-white transition-opacity active:opacity-80 disabled:opacity-60"
        >
          {isPending ? "Registrando..." : "Registrar venta"}
        </button>
      </div>
    </form>
  )
}
