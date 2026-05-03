import { supabase } from "@/lib/supabase"
import type { Puesto } from "../types"

type InsertRow = {
  puesto: Puesto
  producto: string
  precio_unitario: number
  cantidad: number
}

export async function fetchTotalHoy(puesto: Puesto): Promise<number> {
  const today = new Date().toISOString().split("T")[0]
  const { data, error } = await supabase
    .from("ventas")
    .select("precio_unitario, cantidad")
    .eq("puesto", puesto)
    .gte("created_at", `${today}T00:00:00`)
    .lte("created_at", `${today}T23:59:59`)
  if (error) throw error
  return (data ?? []).reduce(
    (sum, row) => sum + row.precio_unitario * row.cantidad,
    0,
  )
}

export async function insertVentas(rows: InsertRow[]): Promise<void> {
  const { error } = await supabase.from("ventas").insert(rows)
  if (error) throw error
}
