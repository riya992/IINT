import { useState } from "react";
import { motion } from "motion/react";
import { BookOpen, Search } from "lucide-react";
import { getCourseBgImage } from "../lib/courseImages";

interface ProgramEligibility {
  id?: string;
  code: string;
  title: string;
  duration: string;
  eligibility: string;
  category: "Computer & IT Diplomas" | "Diploma Programmes" | "Undergraduate (UG) Programmes" | "Postgraduate (PG) Programmes" | "Teacher Training" | "Digital Marketing + AI" | "Data Analytics";
  description: string;
  careerPath: string;
  originalCourse?: any;
}

const SECTIONS = [
  {
    id: "all",
    title: "All Academic Sectors",
    badge: "Full Directory",
    category: "All",
    color: "from-zinc-500/10 to-zinc-500/10 border-zinc-800 text-zinc-400"
  },
  {
    id: "digital-marketing-ai",
    title: "Digital Marketing & AI Master Program",
    badge: "Dual Certification & Live Ads",
    description: "Flagship comprehensive digital marketing training program with Performance Marketing, Meta/Google Ads, and Generative AI.",
    category: "Digital Marketing + AI",
    color: "from-purple-500/10 to-pink-500/10 border-purple-500/25 text-purple-400"
  },
  {
    id: "data-analytics",
    title: "Data Analytics & Business Intelligence",
    badge: "BI Specialist",
    description: "Full-stack Data Analytics program covering MS Excel, SQL, Power BI, Tableau, and Python for Data Science.",
    category: "Data Analytics",
    color: "from-emerald-500/10 to-teal-500/10 border-emerald-500/25 text-emerald-400"
  },
  {
    id: "computer-diplomas",
    title: "Computer Education Programs",
    badge: "Skill India & ISO Certified",
    description: "Comprehensive Digital Marketing & AI, Data Analytics & BI, DCA, ADCA, Tally Prime with GST, Advance Excel, SQL, and PGDCA courses.",
    category: "Computer & IT Diplomas",
    color: "from-purple-500/10 to-pink-500/10 border-purple-500/25 text-purple-400"
  },
  {
    id: "diploma-programmes",
    title: "Diploma Programmes",
    badge: "State Board & PCI Approved",
    description: "Industry-focused technical and engineering diplomas (Mechanical, Civil, Computer Science, Electrical, D.Pharma, DMLT).",
    category: "Diploma Programmes",
    color: "from-amber-500/10 to-yellow-500/10 border-amber-500/25 text-amber-400"
  },
  {
    id: "ug-programmes",
    title: "Undergraduate (UG) Programmes",
    badge: "UGC Approved Degree",
    description: "Rigorous collegiate programs (BCA, BBA, BBA Aviation, B.Com, B.Com Hons, BA, BA Hons, B.Lib).",
    category: "Undergraduate (UG) Programmes",
    color: "from-blue-500/10 to-indigo-500/10 border-blue-500/25 text-blue-400"
  },
  {
    id: "pg-programmes",
    title: "Postgraduate (PG) Programmes",
    badge: "Master Degree & MBA",
    description: "High-tier academic master degree programs (MCA, MBA, MBA Aviation, MBA Finance/HR/Marketing/Operations, M.Com, MA, MSc IT, MSW).",
    category: "Postgraduate (PG) Programmes",
    color: "from-violet-500/10 to-purple-500/10 border-violet-500/25 text-violet-400"
  },
  {
    id: "teacher-training",
    title: "Teacher Training Programmes",
    badge: "NCTE & Govt. Approved",
    description: "NCTE-recognized professional certifications preparing qualified primary (PRT), trained graduate (TGT), and post-graduate (PGT) teachers (B.Ed, D.El.Ed, M.Ed).",
    category: "Teacher Training",
    color: "from-emerald-500/10 to-teal-500/10 border-emerald-500/25 text-emerald-400"
  }
];

interface EligibilityCriteriaProps {
  onApplyForProgram: (programName: string) => void;
  onSelectCourseDetail?: (course: any) => void;
  courses?: any[];
  initialCategory?: string | null;
}

