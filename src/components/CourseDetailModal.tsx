import React, { useState } from "react";
import { motion } from "motion/react";
import { getCourseBgImage } from "../lib/courseImages";
import { 
  Building, 
  BookOpen, 
  Sparkles, 
  Users, 
  Award, 
  Wrench, 
  ShieldCheck, 
  Calendar, 
  CheckCircle2, 
  Plus, 
  Minus, 
  Clock, 
  Phone, 
  MessageSquare, 
  ArrowRight, 
  X,
  Briefcase,
  HelpCircle,
  Check
} from "lucide-react";

export interface CourseDetailType {
  id?: string;
  code: string;
  title: string;
  category?: string;
  stream?: string;
  duration: string;
  certification?: string;
  description: string;
  syllabus?: string[];
  highlight?: string;
  eligibility?: string;
  careerPath?: string;
  courseOptions?: Array<{ title: string; desc: string }>;
  purposes?: Array<{ title: string; target: string; points: string[] }>;
  performanceMarketing?: string[];
}

const COURSE_CAREERS: Record<string, string[]> = {
  "digital-marketing-ai": ["Performance Marketing Lead", "Digital Marketing Strategist", "SEO Specialist", "Agency Owner", "Social Media Manager", "AI Content Creator"],
  "data-analytics": ["Data Analyst", "Power BI Developer", "Business Intelligence Analyst", "SQL Reporting Executive", "MIS Analyst", "Python Analytics Specialist"],
  "office-automation": ["Office Assistant", "Data Entry Operator", "Front Desk Executive", "Computer Operator", "Admin Assistant", "Back Office Executive"],
  "dtp": ["DTP Operator", "Graphic Designer", "Print Layout Artist", "CorelDraw Designer", "Photoshop Editor", "Digital Print Executive"],
  "languages": ["Junior Programmer", "Software Trainee", "Python Developer", "Java Developer", "Coding Tutor", "Application Support Executive"],
  "web-designing": ["Web Designer", "Frontend Developer", "HTML CSS Developer", "Website Maintenance Executive", "UI Developer", "Freelance Web Creator"],
  "english-speaking": ["Customer Support Executive", "Telecaller", "Reception Executive", "Sales Associate", "Interview-ready Fresher", "Public Speaking Coordinator"],
  "advance-excel": ["MIS Executive", "Excel Reporting Analyst", "Data Entry Supervisor", "Accounts Assistant", "HR Reporting Assistant", "Sales Operations Executive"],
  "sql": ["SQL Developer", "Database Assistant", "Backend Support Executive", "Data Operations Executive", "Reporting Analyst", "Database Tester"],
  "dca": ["Computer Operator", "Office Assistant", "Data Entry Operator", "Clerk", "E-Governance Operator", "Admin Support Executive"],
  "adca": ["Computer Faculty", "Office Executive", "DTP Operator", "Tally Assistant", "Web Support Executive", "Computer Lab Assistant"],
  "accounting": ["Tally Accountant", "GST Billing Executive", "Accounts Assistant", "Tax Assistant", "Bookkeeping Executive", "Payroll Assistant"],
  "hardware-networking": ["Hardware Technician", "Network Support Engineer", "System Support Executive", "Desktop Support Technician", "IT Helpdesk Executive", "LAN Technician"],
  "pgdca-distance": ["IT Coordinator", "Computer Teacher", "Office Automation Specialist", "Database Assistant", "System Support Executive", "Project Assistant"],
  "bed": ["TGT Teacher", "PGT Teacher", "School Educator", "Academic Coordinator", "Education Counsellor", "Curriculum Assistant"],
  "deled": ["Primary Teacher", "PRT Teacher", "Nursery Teacher", "Elementary Educator", "Teaching Assistant", "School Activity Coordinator"],
  "med": ["Teacher Educator", "Education Researcher", "Academic Administrator", "Principal Track", "Curriculum Planner", "B.Ed College Lecturer"],
  "bca-univ": ["Software Developer", "Web Developer", "IT Support Executive", "Database Assistant", "App Developer Trainee", "System Analyst Trainee"],
  "mca-univ": ["Software Engineer", "Full Stack Developer", "Database Administrator", "Systems Analyst", "Cloud Support Engineer", "IT Project Coordinator"],
  "bba-univ": ["Management Trainee", "Business Development Executive", "Operations Executive", "HR Assistant", "Marketing Executive", "Startup Coordinator"],
  "bba-aviation": ["Airport Ground Staff", "Airline Operations Executive", "Cabin Crew Coordinator", "Airport Customer Service", "Cargo Operations Assistant", "Travel Desk Executive"],
  "mba-univ": ["Business Manager", "Management Consultant", "Operations Manager", "HR Manager", "Marketing Manager", "Business Analyst"],
  "mba-aviation": ["Airport Operations Manager", "Airline Station Manager", "Aviation Customer Service Manager", "Cargo Manager", "Ground Handling Manager", "Airline Admin Executive"],
  "mba-finance": ["Finance Manager", "Investment Analyst", "Credit Analyst", "Accounts Manager", "Portfolio Advisor", "Financial Planning Executive"],
  "mba-hr": ["HR Manager", "Talent Acquisition Specialist", "Training Coordinator", "Payroll Manager", "HR Business Partner", "Employee Relations Executive"],
  "mba-marketing": ["Marketing Manager", "Brand Manager", "Digital Sales Manager", "Market Research Analyst", "Retail Manager", "Business Development Manager"],
  "mba-operations": ["Operations Manager", "Supply Chain Manager", "Logistics Planner", "Production Coordinator", "Quality Manager", "Procurement Executive"],
  "bcom-univ": ["Accountant", "Tax Assistant", "Banking Executive", "Audit Assistant", "Finance Executive", "Commerce Teacher Trainee"],
  "bcom-hons": ["Financial Analyst", "CA Article Assistant", "Investment Assistant", "Corporate Accounts Executive", "Tax Consultant Assistant", "Audit Associate"],
  "ba-univ": ["Civil Services Aspirant", "Content Writer", "Social Sector Executive", "Administrative Assistant", "Public Relations Assistant", "Teaching Pathway"],
  "ba-hons": ["Research Assistant", "Content Editor", "Journalism Trainee", "Academic Writer", "Publishing Assistant", "Postgraduate Studies Pathway"],
  "blib-univ": ["Librarian", "Assistant Librarian", "Digital Archivist", "Library Cataloguer", "Information Assistant", "School Library Incharge"],
  "mcom-univ": ["Accounts Manager", "Finance Lecturer", "Audit Executive", "Tax Consultant", "Banking Officer", "UGC NET Commerce Aspirant"],
  "ma-education": ["Education Coordinator", "Curriculum Designer", "School Administrator", "Academic Counsellor", "Education Research Assistant", "Teacher Trainer"],
  "ma-english": ["English Lecturer", "Content Editor", "Copywriter", "Translator", "Academic Researcher", "Communication Trainer"],
  "ma-hindi": ["Hindi Lecturer", "Translator", "Content Writer", "Official Language Assistant", "Hindi Editor", "Research Scholar"],
  "ma-history": ["History Lecturer", "Archivist", "Museum Assistant", "Research Assistant", "Civil Services Aspirant", "Heritage Coordinator"],
  "ma-political-science": ["Political Analyst", "Public Administration Assistant", "Civil Services Aspirant", "Policy Researcher", "NGO Coordinator", "Lecturer"],
  "ma-sociology": ["Social Researcher", "NGO Program Officer", "Community Development Executive", "CSR Coordinator", "Survey Research Assistant", "Lecturer"],
  "ma-economics": ["Economic Analyst", "Research Associate", "Banking Officer", "Policy Assistant", "Data Research Executive", "IES/Competitive Exam Aspirant"],
  "msc-it": ["IT Manager", "Network Engineer", "Cloud Support Engineer", "Software Developer", "Database Administrator", "Cybersecurity Analyst"],
  "msw": ["Social Worker", "NGO Manager", "CSR Executive", "Community Organizer", "Counsellor", "Welfare Officer"],
  "poly-me": ["Junior Engineer Mechanical", "CAD Technician", "Production Supervisor", "Maintenance Technician", "CNC Operator", "Quality Inspector"],
  "poly-civil": ["Junior Engineer Civil", "Site Supervisor", "Surveyor", "AutoCAD Draftsman", "Quantity Estimator", "Construction Assistant"],
  "poly-cse": ["Junior Software Developer", "IT Support Engineer", "Network Assistant", "Web Developer Trainee", "Database Assistant", "System Administrator Trainee"],
  "dpharma": ["Registered Pharmacist", "Hospital Pharmacy Assistant", "Medical Store Owner", "Pharma Sales Executive", "Dispensing Pharmacist", "Drug Store Manager"],
  "poly-ee": ["Junior Engineer Electrical", "Electrical Technician", "Substation Assistant", "Maintenance Engineer", "Power Plant Technician", "Panel Wiring Supervisor"],
  "dmlt": ["Lab Technician", "Pathology Lab Assistant", "Phlebotomist", "Diagnostic Centre Executive", "Blood Bank Assistant", "Medical Lab Supervisor"]
};

