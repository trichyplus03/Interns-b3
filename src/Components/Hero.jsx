import { motion } from 'framer-motion'
import {
  CheckCircle2,
  Image as ImageIcon,
} from 'lucide-react'
import Button from './Button'

const trustItems = [
  'No Credit Card Required',
  '10GB Free Storage',
  'Secure Cloud Backup',
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const floatAnimation = (delay = 0) => ({
  y: [0, -12, 0],
  transition: {
    duration: 4 + delay,
    repeat: Infinity,
    ease: 'easeInOut',
    delay,
  },
})

const COL_1_PHOTOS = [
  {
    id: 1,
    url: 'https://picsum.photos/id/10/400/300',
    title: 'Mountain Lake',
    aspect: 'aspect-[4/3]',
    rotate: 'rotate-1',
  },
  {
    id: 2,
    url: 'https://picsum.photos/id/15/400/400',
    title: 'Waterfall',
    aspect: 'aspect-square',
    rotate: '-rotate-2',
  },
  {
    id: 6,
    url: 'https://picsum.photos/id/48/400/300',
    title: 'Log Cabin',
    aspect: 'aspect-[3/2]',
    rotate: 'rotate-1',
  },
]

const COL_2_PHOTOS = [
  {
    id: 3,
    url: 'https://picsum.photos/id/28/300/400',
    title: 'Forest Path',
    aspect: 'aspect-[3/4]',
    rotate: 'rotate-0',
  },
  {
    id: 4,
    url: 'https://picsum.photos/id/29/300/400',
    title: 'Mountain Top',
    aspect: 'aspect-[3/4]',
    rotate: '-rotate-1',
  },
]

const COL_3_PHOTOS = [
  {
    id: 5,
    url: 'https://picsum.photos/id/43/400/400',
    title: 'Mist Forest',
    aspect: 'aspect-square',
    rotate: 'rotate-2',
  },
  {
    id: 7,
    url: 'https://picsum.photos/id/56/400/300',
    title: 'Bison Field',
    aspect: 'aspect-[4/3]',
    rotate: '-rotate-2',
  },
  {
    id: 8,
    url: 'https://picsum.photos/id/82/400/400',
    title: 'Colorful Wildflowers',
    aspect: 'aspect-square',
    rotate: 'rotate-1',
  },
]

const photoVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.08,
    },
  }),
}

const PhotoCard = ({ photo, index }) => {
  return (
    <motion.div
      custom={index}
      variants={photoVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -8, scale: 1.05 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`relative w-full group overflow-hidden rounded-2xl border-2 border-white shadow-lg bg-slate-100 ${photo.aspect} ${photo.rotate} cursor-pointer`}
    >
      <img
        src={photo.url}
        alt={photo.title}
        className="w-full h-full object-cover rounded-2xl"
        loading="lazy"
      />
    </motion.div>
  )
}

const FloatingCard = ({ children, className, delay = 0 }) => (
  <motion.div
    animate={floatAnimation(delay)}
    className={`absolute bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl shadow-[0_12px_40px_rgba(15,23,42,0.1)] p-4 ${className}`}
  >
    {children}
  </motion.div>
)

