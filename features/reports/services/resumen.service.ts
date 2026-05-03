import { supabase } from "@/lib/supabase"

export type VentaRow = {
  id: string
  producto: string
  cantidad: number
  precio_unitario: string
  total: string
  puesto_id: string
  puestos: { nombre: string }
}

export async function fetchVentasDia(date: Date): Promise<VentaRow[]> {
  // Use local-time day boundaries converted to UTC for correct timezone handling
  const start = new Date(date)
  start.setHours(0, 0, 0, 0)
  const end = new Date(date)
  end.setHours(23, 59, 59, 999)

  const { data, error } = await supabase
    .from("ventas")
    .select("id, producto, cantidad, precio_unitario, total, puesto_id, puestos(nombre)")
    .gte("created_at", start.toISOString())
    .lte("created_at", end.toISOString())
    .order("created_at", { ascending: false })

  if (error) throw error
  return (data ?? []) as unknown as VentaRow[]
}
