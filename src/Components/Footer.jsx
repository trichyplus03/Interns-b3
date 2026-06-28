import { motion } from 'framer-motion'
import { ImageIcon } from 'lucide-react'
import { FaLinkedin, FaTwitter, FaGithub, FaInstagram } from 'react-icons/fa'

const footerLinks = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'Storage', href: '#storage' },
    { label: 'Pricing', href: '#pricing' },
  ],
  Company: [
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ],
  Resources: [
    { label: 'Blog', href: '#' },
    { label: 'Help Center', href: '#' },
  ],
}

const socialLinks = [
  { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
  { icon: FaTwitter, href: '#', label: 'Twitter' },
  { icon: FaGithub, href: '#', label: 'GitHub' },
  { icon: FaInstagram, href: '#', label: 'Instagram' },
]

const Footer = () => {
  const handleScroll = (e, href) => {
    if (href.startsWith('#') && href.length > 1) {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6 }}
      className="bg-[#F8FAFC] border-t border-[#E2E8F0] pt-16 pb-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="flex items-center gap-2.5 mb-4 group"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] shadow-md shadow-indigo-500/20">
                <ImageIcon className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-[#0F172A] font-semibold text-base tracking-tight">
                PhotoMall
              </span>
            </a>
            <p className="text-sm text-[#64748B] leading-relaxed max-w-xs">
              Modern cloud storage for images. Store, manage, and share with ease.
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-[#0F172A] mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleScroll(e, link.href)}
                      className="text-sm text-[#64748B] hover:text-[#4F46E5] transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[#E2E8F0]">
          <p className="text-sm text-[#64748B]">
            © 2026 PhotoMall. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#4F46E5] hover:border-[#4F46E5]/30 hover:shadow-sm transition-colors duration-300"
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer
