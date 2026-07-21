import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  course: string;
  rating: number;
  quote: string;
  initials: string;
  avatarBg: string;
}

const REVIEWS: Testimonial[] = [
  {
    id: 1,
    name: "Amit Saroha",
    role: "DCA Graduate",
    course: "Diploma in Computer Applications",
    rating: 5,
    quote: "I had a great experience at IINT Institute. The instructors are knowledgeable, patient, and truly dedicated to helping students understand the material. The courses are well-structured, covering both theory and practical skills.",
    initials: "AS",
    avatarBg: "from-blue-600 to-indigo-600"
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Full Stack Developer",
    course: "Full Stack Web Development",
    rating: 5,
    quote: "The hands-on coding sessions and real project guidance at IINT gave me the confidence to clear technical interviews easily. Best institute for software engineering and web development!",
    initials: "PS",
    avatarBg: "from-purple-600 to-pink-600"
  },
  {
    id: 3,
    name: "Rahul Verma",
    role: "Accounts Executive",
    course: "Professional Tally Prime & GST",
    rating: 5,
    quote: "Mastered GST filings, ledger management, and computerized payroll inside Tally Prime within 2 months. The practical double-entry accounting practice helped me land my current job.",
    initials: "RV",
    avatarBg: "from-emerald-600 to-teal-600"
  },
  {
    id: 4,
    name: "Neha Gupta",
    role: "Digital Marketing Specialist",
    course: "Digital Marketing & AI Program",
    rating: 5,
    quote: "Learned live Google Ads campaigns, Instagram growth strategies, and ChatGPT prompt automation. Got hired as a digital marketer within weeks of completing the certification!",
    initials: "NG",
    avatarBg: "from-amber-600 to-orange-600"
  },
  {
    id: 5,
    name: "Vikas Kumar",
    role: "Python Engineer",
    course: "Python Pro Specialization",
    rating: 5,
    quote: "The faculty explains complex logic with extreme clarity. Writing code with NumPy, Pandas, and OOP constructs prepared me thoroughly for data analyst and developer roles.",
    initials: "VK",
    avatarBg: "from-cyan-600 to-blue-600"
  },
  {
    id: 6,
    name: "Anjali Saini",
    role: "BI Data Analyst",
    course: "Data Analytics Program",
    rating: 5,
    quote: "Power BI dashboards, SQL JOIN queries, and Tableau modeling sessions were top notch. Working on real corporate datasets gave me a huge advantage during placements.",
    initials: "AS",
    avatarBg: "from-blue-600 to-teal-600"
  },
  {
    id: 7,
    name: "Deepak Malik",
    role: "Network Engineer",
    course: "Networking & Cisco Labs",
    rating: 5,
    quote: "Getting physical access to real Cisco ISR routers and Catalyst switches in the hardware lab made network routing and switching concepts crystal clear. Unmatched lab facility!",
    initials: "DM",
    avatarBg: "from-indigo-600 to-violet-600"
  },
  {
    id: 8,
    name: "Pooja Rani",
    role: "System Admin",
    course: "PGDCA Distance Learning",
    rating: 5,
    quote: "Flexible weekend schedules and continuous virtual lab access made it possible for me to complete my university-approved Post Graduate Diploma while working full-time.",
    initials: "PR",
    avatarBg: "from-pink-600 to-rose-600"
  },
  {
    id: 9,
    name: "Sachin Yadav",
    role: "AI Developer Trainee",
    course: "Machine Learning Specialization",
    rating: 5,
    quote: "Comprehensive training in neural networks, TensorFlow models, and prediction APIs. The career counseling desk supported me throughout resume building and mock interviews.",
    initials: "SY",
    avatarBg: "from-emerald-600 to-cyan-600"
  }
];

export default function TestimonialsSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(REVIEWS.length / 3);

  // Auto-switch reviews every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 6000);
    return () => clearInterval(timer);
  }, [totalPages]);

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const visibleReviews = REVIEWS.slice(currentPage * 3, currentPage * 3 + 3);

  return (
    <section className="w-full max-w-6xl mx-auto my-12 px-4 sm:px-6">
      
      {/* SECTION CONTAINER */}
      <div className="bg-zinc-950 border border-zinc-800 text-white rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-900 pb-6">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-blue-400 uppercase bg-blue-950/60 px-3.5 py-1 rounded-full border border-blue-500/30 inline-block mb-2">
              INT COMPUTER INSTITUTE
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">
              Real Stories, Real Success: <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Our Students Speak</span>
            </h2>
          </div>

          {/* Controls and Indicators */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-mono text-zinc-400">
              Page {currentPage + 1} of {totalPages}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-blue-500/30 text-white transition-all active:scale-95 cursor-pointer"
                aria-label="Previous page"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-blue-500/30 text-white transition-all active:scale-95 cursor-pointer"
                aria-label="Next page"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* 3 REVIEWS PER SLIDE GRID */}
        <div className="relative min-h-[260px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {visibleReviews.map((review) => (
                <div 
                  key={review.id}
                  className="p-6 rounded-2xl bg-zinc-900/80 border border-blue-500/25 hover:border-blue-500/60 hover:bg-zinc-900 transition-all duration-300 flex flex-col justify-between space-y-4 shadow-xl group"
                >
                  <div className="space-y-3">
                    {/* 5-Star Rating */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 size={10} /> Verified
                      </span>
                    </div>

                    <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                      "{review.quote}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-zinc-800 flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full bg-gradient-to-tr ${review.avatarBg} text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-sm`}>
                      {review.initials}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white font-sans group-hover:text-blue-300 transition-colors">
                        {review.name}
                      </h4>
                      <span className="text-[10px] text-blue-400 font-sans block truncate">
                        {review.course}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Page Indicators Dots */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                currentPage === idx ? "w-8 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" : "w-2 bg-zinc-800 hover:bg-zinc-700"
              }`}
            />
          ))}
        </div>

      </div>

    </section>
  );
}
