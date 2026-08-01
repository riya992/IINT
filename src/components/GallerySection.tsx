import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Image as ImageIcon, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2,
  Monitor,
  Presentation,
  Building2,
  Layers
} from "lucide-react";

import galLiveLab from "../assets/images/gal_adarsh_lab_live_1785303202656.jpg";
import galSeminarHall from "../assets/images/gal_adarsh_seminar_1785303224034.jpg";
import galComputerLab from "../assets/images/gal_adarsh_lab2_1785303276099.jpg";
import galFireExit from "../assets/images/gal_adarsh_corridor_1785303290752.jpg";
import galSeminarAlt from "../assets/images/gal_adarsh_seminar_alt.jpg";
import galLabAlt from "../assets/images/gal_adarsh_lab_alt.jpg";
import galCertificateCeremony from "../assets/images/gal_iint_certificate_ceremony.png";
import vidhyanjaliSession from "../assets/images/vidhyanjali_session_ggsss_delhi.jpeg";
import emcSession from "../assets/images/emc_session_ggsss_sonipat.jpeg";
import ojtSession from "../assets/images/ojt_session_ggsss_delhi.jpeg";
import careerCounselling from "../assets/images/career_counselling_ggsss_delhi.jpeg";
import skillSession from "../assets/images/skill_session_ggsss_delhi.jpeg";
import entrepreneurSession from "../assets/images/entrepreneur_session_ggsss_delhi.jpeg";

export interface GalleryPhoto {
  id: string;
  title: string;
  category: "Computer Labs" | "Smart Classrooms" | "Infrastructure";
  categoryKey: "labs" | "classrooms" | "infrastructure";
  imageUrl: string;
  description: string;
}

const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "gal-1",
    title: "Computer Lab — Live Class Session",
    category: "Computer Labs",
    categoryKey: "labs",
    imageUrl: galLiveLab,
    description: "Faculty conducting a live hands-on computer class. Students actively working on systems with the teacher guiding from the front."
  },
  {
    id: "gal-2",
    title: "Seminar Hall — Projector Classroom",
    category: "Smart Classrooms",
    categoryKey: "classrooms",
    imageUrl: galSeminarHall,
    description: "Our spacious seminar hall equipped with ceiling-mounted projector and smart screen for digital presentations and theory lectures."
  },
  {
    id: "gal-5",
    title: "Main Computer Lab — Coding Session",
    category: "Computer Labs",
    categoryKey: "labs",
    imageUrl: galComputerLab,
    description: "Students working on programming and software tasks in our fully-equipped computer lab with dual-row workstations and modern systems."
  },
  {
    id: "gal-6",
    title: "Institute Corridor — Fire Exit & Counselling",
    category: "Infrastructure",
    categoryKey: "infrastructure",
    imageUrl: galFireExit,
    description: "Well-lit institute corridor with clearly marked Fire Exit signs and Counselling Office door — ensuring safety and student support accessibility."
  },
  {
    id: "gal-9",
    title: "Smart Classroom — Presentation & Theory",
    category: "Smart Classrooms",
    categoryKey: "classrooms",
    imageUrl: galSeminarAlt,
    description: "Students attending a digital theory lecture in our projector-enabled smart classroom."
  },
  {
    id: "gal-11",
    title: "Computer Laboratory — Practical Practice",
    category: "Computer Labs",
    categoryKey: "labs",
    imageUrl: galLabAlt,
    description: "Students working on programming assignments and lab practices in our modern computer facility."
  },
  {
    id: "gal-12",
    title: "Certificate Ceremony — IINT Computer Centre",
    category: "Infrastructure",
    categoryKey: "infrastructure",
    imageUrl: galCertificateCeremony,
    description: "IINT Computer Centre students on stage with certificates — a proud celebration of skills, training, and achievement."
  },
  {
    id: "gal-13",
    title: "Vidhyanjali Session (GGSSS - Delhi)",
    category: "Smart Classrooms",
    categoryKey: "classrooms",
    imageUrl: vidhyanjaliSession,
    description: "Interactive classroom session with GGSSS Delhi students, focused on learning, participation, and career awareness."
  },
  {
    id: "gal-14",
    title: "Emc Session (GGSSS - Sonipat)",
    category: "Smart Classrooms",
    categoryKey: "classrooms",
    imageUrl: emcSession,
    description: "Outdoor student engagement session at GGSSS Sonipat, encouraging awareness, participation, and guided learning."
  },
  {
    id: "gal-15",
    title: "OJT Session (GGSSS - Delhi)",
    category: "Smart Classrooms",
    categoryKey: "classrooms",
    imageUrl: ojtSession,
    description: "On-job training session with GGSSS Delhi students, using projector-based learning for practical exposure."
  },
  {
    id: "gal-16",
    title: "Career Counselling (GGSSS - Delhi)",
    category: "Smart Classrooms",
    categoryKey: "classrooms",
    imageUrl: careerCounselling,
    description: "Career counselling session guiding GGSSS Delhi students on future pathways, skill choices, and professional goals."
  },
  {
    id: "gal-17",
    title: "Skill Session (GGSSS - Delhi)",
    category: "Smart Classrooms",
    categoryKey: "classrooms",
    imageUrl: skillSession,
    description: "Skill development classroom session with GGSSS Delhi students, focused on practical learning and confidence building."
  },
  {
    id: "gal-18",
    title: "Entrepreneur Session (GGSSS - Delhi)",
    category: "Smart Classrooms",
    categoryKey: "classrooms",
    imageUrl: entrepreneurSession,
    description: "Entrepreneurship awareness session with GGSSS Delhi students, encouraging ideas, leadership, and career readiness."
  }
];

