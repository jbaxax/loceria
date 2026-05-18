import { supabase } from "@/lib/supabase"
import type { ProveedorConSaldo, TransaccionRecord } from "../types"

export async function fetchProveedoresConSaldo(puestoId: string): Promise<ProveedorConSaldo[]> {
  const { data, error } = await supabase
    .from("proveedor_saldos")
    .select("*")
    .eq("puesto_id", puestoId)
    .order("nombre")
  if (error) throw error
  return (data ?? []) as ProveedorConSaldo[]
}

export async function fetchProveedorConSaldo(proveedorId: string): Promise<ProveedorConSaldo> {
  const { data, error } = await supabase
    .from("proveedor_saldos")
    .select("*")
    .eq("id", proveedorId)
    .single()
  if (error) throw error
  return data as ProveedorConSaldo
}

export async function fetchTransacciones(proveedorId: string): Promise<TransaccionRecord[]> {
  const { data, error } = await supabase
    .from("proveedor_transacciones")
    .select("*")
    .eq("proveedor_id", proveedorId)
    .order("created_at", { ascending: false })
  if (error) throw error
  return (data ?? []) as TransaccionRecord[]
}

export async function insertProveedor(nombre: string, puestoId: string): Promise<void> {
  const { error } = await supabase
    .from("proveedores")
    .insert({ nombre, puesto_id: puestoId })
  if (error) throw error
}

export async function updateProveedorNombre(id: string, nombre: string): Promise<void> {
  const { error } = await supabase
    .from("proveedores")
    .update({ nombre })
    .eq("id", id)
  if (error) throw error
}

export async function insertTransaccion(
  proveedorId: string,
  tipo: "deuda" | "pago",
  monto: number,
  nota?: string,
): Promise<void> {
  const { error } = await supabase
    .from("proveedor_transacciones")
    .insert({ proveedor_id: proveedorId, tipo, monto, nota: nota || null })
  if (error) throw error
}

export async function deleteProveedor(id: string): Promise<void> {
  const { error } = await supabase.from("proveedores").delete().eq("id", id)
  if (error) throw error
}
