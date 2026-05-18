import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { deleteProveedor } from "../services/proveedores.service"

export function useEliminarProveedor(puestoId: string | null) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (proveedorId: string) => deleteProveedor(proveedorId),
    onSuccess: () => {
      toast.success("Proveedor eliminado")
      queryClient.invalidateQueries({ queryKey: ["proveedores", puestoId] })
    },
    onError: (err: Error) => {
      toast.error(`Error: ${err.message}`)
    },
  })
}
