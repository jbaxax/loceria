import type { VentaFormData } from "../schemas/venta.schema"

export function toInsertRows(items: VentaFormData["items"], puestoId: string) {
  return items.map((item) => ({
    puesto_id: puestoId,
    producto: item.producto,
    precio_unitario: item.precio_unitario,
    cantidad: item.cantidad,
  }))
}
