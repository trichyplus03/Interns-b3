import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ImageIcon } from 'lucide-react'
import Button from './Button'

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Storage', href: '#storage' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const sections = navLinks.map((link) => link.href.slice(1))
    const observers = sections.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
      )
      observer.observe(el)
      return observer
    })

    return () => observers.forEach((obs) => obs?.disconnect())
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
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
    >
      <nav className="flex items-center justify-between w-full max-w-5xl px-3 py-2.5 rounded-full bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(15,23,42,0.08)]">
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
        </div>
      </nav>
    </motion.header>
  )
}

export default Navbar
