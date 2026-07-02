import { motion } from "framer-motion";
import { useRef } from "react";


// Color palette for file thumbnails
const FILE_COLORS = [
  { color: "from-violet-500 to-indigo-600" },
  { color: "from-rose-500 to-orange-500" },
  { color: "from-sky-500 to-cyan-500" },
  { color: "from-emerald-500 to-teal-500" },
  { color: "from-amber-500 to-yellow-500" },
];

function getFileColor(index) {
  return FILE_COLORS[index % FILE_COLORS.length].color;
}

function getInitials(name) {
  return name
    .replace(/\.[^/.]+$/, "") // remove extension
    .split(/[-_ ]+/)
    .map((w) => w[0]?.toUpperCase() || "")
    .slice(0, 2)
    .join("");
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}



const MOCK_FILES = [
  { id: "mock-1", originalName: "summer_trip_2026.jpg", size: 2451024 },
  { id: "mock-2", originalName: "product_screenshot_final.png", size: 4812900 },
  { id: "mock-3", originalName: "mountain_sunrise.webp", size: 1054231 },
];

export default function UploadPreview() {
  const sectionRef = useRef(null);


  const totalMockSize = MOCK_FILES.reduce((sum, f) => sum + f.size, 0);

  return (
    <section
      id="upload-section"
      ref={sectionRef}
      className="relative w-full py-12 overflow-hidden bg-transparent"
      style={{ paddingLeft: "max(1rem, env(safe-area-inset-left))", paddingRight: "max(1rem, env(safe-area-inset-right))" }}
    >
      {/* Background Abstract Photo Frames and Light Gradients */}
      <div id="pixora-bg" className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(236,72,153,0.12),transparent_60%),radial-gradient(circle_at_75%_75%,rgba(249,115,22,0.1),transparent_60%)]" />
        
        {/* Transparent photography cards & photo frames */}
        {[
          { left: "6%", top: "25%", size: "w-28 h-32", rotation: -12, delay: 0 },
          { left: "82%", top: "15%", size: "w-32 h-36", rotation: 15, delay: 2 },
          { left: "85%", top: "60%", size: "w-28 h-32", rotation: -8, delay: 4 },
          { left: "8%", top: "65%", size: "w-36 h-40", rotation: 10, delay: 1 }
        ].map((card, i) => (
          <motion.div
            key={`photo-card-${i}`}
            className="hidden sm:flex absolute rounded-xl border border-slate-200/50 bg-white/30 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.02)] p-2.5 backdrop-blur-[1px] flex-col justify-between z-10"
            style={{
              left: card.left,
              top: card.top,
              width: card.size.split(" ")[0] === "w-28" ? 112 : card.size.split(" ")[0] === "w-32" ? 128 : 144,
              height: card.size.split(" ")[1] === "h-32" ? 128 : card.size.split(" ")[1] === "h-36" ? 144 : 160
            }}
            animate={{
              y: [0, -18, 12, 0],
              rotate: [card.rotation, card.rotation + 4, card.rotation - 4, card.rotation]
            }}
            transition={{
              duration: 18 + i * 2,
              delay: card.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            whileHover={{ scale: 1.05, y: -25, rotate: card.rotation * 1.2 }}
          >
            {/* Image area */}
            <div className="w-full h-[75%] rounded-lg bg-gradient-to-br from-pink-200/50 via-purple-100/40 to-blue-200/50 border border-white/50 flex items-center justify-center relative overflow-hidden">
              <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            {/* Polaroid caption lines */}
            <div className="flex flex-col gap-1 mt-2">
              <div className="w-12 h-1.5 rounded-full bg-slate-200/60" />
              <div className="w-8 h-1 rounded-full bg-slate-200/40" />
            </div>
          </motion.div>
        ))}

        {/* Small floating light particles */}
        {Array.from({ length: 12 }).map((_, idx) => {
          const colors = ["bg-pink-500/32", "bg-orange-500/35", "bg-purple-500/32", "bg-blue-500/35"];
          return (
            <motion.div
              key={`light-particle-${idx}`}
              className={`absolute rounded-full ${colors[idx % 4]}`}
              style={{
                left: `${Math.random() * 80 + 10}%`,
                top: `${Math.random() * 80 + 10}%`,
                width: Math.random() * 5 + 3,
                height: Math.random() * 5 + 3
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0, 0.8, 0],
                scale: [0.8, 1.3, 0.8]
              }}
              transition={{
                duration: 7 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
            />
          );
        })}

        {/* Camera aperture lens outline (abstract photography shape) */}
        <div className="absolute top-[30%] sm:top-[40%] left-1/2 sm:left-[35%] -translate-x-1/2 sm:translate-x-0 w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] rounded-full border border-pink-500/10 opacity-20 flex items-center justify-center">
          <div className="w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] rounded-full border border-dashed border-purple-500/15 flex items-center justify-center">
            <div className="w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] rounded-full border border-orange-500/10" />
          </div>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-5xl">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.span
            className="inline-block mb-4 px-3 py-1 text-[11px] font-semibold tracking-widest uppercase rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20"
            initial={{ opacity: 0, scale: 0.7, y: 10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 15 }}
            whileHover={{ scale: 1.08 }}
          >
            Uploads
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-theme-text leading-tight tracking-tight mb-4 transition-colors duration-300">
            <span className="inline-block whitespace-nowrap">
              {"Upload".split("").map((char, i) => (
                <motion.span
                  key={`upload-${i}`}
                  className="inline-block"
                  initial={{ opacity: 0, y: 40, rotateX: -90 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                >
                  {char}
                </motion.span>
              ))}
            </span>{" "}
            <motion.span
              className="bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent inline-block"
              initial={{ opacity: 0, y: 30, filter: "blur(10px)", scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              your images
            </motion.span>
          </h2>
          <motion.p
            className="text-theme-text-muted text-base sm:text-lg max-w-md mx-auto leading-relaxed transition-colors duration-300"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Drag and drop or select your photos. Fast, secure, always accessible.
          </motion.p>
        </motion.div>

        <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", alignItems: "stretch" }}>

          {/* Drop zone */}
          <div className="h-full">
            <div
              className="relative flex flex-col items-start rounded-2xl p-8 bg-theme-card backdrop-blur-xl border border-theme-border shadow-theme-card overflow-hidden group select-none text-left h-full"
            >
              <h3 className="text-sm font-semibold text-theme-text mb-6 flex items-center gap-2 transition-colors duration-300">
                <svg className="w-4 h-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0L8 12m4-4v12" />
                </svg>
                How Upload Works
              </h3>

              <div className="relative w-full flex flex-col mt-4">
                {[
                  {
                    step: "Step 1",
                    title: "Select File Formats",
                    desc: "Upload standard image files including PNG, JPG, JPEG, WEBP, or HEIC formats.",
                    gradient: "from-sky-500 to-cyan-500",
                    ring: "ring-sky-500/30",
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )
                  },
                  {
                    step: "Step 2",
                    title: "Review Size Limits",
                    desc: "Ensure each file is within the 20 MB limit to maintain fast upload speeds.",
                    gradient: "from-violet-500 to-indigo-500",
                    ring: "ring-violet-500/30",
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
                      </svg>
                    )
                  },
                  {
                    step: "Step 3",
                    title: "Drop Files Directly",
                    desc: "Drag and drop multiple files into the active upload area to begin processing.",
                    gradient: "from-emerald-500 to-teal-500",
                    ring: "ring-emerald-500/30",
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    )
                  },
                  {
                    step: "Step 4",
                    title: "Track Upload Progress",
                    desc: "Monitor real-time status bars and verify the green successfully uploaded state.",
                    gradient: "from-amber-500 to-yellow-500",
                    ring: "ring-amber-500/30",
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )
                  }
                ].map((item, index, arr) => {
                  const isEven = index % 2 === 0;
                  return (
                    <div key={index} className="relative w-full pb-10 last:pb-0">
                      {/* Connecting lines - Mobile (straight left line) */}
                      {index < arr.length - 1 && (
                        <div className="block sm:hidden absolute top-[44px] left-[22px] w-[2px] bottom-0 border-l-2 border-dashed border-slate-200/50 dark:border-slate-700/40" />
                      )}

                      {/* Connecting lines - Desktop Snake timeline loops */}
                      {index < arr.length - 1 && (
                        <>
                          {/* Vertical segment from current icon to row bottom */}
                          <div className={`hidden sm:block absolute top-[44px] ${isEven ? "left-[22px] border-l-2" : "right-[22px] border-r-2"} w-[2px] bottom-0 border-dashed border-slate-200/50 dark:border-slate-700/40`} />
                          {/* Horizontal cross segment connecting to next row's column */}
                          <div className="hidden sm:block absolute bottom-0 left-[22px] right-[22px] h-[2px] border-b-2 border-dashed border-slate-200/50 dark:border-slate-700/40" />
                        </>
                      )}

                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.12, duration: 0.5, ease: "easeOut" }}
                        className={`relative z-10 flex gap-5 items-start ${isEven ? "flex-row text-left" : "flex-row sm:flex-row-reverse text-left sm:text-right"}`}
                      >
                        <div className="flex flex-col items-center flex-shrink-0">
                          <div className={`relative w-11 h-11 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-lg ring-4 ${item.ring}`}>
                            {item.icon}
                          </div>
                        </div>
                        <div className="pt-1 flex-1">
                          <p className="text-[10px] font-semibold uppercase tracking-widest text-theme-text-muted mb-0.5">
                            {item.step}
                          </p>
                          <h4 className="text-xs font-semibold text-theme-text transition-colors duration-300">
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-theme-text-muted mt-1 leading-relaxed transition-colors duration-300">
                            {item.desc}
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Preview panel — mockup dashboard */}
          <div className="h-full">
            <div 
              className="rounded-2xl border border-theme-border bg-theme-card backdrop-blur-xl p-5 shadow-theme-card h-full flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.06]">
                <p className="text-sm font-semibold text-theme-text transition-colors duration-300">
                  Recent uploads
                </p>
                <span className="text-[11px] text-theme-text-faint bg-theme-card-hover border border-theme-border rounded-full px-2.5 py-0.5 transition-colors duration-300">
                  {MOCK_FILES.length} files
                </span>
              </div>

              <div className="space-y-2.5">
                {MOCK_FILES.map((file, idx) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-3 rounded-xl bg-white/60 border border-theme-border px-3.5 py-2.5 select-none group transition-all duration-300 hover:bg-white"
                  >
                    {/* Thumbnail initials */}
                    <div className={`flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br ${getFileColor(idx)} flex items-center justify-center text-white text-[10px] font-bold shadow-md`}>
                      {getInitials(file.originalName)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-theme-text truncate transition-colors duration-300">{file.originalName}</p>
                      <p className="text-[11px] text-theme-text-muted transition-colors duration-300">{formatSize(file.size)}</p>
                    </div>
                    <span className="flex-shrink-0 flex items-center gap-1.5 text-[10px] font-semibold text-emerald-600 bg-emerald-500/5 border border-emerald-500/15 rounded-full px-2 py-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Uploaded
                    </span>
                  </div>
                ))}
              </div>

              {/* Stacked thumbnail row */}
              <div className="mt-5 flex items-center select-none">
                {MOCK_FILES.map((file, i) => (
                  <div
                    key={file.id}
                    className="relative w-9 h-9 rounded-lg overflow-hidden shadow-lg border border-white/20"
                    style={{ marginLeft: i > 0 ? "-6px" : "0", zIndex: MOCK_FILES.length - i }}
                  >
                    <div className={`w-full h-full bg-gradient-to-br ${getFileColor(i)} flex items-center justify-center text-white text-[9px] font-bold`}>
                      {getInitials(file.originalName)}
                    </div>
                  </div>
                ))}
                <span className="ml-3 text-xs text-theme-text-muted transition-colors duration-300">
                  {MOCK_FILES.length} images
                </span>
              </div>

              <div className="mt-4 pt-4 border-t border-white/[0.06]">
                <div className="flex justify-between text-[11px] text-theme-text-faint mb-1.5 transition-colors duration-300">
                  <span>Total uploaded</span>
                  <span className="text-theme-text-muted transition-colors duration-300">
                    {formatSize(totalMockSize)}
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-theme-bg-alt overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-400"
                    style={{ width: "8%" }}
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}