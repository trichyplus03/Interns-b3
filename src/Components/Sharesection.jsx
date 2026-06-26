import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { getImages, generateShareLink, shareViaEmail, shareViaWhatsApp, getShareLinkForCopy } from "../api.js";

function formatSize(bytes) {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const WORKFLOW_STEPS = [
  {
    id: 1,
    label: "Upload Image",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
    color: "from-violet-500 to-indigo-500",
    ring: "ring-violet-500/30",
  },
  {
    id: 2,
    label: "Generate Link",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    color: "from-sky-500 to-cyan-500",
    ring: "ring-sky-500/30",
  },
  {
    id: 3,
    label: "Share",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
    ),
    color: "from-rose-500 to-pink-500",
    ring: "ring-rose-500/30",
  },
];

const SHARE_BUTTONS = [
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
    bg: "bg-sky-500/8 hover:bg-sky-500/12 border-sky-500/15 hover:border-sky-500/30",
    text: "text-sky-600",
    glowColor: "rgba(14, 165, 233, 0.08)",
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
    bg: "bg-emerald-500/8 hover:bg-emerald-500/12 border-emerald-500/15 hover:border-emerald-500/30",
    text: "text-emerald-600",
    glowColor: "rgba(16, 185, 129, 0.08)",
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
    bg: "bg-violet-500/8 hover:bg-violet-500/12 border-violet-500/15 hover:border-violet-500/30",
    text: "text-violet-600",
    glowColor: "rgba(139, 92, 246, 0.08)",
  },
];

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