export default function EligibilityCriteria({
  onApplyForProgram,
  onSelectCourseDetail,
  courses = [],
  initialCategory
}: EligibilityCriteriaProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const getCategoryForCourse = (c: any): ProgramEligibility["category"] => {
    if (c.stream === "teacher-training" || c.category === "Teacher Training Programmes") {
      return "Teacher Training";
    }
    if (c.stream === "ug-programmes" || c.category === "Undergraduate (UG) Programmes") {
      return "Undergraduate (UG) Programmes";
    }
    if (c.stream === "pg-programmes" || c.category === "Postgraduate (PG) Programmes") {
      return "Postgraduate (PG) Programmes";
    }
    if (c.stream === "diploma-programmes" || c.category === "Diploma Programmes") {
      return "Diploma Programmes";
    }
    return "Computer & IT Diplomas";
  };

  const getEligibilityText = (c: any): string => {
    if (c.eligibility) return c.eligibility;
    if (c.stream === "teacher-training") {
      if (c.code === "BED-UNIV" || c.code === "MED-UNIV") return "Graduation or Post-Graduation with minimum 50% marks";
      return "10+2 with minimum 50% marks from any recognized board";
    }
    if (c.stream === "ug-programmes") return "10+2 Pass in any stream from a recognized board";
    if (c.stream === "pg-programmes") return "Graduation in relevant stream from a recognized university";
    if (c.stream === "diploma-programmes") return "10th / 10+2 Pass from a recognized board";
    return "10th / 12th Pass or Graduation in any stream";
  };

  const getCareerPathText = (c: any): string => {
    if (c.careerPath) return c.careerPath;
    if (c.id === "digital-marketing-ai") return "Digital Marketing Specialist, Performance Marketer, SEO Strategist, Agency Owner";
    if (c.id === "data-analytics") return "Data Analyst, Business Intelligence Analyst, MIS Executive, Data Consultant";
    if (c.stream === "teacher-training") return "School Teacher, Educational Consultant, Academic Administrator";
    if (c.stream === "ug-programmes" || c.stream === "pg-programmes") return "Corporate Associate, Business Analyst, IT Professional, Government Officer";
    if (c.stream === "diploma-programmes") return "Junior Engineer, Technician, Site Supervisor, Technical Assistant";
    return "Computer Operator, Office Executive, IT Specialist, Freelancer";
  };

  const getMappedCategory = (catId?: string | null): string => {
    if (!catId) return "All";
    if (catId === "computer-education") return "Computer & IT Diplomas";
    if (catId === "regular-courses" || catId === "diploma-programmes") return "Diploma Programmes";
    if (catId === "ug-programmes" || catId === "distance-learning") return "Undergraduate (UG) Programmes";
    if (catId === "pg-programmes") return "Postgraduate (PG) Programmes";
    if (catId === "teacher-training") return "Teacher Training";
    if (catId === "digital-marketing-ai") return "Digital Marketing + AI";
    if (catId === "data-analytics") return "Data Analytics";
    return "All";
  };

  const [selectedCategory, setSelectedCategory] = useState<string>(
    getMappedCategory(initialCategory)
  );

  const allPrograms: ProgramEligibility[] = (courses || []).map((c: any) => ({
    id: c.id,
    code: c.code || c.id?.toUpperCase() || "IINT",
    title: c.title,
    duration: c.duration || "Standard",
    eligibility: getEligibilityText(c),
    category: getCategoryForCourse(c),
    description: c.description || `${c.title} course at IINT Computer Education.`,
    careerPath: getCareerPathText(c),
    originalCourse: c
  }));

  const handleOpenCourseDetail = (program: ProgramEligibility) => {
    if (onSelectCourseDetail && program.originalCourse) {
      onSelectCourseDetail(program.originalCourse);
    }
  };

  const filteredPrograms = allPrograms.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.eligibility.toLowerCase().includes(searchTerm.toLowerCase());

    if (initialCategory === "digital-marketing-ai") {
      return p.id === "digital-marketing-ai" && matchesSearch;
    }
    if (initialCategory === "data-analytics") {
      return p.id === "data-analytics" && matchesSearch;
    }

    if (selectedCategory !== "All") {
      return p.category === selectedCategory && matchesSearch;
    }

    return matchesSearch;
  });

  const activeSections = SECTIONS.filter((s) => {
    if (s.id === "all") return false;
    if (initialCategory === "digital-marketing-ai") return s.id === "digital-marketing-ai" || s.id === "computer-diplomas";
    if (initialCategory === "data-analytics") return s.id === "data-analytics" || s.id === "computer-diplomas";
    if (selectedCategory === "All") return true;
    return s.category === selectedCategory;
  });

  return (
    <section id="eligibility-programmes" className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 border-t border-zinc-900/60">
      
      {/* Search and Category Filter Bar */}
      <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4 bg-zinc-950/80 p-4 rounded-2xl border border-zinc-800 backdrop-blur-md">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          <input
            type="text"
            placeholder="Search courses, codes, eligibility..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-zinc-900/90 border border-zinc-700/80 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {SECTIONS.map((sec) => {
            const isActive = selectedCategory === sec.category;
            return (
              <button
                key={sec.id}
                onClick={() => setSelectedCategory(sec.category)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? "bg-emerald-500 text-black font-extrabold shadow-lg shadow-emerald-500/20"
                    : "bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800 border border-zinc-800"
                }`}
              >
                {sec.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Sections Grid */}
      <div className="space-y-14">
        {activeSections.map((sect) => {
          const sectionPrograms = filteredPrograms.filter((p) => {
            if (sect.id === "digital-marketing-ai") return p.id === "digital-marketing-ai";
            if (sect.id === "data-analytics") return p.id === "data-analytics";
            return p.category === sect.category;
          });

          if (sectionPrograms.length === 0) return null;

          return (
            <div key={sect.id} id={`section-${sect.id}`} className="space-y-6">
              {/* Section Sub-Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-zinc-800 pb-3">
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2.5">
                    <span className="p-1.5 bg-zinc-900 rounded-lg text-emerald-400 border border-zinc-800">
                      <BookOpen size={18} />
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
                      {sect.title}
                    </h3>
                  </div>
                  <p className="text-zinc-400 text-xs sm:text-sm font-light">
                    {sect.description}
                  </p>
                </div>
              </div>

              {/* Programs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {sectionPrograms.map((program, index) => (
                  <motion.div
                    key={program.code + index}
                    id={`card-${program.code}`}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.3) }}
                    onClick={() => handleOpenCourseDetail(program)}
                    className="min-h-[220px] p-5 sm:p-6 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-emerald-400 hover:shadow-[0_0_35px_rgba(16,185,129,0.2)] transition-all duration-500 flex flex-col justify-between group relative overflow-hidden cursor-pointer"
                  >
                    {/* Course Background Image */}
                    <img
                      src={getCourseBgImage(program.code || program.title)}
                      alt={program.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700 pointer-events-none"
                      referrerPolicy="no-referrer"
                    />

                    {/* Gradient Scrim for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30 rounded-2xl pointer-events-none" />

                    <div className="relative z-10 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-mono text-emerald-400 font-extrabold bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-500/30">
                          {program.code}
                        </span>
                        <span className="text-[10px] font-sans text-zinc-200 font-extrabold bg-black/80 px-2.5 py-0.5 rounded border border-zinc-700/80 backdrop-blur-md">
                          {program.duration}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-lg sm:text-xl font-black tracking-tight text-white group-hover:text-emerald-300 transition-colors duration-300 leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                          {program.title}
                        </h4>
                        <p className="text-xs text-zinc-300 line-clamp-2 mt-1.5 font-normal">
                          {program.description}
                        </p>
                      </div>

                      {program.eligibility && (
                        <div className="text-[11px] text-zinc-400 pt-1 flex items-start gap-1">
                          <span className="text-emerald-400 font-bold shrink-0">Eligibility:</span>
                          <span className="line-clamp-1">{program.eligibility}</span>
                        </div>
                      )}
                    </div>

                    {/* CTA bar */}
                    <div className="relative z-10 mt-5 pt-3 border-t border-white/20 flex items-center justify-between">
                      <span className="text-[11px] text-zinc-400 font-medium">
                        {program.category}
                      </span>
                      <button
                        id={`btn-explore-${program.code}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenCourseDetail(program);
                        }}
                        className="px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-400/80 text-xs font-sans font-extrabold tracking-wide transition-all cursor-pointer flex items-center justify-center gap-1 shadow-lg group-hover:scale-[1.02]"
                      >
                        <BookOpen className="h-3.5 w-3.5 text-emerald-200" />
                        Explore Details →
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {filteredPrograms.length === 0 && (
        <div className="text-center py-16 text-zinc-500 text-sm">
          No matching programs found. Please clear or modify your search criteria.
        </div>
      )}

    </section>
  );
}
