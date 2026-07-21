import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Award, Clock, Laptop, ShieldCheck, HelpCircle as HelpIcon, ArrowRight } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: "certifications" | "timings" | "labs" | "support";
  icon: any;
}

const FAQS: FAQItem[] = [
  {
    category: "certifications",
    question: "Are the courses aligned with official global certifications?",
    answer: "Yes, absolutely. Our CCNA, CCNP, CEH, and RedHat Linux courses are 100% aligned with the latest official vendor blueprints from Cisco, EC-Council, and RedHat. We provide official study guides, custom exam-preparation sessions, and practice tests to ensure you pass your global exams on the first attempt.",
    icon: Award
  },
  {
    category: "timings",
    question: "What are the batch timings and do you offer weekend classes?",
    answer: "We offer highly flexible timings for both college students and working professionals. Standard batches run Monday to Saturday (Morning slots: 8:00 AM – 12:00 PM, Evening slots: 4:00 PM – 8:00 PM). For corporate employees, we host exclusive, intensive Saturday & Sunday weekend batches with extended virtual lab access.",
    icon: Clock
  },
  {
    category: "labs",
    question: "Do we get real physical rack access or simulated environments?",
    answer: "At IINT, you get real hands-on hardware training. Our physical campus features real Cisco ISR routers, Catalyst switches, and ASAs. In addition to physical rack sessions, students get 24/7 remote cloud lab access to Cisco Packet Tracer, GNS3, and EVE-NG topologies to practice anytime from home.",
    icon: Laptop
  },
  {
    category: "support",
    question: "Does the institute offer placement support and mock interviews?",
    answer: "Yes, we have a dedicated placement wing. We host weekly resume-building sessions, continuous technical mock interviews, and maintain hiring tie-ups with leading system integrators, Internet Service Providers (ISPs), and cybersecurity consultancies across Delhi NCR, Rohtak, Sonepat, and Gurgaon.",
    icon: ShieldCheck
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      id="faq" 
      className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-24 border-t border-zinc-900/60"
    >
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-16 gap-3">
        <span className="text-xs font-mono uppercase text-blue-400 tracking-widest bg-blue-950/40 px-3.5 py-1 rounded-full border border-blue-500/30 flex items-center gap-1.5 shadow-[0_0_15px_rgba(59,130,246,0.2)] font-semibold">
          <HelpIcon size={12} className="text-blue-400" /> Got Questions?
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
          Frequently Asked Questions
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full mt-2 shadow-[0_0_12px_rgba(59,130,246,0.5)]" />
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-light mt-3">
          Clear, concise answers to help you understand our networking, cybersecurity, and cloud learning framework.
        </p>
      </div>

      {/* Accordion Container */}
      <div className="space-y-4">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          const CategoryIcon = faq.icon;

          return (
            <div
              key={index}
              id={`faq-item-${index}`}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen 
                  ? "bg-zinc-900/60 border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.15)]" 
                  : "bg-zinc-950/35 border-zinc-900 hover:border-blue-500/20 hover:bg-zinc-900/20"
              }`}
            >
              {/* Trigger Button */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left gap-3 sm:gap-4 focus:outline-none cursor-pointer"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div className={`p-2 sm:p-2.5 rounded-xl border transition-all duration-300 shrink-0 ${
                    isOpen 
                      ? "bg-blue-600/15 text-blue-400 border-blue-500/30" 
                      : "bg-zinc-900/60 text-zinc-400 border-zinc-800"
                  }`}>
                    <CategoryIcon size={18} className={`w-4 h-4 sm:w-5 sm:h-5 ${isOpen ? "text-blue-400" : ""}`} />
                  </div>
                  <span className={`font-semibold text-xs sm:text-base tracking-tight transition-colors truncate whitespace-normal line-clamp-2 ${
                    isOpen ? "text-white" : "text-zinc-300"
                  }`}>
                    {faq.question}
                  </span>
                </div>
                
                <div className={`p-1 rounded-lg border transition-all duration-300 shrink-0 ${
                  isOpen 
                    ? "bg-blue-600/15 text-blue-400 border-blue-500/30 rotate-180" 
                    : "bg-zinc-900/60 text-zinc-500 border-zinc-800"
                }`}>
                  <ChevronDown size={16} />
                </div>
              </button>

              {/* Collapsible Content */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-1 pl-4 xs:pl-12 sm:pl-16 border-t border-zinc-900/60">
                      <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-light">
                        {faq.answer}
                      </p>
                      
                      {/* Sub-context indicator */}
                      <div className="mt-4 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                        <span className="text-[10px] font-mono text-blue-400/80 uppercase tracking-wider">
                          Active & Updated for 2026 Curriculum
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Trust Quote / Helper */}
      <div className="mt-12 text-center p-6 rounded-2xl bg-zinc-950/40 border border-blue-500/25 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
        <div className="text-left">
          <h4 className="text-sm font-bold text-white tracking-tight">Have a custom requirement?</h4>
          <p className="text-xs text-zinc-400 font-light mt-0.5">Need customized schedules or corporate enterprise licensing?</p>
        </div>
        <button
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          className="px-5 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white text-xs font-semibold border border-blue-500/30 transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 shrink-0"
        >
          Talk to Counselor
          <ArrowRight size={12} />
        </button>
      </div>

    </section>
  );
}
