import { motion } from "framer-motion";

const SHARE_OPTIONS = [
  {
    id: "email",
    label: "Share via Email",
    shortLabel: "Email",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    bg: "bg-sky-500/8 border-sky-500/15 text-sky-600",
  },
  {
    id: "whatsapp",
    label: "Share via WhatsApp",
    shortLabel: "WhatsApp",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    bg: "bg-emerald-500/8 border-emerald-500/15 text-emerald-600",
  },
  {
    id: "copy",
    label: "Copy Link",
    shortLabel: "Copy Link",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    bg: "bg-violet-500/8 border-violet-500/15 text-violet-600",
  },
];

const WORKFLOW_STEPS = [
  {
    id: 1,
    label: "Upload Image",
    desc: "Select any image from your library or upload a new one instantly.",
    color: "from-violet-500 to-indigo-500",
    ring: "ring-violet-500/30",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
  },
  {
    id: 2,
    label: "Generate Link",
    desc: "Pixora creates a secure, expirable link for your image automatically.",
    color: "from-sky-500 to-cyan-500",
    ring: "ring-sky-500/30",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
  },
  {
    id: 3,
    label: "Share",
    desc: "Send via Email, WhatsApp, or copy the link to any platform.",
    color: "from-rose-500 to-pink-500",
    ring: "ring-rose-500/30",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
    ),
  },
];

export default function ShareSection() {
  return (
    <section
      id="share-section"
      className="relative w-full py-12 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden"
      style={{ paddingLeft: "max(1rem, env(safe-area-inset-left))", paddingRight: "max(1rem, env(safe-area-inset-right))" }}
    >
      {/* Background Purple and Cyan Gradient Waves with Flowing Lines */}
      <div id="pixora-bg" className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Soft elegant glows */}
        <div className="absolute top-[20%] right-[-10%] w-[min(550px,90vw)] h-[550px] rounded-full bg-purple-500/22 blur-[130px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[min(500px,80vw)] h-[500px] rounded-full bg-cyan-400/20 blur-[120px]" />
        
        {/* Flowing abstract animated lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.2]" viewBox="0 0 1700 500" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M0,200 C400,50 700,450 1100,200 C1300,100 1500,250 1700,150"
            stroke="url(#shareLineGradient1)"
            strokeWidth="2.5"
            animate={{
              d: [
                "M0,200 C400,50 700,450 1100,200 C1300,100 1500,250 1700,150",
                "M0,150 C400,100 750,380 1050,250 C1250,150 1450,300 1700,200",
                "M0,200 C400,50 700,450 1100,200 C1300,100 1500,250 1700,150"
              ]
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.path
            d="M0,250 C300,400 800,50 1200,300 C1400,400 1550,200 1700,350"
            stroke="url(#shareLineGradient2)"
            strokeWidth="1.5"
            animate={{
              d: [
                "M0,250 C300,400 800,50 1200,300 C1400,400 1550,200 1700,350",
                "M0,300 C350,320 750,120 1150,240 C1350,320 1500,250 1700,280",
                "M0,250 C300,400 800,50 1200,300 C1400,400 1550,200 1700,350"
              ]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <defs>
            <linearGradient id="shareLineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="shareLineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#ec4899" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.45" />
            </linearGradient>
          </defs>
        </svg>

        {/* Connected Particles */}
        {[
          { left: "20%", top: "18%", delay: 0 },
          { left: "45%", top: "35%", delay: 1.5 },
          { left: "70%", top: "22%", delay: 3.5 },
          { left: "85%", top: "15%", delay: 5.5 }
        ].map((node, i) => (
          <motion.div
            key={`node-${i}`}
            className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_12px_4px_rgba(34,211,238,0.25)] opacity-50 z-10"
            style={{ left: node.left, top: node.top }}
            animate={{
              y: [0, -10, 10, 0],
              scale: [1, 1.4, 1]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: node.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.span
            className="inline-block mb-4 px-3 py-1 text-xs font-semibold tracking-widest uppercase rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
            initial={{ opacity: 0, scale: 0.7, y: 10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 15 }}
            whileHover={{ scale: 1.08 }}
          >
            Sharing
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-bold text-theme-text leading-tight tracking-tight mb-4 transition-colors duration-300">
            {"Share your ".split(" ").map((word, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: 30, rotateX: -45 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}&nbsp;
              </motion.span>
            ))}
            <motion.span
              className="bg-gradient-to-r from-rose-500 via-rose-400 to-pink-400 bg-clip-text text-transparent inline-block"
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.04 }}
            >
              memories anywhere
            </motion.span>
          </h2>
          <motion.p
            className="text-theme-text-muted text-lg max-w-md mx-auto leading-relaxed transition-colors duration-300"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Generate private shareable links and distribute them via Email or WhatsApp instantly.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          
          {/* ── Left: Mock Share Interface Card ── */}
          <div className="h-full">
            <div
              className="relative rounded-2xl border border-theme-border bg-theme-card backdrop-blur-xl overflow-hidden shadow-theme-card h-full flex flex-col justify-between p-5"
            >
              <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-rose-500 via-pink-400 to-orange-400 opacity-80" />

              {/* Image preview placeholder */}
              <div className="relative rounded-xl overflow-hidden aspect-video bg-gradient-to-br from-indigo-500/5 via-slate-100 to-rose-500/5 flex items-center justify-center select-none">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-200/40 via-pink-100/30 to-blue-200/40" />
                <svg className="w-10 h-10 text-slate-400/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div className="absolute bottom-3 left-3 bg-black/55 backdrop-blur-xs rounded-lg px-2.5 py-1.5 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-rose-500" />
                  <span className="text-[11px] text-white/90 font-medium">summer_trip_2026.jpg</span>
                </div>
              </div>

              {/* Link Bar Mock */}
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-theme-bg-alt/90 border border-theme-border px-3 py-2.5 select-none">
                <svg className="w-4 h-4 text-theme-text-faint flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <span className="flex-1 text-xs text-theme-text-muted truncate font-mono">
                  https://pixora.io/share/summer_trip_2026_xyz
                </span>
                <span className="text-[11px] font-semibold text-rose-500">Copy</span>
              </div>

              {/* Share buttons */}
              <div className="grid grid-cols-3 gap-2.5 mt-2">
                {SHARE_OPTIONS.map((btn) => (
                  <div
                    key={btn.id}
                    className={`relative flex flex-col items-center gap-2 rounded-xl border px-2 py-3 select-none ${btn.bg} ${btn.text} overflow-hidden`}
                  >
                    <div>{btn.icon}</div>
                    <span className="text-[11px] font-semibold">{btn.shortLabel}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Share Instructions Card (Workflow Steps) ── */}
          <div className="h-full">
            <div className="relative rounded-2xl border border-theme-border bg-theme-card backdrop-blur-xl p-8 shadow-theme-card h-full flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-semibold text-theme-text mb-6 flex items-center gap-2 transition-colors duration-300">
                  <svg className="w-4 h-4 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  How Sharing Works
                </h3>

                <div className="relative flex flex-col gap-0 w-full">
                  {WORKFLOW_STEPS.map((step, index) => (
                    <motion.div
                      key={step.id}
                      className="flex items-start gap-5"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="flex flex-col items-center">
                        <div
                          className={`relative w-11 h-11 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg ring-4 ${step.ring} flex-shrink-0`}
                        >
                          {step.icon}
                        </div>
                        {index < WORKFLOW_STEPS.length - 1 && (
                          <div className="relative w-[3px] h-12 my-1.5 rounded-full overflow-hidden">
                            <div className="absolute inset-0 bg-slate-200/50" />
                            <motion.div
                              className={`absolute top-0 inset-x-0 rounded-full bg-gradient-to-b ${step.color}`}
                              initial={{ height: 0 }}
                              whileInView={{ height: "100%" }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: 0.4 + index * 0.2, ease: "easeInOut" }}
                            />
                          </div>
                        )}
                      </div>

                      <div
                        className={`pb-${index < WORKFLOW_STEPS.length - 1 ? "8" : "0"} pt-1`}
                      >
                        <p className="text-xs font-semibold uppercase tracking-widest text-theme-text-muted mb-0.5">
                          Step {step.id}
                        </p>
                        <h4 className="text-theme-text font-semibold text-base transition-colors duration-300">
                          {step.label}
                        </h4>
                        <p className="text-sm text-theme-text-muted mt-1 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-8 rounded-2xl bg-gradient-to-br from-rose-500/10 to-pink-500/5 border border-rose-500/20 p-5 flex items-center gap-4 select-none">
                <div className="w-10 h-10 rounded-xl bg-rose-500/15 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-theme-text transition-colors duration-300">Private links, always</p>
                  <p className="text-xs text-theme-text-muted mt-0.5 transition-colors duration-300">Links remain valid for 7 days and are only accessible to people you choose to share with.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}