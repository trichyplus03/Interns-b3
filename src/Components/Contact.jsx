import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'

const contactInfo = [
  {
    icon: Mail,
    label: 'Email Us',
    value: 'hello@photomall.com',
    description: 'We reply within 24 hours',
    color: 'from-[#4F46E5] to-[#7C3AED]',
    bgLight: 'bg-indigo-50',
  },
  {
    icon: Phone,
    label: 'Call Us',
    value: '+1 (555) 123-4567',
    description: 'Mon–Fri, 9 AM – 6 PM EST',
    color: 'from-[#7C3AED] to-[#A855F7]',
    bgLight: 'bg-purple-50',
  },
  {
    icon: MapPin,
    label: 'Visit Us',
    value: 'San Francisco, CA',
    description: '123 Cloud Street, Suite 200',
    color: 'from-[#06B6D4] to-[#4F46E5]',
    bgLight: 'bg-cyan-50',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

const headerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
}

const headerItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

const formContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
}

const formItemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at top right, rgba(139,92,246,0.06), transparent 60%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at bottom left, rgba(6,182,212,0.05), transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16 flex flex-col items-center"
        >
          <motion.div
            variants={headerItemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E2E8F0] shadow-sm mb-6"
          >
            <Mail className="w-4 h-4 text-[#4F46E5]" />
            <span className="text-sm font-medium text-[#64748B]">
              Get in Touch
            </span>
          </motion.div>

          <motion.h2
            variants={headerItemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] leading-tight tracking-tight"
          >
            We'd Love to{' '}
            <span className="bg-gradient-to-r from-[#4F46E5] via-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent">
              Hear from You
            </span>
          </motion.h2>

          <motion.p
            variants={headerItemVariants}
            className="mt-4 text-lg text-[#64748B] max-w-2xl mx-auto leading-relaxed"
          >
            Have a question, feedback, or partnership idea? Drop us a message
            and our team will get back to you as soon as possible.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Left Column — Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {contactInfo.map((item) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.label}
                  variants={itemVariants}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group relative p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(79,70,229,0.08)] hover:border-[#4F46E5]/20 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0 shadow-sm`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1">
                        {item.label}
                      </p>
                      <p className="text-base font-semibold text-[#0F172A] group-hover:text-[#4F46E5] transition-colors duration-300">
                        {item.value}
                      </p>
                      <p className="text-sm text-[#94A3B8] mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}

            {/* Business Hours Card */}
            <motion.div
              variants={itemVariants}
              className="p-5 rounded-2xl bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] text-white shadow-lg shadow-indigo-500/15"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Business Hours</p>
                  <p className="text-xs text-white/70">We're here to help</p>
                </div>
              </div>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Monday – Friday</span>
                  <span className="font-medium">9:00 AM – 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Saturday</span>
                  <span className="font-medium">10:00 AM – 4:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Sunday</span>
                  <span className="font-medium text-white/50">Closed</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column — Contact Form */}
          <motion.div
            variants={formContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="relative p-7 sm:p-9 rounded-3xl bg-white border border-[#E2E8F0] shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              {/* Success overlay */}
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 z-10 rounded-3xl bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A]">
                    Message Sent!
                  </h3>
                  <p className="text-[#64748B] text-center max-w-xs">
                    Thanks for reaching out. We'll get back to you within 24
                    hours.
                  </p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <motion.div variants={formItemVariants} className="relative">
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-medium text-[#0F172A] mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="John Doe"
                      className={`w-full px-4 py-3 rounded-xl border text-sm text-[#0F172A] placeholder-[#94A3B8] bg-[#F8FAFC] outline-none transition-all duration-300 ${
                        focusedField === 'name'
                          ? 'border-[#4F46E5] ring-2 ring-[#4F46E5]/10 bg-white'
                          : 'border-[#E2E8F0] hover:border-[#CBD5E1]'
                      }`}
                    />
                  </motion.div>

                  {/* Email */}
                  <motion.div variants={formItemVariants} className="relative">
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-medium text-[#0F172A] mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="john@example.com"
                      className={`w-full px-4 py-3 rounded-xl border text-sm text-[#0F172A] placeholder-[#94A3B8] bg-[#F8FAFC] outline-none transition-all duration-300 ${
                        focusedField === 'email'
                          ? 'border-[#4F46E5] ring-2 ring-[#4F46E5]/10 bg-white'
                          : 'border-[#E2E8F0] hover:border-[#CBD5E1]'
                      }`}
                    />
                  </motion.div>
                </div>

                {/* Subject */}
                <motion.div variants={formItemVariants}>
                  <label
                    htmlFor="contact-subject"
                    className="block text-sm font-medium text-[#0F172A] mb-2"
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="How can we help?"
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-[#0F172A] placeholder-[#94A3B8] bg-[#F8FAFC] outline-none transition-all duration-300 ${
                      focusedField === 'subject'
                        ? 'border-[#4F46E5] ring-2 ring-[#4F46E5]/10 bg-white'
                        : 'border-[#E2E8F0] hover:border-[#CBD5E1]'
                    }`}
                  />
                </motion.div>

                {/* Message */}
                <motion.div variants={formItemVariants}>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-medium text-[#0F172A] mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Tell us more about your inquiry..."
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-[#0F172A] placeholder-[#94A3B8] bg-[#F8FAFC] outline-none transition-all duration-300 resize-none ${
                      focusedField === 'message'
                        ? 'border-[#4F46E5] ring-2 ring-[#4F46E5]/10 bg-white'
                        : 'border-[#E2E8F0] hover:border-[#CBD5E1]'
                    }`}
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.div variants={formItemVariants} className="flex items-center justify-between gap-4 pt-2">
                  <p className="text-xs text-[#94A3B8] hidden sm:block">
                    We typically respond within 24 hours.
                  </p>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white text-sm font-semibold shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30 transition-shadow duration-300"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact