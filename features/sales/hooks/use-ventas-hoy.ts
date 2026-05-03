import { useQuery } from "@tanstack/react-query"
import { fetchTotalHoy } from "../services/ventas.service"

export function useVentasHoy(puestoId: string | null, enabled: boolean) {
  return useQuery({
    queryKey: ["ventas-hoy", puestoId],
    queryFn: () => fetchTotalHoy(puestoId!),
    enabled: enabled && puestoId !== null,
  })
}
