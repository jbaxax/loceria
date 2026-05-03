export type Puesto = "A" | "B"

export const TABS = ["Vender", "Resumen", "Productos"] as const
export type Tab = (typeof TABS)[number]
