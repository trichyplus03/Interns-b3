import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useState, useRef, useCallback } from "react";

// Color palette for file thumbnails
const FILE_COLORS = [
  { color: "from-violet-500 to-indigo-600", initials: "" },
  { color: "from-rose-500 to-orange-500", initials: "" },
  { color: "from-sky-500 to-cyan-500", initials: "" },
  { color: "from-emerald-500 to-teal-500", initials: "" },
  { color: "from-amber-500 to-yellow-500", initials: "" },
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

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30, scale: 0.95, filter: "blur(4px)" },
  visible: {
    opacity: 1, x: 0, scale: 1, filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ─── Animated Upload Ring ─── */
function UploadRing({ uploading }) {
  const circumference = 2 * Math.PI * 20;
  return (
    <motion.svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 56 56"
      initial={{ opacity: 0 }}
      animate={{ opacity: uploading ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.circle
        cx="28" cy="28" r="20"
        fill="none"
        stroke="rgba(14,165,233,0.3)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={circumference}
        animate={uploading ? {
          strokeDashoffset: [circumference, 0],
          rotate: [0, 360],
        } : {}}
        transition={{
          strokeDashoffset: { duration: 1.3, ease: "easeInOut" },
          rotate: { duration: 2, repeat: Infinity, ease: "linear" },
        }}
        style={{ transformOrigin: "center" }}
      />
    </motion.svg>
  );
}

/* ─── Magnetic Drop Zone Icon ─── */
function MagneticIcon({ isDragging, uploading }) {
  const iconX = useMotionValue(0);
  const iconY = useMotionValue(0);
  const springX = useSpring(iconX, { stiffness: 300, damping: 20 });
  const springY = useSpring(iconY, { stiffness: 300, damping: 20 });

  return (
    <motion.div
      className="relative w-14 h-14 rounded-2xl bg-sky-500/15 flex items-center justify-center mb-5"
      style={{ x: springX, y: springY }}
      animate={isDragging ? { scale: 1.14, rotate: 8 } : { scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 280, damping: 18 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        iconX.set((e.clientX - rect.left - rect.width / 2) * 0.15);
        iconY.set((e.clientY - rect.top - rect.height / 2) * 0.15);
      }}
      onMouseLeave={() => { iconX.set(0); iconY.set(0); }}
    >
      <UploadRing uploading={uploading} />
      <AnimatePresence mode="wait">
        {uploading ? (
          <motion.svg
            key="spinner"
            className="w-7 h-7 text-sky-400"
            fill="none"
            viewBox="0 0 24 24"
            initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <motion.circle
              className="opacity-25"
              cx="12" cy="12" r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <motion.path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "center" }}
            />
          </motion.svg>
        ) : (
          <motion.svg
            key="cloud"
            className="w-7 h-7 text-sky-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function UploadPreview({ images, onUpload, onDelete, getImageUrl }) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading]   = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  // Rename images prop to files internally for full compatibility with existing JSX
  const files = images || [];

  const handleUpload = useCallback(async (fileList) => {
    if (!fileList || fileList.length === 0) return;

    setUploading(true);
    setUploadProgress(0);
    setError(null);

    try {
      await onUpload(fileList, (progress) => {
        setUploadProgress(progress);
      });
    } catch (err) {
      setError("Upload failed. Please try again.");
      setTimeout(() => setError(null), 3000);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  }, [onUpload]);

  const handleDragOver  = useCallback((e) => { e.preventDefault(); setIsDragging(true); }, []);
  const handleDragLeave = useCallback(() => setIsDragging(false), []);
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    handleUpload(e.dataTransfer.files);
  }, [handleUpload]);

  const handleFileSelect = useCallback((e) => {
    handleUpload(e.target.files);
    e.target.value = ""; // reset so same file can be re-selected
  }, [handleUpload]);

  const handleDelete = (id) => {
    if (onDelete) onDelete(id);
  };

  const totalSize = files.reduce((sum, f) => sum + (f.size || 0), 0);

  return (
    <section
      id="upload-section"
      ref={sectionRef}
      className="relative w-full py-12 overflow-hidden bg-transparent"
      style={{ paddingLeft: "max(1rem, env(safe-area-inset-left))", paddingRight: "max(1rem, env(safe-area-inset-right))" }}
    >
      {/* Background Abstract Photo Frames and Light Gradients */}
      <div id="pixora-bg" className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(236,72,153,0.04),transparent_60%),radial-gradient(circle_at_75%_75%,rgba(249,115,22,0.03),transparent_60%)]" />
        
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
            style={{ left: card.left, top: card.top, width: card.size.split(" ")[0] === "w-28" ? 112 : card.size.split(" ")[0] === "w-32" ? 128 : 144, height: card.size.split(" ")[1] === "h-32" ? 128 : card.size.split(" ")[1] === "h-36" ? 144 : 160 }}
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
              {/* Photo shape (mountain outline) */}
              <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
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
        <div className="absolute top-[40%] left-[35%] w-[350px] h-[350px] rounded-full border border-pink-500/10 opacity-20 flex items-center justify-center">
          <div className="w-[280px] h-[280px] rounded-full border border-dashed border-purple-500/15 flex items-center justify-center">
            <div className="w-[180px] h-[180px] rounded-full border border-orange-500/10" />
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

        <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", alignItems: "start" }}>

          {/* Drop zone */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotateY: -5 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: parallaxY }}
          >
            <motion.div
              role="button"
              aria-label="Upload images"
              tabIndex={0}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
              className="relative flex flex-col items-center justify-center rounded-2xl cursor-pointer p-10 text-center bg-theme-card backdrop-blur-xl border border-theme-border shadow-theme-card overflow-hidden group"
              whileHover={{ 
                scale: 1.02, 
                border: "1px solid var(--card-hover-border)",
                backgroundColor: "var(--card-hover-bg)",
                boxShadow: "var(--card-hover-shadow)"
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <rect
                  x="2"
                  y="2"
                  width="calc(100% - 4px)"
                  height="calc(100% - 4px)"
                  rx="15"
                  fill="none"
                  stroke="url(#dropzoneGradient)"
                  strokeWidth="2.5"
                  strokeDasharray="8 5"
                  className="animate-marching-ants opacity-40 group-hover:opacity-80 transition-all duration-300"
                />
                <defs>
                  <linearGradient id="dropzoneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0ea5e9" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
              </svg>

              <input ref={fileInputRef} type="file" multiple accept="image/*" className="sr-only" onChange={handleFileSelect} />

              <MagneticIcon isDragging={isDragging} uploading={uploading} />

              <AnimatePresence mode="wait">
                <motion.p
                  key={uploading ? "uploading" : isDragging ? "dragging" : "idle"}
                  className="text-theme-text font-semibold text-base mb-1 transition-colors duration-300"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  {uploading ? `Uploading… ${uploadProgress}%` : isDragging ? "Release to upload" : "Upload Your Images"}
                </motion.p>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.p
                  key={uploading ? "processing" : "hint"}
                  className="text-theme-text-muted text-sm mb-5 transition-colors duration-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {uploading ? "Processing your photos" : "Drag and drop or select your photos"}
                </motion.p>
              </AnimatePresence>

              {/* Upload progress bar */}
              {uploading && (
                <motion.div
                  className="w-full max-w-xs h-1.5 rounded-full bg-theme-bg-alt overflow-hidden mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-400"
                    animate={{ width: `${uploadProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              )}

              <AnimatePresence>
                {!uploading && (
                  <motion.span
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white text-sm font-semibold shadow-md shadow-sky-500/20 pointer-events-none"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    Browse files
                  </motion.span>
                )}
              </AnimatePresence>

              <motion.p className="mt-5 text-[10px] text-slate-600 uppercase tracking-widest">
                PNG · JPG · WEBP · HEIC
              </motion.p>

              {/* Error message */}
              <AnimatePresence>
                {error && (
                  <motion.p
                    className="mt-3 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Animated border pulse on drag */}
              <AnimatePresence>
                {isDragging && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: [0.4, 0.8, 0.4], scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ opacity: { duration: 1, repeat: Infinity }, scale: { duration: 0.3 } }}
                    className="absolute inset-0 rounded-2xl border-2 border-sky-400 pointer-events-none"
                  />
                )}
              </AnimatePresence>

              {/* Corner decorations */}
              {[
                "top-3 left-3",
                "top-3 right-3 rotate-90",
                "bottom-3 left-3 -rotate-90",
                "bottom-3 right-3 rotate-180",
              ].map((pos, i) => (
                <motion.div
                  key={i}
                  className={`absolute ${pos} w-3 h-3 pointer-events-none`}
                  initial={{ opacity: 0 }}
                  animate={isDragging ? { opacity: 0.6 } : { opacity: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="w-full h-px bg-sky-400" />
                  <div className="w-px h-full bg-sky-400" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Preview panel — real data from API */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotateY: 5 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div 
              className="rounded-2xl border border-theme-border bg-theme-card backdrop-blur-xl p-5 shadow-theme-card transition-all duration-300"
              whileHover={{ 
                border: "1px solid var(--card-hover-border)",
                backgroundColor: "var(--card-hover-bg)",
                boxShadow: "var(--card-hover-shadow)",
                y: -4
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between mb-4">
                <motion.p className="text-sm font-semibold text-theme-text transition-colors duration-300"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  Recent uploads
                </motion.p>
                <motion.span
                  className="text-[11px] text-theme-text-faint bg-theme-card-hover border border-theme-border rounded-full px-2.5 py-0.5 transition-colors duration-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                >
                  {files.length} files
                </motion.span>
              </div>

              {files.length === 0 ? (
                <motion.div
                  className="text-center py-8 text-theme-text-muted text-sm transition-colors duration-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p>No images uploaded yet</p>
                  <p className="text-xs mt-1 text-theme-text-faint transition-colors duration-300">Upload your first image to see it here</p>
                </motion.div>
              ) : (
                <div className="space-y-2.5">
                  {files.slice(0, 5).map((file, idx) => (
                    <motion.div
                      key={file._id || file.id || idx}
                      initial={{ opacity: 0, x: -20, scale: 0.98 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ 
                        scale: 1.025, 
                        x: 6, 
                        border: "1px solid var(--card-hover-border)",
                        boxShadow: "0 8px 24px -10px rgba(99,102,241,0.12)" 
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-3 rounded-xl bg-white/60 border border-theme-border px-3.5 py-2.5 cursor-pointer group transition-all duration-300 hover:bg-white"
                      layout
                    >
                      {/* Thumbnail or initials */}
                      {file.thumbnailPath ? (
                        <img
                          src={getImageUrl(file.thumbnailPath)}
                          alt={file.originalName}
                          className="flex-shrink-0 w-9 h-9 rounded-lg object-cover shadow-md"
                        />
                      ) : (
                        <motion.div
                          className={`flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br ${getFileColor(idx)} flex items-center justify-center text-white text-[10px] font-bold shadow-md`}
                          whileHover={{ rotate: [0, -10, 10, 0], scale: 1.15 }}
                          transition={{ duration: 0.4 }}
                        >
                          {getInitials(file.originalName)}
                        </motion.div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-theme-text truncate transition-colors duration-300">{file.originalName}</p>
                        <p className="text-[11px] text-theme-text-muted transition-colors duration-300">{formatSize(file.size)}</p>
                      </div>
                      {/* Delete button */}
                      <motion.button
                        className="flex-shrink-0 opacity-0 group-hover:opacity-100 text-theme-text-faint hover:text-rose-500 transition-all p-1"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => { e.stopPropagation(); handleDelete(file._id); }}
                        title="Delete"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </motion.button>
                      <motion.span
                        className="flex-shrink-0 flex items-center gap-1.5 text-[10px] font-semibold text-emerald-600 bg-emerald-500/5 border border-emerald-500/15 rounded-full px-2 py-0.5"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + idx * 0.1, type: "spring", stiffness: 400, damping: 15 }}
                      >
                        <motion.span
                          className="w-1.5 h-1.5 rounded-full bg-emerald-500"
                          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        Uploaded
                      </motion.span>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Stacked thumbnail row */}
              {files.length > 0 && (
                <div className="mt-5 flex items-center">
                  {files.slice(0, 4).map((file, i) => (
                    <motion.div
                      key={file._id}
                      initial={{ opacity: 0, scale: 0.3, rotate: -30 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.12, type: "spring", stiffness: 260, damping: 18 }}
                      whileHover={{ scale: 1.25, zIndex: 10, rotate: [0, -5, 5, 0], y: -4 }}
                      className="relative w-9 h-9 rounded-lg overflow-hidden shadow-lg cursor-pointer"
                      style={{ marginLeft: i > 0 ? "-6px" : "0", zIndex: files.length - i }}
                      title={file.originalName}
                    >
                      {file.thumbnailPath ? (
                        <img src={getImageUrl(file.thumbnailPath)} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${getFileColor(i)} flex items-center justify-center text-white text-[9px] font-bold`}>
                          {getInitials(file.originalName)}
                        </div>
                      )}
                    </motion.div>
                  ))}
                  <motion.span
                    className="ml-3 text-xs text-theme-text-muted transition-colors duration-300"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9 }}
                  >
                    {files.length} image{files.length !== 1 ? "s" : ""}
                  </motion.span>
                </div>
              )}

              {/* Batch bar */}
              <div className="mt-4 pt-4 border-t border-white/[0.06]">
                <div className="flex justify-between text-[11px] text-theme-text-faint mb-1.5 transition-colors duration-300">
                  <span>Total uploaded</span>
                  <motion.span className="text-theme-text-muted transition-colors duration-300">
                    {formatSize(totalSize)}
                  </motion.span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-theme-bg-alt overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-400"
                    initial={{ width: "0%" }}
                    whileInView={{ width: `${Math.min(100, (totalSize / (10 * 1024 * 1024 * 1024)) * 100)}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <motion.div
                      className="h-full w-full bg-gradient-to-r from-transparent via-white/25 to-transparent"
                      animate={{ x: ["-100%", "300%"] }}
                      transition={{ duration: 2, delay: 1.5, repeat: Infinity, repeatDelay: 3 }}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}