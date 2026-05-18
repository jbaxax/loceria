import { useQuery } from "@tanstack/react-query"
import { fetchProveedoresConSaldo } from "../services/proveedores.service"

export function useProveedores(puestoId: string | null) {
  return useQuery({
    queryKey: ["proveedores", puestoId],
    queryFn: () => fetchProveedoresConSaldo(puestoId!),
    enabled: !!puestoId,
  })
}
