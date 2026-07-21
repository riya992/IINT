import { motion } from "motion/react";
import { 
  Sparkles, 
  Cpu, 
  Server, 
  Users, 
  Award, 
  Zap, 
  ShieldCheck, 
  Clock, 
  CheckCircle2,
  GraduationCap
} from "lucide-react";

export default function AccreditationSection() {
  const highlights = [
    {
      icon: Server,
      title: "Real Hardware Labs",
      description: "Hands-on experience with real dual-core terminals & Cisco switch racks.",
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20"
    },
    {
      icon: Users,
      title: "1-on-1 Mentorship",
      description: "Personal attention from industry expert instructors for every student.",
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20"
    },
    {
      icon: Award,
      title: "Govt. Approved Certificates",
      description: "ISO 9001:2015 & State board recognized diplomas valid for govt. jobs.",
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20"
    },
    {
      icon: Zap,
      title: "100% Practical Training",
      description: "Project-based curriculum with real-world case studies & agency workflows.",
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20"
    },
    {
      icon: Clock,
      title: "Flexible Batch Schedules",
      description: "Morning, evening, and weekend special batches for students & workers.",
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20"
    },
    {
      icon: GraduationCap,
      title: "Placement Assistance",
      description: "Dedicated career guidance, resume building & mock interview sessions.",
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20"
    }
  ];

  return (
    <section id="about-section" className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-24 border-t border-zinc-900/60 scroll-mt-20">
      
      {/* SECTION HEADER */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16 gap-3">
        <span className="text-xs font-mono uppercase text-blue-400 tracking-widest bg-blue-950/50 px-4 py-1.5 rounded-full border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)] font-semibold">
          Our Story & Excellence
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
          About IINT & Learning Environment
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full mt-2 shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-light mt-3">
          For over two decades, Indian Institute of Networking & Technology has been Haryana's premier institution for high-yield computer education and career acceleration.
        </p>
      </div>

      {/* CONTAINER: STORY ON TOP, HIGHLIGHTS BELOW */}
      <div className="space-y-12">
        
        {/* STORY BLOCK (Full Width Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-zinc-950/60 border border-blue-500/25 rounded-3xl p-6 sm:p-8 lg:p-10 backdrop-blur-md shadow-[0_0_30px_rgba(59,130,246,0.1)]">
          
          {/* Story Text */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2 text-blue-400">
              <Sparkles size={16} />
              <span className="text-xs font-mono uppercase tracking-widest font-semibold">Our Heritage & Mission</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              The Story of <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">IINT & Adarsh Computers</span>
            </h3>
            
            <p className="text-zinc-300 text-sm sm:text-base font-normal leading-relaxed">
              IINT was founded with a profound mission: to make high-quality, practical computer and technical education accessible to every aspiring student in Sonipat, Rohtak, and surrounding regions. What started as a humble computer learning initiative with just a few systems has grown into a landmark tech training academy.
            </p>
            
            <p className="text-zinc-300 text-sm sm:text-base font-normal leading-relaxed">
              By combining standard vocational streams like <strong className="text-white font-medium">DCA Diploma</strong>, <strong className="text-white font-medium">Tally Prime Accounting</strong>, and <strong className="text-white font-medium">Full Stack Development</strong> with fast-track bootcamps, we have proudly empowered over <span className="text-white font-semibold underline decoration-blue-500 decoration-2">15,000+ students</span> to excel in corporate roles and state government exams.
            </p>

            <div className="pt-2 flex flex-wrap gap-2.5 text-xs font-sans text-blue-300">
              <span className="bg-blue-950/40 px-3.5 py-1.5 rounded-full border border-blue-500/30 flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-blue-400" /> ISO 9001:2015 Certified
              </span>
              <span className="bg-blue-950/40 px-3.5 py-1.5 rounded-full border border-blue-500/30 flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-blue-400" /> Government Approved
              </span>
              <span className="bg-blue-950/40 px-3.5 py-1.5 rounded-full border border-blue-500/30 flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-blue-400" /> Practical Exposure
              </span>
            </div>
          </div>

          {/* Integrated Computer Lab Image */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-blue-500/30 group shadow-2xl">
            <img 
              src="/src/assets/images/computer_lab_training_1784532610692.jpg" 
              alt="IINT Modern Computer Training Lab"
              className="w-full h-56 sm:h-64 object-cover filter brightness-[0.9] contrast-[1.05] group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-4">
              <div className="text-left">
                <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">Interactive Practice Terminals</span>
                <p className="text-white font-semibold text-xs sm:text-sm mt-0.5">High-Performance Workstations & Network Racks</p>
              </div>
            </div>
          </div>

        </div>

        {/* HIGHLIGHTED POINTS BELOW STORY (6 Cards in Grid with Normal Font & Attractive Icons) */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-zinc-900 pb-3">
            <div className="p-2 bg-blue-500/15 rounded-lg text-blue-400 border border-blue-500/30">
              <Cpu size={18} className="animate-pulse text-blue-400" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Key Campus Highlights & Facilities</h4>
              <p className="text-xs text-zinc-400 font-normal">Why thousands of students trust IINT for career training</p>
            </div>
          </div>

          {/* 6 Grid Cards below the Story with Normal Sans Font */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                  className="p-5 rounded-2xl bg-zinc-950/60 border border-blue-500/25 hover:border-blue-500/60 hover:bg-blue-950/20 transition-all duration-300 group flex items-start gap-4 shadow-md"
                >
                  <div className="w-11 h-11 rounded-xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                    <Icon size={20} className="text-blue-400" />
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors font-sans">
                      {item.title}
                    </h5>
                    <p className="text-xs text-zinc-300 font-normal leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
