import { motion } from 'framer-motion'

const brands = [
  {
    name: 'Adobe',
    svg: (
      <svg viewBox="0 0 120 32" fill="currentColor" className="h-7 w-auto">
        <path d="M16 4L4 28h6.5l2.2-5.5h11L26.5 28H33L21 4H16zm-1.5 14.5L19 10.5 23.5 18.5H14.5z" />
        <text x="38" y="23" fontSize="14" fontWeight="700" fontFamily="system-ui">
          Adobe
        </text>
      </svg>
    ),
  },
  {
    name: 'Canva',
    svg: (
      <svg viewBox="0 0 100 32" fill="currentColor" className="h-7 w-auto">
        <circle cx="16" cy="16" r="12" fillOpacity="0.3" />
        <text x="34" y="22" fontSize="15" fontWeight="700" fontFamily="system-ui">
          Canva
        </text>
      </svg>
    ),
  },
  {
    name: 'Figma',
    svg: (
      <svg viewBox="0 0 100 32" fill="currentColor" className="h-7 w-auto">
        <rect x="4" y="4" width="10" height="10" rx="5" fillOpacity="0.5" />
        <rect x="4" y="18" width="10" height="10" rx="5" fillOpacity="0.4" />
        <rect x="18" y="11" width="10" height="10" rx="5" fillOpacity="0.6" />
        <text x="34" y="22" fontSize="15" fontWeight="700" fontFamily="system-ui">
          Figma
        </text>
      </svg>
    ),
  },
  {
    name: 'Unsplash',
    svg: (
      <svg viewBox="0 0 120 32" fill="currentColor" className="h-7 w-auto">
        <rect x="4" y="8" width="16" height="16" rx="2" fillOpacity="0.4" />
        <text x="26" y="22" fontSize="13" fontWeight="700" fontFamily="system-ui">
          Unsplash
        </text>
      </svg>
    ),
  },
  {
    name: 'Pexels',
    svg: (
      <svg viewBox="0 0 100 32" fill="currentColor" className="h-7 w-auto">
        <polygon points="4,28 4,4 20,16" fillOpacity="0.5" />
        <text x="26" y="22" fontSize="14" fontWeight="700" fontFamily="system-ui">
          Pexels
        </text>
      </svg>
    ),
  },
]

const TrustedBy = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-[#E2E8F0]/60 bg-white/40">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center text-sm font-medium text-[#64748B] mb-10 tracking-wide"
        >
          Trusted by 10,000+ creators and teams worldwide
        </motion.p>

        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ scale: 1.05 }}
              className="group cursor-default"
            >
              <div className="text-[#94A3B8] grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:text-[#4F46E5] transition-all duration-500">
                {brand.svg}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrustedBy
