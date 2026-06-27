import { motion, animate, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function AnimatedCounter({ target, run }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!run) return;
    const ctrl = animate(0, target, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v * 10) / 10),
    });
    return () => ctrl.stop();
  }, [run, target]);
  return <span>{Number.isInteger(display) ? display : display.toFixed(1)}</span>;
}

/* ─── Animated Circular Progress ─── */
function CircularProgress({ percentage, inView }) {
  const circumference = 2 * Math.PI * 40;
  return (
    <div className="relative w-32 h-32 mx-auto flex items-center justify-center rounded-full bg-white/50 backdrop-blur-md border border-indigo-100/40 shadow-[0_12px_28px_-8px_rgba(99,102,241,0.12)] p-2">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="none" stroke="var(--progress-bg)" strokeWidth="6" />
        <motion.circle
          cx="50" cy="50" r="40"
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          filter="url(#progressGlow)"
          initial={{ strokeDashoffset: circumference }}
          animate={inView ? { strokeDashoffset: circumference * (1 - percentage / 100) } : { strokeDashoffset: circumference }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
          <filter id="progressGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#10b981" floodOpacity="0.45" />
          </filter>
        </defs>
      </svg>
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="text-xl font-extrabold text-theme-text leading-none transition-colors duration-300">
          <AnimatedCounter target={percentage} run={inView} />%
        </span>
        <span className="text-[10px] text-theme-text-faint font-bold uppercase tracking-widest mt-0.5 transition-colors duration-300">Used</span>
      </motion.div>
    </div>
  );
}

/* ─── Morphing Background Blob ─── */
function MorphingBlob({ className }) {
  return (
    <motion.div
      className={className}
      animate={{
        borderRadius: [
          "30% 70% 70% 30% / 30% 30% 70% 70%",
          "70% 30% 30% 70% / 70% 70% 30% 30%",
          "50% 50% 30% 70% / 60% 40% 60% 40%",
          "30% 70% 70% 30% / 30% 30% 70% 70%",
        ],
        scale: [1, 1.05, 0.95, 1],
      }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export default function StorageSection({ storageStats }) {
  const storage = storageStats || {
    totalGB: 10,
    usedGB: 0,
    availableGB: 10,
    usedPercent: 0,
    fileCount: 0,
  };
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const leftX = useTransform(scrollYProgress, [0, 0.4], [-60, 0]);
  const rightX = useTransform(scrollYProgress, [0, 0.4], [60, 0]);
  const fadeIn = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const dashRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 25 });
  const dashRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 25 });
  const cardRef = useRef(null);

  const handleDashMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleDashMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.25 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const stats = [
    { label: "Total", value: `${storage.totalGB} GB`, color: "text-violet-600", bg: "bg-violet-500/5", border: "border-violet-500/15" },
    { label: "Used",  value: `${storage.usedGB} GB`,  color: "text-amber-600",  bg: "bg-amber-500/5",  border: "border-amber-500/15" },
    { label: "Available", value: `${storage.availableGB} GB`, color: "text-emerald-600", bg: "bg-emerald-500/5", border: "border-emerald-500/15" },
  ];

  return (
    <section
      id="storage-section"
      ref={(el) => { ref.current = el; sectionRef.current = el; }}
      className="relative w-full py-12 overflow-hidden bg-transparent"
      style={{ paddingLeft: "max(1rem, env(safe-area-inset-left))", paddingRight: "max(1rem, env(safe-area-inset-right))" }}
    >
      {/* Background Cloud Waves and Soft Glows */}
      <div id="pixora-bg" className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Soft glowing light streams / cloud shapes */}
        <motion.div
          className="absolute top-[15%] left-[5%] w-[min(650px,95vw)] h-[350px] rounded-full bg-blue-400/24 blur-[130px]"
          animate={{
            x: [-20, 40, -20],
            y: [-10, 20, -10],
            opacity: [0.7, 0.9, 0.7]
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[10%] right-[5%] w-[min(600px,90vw)] h-[300px] rounded-full bg-indigo-400/24 blur-[120px]"
          animate={{
            x: [40, -30, 40],
            y: [20, -15, 20],
            opacity: [0.6, 0.8, 0.6]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Soft floating/moving light animation */}
        <motion.div
          className="absolute top-[40%] right-[30%] w-[450px] h-[300px] rounded-full bg-cyan-300/20 blur-[100px]"
          animate={{
            x: [0, 80, -40, 0],
            y: [0, -60, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Liquid Gradient Waves using morphed path shapes */}
        <svg className="absolute bottom-0 left-0 w-full h-[260px] opacity-[0.24]" viewBox="0 0 1440 320" fill="none" preserveAspectRatio="none">
          <motion.path
            fill="url(#waveGradient1)"
            animate={{
              d: [
                "M0,160 C320,300 480,100 800,240 C1120,380 1280,180 1440,220 L1440,320 L0,320 Z",
                "M0,220 C400,100 640,320 960,180 C1280,40 1360,260 1440,160 L1440,320 L0,320 Z",
                "M0,160 C320,300 480,100 800,240 C1120,380 1280,180 1440,220 L1440,320 L0,320 Z"
              ]
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.path
            fill="url(#waveGradient2)"
            animate={{
              d: [
                "M0,240 C240,140 720,280 960,180 C1200,80 1320,240 1440,200 L1440,320 L0,320 Z",
                "M0,180 C320,260 600,100 880,220 C1160,340 1320,160 1440,240 L1440,320 L0,320 Z",
                "M0,240 C240,140 720,280 960,180 C1200,80 1320,240 1440,200 L1440,320 L0,320 Z"
              ]
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <defs>
            <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.22" />
              <stop offset="50%" stopColor="#0891b2" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.01" />
            </linearGradient>
            <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.18" />
              <stop offset="50%" stopColor="#9333ea" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.01" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative mx-auto w-full max-w-6xl">
        <div className="grid gap-10 lg:gap-14" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", alignItems: "center" }}>

          {/* Left copy */}
          <motion.div style={{ x: leftX, opacity: fadeIn }}>
            <motion.span
              className="inline-block mb-4 px-3 py-1 text-[11px] font-semibold tracking-widest uppercase rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
              initial={{ opacity: 0, scale: 0.8, x: -20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.08, x: 4 }}
            >
              Cloud Storage
            </motion.span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-theme-text leading-tight tracking-tight mb-4 transition-colors duration-300">
              {"Your photos, ".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {word}&nbsp;
                </motion.span>
              ))}
              <motion.span
                className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent inline-block"
                initial={{ opacity: 0, y: 30, filter: "blur(8px)", scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.04 }}
              >
                always available
              </motion.span>
            </h2>
            <motion.p
              className="text-theme-text-muted text-base sm:text-lg leading-relaxed mb-7 max-w-md transition-colors duration-300"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              Manage your images with secure cloud storage. Access your entire library from any device, any time.
            </motion.p>
            <ul className="space-y-3">
              {["End-to-end encrypted uploads", "Instant sync across all devices", "99.9% uptime guarantee"].map((item, i) => (
                <motion.li
                  key={item}
                  className="flex items-center gap-3 text-theme-text text-sm transition-colors duration-300"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ x: 6 }}
                >
                  <motion.span
                    className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.12, type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <svg className="w-3 h-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.span>
                  {item}
                </motion.li>
              ))}
            </ul>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <CircularProgress percentage={storage.usedPercent} inView={inView} />
            </motion.div>
          </motion.div>

          {/* Right dashboard — 3D tilt */}
          <motion.div style={{ x: rightX, opacity: fadeIn }}>
            <motion.div
              ref={cardRef}
              onMouseMove={handleDashMouseMove}
              onMouseLeave={handleDashMouseLeave}
              style={{
                rotateX: dashRotateX,
                rotateY: dashRotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative rounded-2xl border border-theme-border bg-theme-card backdrop-blur-xl p-6 shadow-theme-card transition-all duration-300"
              whileHover={{ 
                border: "1px solid var(--card-hover-border)",
                backgroundColor: "var(--card-hover-bg)",
                boxShadow: "var(--card-hover-shadow)",
                y: -6,
                scale: 1.01
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <motion.div
                className="absolute inset-x-0 top-0 h-[1.5px] rounded-t-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "left" }}
              />

              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-[10px] text-theme-text-faint uppercase tracking-widest mb-0.5 transition-colors duration-300">Storage overview</p>
                  <h3 className="text-theme-text font-semibold text-sm transition-colors duration-300">
                    Storage used · {storage.fileCount} file{storage.fileCount !== 1 ? "s" : ""}
                  </h3>
                </div>
                <motion.div
                  className="w-8 h-8 rounded-xl bg-emerald-500/15 flex items-center justify-center"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.2, rotate: 180 }}
                >
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </motion.div>
              </div>

              <div className="flex items-baseline gap-2 mb-3">
                  <motion.span
                    className="text-5xl font-bold text-theme-text leading-none transition-colors duration-300"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <AnimatedCounter target={storage.usedGB} run={inView} />
                  </motion.span>
                  <motion.span
                    className="text-theme-text-muted text-base transition-colors duration-300"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.4 }}
                >
                  / {storage.totalGB} GB
                </motion.span>
              </div>

              <div className="relative h-2.5 w-full rounded-full bg-theme-bg-alt overflow-hidden mb-6">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                  initial={{ width: "0%" }}
                  animate={inView ? { width: `${storage.usedPercent}%` } : { width: "0%" }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ["-100%", "300%"] }}
                    transition={{ duration: 2, delay: 1.5, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                  />
                </motion.div>
              </div>

              <div className="grid gap-2.5" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>
                {stats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.06, y: -4, border: "1px solid var(--card-hover-border)", backgroundColor: "rgba(255, 255, 255, 0.95)" }}
                    className={`rounded-xl ${s.bg} border ${s.border} p-3.5 cursor-pointer shadow-[0_2px_8px_-3px_rgba(0,0,0,0.015)] transition-all duration-300`}
                  >
                    <motion.p
                      className={`text-base font-bold ${s.color}`}
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.6 + i * 0.12 }}
                    >
                      {s.value}
                    </motion.p>
                    <p className="text-[11px] text-theme-text-faint mt-0.5 transition-colors duration-300">{s.label}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-4 flex items-center justify-between rounded-xl bg-theme-card-hover/90 border border-theme-border px-3 py-2.5 transition-all duration-300 hover:border-theme-border-hover/60"
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1 }}
              >
                <p className="text-xs text-theme-text-muted transition-colors duration-300">
                  <motion.span
                    className="text-amber-400 font-medium"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {storage.usedPercent}%
                  </motion.span>{" "}
                  used · Upgrade for more
                </p>
                <motion.button
                  className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                  whileHover={{ scale: 1.1, x: 4 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Upgrade →
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}