/* ─── Typing Link Animation ─── */
function TypingLink({ text }) {
  return (
    <span className="flex-1 text-xs text-theme-text-muted truncate font-mono transition-colors duration-300">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 + i * 0.02, duration: 0.05 }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── Animated Step ─── */
function WorkflowStep({ step, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="flex items-start gap-5"
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col items-center">
        <motion.div
          className={`relative w-11 h-11 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg ring-4 ${step.ring} flex-shrink-0 cursor-pointer`}
          whileHover={{ scale: 1.18, rotate: 8 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          {step.icon}
          <AnimatePresence>
            {isHovered && (
              <>
                <motion.div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-br ${step.color}`}
                  initial={{ scale: 1, opacity: 0.4 }}
                  animate={{ scale: 1.8, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
                <motion.div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-br ${step.color}`}
                  initial={{ scale: 1, opacity: 0.3 }}
                  animate={{ scale: 2.2, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: 0.3 }}
                />
              </>
            )}
          </AnimatePresence>
        </motion.div>
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

      <motion.div
        className={`pb-${index < WORKFLOW_STEPS.length - 1 ? "8" : "0"} pt-1`}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 + index * 0.2 }}
      >
        <motion.p
          className="text-xs font-semibold uppercase tracking-widest mb-0.5"
          animate={isHovered ? { color: "var(--text-secondary)", x: 4 } : { color: "var(--text-muted)", x: 0 }}
          transition={{ duration: 0.2 }}
        >
          Step {step.id}
        </motion.p>
        <motion.h4
          className="text-theme-text font-semibold text-base transition-colors duration-300"
          animate={isHovered ? { x: 4 } : { x: 0 }}
          transition={{ duration: 0.2 }}
        >
          {step.label}
        </motion.h4>
        <motion.p
          className="text-sm mt-1 leading-relaxed"
          animate={isHovered ? { x: 4, color: "var(--text-primary)" } : { x: 0, color: "var(--text-secondary)" }}
          transition={{ duration: 0.2 }}
        >
          {step.id === 1 && "Select any image from your library or upload a new one instantly."}
          {step.id === 2 && "PhotoMall creates a secure, expirable link for your image automatically."}
          {step.id === 3 && "Send via Email, WhatsApp, or copy the link to any platform."}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

export default function ShareSection({ refreshTrigger }) {
  const [toastMsg, setToastMsg] = useState(null);
  const [clickedBtn, setClickedBtn] = useState(null);
  const [latestImage, setLatestImage] = useState(null);
  const [shareLink, setShareLink] = useState(null);
  const [allImages, setAllImages] = useState([]);
  const [emailInput, setEmailInput] = useState("");
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [selectedImageIds, setSelectedImageIds] = useState([]);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const glowScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1.2]);
  const parallaxLeft = useTransform(scrollYProgress, [0, 0.5], [-40, 0]);
  const parallaxRight = useTransform(scrollYProgress, [0, 0.5], [40, 0]);

  // Fetch all images and generate share link for the active one
  useEffect(() => {
    async function fetchImagesList() {
      try {
        const result = await getImages(1, 20); // fetch top 20 images
        if (result.success && result.data.length > 0) {
          setAllImages(result.data);
          
          // Default to the first (newest) image in the list
          const activeImg = result.data[0];
          setLatestImage(activeImg);
          setSelectedImageIds([activeImg._id]);
          // Generate share link
          const linkData = await generateShareLink(activeImg._id);
          setShareLink(linkData.shareUrl);
        } else {
          setAllImages([]);
          setLatestImage(null);
          setSelectedImageIds([]);
          setShareLink(null);
        }
      } catch {
        // Keep defaults
      }
    }
    fetchImagesList();
  }, [refreshTrigger]);

  const selectImageForSharing = async (img) => {
    try {
      setLatestImage(img);
      // Auto check this image if it isn't checked
      if (!selectedImageIds.includes(img._id)) {
        const nextIds = [...selectedImageIds, img._id];
        setSelectedImageIds(nextIds);
        await updateShareLinks(nextIds);
      }
    } catch {
      showToast("Failed to generate link.");
    }
  };

  const toggleImageSelection = async (id) => {
    let nextIds;
    if (selectedImageIds.includes(id)) {
      nextIds = selectedImageIds.filter((x) => x !== id);
    } else {
      nextIds = [...selectedImageIds, id];
    }
    setSelectedImageIds(nextIds);
    await updateShareLinks(nextIds);
  };

  const handleToggleSelectAll = async (e) => {
    const shouldSelectAll = e.target.checked;
    let nextIds = [];
    if (shouldSelectAll) {
      nextIds = allImages.map((img) => img._id);
    }
    setSelectedImageIds(nextIds);
    await updateShareLinks(nextIds);
  };

  const updateShareLinks = async (ids) => {
    if (!ids || ids.length === 0) {
      setShareLink("");
      return;
    }
    try {
      const links = await Promise.all(
        ids.map(async (id) => {
          const linkData = await generateShareLink(id);
          return linkData.shareUrl;
        })
      );
      setShareLink(links.join("\n"));
    } catch {
      // Keep previous
    }
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2200);
  };

  const handleShare = async (btn) => {
    setClickedBtn(btn.id);
    setTimeout(() => setClickedBtn(null), 600);

    if (selectedImageIds.length === 0) {
      showToast("Select at least one image first!");
      return;
    }

    try {
      if (btn.id === "email") {
        setShowEmailInput(true);
        return;
      }

      if (btn.id === "whatsapp") {
        showToast("Opening WhatsApp…");
        const links = await Promise.all(
          selectedImageIds.map(async (id) => {
            const data = await generateShareLink(id);
            return data.shareUrl;
          })
        );
        const combinedText = `📸 Check out these shared photos:\n\n` + links.join("\n");
        window.open(`https://wa.me/?text=${encodeURIComponent(combinedText)}`, "_blank");
        return;
      }

      if (btn.id === "copy") {
        const links = await Promise.all(
          selectedImageIds.map(async (id) => {
            const data = await generateShareLink(id);
            return data.shareUrl;
          })
        );
        const textToCopy = links.join("\n");
        await navigator.clipboard.writeText(textToCopy);
        setShareLink(textToCopy);
        showToast("Links copied!");
        return;
      }
    } catch {
      showToast("Something went wrong. Try again.");
    }
  };

  const handleSendEmail = async () => {
    if (!emailInput || selectedImageIds.length === 0) return;
    try {
      showToast("Sending share emails…");
      await Promise.all(
        selectedImageIds.map((id) => shareViaEmail(id, emailInput))
      );
      showToast("Links sent to email!");
      setShowEmailInput(false);
      setEmailInput("");
    } catch {
      showToast("Failed to send email. Check SMTP config.");
    }
  };

  return (
    <section ref={sectionRef} className="relative py-12 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden">

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
            Generate a shareable link in one click, then send it through Email, WhatsApp, or copy it anywhere.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* ── Left: preview card ── */}
          <motion.div
            style={{ x: parallaxLeft }}
            initial={{ opacity: 0, x: -50, rotateY: -10 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="relative rounded-2xl border border-theme-border bg-theme-card backdrop-blur-xl overflow-hidden shadow-theme-card transition-all duration-300"
              whileHover={{ 
                border: "1px solid var(--card-hover-border)",
                backgroundColor: "var(--card-hover-bg)",
                boxShadow: "var(--card-hover-shadow)",
                y: -6
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <motion.div
                className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-rose-500 via-pink-400 to-orange-400 opacity-80"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "left" }}
              />

              {/* Image preview */}
              <div 
                onClick={() => latestImage && setIsLightboxOpen(true)}
                className="relative m-5 rounded-xl overflow-hidden aspect-video bg-gradient-to-br from-indigo-50/50 via-slate-100 to-rose-50/50 flex items-center justify-center cursor-zoom-in group"
              >
                {latestImage?.thumbnailPath ? (
                  <>
                    <img
                      src={`/uploads/${latestImage.path}`}
                      alt={latestImage.originalName}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                      </svg>
                    </div>
                  </>
                ) : (
                  <>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-slate-50 to-rose-500/5"
                      animate={{
                        background: [
                          "linear-gradient(135deg, rgba(99,102,241,0.04) 0%, rgba(245,247,251,0.8) 50%, rgba(244,63,94,0.04) 100%)",
                          "linear-gradient(225deg, rgba(99,102,241,0.04) 0%, rgba(245,247,251,0.8) 50%, rgba(244,63,94,0.04) 100%)",
                          "linear-gradient(135deg, rgba(99,102,241,0.04) 0%, rgba(245,247,251,0.8) 50%, rgba(244,63,94,0.04) 100%)",
                        ],
                      }}
                      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="w-20 h-20 rounded-full bg-slate-200/40 flex items-center justify-center"
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <svg className="w-10 h-10 text-indigo-500/15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </motion.div>
                    </div>
                  </>
                )}

                {/* Floating dots */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full bg-indigo-500/8"
                    style={{ left: `${15 + i * 17}%`, top: `${20 + (i % 3) * 20}%` }}
                    animate={{ y: [0, -8, 0], opacity: [0.2, 0.7, 0.2], scale: [0.8, 1.3, 0.8] }}
                    transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
                  />
                ))}

                {/* Image label */}
                <motion.div
                  className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm rounded-lg px-2.5 py-1.5 flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <motion.div
                    className="w-2 h-2 rounded-full bg-rose-400"
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="text-[11px] text-white/80 font-medium">{latestImage?.originalName || "No image selected"}</span>
                </motion.div>
              </div>

              {/* Link bar */}
              <motion.div
                className="mx-5 mb-4 flex items-center gap-2 rounded-xl bg-theme-bg-alt/90 border border-theme-border px-3 py-2.5 transition-all duration-300 hover:border-theme-border-hover/60"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <svg className="w-4 h-4 text-theme-text-faint flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                {shareLink ? (
                  <TypingLink text={shareLink} />
                ) : (
                  <span className="flex-1 text-xs text-theme-text-faint truncate font-mono italic transition-colors duration-300">
                    Upload an image first…
                  </span>
                )}
                <motion.button
                  onClick={() => handleShare(SHARE_BUTTONS[2])}
                  className="flex-shrink-0 text-[11px] font-semibold text-rose-500 dark:text-rose-400 hover:opacity-80 transition-opacity"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Copy
                </motion.button>
              </motion.div>

              {/* Email input popup */}
              <AnimatePresence>
                {showEmailInput && (
                  <motion.div
                    className="mx-5 mb-4 flex items-center gap-2 rounded-xl bg-rose-500/5 border border-rose-500/20 px-3 py-2.5"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <input
                      type="email"
                      placeholder="recipient@email.com"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendEmail()}
                      className="flex-1 bg-transparent text-sm text-theme-text placeholder-theme-text-faint outline-none transition-colors duration-300"
                      autoFocus
                    />
                    <motion.button
                      onClick={handleSendEmail}
                      className="text-[11px] font-semibold text-rose-500 dark:text-rose-400 hover:opacity-80"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      Send
                    </motion.button>
                    <motion.button
                      onClick={() => setShowEmailInput(false)}
                      className="text-[11px] text-theme-text-muted hover:text-theme-text"
                      whileHover={{ scale: 1.1 }}
                    >
                      ✕
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Select image to share */}
              {allImages.length > 1 && (
                <div className="mx-5 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] text-theme-text-faint uppercase tracking-widest font-semibold transition-colors duration-300">
                      Select images to share
                    </p>
                    <label className="flex items-center gap-1.5 cursor-pointer text-xs text-theme-text-muted hover:text-rose-500 transition-colors">
                      <input 
                        type="checkbox" 
                        checked={selectedImageIds.length === allImages.length && allImages.length > 0}
                        onChange={handleToggleSelectAll}
                        className="rounded border-theme-border text-rose-500 focus:ring-rose-500/20 w-3.5 h-3.5"
                      />
                      <span className="font-semibold text-[10px] tracking-wider uppercase">Select All</span>
                    </label>
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {allImages.map((img, idx) => {
                      const isSelected = latestImage?._id === img._id;
                      const isChecked = selectedImageIds.includes(img._id);
                      return (
                        <motion.div
                          key={img._id}
                          onClick={() => selectImageForSharing(img)}
                          onDoubleClick={() => selectImageForSharing(img).then(() => setIsLightboxOpen(true))}
                          className={`relative w-12 h-12 rounded-lg border cursor-pointer flex-shrink-0 transition-all ${
                            isSelected
                              ? "border-rose-500 ring-2 ring-rose-500/20 scale-105"
                              : "border-white/15 opacity-80 hover:opacity-100 hover:border-white/30"
                          }`}
                          whileHover={{ scale: isSelected ? 1.05 : 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {img.thumbnailPath ? (
                            <img
                              src={`/uploads/${img.thumbnailPath}`}
                              alt={img.originalName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className={`w-full h-full bg-gradient-to-br ${getFileColor(idx)} flex items-center justify-center text-white text-[9px] font-bold`}>
                              {getInitials(img.originalName)}
                            </div>
                          )}

                          {/* Checkbox Overlay */}
                          <div 
                            className="absolute top-0.5 right-0.5 z-10 flex items-center justify-center"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleImageSelection(img._id);
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              readOnly
                              className="rounded border-white/40 text-rose-500 focus:ring-rose-500/20 w-3.5 h-3.5 bg-black/40 cursor-pointer shadow-sm"
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Share buttons */}
              <div className="mx-5 mb-5 grid grid-cols-3 gap-2.5">
                {SHARE_BUTTONS.map((btn, i) => (
                  <motion.button
                    key={btn.id}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.08, y: -3, boxShadow: `0 10px 30px -8px ${btn.glowColor}` }}
                    whileTap={{ scale: 0.93 }}
                    onClick={() => handleShare(btn)}
                    className={`relative flex flex-col items-center gap-2 rounded-xl border px-2 py-3 transition-all duration-200 ${btn.bg} ${btn.text} overflow-hidden`}
                  >
                    <AnimatePresence>
                      {clickedBtn === btn.id && (
                        <motion.div
                          className="absolute inset-0 bg-white/10 rounded-xl"
                          initial={{ scale: 0, opacity: 1 }}
                          animate={{ scale: 2.5, opacity: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.6 }}
                          style={{ transformOrigin: "center" }}
                        />
                      )}
                    </AnimatePresence>
                    <motion.div
                      animate={clickedBtn === btn.id ? { rotate: [0, -15, 15, 0], scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.4 }}
                    >
                      {btn.icon}
                    </motion.div>
                    <span className="text-[11px] font-semibold">{btn.shortLabel}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right: workflow steps ── */}
          <motion.div
            style={{ x: parallaxRight }}
            initial={{ opacity: 0, x: 50, rotateY: 10 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center"
          >
            <motion.h3
              className="text-xl font-semibold text-theme-text mb-8 transition-colors duration-300"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              How it works
            </motion.h3>

            <div className="relative flex flex-col gap-0">
              {WORKFLOW_STEPS.map((step, i) => (
                <WorkflowStep key={step.id} step={step} index={i} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="mt-10 rounded-2xl bg-gradient-to-br from-rose-500/10 to-pink-500/5 border border-rose-500/20 p-5 flex items-center gap-4 cursor-pointer"
            >
              <motion.div
                className="w-10 h-10 rounded-xl bg-rose-500/15 flex items-center justify-center flex-shrink-0"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg className="w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </motion.div>
              <div>
                <p className="text-sm font-semibold text-theme-text transition-colors duration-300">Private links, always</p>
                <p className="text-xs text-theme-text-muted mt-0.5 transition-colors duration-300">Links expire after 7 days and are only accessible to people you share with.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <AnimatedToast message={toastMsg} />

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && latestImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden bg-white/10 border border-white/20 p-2 shadow-2xl flex flex-col cursor-default"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 hover:bg-rose-600 hover:scale-105 active:scale-95 flex items-center justify-center text-white text-sm transition-all border border-white/10 cursor-pointer"
              >
                ✕
              </button>

              <img
                src={`/uploads/${latestImage.path}`}
                alt={latestImage.originalName}
                className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
              />

              <div className="mt-3 px-3 py-1 flex items-center justify-between text-white/95 font-sans">
                <span className="text-sm font-semibold truncate max-w-[70%]">{latestImage.originalName}</span>
                <span className="text-xs text-white/60">{formatSize(latestImage.size)}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function AnimatedToast({ message }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          key={message}
          initial={{ opacity: 0, y: 40, scale: 0.9, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 40, scale: 0.9, filter: "blur(4px)" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
        >
          <motion.div
            className="bg-theme-card border border-theme-border text-theme-text text-sm font-medium px-5 py-3 rounded-full shadow-theme-card flex items-center gap-2.5 transition-all duration-300"
            animate={{ boxShadow: ["0 0 0 0 rgba(16,185,129,0.3)", "0 0 0 12px rgba(16,185,129,0)", "0 0 0 0 rgba(16,185,129,0)"] }}
            transition={{ duration: 1.5 }}
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-emerald-400"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 0.6, repeat: 2 }}
            />
            {message}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}