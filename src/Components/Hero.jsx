import { motion } from 'framer-motion'
import {
  Cloud,
  Upload,
  Mail,
  MessageCircle,
  BarChart3,
  CheckCircle2,
  Image as ImageIcon,
  HardDrive,
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

const recentUploads = [
  { name: 'sunset-beach.jpg', size: '4.2 MB', color: 'from-orange-400 to-pink-500' },
  { name: 'portrait-shoot.png', size: '8.1 MB', color: 'from-violet-400 to-purple-500' },
  { name: 'product-001.webp', size: '2.6 MB', color: 'from-cyan-400 to-blue-500' },
]

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
      className="relative min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
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

        {/* Right Column - Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[520px] sm:h-[560px] lg:h-[600px]"
        >
          {/* Main Dashboard Card */}
          <div className="relative z-10 mx-auto w-full max-w-md bg-white/75 backdrop-blur-2xl border border-white/80 rounded-[28px] shadow-[0_24px_80px_rgba(15,23,42,0.12)] p-6 sm:p-7">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0F172A]">Cloud Storage</p>
                  <p className="text-xs text-[#64748B]">Overview</p>
                </div>
              </div>
              <span className="text-xs font-medium text-[#64748B] bg-[#F1F5F9] px-3 py-1.5 rounded-full">
                Pro Plan
              </span>
            </div>

            {/* Storage Progress */}
            <div className="mb-6 p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-[#4F46E5]" />
                  <span className="text-sm font-medium text-[#0F172A]">Storage Used</span>
                </div>
                <span className="text-sm font-bold text-[#4F46E5]">78%</span>
              </div>
              <div className="h-2.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '78%' }}
                  transition={{ duration: 1.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full bg-gradient-to-r from-[#4F46E5] via-[#7C3AED] to-[#06B6D4]"
                />
              </div>
              <p className="mt-2 text-xs text-[#64748B]">7.8 GB of 10 GB used</p>
            </div>

            {/* Recent Uploads */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-3">
                Recent Uploads
              </p>
              <div className="space-y-2.5">
                {recentUploads.map((file, i) => (
                  <motion.div
                    key={file.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + i * 0.15 }}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F8FAFC] transition-colors"
                  >
                    <div
                      className={`w-9 h-9 rounded-xl bg-gradient-to-br ${file.color} flex items-center justify-center shrink-0`}
                    >
                      <ImageIcon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#0F172A] truncate">{file.name}</p>
                      <p className="text-xs text-[#64748B]">{file.size}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#E2E8F0]">
              {[
                { label: 'Images', value: '2,847' },
                { label: 'Albums', value: '124' },
                { label: 'Shared', value: '89' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-base font-bold text-[#0F172A]">{stat.value}</p>
                  <p className="text-xs text-[#64748B]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Floating Cards */}
          <FloatingCard
            className="top-4 -right-2 sm:right-0 lg:-right-8 w-44 z-20"
            delay={0}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#0F172A]">Upload Complete</p>
                <p className="text-[10px] text-[#64748B]">sunset-beach.jpg</p>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard
            className="bottom-32 -left-4 sm:left-0 lg:-left-10 w-48 z-20"
            delay={1.2}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-green-100 flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#0F172A]">WhatsApp Share</p>
                <p className="text-[10px] text-[#64748B]">Sent to 3 contacts</p>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard
            className="bottom-16 -right-2 sm:right-2 lg:-right-6 w-44 z-20"
            delay={0.6}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center">
                <Mail className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#0F172A]">Email Share</p>
                <p className="text-[10px] text-[#64748B]">Delivered successfully</p>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard
            className="top-24 -left-2 sm:left-2 lg:-left-8 w-40 z-20"
            delay={1.8}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-violet-100 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-violet-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#0F172A]">Analytics</p>
                <p className="text-[10px] text-[#64748B]">+24% this week</p>
              </div>
            </div>
          </FloatingCard>

          {/* Decorative upload icon */}
          <motion.div
            animate={floatAnimation(2.4)}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#06B6D4] to-[#4F46E5] flex items-center justify-center shadow-lg shadow-cyan-500/30 z-30"
          >
            <Upload className="w-5 h-5 text-white" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
