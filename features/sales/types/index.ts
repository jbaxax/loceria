export interface PuestoRecord {
  id: string
  nombre: string
}

export const TABS = ["Vender", "Resumen"] as const
export type Tab = (typeof TABS)[number]
