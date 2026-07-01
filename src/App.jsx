import { useState, useEffect } from "react";
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import TrustedBy from './Components/TrustedBy'
import Footer from './Components/Footer'
import Contact from './Components/Contact'
import Features from "./Components/Features";
import StorageSection from "./Components/Storagesection";
import UploadPreview from "./Components/Uploadpreview";
import ShareSection from "./Components/Sharesection";
import Pricing from "./Components/Pricing";
import Testimonials from "./Components/Testimonials";
import FAQ from "./Components/FAQ";
import CTA from "./Components/CTA";

// In-memory cache for Blob Object URLs created in the current tab session
const sessionObjectUrls = new Map();

// Helper to convert files to Base64 strings for localStorage persistence
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

// ─── Default Sample Data ──────────────────────────────────────
const DEFAULT_IMAGES = [
  {
    _id: "img_mock_1",
    originalName: "Alpine Summit.jpg",
    fileName: "Alpine Summit.jpg",
    mimeType: "image/jpeg",
    size: 1543200,
    path: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    thumbnailPath: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=150&q=80",
    shareToken: "token_alpine_summit",
    shareExpiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "img_mock_2",
    originalName: "Yosemite Valley.jpg",
    fileName: "Yosemite Valley.jpg",
    mimeType: "image/jpeg",
    size: 2100400,
    path: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    thumbnailPath: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=150&q=80",
    shareToken: "token_yosemite_valley",
    shareExpiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "img_mock_3",
    originalName: "Tropical Sunset.jpg",
    fileName: "Tropical Sunset.jpg",
    mimeType: "image/jpeg",
    size: 1876400,
    path: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    thumbnailPath: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=150&q=80",
    shareToken: "token_tropical_sunset",
    shareExpiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export default function App() {
  // Initialize state directly from localStorage or default mockup list
  const [images, setImages] = useState(() => {
    const stored = localStorage.getItem("pixora_images");
    if (!stored) {
      localStorage.setItem("pixora_images", JSON.stringify(DEFAULT_IMAGES));
      return DEFAULT_IMAGES;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return DEFAULT_IMAGES;
    }
  });

  useEffect(() => {
    // Clear any left-over dark mode settings
    window.document.documentElement.classList.remove("dark");
    localStorage.removeItem("theme");
  }, []);

  // Helper to resolve paths to base64 payload or object URL
  const getImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http") || path.startsWith("data:") || path.startsWith("blob:")) {
      return path;
    }
    if (sessionObjectUrls.has(path)) {
      return sessionObjectUrls.get(path);
    }
    const localData = localStorage.getItem(`pixora_data_${path}`);
    if (localData) {
      return localData;
    }
    return `/uploads/${path}`;
  };

  // Calculate storage stats dynamically on-the-fly when images state updates
  const totalGB = 10;
  const usedBytes = images.reduce((sum, img) => sum + img.size, 0);
  const fileCount = images.length;
  const usedGB = parseFloat((usedBytes / (1024 * 1024 * 1024)).toFixed(4));
  const availableGB = parseFloat(Math.max(0, totalGB - usedGB).toFixed(4));
  const usedPercent = parseFloat(((usedGB / totalGB) * 100).toFixed(2));

  const storageStats = {
    totalGB,
    usedBytes,
    usedGB,
    availableGB,
    usedPercent,
    fileCount,
  };

  // Handle new image files mock uploads
  const handleUpload = async (fileList, onProgress) => {
    // Simulate progression timeline
    for (let i = 1; i <= 10; i++) {
      await new Promise((resolve) => setTimeout(resolve, 80));
      if (onProgress) onProgress(i * 10);
    }

    const filesArray = Array.from(fileList);
    const newUploaded = [];

    for (const file of filesArray) {
      const id = "img_" + Math.random().toString(36).substring(2, 9);
      const objUrl = URL.createObjectURL(file);
      sessionObjectUrls.set(id, objUrl);

      let persistentPath = objUrl;

      // Small files get persisted in base64 format
      if (file.size < 1.5 * 1024 * 1024) {
        try {
          persistentPath = await fileToBase64(file);
        } catch (err) {
          console.error("Failed to read file as Base64", err);
        }
      } else {
        persistentPath = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80";
      }

      try {
        localStorage.setItem(`pixora_data_${id}`, persistentPath);
      } catch (quotaError) {
        console.warn("Storage quota exceeded. Saving as session-only Object URL.");
        localStorage.setItem(`pixora_data_${id}`, "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80");
      }

      const newImage = {
        _id: id,
        originalName: file.name,
        fileName: file.name,
        mimeType: file.type || "image/jpeg",
        size: file.size,
        path: id,
        thumbnailPath: id,
        shareToken: "token_" + Math.random().toString(36).substring(2, 9),
        shareExpiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date().toISOString(),
      };

      newUploaded.push(newImage);
    }

    const nextImages = [...newUploaded, ...images];
    setImages(nextImages);
    localStorage.setItem("pixora_images", JSON.stringify(nextImages));
    return { success: true };
  };

  // Handle mock deleting of an image from storage
  const handleDelete = (id) => {
    const nextImages = images.filter((img) => img._id !== id);
    setImages(nextImages);
    localStorage.setItem("pixora_images", JSON.stringify(nextImages));

    localStorage.removeItem(`pixora_data_${id}`);
    if (sessionObjectUrls.has(id)) {
      URL.revokeObjectURL(sessionObjectUrls.get(id));
      sessionObjectUrls.delete(id);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] antialiased">
      <Navbar />
      <main>
        {/* 1. Hero Section */}
        <Hero />
        
        {/* 2. Trusted By Section */}
        <TrustedBy />

        {/* 3. Features Section */}
        <section id="features">
          <Features />
        </section>

        {/* 4. Storage Section */}
        <section id="storage">
          <StorageSection storageStats={storageStats} />
        </section>

        {/* 5. Upload & Share Workspace */}
        <section id="workspace" className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <UploadPreview 
              images={images} 
              onUpload={handleUpload} 
              onDelete={handleDelete} 
              getImageUrl={getImageUrl} 
            />
            <ShareSection 
              images={images} 
              getImageUrl={getImageUrl} 
            />
          </div>
        </section>

        {/* 6. Pricing Section */}
        <section id="pricing">
          <Pricing />
        </section>

        {/* 7. Testimonials Section */}
        <Testimonials />

        {/* 8. FAQ Section */}
        <section id="faq">
          <FAQ />
        </section>

        {/* 9. CTA Section */}
        <CTA />

        {/* 10. Contact Section */}
        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
}
