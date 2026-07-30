import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Download, FileImage, Eye, CheckCircle2, ShieldCheck, Sparkles, ZoomIn, X, Phone, Globe } from "lucide-react";
import iintBrochureImg from "../assets/images/iint_official_brochure_1785215344629.jpg";

interface BrochureSectionProps {
  onApplyNow?: () => void;
}

export default function BrochureSection({ onApplyNow }: BrochureSectionProps) {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleDownloadJpg = (filename = "IINT_Official_Admission_Brochure.jpg") => {
    setDownloading(true);
    
    // Create image element to convert to canvas and download strictly as JPG
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
          // Fill background with white for clean JPEG encoding
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
          
          const dataUrl = canvas.toDataURL("image/jpeg", 0.95);
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          // Fallback direct download link
          const link = document.createElement("a");
          link.href = iintBrochureImg;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      } catch (err) {
        const link = document.createElement("a");
        link.href = iintBrochureImg;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } finally {
        setDownloading(false);
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 4000);
      }
    };

    img.onerror = () => {
      // Direct file link fallback
      const link = document.createElement("a");
      link.href = iintBrochureImg;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    };
  };

  const BROCHURE_MODULES = [
    {
      title: "Module 1: Office Automation (Basic Windows 10/11)",
      items: ["MS-Word", "MS-Excel", "MS-PowerPoint", "Paint", "Office Version-2021"],
      duration: "3 Months",
      code: "OA-BASICS"
    },
    {
      title: "Module 2: DTP (Desktop Publishing)",
      items: ["Photoshop Basic", "Removing bg layers", "Blending modes & editing", "Vector Graphic Design (Logo, Visiting Cards, Brochure)"],
      duration: "3 Months",
      code: "DTP-GRAPHICS"
    },
    {
      title: "Module 3: Tally Prime with GST & TDS",
      items: ["Basic accounting", "Journal entries & bills creation", "Tax deduction (GST and TDS)", "PAYROLL"],
      duration: "3 Months",
      code: "TALLY-PRIME"
    },
    {
      title: "Module 4: Web Designing",
      items: ["HTML5", "CSS3 & Responsive Layouts", "Flash MX & UI Animation"],
      duration: "3 Months",
      code: "WEB-DESIGN"
    },
    {
      title: "Module 5: Spoken English & Personality Development",
      items: ["Fluency Building", "Grammar & Vocabulary", "Public Speaking & Interviews"],
      duration: "2 Months",
      code: "ENGLISH-SPOKEN"
    }
  ];

  return (
    <section className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 text-white">
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono font-bold tracking-wider uppercase">
          <Sparkles size={14} />
          <span>Official Institute Prospectus & Syllabus</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
          IINT Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300">Brochures & Prospectus</span>
        </h1>
        <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed">
          Download our complete official admission prospectus, NSDC certified course modules, duration breakdown, and scholarship criteria directly in high-quality <span className="text-amber-400 font-bold">JPG format</span>.
        </p>
      </div>

      {/* Main Brochure Showcase Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-zinc-950/80 border border-zinc-800 p-6 sm:p-10 rounded-3xl backdrop-blur-xl shadow-2xl relative overflow-hidden">
        
        {/* Left Side: Brochure Preview Image with Zoom & Download Action */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative group rounded-2xl overflow-hidden border border-zinc-700/80 shadow-2xl cursor-pointer max-w-sm w-full" onClick={() => setIsPreviewOpen(true)}>
            <img 
              src={iintBrochureImg} 
              alt="IINT Official Admission Brochure 2026" 
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="p-3 bg-zinc-900/90 text-white rounded-full border border-zinc-700 flex items-center gap-2 text-xs font-bold shadow-xl">
                <ZoomIn size={16} />
                <span>Click to Preview Fullscreen</span>
              </div>
            </div>
            <div className="absolute top-3 left-3 bg-rose-600/90 text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-md shadow-md border border-rose-400/50">
              Official Poster (JPG)
            </div>
          </div>

          <div className="flex items-center gap-3 mt-4 w-full max-w-sm">
            <button
              onClick={() => setIsPreviewOpen(true)}
              className="flex-1 py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Eye size={14} />
              Preview Poster
            </button>
            <button
              onClick={() => handleDownloadJpg("IINT_Official_Admission_Brochure.jpg")}
              disabled={downloading}
              className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-lg active:scale-95 cursor-pointer"
            >
              <Download size={14} />
              Download JPG
            </button>
          </div>
        </div>

        {/* Right Side: Detailed Highlights & Instant Download Call-To-Action */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-emerald-400 font-extrabold uppercase bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/30">
              A Unit of Adarsh Welfare & Education Organisation
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              BUILD SKILLS. BUILD FUTURE.
            </h2>
            <p className="text-amber-400 text-xs sm:text-sm font-semibold italic">
              "Your Success is Our Mission"
            </p>
          </div>

          <p className="text-zinc-300 text-xs sm:text-sm font-light leading-relaxed">
            Download the official admission poster featuring our popular computer modules, NSDC certification badge, 100% practical lab training guarantee, placement cell support, and scholarship options for DCA & English Spoken students.
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
            <div className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-xl text-center">
              <span className="block text-lg font-black text-amber-400">5000+</span>
              <span className="text-[10px] text-zinc-400 font-mono">Students Trained</span>
            </div>
            <div className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-xl text-center">
              <span className="block text-lg font-black text-emerald-400">25+</span>
              <span className="text-[10px] text-zinc-400 font-mono">Courses</span>
            </div>
            <div className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-xl text-center">
              <span className="block text-lg font-black text-cyan-400">98%</span>
              <span className="text-[10px] text-zinc-400 font-mono">Success Rate</span>
            </div>
            <div className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-xl text-center">
              <span className="block text-lg font-black text-rose-400">4.9 ★</span>
              <span className="text-[10px] text-zinc-400 font-mono">Google Rating</span>
            </div>
          </div>

          {/* Primary JPG Download Action Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-950/40 via-zinc-900 to-zinc-900 border border-rose-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-rose-400">
                <FileImage size={20} />
                <span className="text-xs font-mono font-bold text-white">IINT_Official_Admission_Brochure.jpg</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-500/30">
                Ready for JPG Download
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={() => handleDownloadJpg("IINT_Official_Admission_Brochure.jpg")}
                disabled={downloading}
                className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-xl active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <Download size={16} />
                {downloading ? "Generating JPG..." : "Click to Download Brochure (JPG)"}
              </button>

              {onApplyNow && (
                <button
                  onClick={onApplyNow}
                  className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  Apply Online
                </button>
              )}
            </div>

            {downloadSuccess && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }} 
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-xs text-emerald-400 font-bold pt-1"
              >
                <CheckCircle2 size={16} />
                <span>Brochure JPG downloaded successfully! Check your browser downloads folder.</span>
              </motion.div>
            )}
          </div>

          {/* Verification & Contact footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400 pt-2 border-t border-zinc-800/80 font-mono">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold">
              <Phone size={14} />
              <span>Contact: 070110 16060, 9255593976</span>
            </div>
            <div className="flex items-center gap-1.5 text-cyan-400">
              <Globe size={14} />
              <span>www.iinteducation.com</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck size={14} />
              <span>NSDC & Skill India Recognized</span>
            </div>
          </div>
        </div>
      </div>

      {/* Course Modules Breakdown in Brochure */}
      <div className="mt-16 space-y-8">
        <div className="border-b border-zinc-800 pb-4">
          <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
            Popular Course Modules Included in Brochure
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Download individual module guides or the complete combined JPG prospectus above.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {BROCHURE_MODULES.map((mod, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-rose-500/50 transition-all flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/20">
                    {mod.code}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                    Duration: {mod.duration}
                  </span>
                </div>

                <h4 className="text-base font-extrabold text-white group-hover:text-rose-300 transition-colors">
                  {mod.title}
                </h4>

                <ul className="space-y-1.5 pt-1">
                  {mod.items.map((item, i) => (
                    <li key={i} className="text-xs text-zinc-400 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-5 mt-4 border-t border-zinc-900 flex items-center justify-between">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Formats: JPG / PDF</span>
                <button
                  onClick={() => handleDownloadJpg(`IINT_${mod.code}_Module_Brochure.jpg`)}
                  className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-rose-950 text-rose-300 hover:text-white border border-rose-500/30 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Download size={13} />
                  Download JPG
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Poster Modal */}
      <AnimatePresence>
        {isPreviewOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl w-full max-h-[90vh] bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden flex flex-col shadow-2xl"
            >
              {/* Modal Header */}
              <div className="p-4 bg-zinc-900/80 border-b border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileImage className="text-rose-400" size={18} />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    IINT Official Admission Poster Preview (JPG)
                  </span>
                </div>
                <button
                  onClick={() => setIsPreviewOpen(false)}
                  className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable Image Area */}
              <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-zinc-950">
                <img 
                  src={iintBrochureImg} 
                  alt="IINT Official Admission Poster Full" 
                  className="max-w-full h-auto max-h-[75vh] object-contain rounded-xl shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-zinc-900/80 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-xs text-zinc-400 font-mono">
                  Official IINT Prospectus • High Quality JPG
                </span>
                <button
                  onClick={() => {
                    handleDownloadJpg("IINT_Official_Admission_Brochure.jpg");
                    setIsPreviewOpen(false);
                  }}
                  className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg cursor-pointer"
                >
                  <Download size={15} />
                  Download JPG File
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
