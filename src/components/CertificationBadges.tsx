import { motion } from "motion/react";
import { Shield, CheckCircle2 } from "lucide-react";

export default function CertificationBadges() {
  return (
    <div className="w-full max-w-6xl mx-auto my-6 sm:my-10 px-3 sm:px-6 relative z-10">
      {/* Prominent Straight Line Divider with Recognised by Govt. of India */}
      <div className="relative flex items-center justify-center my-6 sm:my-10">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t-2 border-emerald-500/60 shadow-[0_0_20px_rgba(16,185,129,0.6)]" />
        </div>
        <div className="relative flex justify-center">
          <span className="text-sm xs:text-base sm:text-lg md:text-xl font-sans uppercase text-emerald-300 tracking-wider bg-black px-4 xs:px-6 sm:px-10 py-2 sm:py-3.5 rounded-full border-2 border-emerald-400/80 flex items-center gap-2 sm:gap-3 shadow-[0_0_30px_rgba(16,185,129,0.5)] font-black text-center whitespace-nowrap">
            <Shield size={24} className="text-emerald-400 animate-pulse shrink-0 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span>RECOGNISED BY GOVT. OF INDIA</span>
          </span>
        </div>
      </div>

      {/* Grid of Official Partner Logos & Accreditations */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 items-stretch justify-center">
        
        {/* 1. SKILL INDIA */}
        <motion.div 
          whileHover={{ y: -3, scale: 1.02 }}
          className="relative group p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-between text-center overflow-hidden min-h-[135px] sm:min-h-[145px]"
        >
          <div className="flex flex-col items-center justify-center w-full my-auto">
            <svg className="w-12 h-11 sm:w-14 sm:h-12" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Computer monitor frame - clean navy stroke */}
              <rect x="20" y="6" width="60" height="42" rx="4" stroke="#0F172A" strokeWidth="3.5" fill="white" />
              {/* Stand */}
              <path d="M40 48L34 58H66L60 48" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <rect x="22" y="58" width="56" height="5" rx="2.5" fill="#0F172A" />
              
              {/* Clean white screen inner area */}
              <circle cx="50" cy="27" r="15" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
              {/* Skill India Orange Growth Swoosh */}
              <path d="M38 31C42 22 52 18 60 21C62 22 60 25 56 25C49 25 43 28 38 31Z" fill="#EA580C" />
              {/* Skill India Green Growth Swoosh */}
              <path d="M40 34C45 27 54 24 62 26C64 27 62 30 58 29C52 28 46 31 40 34Z" fill="#16A34A" />
              {/* Blue center hub */}
              <circle cx="50" cy="27" r="3.5" fill="#1E3A8A" />
            </svg>
            <div className="flex items-center justify-center gap-0.5 mt-1.5 font-black leading-none text-slate-900 text-sm sm:text-base tracking-tight">
              <span>Sk</span>
              <span className="text-amber-500 font-extrabold">↑</span>
              <span className="text-emerald-600 font-extrabold">↑</span>
              <span>l India</span>
            </div>
            <span className="text-[9px] font-bold text-slate-700 tracking-tighter mt-1 font-sans">
              कौशल भारत - कुशल भारत
            </span>
          </div>
        </motion.div>

        {/* 2. NITI AAYOG */}
        <motion.div 
          whileHover={{ y: -3, scale: 1.02 }}
          className="relative group p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-between text-center overflow-hidden min-h-[135px] sm:min-h-[145px]"
        >
          <div className="flex flex-col items-center justify-center w-full my-auto">
            <svg className="w-12 h-10 sm:w-14 sm:h-11" viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="22" r="18" fill="#F97316" opacity="0.15" />
              {/* Ashoka Chakra style rays */}
              <circle cx="50" cy="22" r="12" stroke="#EA580C" strokeWidth="2.5" />
              <circle cx="50" cy="22" r="3" fill="#1E3A8A" />
              <path d="M50 10V34M38 22H62M42 14L58 30M42 30L58 14" stroke="#1E3A8A" strokeWidth="1.5" />
            </svg>
            <span className="text-[11px] sm:text-xs font-black tracking-widest text-slate-900 uppercase mt-1">
              NITI AAYOG
            </span>
            <span className="text-[8px] font-bold text-orange-600 leading-tight">
              Govt. of India Policy Think Tank
            </span>
            <span className="text-[7px] font-semibold text-slate-600 tracking-tighter leading-tight mt-0.5">
              National Institution for Transforming India
            </span>
          </div>
        </motion.div>

        {/* 3. DIGITAL INDIA */}
        <motion.div 
          whileHover={{ y: -3, scale: 1.02 }}
          className="relative group p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-between text-center overflow-hidden min-h-[135px] sm:min-h-[145px]"
        >
          <div className="flex flex-col items-center justify-center w-full my-auto">
            <svg className="w-12 h-10 sm:w-14 sm:h-11" viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 20C20 10 35 10 50 20C65 30 80 30 80 20" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
              <path d="M20 35C20 25 35 25 50 35C65 45 80 45 80 35" stroke="#16A34A" strokeWidth="4" strokeLinecap="round" />
              <circle cx="50" cy="28" r="6" fill="#EA580C" />
            </svg>
            <span className="text-[11px] sm:text-xs font-black tracking-wider text-slate-900 uppercase mt-0.5">
              DIGITAL INDIA
            </span>
            <span className="text-[8px] font-bold text-sky-600 leading-tight">
              Power To Empower
            </span>
            <span className="text-[7px] font-semibold text-slate-500 tracking-tighter leading-tight mt-0.5">
              Government Initiative
            </span>
          </div>
        </motion.div>

        {/* 4. MINISTRY OF MSME */}
        <motion.div 
          whileHover={{ y: -3, scale: 1.02 }}
          className="relative group p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-between text-center overflow-hidden min-h-[135px] sm:min-h-[145px]"
        >
          <div className="flex flex-col items-center justify-center w-full my-auto">
            <div className="flex items-center justify-center gap-1.5 w-full">
              <svg className="w-7 h-9 sm:w-8 sm:h-10 shrink-0" viewBox="0 0 30 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 10C6 4 12 2 15 2C18 2 24 4 24 10C24 14 21 16 15 16C9 16 6 14 6 10Z" fill="#1E293B" />
                <rect x="5" y="17" width="20" height="4" fill="#1E293B" />
                <circle cx="15" cy="19" r="1.5" fill="white" />
                <path d="M8 22L15 32L22 22" fill="#1E293B" />
                <rect x="7" y="33" width="16" height="2" fill="#1E293B" />
              </svg>
              <div className="flex flex-col text-left leading-none">
                <span className="text-base sm:text-lg font-black text-slate-900 tracking-tighter">
                  MSME
                </span>
                <span className="text-[7px] font-bold text-slate-700 leading-none">
                  MICRO, SMALL & MEDIUM
                </span>
              </div>
            </div>
            <span className="text-[7px] font-bold text-slate-900 text-center leading-tight mt-1">
              Ministry of MSME, Govt. of India
            </span>
          </div>
        </motion.div>

        {/* 5. BETI BACHAO BETI PADHAO */}
        <motion.div 
          whileHover={{ y: -3, scale: 1.02 }}
          className="relative group p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-between text-center overflow-hidden min-h-[135px] sm:min-h-[145px]"
        >
          <div className="flex flex-col items-center justify-center w-full my-auto">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-red-600 bg-white flex flex-col items-center justify-center relative p-0.5 shadow-inner">
              <span className="text-[5px] font-black text-red-700 uppercase tracking-tighter leading-none">
                बेटी बचाओ
              </span>
              <div className="flex flex-col items-center justify-center my-0.5">
                <div className="w-3 h-3 rounded-full bg-amber-200 border border-red-500 relative">
                  <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-red-600" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-600" />
                </div>
                <div className="w-3 h-2 bg-emerald-500 rounded-sm mt-0.5" />
              </div>
              <span className="text-[5px] font-black text-red-700 uppercase tracking-tighter leading-none">
                बेटी पढ़ाओ
              </span>
            </div>
            <span className="text-[9px] font-extrabold text-slate-900 tracking-tight mt-1">
              Beti Bachao Beti Padhao
            </span>
            <span className="text-[7px] font-sans text-pink-700 uppercase tracking-wider font-semibold">
              Govt. Initiative
            </span>
          </div>
        </motion.div>

        {/* 6. ISO 9001:2015 CERTIFIED */}
        <motion.div 
          whileHover={{ y: -3, scale: 1.02 }}
          className="relative group p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-between text-center overflow-hidden min-h-[135px] sm:min-h-[145px]"
        >
          <div className="flex flex-col items-center justify-center w-full my-auto">
            <svg className="w-12 h-12 sm:w-13 sm:h-13" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* ISO Badge Outer Ring */}
              <circle cx="32" cy="32" r="28" fill="#1E3A8A" />
              <circle cx="32" cy="32" r="24" fill="white" stroke="#2563EB" strokeWidth="2" />
              <circle cx="32" cy="32" r="21" fill="#1E3A8A" />
              <circle cx="32" cy="32" r="17" fill="white" />
              
              {/* ISO 9001 Text */}
              <text x="32" y="27" textAnchor="middle" fontSize="8" fontWeight="900" fill="#1E3A8A" fontFamily="sans-serif">
                ISO
              </text>
              <text x="32" y="36" textAnchor="middle" fontSize="7.5" fontWeight="900" fill="#16A34A" fontFamily="sans-serif">
                9001:2015
              </text>
              <text x="32" y="42" textAnchor="middle" fontSize="4" fontWeight="800" fill="#0F172A" fontFamily="sans-serif">
                CERTIFIED
              </text>
            </svg>
            <span className="text-[10px] font-black text-slate-900 tracking-tight uppercase mt-1">
              ISO 9001:2015
            </span>
            <span className="text-[8px] font-sans text-blue-700 uppercase tracking-wider font-bold">
              Quality Management
            </span>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
