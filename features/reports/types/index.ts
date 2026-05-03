export interface VentaItem {
  id: string
  producto: string
  cantidad: number
  precio_unitario: number
  total: number
}

export interface ResumenPuesto {
  puestoId: string
  nombre: string
  total: number
  cantidadVentas: number
  items: VentaItem[]
}

export interface ResumenDia {
  totalGeneral: number
  puestos: ResumenPuesto[]
}