const Hero = () => {
  return (
    <section
      className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background: `radial-gradient(circle at top left, rgba(139,92,246,0.12), transparent 40%), #FAFAFC`,
      }}
    >
      {/* Box grid background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(139,92,246,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.08) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 40%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Animated accent squares scattered on the grid */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        {/* Filled purple squares — fade in + pulse */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0, 1, 0.5, 1], scale: [0.8, 1, 1.05, 1] }}
          transition={{ duration: 3, delay: 0.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          className="absolute w-[48px] h-[48px] top-[144px] left-[96px] rounded-sm bg-[rgba(139,92,246,0.18)]"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0, 0.8, 0.4, 0.8], scale: 1 }}
          transition={{ duration: 4, delay: 1.2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          className="absolute w-[48px] h-[48px] top-[288px] right-[192px] rounded-sm bg-[rgba(139,92,246,0.15)]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0.3, 0.7] }}
          transition={{ duration: 5, delay: 0.8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          className="absolute w-[48px] h-[48px] top-[96px] right-[336px] rounded-sm bg-[rgba(6,182,212,0.18)]"
        />

        {/* Gradient-filled squares — fade in + gentle scale breathe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: [1, 1.08, 1] }}
          transition={{ duration: 6, delay: 1.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          className="absolute w-[48px] h-[48px] top-[384px] left-[240px] rounded-sm bg-gradient-to-br from-[rgba(139,92,246,0.22)] to-[rgba(6,182,212,0.18)]"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: [1, 1.1, 1] }}
          transition={{ duration: 5, delay: 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          className="absolute w-[48px] h-[48px] top-[192px] right-[480px] rounded-sm bg-gradient-to-br from-[rgba(6,182,212,0.2)] to-[rgba(139,92,246,0.15)]"
        />

        {/* Border-only accent squares — fade in + opacity pulse */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.4, 1] }}
          transition={{ duration: 4, delay: 0.3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          className="absolute w-[48px] h-[48px] top-[240px] left-[432px] rounded-sm border-2 border-[rgba(139,92,246,0.25)]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.9, 0.3, 0.9] }}
          transition={{ duration: 5, delay: 1.8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          className="absolute w-[48px] h-[48px] top-[480px] right-[384px] rounded-sm border-2 border-[rgba(6,182,212,0.25)]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0.2, 0.8] }}
          transition={{ duration: 6, delay: 2.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          className="absolute w-[48px] h-[48px] top-[336px] left-[48px] rounded-sm border-2 border-[rgba(139,92,246,0.2)]"
        />
      </div>

      <div className="relative z-[1] max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Column */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-8"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-[#E2E8F0] shadow-sm"
          >
            <span className="text-sm">✨</span>
            <span className="text-sm font-medium text-[#64748B]">
              Trusted by 10,000+ Creators
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0F172A] leading-[1.1] tracking-tight"
          >
            Store, Manage & Share Images{' '}
            <span className="bg-gradient-to-r from-[#4F46E5] via-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent">
              Without Limits
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg text-[#64748B] leading-relaxed max-w-xl"
          >
            Secure cloud storage for photographers, creators, freelancers, and
            teams. Upload, organize, manage and share your images instantly from
            anywhere.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <Button variant="primary">Start Free</Button>
            <Button variant="secondary">Upload Images</Button>
          </motion.div>

          <motion.ul variants={itemVariants} className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6">
            {trustItems.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-[#64748B]">
                <CheckCircle2 className="w-4 h-4 text-[#06B6D4] shrink-0" />
                {item}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Right Column - Interactive Photo Masonry Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full pt-12 sm:pt-16 lg:pt-20 pb-12"
        >
          {/* Floating Live Stats Badge */}
          <FloatingCard
            className="-top-6 sm:-top-2 lg:top-2 right-4 sm:right-6 lg:right-8 w-44 z-20"
            delay={0}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                <ImageIcon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#0F172A]">2,847 Images</p>
                <p className="text-[10px] text-[#64748B] font-semibold">Stored securely</p>
              </div>
            </div>
          </FloatingCard>

          {/* Floating Trust Badge near bottom-left laptop image */}
          <FloatingCard
            className="-bottom-4 left-4 sm:left-6 lg:left-8 w-44 z-20"
            delay={1.2}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#0F172A]">Trusted Platform</p>
                <p className="text-[10px] text-[#64748B] font-semibold">100k+ Active Shares</p>
              </div>
            </div>
          </FloatingCard>

          {/* Staggered Masonry Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 items-center relative z-10">
            {/* Column 1 */}
            <div className="flex flex-col gap-3 md:gap-4">
              {COL_1_PHOTOS.map((photo, index) => (
                <PhotoCard key={photo.id} photo={photo} index={index} />
              ))}
            </div>

            {/* Column 2 - Center (Tallest) */}
            <div className="flex flex-col gap-3 md:gap-4">
              {COL_2_PHOTOS.map((photo, index) => (
                <PhotoCard key={photo.id} photo={photo} index={index + COL_1_PHOTOS.length} />
              ))}
            </div>

            {/* Column 3 */}
            <div className="hidden sm:flex flex-col gap-3 md:gap-4">
              {COL_3_PHOTOS.map((photo, index) => (
                <PhotoCard key={photo.id} photo={photo} index={index + COL_1_PHOTOS.length + COL_2_PHOTOS.length} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
