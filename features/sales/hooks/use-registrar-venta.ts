import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { insertVentas } from "../services/ventas.service"
import { toInsertRows } from "../adapters/venta.adapter"
import type { VentaFormData } from "../schemas/venta.schema"
import type { Puesto } from "../types"

export function useRegistrarVenta(puesto: Puesto) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: VentaFormData) =>
      insertVentas(toInsertRows(data.items, puesto)),
    onSuccess: () => {
      toast.success("Venta registrada")
      queryClient.invalidateQueries({ queryKey: ["ventas-hoy"] })
    },
    onError: (err: Error) => {
      toast.error(`Error al registrar: ${err.message}`)
    },
  })
}
