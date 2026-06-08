"use client" 

import * as React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X } from "lucide-react"

const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className={`fixed top-0 left-0 right-0 z-[1000] flex justify-center w-full transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'} px-4`}>
      <div className={`flex items-center justify-between px-6 py-3 rounded-full shadow-lg w-full max-w-5xl relative z-10 transition-colors duration-300 ${scrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-md border border-[#333]' : 'bg-transparent'}`}>
        <div className="flex items-center">
          <motion.a
            href="/"
            className="flex items-center gap-3 mr-6 text-white no-underline"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-9 h-9 border-[1.5px] border-white rounded-full flex items-center justify-center relative">
              <div className="absolute w-5 h-5 border border-white rounded-full"></div>
              <div className="absolute w-2 h-2 bg-white rounded-full"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-[18px] font-medium tracking-[1px]">Aminah Tour</span>
              <span className="text-[8px] tracking-[2px] uppercase text-gray-400 -mt-1">Jepara</span>
            </div>
          </motion.a>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {[
            { name: "Beranda", href: "/" },
            { name: "Paket Umrah", href: "/#offers" },
            { name: "Fasilitas", href: "/#fasilitas" },
            { name: "Galeri", href: "/#galeri" }
          ].map((item) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <a href={item.href} className="text-[11px] font-medium tracking-[1.5px] uppercase text-white hover:text-[#d4af37] transition-colors no-underline">
                {item.name}
              </a>
            </motion.div>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <motion.div
          className="hidden md:block"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
        >
          <a
            href="https://wa.me/6285746386927"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-2.5 text-[11px] font-medium tracking-[1px] uppercase text-black bg-[#d4af37] rounded-full hover:bg-[#b8962c] transition-colors no-underline gap-2"
          >
            <i className="fab fa-whatsapp text-sm"></i> Konsultasi
          </a>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button className="md:hidden flex items-center text-white" onClick={toggleMenu} whileTap={{ scale: 0.9 }}>
          <Menu className="h-6 w-6" />
        </motion.button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-[#0a0a0a] z-50 pt-24 px-6 md:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <motion.button
              className="absolute top-6 right-6 p-2 text-white"
              onClick={toggleMenu}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.button>
            <div className="flex flex-col space-y-6">
              {[
                { name: "Beranda", href: "/" },
                { name: "Paket Umrah", href: "/#offers" },
                { name: "Fasilitas", href: "/#fasilitas" },
                { name: "Galeri", href: "/#galeri" }
              ].map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.1 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <a href={item.href} className="text-lg text-white font-medium tracking-wide uppercase no-underline hover:text-[#d4af37]" onClick={toggleMenu}>
                    {item.name}
                  </a>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                exit={{ opacity: 0, y: 20 }}
                className="pt-6"
              >
                <a
                  href="https://wa.me/6285746386927"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-5 py-3 text-sm font-medium tracking-[1px] uppercase text-black bg-[#d4af37] rounded-full hover:bg-[#b8962c] transition-colors no-underline gap-2"
                  onClick={toggleMenu}
                >
                  <i className="fab fa-whatsapp text-lg"></i> Konsultasi
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export { Navbar1 }
