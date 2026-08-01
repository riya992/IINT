import { ArrowRight, Clock, Award, Building, Layers, Megaphone, TrendingUp, CheckCircle, BookOpen, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { getCourseBgImage } from "../lib/courseImages";

interface CourseType {
  id: string;
  code: string;
  title: string;
  category: string;
  stream: string;
  duration: string;
  certification: string;
  description: string;
  syllabus: string[];
  highlight: string;
  color: string;
}

interface HomePopularCoursesProps {
  courses: CourseType[];
  onSelectCourse: (course: CourseType) => void;
  onNavigate: (pageId: string) => void;
  setActiveCourseStream?: (streamId: string) => void;
  onSelectCategory?: (categoryId: string) => void;
}

export default function HomePopularCourses({ 
  courses, 
  onSelectCourse, 
  onNavigate,
  setActiveCourseStream,
  onSelectCategory
}: HomePopularCoursesProps) {

  // Map the clicks to actions
  const handleCardClick = (id: string) => {
    if (onSelectCategory) {
      onSelectCategory(id);
      return;
    }

    if (id === "computer-education") {
      if (setActiveCourseStream) setActiveCourseStream("computer-diplomas");
      onNavigate("courses");
    } else if (id === "regular-courses") {
      if (setActiveCourseStream) setActiveCourseStream("teacher-training");
      onNavigate("courses");
    } else if (id === "distance-learning") {
      if (setActiveCourseStream) setActiveCourseStream("university-degrees");
      onNavigate("courses");
    } else {
      onNavigate("courses");
    }
  };

  const categoriesData = [
    {
      id: "computer-education",
      title: "Computer Education Programs",
      description: "National skill development computer training programs designed for employment readiness and certified job skills.",
      icon: Award,
      iconColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
      glowColor: "group-hover:shadow-[0_0_35px_rgba(16,185,129,0.15)] group-hover:border-emerald-500/40",
      badge: "Skill India Certified"
    },
    {
      id: "regular-courses",
      title: "Regular Vocational Courses",
      description: "Highly focused skill development and certification programs with practical sandbox learning modules and diploma tracks.",
      icon: Building,
      iconColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
      glowColor: "group-hover:shadow-[0_0_35px_rgba(16,185,129,0.15)] group-hover:border-emerald-500/40",
      badge: "Professional Training"
    },
    {
      id: "distance-learning",
      title: "Distance/Learning",
      description: "Flexible, self-paced degree options supported by online resources, assignments, and online exam modes.",
      icon: Layers,
      iconColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
      glowColor: "group-hover:shadow-[0_0_35px_rgba(16,185,129,0.15)] group-hover:border-emerald-500/40",
      badge: "Distance Learning"
    },
    {
      id: "digital-marketing-ai",
      title: "Digital Marketing + AI Program",
      description: "Flagship 12-month comprehensive digital marketing training program designed to turn you into a certified growth expert.",
      icon: Megaphone,
      iconColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
      glowColor: "group-hover:shadow-[0_0_35px_rgba(16,185,129,0.15)] group-hover:border-emerald-500/40",
      badge: "100% Practical"
    },
    {
      id: "data-analytics",
      title: "Data Analytics Program",
      description: "Learn to inspect, clean, transform, and model data to discover useful information and support decision-making.",
      icon: TrendingUp,
      iconColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
      glowColor: "group-hover:shadow-[0_0_35px_rgba(16,185,129,0.15)] group-hover:border-emerald-500/40",
      badge: "BI Specialist"
    }
  ];

  // Get computer education trending courses for the deep details section on homepage
  const trendingComputerCourses = courses.filter(c => c.stream === "computer-diplomas" || c.category?.toLowerCase().includes("computer"));

  return (
    <section id="popular-courses" className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 border-t border-zinc-900/60">
      
      {/* visual glowing background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Header matching user's request */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 gap-3">
        <span className="text-[11px] font-sans uppercase text-emerald-400 tracking-widest bg-emerald-950/40 px-4 py-1.5 rounded-full border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)] font-extrabold">
          COURSE CATALOG & PATHWAYS
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase text-center leading-tight">
          Eligibility Criteria & Programmes
        </h2>
        <div className="h-[2px] w-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mt-2" />
      </div>

      {/* Grid container with 6-columns layout to center Row 2 perfectly */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 max-w-6xl mx-auto mb-20">
        
        {categoriesData.map((cat, idx) => {
          const IconComponent = cat.icon;
          let gridSpanClass = "md:col-span-2";
          if (idx === 3) {
            gridSpanClass = "md:col-span-2 md:col-start-2";
          }

          return (
            <motion.div
              key={cat.id}
              id={`popular-card-${cat.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              onClick={() => handleCardClick(cat.id)}
              className={`${gridSpanClass} p-5 sm:p-8 rounded-2xl sm:rounded-[28px] bg-zinc-950 border border-zinc-700/70 hover:border-emerald-400 transition-all duration-500 cursor-pointer flex flex-col justify-between group shadow-2xl relative overflow-hidden min-h-[200px] sm:min-h-[220px]`}
            >
              {/* Category Background Image */}
              <img 
                src={getCourseBgImage(cat.id)} 
                alt={cat.title} 
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 pointer-events-none"
                referrerPolicy="no-referrer"
              />

              {/* Gradient Scrim for Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30 rounded-[28px] pointer-events-none" />

              <div className="relative z-10">
                {/* Top Bar */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className={`p-2.5 rounded-2xl border bg-black/80 backdrop-blur-md ${cat.iconColor} transition-transform duration-300 group-hover:scale-110 shadow-md`}>
                    <IconComponent size={22} />
                  </div>
                </div>

                {/* Card Title */}
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-emerald-300 transition-all duration-300 leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                  {cat.title}
                </h3>
              </div>

              {/* Action Button - Left Aligned inside card */}
              <div className="relative z-10 pt-6 mt-4 border-t border-white/20 flex items-center justify-end">
                <button
                  id={`btn-explore-${cat.id}`}
                  className="px-5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 border border-emerald-400/80 text-white text-xs font-sans font-extrabold tracking-wide transition-all duration-300 flex items-center gap-1.5 shadow-lg group-hover:scale-105"
                >
                  Explore Details →
                </button>
              </div>
            </motion.div>
          );
        })}

      </div>

    </section>
  );
}
