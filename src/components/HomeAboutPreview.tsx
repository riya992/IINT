import { Sparkles, ArrowRight } from "lucide-react";
import computerLabImg from "../assets/images/computer_lab_training_1784532610692.jpg";

interface HomeAboutPreviewProps {
  onNavigate: (pageId: string) => void;
}

export default function HomeAboutPreview({ onNavigate }: HomeAboutPreviewProps) {
  return (
    <section id="about-preview" className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 border-t border-zinc-900/60">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left column: Quick Trust Summary */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2 text-emerald-400">
            <Sparkles size={16} className="text-emerald-400 animate-pulse" />
            <span className="text-xs font-sans uppercase tracking-widest font-extrabold text-emerald-400">Legacy of Excellence</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-white uppercase">
            Empowering Minds, <br />
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Shaping Technical Careers</span>
          </h2>
          
          <p className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed">
            IINT Computer Education (Indian Institute of Networking and Technology Foundation) has been at the forefront of quality technical training since 2006. Our mission is to bridge the digital gap by equipping youth with valid qualifications, corporate competencies, and software engineering skills.
          </p>

          <p className="text-zinc-400 text-sm font-light leading-relaxed">
            With over 15,000+ trained alumni, we are trusted by students across Haryana for government-approved course structures, intensive hands-on labs, and verified career progressions.
          </p>

          <div className="pt-4">
            <button
              onClick={() => {
                onNavigate("about");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-sans font-extrabold uppercase tracking-wider border border-emerald-400/80 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all flex items-center gap-2 cursor-pointer group hover:scale-[1.03]"
            >
              Read Our Full Story
              <ArrowRight size={16} className="text-white group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right column: Clean Lab Feature */}
        <div className="lg:col-span-5 space-y-6">
          <div className="relative rounded-3xl overflow-hidden border border-emerald-500/30 group shadow-2xl">
            <img 
              src={computerLabImg} 
              alt="IINT Modern Computer Training Lab"
              className="w-full h-72 object-cover filter brightness-[0.85] group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent flex flex-col justify-end p-6">
              <span className="text-[10px] font-sans text-emerald-400 uppercase tracking-widest mb-1 font-extrabold">State-of-the-art Infrastructure</span>
              <h3 className="text-white font-bold text-base sm:text-lg">Hands-On Practical Lab Stations</h3>
              <p className="text-zinc-300 text-xs font-normal mt-1 leading-relaxed">Equipped with standard workstations, high-speed internet, and direct 1-on-1 technical mentorship.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
