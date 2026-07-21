import { motion } from "motion/react";
import { GraduationCap, Sun, Moon } from "lucide-react";

export type PageTab = "home" | "courses" | "about" | "faq";

interface NavigationBarProps {
  activePage: PageTab;
  onPageChange: (page: PageTab) => void;
  onApplyNow: () => void;
  isLightMode: boolean;
  onToggleTheme: () => void;
}

export default function NavigationBar({ 
  activePage, 
  onPageChange,
  onApplyNow,
  isLightMode,
  onToggleTheme
}: NavigationBarProps) {
  const navItems: { id: PageTab; label: string }[] = [
    { id: "home", label: "Home" },
    { id: "courses", label: "Courses" },
    { id: "about", label: "About" },
    { id: "faq", label: "FAQ" },
  ];

  const handleTabClick = (id: PageTab) => {
    onPageChange(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-2 sm:top-5 left-0 right-0 z-50 flex justify-center px-2 sm:px-4"
    >
      <div className={`flex items-center gap-1.5 sm:gap-3 md:gap-5 px-2.5 sm:px-5 py-2 sm:py-2.5 rounded-full backdrop-blur-xl border transition-all duration-300 max-w-2xl w-full justify-between shadow-2xl ${
        isLightMode 
          ? "bg-white/90 border-blue-500/30 text-slate-900 shadow-[0_0_25px_rgba(59,130,246,0.15)]" 
          : "bg-black/85 border-blue-500/30 text-white shadow-[0_0_25px_rgba(59,130,246,0.25)]"
      }`}>
        {/* Logo / Brand */}
        <div 
          onClick={() => handleTabClick("home")}
          className="flex items-center gap-1.5 sm:gap-2 cursor-pointer group shrink-0"
        >
          <div className="p-1 sm:p-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_10px_rgba(59,130,246,0.4)]">
            <GraduationCap size={14} className="sm:w-4 sm:h-4" />
          </div>
          <span className={`font-display font-bold text-xs sm:text-sm tracking-wide transition-colors ${
            isLightMode ? "text-slate-900 group-hover:text-blue-600" : "text-white group-hover:text-blue-400"
          }`}>
            IINT <span className={`font-light hidden sm:inline ${isLightMode ? "text-blue-600" : "text-blue-300/70"}`}>NETWORKING</span>
          </span>
        </div>

        {/* Navigation links */}
        <nav className="flex items-center gap-0.5 sm:gap-1">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`relative px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[11px] sm:text-xs md:text-sm font-semibold transition-all rounded-full cursor-pointer select-none ${
                  isActive 
                    ? isLightMode ? "text-blue-700 font-extrabold" : "text-blue-300 font-bold"
                    : isLightMode ? "text-slate-600 hover:text-slate-900" : "text-zinc-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className={`absolute inset-0 rounded-full border transition-all ${
                      isLightMode 
                        ? "bg-blue-100/80 border-blue-500/40 shadow-sm"
                        : "bg-blue-600/25 border-blue-500/40 shadow-[0_0_12px_rgba(59,130,246,0.3)]"
                    }`}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls: Theme Toggle + Green Apply Now Button */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          
          {/* Light / Dark Mode Toggle Button */}
          <button
            onClick={onToggleTheme}
            title={isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
            className={`p-1.5 rounded-full border transition-all cursor-pointer shadow-md flex items-center justify-center shrink-0 ${
              isLightMode 
                ? "bg-blue-50 border-blue-300 text-blue-600 hover:bg-blue-100" 
                : "bg-zinc-900 border-zinc-800 text-amber-400 hover:bg-zinc-800"
            }`}
          >
            {isLightMode ? <Moon size={14} className="text-blue-700" /> : <Sun size={14} className="text-amber-400 animate-pulse" />}
          </button>

          {/* Green Apply Now Button */}
          <button
            onClick={onApplyNow}
            className="flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold px-2.5 sm:px-3.5 py-1.5 rounded-full border border-emerald-400/60 transition-all shadow-[0_0_20px_rgba(16,185,129,0.5)] active:scale-95 cursor-pointer shrink-0"
          >
            <span>Apply Now</span>
            <GraduationCap size={13} />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
