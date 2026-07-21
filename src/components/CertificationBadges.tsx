import { motion } from "motion/react";
import { Shield } from "lucide-react";

export default function CertificationBadges() {
  const logos = [
    {
      name: "Skill India",
      tag: "National Mission",
      src: "/images/logos/skill_india.png",
    },
    {
      name: "NSDC",
      tag: "Skill Partnership",
      src: "/images/logos/nsdc.png",
    },
    {
      name: "NASSCOM",
      tag: "Industry Standard",
      src: "/images/logos/nasscom.png",
    },
    {
      name: "MSME",
      tag: "Govt. Registered",
      src: "/images/logos/msme.png",
    },
    {
      name: "Beti Bachao Beti Padhao",
      tag: "National Initiative",
      src: "/images/logos/beti_bachao.png",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto my-8 px-4">
      {/* Container header for the Highlight section */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-emerald-500/40" />
        <span className="text-[10px] sm:text-xs font-mono uppercase text-emerald-400 tracking-widest bg-emerald-950/60 px-4 py-1.5 rounded-full border border-emerald-500/30 flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.25)] font-semibold">
          <Shield size={13} className="text-emerald-400 animate-pulse" /> Recognised & Approved by Govt of India
        </span>
        <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-emerald-500/40" />
      </div>

      {/* RECTANGULAR HORIZONTAL LOGO CARDS GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 items-center justify-center">
        {logos.map((logo, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -4, scale: 1.03 }}
            className="relative group w-full h-24 sm:h-28 rounded-2xl bg-white p-3 flex flex-col items-center justify-between border border-blue-500/30 hover:border-emerald-500 hover:shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all duration-300 overflow-hidden shadow-md"
          >
            {/* Logo Image Area with Blend Multiply to remove extra background padding */}
            <div className="w-full h-16 sm:h-18 flex items-center justify-center p-1">
              <img 
                src={logo.src} 
                alt={logo.name} 
                style={{ mixBlendMode: "multiply" }}
                className="max-h-full max-w-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Bottom Title Bar */}
            <div className="w-full text-center pt-1 border-t border-zinc-200/80">
              <span className="text-[10px] sm:text-[11px] font-black tracking-wide text-zinc-900 truncate block uppercase leading-tight">
                {logo.name}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
