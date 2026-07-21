import { motion } from "motion/react";
import { GraduationCap } from "lucide-react";

export type PageTab = "home" | "courses" | "about" | "faq";

interface NavigationBarProps {
  activePage: PageTab;
  onPageChange: (page: PageTab) => void;
  onApplyNow: () => void;
}

export default function NavigationBar({ 
  activePage, 
  onPageChange,
  onApplyNow,
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
      <div className="flex items-center gap-1.5 sm:gap-3 md:gap-5 px-2.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-black/85 backdrop-blur-xl border border-blue-500/30 shadow-[0_0_25px_rgba(59,130,246,0.25)] max-w-2xl w-full justify-between">
        {/* Logo / Brand */}
        <div 
          onClick={() => handleTabClick("home")}
          className="flex items-center gap-1.5 sm:gap-2 cursor-pointer group shrink-0"
        >
          <div className="p-1 sm:p-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_10px_rgba(59,130,246,0.4)]">
            <GraduationCap size={14} className="sm:w-4 sm:h-4" />
          </div>
          <span className="font-display font-bold text-xs sm:text-sm tracking-wide text-white group-hover:text-blue-400 transition-colors">
            IINT <span className="font-light text-blue-300/70 hidden sm:inline">NETWORKING</span>
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
                    ? "text-blue-300 font-bold" 
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-blue-600/25 rounded-full border border-blue-500/40 shadow-[0_0_12px_rgba(59,130,246,0.3)]"
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

        {/* Green Apply Now Button */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={onApplyNow}
            className="flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-emerald-500/30 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] active:scale-95 cursor-pointer shrink-0"
          >
            <span>Apply Now</span>
            <GraduationCap size={12} />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