const cleanSyllabusFocus = (item?: string) => {
  if (!item) return "";
  return item
    .replace(/^Module\s+\d+\s*[-–]\s*/i, "")
    .replace(/^Semester\s+[\d\s&]+:\s*/i, "")
    .replace(/^Year\s+\d+:\s*/i, "")
    .split(":")[0]
    .trim();
};

const getCourseCareers = (course: CourseDetailType) => {
  if (course.careerPath) return course.careerPath.split(",").map((c) => c.trim()).filter(Boolean);
  const key = course.id || "";
  return COURSE_CAREERS[key] || COURSE_CAREERS[course.code] || ["Course Specialist", "Assistant Executive", "Trainee Professional", "Coordinator", "Freelancer", "Entrepreneur"];
};

const getObjectiveBullets = (course: CourseDetailType, careerList: string[]) => {
  const focus = (course.syllabus || []).map(cleanSyllabusFocus).filter(Boolean).slice(0, 3);
  if (focus.length >= 3) {
    return [
      `Master ${focus[0]} with guided theory and practice.`,
      `Build job-ready ability in ${focus[1]}.`,
      `Apply ${focus[2]} through assignments, projects, and practical evaluation.`
    ];
  }

  return [
    course.highlight || `Build focused capability for ${course.title}.`,
    `Prepare for roles like ${careerList.slice(0, 2).join(" and ")}.`,
    "Develop practical confidence through guided classroom and lab-based learning."
  ];
};

