import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { updateProveedorNombre } from "../services/proveedores.service"

export function useEditarProveedor(proveedorId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (nombre: string) => updateProveedorNombre(proveedorId, nombre),
    onSuccess: () => {
      toast.success("Proveedor actualizado")
      queryClient.invalidateQueries({ queryKey: ["proveedores"] })
      queryClient.invalidateQueries({ queryKey: ["proveedor-detalle", proveedorId] })
    },
    onError: (err: Error) => {
      toast.error(`Error: ${err.message}`)
    },
  })
}
