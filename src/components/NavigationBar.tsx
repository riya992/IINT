import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GraduationCap, Menu, X } from "lucide-react";
import IINTLogo from "./IINTLogo";

interface NavigationBarProps {
  currentPage: string;
  onNavigate: (pageId: string) => void;
  onApplyNow: () => void;
}

export default function NavigationBar({ 
  currentPage, 
  onNavigate, 
  onApplyNow,
}: NavigationBarProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "courses", label: "Courses" },
    { id: "gallery", label: "Gallery" },
    { id: "faq", label: "FAQ" },
  ];

  useEffect(() => {
    setActiveSection(currentPage);
  }, [currentPage]);

  const handleScrollTo = (id: string) => {
    onNavigate(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-2 sm:top-4 left-0 right-0 z-50 px-2 sm:px-6 max-w-7xl mx-auto w-full"
    >
      {/* Mobile Top Bar */}
      <div className="flex sm:hidden items-center justify-between w-full px-2.5 py-1.5 bg-blue-950/90 backdrop-blur-xl border border-blue-600/50 rounded-2xl shadow-2xl relative">
        <div 
          onClick={() => handleScrollTo("home")} 
          className="flex items-center gap-1.5 cursor-pointer min-w-0 flex-1"
        >
          <IINTLogo size="sm" />
        </div>

        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-9 h-9 rounded-xl bg-blue-900 border border-blue-500/50 text-white flex items-center justify-center cursor-pointer active:scale-95 shadow-md shrink-0"
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              className="absolute top-13 left-0 right-0 bg-blue-950/95 border border-blue-500/60 rounded-2xl p-3.5 shadow-2xl backdrop-blur-2xl flex flex-col gap-2.5 z-50"
            >
              <div className="flex items-center justify-between pb-2 border-b border-blue-800/80 px-1">
                <IINTLogo size="sm" />
                <span className="text-[10px] text-cyan-300 font-bold bg-blue-900/80 px-2 py-0.5 rounded-full border border-cyan-400/40">
                  Official Portal
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      handleScrollTo(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`px-3 py-2 text-xs font-bold rounded-xl text-left transition-all ${
                      activeSection === item.id 
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                        : "bg-blue-900/60 text-zinc-200 hover:text-white hover:bg-blue-800/80"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <button
                onClick={() => {
                  onApplyNow();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full mt-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg active:scale-95"
              >
                <span>Apply Now for Admission</span>
                <GraduationCap size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Navigation Bar */}
      <div className="hidden sm:flex items-center justify-between gap-4 w-full">
        <div 
          onClick={() => handleScrollTo("home")}
          className="flex items-center gap-1 sm:gap-3 px-1.5 py-1 cursor-pointer transition-all group shrink-0"
        >
          <IINTLogo size="md" />
        </div>

        <div className="flex items-center gap-1 sm:gap-3 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full bg-blue-950/90 backdrop-blur-xl border border-blue-600/50 shadow-[0_4px_25px_rgba(0,160,233,0.25)] shrink-0">
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleScrollTo(item.id)}
                  className={`relative px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-sans transition-all rounded-full cursor-pointer select-none whitespace-nowrap ${
                    isActive 
                      ? "text-white font-bold" 
                      : "text-zinc-200 hover:text-white hover:bg-blue-800/50"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full border border-cyan-400/60 shadow-[0_0_15px_rgba(0,160,233,0.5)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <button
            onClick={onApplyNow}
            className="flex items-center gap-1 text-xs bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold px-3 sm:px-4 py-1.5 rounded-full border border-emerald-500/30 transition-all shadow-md active:scale-95 cursor-pointer shrink-0 whitespace-nowrap ml-1"
          >
            <span>Apply Now</span>
            <GraduationCap size={13} className="shrink-0" />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
