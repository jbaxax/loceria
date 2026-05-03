import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { deleteVenta } from "../services/resumen.service"

export function useDeleteVenta(dateKey: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteVenta,
    onSuccess: () => {
      toast.success("Venta eliminada")
      queryClient.invalidateQueries({ queryKey: ["resumen-dia", dateKey] })
      queryClient.invalidateQueries({ queryKey: ["ventas-hoy"] })
    },
    onError: (err: Error) => {
      toast.error(`Error al eliminar: ${err.message}`)
    },
  })
}
