import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { insertProveedor } from "../services/proveedores.service"

export function useAgregarProveedor(puestoId: string | null) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (nombre: string) => {
      if (!puestoId) throw new Error("No hay puesto seleccionado")
      return insertProveedor(nombre, puestoId)
    },
    onSuccess: () => {
      toast.success("Proveedor agregado")
      queryClient.invalidateQueries({ queryKey: ["proveedores"] })
    },
    onError: (err: Error) => {
      toast.error(`Error: ${err.message}`)
    },
  })
}
