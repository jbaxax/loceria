import { useQuery } from "@tanstack/react-query"
import { fetchProveedorConSaldo, fetchTransacciones } from "../services/proveedores.service"

export function useProveedorDetalle(proveedorId: string | null) {
  const saldo = useQuery({
    queryKey: ["proveedor-detalle", proveedorId],
    queryFn: () => fetchProveedorConSaldo(proveedorId!),
    enabled: !!proveedorId,
  })

  const transacciones = useQuery({
    queryKey: ["proveedor-transacciones", proveedorId],
    queryFn: () => fetchTransacciones(proveedorId!),
    enabled: !!proveedorId,
  })

  return { saldo, transacciones }
}
