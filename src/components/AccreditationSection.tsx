import { Sparkles, Monitor, Shield, BadgeCheck, CheckSquare, Clock, BookOpen } from "lucide-react";
import computerLabImg from "../assets/images/computer_lab_training_1784532610692.jpg";

export default function AccreditationSection() {
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
    <section id="about-section" className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 border-t border-zinc-900/60">
      
      {/* SECTION HEADER */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 gap-3">
        <span className="text-xs font-sans uppercase text-emerald-400 tracking-widest bg-emerald-950/40 px-3.5 py-1.5 rounded-full border border-emerald-500/30 font-extrabold">
          Our Story & Student Advantages
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none text-white uppercase font-sans">
          Welcome to Indian Institute of Networking and Technology
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mt-2" />
        <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-sans font-normal mt-3">
          For over two decades, IINT Computer Education has been the region's most trusted partner in high-yield computer education and modern job-oriented skills.
        </p>
      </div>

      {/* FULL-WIDTH STORY BLOCK */}
      <div className="bg-zinc-950/60 border border-zinc-900/90 rounded-3xl p-6 sm:p-10 backdrop-blur-md shadow-2xl mb-14">
        <div className="max-w-4xl mx-auto space-y-6 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-emerald-400">
            <Sparkles size={18} />
            <span className="text-xs font-sans uppercase tracking-widest font-extrabold text-emerald-400">Our Journey & Mission</span>
          </div>
          
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-sans">
            The Story of <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">IINT Computer Education</span>
          </h3>
          
          <div className="space-y-4 text-zinc-300 text-sm sm:text-base font-sans font-normal leading-relaxed">
            <p>
              IINT was founded with a profound mission: to make high-quality, practical computer and technical education accessible to every aspiring student in Rohini (Delhi), Sonepat, Narela, Bawana, and surrounding regions. What started as a humble computer learning initiative with just a few systems has now matured into a premier IT training and professional education landmark.
            </p>
            <p>
              For over two decades, we have focused on bridging the digital divide by nurturing technical experts. By combining standard vocational streams like <strong className="text-white font-medium">DCA Diploma</strong>, <strong className="text-white font-medium">Tally Prime Accounting</strong>, and <strong className="text-white font-medium">Full Stack Development</strong> with fast-track bootcamps, we have proudly empowered over <span className="text-white font-semibold underline decoration-emerald-500 decoration-2">15,000+ students</span> to secure prominent placements in corporate firms and qualify for essential state and central government services.
            </p>
          </div>

          {/* Integrated Image Asset */}
          <div className="relative rounded-2xl overflow-hidden border border-emerald-500/30 group shadow-2xl mt-6">
            <img 
              src={computerLabImg} 
              alt="IINT Modern Computer Training Lab"
              className="w-full h-52 sm:h-64 object-cover filter brightness-[0.85] contrast-[1.05] group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-5">
              <div className="text-left">
                <span className="text-[11px] font-sans text-emerald-400 uppercase tracking-widest font-extrabold">Interactive Sandbox Labs</span>
                <p className="text-white font-bold text-sm sm:text-base mt-0.5">High-Speed Terminals & Dedicated 1-on-1 Workstations</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE IINT - EXACT 6-CARD GRID UNDERNEATH THE STORY */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-sans uppercase text-emerald-400 tracking-widest bg-emerald-950/50 px-3.5 py-1.5 rounded-full border border-emerald-500/30 font-extrabold inline-block mb-3">
            Why Choose IINT Computers?
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white uppercase font-sans tracking-tight">
            Key Academic Advantages & Plus Points
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-2xl transition-all duration-300 shadow-xl relative group flex flex-col items-center text-center justify-center bg-zinc-950 border border-zinc-800/90 hover:border-emerald-400 hover:bg-emerald-950/80 hover:shadow-[0_0_35px_rgba(16,185,129,0.35)] cursor-pointer min-h-[160px]"
              >
                {/* Vibrant Glowing Green Icon */}
                <div className="p-4 rounded-2xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black group-hover:border-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.25)] group-hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] mb-4 transition-all duration-300 group-hover:scale-110">
                  <Icon size={28} />
                </div>

                {/* Main Point Title - Bold, Green on Hover */}
                <h3 className="text-base sm:text-lg font-black text-white group-hover:text-emerald-300 transition-colors duration-300 tracking-tight font-sans leading-snug">
                  {p.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
