import { useQuery } from "@tanstack/react-query"
import { fetchTotalHoy } from "../services/ventas.service"
import type { Puesto } from "../types"

export function useVentasHoy(puesto: Puesto, enabled: boolean) {
  return useQuery({
    queryKey: ["ventas-hoy", puesto],
    queryFn: () => fetchTotalHoy(puesto),
    enabled,
  })
}
