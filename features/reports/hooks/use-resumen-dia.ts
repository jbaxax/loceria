import { useQuery } from "@tanstack/react-query"
import { fetchVentasDia } from "../services/resumen.service"
import { toResumenDia } from "../adapters/resumen.adapter"

export function useResumenDia(date: Date) {
  const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`

  return useQuery({
    queryKey: ["resumen-dia", dateKey],
    queryFn: async () => toResumenDia(await fetchVentasDia(date)),
  })
}
