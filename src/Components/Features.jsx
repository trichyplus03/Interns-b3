import { motion, useMotionValue, useSpring, useTransform, useScroll, useInView } from "framer-motion";
import { useRef, useState } from "react";

const features = [
  {
    id: 1,
    icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/></svg>),
    title: "Secure Image Storage",
    description: "Store and manage your photos safely with enterprise-grade cloud storage.",
    accent: "from-violet-500 to-indigo-500",
    topLine: "bg-gradient-to-r from-violet-500 to-indigo-500",
    badge: "Cloud",
    badgeColor: "text-violet-600 border-violet-500/15 bg-violet-500/5",
    glowColor: "rgba(139, 92, 246, 0.08)",
  },
  {
    id: 2,
    icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>),
    title: "Email Sharing",
    description: "Send image links directly through email in seconds.",
    accent: "from-sky-500 to-cyan-500",
    topLine: "bg-gradient-to-r from-sky-500 to-cyan-500",
    badge: "Email",
    badgeColor: "text-sky-600 border-sky-500/15 bg-sky-500/5",
    glowColor: "rgba(14, 165, 233, 0.08)",
  },
  {
    id: 3,
    icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>),
    title: "WhatsApp Sharing",
    description: "Share images instantly with WhatsApp contacts and groups.",
    accent: "from-emerald-500 to-teal-500",
    topLine: "bg-gradient-to-r from-emerald-500 to-teal-500",
    badge: "WhatsApp",
    badgeColor: "text-emerald-600 border-emerald-500/15 bg-emerald-500/5",
    glowColor: "rgba(16, 185, 129, 0.08)",
  },
  {
    id: 4,
    icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>),
    title: "Image Management",
    description: "Upload, preview, download and organize your entire photo library.",
    accent: "from-rose-500 to-pink-500",
    topLine: "bg-gradient-to-r from-rose-500 to-pink-500",
    badge: "Manage",
    badgeColor: "text-rose-600 border-rose-500/15 bg-rose-500/5",
    glowColor: "rgba(244, 63, 94, 0.08)",
  },
];

/* ─── 3D Tilt Card ─── */
function TiltCard({ f, index }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 300, damping: 30 });
  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), { stiffness: 300, damping: 30 });
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      className="group relative flex flex-col rounded-2xl border border-theme-border bg-theme-card hover:border-theme-border-hover hover:bg-theme-card-hover backdrop-blur-xl p-6 shadow-theme-card hover:shadow-theme-card-hover hover:-translate-y-1.5 hover:scale-[1.01] overflow-hidden cursor-pointer transition-all duration-300 ease-out"
    >
      {/* Animated glow that follows cursor */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, ${f.glowColor}, transparent 60%)`
          ),
        }}
      />

      {/* Top accent line with animated width */}
      <motion.div
        className={`absolute inset-x-0 top-0 h-[2px] ${f.topLine}`}
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: isHovered ? 1 : 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Animated border shimmer */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background: `linear-gradient(var(--shimmer-angle, 0deg), transparent 40%, var(--glass-shimmer) 50%, transparent 60%)`,
        }}
        animate={{ "--shimmer-angle": ["0deg", "360deg"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      {/* Icon with magnetic hover + pulse ring */}
      <motion.div
        className="relative mb-5 inline-flex"
        style={{ transformStyle: "preserve-3d", translateZ: isHovered ? 30 : 0 }}
        whileHover={{ scale: 1.15 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        <div className={`w-11 h-11 items-center justify-center rounded-xl bg-gradient-to-br ${f.accent} text-white shadow-md flex-shrink-0 flex relative z-10`}>
          {f.icon}
        </div>
        {/* Pulse ring on hover */}
        <motion.div
          className={`absolute inset-0 rounded-xl bg-gradient-to-br ${f.accent}`}
          animate={isHovered ? {
            scale: [1, 1.6, 1.8],
            opacity: [0.4, 0.1, 0],
          } : { scale: 1, opacity: 0 }}
          transition={{ duration: 1.2, repeat: isHovered ? Infinity : 0, ease: "easeOut" }}
        />
      </motion.div>

      {/* Title with reveal */}
      <motion.h3
        className="text-sm font-semibold text-theme-text mb-2 leading-snug transition-colors duration-300"
        style={{ transformStyle: "preserve-3d", translateZ: isHovered ? 20 : 0 }}
      >
        {f.title}
      </motion.h3>

      {/* Description */}
      <motion.p
        className="text-sm text-theme-text-muted leading-relaxed flex-1 transition-colors duration-300"
        style={{ transformStyle: "preserve-3d", translateZ: isHovered ? 10 : 0 }}
      >
        {f.description}
      </motion.p>

      {/* Badge with spring pop */}
      <motion.span
        className={`mt-5 self-start text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border ${f.badgeColor} transition-colors duration-300`}
        whileHover={{ scale: 1.1, y: -2 }}
        transition={{ type: "spring", stiffness: 400, damping: 12 }}
        style={{ transformStyle: "preserve-3d", translateZ: isHovered ? 25 : 0 }}
      >
        {f.badge}
      </motion.span>
    </motion.div>
  );
}

/* ─── Animated Text Reveal ─── */
function AnimatedHeading({ text, gradient }) {
  const words = text.split(" ");
  return (
    <span>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: i * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {gradient && i === words.length - 1 ? (
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              {word}
            </span>
          ) : (
            word
          )}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── Floating Particles ─── */
function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 4,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-violet-400/20"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function Features() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const gridRotate = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-transparent"
      /* Safe-area padding for iPhone notch / home bar */
      style={{ paddingLeft: "max(1rem, env(safe-area-inset-left))", paddingRight: "max(1rem, env(safe-area-inset-right))" }}
    >
      {/* Floating particles */}
      <FloatingParticles />

      <div className="relative mx-auto w-full max-w-6xl">
        {/* Header with advanced text reveal */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.span
            className="inline-block mb-4 px-3 py-1 text-[11px] font-semibold tracking-widest uppercase rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.05 }}
          >
            Everything you need
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-theme-text leading-tight tracking-tight transition-colors duration-300">
            <AnimatedHeading text="Built for your photo" />
            {" "}
            <motion.span
              className="bg-gradient-to-r from-violet-500 via-violet-400 to-cyan-400 bg-clip-text text-transparent inline-block"
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{
                backgroundImage: "linear-gradient(to right, #818cf8, #06b6d4, #a78bfa)",
                scale: 1.02,
              }}
            >
              workflow
            </motion.span>
          </h2>
          <motion.p
            className="mt-4 max-w-xl mx-auto text-theme-text-muted text-base sm:text-lg leading-relaxed transition-colors duration-300"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            PhotoMall gives you a complete toolkit — from secure storage to instant sharing.
          </motion.p>
        </motion.div>

        {/* Grid with perspective */}
        <motion.div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
            perspective: 1200,
            rotate: gridRotate,
          }}
        >
          {features.map((f, i) => (
            <TiltCard key={f.id} f={f} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}