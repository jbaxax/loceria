export interface PuestoRecord {
  id: string
  nombre: string
}

export const TABS = ["Vender", "Resumen", "Productos"] as const
export type Tab = (typeof TABS)[number]
