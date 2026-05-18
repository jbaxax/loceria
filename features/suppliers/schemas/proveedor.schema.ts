import { z } from "zod"

export const nuevoProveedorSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido").max(100),
})

export const deudaSchema = z.object({
  monto: z.number().gt(0, "Debe ser mayor a 0"),
  nota: z.string().optional(),
})

export const pagoSchema = z.object({
  monto: z.number().gt(0, "Debe ser mayor a 0"),
  nota: z.string().optional(),
})

export type NuevoProveedorData = z.infer<typeof nuevoProveedorSchema>
export type DeudaData = z.infer<typeof deudaSchema>
export type PagoData = z.infer<typeof pagoSchema>
