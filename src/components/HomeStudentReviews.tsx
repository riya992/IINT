import { useState, useEffect } from "react";
import { Star, MessageSquareQuote, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function HomeStudentReviews() {
  const reviews = [
    {
      name: "Rahul Sharma",
      course: "ADCA (Advanced Diploma in Computer Applications)",
      location: "Sonipat",
      text: "IINT se 1 year ka ADCA course karne ke baad mujhe ek top IT firm me system operator ki job mili. Practical training sach me amazing thi! Teachers ne excel formulas and website coding bohot aache se samjhaya.",
      stars: 5,
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120&h=120"
    },
    {
      name: "Pooja Rani",
      course: "Professional Tally Prime & GST",
      location: "Rohtak",
      text: "Accounting and GST updates seekhne ke liye Sonepat me isse best institute nahi hai. Faculty bohot support karti hai. Practice ke liye extra hours lab facilities bilkul free milti hain, jo self study ke liye bohot sahi hai.",
      stars: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120"
    },
    {
      name: "Amit Verma",
      course: "Digital Marketing & AI Masterclass",
      location: "Sonipat",
      text: "Digital marketing and AI tools Seekhne ke baad maine apni local agency start ki. Practical social media strategy and Google Ads concepts bohot detail me sikhaye gaye. Best decision for career growth!",
      stars: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120"
    },
    {
      name: "Neha Malik",
      course: "Web Designing & Full Stack Development",
      location: "Ganaur",
      text: "IINT faculty ki frontend aur HTML/CSS/JavaScript training bilkul zero se advanced level tak hai. Live practical projects design karne se mere portfolio building me kafi help hui.",
      stars: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120"
    },
    {
      name: "Vikas Kumar",
      course: "Diploma in Hardware & Networking",
      location: "Murthal",
      text: "Hardware assembling, router configuration aur network cabling ke live practical setup se mujhe MNC IT support desktop engineer ki profile me immediate placement mil gaya. Infinite gratitude to IINT!",
      stars: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120&h=120"
    },
    {
      name: "Ritu Saini",
      course: "DCA (Diploma in Computer Applications)",
      location: "Panipat",
      text: "DCA course duration and batch flexible tims bohot convenient rahe mere college studies ke saath. Govt jobs me certificate fully valid nikla aur registration me koi problem nahi aayi.",
      stars: 5,
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=120&h=120"
    },
    {
      name: "Sandeep Dahiya",
      course: "Python & Data Analytics Bootcamp",
      location: "Sonipat",
      text: "Data analytics module me Power BI, SQL databases aur Advance Excel pivot tables handle karna bohot smooth raha. Teachers personal doubts immediately resolve karte hain.",
      stars: 5,
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=120&h=120"
    },
    {
      name: "Kavita Sharma",
      course: "Office Automation & Typing Speed",
      location: "Gohana",
      text: "Government typing speed standard clear karne me IINT laboratory setup ne sabse bada role play kiya. Daily weekly practical speed tests ne meri typing 45 WPM tak boost kar di.",
      stars: 5,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120&h=120"
    },
    {
      name: "Monu Antil",
      course: "DTP (Desktop Publishing & Graphic Design)",
      location: "Sonipat",
      text: "Photoshop, CorelDraw aur Illustrator seeking ke baad maine apna printing & design studio setup kiya. IINT instructors genuine guidance dete hain without any fake commitments.",
      stars: 5,
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=120&h=120"
    }
  ];

  const itemsPerPage = 3;
  const totalPages = Math.ceil(reviews.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-slide effect every 4.5 seconds unless hovered
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 4500);

    return () => clearInterval(timer);
  }, [totalPages, isHovered]);

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const visibleReviews = reviews.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  return (
    <section id="reviews" className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 border-t border-zinc-900/60">
      
      {/* Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 gap-3">
        <span className="text-xs font-sans uppercase text-emerald-400 tracking-widest bg-emerald-950/50 px-3.5 py-1.5 rounded-full border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)] font-extrabold">
          Student Voices & Success
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none text-white uppercase font-sans">
          What Our Alumni Say
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mt-1 animate-pulse" />
        <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-sans font-normal mt-2">
          Read verified feedback from our successful students (Showing 3 per slide with automatic rotation).
        </p>
      </div>

      {/* Auto-sliding Carousel Container */}
      <div 
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 min-h-[320px]"
          >
            {visibleReviews.map((r, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-3xl bg-zinc-950/70 border border-emerald-500/30 hover:border-emerald-400 hover:bg-zinc-900/40 transition-all duration-300 flex flex-col justify-between shadow-xl relative group"
              >
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 text-emerald-500/20 group-hover:text-emerald-500/30 transition-colors">
                  <MessageSquareQuote size={38} />
                </div>

                <div className="space-y-3.5 relative z-10">
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(r.stars)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-zinc-300 text-xs sm:text-sm font-sans font-normal leading-relaxed italic">
                    "{r.text}"
                  </p>
                </div>

                {/* User Bio info */}
                <div className="flex items-center gap-3.5 pt-5 border-t border-zinc-900 mt-5 relative z-10">
                  <img 
                    src={r.avatar} 
                    alt={r.name} 
                    className="w-10 h-10 rounded-full object-cover border border-emerald-500/40 shadow-md"
                    referrerPolicy="no-referrer"
                  />
                  <div className="text-left">
                    <h4 className="font-bold text-white text-xs sm:text-sm font-sans">{r.name}</h4>
                    <p className="text-[10px] font-sans font-bold text-emerald-400 mt-0.5">{r.course}</p>
                    <p className="text-[9px] text-zinc-400 font-sans font-medium mt-0.5">{r.location}, Haryana</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Controls & Pagination Indicators */}
        <div className="flex items-center justify-between mt-8 pt-4 border-t border-zinc-900/80">
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentPage === idx 
                    ? "w-8 bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]" 
                    : "w-2 bg-zinc-800 hover:bg-zinc-700"
                }`}
                title={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 text-zinc-300 hover:text-emerald-400 transition-all cursor-pointer active:scale-95"
              title="Previous Reviews"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-xs font-mono text-zinc-500">
              {currentPage + 1} / {totalPages}
            </span>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-full bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 text-zinc-300 hover:text-emerald-400 transition-all cursor-pointer active:scale-95"
              title="Next Reviews"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

    </section>
  );
}
