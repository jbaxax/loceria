import { z } from "zod"

export const itemSchema = z.object({
  producto: z.string().min(1),
  precio_unitario: z.number().gt(0),
  cantidad: z.number().int().min(1),
})

export const ventaSchema = z.object({
  items: z.array(itemSchema).min(1),
})

export type VentaFormData = z.infer<typeof ventaSchema>

export const defaultItem = (): VentaFormData["items"][number] => ({
  producto: "",
  precio_unitario: NaN,
  cantidad: 1,
})
