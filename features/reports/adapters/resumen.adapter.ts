import type { VentaRow } from "../services/resumen.service"
import type { ResumenDia, ResumenPuesto } from "../types"

export function toResumenDia(rows: VentaRow[]): ResumenDia {
  const map = new Map<string, ResumenPuesto>()

  for (const row of rows) {
    const item = {
      id: row.id,
      producto: row.producto,
      cantidad: row.cantidad,
      precio_unitario: Number(row.precio_unitario),
      total: Number(row.total),
    }

    const existing = map.get(row.puesto_id)
    if (existing) {
      existing.total += item.total
      existing.cantidadVentas += 1
      existing.items.push(item)
    } else {
      map.set(row.puesto_id, {
        puestoId: row.puesto_id,
        nombre: row.puestos.nombre,
        total: item.total,
        cantidadVentas: 1,
        items: [item],
      })
    }
  }

  const puestos = Array.from(map.values()).sort((a, b) =>
    a.nombre.localeCompare(b.nombre),
  )

  return {
    totalGeneral: puestos.reduce((sum, p) => sum + p.total, 0),
    puestos,
  }
}
