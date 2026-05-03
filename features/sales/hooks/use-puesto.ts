import { useState, useEffect } from "react"
import type { Puesto } from "../types"

const PUESTO_KEY = "loceria_puesto"

export function usePuesto() {
  const [puesto, setPuesto] = useState<Puesto>("A")
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(PUESTO_KEY)
    if (saved === "A" || saved === "B") setPuesto(saved)
    setHydrated(true)
  }, [])

  const selectPuesto = (p: Puesto) => {
    setPuesto(p)
    localStorage.setItem(PUESTO_KEY, p)
  }

  return { puesto, selectPuesto, hydrated }
}
