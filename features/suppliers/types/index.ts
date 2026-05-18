export interface ProveedorRecord {
  id: string
  nombre: string
  puesto_id: string
  created_at: string
}

export interface TransaccionRecord {
  id: string
  proveedor_id: string
  tipo: "deuda" | "pago"
  monto: number
  nota: string | null
  created_at: string
}

export interface ProveedorConSaldo extends ProveedorRecord {
  total_deuda: number
  total_pagado: number
  saldo_pendiente: number
  ultima_transaccion: string | null
}
