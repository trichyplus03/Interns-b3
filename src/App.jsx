import { useState, useEffect } from "react";
import Features from "./Components/Features";
import StorageSection from "./Components/Storagesection";
import UploadPreview from "./Components/Uploadpreview";
import ShareSection from "./Components/Sharesection";

export default function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    // Clear any left-over dark mode settings
    window.document.documentElement.classList.remove("dark");
    localStorage.removeItem("theme");
  }, []);

  const handleRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/20 via-slate-50/90 to-indigo-100/30 text-theme-text font-sans antialiased relative overflow-hidden transition-colors duration-300">
      {/* Premium checked grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          backgroundImage: `
            radial-gradient(rgba(99, 102, 241, 0.18) 1.5px, transparent 1.5px),
            linear-gradient(to right, rgba(99, 102, 241, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px, 48px 48px, 48px 48px",
          maskImage: "radial-gradient(ellipse at top, black 50%, rgba(0,0,0,0.3) 80%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse at top, black 50%, rgba(0,0,0,0.3) 80%, transparent 100%)"
        }}
      />

      {/* Premium workspace ambient glows */}
      <div aria-hidden="true" className="pointer-events-none absolute top-[-15%] left-[5%] w-[min(900px,100vw)] h-[900px] rounded-full bg-indigo-300/35 blur-[110px] animate-blob" />
      <div aria-hidden="true" className="pointer-events-none absolute top-[20%] right-[-15%] w-[min(800px,100vw)] h-[800px] rounded-full bg-rose-300/30 blur-[105px] animate-blob-reverse" />
      <div aria-hidden="true" className="pointer-events-none absolute top-[55%] left-[-10%] w-[min(850px,100vw)] h-[850px] rounded-full bg-sky-300/35 blur-[110px] animate-blob" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-[-15%] right-[5%] w-[min(750px,100vw)] h-[750px] rounded-full bg-violet-300/32 blur-[100px] animate-blob-reverse" />

      <div className="relative z-10">
        {/* 1 ─ Feature grid */}
        <Features />

        {/* 2 ─ Storage dashboard */}
        <StorageSection refreshTrigger={refreshTrigger} />

        {/* 3 ─ Drag-and-drop upload preview */}
        <UploadPreview onUploadSuccess={handleRefresh} />

        {/* 4 ─ Image sharing (Email / WhatsApp / Copy Link) */}
        <ShareSection refreshTrigger={refreshTrigger} />
      </div>
    </main>
  );
}