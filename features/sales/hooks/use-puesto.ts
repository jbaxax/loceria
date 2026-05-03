import { useState, useEffect } from "react"

const PUESTO_KEY = "loceria_puesto_id"

export function usePuesto() {
  const [puestoId, setPuestoId] = useState<string | null>(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(PUESTO_KEY)
    if (saved) setPuestoId(saved)
    setHydrated(true)
  }, [])

  const selectPuesto = (id: string) => {
    setPuestoId(id)
    localStorage.setItem(PUESTO_KEY, id)
  }

  return { puestoId, selectPuesto, hydrated }
}
