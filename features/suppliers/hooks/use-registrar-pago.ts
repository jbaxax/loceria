import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { insertTransaccion } from "../services/proveedores.service"
import type { PagoData } from "../schemas/proveedor.schema"

export function useRegistrarPago(proveedorId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: PagoData) =>
      insertTransaccion(proveedorId, "pago", data.monto, data.nota),
    onSuccess: () => {
      toast.success("Pago registrado")
      queryClient.invalidateQueries({ queryKey: ["proveedores"] })
      queryClient.invalidateQueries({ queryKey: ["proveedor-detalle", proveedorId] })
      queryClient.invalidateQueries({ queryKey: ["proveedor-transacciones", proveedorId] })
    },
    onError: (err: Error) => {
      toast.error(`Error: ${err.message}`)
    },
  })
}
