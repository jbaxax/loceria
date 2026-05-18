import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { insertTransaccion } from "../services/proveedores.service"
import type { DeudaData } from "../schemas/proveedor.schema"

export function useRegistrarDeuda(proveedorId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: DeudaData) =>
      insertTransaccion(proveedorId, "deuda", data.monto, data.nota),
    onSuccess: () => {
      toast.success("Deuda registrada")
      queryClient.invalidateQueries({ queryKey: ["proveedores"] })
      queryClient.invalidateQueries({ queryKey: ["proveedor-detalle", proveedorId] })
      queryClient.invalidateQueries({ queryKey: ["proveedor-transacciones", proveedorId] })
    },
    onError: (err: Error) => {
      toast.error(`Error: ${err.message}`)
    },
  })
}
