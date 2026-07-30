import { Shield, Monitor, Clock, BookOpen, CheckSquare, BadgeCheck } from "lucide-react";

export default function HomeWhyIINT() {
  const points = [
    {
      icon: Monitor,
      title: "Hands-On Practical Computer Labs",
    },
    {
      icon: Shield,
      title: "100% Govt. Registered & Approved",
    },
    {
      icon: BadgeCheck,
      title: "ISO 9001:2015 Certified Quality",
    },
    {
      icon: CheckSquare,
      title: "Module-Wise & Weekly Practical Tests",
    },
    {
      icon: Clock,
      title: "Flexible Hourly Batches (8 AM - 8 PM)",
    },
    {
      icon: BookOpen,
      title: "Free Study Material & Practice Kits",
    }
  ];

  return (
    <section id="why-iint" className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 border-t border-zinc-900/60">
      
      {/* Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 gap-3">
        <span className="text-xs font-sans uppercase text-cyan-300 tracking-widest bg-blue-950/80 px-3.5 py-1.5 rounded-full border border-cyan-500/40 shadow-[0_0_15px_rgba(0,160,233,0.3)] font-extrabold">
          The Student Advantage
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none text-white uppercase font-sans">
          Why Students Choose IINT
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 rounded-full mt-1 animate-pulse" />
        <p className="text-zinc-200 text-sm sm:text-base leading-relaxed font-sans font-normal mt-2">
          Discover the top key advantages, lab infrastructure, and government-approved certifications that make IINT the leading IT institute across Rohini (Delhi), Sonepat, Narela & Bawana.
        </p>
      </div>

      {/* Grid of 6 Cards - Blue Background with Green Hover Highlight */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {points.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={idx}
              className="p-7 rounded-2xl transition-all duration-300 shadow-xl relative group flex flex-col items-center text-center justify-center bg-blue-950/80 border border-blue-700/60 hover:border-emerald-400 hover:bg-emerald-950/90 hover:shadow-[0_0_35px_rgba(16,185,129,0.45)] hover:-translate-y-1 cursor-pointer min-h-[160px]"
            >
              {/* Vibrant Blue Icon Box with Emerald Green Hover Effect */}
              <div className="p-4 rounded-2xl bg-blue-900/90 border border-cyan-400/50 text-cyan-300 group-hover:bg-emerald-500 group-hover:text-black group-hover:border-emerald-300 shadow-[0_0_20px_rgba(0,160,233,0.3)] group-hover:shadow-[0_0_30px_rgba(16,185,129,0.7)] mb-4 transition-all duration-300 group-hover:scale-110">
                <Icon size={28} />
              </div>

              {/* Main Point Title in White with Emerald Hover Accent */}
              <h3 className="text-base sm:text-lg font-black text-white group-hover:text-emerald-300 transition-colors duration-300 tracking-tight font-sans leading-snug">
                {p.title}
              </h3>
            </div>
          );
        })}
      </div>

    </section>
  );
}
