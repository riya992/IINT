import { motion } from "motion/react";
import { ShieldCheck, Award, Zap, Users, GraduationCap, CheckCircle2 } from "lucide-react";

export default function GovtApprovalSection() {
  const points = [
    {
      title: "Govt. Recognized Affiliations",
      description: "Affiliated with NIELIT (Govt. of India), HKCL, MSME & MBQP for valid state/central job registrations.",
      icon: ShieldCheck
    },
    {
      title: "ISO 9001:2015 Certified",
      description: "Internationally accredited certification & official online certificate verification portal.",
      icon: Award
    },
    {
      title: "19+ Years Legacy of Trust",
      description: "Empowering students since 2006 with over 15,000+ successful alumni across corporate & govt sectors.",
      icon: GraduationCap
    },
    {
      title: "100% Practical Lab Training",
      description: "Hands-on experience on real Cisco ISR hardware routers, switches, and modern software stacks.",
      icon: Zap
    },
    {
      title: "1-on-1 Expert Mentorship",
      description: "Personal guidance, doubt clearing sessions, and small batch sizes for maximum individual focus.",
      icon: Users
    },
    {
      title: "Placement & Interview Support",
      description: "Dedicated career guidance desk, professional resume building, and mock technical interview rounds.",
      icon: CheckCircle2
    }
  ];

  return (
    <section className="w-full max-w-6xl mx-auto my-12 px-4 sm:px-6">
      <div className="bg-gradient-to-b from-zinc-950/90 via-zinc-950/80 to-zinc-950/90 border border-blue-500/30 rounded-3xl p-8 sm:p-12 backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.15)] relative overflow-hidden flex flex-col items-center">
        
        {/* Background Accent Glows */}
        <div className="absolute left-1/2 -top-24 -translate-x-1/2 w-[500px] h-[300px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Tag */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-mono uppercase text-blue-400 tracking-widest bg-blue-950/60 px-4 py-1.5 rounded-full border border-blue-500/30 font-semibold flex items-center gap-1.5 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <ShieldCheck size={14} className="text-blue-400" /> Excellence & Trust
          </span>
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-3 text-center">
          Why Choose <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">IINT?</span>
        </h2>

        <p className="text-zinc-300 text-sm sm:text-base font-sans leading-relaxed max-w-3xl mx-auto text-center mb-10 font-light">
          India's premier computer & technical education institute, offering ISO-certified diplomas and government-aligned curriculum to guarantee job readiness.
        </p>

        {/* 6 Plus Points Grid (Screen-Fit Wide Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full text-left">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <motion.div 
                key={idx} 
                whileHover={{ y: -4, scale: 1.01 }}
                className="p-5 rounded-2xl bg-zinc-900/60 border border-blue-500/25 hover:border-blue-500/60 hover:bg-blue-950/20 transition-all duration-300 flex flex-col justify-between space-y-3 shadow-lg group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                    <Icon size={20} className="text-blue-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors font-sans">
                    {pt.title}
                  </h3>
                </div>
                <p className="text-xs text-zinc-300 font-sans font-normal leading-relaxed">
                  {pt.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
