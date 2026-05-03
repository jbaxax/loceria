import type { VentaFormData } from "../schemas/venta.schema"
import type { Puesto } from "../types"

export function toInsertRows(items: VentaFormData["items"], puesto: Puesto) {
  return items.map((item) => ({
    puesto,
    producto: item.producto,
    precio_unitario: item.precio_unitario,
    cantidad: item.cantidad,
  }))
}