export interface GallerySectionProps {
  onApplyForAdmission?: () => void;
}

export default function GallerySection({ onApplyForAdmission }: GallerySectionProps = {}) {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);

  const filterTabs = [
    { id: "all", label: "All Infrastructure", icon: Layers },
    { id: "labs", label: "Computer Labs", icon: Monitor },
    { id: "classrooms", label: "Smart Classrooms", icon: Presentation },
    { id: "infrastructure", label: "Infrastructure", icon: Building2 },
  ];

  const filteredPhotos = useMemo(() => {
    if (activeTab === "all") return GALLERY_PHOTOS;
    return GALLERY_PHOTOS.filter((p) => p.categoryKey === activeTab);
  }, [activeTab]);

  const activeIndex = activePhoto 
    ? filteredPhotos.findIndex((p) => p.id === activePhoto.id)
    : -1;

  const handlePrevPhoto = () => {
    if (activeIndex > 0) {
      setActivePhoto(filteredPhotos[activeIndex - 1]);
    } else if (filteredPhotos.length > 0) {
      setActivePhoto(filteredPhotos[filteredPhotos.length - 1]);
    }
  };

  const handleNextPhoto = () => {
    if (activeIndex >= 0 && activeIndex < filteredPhotos.length - 1) {
      setActivePhoto(filteredPhotos[activeIndex + 1]);
    } else if (filteredPhotos.length > 0) {
      setActivePhoto(filteredPhotos[0]);
    }
  };

  return (
    <section id="gallery" className="relative z-10 py-12 sm:py-16 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto text-left">
      {/* Background Soft Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Container */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-8 sm:mb-10">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs font-sans font-bold shadow-md"
        >
          <ImageIcon size={14} className="text-blue-400" />
          <span>INFRASTRUCTURE & GALLERY</span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl font-black text-white tracking-tight"
        >
          Infrastructure & <span className="text-blue-400">Gallery</span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-zinc-300 font-sans max-w-xl mx-auto"
        >
          Explore our modern computer labs, projector-enabled smart classrooms, examination halls, and campus infrastructure.
        </motion.p>
      </div>

      {/* Category Filter Pills (Matches adarsheducation.in) */}
      <div className="flex items-center justify-center flex-wrap gap-2.5 mb-10">
        {filterTabs.map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer select-none flex items-center gap-2 border ${
                isSelected
                  ? "bg-emerald-600 text-white border-emerald-400 shadow-lg shadow-emerald-900/30 scale-105"
                  : "bg-zinc-900/90 text-zinc-300 hover:text-white hover:bg-zinc-800 border-zinc-800"
              }`}
            >
              <Icon size={14} className={isSelected ? "text-white" : "text-emerald-400"} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Gallery Cards Grid (Directly matching adarsheducation.in cards layout) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredPhotos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.04 }}
            onClick={() => setActivePhoto(photo)}
            className="group rounded-2xl overflow-hidden bg-white text-zinc-900 border border-zinc-200 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100">
              <img 
                src={photo.imageUrl} 
                alt={photo.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              
              <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 size={14} />
              </div>
            </div>

            {/* Card Body (Matches adarsheducation.in structure: Tag + Title + Description) */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-2.5">
              <div>
                {/* Category Pill */}
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
                  {photo.category}
                </span>

                {/* Card Title */}
                <h3 className="text-sm font-black text-zinc-900 group-hover:text-emerald-600 transition-colors leading-snug">
                  {photo.title}
                </h3>

                {/* Card Description */}
                <p className="text-xs text-zinc-600 font-sans leading-relaxed mt-1.5 line-clamp-3">
                  {photo.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Full Photo Lightbox */}
      <AnimatePresence>
        {activePhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePhoto(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative z-10 w-full max-w-4xl max-h-[92vh] rounded-2xl bg-zinc-950 border border-blue-900/50 shadow-2xl p-4 sm:p-6 text-white flex flex-col gap-4"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                    {activePhoto.category}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white">{activePhoto.title}</h3>
                </div>

                <button 
                  onClick={() => setActivePhoto(null)}
                  className="p-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-all cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Photo Display */}
              <div className="relative w-full rounded-xl overflow-hidden bg-black flex items-center justify-center max-h-[60vh]">
                <img 
                  src={activePhoto.imageUrl} 
                  alt={activePhoto.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain max-h-[60vh]"
                />

                {/* Navigation Buttons */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevPhoto();
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-emerald-600 text-white border border-white/20 transition-all cursor-pointer shadow-xl"
                  title="Previous Photo"
                >
                  <ChevronLeft size={20} />
                </button>

                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextPhoto();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-emerald-600 text-white border border-white/20 transition-all cursor-pointer shadow-xl"
                  title="Next Photo"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Modal Description */}
              <div className="space-y-2 text-left">
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                  {activePhoto.description}
                </p>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between text-xs text-zinc-400 font-sans pt-2 border-t border-zinc-900">
                <span>Photo {activeIndex + 1} of {filteredPhotos.length}</span>
                
                <div className="flex items-center gap-2">
                  {onApplyForAdmission && (
                    <button
                      onClick={() => {
                        setActivePhoto(null);
                        onApplyForAdmission();
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer"
                    >
                      Enquire Now
                    </button>
                  )}
                  <button 
                    onClick={() => setActivePhoto(null)}
                    className="px-3.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 font-medium cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
