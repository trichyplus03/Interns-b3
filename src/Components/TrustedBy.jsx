import { motion } from 'framer-motion'

const brands = [
  {
    name: 'Adobe',
    svg: (
      <svg viewBox="0 0 130 34" className="h-8 w-auto">
        <path d="M18 2L2 32h8.5l3-7.5h13L29.5 32H38L22 2H18zm-1 17.5L22 9l5 10.5H17z" fill="#FF0000" />
        <text x="44" y="25" fontSize="16" fontWeight="700" fontFamily="system-ui" fill="#FF0000">
          Adobe
        </text>
      </svg>
    ),
  },
  {
    name: 'Canva',
    svg: (
      <svg viewBox="0 0 110 34" className="h-8 w-auto">
        <circle cx="17" cy="17" r="14" fill="#00C4CC" />
        <text x="12" y="22" fontSize="14" fontWeight="800" fontFamily="system-ui" fill="#FFFFFF">
          C
        </text>
        <text x="36" y="25" fontSize="16" fontWeight="700" fontFamily="system-ui" fill="#7D2AE8">
          Canva
        </text>
      </svg>
    ),
  },
  {
    name: 'Figma',
    svg: (
      <svg viewBox="0 0 110 34" className="h-8 w-auto">
        <rect x="3" y="1" width="11" height="11" rx="5.5" fill="#F24E1E" />
        <rect x="17" y="1" width="11" height="11" rx="5.5" fill="#FF7262" />
        <rect x="3" y="12" width="11" height="11" rx="5.5" fill="#A259FF" />
        <rect x="17" y="12" width="11" height="11" rx="5.5" fill="#1ABCFE" />
        <rect x="3" y="23" width="11" height="11" rx="5.5" fill="#0ACF83" />
        <text x="34" y="25" fontSize="16" fontWeight="700" fontFamily="system-ui" fill="#333333">
          Figma
        </text>
      </svg>
    ),
  },
  {
    name: 'Unsplash',
    svg: (
      <svg viewBox="0 0 140 34" className="h-8 w-auto">
        <path d="M10 12h12v14H2V12h8zm0-10h12v8H10V2z" fill="#111111" />
        <text x="30" y="25" fontSize="15" fontWeight="700" fontFamily="system-ui" fill="#111111">
          Unsplash
        </text>
      </svg>
    ),
  },
  {
    name: 'Pexels',
    svg: (
      <svg viewBox="0 0 120 34" className="h-8 w-auto">
        <rect x="2" y="2" width="24" height="30" rx="4" fill="#05A081" />
        <text x="9" y="24" fontSize="16" fontWeight="800" fontFamily="system-ui" fill="#FFFFFF">
          P
        </text>
        <text x="32" y="25" fontSize="16" fontWeight="700" fontFamily="system-ui" fill="#05A081">
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
              whileHover={{ scale: 1.08, y: -2 }}
              className="group cursor-default"
            >
              <div className="opacity-80 group-hover:opacity-100 transition-all duration-300">
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
