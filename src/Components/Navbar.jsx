import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ImageIcon, Menu, X } from 'lucide-react'
import Button from './Button'

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Storage', href: '#storage' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const sections = navLinks.map((link) => link.href.slice(1))
    const observers = sections.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { rootMargin: '-20% 0px -50% 0px', threshold: 0.1 }
      )
      observer.observe(el)
      return observer
    })

    // Clear active state when scrolled to top (hero area)
    const handleScroll = () => {
      if (window.scrollY < 300) setActiveSection('')
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      observers.forEach((obs) => obs?.disconnect())
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleScroll = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-6 left-0 right-0 z-50 flex flex-col items-center px-4 sm:px-6 lg:px-8"
    >
      <nav className="flex items-center justify-between w-full max-w-7xl px-3 py-2.5 rounded-full bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(15,23,42,0.08)]">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="flex items-center gap-2.5 pl-2 group"
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] shadow-md shadow-indigo-500/30 group-hover:shadow-lg group-hover:shadow-indigo-500/40 transition-shadow duration-300">
            <ImageIcon className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-[#0F172A] font-semibold text-base tracking-tight hidden sm:block">
            PhotoMall
          </span>
        </a>

        {/* Center Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const id = link.href.slice(1)
            const isActive = activeSection === id
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
                    isActive
                      ? 'text-[#4F46E5]'
                      : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute inset-0 bg-[#4F46E5]/8 rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Right Actions */}
        <div className="flex items-center gap-2 pr-1">
          <motion.a
            href="#"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-[#64748B] hover:text-[#0F172A] transition-colors duration-300"
          >
            Login
          </motion.a>
          <Button
            variant="primary"
            className="!px-5 !py-2.5 !text-sm"
            onClick={(e) => handleScroll(e, '#features')}
          >
            Get Started
          </Button>

          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex md:hidden items-center justify-center w-9 h-9 rounded-full bg-slate-50 border border-slate-200 text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 transition-colors ml-1"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute top-full left-0 right-0 mt-3 mx-4 p-5 rounded-3xl bg-white/95 backdrop-blur-xl border border-white/60 shadow-[0_12px_40px_rgba(15,23,42,0.15)] flex flex-col gap-4 md:hidden z-40"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const id = link.href.slice(1)
                const isActive = activeSection === id
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        handleScroll(e, link.href)
                        setIsMobileMenuOpen(false)
                      }}
                      className={`block px-4 py-3 text-base font-semibold rounded-2xl transition-colors ${
                        isActive
                          ? 'text-[#4F46E5] bg-[#4F46E5]/5'
                          : 'text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50'
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                )
              })}
            </ul>

            <div className="h-[1px] bg-slate-100 my-1" />

            <div className="flex flex-col gap-3">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  setIsMobileMenuOpen(false)
                }}
                className="flex items-center justify-center py-3 text-base font-semibold text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50 rounded-2xl transition-colors"
              >
                Login
              </a>
              <Button
                variant="primary"
                className="w-full py-3.5 text-base font-semibold"
                onClick={(e) => {
                  handleScroll(e, '#features')
                  setIsMobileMenuOpen(false)
                }}
              >
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navbar
