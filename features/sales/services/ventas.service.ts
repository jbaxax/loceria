import { supabase } from "@/lib/supabase"
import type { PuestoRecord } from "../types"

type InsertRow = {
  puesto_id: string
  producto: string
  precio_unitario: number
  cantidad: number
}

export async function fetchPuestos(): Promise<PuestoRecord[]> {
  const { data, error } = await supabase
    .from("puestos")
    .select("id, nombre")
    .order("nombre")
  if (error) throw error
  return data ?? []
}

export async function fetchTotalHoy(puestoId: string): Promise<number> {
  const today = new Date().toISOString().split("T")[0]
  const { data, error } = await supabase
    .from("ventas")
    .select("total")
    .eq("puesto_id", puestoId)
    .gte("created_at", `${today}T00:00:00`)
    .lte("created_at", `${today}T23:59:59`)
  if (error) throw error
  return (data ?? []).reduce((sum, row) => sum + Number(row.total), 0)
}

export async function insertVentas(rows: InsertRow[]): Promise<void> {
  const { error } = await supabase.from("ventas").insert(rows)
  if (error) throw error
}
