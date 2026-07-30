import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, Phone, Instagram, Facebook, Download, FileText, X, CheckCircle2, FileImage } from "lucide-react";
import iintBrochureImg from "../assets/images/iint_official_brochure_1785215344629.jpg";

interface RightFloatingDockProps {
  onOpenBrochureModal?: () => void;
}

export default function RightFloatingDock({ onOpenBrochureModal }: RightFloatingDockProps) {
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleBrochureClick = () => {
    if (onOpenBrochureModal) {
      onOpenBrochureModal();
    } else {
      setShowBrochureModal(true);
    }
  };

  const handleTriggerDownload = () => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = iintBrochureImg;
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth || 1200;
        canvas.height = img.naturalHeight || 1600;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
          const dataUrl = canvas.toDataURL("image/jpeg", 0.95);
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "IINT_Official_Admission_Brochure.jpg";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      } catch (e) {
        const link = document.createElement("a");
        link.href = iintBrochureImg;
        link.download = "IINT_Official_Admission_Brochure.jpg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    };
    img.onerror = () => {
      const link = document.createElement("a");
      link.href = iintBrochureImg;
      link.download = "IINT_Official_Admission_Brochure.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
      setShowBrochureModal(false);
    }, 3000);
  };

  return (
    <>
      {/* Right Floating Dock Strip - Compact icons */}
      <div className="fixed right-0 bottom-24 sm:bottom-28 z-40 flex flex-col gap-1.5 p-1.5 bg-zinc-950/90 backdrop-blur-lg border-l border-y border-zinc-800/80 rounded-l-2xl shadow-2xl">
        
        {/* 1. WhatsApp Button (Green) */}
        <a
          href="https://wa.me/919255593976?text=Hello%20IINT%20Adarsh%20Institute%2C%20I%20want%20information%20about%20courses%20and%20admissions."
          target="_blank"
          rel="noreferrer"
          title="Chat on WhatsApp"
          className="w-8 h-8 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center transition-all duration-300 shadow-md hover:scale-105 group relative cursor-pointer"
        >
          <MessageCircle size={16} className="fill-white/20" />
          <span className="absolute right-10 bg-zinc-900 text-white text-[11px] font-medium px-2.5 py-1 rounded-lg border border-zinc-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
            WhatsApp Inquiry
          </span>
        </a>

        {/* 2. Call Helpline Button (Yellow/Orange) */}
        <a
          href="tel:+917011016060"
          title="Call Helpline (070110 16060 / 9255593976)"
          className="w-8 h-8 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center transition-all duration-300 shadow-md hover:scale-105 group relative cursor-pointer"
        >
          <Phone size={16} className="fill-slate-950/20" />
          <span className="absolute right-10 bg-zinc-900 text-white text-[11px] font-medium px-2.5 py-1 rounded-lg border border-zinc-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
            Call Helpline (070110 16060 / 9255593976)
          </span>
        </a>

        {/* 3. Instagram Button (Pink Gradient) */}
        <a
          href="https://www.instagram.com/iint_sonipat?igsh=MXIxYXY4MnN6emJtbw=="
          target="_blank"
          rel="noreferrer"
          title="Follow on Instagram"
          className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 hover:opacity-90 text-white flex items-center justify-center transition-all duration-300 shadow-md hover:scale-105 group relative cursor-pointer"
        >
          <Instagram size={16} />
          <span className="absolute right-10 bg-zinc-900 text-white text-[11px] font-medium px-2.5 py-1 rounded-lg border border-zinc-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
            Instagram Updates
          </span>
        </a>

        {/* 4. Facebook Button (Blue) */}
        <a
          href="https://www.facebook.com/share/19A6P1KQG9/"
          target="_blank"
          rel="noreferrer"
          title="Facebook Page"
          className="w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-all duration-300 shadow-md hover:scale-105 group relative cursor-pointer"
        >
          <Facebook size={16} className="fill-white/20" />
          <span className="absolute right-10 bg-zinc-900 text-white text-[11px] font-medium px-2.5 py-1 rounded-lg border border-zinc-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
            Facebook Page
          </span>
        </a>



        {/* 6. Download Brochure Button (Rose) */}
        <button
          onClick={handleBrochureClick}
          title="Download Prospectus & Brochure"
          className="w-8 h-8 rounded-lg bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center transition-all duration-300 shadow-md hover:scale-105 group relative cursor-pointer"
        >
          <Download size={16} />
          <span className="absolute right-10 bg-zinc-900 text-white text-[11px] font-medium px-2.5 py-1 rounded-lg border border-zinc-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
            Download Brochure
          </span>
        </button>

      </div>

      {/* Brochure Modal */}
      <AnimatePresence>
        {showBrochureModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBrochureModal(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative z-10 w-full max-w-md rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl p-6 sm:p-8 text-white text-left"
            >
              <div className="flex items-start justify-between gap-4 border-b border-zinc-900 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-2xl">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black tracking-tight text-white uppercase">
                      Institute Prospectus 2026
                    </h3>
                    <p className="text-xs text-zinc-400">Download Official Course Brochure JPG</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowBrochureModal(false)}
                  className="p-1.5 rounded-full hover:bg-zinc-900 text-zinc-400 hover:text-white transition-all cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {!downloadSuccess ? (
                <div className="space-y-4">
                  <p className="text-xs text-zinc-300 font-light leading-relaxed">
                    Get detailed info on DCA, ADCA, Tally Prime with GST, B.Ed Teacher Training, BCA/MCA degrees, syllabus modules, fee discounts, and campus facilities.
                  </p>

                  <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-400 space-y-1.5 font-mono">
                    <p className="text-emerald-400 font-bold">🖼️ IINT_Official_Admission_Brochure.jpg</p>
                    <p className="text-[10px]">Format: JPG • Verified Official Document</p>
                  </div>

                  <button
                    onClick={handleTriggerDownload}
                    className="w-full py-3 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Download size={15} />
                    Download Brochure (JPG)
                  </button>
                </div>
              ) : (
                <div className="py-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
                    <CheckCircle2 size={28} />
                  </div>
                  <h4 className="text-base font-bold text-white">Brochure Download Triggered!</h4>
                  <p className="text-xs text-zinc-400">
                    Your official IINT Academic Brochure has been generated. Our admission team is also available for any direct questions at <span className="text-amber-400 font-bold">9255593976</span>.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
