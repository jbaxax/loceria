import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { insertVentas } from "../services/ventas.service"
import { toInsertRows } from "../adapters/venta.adapter"
import type { VentaFormData } from "../schemas/venta.schema"

export function useRegistrarVenta(puestoId: string | null) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: VentaFormData) => {
      if (!puestoId) throw new Error("Selecciona un puesto")
      return insertVentas(toInsertRows(data.items, puestoId))
    },
    onSuccess: () => {
      toast.success("Venta registrada")
      queryClient.invalidateQueries({ queryKey: ["ventas-hoy"] })
      queryClient.invalidateQueries({ queryKey: ["resumen-dia"] })
    },
    onError: (err: Error) => {
      toast.error(`Error al registrar: ${err.message}`)
    },
  })
}
