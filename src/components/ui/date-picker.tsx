"use client"

import * as React from "react"
import { useState, useRef, useEffect } from "react"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { DayPicker } from "react-day-picker"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "motion/react"
import { Calendar as CalendarIcon, CheckCircle2, XCircle } from "lucide-react"
import 'react-day-picker/dist/style.css'

// Contoh data jadwal dummy (tahun 2026, bulan 7 = Agustus, bulan 8 = September)
const availableDates = [
  new Date(2026, 7, 15), 
  new Date(2026, 7, 25),
  new Date(2026, 8, 10),
  new Date(2026, 8, 22),
]

const fullDates = [
  new Date(2026, 7, 5),
  new Date(2026, 7, 18),
  new Date(2026, 8, 12),
]

export function CustomDatePicker() {
  const router = useRouter()
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 7, 15))
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Tutup popover jika user klik di luar area
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative w-full" ref={containerRef}>
      <div 
        className="flex flex-col w-full cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="label text-left">PILIH TANGGAL</span>
        <span className="value flex items-center justify-center gap-2">
          {date ? format(date, "dd/MM/yyyy", { locale: id }) : "Pilih Jadwal"}
          <CalendarIcon className="w-4 h-4 ml-1 text-gray-800" />
        </span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="absolute top-[calc(100%+20px)] left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-2xl p-5 z-50 border border-gray-100 text-left"
            style={{ width: "max-content" }}
          >
            <div className="mb-4 flex flex-col gap-2 border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-gray-700 font-medium">Tersedia (Bisa Dipesan)</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <XCircle className="w-4 h-4 text-red-500" />
                <span className="text-gray-700 font-medium">Penuh (Sudah di-take)</span>
              </div>
            </div>

            <style>{`
              .rdp { --rdp-cell-size: 38px; --rdp-accent-color: #b8962c; margin: 0; }
              .rdp-day_selected, .rdp-day_selected:focus-visible, .rdp-day_selected:hover {
                background-color: var(--rdp-accent-color);
                color: white;
                font-weight: bold;
              }
              .available-date {
                font-weight: 700;
                color: #10b981 !important; 
                background-color: #ecfdf5; 
                border-radius: 100%;
              }
              .available-date:hover {
                background-color: #d1fae5;
              }
              .full-date {
                text-decoration: line-through;
                color: #ef4444 !important; 
                background-color: #fef2f2; 
                border-radius: 100%;
                opacity: 0.7;
              }
            `}</style>
            
            <DayPicker
              mode="single"
              selected={date}
              onSelect={(d) => {
                if (!d) return;
                setDate(d);
                setIsOpen(false);
                router.push("/paket/umrah-reguler");
              }}
              locale={id}
              modifiers={{
                available: availableDates,
                full: fullDates
              }}
              modifiersClassNames={{
                available: "available-date",
                full: "full-date"
              }}
              disabled={[{ before: new Date() }, ...fullDates]}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
