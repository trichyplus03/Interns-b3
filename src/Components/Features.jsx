import { motion } from "framer-motion";
import { useRef } from "react";

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

/* ─── Feature Card ─── */
function FeatureCard({ f }) {
  const handleCardClick = () => {
    let targetId = "";
    if (f.id === 1) targetId = "storage-section";
    else if (f.id === 2 || f.id === 3) targetId = "share-section";
    else if (f.id === 4) targetId = "upload-section";

    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col rounded-2xl border border-theme-border bg-theme-card hover:border-theme-border-hover hover:bg-theme-card-hover backdrop-blur-xl p-6 shadow-theme-card overflow-hidden cursor-pointer transition-all duration-300 ease-out"
    >
      {/* Top accent line */}
      <div
        className={`absolute inset-x-0 top-0 h-[2px] ${f.topLine} origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out`}
      />

      {/* Icon */}
      <div className="relative mb-5 inline-flex">
        <div className={`w-11 h-11 items-center justify-center rounded-xl bg-gradient-to-br ${f.accent} text-white shadow-md flex-shrink-0 flex relative z-10`}>
          {f.icon}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-sm font-semibold text-theme-text mb-2 leading-snug transition-colors duration-300">
        {f.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-theme-text-muted leading-relaxed flex-1 transition-colors duration-300">
        {f.description}
      </p>

      {/* Badge */}
      <span className={`mt-5 self-start text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border ${f.badgeColor} transition-colors duration-300`}>
        {f.badge}
      </span>
    </div>
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

  return (
    <section
      id="features-section"
      ref={sectionRef}
      className="relative w-full py-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-transparent"
      /* Safe-area padding for iPhone notch / home bar */
      style={{ paddingLeft: "max(1rem, env(safe-area-inset-left))", paddingRight: "max(1rem, env(safe-area-inset-right))" }}
    >
      {/* Background Section Grid and Glowing Blobs */}
      <div id="pixora-bg" className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Soft gradient mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(at_top_left,rgba(219,234,254,0.25),transparent_50%),radial-gradient(at_bottom_right,rgba(236,254,255,0.3),transparent_50%)]" />
        
        {/* Animated glowing blobs */}
        <motion.div
          className="absolute top-[-10%] left-[-10%] w-[min(500px,80vw)] h-[min(500px,80vw)] rounded-full bg-blue-400/28 blur-[100px]"
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -30, 40, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-10%] right-[-10%] w-[min(550px,90vw)] h-[min(550px,90vw)] rounded-full bg-purple-400/28 blur-[110px]"
          animate={{
            x: [0, -50, 30, 0],
            y: [0, 40, -30, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[40%] right-[20%] w-[min(450px,70vw)] h-[min(450px,70vw)] rounded-full bg-cyan-300/28 blur-[95px]"
          animate={{
            x: [0, 30, -40, 0],
            y: [0, 50, -20, 0],
            scale: [1, 1.15, 0.85, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating Glass Orbs and Transparent 3D Circles */}
        {[
          { left: "12%", top: "25%", size: 80, delay: 0, rx: [0, 360], scale: [1, 1.1, 1], bg: "from-blue-300/35 via-indigo-100/15", shadow: "shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_8px_32px_rgba(99,102,241,0.08)]" },
          { left: "78%", top: "35%", size: 110, delay: 2.5, rx: [360, 0], scale: [1, 0.9, 1], bg: "from-purple-300/35 via-pink-100/15", shadow: "shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_8px_32px_rgba(168,85,247,0.08)]" },
          { left: "45%", top: "68%", size: 90, delay: 4.5, rx: [0, 360], scale: [1, 1.15, 1], bg: "from-cyan-300/35 via-sky-100/15", shadow: "shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_8px_32px_rgba(6,182,212,0.08)]" }
        ].map((orb, i) => (
          <motion.div
            key={`glass-orb-${i}`}
            className={`absolute rounded-full border border-white/40 ${orb.shadow} bg-gradient-to-br ${orb.bg} to-transparent backdrop-blur-[2px] z-10`}
            style={{ left: orb.left, top: orb.top, width: orb.size, height: orb.size }}
            animate={{
              y: [0, -25, 20, 0],
              x: [0, 15, -15, 0],
              rotate: orb.rx,
              scale: orb.scale
            }}
            transition={{
              duration: 15 + i * 2.5,
              repeat: Infinity,
              delay: orb.delay,
              ease: "easeInOut"
            }}
          >
            {/* Transparent 3D circle inner ring */}
            <div className="absolute inset-2 rounded-full border border-indigo-200/20 bg-gradient-to-tr from-cyan-100/10 via-transparent to-purple-100/10" />
            <div className="absolute top-1 left-2.5 w-2 h-2 rounded-full bg-white/45 blur-[0.5px]" />
          </motion.div>
        ))}
      </div>

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
            Your photos. Your cloud. Your memories.
          </motion.p>
        </motion.div>

        {/* Grid */}
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
          }}
        >
          {features.map((f) => (
            <FeatureCard key={f.id} f={f} />
          ))}
        </div>
      </div>
    </section>
  );
}