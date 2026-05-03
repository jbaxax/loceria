import { useQuery } from "@tanstack/react-query"
import { fetchPuestos } from "../services/ventas.service"

export function usePuestos() {
  return useQuery({
    queryKey: ["puestos"],
    queryFn: fetchPuestos,
    staleTime: Infinity,
  })
}
