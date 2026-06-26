import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useState, useRef, useCallback, useEffect } from "react";
import { uploadImages, getImages, deleteImage } from "../api.js";

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

export default function UploadPreview({ onUploadSuccess }) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading]   = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  // Fetch existing images on mount
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const result = await getImages(1, 10);
      if (result.success) {
        setFiles(result.data);
      }
    } catch {
      // Silently fail — show empty list
    }
  };

  const handleUpload = useCallback(async (fileList) => {
    if (!fileList || fileList.length === 0) return;

    setUploading(true);
    setUploadProgress(0);
    setError(null);

    try {
      const filesArray = Array.from(fileList);
      const result = await uploadImages(filesArray, (progress) => {
        setUploadProgress(progress);
      });

      if (result.success) {
        // Refresh the file list
        await fetchImages();
        if (onUploadSuccess) onUploadSuccess();
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Upload failed. Please try again.";
      setError(msg);
      setTimeout(() => setError(null), 3000);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  }, [onUploadSuccess]);

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

  const handleDelete = async (id) => {
    try {
      await deleteImage(id);
      setFiles((prev) => prev.filter((f) => f._id !== id));
      if (onUploadSuccess) onUploadSuccess();
    } catch {
      // Silently fail
    }
  };

  const totalSize = files.reduce((sum, f) => sum + (f.size || 0), 0);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-12 overflow-hidden bg-transparent"
      style={{ paddingLeft: "max(1rem, env(safe-area-inset-left))", paddingRight: "max(1rem, env(safe-area-inset-right))" }}
    >

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
            {"Upload ".split("").map((char, i) => (
              <motion.span
                key={`upload-${i}`}
                className="inline-block"
                initial={{ opacity: 0, y: 40, rotateX: -90 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
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
                          src={`/uploads/${file.thumbnailPath}`}
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
                        <img src={`/uploads/${file.thumbnailPath}`} alt="" className="w-full h-full object-cover" />
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