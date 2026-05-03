"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const MONTHS = [
  "ene", "feb", "mar", "abr", "may", "jun",
  "jul", "ago", "sep", "oct", "nov", "dic",
]

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function formatPill(date: Date, today: Date): string {
  if (isSameDay(date, today)) return "Hoy"
  return `${date.getDate()} ${MONTHS[date.getMonth()]}`
}

interface DatePikerProps {
  value: Date
  onChange: (date: Date) => void
  daysToShow?: number
}

export function DatePiker({ value, onChange, daysToShow = 14 }: DatePikerProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const dates = Array.from({ length: daysToShow }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    return d
  })

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -120 : 120, behavior: "smooth" })
  }

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => scroll("left")}
        className="flex-shrink-0 rounded-full p-0.5 text-gray-400 hover:text-gray-600"
      >
        <ChevronLeft size={18} />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {dates.map((date) => (
          <button
            key={date.toDateString()}
            type="button"
            onClick={() => onChange(date)}
            className={`flex-shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              isSameDay(date, value)
                ? "bg-[#C04422] text-white"
                : "border border-gray-200 bg-white text-gray-600 hover:border-gray-300"
            }`}
          >
            {formatPill(date, today)}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scroll("right")}
        className="flex-shrink-0 rounded-full p-0.5 text-gray-400 hover:text-gray-600"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  )
}
