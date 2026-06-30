import { motion } from 'framer-motion'

const variants = {
  primary:
    'bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40',
  secondary:
    'bg-white text-[#0F172A] border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-[#4F46E5]/30',
  outline:
    'bg-transparent text-[#4F46E5] border-2 border-[#4F46E5]/30 hover:border-[#4F46E5] hover:bg-[#4F46E5]/5',
}

const Button = ({
  children,
  variant = 'primary',
  className = '',
  onClick,
  href,
  type = 'button',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium text-sm tracking-wide transition-colors duration-300 cursor-pointer'

  const glowStyles =
    variant === 'primary'
      ? 'relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/0 before:via-white/20 before:to-white/0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700'
      : ''

  const Component = href ? motion.a : motion.button

  return (
    <Component
      href={href}
      type={href ? undefined : type}
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={`${baseStyles} ${variants[variant]} ${glowStyles} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </Component>
  )
}

export default Button