const getHighlightCards = (course: CourseDetailType, careerList: string[]) => {
  const focus = (course.syllabus || []).map(cleanSyllabusFocus).filter(Boolean);
  const titles = [
    course.highlight,
    focus[0] ? `Focused training in ${focus[0]}.` : undefined,
    focus[1] ? `Practical coverage of ${focus[1]}.` : undefined,
    focus[2] ? `Applied learning around ${focus[2]}.` : undefined,
    course.certification ? `${course.certification} qualification pathway.` : undefined,
    `Career track for ${careerList.slice(0, 2).join(" and ")} roles.`,
    course.duration ? `${course.duration} structured learning plan.` : undefined,
    "Regular assignments, doubt support, and guided evaluation."
  ].filter(Boolean) as string[];

  const icons = [Building, BookOpen, Sparkles, Users, Award, Wrench, ShieldCheck, Calendar];
  return titles.slice(0, 8).map((title, idx) => ({ icon: icons[idx] || CheckCircle2, title }));
};

interface CourseDetailModalProps {
  course: CourseDetailType | null;
  onClose: () => void;
  onApply: (courseTitle: string) => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  onClose,
  onApply,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!course) return null;

  const careerList = getCourseCareers(course);
  const objectiveBullets = getObjectiveBullets(course, careerList);
  const highlights = getHighlightCards(course, careerList);

  // Standard FAQs matching adarsheducation.in
  const faqs = [
    {
      q: "Who can apply for this course?",
      a: course.eligibility || "Candidates who have completed 10th, 12th or Graduation in any stream can apply for this program. No prior computer coding background is required as training starts from foundational concepts."
    },
    {
      q: "Is practical training and internship included?",
      a: "Yes, 100% hands-on practical computer lab sessions, real-world case studies, capstone projects, and dedicated industrial placement assistance are fully included in the curriculum."
    },
    {
      q: "What career options are available after completion?",
      a: `Graduates can pursue roles such as: ${careerList.join(", ")}. Also valid for Govt Employment Exchange registration where applicable.`
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.85 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/95 backdrop-blur-md z-0"
      />

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative z-10 w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#080d1a] border border-zinc-800 shadow-2xl p-4 sm:p-8 text-white text-left my-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-all cursor-pointer z-20"
        >
          <X size={18} />
        </button>

        {/* 1. TOP HEADER HERO BANNER WITH RELEVANT BACKGROUND IMAGE */}
        <div className="relative rounded-2xl overflow-hidden border border-zinc-800 p-6 sm:p-8 mb-6 group">
          {/* Relevant Cover Image */}
          <img 
            src={getCourseBgImage(course.code || course.title)} 
            alt={course.title}
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
            referrerPolicy="no-referrer"
          />
          {/* Overlay scrim for high-contrast legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/85 to-zinc-950/60 pointer-events-none" />

          <div className="relative z-10 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-sans uppercase tracking-widest text-emerald-300 bg-black/80 px-3.5 py-1 rounded-full border border-emerald-500/40 font-extrabold backdrop-blur-md shadow-md">
                {course.code || "PROGRAM"}
              </span>
              {course.duration && (
                <span className="text-xs font-sans text-zinc-200 font-bold bg-black/80 px-3 py-1 rounded-full border border-zinc-700/80 backdrop-blur-md">
                  {course.duration}
                </span>
              )}
            </div>

            <div>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white uppercase leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                {course.title}
              </h2>

              <p className="text-xs sm:text-sm text-zinc-200 font-medium mt-2 max-w-3xl leading-relaxed drop-shadow-sm">
                A premium, industry-focused academic program designed to deliver advanced skills, analytical thinking, and career-oriented validation.
              </p>
            </div>
          </div>
        </div>

        {/* 2. MAIN GRID: ABOUT THE COURSE & DURATION/STRUCTURE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {/* About The Course (Spans 2 cols) */}
          <div className="md:col-span-2 p-5 sm:p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-3">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-emerald-400" />
              <h3 className="text-xs font-mono uppercase tracking-widest text-white font-bold">
                ABOUT THE COURSE
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
              {course.description || "To train students in advanced software development, database administration, and computational thinking. The course emphasizes coding sandboxes, dynamic projects, and technical problem-solving to build developer-ready careers."}
            </p>
            {course.certification && (
              <div className="pt-2 border-t border-zinc-800/80 text-xs text-emerald-400 font-mono flex items-center gap-2">
                <span>🏆 Qualification Issued:</span>
                <span className="text-white font-sans font-medium">{course.certification}</span>
              </div>
            )}
          </div>

          {/* Duration & Structure (Spans 1 col) - DISPLAYED EXCLUSIVELY INSIDE MODAL */}
          <div className="p-5 sm:p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] font-mono uppercase text-cyan-400 tracking-wider font-bold block mb-1">
                DURATION & STRUCTURE
              </span>
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {course.duration}
              </div>
              <span className="text-xs font-mono text-zinc-400 block mt-1">
                Full Academic Track
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800 text-[11px] text-zinc-300 font-light leading-snug">
              ⚡ Morning & Evening Lab Batches with 1:1 computer system allocation.
            </div>
          </div>
        </div>

        {/* 3. COURSE HIGHLIGHTS & OBJECTIVES + HIGHLIGHTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {/* Objectives checklist */}
          <div className="p-5 sm:p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <h3 className="text-xs font-mono uppercase tracking-widest text-white font-bold">
                COURSE HIGHLIGHTS & OBJECTIVES
              </h3>
            </div>
            <ul className="space-y-3 text-xs text-zinc-300 font-light">
              {objectiveBullets.map((objective, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{objective}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 8 Feature cards grid (Spans 2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-400" />
              COURSE HIGHLIGHTS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {highlights.map((hl, idx) => {
                const IconComp = hl.icon;
                return (
                  <div key={idx} className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5">
                      <IconComp size={16} />
                    </div>
                    <span className="text-xs text-zinc-300 font-light leading-snug">
                      {hl.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 4. CAREER OPPORTUNITIES SECTION */}
        <div className="p-5 sm:p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 mb-8 space-y-4">
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-blue-400" />
            <h3 className="text-xs font-mono uppercase tracking-widest text-white font-bold">
              CAREER OPPORTUNITIES
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {careerList.map((career, idx) => (
              <div 
                key={idx} 
                className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 text-center text-xs font-semibold text-zinc-200 hover:border-emerald-500/40 transition-colors flex items-center justify-center min-h-[48px]"
              >
                {career}
              </div>
            ))}
          </div>
        </div>

        {/* 5. DETAILED SYLLABUS BREAKDOWN */}
        {course.syllabus && course.syllabus.length > 0 && (
          <div className="p-5 sm:p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 mb-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono uppercase tracking-widest text-white font-bold flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-emerald-400" />
                DETAILED SYLLABUS BREAKDOWN ({course.syllabus.length} MODULES)
              </h3>
              <span className="text-[10px] font-sans text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-500/20 font-extrabold">
                100% Practical
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {course.syllabus.map((syl, sidx) => (
                <div key={sidx} className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/60 flex items-start gap-2.5 text-xs text-zinc-300">
                  <span className="flex items-center justify-center w-5 h-5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-bold shrink-0 mt-0.5">
                    {sidx + 1}
                  </span>
                  <span className="leading-snug font-light">{syl}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. COURSE FAQS ACCORDION */}
        <div className="p-5 sm:p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 mb-8 space-y-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-amber-400" />
            <h3 className="text-xs font-mono uppercase tracking-widest text-white font-bold">
              COURSE FAQS
            </h3>
          </div>
          <div className="space-y-2.5">
            {faqs.map((faq, fidx) => {
              const isOpen = openFaq === fidx;
              return (
                <div key={fidx} className="rounded-xl bg-zinc-950 border border-zinc-800/80 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : fidx)}
                    className="w-full p-3.5 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold text-white hover:text-emerald-400 transition-colors cursor-pointer"
                  >
                    <span>Q. {faq.q}</span>
                    <span className="p-1 rounded bg-zinc-900 text-emerald-400 shrink-0">
                      {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-3.5 pb-3.5 pt-1 text-xs text-zinc-300 font-light border-t border-zinc-800/50 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 7. ENROLLMENT PROMPT & BOTTOM ACTION BAR */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/40 via-indigo-950/40 to-purple-950/40 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-300 font-light text-center sm:text-left">
            Ready to take the next step? Fill out the online registration form or call our support desk to finalize admissions.
          </p>
          <div className="flex flex-wrap items-center gap-2 shrink-0 w-full sm:w-auto justify-center">
            <a
              href="tel:+917011016060"
              className="px-3 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs text-zinc-200 font-mono transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Phone size={13} />
              7011016060
            </a>
            <a
              href="tel:+919255593976"
              className="px-3 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs text-zinc-200 font-mono transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Phone size={13} />
              9255593976
            </a>
            <button
              onClick={() => {
                onApply(course.title);
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-sans font-extrabold tracking-wider uppercase transition-all shadow-lg shadow-emerald-600/25 active:scale-95 cursor-pointer flex items-center gap-2"
            >
              ENROLL NOW
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

      </motion.div>
    </div>
  );
};
