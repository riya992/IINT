import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight, 
  GraduationCap, 
  CheckCircle2, 
  Award, 
  ChevronRight,
  Users,
  Building,
  Instagram,
  User,
  Megaphone,
  BarChart3,
  Monitor,
  Landmark,
  ShieldCheck,
  ArrowLeft,
  Briefcase,
  CheckSquare,
  BookOpen,
  Sparkles,
  Wrench,
  X
} from "lucide-react";
import ParticleCanvas from "./components/ParticleCanvas";
import NavigationBar, { PageTab } from "./components/NavigationBar";
import FAQSection from "./components/FAQSection";
import AccreditationSection from "./components/AccreditationSection";
import CertificationBadges from "./components/CertificationBadges";
import GovtApprovalSection from "./components/GovtApprovalSection";
import TestimonialsSection from "./components/TestimonialsSection";

interface CourseItem {
  id: string;
  code: string;
  title: string;
  fullTitle: string;
  category: string;
  stream: "diploma" | "regular" | "distance" | "digital-marketing" | "data-analytics";
  level: "diploma" | "ug" | "pg";
  duration: string;
  semesters: string;
  certification: string;
  bgImage: string;
  tagline: string;
  description: string;
  longAbout: string;
  eligibility: string[];
  syllabus: string[];
  careerRoles: [string, string, string, string];
  highlight: string;
}

// Indian States List for Admission Form Dropdown
const INDIAN_STATES = [
  "Delhi NCR / Narela",
  "Haryana",
  "Punjab",
  "Uttar Pradesh",
  "Rajasthan",
  "Bihar",
  "Madhya Pradesh",
  "Uttarakhand",
  "Himachal Pradesh",
  "Other State / Region"
];

// Complete Course Catalog with Short Title & Full Form
const COURSES: CourseItem[] = [
  // =========================================================================
  // 1. DIPLOMA COURSES (ENGINEERING, TECHNICAL ITI, PHARMACY, NURSING)
  // =========================================================================
  {
    id: "dca",
    code: "DCA",
    title: "DCA",
    fullTitle: "Diploma in Computer Applications",
    category: "COMPUTER DIPLOMA",
    stream: "diploma",
    level: "diploma",
    duration: "6 Months",
    semesters: "2 Modules",
    certification: "State Board Approved DCA Diploma & ISO 9001:2015",
    bgImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    tagline: '"MASTERING CORE COMPUTING, OFFICE AUTOMATION AND DIGITAL ADMINISTRATION."',
    description: "Professional-grade computer applications diploma tailored for beginners to master OS, office packages, internet security, and spreadsheet automation.",
    longAbout: "To provide a high-quality academic pathway in Diploma in Computer Applications (DCA). The curriculum combines IT theory with practical sandbox labs, developing advanced digital skillsets for administrative roles.",
    eligibility: [
      "Passed Class 10th or 12th from any recognized education board.",
      "Basic understanding of English reading and elementary logic."
    ],
    syllabus: [
      "Computer Fundamentals & OS Installation",
      "Office Productivity Tools & Admin Correspondence",
      "Data Analysis & Computing in MS Excel",
      "Database Administration with MS Access",
      "Web Security & Internet Core Standards"
    ],
    careerRoles: [
      "Computer Operator",
      "Data Entry Specialist",
      "Office Administrative Assistant",
      "Government Data Associate"
    ],
    highlight: "Highly recommended for state job entries and administrative roles.",
  },
  {
    id: "dip-aero",
    code: "Dip-Aero",
    title: "Diploma Aeronautical",
    fullTitle: "Diploma in Aeronautical Engineering",
    category: "ENGINEERING DIPLOMA",
    stream: "diploma",
    level: "diploma",
    duration: "3 Years",
    semesters: "6 Semesters",
    certification: "State Board Technical Diploma in Aeronautical Engg",
    bgImage: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1200&q=80",
    tagline: '"AIRCRAFT DESIGN, AERODYNAMICS AND FLIGHT PROPULSION SYSTEMS."',
    description: "Specialized 3-year technical diploma focusing on aircraft aerodynamics, structural mechanics, jet propulsion systems, and wind tunnel testing.",
    longAbout: "To train skilled technicians in flight dynamics, CFD simulation tools, aircraft fuselage maintenance, and turbine propulsion systems.",
    eligibility: [
      "Passed Class 10th with Mathematics & Science.",
      "Minimum 45% aggregate marks."
    ],
    syllabus: [
      "Aerodynamics & Supersonic Flight Dynamics",
      "Aircraft Structural Mechanics & Materials",
      "Aircraft Propulsion & Turbine Jet Engines",
      "Flight Control & Instrument Avionics",
      "Hands-On Hangar Workshop Labs"
    ],
    careerRoles: [
      "Aeronautical Technical Assistant",
      "Flight Hardware Inspector",
      "Wind Tunnel Lab Operator",
      "Aviation Draughtsman"
    ],
    highlight: "Prepares students for aerospace defense & aircraft manufacturing units.",
  },
  {
    id: "dip-ame",
    code: "Dip-AME",
    title: "AME Diploma",
    fullTitle: "Aircraft Maintenance Engineering",
    category: "ENGINEERING DIPLOMA",
    stream: "diploma",
    level: "diploma",
    duration: "3 Years",
    semesters: "6 Semesters",
    certification: "DGCA Approved / Technical Aviation Diploma",
    bgImage: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80",
    tagline: '"COMMERCIAL JET MAINTENANCE, TURBINES AND FLIGHT SAFETY."',
    description: "DGCA-oriented maintenance engineering diploma covering jet engines, avionics, flight controls, radar, and structural aircraft overhauls.",
    longAbout: "To train aviation engineers capable of servicing commercial airliners, turbine jet engines, flight instruments, and aircraft radar systems under DGCA norms.",
    eligibility: [
      "Passed Class 12th with PCM or Class 10th.",
      "Minimum 50% aggregate marks."
    ],
    syllabus: [
      "Jet Turbine Engine Maintenance",
      "Aircraft Avionics & Radar Electronics",
      "Hydraulics & Pneumatic Flight Systems",
      "DGCA & EASA Regulations",
      "Hangar & Airframe Overhaul Labs"
    ],
    careerRoles: [
      "Aircraft Maintenance Engineer",
      "Avionics Technician",
      "Airline Hangar Supervisor",
      "Flight Safety Inspector Associate"
    ],
    highlight: "Eligible for DGCA Licensing exams & Commercial Airline jobs.",
  },
  {
    id: "dip-ame-easa",
    code: "Dip-AME EASA",
    title: "AME + EASA Modules",
    fullTitle: "Aircraft Maintenance Engineering + EASA Modules",
    category: "INTERNATIONAL AVIATION DIPLOMA",
    stream: "diploma",
    level: "diploma",
    duration: "3 Years",
    semesters: "6 Semesters",
    certification: "European Union Aviation Safety Agency (EASA) Integrated",
    bgImage: "https://images.unsplash.com/photo-1436491865332-7a61a389cc05?auto=format&fit=crop&w=1200&q=80",
    tagline: '"GLOBAL AVIATION CERTIFICATION AND EUROPEAN EASA MODULE TRAINING."',
    description: "International aviation engineering diploma integrated with European Union Aviation Safety Agency (EASA) Part-66 module preparation.",
    longAbout: "To qualify aircraft technicians for international airline fleets across Europe, Gulf countries, and global MRO maintenance hangars.",
    eligibility: [
      "Passed Class 12th PCM or Class 10th Math & Science.",
      "Good command over English language."
    ],
    syllabus: [
      "EASA Module 1-17 Preparation & Exam Labs",
      "Turbine Engine Airworthiness Standards",
      "Digital Fly-by-Wire Flight Control Systems",
      "Composite Aircraft Structural Repairs",
      "International MRO Internship"
    ],
    careerRoles: [
      "International EASA Aircraft Engineer",
      "Gulf Airline MRO Technician",
      "Avionics Systems Specialist",
      "Commercial Fleet Flight Engineer"
    ],
    highlight: "Opens international job pathways across global airlines & MROs.",
  },
  {
    id: "dip-aiml",
    code: "Dip-AI/ML",
    title: "Diploma AI & ML",
    fullTitle: "Diploma in Artificial Intelligence & Machine Learning",
    category: "ENGINEERING DIPLOMA",
    stream: "diploma",
    level: "diploma",
    duration: "3 Years",
    semesters: "6 Semesters",
    certification: "State Technical Board Approved AI/ML Diploma",
    bgImage: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80",
    tagline: '"NEURAL NETWORKS, ALGORITHMIC INTELLIGENCE AND AUTOMATION."',
    description: "Future-ready engineering diploma covering Python computational basics, neural network foundations, and machine learning models.",
    longAbout: "To equip students with cutting-edge expertise in artificial intelligence and algorithmic computing with real-world computer vision projects.",
    eligibility: [
      "Passed Class 10th or 12th with Mathematics.",
      "Minimum 50% aggregate marks in Science and Math."
    ],
    syllabus: [
      "Python Scientific Computing (NumPy, Pandas)",
      "Applied Statistics & Probability for Data",
      "Supervised & Unsupervised ML Algorithms",
      "Computer Vision & NLP Basics",
      "AI System Deployment Capstone"
    ],
    careerRoles: [
      "AI Associate Engineer",
      "Python Junior Developer",
      "Machine Learning Operator",
      "Automation QA Tester"
    ],
    highlight: "High industry demand in smart software development and analytics.",
  },
  {
    id: "dip-auto",
    code: "Dip-Auto",
    title: "Diploma Automobile",
    fullTitle: "Diploma in Automobile Engineering",
    category: "ENGINEERING DIPLOMA",
    stream: "diploma",
    level: "diploma",
    duration: "3 Years",
    semesters: "6 Semesters",
    certification: "State Board Technical Diploma in Automobile Engg",
    bgImage: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80",
    tagline: '"ELECTRIC VEHICLES, IC ENGINES AND AUTOMOTIVE DESIGN."',
    description: "3-Year technical diploma covering Electric Vehicles (EV), IC engines, transmission systems, automotive chassis design, and vehicle diagnostics.",
    longAbout: "To train automotive technicians in EV battery management systems, internal combustion engines, transmission, and CAD vehicle chassis design.",
    eligibility: [
      "Passed Class 10th with Science & Math.",
      "Minimum 45% aggregate marks."
    ],
    syllabus: [
      "Automotive Engines & Fuel Injection Systems",
      "Electric Vehicle (EV) Tech & Battery Control",
      "Vehicle Dynamics & Suspension Chassis Design",
      "Auto CAD 3D Automotive Drafting",
      "Vehicle Diagnostic Workshops"
    ],
    careerRoles: [
      "Automobile Junior Engineer",
      "EV Battery Specialist Technician",
      "Vehicle Service Supervisor",
      "Auto CAD Draughtsman"
    ],
    highlight: "High demand in EV manufacturing plants (Tata Motors, Maruti, Mahindra).",
  },
  {
    id: "dip-civil",
    code: "Dip-Civil",
    title: "Diploma Civil",
    fullTitle: "Diploma in Civil Engineering",
    category: "ENGINEERING DIPLOMA",
    stream: "diploma",
    level: "diploma",
    duration: "3 Years",
    semesters: "6 Semesters",
    certification: "State Board Technical Civil Diploma",
    bgImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    tagline: '"STRUCTURAL DESIGN, LAND SURVEYING AND INFRASTRUCTURE MANAGEMENT."',
    description: "Practical civil engineering diploma covering structural engineering, land surveying, concrete technology, AutoCAD civil drafting, and construction management.",
    longAbout: "To prepare civil technicians capable of carrying out total station surveying, structural drawing inspections, and site supervision for infrastructure projects.",
    eligibility: [
      "Passed Class 10th with Mathematics & Science.",
      "Minimum 45% aggregate marks."
    ],
    syllabus: [
      "Surveying & Levelling with Total Station",
      "Building Construction Materials & Concrete Tech",
      "Structural Analysis & Reinforced Concrete Design",
      "AutoCAD Civil 2D/3D & Estimation",
      "Highway & Transportation Engineering"
    ],
    careerRoles: [
      "Junior Civil Engineer",
      "Land Surveyor Specialist",
      "Construction Site Supervisor",
      "AutoCAD Civil Draftsman"
    ],
    highlight: "High demand in government PWD, railways, and infrastructure projects.",
  },
  {
    id: "dip-cse",
    code: "Dip-CSE",
    title: "Diploma CSE",
    fullTitle: "Diploma in Computer Science & Engineering",
    category: "ENGINEERING DIPLOMA",
    stream: "diploma",
    level: "diploma",
    duration: "3 Years",
    semesters: "6 Semesters",
    certification: "State Board Technical Diploma in CSE",
    bgImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    tagline: '"HARDWARE ARCHITECTURES, SOFTWARE ENGINEERING AND NETWORKS."',
    description: "3-Year technical engineering diploma focusing on computing hardware architectures, C/C++ programming, RDBMS, and software engineering.",
    longAbout: "To provide a technical foundation in Computer Science & Engineering. Students engage in practical C++ programming, network setups, and web design modules for 2nd-year lateral B.Tech entry.",
    eligibility: [
      "Passed Class 10th examination with Mathematics & Science.",
      "Minimum 45% aggregate marks in board exam."
    ],
    syllabus: [
      "Programming in C & C++ Data Structures",
      "Computer Architecture & Digital Electronics",
      "Database Management Systems (RDBMS & SQL)",
      "Computer Networks & Operating Systems",
      "Web Development Fundamentals & Industrial Project"
    ],
    careerRoles: [
      "Junior Software Developer",
      "Network Support Engineer",
      "System Administrator",
      "IT Lab Instructor"
    ],
    highlight: "Eligible for 2nd Year Lateral Entry in B.Tech Degree.",
  },
  {
    id: "dip-ee",
    code: "Dip-EE",
    title: "Diploma Electrical",
    fullTitle: "Diploma in Electrical Engineering",
    category: "ENGINEERING DIPLOMA",
    stream: "diploma",
    level: "diploma",
    duration: "3 Years",
    semesters: "6 Semesters",
    certification: "State Board Technical Electrical Diploma",
    bgImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    tagline: '"POWER GENERATION, SUBSTATIONS AND PLC INDUSTRIAL AUTOMATION."',
    description: "Technical diploma focusing on electrical power generation, transmission networks, motor controls, PLC/SCADA automation, and wiring systems.",
    longAbout: "To train electrical engineers skilled in motor controls, high-voltage substations, renewable energy solar arrays, and PLC industrial automation.",
    eligibility: [
      "Passed Class 10th with Math & Science.",
      "Minimum 45% aggregate marks."
    ],
    syllabus: [
      "Electrical Circuit Theory & Electromagnetic Fields",
      "Electrical Machines (Motors & Transformers)",
      "Power Electronics & Control Systems",
      "PLC & SCADA Industrial Automation",
      "Substation Maintenance & Safety"
    ],
    careerRoles: [
      "Junior Electrical Engineer",
      "PLC Automation Operator",
      "Power Grid Technician",
      "Substation Electrical Supervisor"
    ],
    highlight: "Essential diploma for power grids, renewable energy & automation sectors.",
  },
  {
    id: "dip-ece",
    code: "Dip-ECE",
    title: "Diploma ECE",
    fullTitle: "Diploma in Electronics & Communication Engineering",
    category: "ENGINEERING DIPLOMA",
    stream: "diploma",
    level: "diploma",
    duration: "3 Years",
    semesters: "6 Semesters",
    certification: "State Board Technical ECE Diploma",
    bgImage: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=1200&q=80",
    tagline: '"SEMICONDUCTORS, EMBEDDED SYSTEMS AND TELECOM NETWORKS."',
    description: "Technical engineering diploma covering microprocessors, IoT hardware, VLSI circuits, satellite communications, and mobile networks.",
    longAbout: "To build expertise in electronic circuit design, embedded Python microcontrollers, wireless communication systems, and cellular tower infrastructure.",
    eligibility: [
      "Passed Class 10th with Science & Mathematics.",
      "Minimum 45% aggregate marks."
    ],
    syllabus: [
      "Analog & Digital Electronic Circuits",
      "Microprocessors & Embedded Systems (Arduino/Raspberry Pi)",
      "Wireless & Satellite Communication Systems",
      "Fiber Optic & Telecom Networks",
      "PCB Design & Industrial Electronics"
    ],
    careerRoles: [
      "Embedded Systems Technician",
      "Telecom Network Associate",
      "PCB Design Technician",
      "Electronic Quality Inspector"
    ],
    highlight: "High demand in smartphone manufacturing & telecom sector.",
  },
  {
    id: "dip-fire",
    code: "Dip-Fire",
    title: "Diploma Fire & Safety",
    fullTitle: "Diploma in Fire Technology & Safety",
    category: "ENGINEERING DIPLOMA",
    stream: "diploma",
    level: "diploma",
    duration: "3 Years",
    semesters: "6 Semesters",
    certification: "State Board Approved Safety & Fire Engineering Diploma",
    bgImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80",
    tagline: '"INDUSTRIAL SAFETY AUDITS, FIRE HYDRANTS AND DISASTER MANAGEMENT."',
    description: "Specialized safety diploma covering industrial fire prevention, hazard risk audits, fire protection hydraulics, and emergency disaster management.",
    longAbout: "To train certified safety officers for industrial plants, construction projects, oil refineries, and municipal fire departments.",
    eligibility: [
      "Passed Class 10th with Science.",
      "Physical fitness standard clearance."
    ],
    syllabus: [
      "Fire Prevention & Hydraulics Systems",
      "Industrial Hazard & Risk Audit Management",
      "Building Fire Safety & Code Regulations",
      "First Aid & Disaster Rescue Operations",
      "Mock Drill & Fire Fighting Practicals"
    ],
    careerRoles: [
      "Industrial Fire & Safety Officer",
      "EHS Safety Auditor",
      "Construction Safety Inspector",
      "Municipal Fire Station Associate"
    ],
    highlight: "Mandatory qualification for safety officer roles in industrial factories.",
  },
  {
    id: "dip-mech",
    code: "Dip-Mech",
    title: "Diploma Mechanical",
    fullTitle: "Diploma in Mechanical Engineering",
    category: "ENGINEERING DIPLOMA",
    stream: "diploma",
    level: "diploma",
    duration: "3 Years",
    semesters: "6 Semesters",
    certification: "State Board Technical Mechanical Diploma",
    bgImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    tagline: '"MACHINE DESIGN, MANUFACTURING PROCESSES AND CNC CAD/CAM."',
    description: "Core technical engineering diploma covering machine design, thermal engineering, manufacturing processes, CNC machining, and CAD/CAM modeling.",
    longAbout: "To build strong foundational skills in mechanical drafting, thermodynamics, production technology, and industrial robotics for manufacturing plants.",
    eligibility: [
      "Passed Class 10th with Science & Mathematics.",
      "Minimum 45% aggregate marks."
    ],
    syllabus: [
      "Engineering Mechanics & Strength of Materials",
      "Thermodynamics & IC Engines",
      "Manufacturing Processes & CNC Machining",
      "AutoCAD & SolidWorks 3D Modeling",
      "Industrial Robotics & Maintenance"
    ],
    careerRoles: [
      "Junior Mechanical Engineer",
      "CNC Machine Operator",
      "CAD Mechanical Draftsman",
      "Plant Maintenance Supervisor"
    ],
    highlight: "Core diploma valid for public sector (PSUs) & manufacturing industries.",
  },
  {
    id: "dmlt",
    code: "DMLT",
    title: "DMLT",
    fullTitle: "Medical Lab Technician",
    category: "PARAMEDICAL DIPLOMA",
    stream: "diploma",
    level: "diploma",
    duration: "2 Years",
    semesters: "4 Semesters",
    certification: "State Paramedical Board Approved Diploma",
    bgImage: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80",
    tagline: '"CLINICAL PATHOLOGY, BIOCHEMISTRY AND DIAGNOSTIC LABS."',
    description: "Paramedical diploma training students in blood analysis, clinical biochemistry, microbiology tests, and pathology lab operation.",
    longAbout: "To train healthcare lab technicians capable of operating automated blood analyzers, conducting histology tests, and managing diagnostic pathology centers.",
    eligibility: [
      "Passed Class 12th with Science (PCB/PCM) or Class 10th.",
      "Minimum 45% aggregate marks."
    ],
    syllabus: [
      "Clinical Biochemistry & Hematology",
      "Microbiology & Parasitology Tests",
      "Histopathology & Cytology Techniques",
      "Diagnostic Lab Instrumentation & Safety",
      "Hospital Pathology Internship"
    ],
    careerRoles: [
      "Medical Lab Technician",
      "Pathology Assistant",
      "Blood Bank Technician",
      "Diagnostic Center Operator"
    ],
    highlight: "High job stability in hospitals & diagnostic chains.",
  },
  {
    id: "dip-lateral",
    code: "Dip-Lateral",
    title: "Diploma Lateral Entry",
    fullTitle: "Diploma (Lateral Entry - Direct 2nd Year)",
    category: "ENGINEERING DIPLOMA",
    stream: "diploma",
    level: "diploma",
    duration: "2 Years",
    semesters: "4 Semesters",
    certification: "Direct 2nd Year Entry into All Diploma Courses",
    bgImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    tagline: '"DIRECT 2ND YEAR ADMISSION FOR ITI & 12TH SCIENCE STUDENTS."',
    description: "Direct 2nd-year lateral entry pathway for 12th Science / ITI passed students into any 3-year engineering diploma program.",
    longAbout: "Save 1 complete year! Directly join the 3rd semester of Aeronautical, CSE, Civil, Mechanical, Automobile, or Electrical engineering diplomas.",
    eligibility: [
      "Passed 12th Science with PCM or 2-Year ITI Trade Course.",
      "Minimum 45% aggregate marks."
    ],
    syllabus: [
      "Core 3rd & 4th Semester Engineering Subjects",
      "Domain Specific Advanced Branch Workshops",
      "CAD Drafting & Laboratory Practicals",
      "Industrial Training & Project Work"
    ],
    careerRoles: [
      "Junior Technical Engineer",
      "CAD Drafting Specialist",
      "Industrial Plant Supervisor",
      "Public Sector PSU Applicant"
    ],
    highlight: "Saves 1 full academic year for ITI & 12th Science students.",
  },
  {
    id: "iti-draughtsman",
    code: "ITI-Civil",
    title: "ITI Draughtsman",
    fullTitle: "Draughtsman (Civil) ITI",
    category: "TECHNICAL ITI",
    stream: "diploma",
    level: "diploma",
    duration: "2 Years",
    semesters: "4 Semesters",
    certification: "NCVT / NCVT Govt Approved ITI Trade Certificate",
    bgImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    tagline: '"ARCHITECTURAL BLUEPRINT DRAFTING AND AUTOCAD DRAWINGS."',
    description: "NCVT government approved ITI technical trade teaching architectural building drawings, AutoCAD 2D drafting, structural layouts, and site surveying.",
    longAbout: "To prepare skilled civil draughtsmen capable of drawing building floor plans, structural elevation blueprints, and CAD designs for real estate projects.",
    eligibility: [
      "Passed Class 10th (Secondary) examination.",
      "Basic mathematical drawing aptitude."
    ],
    syllabus: [
      "Architectural Engineering Drawing Standards",
      "AutoCAD 2D & 3D Building Floor Plans",
      "Structural Blueprint Detailing",
      "Site Surveying & Quantity Estimation",
      "NCVT Trade Practical Workshops"
    ],
    careerRoles: [
      "AutoCAD Civil Draughtsman",
      "Architectural Assistant",
      "Govt PWD Drawing Associate",
      "Real Estate CAD Designer"
    ],
    highlight: "Valid for Government PWD & Private Architect offices.",
  },
  {
    id: "iti-electrician",
    code: "ITI-Electrician",
    title: "ITI Electrician",
    fullTitle: "Electrician ITI",
    category: "TECHNICAL ITI",
    stream: "diploma",
    level: "diploma",
    duration: "2 Years",
    semesters: "4 Semesters",
    certification: "NCVT Approved Electrician Trade Certificate",
    bgImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    tagline: '"INDUSTRIAL ELECTRIC WIRING, TRANSFORMERS AND MOTORS."',
    description: "NCVT approved ITI trade training students in industrial electrical wiring, transformer maintenance, AC/DC motor winding, and power safety.",
    longAbout: "To produce licensed electrician technicians capable of executing building electrical wiring, motor repairs, substation maintenance, and factory power setups.",
    eligibility: [
      "Passed Class 10th with Science & Math."
    ],
    syllabus: [
      "Electrical Safety Standards & Tools",
      "Domestic & Industrial Power Wiring",
      "AC/DC Motor & Armature Winding",
      "Transformer Testing & Maintenance",
      "Solar Panel & Inverter Installation"
    ],
    careerRoles: [
      "Licensed Electrical Contractor",
      "Industrial Plant Electrician",
      "Power Grid Technician",
      "Solar Electrical Installer"
    ],
    highlight: "Qualifies for Govt. Electrical Wireman License.",
  },
  {
    id: "iti-diesel",
    code: "ITI-Diesel",
    title: "ITI Diesel Mechanic",
    fullTitle: "Mechanic Diesel Engine ITI",
    category: "TECHNICAL ITI",
    stream: "diploma",
    level: "diploma",
    duration: "1 Year",
    semesters: "2 Semesters",
    certification: "NCVT Approved Diesel Mechanic Certificate",
    bgImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    tagline: '"HEAVY DIESEL ENGINES, GENERATORS AND TRUCK REPAIRS."',
    description: "NCVT trade certificate program focusing on heavy diesel engine overhauling, fuel injection pumps, diesel generators, and commercial vehicles.",
    longAbout: "To train mechanics in repairing heavy commercial trucks, diesel generators, earthmoving JCB equipment, and marine diesel engines.",
    eligibility: [
      "Passed Class 10th examination."
    ],
    syllabus: [
      "Diesel Engine Working Principles",
      "Fuel Injection Pump (FIP) Calibration",
      "Heavy Engine Overhauling & Reboring",
      "Turbocharger & Exhaust Systems",
      "Diesel Generator Set Maintenance"
    ],
    careerRoles: [
      "Heavy Diesel Engine Mechanic",
      "Diesel Generator Technician",
      "Automobile Workshop Supervisor",
      "Indian Railways Loco Workshop Associate"
    ],
    highlight: "1-Year fast-track trade valid for Indian Railways & Defense workshops.",
  },
  {
    id: "dip-pharm",
    code: "D.Pharm",
    title: "D.Pharm",
    fullTitle: "Diploma in Pharmacy",
    category: "PHARMACY DIPLOMA",
    stream: "diploma",
    level: "diploma",
    duration: "2 Years",
    semesters: "4 Semesters",
    certification: "Pharmacy Council of India (PCI) Approved Diploma",
    bgImage: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80",
    tagline: '"PHARMACEUTICS, DRUG DISPENSING AND COMMUNITY HEALTHCARE."',
    description: "2-year professional medical diploma preparing students for registered pharmacist licensure, retail medical stores, pharmaceutical sales, and hospital pharmacies.",
    longAbout: "To prepare licensed pharmacists capable of compounding, dispensing medicines, managing retail drug stores, and supporting hospital healthcare units.",
    eligibility: [
      "Passed Class 12th with Physics, Chemistry & Biology/Math (PCB/PCM).",
      "Minimum 45% aggregate marks."
    ],
    syllabus: [
      "Pharmaceutics & Pharmaceutical Chemistry",
      "Pharmacognosy & Herbal Drug Technology",
      "Human Anatomy & Physiology",
      "Pharmacology & Community Pharmacy",
      "Hospital Pharmacy & Clinical Drug Management"
    ],
    careerRoles: [
      "Registered Retail Pharmacist",
      "Hospital Pharmacy Executive",
      "Medical Sales Representative",
      "Pharma Quality Inspector Assistant"
    ],
    highlight: "Valid for Drug License registration & Government Pharmacist jobs.",
  },
  {
    id: "gnm-nursing",
    code: "GNM",
    title: "GNM Nursing",
    fullTitle: "General Nursing & Midwifery",
    category: "NURSING DIPLOMA",
    stream: "diploma",
    level: "diploma",
    duration: "3 Years",
    semesters: "6 Semesters",
    certification: "Indian Nursing Council (INC) Approved Diploma",
    bgImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    tagline: '"PATIENT CARE, CLINICAL NURSING AND MATERNAL MIDWIFERY."',
    description: "Professional nursing diploma approved by Indian Nursing Council (INC) training students in hospital patient care, ICU nursing, and midwifery.",
    longAbout: "To train compassionate registered nurses capable of assisting surgeons, operating ICU monitors, dispensing clinical medication, and administering emergency care.",
    eligibility: [
      "Passed Class 12th in any stream (Science/Arts/Commerce).",
      "Minimum 40% aggregate marks."
    ],
    syllabus: [
      "Anatomy, Physiology & Microbiology",
      "Fundamentals of Nursing & First Aid",
      "Community Health Nursing & Nutrition",
      "Medical-Surgical Nursing & ICU Protocols",
      "Midwifery & Gynecological Nursing Labs"
    ],
    careerRoles: [
      "Registered Staff Nurse",
      "ICU Clinical Nurse",
      "Community Health Nursing Officer",
      "Home Healthcare Specialist"
    ],
    highlight: "Valid for Nursing Council Registration & Government Hospital jobs.",
  },

  // =========================================================================
  // 2. REGULAR UNDERGRADUATE (UG) DEGREE COURSES
  // =========================================================================
  {
    id: "btech-aero-space",
    code: "B.Tech Aero",
    title: "B.Tech Aerospace",
    fullTitle: "B.Tech Aerospace Engineering",
    category: "REGULAR UG PROGRAMMES",
    stream: "regular",
    level: "ug",
    duration: "4 Years",
    semesters: "8 Semesters",
    certification: "AICTE Approved B.Tech Aerospace Degree",
    bgImage: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1200&q=80",
    tagline: '"SPACE ORBITAL MECHANICS, SATELLITE PROPULSION AND ROCKETRY."',
    description: "High-level 4-year engineering program covering space orbital mechanics, rocket propulsion systems, satellite design, and supersonic aerodynamics.",
    longAbout: "To prepare aerospace engineers for space research agencies (ISRO, NASA), satellite defense organizations (DRDO), and commercial rocket manufacturers.",
    eligibility: [
      "Passed Class 12th with PCM.",
      "JEE Main rank."
    ],
    syllabus: [
      "Aerodynamics & Compressible Gas Dynamics",
      "Orbital Spaceflight Mechanics & Rocketry",
      "Rocket Propulsion & Liquid Jet Engines",
      "Avionics & Satellite Flight Guidance",
      "Aerospace CFD Lab Simulations"
    ],
    careerRoles: [
      "Aerospace Systems Engineer",
      "Rocket Propulsion Specialist",
      "Satellite Flight Controller",
      "Defense R&D Scientist"
    ],
    highlight: "Direct pathway for ISRO, DRDO & Commercial Space industries.",
  },
  {
    id: "btech-aero-nutical",
    code: "B.Tech Aeronautical",
    title: "B.Tech Aeronautical",
    fullTitle: "B.Tech Aeronautical Engineering",
    category: "REGULAR UG PROGRAMMES",
    stream: "regular",
    level: "ug",
    duration: "4 Years",
    semesters: "8 Semesters",
    certification: "AICTE Approved B.Tech Aeronautical Degree",
    bgImage: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80",
    tagline: '"AIRCRAFT FUSELAGE STRUCTURES, JET TURBINES AND FLIGHT TESTING."',
    description: "4-year aeronautical degree focusing on commercial airliner design, jet engine thermodynamics, wind tunnel testing, and aircraft airworthiness.",
    longAbout: "To build flight systems engineers skilled in CAD aircraft drafting, jet engine performance optimization, and structural flight dynamics.",
    eligibility: [
      "Passed Class 12th with PCM.",
      "Minimum 50% aggregate marks."
    ],
    syllabus: [
      "Flight Aerodynamics & Compressible Flow",
      "Aircraft Fuselage Structural Analysis",
      "Jet Turbine Propulsion Systems",
      "Avionics, Flight Control & Autopilot",
      "Flight Testing & Hangar Internships"
    ],
    careerRoles: [
      "Aeronautical Design Engineer",
      "Aircraft Structural Specialist",
      "Airline Engineering Officer",
      "Flight Test Analyst"
    ],
    highlight: "Top career option in Boeing, Airbus, HAL & Air Force technical cadres.",
  },
  {
    id: "btech-ame-degree",
    code: "B.Tech AME",
    title: "B.Tech AME",
    fullTitle: "B.Tech Aircraft Maintenance Engineering",
    category: "REGULAR UG PROGRAMMES",
    stream: "regular",
    level: "ug",
    duration: "4 Years",
    semesters: "8 Semesters",
    certification: "AICTE Approved B.Tech AME Degree",
    bgImage: "https://images.unsplash.com/photo-1436491865332-7a61a389cc05?auto=format&fit=crop&w=1200&q=80",
    tagline: '"ADVANCED FLEET MAINTENANCE, AVIONICS AND AIRLINE MRO OVERHAULS."',
    description: "Comprehensive 4-year degree combining B.Tech engineering with commercial airline aircraft maintenance, jet engine overhauls, and avionics diagnostics.",
    longAbout: "To produce chief aircraft maintenance engineers capable of certifying commercial airline fleets, managing MRO hangars, and leading aviation maintenance units.",
    eligibility: [
      "Passed Class 12th with PCM.",
      "Minimum 50% aggregate marks."
    ],
    syllabus: [
      "Aircraft Gas Turbine Engine Overhaul",
      "Advanced Avionics & Digital Flight Radar",
      "Airline Maintenance Reliability & Safety",
      "DGCA & International Airworthiness Codes",
      "Airline Hangar Practical Internships"
    ],
    careerRoles: [
      "Chief Aircraft Maintenance Engineer",
      "Airline Fleet Reliability Engineer",
      "MRO Hangar Technical Director",
      "Aviation Safety & Airworthiness Manager"
    ],
    highlight: "Combines B.Tech degree status with high-paying commercial airline maintenance roles.",
  },
  {
    id: "btech-civil",
    code: "B.Tech Civil",
    title: "B.Tech Civil",
    fullTitle: "B.Tech Civil Engineering",
    category: "REGULAR UG PROGRAMMES",
    stream: "regular",
    level: "ug",
    duration: "4 Years",
    semesters: "8 Semesters",
    certification: "AICTE Approved B.Tech Civil Degree",
    bgImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    tagline: '"BRIDGES, HIGHWAYS, STRUCTURAL DESIGN AND SMART CITIES."',
    description: "4-Year civil engineering degree covering structural design, earthquake engineering, geotechnical analysis, highway construction, and smart city infrastructure.",
    longAbout: "To train civil engineers skilled in STAAD Pro structural modeling, Revit 3D, Total Station surveying, and megastructure construction management.",
    eligibility: [
      "Passed Class 12th with PCM.",
      "Minimum 50% aggregate marks."
    ],
    syllabus: [
      "Structural Analysis & Reinforced Concrete",
      "Geotechnical Soil Engineering & Foundations",
      "STAAD Pro & AutoCAD 3D Modeling",
      "Transportation & Highway Engineering",
      "Project Construction Management"
    ],
    careerRoles: [
      "Senior Structural Engineer",
      "Civil Infrastructure Project Manager",
      "Geotechnical Engineer",
      "Govt. PWD / Railways Assistant Engineer"
    ],
    highlight: "Core degree valid for IES, GATE, PSU & Global infrastructure firms.",
  },
  {
    id: "btech-cse",
    code: "B.Tech CSE",
    title: "B.Tech CSE",
    fullTitle: "B.Tech Computer Science & Engineering",
    category: "REGULAR UG PROGRAMMES",
    stream: "regular",
    level: "ug",
    duration: "4 Years",
    semesters: "8 Semesters",
    certification: "AICTE Approved B.Tech CSE Degree",
    bgImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    tagline: '"ADVANCED ALGORITHMIC ARCHITECTURES, CLOUD COMPUTE AND CYBERSECURITY."',
    description: "Premier 4-year engineering program covering computer algorithms, systems architecture, cloud computing, full stack development, and network security.",
    longAbout: "To deliver top-tier engineering education in Computer Science. Students master algorithm design, Linux kernels, cloud virtualization, and full-stack software development with industrial internship modules.",
    eligibility: [
      "Passed Class 12th with PCM.",
      "JEE Main rank."
    ],
    syllabus: [
      "Object-Oriented Software Design & Algorithms",
      "Operating System Architecture & Linux Kernels",
      "Database Administration & Distributed Systems",
      "Computer Networks, Cryptography & Cloud Compute",
      "Full Stack Web Development & Internships"
    ],
    careerRoles: [
      "Software Engineer",
      "Cloud Solutions Architect",
      "DevOps Automation Engineer",
      "Cybersecurity Specialist"
    ],
    highlight: "Top tier placements in multinational software engineering firms.",
  },
  {
    id: "btech-aiml",
    code: "B.Tech AI/ML",
    title: "B.Tech CSE (AI & ML)",
    fullTitle: "B.Tech Computer Science & Engineering (AI & ML)",
    category: "REGULAR UG PROGRAMMES",
    stream: "regular",
    level: "ug",
    duration: "4 Years",
    semesters: "8 Semesters",
    certification: "AICTE Approved Specialized B.Tech Degree",
    bgImage: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=1200&q=80",
    tagline: '"DEEP LEARNING, NEURAL NETWORKS AND MLOPS AUTOMATION."',
    description: "Cutting-edge computer engineering degree focusing on neural networks, deep learning models, natural language processing, computer vision, and AI systems.",
    longAbout: "To train machine learning engineers skilled in PyTorch, TensorFlow, large language model fine-tuning, computer vision, and autonomous system architecture.",
    eligibility: [
      "Passed Class 12th with PCM.",
      "Minimum 50% aggregate marks."
    ],
    syllabus: [
      "Python Data Science & Computing",
      "Supervised & Unsupervised Machine Learning",
      "Deep Learning with TensorFlow & Keras",
      "Natural Language Processing (NLP) & Computer Vision",
      "AI Ethics, MLOps & Autonomous Systems"
    ],
    careerRoles: [
      "Machine Learning Engineer",
      "AI Research Developer",
      "Data Scientist Associate",
      "Computer Vision Specialist"
    ],
    highlight: "Prepares engineers for high-paying artificial intelligence roles.",
  },
  {
    id: "btech-iot-cyber",
    code: "B.Tech IoT-Cyber",
    title: "B.Tech CSE (IoT & Cyber)",
    fullTitle: "B.Tech CSE (IoT & Cyber Security with Blockchain)",
    category: "REGULAR UG PROGRAMMES",
    stream: "regular",
    level: "ug",
    duration: "4 Years",
    semesters: "8 Semesters",
    certification: "AICTE Approved Specialized B.Tech Degree",
    bgImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    tagline: '"ETHICAL HACKING, BLOCKCHAIN SMART CONTRACTS AND IOT HARDWARE."',
    description: "Specialized B.Tech track focusing on network penetration testing, ethical hacking, IoT embedded sensors, cryptography, and Ethereum smart contract blockchain development.",
    longAbout: "To build cybersecurity defense experts and blockchain architects capable of protecting cloud infrastructure, auditing smart contracts, and securing IoT hardware networks.",
    eligibility: [
      "Passed Class 12th with PCM.",
      "Minimum 50% aggregate marks."
    ],
    syllabus: [
      "Ethical Hacking & Network Penetration Testing",
      "IoT Embedded Sensors & Hardware Security",
      "Blockchain Architecture & Smart Contracts (Solidity)",
      "Cryptography & Digital Forensic Audits",
      "Cyber Threat Intelligence & Capstone Project"
    ],
    careerRoles: [
      "Cybersecurity Analyst",
      "Ethical Hacker / Penetration Tester",
      "Blockchain Smart Contract Developer",
      "IoT Security Engineer"
    ],
    highlight: "High demand in banking, fintech, cybersecurity & web3 sectors.",
  },
  {
    id: "btech-ee",
    code: "B.Tech Electrical",
    title: "B.Tech Electrical",
    fullTitle: "B.Tech Electrical Engineering",
    category: "REGULAR UG PROGRAMMES",
    stream: "regular",
    level: "ug",
    duration: "4 Years",
    semesters: "8 Semesters",
    certification: "AICTE Approved B.Tech EE Degree",
    bgImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    tagline: '"SMART GRIDS, RENEWABLE ENERGY AND AUTOMATION CONTROLS."',
    description: "4-Year electrical degree covering smart power grids, high voltage transformers, renewable solar/wind energy systems, and PLC industrial automation.",
    longAbout: "To build power electrical engineers skilled in grid distribution, renewable power plant engineering, industrial drive controls, and power electronics.",
    eligibility: [
      "Passed Class 12th with PCM.",
      "Minimum 50% aggregate marks."
    ],
    syllabus: [
      "High Voltage Power Systems & Protection",
      "Electrical Machine Design & Transformers",
      "Power Electronics & Renewable Energy Systems",
      "PLC, SCADA & Industrial Drives",
      "Smart Grid Automation Labs"
    ],
    careerRoles: [
      "Power Systems Engineer",
      "Renewable Solar Energy Consultant",
      "Substation Automation Engineer",
      "Govt. Power Grid Assistant Engineer"
    ],
    highlight: "Valid for Power Grid Corp, NTPC, BHEL & Renewable Energy MNCs.",
  },
  {
    id: "btech-mech",
    code: "B.Tech Mechanical",
    title: "B.Tech Mechanical",
    fullTitle: "B.Tech Mechanical Engineering",
    category: "REGULAR UG PROGRAMMES",
    stream: "regular",
    level: "ug",
    duration: "4 Years",
    semesters: "8 Semesters",
    certification: "AICTE Approved B.Tech Mechanical Degree",
    bgImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    tagline: '"ROBOTICS, THERMAL TURBINES, CAD 3D AND ADVANCED MANUFACTURING."',
    description: "4-year core mechanical engineering degree focusing on industrial robotics, finite element analysis (FEA), SolidWorks 3D design, thermal power plants, and CNC automation.",
    longAbout: "To prepare mechanical engineers skilled in 3D CAD modeling, ANSYS simulations, robotics automation, and thermal power plant engineering.",
    eligibility: [
      "Passed Class 12th with PCM.",
      "Minimum 50% aggregate marks."
    ],
    syllabus: [
      "Strength of Materials & Machine Component Design",
      "Thermodynamics & Heat Transfer Analysis",
      "CAD/CAM SolidWorks & ANSYS Finite Element",
      "Industrial Robotics & Mechatronics",
      "CNC Manufacturing & Production Management"
    ],
    careerRoles: [
      "Mechanical Design Engineer",
      "Robotics Automation Specialist",
      "Production Plant Manager",
      "PSU Public Sector Assistant Engineer"
    ],
    highlight: "Core degree valid for Indian Railways, ISRO, DRDO & Automotive giants.",
  },
  {
    id: "btech-ece",
    code: "B.Tech ECE",
    title: "B.Tech ECE",
    fullTitle: "B.Tech Electronics & Communication Engineering",
    category: "REGULAR UG PROGRAMMES",
    stream: "regular",
    level: "ug",
    duration: "4 Years",
    semesters: "8 Semesters",
    certification: "AICTE Approved B.Tech ECE Degree",
    bgImage: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=1200&q=80",
    tagline: '"VLSI CHIP DESIGN, 5G TELECOM AND EMBEDDED SYSTEMS."',
    description: "4-year ECE degree covering semiconductor VLSI chip design, 5G cellular communication networks, embedded IoT systems, and signal processing.",
    longAbout: "To train electronics engineers in VLSI microchip architecture, 5G wireless networks, embedded Python microcontrollers, and optical communications.",
    eligibility: [
      "Passed Class 12th with PCM.",
      "Minimum 50% aggregate marks."
    ],
    syllabus: [
      "VLSI Circuit Architecture & Semiconductor Design",
      "5G & Satellite Wireless Communication",
      "Embedded Systems & Microcontrollers (ARM/STM32)",
      "Digital Signal & Image Processing",
      "Telecom Network Architecture Labs"
    ],
    careerRoles: [
      "VLSI Chip Design Engineer",
      "Embedded Firmware Engineer",
      "5G Telecom Network Specialist",
      "RF Hardware Systems Engineer"
    ],
    highlight: "High demand in semiconductor chip design & 5G telecom MNCs.",
  },
  {
    id: "btech-integrated-ame-aero",
    code: "AME + B.Tech Aero",
    title: "AME + Aerospace B.Tech",
    fullTitle: "AME(DGCA) + Aerospace Engineering Integrated",
    category: "INTEGRATED B.TECH DEGREE",
    stream: "regular",
    level: "ug",
    duration: "4 Years Dual",
    semesters: "8 Semesters",
    certification: "DGCA AME License Modules + AICTE B.Tech Degree",
    bgImage: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1200&q=80",
    tagline: '"DUAL QUALIFICATION: DGCA AME LICENSE + FULL B.TECH AEROSPACE DEGREE."',
    description: "Unique integrated 4-year dual qualification combining DGCA Aircraft Maintenance Engineer license modules with a full B.Tech Aerospace Engineering degree.",
    longAbout: "To offer students dual advantage: official DGCA commercial aircraft maintenance licensing along with B.Tech Aerospace engineering degree status.",
    eligibility: [
      "Passed Class 12th with PCM.",
      "Minimum 50% aggregate marks."
    ],
    syllabus: [
      "DGCA Aircraft Maintenance Modules 1-17",
      "B.Tech Aerospace Supersonic Aerodynamics",
      "Jet Propulsion Engine Overhaul Labs",
      "Avionics & Radar Flight Guidance",
      "Commercial Airline Hangar Internship"
    ],
    careerRoles: [
      "Licensed Aircraft Maintenance Engineer",
      "Aerospace Systems Design Engineer",
      "Commercial Airline Fleet Director",
      "Aviation MRO Technical Manager"
    ],
    highlight: "Dual Qualification: DGCA AME Licensing + Full B.Tech Degree.",
  },
  {
    id: "btech-cpl-aero",
    code: "CPL + B.Tech Aero",
    title: "CPL + Aeronautical B.Tech",
    fullTitle: "CPL(Ground Classes) + Aeronautical Engineering",
    category: "INTEGRATED B.TECH DEGREE",
    stream: "regular",
    level: "ug",
    duration: "4 Years Dual",
    semesters: "8 Semesters",
    certification: "Commercial Pilot License (CPL) Ground + B.Tech Degree",
    bgImage: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80",
    tagline: '"PILOT FLIGHT GROUND SUBJECTS + B.TECH AERONAUTICAL DEGREE."',
    description: "Dual integrated program combining DGCA Commercial Pilot License (CPL) ground navigation/meteorology training with B.Tech Aeronautical Engineering.",
    longAbout: "To prepare aspiring commercial airline pilots with dual technical engineering degrees, covering flight navigation, air regulations, and aeronautical design.",
    eligibility: [
      "Passed Class 12th with PCM.",
      "Medical fitness standard clearance."
    ],
    syllabus: [
      "CPL Air Navigation & Air Meteorology",
      "DGCA Air Regulations & Technical General",
      "B.Tech Aeronautical Structures & Engines",
      "Flight Simulator Pilot Workshops",
      "Flight Safety & Cockpit Operations"
    ],
    careerRoles: [
      "Commercial Airline Pilot Aspirant",
      "Aeronautical Technical Flight Officer",
      "Flight Dispatch Operations Manager",
      "Aviation Safety Auditor"
    ],
    highlight: "Prepares students for Commercial Pilot licensing and aeronautical careers.",
  },
  {
    id: "cpl-license",
    code: "CPL Pilot",
    title: "CPL Ground Classes",
    fullTitle: "Commercial Pilot License (CPL Ground Classes)",
    category: "LICENSE COURSE",
    stream: "regular",
    level: "ug",
    duration: "1 Year",
    semesters: "Ground Modules",
    certification: "DGCA Commercial Pilot License (CPL) Examination Prep",
    bgImage: "https://images.unsplash.com/photo-1436491865332-7a61a389cc05?auto=format&fit=crop&w=1200&q=80",
    tagline: '"AIR NAVIGATION, METEOROLOGY AND COCKPIT FLIGHT SIMULATION."',
    description: "Dedicated DGCA Commercial Pilot License (CPL) ground school training covering Air Navigation, Aviation Meteorology, Air Regulations, and Radio Telephony.",
    longAbout: "To clear all DGCA CPL theory examinations and prepare students for 200 hours of flying training at authorized flying clubs for commercial pilot licensure.",
    eligibility: [
      "Passed Class 12th with Physics & Mathematics.",
      "Class II Medical Fitness certificate."
    ],
    syllabus: [
      "Air Navigation & Flight Instruments",
      "Aviation Meteorology & Weather Radar",
      "Air Regulations & ATC Procedures",
      "Technical General Aircraft Systems",
      "Radio Telephony (RTR) Communication"
    ],
    careerRoles: [
      "Commercial Airline First Officer Pilot",
      "Charter Aircraft Captain",
      "Flight Dispatcher Manager",
      "Aviation Ground Instructor"
    ],
    highlight: "Clear all DGCA CPL exams to become a certified Airline Pilot.",
  },
  {
    id: "drone-pilot",
    code: "Drone Pilot",
    title: "Drone Pilot License",
    fullTitle: "Drone Pilot License Training Course",
    category: "LICENSE COURSE",
    stream: "regular",
    level: "ug",
    duration: "1 Month",
    semesters: "Practical Modules",
    certification: "DGCA Approved Remote Pilot Certificate (RPC)",
    bgImage: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80",
    tagline: '"COMMERCIAL DRONE FLYING, GIS MAPPING AND AERIAL SURVEYING."',
    description: "DGCA authorized Remote Pilot Certificate (RPC) training for commercial micro & small category drone operations, agricultural spraying, and GIS mapping.",
    longAbout: "To train certified commercial drone pilots in simulator flying, GIS spatial mapping, aerial videography, and DGCA drone airspace regulations.",
    eligibility: [
      "Passed Class 10th examination.",
      "Age between 18 and 65 years."
    ],
    syllabus: [
      "DGCA Digital Sky Drone Regulations",
      "Flight Simulator Practical Flying Labs",
      "Commercial Drone Maintenance & Battery Safety",
      "GIS Aerial Mapping & Photogrammetry",
      "Real-world Outdoor Flying Field Tests"
    ],
    careerRoles: [
      "Certified Commercial Drone Pilot",
      "GIS Aerial Mapping Specialist",
      "Agricultural Drone Surveyor",
      "Aerial Cinematography Specialist"
    ],
    highlight: "DGCA Certified Remote Pilot Certificate (RPC) for high demand drone roles.",
  },
  {
    id: "bba-aviation",
    code: "BBA Aviation",
    title: "BBA Aviation",
    fullTitle: "BBA in Aviation Management",
    category: "REGULAR UG PROGRAMMES",
    stream: "regular",
    level: "ug",
    duration: "3 Years",
    semesters: "6 Semesters",
    certification: "UGC Recognized University BBA Aviation Degree",
    bgImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    tagline: '"AIRPORT TERMINAL OPERATIONS, AIRLINE LOGISTICS AND CARGO."',
    description: "Professional management degree specializing in airport terminal management, airline passenger handling, aviation security, and flight logistics.",
    longAbout: "To build airport managers skilled in airline ground operations, ticketing, airport security protocols, baggage handling, and air cargo administration.",
    eligibility: [
      "Passed Class 12th from any stream.",
      "Minimum 50% aggregate marks."
    ],
    syllabus: [
      "Airport Terminal Operations & Safety",
      "Airline Ticketing & Cargo Logistics",
      "Aviation Customer Service & Relations",
      "Air Traffic Management Principles",
      "Airport Ground Handling Internship"
    ],
    careerRoles: [
      "Airport Duty Manager",
      "Airline Ground Operations Officer",
      "Air Cargo Logistics Supervisor",
      "Airport Customer Service Executive"
    ],
    highlight: "Direct placements in international airports & commercial airlines.",
  },
  {
    id: "bca-regular",
    code: "BCA",
    title: "BCA",
    fullTitle: "Bachelor of Computer Application",
    category: "REGULAR UG PROGRAMMES",
    stream: "regular",
    level: "ug",
    duration: "3 Years",
    semesters: "6 Semesters",
    certification: "UGC Recognized University BCA Degree",
    bgImage: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80",
    tagline: '"SOFTWARE ENGINEERING, FULL STACK WEB DEVS AND ENTERPRISE SYSTEMS."',
    description: "Comprehensive 3-year undergraduate computer degree covering software development, web applications, database management, and object-oriented programming.",
    longAbout: "To provide a comprehensive academic pathway in Bachelor of Computer Application (BCA). The curriculum combines computer science theory with practical coding labs, developing software skills for top MNC placements.",
    eligibility: [
      "Passed Class 12th from a recognized board in any stream.",
      "Minimum 50% aggregate marks."
    ],
    syllabus: [
      "Programming in C, C++, Java & Python",
      "Web Development (HTML5, CSS3, JavaScript, React)",
      "Database Systems (MySQL, Oracle, RDBMS)",
      "Data Structures & Algorithm Optimizations",
      "Software Engineering & Capstone Project"
    ],
    careerRoles: [
      "Full Stack Software Developer",
      "Web Application Engineer",
      "Database Administrator",
      "System Analyst"
    ],
    highlight: "Premier degree for IT corporate placements & MCA/M.Sc pathways.",
  },
  {
    id: "llb-hons",
    code: "LLB (Hons)",
    title: "LLB (Hons.)",
    fullTitle: "Bachelor of Law",
    category: "REGULAR UG PROGRAMMES",
    stream: "regular",
    level: "ug",
    duration: "3 Years",
    semesters: "6 Semesters",
    certification: "Bar Council of India (BCI) Approved LLB Degree",
    bgImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80",
    tagline: '"CONSTITUTIONAL LAW, CRIMINAL JURISPRUDENCE AND MOOT COURTS."',
    description: "3-year professional law degree approved by Bar Council of India (BCI) covering constitutional law, criminal jurisprudence, corporate law, and moot courts.",
    longAbout: "To prepare legal advocates capable of practicing in District Courts, High Courts, Supreme Court, corporate law firms, and judicial service examinations.",
    eligibility: [
      "Graduation Bachelor Degree in any discipline.",
      "Minimum 45% aggregate marks."
    ],
    syllabus: [
      "Constitutional Law & Jurisprudence",
      "Indian Penal Code (IPC) & Criminal Procedure",
      "Corporate & Intellectual Property Law (IPL)",
      "Civil Procedure Code & Law of Evidence",
      "Moot Court & Legal Drafting Practicals"
    ],
    careerRoles: [
      "Practicing Court Advocate",
      "Corporate Legal Advisor",
      "Judicial Services Magistrate Aspirant",
      "Legal Consultant Firm Associate"
    ],
    highlight: "Valid for Bar Council Advocate Registration & Judicial Services.",
  },
  {
    id: "ba-llb-hons",
    code: "BA LLB (Hons)",
    title: "BA LLB (Hons.)",
    fullTitle: "5 Years Integrated Bachelor of Law",
    category: "REGULAR UG PROGRAMMES",
    stream: "regular",
    level: "ug",
    duration: "5 Years",
    semesters: "10 Semesters",
    certification: "Bar Council of India (BCI) Approved Dual Degree",
    bgImage: "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?auto=format&fit=crop&w=1200&q=80",
    tagline: '"INTEGRATED HUMANITIES & PROFESSIONAL LAW DEGREE."',
    description: "5-year integrated undergraduate law degree combining Bachelor of Arts (Political Science, Sociology) with BCI approved professional law modules.",
    longAbout: "To build legal professionals with strong background in political science, corporate law, cyber law, international treaties, and moot court litigation.",
    eligibility: [
      "Passed Class 12th in any stream.",
      "Minimum 45% aggregate marks."
    ],
    syllabus: [
      "Political Science, Sociology & Legal History",
      "Constitutional & Administrative Law",
      "Corporate, Banking & Cyber Laws",
      "Court Litigation Procedure & Evidence",
      "Moot Court & Law Firm Internship"
    ],
    careerRoles: [
      "Corporate Law Attorney",
      "High Court / Supreme Court Advocate",
      "Legal Officer in MNCs",
      "Civil Judicial Magistrate"
    ],
    highlight: "Saves 1 year with direct 5-year integrated law qualification.",
  },
  {
    id: "bpharm-regular",
    code: "B.Pharm",
    title: "B.Pharm",
    fullTitle: "Bachelor of Pharmacy",
    category: "REGULAR UG PROGRAMMES",
    stream: "regular",
    level: "ug",
    duration: "4 Years",
    semesters: "8 Semesters",
    certification: "Pharmacy Council of India (PCI) Approved Degree",
    bgImage: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80",
    tagline: '"PHARMACEUTICAL R&D, DRUG FORMULATION AND REGULATORY AFFAIRS."',
    description: "4-year medical degree in drug formulation, pharmacology, clinical trials, pharmaceutical chemistry, and drug regulatory affairs.",
    longAbout: "To produce pharmaceutical research scientists, drug inspectors, quality control chemists, and retail pharma business owners.",
    eligibility: [
      "Passed Class 12th with Physics, Chemistry & Biology/Math (PCB/PCM).",
      "Minimum 50% aggregate marks."
    ],
    syllabus: [
      "Pharmaceutical Organic & Medicinal Chemistry",
      "Pharmacology & Drug Action Analytics",
      "Pharmaceutics & Industrial Formulations",
      "Quality Assurance & Drug Regulations",
      "Pharma Industrial Project & Hospital Training"
    ],
    careerRoles: [
      "Pharmaceutical Research Scientist",
      "Government Drug Inspector",
      "Pharma Quality Assurance Chemist",
      "Licensed Wholesale / Retail Pharma Owner"
    ],
    highlight: "Eligible for Government Drug Inspector exams & M.Pharm.",
  },
  {
    id: "bsc-nursing",
    code: "B.Sc Nursing",
    title: "B.Sc. Nursing",
    fullTitle: "Bachelor of Science in Nursing",
    category: "REGULAR UG PROGRAMMES",
    stream: "regular",
    level: "ug",
    duration: "4 Years",
    semesters: "8 Semesters",
    certification: "Indian Nursing Council (INC) Approved Degree",
    bgImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    tagline: '"CLINICAL NURSING SCIENCE, PATIENT HEALTHCARE AND ICU CARE."',
    description: "4-year bachelor degree in nursing science training healthcare professionals in ICU care, surgical nursing, maternal health, and hospital administration.",
    longAbout: "To prepare graduate registered nurses eligible for AIIMS NORCET exams, international hospital recruitment, and senior nursing officer positions.",
    eligibility: [
      "Passed Class 12th with Physics, Chemistry & Biology (PCB).",
      "Minimum 45% aggregate marks."
    ],
    syllabus: [
      "Anatomy, Physiology & Clinical Biochemistry",
      "Medical-Surgical Nursing & Emergency Care",
      "Obstetrics & Gynecological Nursing",
      "Mental Health Nursing & Community Care",
      "Hospital Internship Rotation"
    ],
    careerRoles: [
      "Nursing Officer (AIIMS / Govt Hospital)",
      "International Registered Nurse (UK/US/Gulf)",
      "ICU Clinical Nurse Specialist",
      "Nursing Supervisor"
    ],
    highlight: "Qualifies for AIIMS NORCET exams & High-paying overseas jobs.",
  },

  // =========================================================================
  // 3. REGULAR POSTGRADUATE (PG) DEGREE COURSES
  // =========================================================================
  {
    id: "mtech-aero",
    code: "M.Tech Aero",
    title: "M.Tech Aerospace",
    fullTitle: "M.Tech Aerospace Engineering",
    category: "REGULAR PG PROGRAMMES",
    stream: "regular",
    level: "pg",
    duration: "2 Years",
    semesters: "4 Semesters",
    certification: "AICTE Approved Master of Technology Degree",
    bgImage: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1200&q=80",
    tagline: '"COMPRESSIBLE AERODYNAMICS, ROCKET PROPULSION AND SPACECRAFT DESIGN."',
    description: "2-year research post-graduate degree in hypersonic aerodynamics, space propulsion, satellite orbital guidance, and composite aerospace structures.",
    longAbout: "To prepare aerospace scientists for research positions in ISRO, DRDO, Boeing R&D labs, and Assistant Professorships in engineering universities.",
    eligibility: [
      "B.Tech / B.E in Aerospace, Aeronautical, Mechanical or CSE.",
      "GATE score preferred."
    ],
    syllabus: [
      "Hypersonic Aerodynamics & Shock Waves",
      "Advanced Spacecraft Propulsion Systems",
      "CFD Computational Fluid Dynamics Simulations",
      "Aerospace Research Thesis & Patent Filing"
    ],
    careerRoles: [
      "Senior Aerospace Research Scientist",
      "Aerospace Assistant Professor",
      "CFD Simulation Specialist Lead",
      "Defense Propulsion Researcher"
    ],
    highlight: "Qualifies for ISRO R&D scientist posts & Engineering Professorships.",
  },
  {
    id: "mtech-civil",
    code: "M.Tech Civil",
    title: "M.Tech Civil",
    fullTitle: "M.Tech Civil Engineering",
    category: "REGULAR PG PROGRAMMES",
    stream: "regular",
    level: "pg",
    duration: "2 Years",
    semesters: "4 Semesters",
    certification: "AICTE Approved Master of Technology Degree",
    bgImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    tagline: '"ADVANCED STRUCTURAL DYNAMICS, EARTHQUAKE RESISTANT DESIGN."',
    description: "2-year post-graduate master program in earthquake-resistant structural dynamics, tall building design, advanced foundation engineering, and smart transportation.",
    longAbout: "To train chief structural engineers and infrastructure consultants capable of auditing megastructures, high-rise towers, and metro railway bridges.",
    eligibility: [
      "B.Tech / B.E in Civil Engineering.",
      "Minimum 50% aggregate marks."
    ],
    syllabus: [
      "Advanced Structural Dynamics & Earthquake Engg",
      "Finite Element Analysis for Tall Buildings",
      "Advanced Geotechnical & Bridge Foundations",
      "Master Structural Research Thesis"
    ],
    careerRoles: [
      "Chief Structural Design Engineer",
      "Civil Infrastructure Consultant",
      "Assistant Professor in Civil Engg",
      "Govt PWD Chief Engineer Candidate"
    ],
    highlight: "Top qualification for Chief Structural Consultant roles.",
  },
  {
    id: "mtech-cse",
    code: "M.Tech CSE",
    title: "M.Tech CSE",
    fullTitle: "M.Tech Computer Science & Engineering",
    category: "REGULAR PG PROGRAMMES",
    stream: "regular",
    level: "pg",
    duration: "2 Years",
    semesters: "4 Semesters",
    certification: "AICTE Approved Master of Technology Degree",
    bgImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    tagline: '"HIGH PERFORMANCE COMPUTING, R&D AND DISTRIBUTED ALGORITHMS."',
    description: "2-year research-driven post-graduate engineering program for advanced software architecture, structural modeling, or academic research roles.",
    longAbout: "To prepare engineering researchers capable of publishing papers, building high-throughput distributed algorithms, and teaching in engineering colleges.",
    eligibility: [
      "B.Tech / B.E in CSE/IT or MCA degree.",
      "Valid GATE score preferred."
    ],
    syllabus: [
      "Advanced Algorithm Design & Complexity",
      "High Performance Parallel Computing",
      "Distributed Cloud Computing Systems",
      "Research Methodology & Patent Analysis",
      "Master Research Thesis & Publication"
    ],
    careerRoles: [
      "Senior R&D Software Engineer",
      "Assistant Professor in Engineering",
      "Systems Research Scientist",
      "Distributed Systems Architect"
    ],
    highlight: "Qualifies graduates for senior R&D engineer roles & Assistant Professorships.",
  },
  {
    id: "mtech-ece",
    code: "M.Tech ECE",
    title: "M.Tech ECE",
    fullTitle: "M.Tech Electronics & Communication Engineering",
    category: "REGULAR PG PROGRAMMES",
    stream: "regular",
    level: "pg",
    duration: "2 Years",
    semesters: "4 Semesters",
    certification: "AICTE Approved Master of Technology Degree",
    bgImage: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=1200&q=80",
    tagline: '"NANO-ELECTRONICS, VLSI CHIP ARCHITECTURE AND SIGNAL PROCESSING."',
    description: "Post-graduate master program in nano-electronics, microchip VLSI fabrication, 6G communication research, and embedded system design.",
    longAbout: "To produce senior semiconductor architects and wireless research engineers for global microchip companies (Intel, Qualcomm, TSMC).",
    eligibility: [
      "B.Tech / B.E in ECE, Electrical, or Instrumentation.",
      "Minimum 50% aggregate marks."
    ],
    syllabus: [
      "Advanced CMOS VLSI System Design",
      "Wireless Sensor Networks & 6G Research",
      "Embedded System Real-Time Architecture",
      "Master Research Thesis & Microchip Design"
    ],
    careerRoles: [
      "Senior VLSI Design Architect",
      "Semiconductor R&D Engineer",
      "Assistant Professor in ECE",
      "Wireless Communication Researcher"
    ],
    highlight: "High demand in semiconductor chip design MNCs.",
  },
  {
    id: "mtech-mech",
    code: "M.Tech Mech",
    title: "M.Tech Mechanical",
    fullTitle: "M.Tech Mechanical Engineering",
    category: "REGULAR PG PROGRAMMES",
    stream: "regular",
    level: "pg",
    duration: "2 Years",
    semesters: "4 Semesters",
    certification: "AICTE Approved Master of Technology Degree",
    bgImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    tagline: '"COMPUTATIONAL FLUID DYNAMICS, ADVANCED THERMAL & CAD MANUFACTURING."',
    description: "2-year post-graduate master degree in computational fluid dynamics (CFD), advanced thermal power engineering, FEA stress analysis, and industrial robotics.",
    longAbout: "To prepare chief mechanical designers, thermal plant consultants, and engineering college faculty members.",
    eligibility: [
      "B.Tech / B.E in Mechanical or Automobile Engg.",
      "Minimum 50% aggregate marks."
    ],
    syllabus: [
      "Advanced Computational Fluid Dynamics (CFD)",
      "Finite Element Stress Analysis (FEA)",
      "Advanced Thermodynamics & Power Plants",
      "Master Mechanical Research Thesis"
    ],
    careerRoles: [
      "Chief Mechanical Design Consultant",
      "Thermal Power Plant R&D Specialist",
      "Assistant Professor in Mechanical Engg",
      "Automotive FEA Simulation Lead"
    ],
    highlight: "Top qualification for Thermal & Mechanical R&D positions.",
  },
  {
    id: "mba-aviation",
    code: "MBA Aviation",
    title: "MBA Aviation",
    fullTitle: "MBA in Aviation Management",
    category: "REGULAR PG PROGRAMMES",
    stream: "regular",
    level: "pg",
    duration: "2 Years",
    semesters: "4 Semesters",
    certification: "UGC / AICTE Approved MBA Aviation Degree",
    bgImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    tagline: '"AIRLINE FLEET MANAGEMENT, INTERNATIONAL AIRPORT GOVERNANCE."',
    description: "Premier 2-year executive post-graduate degree fostering airline fleet planning, airport revenue governance, air cargo supply chains, and aviation safety.",
    longAbout: "To prepare senior executives for commercial airlines (IndiGo, Air India, Emirates) and airport management companies (GMR, Adani Airports).",
    eligibility: [
      "Bachelor Degree in any stream.",
      "Minimum 50% aggregate marks."
    ],
    syllabus: [
      "Airline Strategy & Fleet Management",
      "Airport Infrastructure & Revenue Models",
      "Aviation Safety & Air Law Regulations",
      "Global Air Cargo & Supply Chain Logistics",
      "Executive Master Internship & Thesis"
    ],
    careerRoles: [
      "Airline Operations Director",
      "Airport Terminal General Manager",
      "Air Cargo Fleet Manager",
      "Aviation Business Analyst"
    ],
    highlight: "High salary executive packages in commercial airlines & international airports.",
  },
  {
    id: "mba-finance",
    code: "MBA Finance",
    title: "MBA Finance",
    fullTitle: "MBA in Financial Management",
    category: "REGULAR PG PROGRAMMES",
    stream: "regular",
    level: "pg",
    duration: "2 Years",
    semesters: "4 Semesters",
    certification: "UGC / AICTE Approved MBA Financial Degree",
    bgImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    tagline: '"INVESTMENT BANKING, PORTFOLIO ANALYTICS AND CORPORATE FINANCE."',
    description: "Executive master degree specializing in investment banking, corporate financial risk management, stock market portfolio analytics, and mergers & acquisitions.",
    longAbout: "To build chief financial officers, investment analysts, and corporate treasury managers for global banks and financial MNCs.",
    eligibility: [
      "Bachelor Graduation Degree in any field.",
      "Minimum 50% aggregate marks."
    ],
    syllabus: [
      "Corporate Finance & Capital Structuring",
      "Security Analysis & Investment Portfolios",
      "Financial Derivatives & Risk Management",
      "Mergers, Acquisitions & Valuation",
      "Financial Master Dissertation Project"
    ],
    careerRoles: [
      "Investment Banker",
      "Corporate Financial Analyst",
      "Portfolio Fund Manager",
      "Risk Management Consultant"
    ],
    highlight: "High placement packages in investment banks & corporate treasury desks.",
  },
  {
    id: "mba-hr",
    code: "MBA HR",
    title: "MBA HR",
    fullTitle: "MBA in Human Resource Management",
    category: "REGULAR PG PROGRAMMES",
    stream: "regular",
    level: "pg",
    duration: "2 Years",
    semesters: "4 Semesters",
    certification: "UGC / AICTE Approved MBA HR Degree",
    bgImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
    tagline: '"TALENT ACQUISITION, LABOR LAWS AND ORGANIZATIONAL CHANGE."',
    description: "Post-graduate master degree focusing on strategic talent acquisition, corporate labor laws, employee engagement, and organizational development.",
    longAbout: "To prepare HR Directors capable of managing corporate talent acquisition, industrial labor relations, compensation structures, and leadership training.",
    eligibility: [
      "Bachelor Degree in any discipline.",
      "Minimum 50% aggregate marks."
    ],
    syllabus: [
      "Strategic Human Resource Management",
      "Industrial Relations & Labor Law Codes",
      "Talent Acquisition & Performance Appraisal",
      "Compensation & Benefits Structuring",
      "HR Master Thesis & Corporate Internship"
    ],
    careerRoles: [
      "Human Resource Director",
      "Talent Acquisition Specialist Lead",
      "Industrial Relations Manager",
      "Corporate HR Business Partner (HRBP)"
    ],
    highlight: "Essential qualification for corporate HR leadership & talent management.",
  },
  {
    id: "mba-marketing",
    code: "MBA Marketing",
    title: "MBA Marketing",
    fullTitle: "MBA in Marketing Management",
    category: "REGULAR PG PROGRAMMES",
    stream: "regular",
    level: "pg",
    duration: "2 Years",
    semesters: "4 Semesters",
    certification: "UGC / AICTE Approved MBA Marketing Degree",
    bgImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    tagline: '"BRAND STRATEGY, DIGITAL GROWTH MARKETING AND CONSUMER BEHAVIOR."',
    description: "Executive master program covering corporate brand positioning, digital growth funnels, market research analytics, product management, and sales strategy.",
    longAbout: "To build Chief Marketing Officers (CMOs) and Brand Directors skilled in digital performance marketing, consumer insights, and national sales management.",
    eligibility: [
      "Bachelor Graduation Degree in any stream.",
      "Minimum 50% aggregate marks."
    ],
    syllabus: [
      "Strategic Brand Management & Positioning",
      "Consumer Behavior & Market Research Analytics",
      "Digital Growth Marketing & E-Commerce",
      "Sales & Distribution Network Strategy",
      "Marketing Master Internship & Thesis"
    ],
    careerRoles: [
      "Brand Marketing Manager",
      "Chief Marketing Officer (CMO) Candidate",
      "Product Growth Manager",
      "Market Research Director"
    ],
    highlight: "High placement demand across FMCG, IT, E-Commerce & Retail giants.",
  },
  {
    id: "mba-operations",
    code: "MBA Operations",
    title: "MBA Operations",
    fullTitle: "MBA in Operations Management",
    category: "REGULAR PG PROGRAMMES",
    stream: "regular",
    level: "pg",
    duration: "2 Years",
    semesters: "4 Semesters",
    certification: "UGC / AICTE Approved MBA Operations Degree",
    bgImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    tagline: '"SUPPLY CHAIN LOGISTICS, LEAN SIX SIGMA AND PLANT MANAGEMENT."',
    description: "Post-graduate master degree specializing in global supply chain logistics, Lean Six Sigma quality management, inventory control, and factory operations.",
    longAbout: "To prepare Chief Operations Officers (COOs) and Supply Chain Directors skilled in inventory optimization, factory automation, and warehouse logistics.",
    eligibility: [
      "Bachelor Graduation Degree in any field.",
      "Minimum 50% aggregate marks."
    ],
    syllabus: [
      "Supply Chain & Global Logistics Management",
      "Lean Six Sigma & Total Quality Management (TQM)",
      "Project Management & Operations Research",
      "Factory Inventory & Warehouse Control",
      "Operations Master Internship Project"
    ],
    careerRoles: [
      "Chief Operations Officer (COO) Candidate",
      "Global Supply Chain Director",
      "Lean Six Sigma Quality Manager",
      "Plant & Warehouse Logistics Manager"
    ],
    highlight: "High demand in Amazon, Flipkart, Logistics MNCs & Manufacturing units.",
  },

  // =========================================================================
  // 4. UGC APPROVED DISTANCE LEARNING PROGRAMMES (UG & PG)
  // =========================================================================
  {
    id: "dist-ba-gen",
    code: "BA",
    title: "Distance BA",
    fullTitle: "BA General (Bachelor of Arts)",
    category: "DISTANCE UG PROGRAMMES",
    stream: "distance",
    level: "ug",
    duration: "3 Years",
    semesters: "6 Semesters",
    certification: "Rabindranath Tagore / Subharti / CVRU University (UGC Approved)",
    bgImage: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80",
    tagline: '"FOSTERING ANALYTICAL THINKING, LEGAL FRAMEWORKS, AND PUBLIC POLICY."',
    description: "A flexible undergraduate degree in humanities offering foundation tracks in History, Political Science, Economics, and Literature.",
    longAbout: "To provide a high-quality academic pathway in Distance BA. The curriculum combines rigorous theory with practical sandbox labs, developing advanced skillsets. Students learn to handle real-world challenges, preparing them for top-tier careers.",
    eligibility: [
      "Passed Class 12th from a recognized board in any stream.",
      "Minimum 50% aggregate marks in qualifying exam."
    ],
    syllabus: [
      "Indian History, Ancient Civilization & Medieval Era",
      "Political Theory & Indian Constitutional Governance",
      "Micro & Macro Economic Foundations",
      "English & Vernacular Language Communications",
      "Environmental Science & Ethics"
    ],
    careerRoles: [
      "General Corporate Executive",
      "Academic Researcher",
      "Competitive Exam Aspirant (UPSC/SSC)",
      "Public Policy Associate"
    ],
    highlight: "100% valid for UPSC, State PCS, SSC, Bank PO & Govt jobs.",
  },
  {
    id: "dist-bca",
    code: "Distance BCA",
    title: "Distance BCA",
    fullTitle: "Distance Bachelor of Computer Applications",
    category: "DISTANCE UG PROGRAMMES",
    stream: "distance",
    level: "ug",
    duration: "3 Years",
    semesters: "6 Semesters",
    certification: "UGC Approved University Distance Degree",
    bgImage: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
    tagline: '"SELF-PACED COMPUTING LOGIC, DATABASE SETUPS AND WEB PROGRAMMING."',
    description: "Self-paced distance computer degree covering programming logic, database setups, web development, and software engineering principles.",
    longAbout: "To deliver flexible computer education supported by online learning resources, practical assignments, and flexible exam schedules.",
    eligibility: [
      "Passed Class 12th from a recognized board.",
      "Basic understanding of computer basics."
    ],
    syllabus: [
      "Programming Logic in C & Java",
      "Database Systems (RDBMS & SQL)",
      "Web Technologies & HTML/CSS",
      "Software Engineering & Networks",
      "Online Project & Exam Assignments"
    ],
    careerRoles: [
      "Junior Web Programmer",
      "Database Entry Administrator",
      "IT Support Associate",
      "Freelance Web Developer"
    ],
    highlight: "Save year & time with flexible exam schedules.",
  },
  {
    id: "dist-bba",
    code: "Distance BBA",
    title: "Distance BBA",
    fullTitle: "Distance Bachelor of Business Administration",
    category: "DISTANCE UG PROGRAMMES",
    stream: "distance",
    level: "ug",
    duration: "3 Years",
    semesters: "6 Semesters",
    certification: "Scope Global / Subharti / CVRU (NAAC A Grade)",
    bgImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    tagline: '"BUSINESS ADMINISTRATION, DIGITAL MARKETING AND FINANCE."',
    description: "Flexible distance management degree training students in enterprise administration, digital marketing, corporate finance, and business operations.",
    longAbout: "To offer flexible business management education for working individuals seeking degree validation in marketing, finance, and enterprise operations.",
    eligibility: [
      "Passed Class 12th in any stream.",
      "Minimum 45% aggregate marks."
    ],
    syllabus: [
      "Business Organization & Management",
      "Financial Accounting & Economics",
      "Marketing Management & E-Commerce",
      "Human Resource Management",
      "Business Strategy Online Modules"
    ],
    careerRoles: [
      "Business Operations Executive",
      "Marketing Team Associate",
      "Client Relations Representative",
      "Retail Operations Supervisor"
    ],
    highlight: "Flexible online mode with NAAC A Grade university certification.",
  },
  {
    id: "dist-bcom",
    code: "B.Com",
    title: "Distance B.Com",
    fullTitle: "Distance Bachelor of Commerce",
    category: "DISTANCE UG PROGRAMMES",
    stream: "distance",
    level: "ug",
    duration: "3 Years",
    semesters: "6 Semesters",
    certification: "UGC Approved University B.Com Degree",
    bgImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    tagline: '"CORPORATE ACCOUNTING, AUDITING AND TAXATION LAWS."',
    description: "Flexible undergraduate commerce program covering corporate accounting, income tax laws, auditing, business economics, and banking.",
    longAbout: "To provide flexible commerce degree education focused on corporate accounting, direct/indirect taxation, and financial auditing.",
    eligibility: [
      "Passed Class 12th in Commerce or Science stream.",
      "Minimum 45% aggregate marks."
    ],
    syllabus: [
      "Financial Accounting & Cost Accounting",
      "Income Tax Law & Goods & Services Tax (GST)",
      "Auditing Practices & Business Law",
      "Business Statistics & Financial Management",
      "Banking & Insurance Operations"
    ],
    careerRoles: [
      "Junior Corporate Accountant",
      "Tax Return Preparer Associate",
      "Audit Assistant",
      "Banking Sales Associate"
    ],
    highlight: "Recognized for CA/CS foundation entries and bank jobs.",
  },
  {
    id: "dist-ma-edu",
    code: "MA-EDU",
    title: "Distance MA Education",
    fullTitle: "Distance MA in Education",
    category: "DISTANCE PG PROGRAMMES",
    stream: "distance",
    level: "pg",
    duration: "2 Years",
    semesters: "4 Semesters",
    certification: "Subharti / RNTU University PG Degree",
    bgImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
    tagline: '"EDUCATIONAL PEDAGOGY, CURRICULUM DESIGN AND SCHOOL ADMIN."',
    description: "Post-graduate degree in educational pedagogy, curriculum designing, school administration, and psychological foundations of learning.",
    longAbout: "To train educators in advanced learning psychology, educational measurement, school administration, and modern curriculum construction.",
    eligibility: [
      "Bachelor Graduation Degree in any field.",
      "Minimum 45% aggregate marks."
    ],
    syllabus: [
      "Philosophical & Sociological Education",
      "Educational Psychology & Learning",
      "Curriculum Construction & Tech",
      "Educational Measurement & Evaluation",
      "Dissertation & Admin Management"
    ],
    careerRoles: [
      "PGT School Educator",
      "Educational Administrator",
      "Curriculum Designer",
      "Education Counselor"
    ],
    highlight: "Qualifies for PGT Teaching exams & Educational Officer roles.",
  },
  {
    id: "dist-ma-eng",
    code: "MA-ENG",
    title: "Distance MA English",
    fullTitle: "Distance MA in English Literature",
    category: "DISTANCE PG PROGRAMMES",
    stream: "distance",
    level: "pg",
    duration: "2 Years",
    semesters: "4 Semesters",
    certification: "Subharti / AISECT / CVRU University",
    bgImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80",
    tagline: '"BRITISH, AMERICAN & INDIAN ENGLISH LITERATURE AND LINGUISTICS."',
    description: "Comprehensive study of British, American, Indian English literature, literary criticism, linguistics, and post-colonial studies.",
    longAbout: "To master English literary history, critical theories, phonetics, and creative copywriting for academia and corporate media.",
    eligibility: [
      "Graduation Degree in any stream.",
      "Minimum 45% aggregate marks."
    ],
    syllabus: [
      "Chaucerian to 18th Century Drama",
      "19th & 20th Century Fiction",
      "Literary Theory & Cultural Studies",
      "Linguistics & Phonetics Principles",
      "Indian & Post-Colonial Writing"
    ],
    careerRoles: [
      "College English Lecturer",
      "Senior Content Strategist",
      "Academic Editor & Publisher",
      "Corporate Communications Lead"
    ],
    highlight: "Ideal for NET/SET exams, Lecturerships & Content Strategy.",
  },
  {
    id: "dist-ma-hindi",
    code: "MA-HINDI",
    title: "Distance MA Hindi",
    fullTitle: "Distance MA in Hindi Literature",
    category: "DISTANCE PG PROGRAMMES",
    stream: "distance",
    level: "pg",
    duration: "2 Years",
    semesters: "4 Semesters",
    certification: "Subharti / RNTU University UGC Approved",
    bgImage: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80",
    tagline: '"हिंदी साहित्य का इतिहास, काव्यशास्त्र एवं राजभाषा अध्ययन।"',
    description: "हिंदी साहित्य का इतिहास, प्राचीन एवं आधुनिक काव्य, कथा साहित्य, नाटक एवं भाषा विज्ञान में स्नातकोत्तर डिग्री।",
    longAbout: "हिंदी भाषा एवं साहित्य में उच्च अध्ययन हेतु स्नातकोत्तर डिग्री। यह पाठ्यक्रम नेट/स्लेट परीक्षा तथा राजभाषा अधिकारी पद हेतु तैयार करता है।",
    eligibility: [
      "स्नातक (Graduation) पास किसी भी संकाय में।",
      "न्यूनतम 45% अंक।"
    ],
    syllabus: [
      "हिंदी साहित्य का इतिहास (आदि, भक्ति, रीति)",
      "आधुनिक हिंदी कविता एवं छायावाद",
      "हिंदी उपन्यास, कहानी एवं नाटक",
      "भाषा विज्ञान एवं हिंदी भाषा का विकास",
      "भारतीय एवं पाश्चात्य काव्यशास्त्र"
    ],
    careerRoles: [
      "हिंदी व्याख्याता (PGT/Lecturer)",
      "राजभाषा अधिकारी (Govt Rajbhasha)",
      "अनुवादक (Official Translator)",
      "मीडिया संवाद लेखक"
    ],
    highlight: "सरकारी शिक्षक पद (PGT/TGT) एवं राजभाषा अधिकारी हेतु मान्य।",
  },
  {
    id: "dist-mcom",
    code: "M.Com",
    title: "Distance M.Com",
    fullTitle: "Distance Master of Commerce",
    category: "DISTANCE PG PROGRAMMES",
    stream: "distance",
    level: "pg",
    duration: "2 Years",
    semesters: "4 Semesters",
    certification: "UGC Approved University M.Com Degree",
    bgImage: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1200&q=80",
    tagline: '"MANAGERIAL ACCOUNTING, CORPORATE TAX PLANNING AND AUDITING."',
    description: "Advanced master degree in accounting theory, corporate tax planning, international finance, and managerial auditing.",
    longAbout: "To prepare senior accounting professionals, tax planning consultants, and commerce lecturers for UGC NET examinations.",
    eligibility: [
      "B.Com or BBA Graduation Degree.",
      "Minimum 45% aggregate marks."
    ],
    syllabus: [
      "Managerial Accounting & Control",
      "Corporate Tax Planning & Admin",
      "International Finance & Global Business",
      "Business Statistics & Computer Commerce",
      "Master Project Work & Audit"
    ],
    careerRoles: [
      "Senior Finance Controller",
      "Corporate Tax Advisor",
      "Commerce Assistant Professor",
      "Internal Audit Manager"
    ],
    highlight: "Qualifies for Assistant Professor NET exam & Chief Accountant roles.",
  },
  {
    id: "dist-msc-it",
    code: "MSC-IT",
    title: "Distance M.Sc IT",
    fullTitle: "Distance M.Sc in Information Technology",
    category: "DISTANCE PG PROGRAMMES",
    stream: "distance",
    level: "pg",
    duration: "2 Years",
    semesters: "4 Semesters",
    certification: "UGC Approved University M.Sc Degree",
    bgImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    tagline: '"CLOUD VIRTUALIZATION, DATA WAREHOUSING AND NETWORK SECURITY."',
    description: "Advanced computing master degree focusing on software engineering, cloud virtualization, network security, and database design.",
    longAbout: "To master data warehousing, information security protocols, web services APIs, and high-performance IT architecture.",
    eligibility: [
      "BCA / B.Sc CS / B.Sc IT graduation.",
      "Minimum 45% aggregate marks."
    ],
    syllabus: [
      "Advanced Data Structures & Analysis",
      "Database Architecture & Warehousing",
      "Software Engineering & Web Services",
      "Information Security & Networks",
      "M.Sc IT Master Thesis Project"
    ],
    careerRoles: [
      "Senior IT Infrastructure Lead",
      "Database Administrator Lead",
      "Information Security Specialist",
      "System Software Engineer"
    ],
    highlight: "Senior IT software engineer & system architect qualification.",
  },
  {
    id: "dist-msw",
    code: "MSW",
    title: "Distance MSW",
    fullTitle: "Distance Master of Social Work",
    category: "DISTANCE PG PROGRAMMES",
    stream: "distance",
    level: "pg",
    duration: "2 Years",
    semesters: "4 Semesters",
    certification: "RNTU / Subharti / CVRU University UGC Approved",
    bgImage: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80",
    tagline: '"COMMUNITY DEVELOPMENT, LABOR WELFARE AND NGO MANAGEMENT."',
    description: "Professional post-graduate degree in social welfare administration, community development, medical social work, and HR welfare.",
    longAbout: "To train social welfare officers, community managers, and HR labor welfare specialists for government welfare departments and international NGOs.",
    eligibility: [
      "Graduation Degree in any discipline.",
      "Minimum 45% aggregate marks."
    ],
    syllabus: [
      "Social Work History & Ethics",
      "Community Organization & Action",
      "Medical & Psychiatric Social Work",
      "Human Resource & Labor Welfare",
      "Social Work Concurrent Fieldwork"
    ],
    careerRoles: [
      "Government Social Welfare Officer",
      "NGO Program Director",
      "Labor Welfare HR Specialist",
      "Community Development Manager"
    ],
    highlight: "Mandatory qualification for Govt. Social Welfare Officers & International NGOs.",
  },
  {
    id: "dist-mba",
    code: "Distance MBA",
    title: "Distance MBA",
    fullTitle: "Distance Master of Business Administration",
    category: "DISTANCE PG PROGRAMMES",
    stream: "distance",
    level: "pg",
    duration: "2 Years",
    semesters: "4 Semesters",
    certification: "Swami Vivekanand Subharti / RNTU (NAAC A Grade)",
    bgImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
    tagline: '"EXECUTIVE LEADERSHIP, DIGITAL MARKETING AND PORTFOLIO CONTROL."',
    description: "Flexible executive distance MBA program designed for working professionals seeking career acceleration in Finance, HR, Marketing, or IT Systems.",
    longAbout: "To accelerate careers of working professionals through flexible business administration modules, strategic digital marketing, and virtual viva evaluations.",
    eligibility: [
      "Graduation Bachelor Degree in any discipline.",
      "Work experience beneficial."
    ],
    syllabus: [
      "Management Process & Behavior",
      "Managerial Finance & Control",
      "Marketing & Strategic Digital Growth",
      "Specialized Domain Electives",
      "Executive Project Report & Viva"
    ],
    careerRoles: [
      "Executive Business Manager",
      "Operations Team Lead",
      "Corporate Growth Manager",
      "HR Business Partner"
    ],
    highlight: "Save year, save time & secure your career with NAAC A Grade degree.",
  },

  // ================= DIGITAL MARKETING + AI =================
  {
    id: "dm-ai-master",
    code: "DM+AI Master",
    title: "Digital Marketing + AI",
    fullTitle: "Digital Marketing + Generative AI Growth Program",
    category: "GROWTH PROGRAM",
    stream: "digital-marketing",
    level: "ug",
    duration: "12 Months",
    semesters: "4 Quarters",
    certification: "Google, Meta & IINT Industry Growth Certification",
    bgImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    tagline: '"GENERATIVE AI AUTOMATION, PERFORMANCE ADS AND SEARCH ENGINE DOMINANCE."',
    description: "Flagship 12-month comprehensive digital marketing training program designed to turn you into a certified growth expert using AI tools, performance ads, and SEO.",
    longAbout: "To train growth marketers capable of leveraging ChatGPT, Midjourney, Google Ads performance max campaigns, and Meta ad funnels for exponential scaling.",
    eligibility: [
      "Passed Class 12th or pursuing Graduation.",
      "Passion for social media and copywriting."
    ],
    syllabus: [
      "Search Engine Optimization (SEO)",
      "Pay-Per-Click Ads (Google & Meta)",
      "Generative AI Content Creation",
      "Social Media Brand Funnels",
      "Analytics & Conversion Projects"
    ],
    careerRoles: [
      "Digital Growth Specialist",
      "Performance Ads Marketer",
      "SEO Lead Strategist",
      "AI Content Marketing Lead"
    ],
    highlight: "Guaranteed 100% Practical Client Projects & Placement Assistance.",
  },

  // ================= DATA ANALYTICS =================
  {
    id: "data-analytics-pro",
    code: "Data-Analytics",
    title: "Data Analytics",
    fullTitle: "Data Analytics & Business Intelligence Program",
    category: "ANALYTICS PROGRAM",
    stream: "data-analytics",
    level: "ug",
    duration: "6 Months",
    semesters: "2 Quarters",
    certification: "IINT Advanced Data Analytics Specialist Certification",
    bgImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    tagline: '"PYTHON DATA SCIENCE, SQL DATABASE QUERYING AND POWER BI DASHBOARDS."',
    description: "Learn to inspect, clean, transform, and model data to discover useful information, power business decisions, and build interactive Power BI & Tableau dashboards.",
    longAbout: "To transform aspiring analysts into business intelligence specialists through hands-on Python Pandas data cleaning, SQL query optimization, and Power BI interactive dashboard creation.",
    eligibility: [
      "Passed Class 12th or Graduation with analytical mindset.",
      "Basic familiarity with MS Excel."
    ],
    syllabus: [
      "Advanced Excel Data Analytics & Power Query",
      "SQL Querying & Database Normalization",
      "Python Data Science Stack (NumPy, Pandas)",
      "Power BI & Tableau Dashboard Development",
      "Business Intelligence Capstone Projects"
    ],
    careerRoles: [
      "Data Analyst Specialist",
      "Business Intelligence Developer",
      "SQL Database Analyst",
      "Data Visualization Specialist"
    ],
    highlight: "Includes 5+ Industry Real-World Dataset Projects.",
  }
];

export default function App() {
  const [activePage, setActivePage] = useState<PageTab>("home");
  const [scrollProgress, setScrollProgress] = useState(0);

  // Rotating Hero Taglines (6-second interval)
  const [taglineIndex, setTaglineIndex] = useState(0);
  const taglines = [
    "सर्टिफिकेट भारत सरकार का, हुनर डिजिटल युग का",
    "IINT: The Root of Progress & Digital Excellence"
  ];

  // Level 1: Main Category State ("diploma" | "regular" | "distance" | "digital-marketing" | "data-analytics")
  const [selectedProgramCategory, setSelectedProgramCategory] = useState<string | null>(null);
  
  // Level 2: Sub-Category State ("regular-diploma" | "regular-ug" | "regular-pg" | "distance-ug" | "distance-pg")
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);

  // Full Page Detail View State for a specific selected course
  const [activeCourseDetailView, setActiveCourseDetailView] = useState<CourseItem | null>(null);

  // Stats Counters state
  const [stats, setStats] = useState({ years: 0, alumni: 0, placement: 0 });

  // Blue Theme Admissions Pop-out Form Modal States
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applyForm, setApplyForm] = useState({
    name: "",
    email: "",
    phone: "",
    state: "Delhi NCR / Narela",
    course: COURSES[0].title
  });
  const [applySubmitted, setApplySubmitted] = useState(false);

  // AUTO POP-UP MODAL ON PAGE LOAD AFTER 2.5 SECONDS
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsApplyModalOpen(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Rotate hero headline every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [taglines.length]);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Stats counting animation on load
  useEffect(() => {
    const duration = 2000;
    const steps = 50;
    const intervalTime = duration / steps;
    let stepCount = 0;

    const timer = setInterval(() => {
      stepCount++;
      setStats({
        years: Math.min(Math.round((20 / steps) * stepCount), 20),
        alumni: Math.min(Math.round((15000 / steps) * stepCount), 15000),
        placement: Math.min(Math.round((100 / steps) * stepCount), 100),
      });

      if (stepCount >= steps) clearInterval(timer);
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const handleSelectProgramFromCourses = (courseTitle: string) => {
    setApplyForm(prev => ({ ...prev, course: courseTitle }));
    setIsApplyModalOpen(true);
    setApplySubmitted(false);
  };

  const handleSwitchPage = (page: PageTab) => {
    setActivePage(page);
    if (page === "courses") {
      setSelectedProgramCategory(null);
      setSelectedSubCategory(null);
      setActiveCourseDetailView(null);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Render a Single Course Card Component (Clean Title Only, No Duration on Outside Card)
  const renderCourseCard = (course: CourseItem) => (
    <motion.div
      key={course.id}
      whileHover={{ y: -5, scale: 1.02 }}
      onClick={() => {
        setActiveCourseDetailView(course);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="relative p-6 rounded-2xl bg-zinc-950/80 backdrop-blur-md border border-blue-500/30 hover:border-emerald-400 hover:bg-gradient-to-br hover:from-emerald-700/90 hover:to-teal-800/90 hover:shadow-[0_0_35px_rgba(16,185,129,0.6)] transition-all duration-300 shadow-2xl flex flex-col justify-between overflow-hidden group min-h-[210px] cursor-pointer"
    >
      {/* Background Course Image Photo - Bright & Crystal Clear */}
      {course.bgImage && (
        <img 
          src={course.bgImage} 
          alt={course.title} 
          className="absolute inset-0 w-full h-full object-cover opacity-55 group-hover:opacity-85 transition-opacity duration-300 pointer-events-none filter brightness-105 contrast-110"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/65 to-zinc-950/20 group-hover:from-emerald-950/85 group-hover:to-transparent pointer-events-none" />

      {/* CLEAN CARD CONTENT: SHORT TITLE + FULL FORM ONLY */}
      <div className="relative z-10 space-y-2">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[11px] font-semibold text-zinc-100 group-hover:text-white uppercase tracking-wider truncate bg-black/50 px-2.5 py-0.5 rounded-full border border-white/20 backdrop-blur-md shadow-sm">
            {course.category}
          </span>
          <span className="text-[11px] font-bold text-blue-200 bg-blue-950/90 group-hover:bg-emerald-950 group-hover:text-emerald-200 group-hover:border-emerald-400 px-3 py-0.5 rounded-full border border-blue-500/50 shadow-md">
            {course.code}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white transition-colors leading-tight group-hover:text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
          {course.title}
        </h3>

        {course.fullTitle && (
          <p className="text-xs font-semibold text-blue-200 group-hover:text-emerald-100 transition-colors drop-shadow-md bg-black/40 px-2 py-0.5 rounded-md inline-block border border-white/10 backdrop-blur-sm">
            ({course.fullTitle})
          </p>
        )}
      </div>

      {/* CARD FOOTER - DURATION REMOVED AS REQUESTED */}
      <div className="relative z-10 pt-4 mt-4 border-t border-zinc-800/80 group-hover:border-emerald-400/40 flex items-center justify-end text-xs transition-colors">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setActiveCourseDetailView(course);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="text-blue-200 group-hover:text-white font-bold flex items-center gap-1.5 cursor-pointer bg-black/60 group-hover:bg-emerald-900/80 px-3.5 py-1.5 rounded-xl border border-white/20 group-hover:border-emerald-400 shadow-lg backdrop-blur-md transition-all"
        >
          <span>View Full Details</span>
          <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="relative w-full min-h-screen bg-black text-white selection:bg-blue-600/40 selection:text-blue-200 overflow-x-hidden flex flex-col justify-between">
      
      {/* Dynamic 3D WebGL Particle Canvas Background */}
      <ParticleCanvas scrollProgress={scrollProgress} />

      {/* Floating Glassmorphic Top Navigation Bar */}
      <NavigationBar 
        activePage={activePage}
        onPageChange={handleSwitchPage}
        onApplyNow={() => {
          setIsApplyModalOpen(true);
          setApplySubmitted(false);
        }}
      />

      {/* Ambient Lighting / Reading Overlays */}
      <div className="fixed inset-0 pointer-events-none z-1 bg-gradient-to-b from-black via-transparent to-black opacity-80" />
      <div className="fixed inset-0 pointer-events-none z-1 bg-[radial-gradient(circle_at_center,transparent_30%,#000000_90%)] opacity-85" />

      {/* DYNAMIC PAGE CONTENT CONTAINER */}
      <main className="relative z-10 flex-grow pt-24 sm:pt-28 pb-12">
        <AnimatePresence mode="wait">
          
          {/* ================= PAGE 1: HOME ================= */}
          {activePage === "home" && (
            <motion.div
              key="home-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full flex flex-col items-center px-4 sm:px-6"
            >
              {/* 1. Hero / Front with 6-Second Tagline Rotator */}
              <div className="w-full max-w-5xl mx-auto text-center flex flex-col items-center justify-center my-4 select-none min-h-[220px]">
                <div className="flex flex-col items-center justify-center gap-4 w-full">
                  <span className="font-mono tracking-widest text-xs sm:text-sm uppercase px-5 py-2.5 rounded-full border border-emerald-500/30 text-emerald-400 bg-emerald-950/60 shadow-[0_0_25px_rgba(16,185,129,0.25)] font-bold animate-pulse text-center leading-relaxed">
                    A Unit of Adarsh and Welfare Education Society
                  </span>

                  {/* 6-Second Shifting Taglines Container */}
                  <div className="h-28 sm:h-36 md:h-40 flex items-center justify-center w-full px-2">
                    <AnimatePresence mode="wait">
                      <motion.h1 
                        key={taglineIndex}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.7 }}
                        className="font-display text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-normal leading-[1.35] sm:leading-[1.4] text-center px-4 py-2 text-white filter drop-shadow-[0_0_35px_rgba(59,130,246,0.3)]"
                      >
                        {taglines[taglineIndex]}
                      </motion.h1>
                    </AnimatePresence>
                  </div>

                  <div className="h-[1.5px] w-[150px] bg-blue-500/40 mt-1 shadow-[0_0_12px_rgba(59,130,246,0.6)]" />
                </div>
              </div>

              {/* Badges & Hero Actions */}
              <div className="w-full max-w-3xl text-center px-4 flex flex-col items-center">
                <CertificationBadges />
                
                <div className="flex flex-col sm:flex-row gap-4 my-8">
                  <button 
                    onClick={() => handleSwitchPage("courses")}
                    className="px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-semibold text-sm transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                  >
                    Explore Course Catalog
                    <ArrowRight size={16} />
                  </button>
                  <button 
                    onClick={() => {
                      setIsApplyModalOpen(true);
                      setApplySubmitted(false);
                    }}
                    className="px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-bold text-sm transition-all shadow-[0_0_25px_rgba(59,130,246,0.4)] active:scale-95 cursor-pointer flex items-center justify-center gap-2 border border-blue-500/40"
                  >
                    Apply Now
                    <GraduationCap size={16} />
                  </button>
                </div>
              </div>

              {/* FLOATING POPULAR COURSES MARQUEE */}
              <div className="w-full max-w-6xl mx-auto overflow-hidden relative py-6 my-6 border-t border-b border-blue-500/20">
                <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-black via-black/40 to-transparent z-20 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-black via-black/40 to-transparent z-20 pointer-events-none" />
                
                <div className="text-center mb-6">
                  <h3 className="font-display font-black text-2xl sm:text-3xl tracking-tight text-white uppercase flex items-center justify-center gap-2">
                    <span className="text-emerald-400">🔥</span> Popular Courses
                  </h3>
                </div>

                <div className="flex whitespace-nowrap overflow-hidden">
                  <div className="animate-marquee-slow flex gap-6 py-2">
                    {[...COURSES, ...COURSES].map((course, idx) => {
                      return (
                        <div
                          key={`home-course-${course.id}-${idx}`}
                          onClick={() => {
                            setActivePage("courses");
                            setActiveCourseDetailView(course);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="relative w-[240px] sm:w-[280px] p-5 rounded-2xl bg-zinc-950/70 backdrop-blur-md border border-blue-500/25 hover:bg-gradient-to-br hover:from-emerald-600 hover:to-teal-700 hover:border-emerald-400 hover:shadow-[0_0_35px_rgba(16,185,129,0.6)] transition-all duration-300 shadow-xl cursor-pointer flex flex-col justify-between shrink-0 select-none group overflow-hidden"
                        >
                          {/* Background Course Image Photo */}
                          {course.bgImage && (
                            <img 
                              src={course.bgImage} 
                              alt={course.title} 
                              className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:opacity-45 transition-opacity duration-300 pointer-events-none filter brightness-95 contrast-105"
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950/40 group-hover:from-emerald-950/80 group-hover:to-transparent pointer-events-none" />

                          <div className="relative z-10">
                            <div className="flex items-center justify-between gap-2 mb-3">
                              <span className="text-[9px] font-mono text-zinc-300 group-hover:text-emerald-100 uppercase tracking-wider truncate">
                                {course.category}
                              </span>
                              <span className="text-[9px] font-mono text-blue-300 bg-blue-950/60 group-hover:bg-emerald-950 group-hover:text-emerald-200 group-hover:border-emerald-400 px-2 py-0.5 rounded-full border border-blue-500/30 transition-colors">
                                {course.code}
                              </span>
                            </div>
                            <h4 className="text-base font-black tracking-tight text-white transition-colors truncate">
                              {course.title}
                            </h4>
                          </div>

                          <div className="relative z-10 mt-4 pt-3 border-t border-zinc-900/80 group-hover:border-emerald-400/40 flex items-center justify-end text-[10px] font-mono text-zinc-400 transition-colors">
                            <span className="text-blue-400 group-hover:text-white group-hover:underline flex items-center gap-0.5 font-medium transition-colors">
                              View Details →
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 2. Why Choose IINT Section */}
              <GovtApprovalSection />

              {/* 3. Experience Stats Counters */}
              <div className="w-full max-w-5xl px-4 grid grid-cols-1 sm:grid-cols-3 gap-6 my-10">
                <div className="p-6 rounded-2xl bg-zinc-950/60 backdrop-blur-md border border-blue-500/30 text-center flex flex-col items-center transition-all shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                  <div className="p-3 bg-blue-500/15 rounded-xl text-blue-400 mb-3 border border-blue-500/30">
                    <Building size={20} />
                  </div>
                  <span className="text-3xl font-black tracking-tight text-white">
                    {stats.years}+ Years
                  </span>
                  <span className="text-xs font-mono text-blue-400 uppercase tracking-widest mt-1">Institutional Leadership</span>
                </div>

                <div className="p-6 rounded-2xl bg-zinc-950/60 backdrop-blur-md border border-blue-500/30 text-center flex flex-col items-center transition-all shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                  <div className="p-3 bg-blue-500/15 rounded-xl text-blue-400 mb-3 border border-blue-500/30">
                    <Users size={20} />
                  </div>
                  <span className="text-3xl font-black tracking-tight text-white">
                    {stats.alumni.toLocaleString()}+
                  </span>
                  <span className="text-xs font-mono text-blue-400 uppercase tracking-widest mt-1">Trained Alumni Worldwide</span>
                </div>

                <div className="p-6 rounded-2xl bg-zinc-950/60 backdrop-blur-md border border-blue-500/30 text-center flex flex-col items-center transition-all shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                  <div className="p-3 bg-blue-500/15 rounded-xl text-blue-400 mb-3 border border-blue-500/30">
                    <Award size={20} />
                  </div>
                  <span className="text-3xl font-black tracking-tight text-white">
                    {stats.placement}% Labs
                  </span>
                  <span className="text-xs font-mono text-blue-400 uppercase tracking-widest mt-1">Hands-On Practical Training</span>
                </div>
              </div>

              {/* 4. Real Stories, Real Success: Our Students Speak */}
              <TestimonialsSection />

            </motion.div>
          )}

          {/* ================= PAGE 2: PROGRAMMES & FULL DETAIL VIEW ================= */}
          {activePage === "courses" && (
            <motion.div
              key="courses-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-4"
            >
              
              {/* FULL RICH COURSE DETAIL PAGE LAYOUT WITH BRIGHT VIVID BACKGROUND PHOTO */}
              {activeCourseDetailView !== null ? (
                <div className="space-y-8">
                  
                  {/* Top Header Banner matching Screenshot with HIGHLIGHTED BRIGHT BACKGROUND IMAGE */}
                  <div className="relative rounded-3xl bg-zinc-950 border border-blue-500/40 p-8 sm:p-12 text-white overflow-hidden shadow-2xl min-h-[320px] flex flex-col justify-center">
                    
                    {/* Clear High-Definition Highlighted Background Image Overlay */}
                    <img 
                      src={activeCourseDetailView.bgImage} 
                      alt={activeCourseDetailView.title} 
                      className="absolute inset-0 w-full h-full object-cover opacity-75 sm:opacity-80 filter brightness-105 contrast-110 pointer-events-none transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/75 to-transparent pointer-events-none" />

                    <div className="relative z-10 space-y-4 max-w-3xl">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-600/60 text-white text-xs font-mono font-bold tracking-widest uppercase border border-blue-400/80 backdrop-blur-md shadow-lg">
                        <span>{activeCourseDetailView.category}</span>
                      </div>

                      <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)]">
                        {activeCourseDetailView.title} {activeCourseDetailView.fullTitle && `(${activeCourseDetailView.fullTitle})`}
                      </h1>

                      <p className="text-xs sm:text-sm font-mono text-blue-200 italic uppercase tracking-wider drop-shadow-md bg-black/40 px-3 py-1 rounded-lg inline-block border border-white/10">
                        {activeCourseDetailView.tagline}
                      </p>

                      <p className="text-sm sm:text-base text-zinc-100 font-light leading-relaxed drop-shadow-md max-w-2xl">
                        A premium, industry-focused academic program designed to deliver advanced skills, analytical thinking, and career-oriented validation.
                      </p>
                    </div>

                    <button 
                      onClick={() => setActiveCourseDetailView(null)}
                      className="absolute top-6 right-6 px-4 py-2 rounded-xl bg-black/80 hover:bg-black text-white text-xs font-bold transition-all flex items-center gap-2 border border-white/30 cursor-pointer backdrop-blur-md shadow-xl"
                    >
                      <ArrowLeft size={16} />
                      <span>Back to Courses</span>
                    </button>
                  </div>

                  {/* 2-Column Grid: About Course & Duration/Structure */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    {/* Left Column: ABOUT THE COURSE */}
                    <div className="lg:col-span-8 p-8 rounded-3xl bg-zinc-950/80 backdrop-blur-md border border-blue-500/25 shadow-xl space-y-4">
                      <div className="flex items-center gap-3 text-blue-400 border-b border-zinc-800 pb-4">
                        <BookOpen size={24} />
                        <h3 className="text-lg font-black tracking-wider uppercase text-white">ABOUT THE COURSE</h3>
                      </div>
                      <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
                        {activeCourseDetailView.longAbout}
                      </p>
                    </div>

                    {/* Right Column: DURATION & STRUCTURE */}
                    <div className="lg:col-span-4 p-8 rounded-3xl bg-zinc-950/80 backdrop-blur-md border border-blue-500/25 shadow-xl flex flex-col justify-center space-y-3">
                      <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block font-bold">DURATION & STRUCTURE</span>
                      <h2 className="text-4xl font-black text-white tracking-tight">{activeCourseDetailView.duration}</h2>
                      <p className="text-xs font-mono text-zinc-400">{activeCourseDetailView.semesters}</p>
                      <div className="pt-2 border-t border-zinc-800/80">
                        <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-semibold block">Academic Certification:</span>
                        <p className="text-xs text-zinc-300 font-light mt-0.5">{activeCourseDetailView.certification}</p>
                      </div>
                    </div>

                  </div>

                  {/* ELIGIBILITY CRITERIA & COURSE HIGHLIGHTS GRID */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    {/* Left: ELIGIBILITY CRITERIA */}
                    <div className="lg:col-span-5 p-8 rounded-3xl bg-zinc-950/80 backdrop-blur-md border border-blue-500/25 shadow-xl space-y-6">
                      <div className="flex items-center gap-3 text-blue-400 border-b border-zinc-800 pb-4">
                        <ShieldCheck size={24} />
                        <h3 className="text-lg font-black tracking-wider uppercase text-white">ELIGIBILITY CRITERIA</h3>
                      </div>

                      <ul className="space-y-4">
                        {activeCourseDetailView.eligibility.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300 font-light">
                            <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right: 6 COURSE HIGHLIGHTS GRID */}
                    <div className="lg:col-span-7 p-8 rounded-3xl bg-zinc-950/80 backdrop-blur-md border border-blue-500/25 shadow-xl space-y-6">
                      <div className="flex items-center gap-3 text-blue-400 border-b border-zinc-800 pb-4">
                        <Sparkles size={24} />
                        <h3 className="text-lg font-black tracking-wider uppercase text-white">COURSE HIGHLIGHTS</h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-start gap-3">
                          <Building size={20} className="text-amber-400 shrink-0 mt-0.5" />
                          <p className="text-xs text-zinc-300 font-light">Industry-focused curriculum aligned with current market needs.</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-start gap-3">
                          <BookOpen size={20} className="text-blue-400 shrink-0 mt-0.5" />
                          <p className="text-xs text-zinc-300 font-light">Practical learning modules with regular hands-on sessions.</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-start gap-3">
                          <Sparkles size={20} className="text-purple-400 shrink-0 mt-0.5" />
                          <p className="text-xs text-zinc-300 font-light">Professional skill development focusing on modern tools & frameworks.</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-start gap-3">
                          <Users size={20} className="text-rose-400 shrink-0 mt-0.5" />
                          <p className="text-xs text-zinc-300 font-light">Personality development classes and interview preparation.</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-start gap-3">
                          <Award size={20} className="text-emerald-400 shrink-0 mt-0.5" />
                          <p className="text-xs text-zinc-300 font-light">Live projects and case studies for real-world validation.</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-start gap-3">
                          <Wrench size={20} className="text-teal-400 shrink-0 mt-0.5" />
                          <p className="text-xs text-zinc-300 font-light">Dedicated internship support and industrial placement assistance.</p>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* CAREER OPPORTUNITIES (EXACTLY 4 PILLS PER COURSE) */}
                  <div className="p-8 rounded-3xl bg-zinc-950/80 backdrop-blur-md border border-blue-500/25 shadow-xl space-y-6">
                    <div className="flex items-center gap-3 text-blue-400 border-b border-zinc-800 pb-4">
                      <Briefcase size={24} />
                      <h3 className="text-lg font-black tracking-wider uppercase text-white">CAREER OPPORTUNITIES</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {activeCourseDetailView.careerRoles.map((role, idx) => (
                        <div 
                          key={idx} 
                          className="p-4 rounded-2xl bg-zinc-900/90 border border-blue-500/30 text-white font-bold text-xs tracking-wide shadow-md flex items-center justify-between group hover:border-emerald-400 transition-all"
                        >
                          <span className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-[10px] font-bold">
                              {idx + 1}
                            </span>
                            <span>{role}</span>
                          </span>
                          <ChevronRight size={14} className="text-blue-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-800">
                    <button 
                      onClick={() => setActiveCourseDetailView(null)}
                      className="px-6 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white text-xs font-semibold cursor-pointer"
                    >
                      ← Back to Courses
                    </button>
                    <button 
                      onClick={() => handleSelectProgramFromCourses(activeCourseDetailView.title)}
                      className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-black text-xs uppercase tracking-widest shadow-lg cursor-pointer flex items-center gap-2 border border-blue-500/40"
                    >
                      Apply Online Now 🪄
                    </button>
                  </div>

                </div>
              ) : (
                /* REGULAR PROGRAMMES DRILL-DOWN CATEGORY LAYOUT */
                <>
                  {/* LEVEL 1: MAIN PROGRAMMES CATEGORIES */}
                  {selectedProgramCategory === null && (
                    <div className="space-y-8">
                      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 gap-2">
                        <span className="text-[10px] font-mono uppercase text-blue-400 tracking-widest bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-500/30 font-semibold">
                          Programmes & Certification Categories
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase text-white">
                          Programmes
                        </h2>
                        <p className="text-xs sm:text-sm font-light text-zinc-400">
                          Select any programme category below to explore sub-level streams and specialized courses.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        
                        {/* Card 1: Computer Education Skill India Program */}
                        <motion.div 
                          whileHover={{ y: -5 }}
                          className="relative p-8 rounded-3xl bg-zinc-950/85 backdrop-blur-md border border-blue-500/30 hover:border-blue-500/80 shadow-2xl flex flex-col justify-between transition-all group overflow-hidden"
                        >
                          <img 
                            src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80" 
                            alt="Skill India" 
                            className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-35 transition-opacity duration-300 pointer-events-none filter brightness-90"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-zinc-950/50 pointer-events-none" />

                          <div className="relative z-10">
                            <div className="w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-md">
                              <ShieldCheck size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                              Computer Education Skill India Program
                            </h3>
                            <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-6">
                              National skill development computer training programs designed for employment readiness.
                            </p>
                          </div>

                          <button 
                            onClick={() => {
                              setSelectedProgramCategory("diploma");
                              setSelectedSubCategory("diploma-all");
                            }}
                            className="relative z-10 w-full py-3.5 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-300 font-bold text-xs uppercase tracking-wider hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                          >
                            Explore courses →
                          </button>
                        </motion.div>

                        {/* Card 2: Regular Courses */}
                        <motion.div 
                          whileHover={{ y: -5 }}
                          className="relative p-8 rounded-3xl bg-zinc-950/85 backdrop-blur-md border border-blue-500/30 hover:border-blue-500/80 shadow-2xl flex flex-col justify-between transition-all group overflow-hidden"
                        >
                          <img 
                            src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80" 
                            alt="Regular Courses" 
                            className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-35 transition-opacity duration-300 pointer-events-none filter brightness-90"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-zinc-950/50 pointer-events-none" />

                          <div className="relative z-10">
                            <div className="w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-md">
                              <Landmark size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                              Regular Courses
                            </h3>
                            <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-6">
                              Highly focused skill development and certification programs with practical sandbox learning modules.
                            </p>
                          </div>

                          <button 
                            onClick={() => setSelectedProgramCategory("regular")}
                            className="relative z-10 w-full py-3.5 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-300 font-bold text-xs uppercase tracking-wider hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                          >
                            Explore courses →
                          </button>
                        </motion.div>

                        {/* Card 3: Distance Learning */}
                        <motion.div 
                          whileHover={{ y: -5 }}
                          className="relative p-8 rounded-3xl bg-zinc-950/85 backdrop-blur-md border border-blue-500/30 hover:border-blue-500/80 shadow-2xl flex flex-col justify-between transition-all group overflow-hidden"
                        >
                          <img 
                            src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=600&q=80" 
                            alt="Distance Learning" 
                            className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-35 transition-opacity duration-300 pointer-events-none filter brightness-90"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-zinc-950/50 pointer-events-none" />

                          <div className="relative z-10">
                            <div className="w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-md">
                              <Monitor size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                              Distance Learning
                            </h3>
                            <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-6">
                              Flexible, self-paced degree options supported by online resources, assignments, and online exam modes.
                            </p>
                          </div>

                          <button 
                            onClick={() => setSelectedProgramCategory("distance")}
                            className="relative z-10 w-full py-3.5 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-300 font-bold text-xs uppercase tracking-wider hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                          >
                            Explore courses →
                          </button>
                        </motion.div>

                        {/* Card 4: Digital Marketing + AI Program */}
                        <motion.div 
                          whileHover={{ y: -5 }}
                          className="relative p-8 rounded-3xl bg-zinc-950/85 backdrop-blur-md border border-blue-500/30 hover:border-blue-500/80 shadow-2xl flex flex-col justify-between transition-all group overflow-hidden"
                        >
                          <img 
                            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80" 
                            alt="Digital Marketing" 
                            className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-35 transition-opacity duration-300 pointer-events-none filter brightness-90"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-zinc-950/50 pointer-events-none" />

                          <div className="relative z-10">
                            <div className="w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-md">
                              <Megaphone size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                              Digital Marketing + AI Program
                            </h3>
                            <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-6">
                              Flagship 12-month comprehensive digital marketing training program designed to turn you into a certified growth expert.
                            </p>
                          </div>

                          <button 
                            onClick={() => {
                              setSelectedProgramCategory("digital-marketing");
                              setSelectedSubCategory("dm-all");
                            }}
                            className="relative z-10 w-full py-3.5 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-300 font-bold text-xs uppercase tracking-wider hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                          >
                            Explore courses →
                          </button>
                        </motion.div>

                        {/* Card 5: Data Analytics Program */}
                        <motion.div 
                          whileHover={{ y: -5 }}
                          className="relative p-8 rounded-3xl bg-zinc-950/85 backdrop-blur-md border border-blue-500/30 hover:border-blue-500/80 shadow-2xl flex flex-col justify-between transition-all group md:col-span-2 lg:col-span-1 overflow-hidden"
                        >
                          <img 
                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80" 
                            alt="Data Analytics" 
                            className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-35 transition-opacity duration-300 pointer-events-none filter brightness-90"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-zinc-950/50 pointer-events-none" />

                          <div className="relative z-10">
                            <div className="w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-md">
                              <BarChart3 size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                              Data Analytics Program
                            </h3>
                            <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-6">
                              Learn to inspect, clean, transform, and model data to discover useful information and support decision-making.
                            </p>
                          </div>

                          <button 
                            onClick={() => {
                              setSelectedProgramCategory("data-analytics");
                              setSelectedSubCategory("data-all");
                            }}
                            className="relative z-10 w-full py-3.5 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-300 font-bold text-xs uppercase tracking-wider hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                          >
                            Explore courses →
                          </button>
                        </motion.div>

                      </div>
                    </div>
                  )}

                  {/* LEVEL 2: REGULAR COURSE PROGRAM PAGE */}
                  {selectedProgramCategory === "regular" && selectedSubCategory === null && (
                    <div className="space-y-8">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-zinc-950/70 p-6 rounded-3xl border border-blue-500/30">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-blue-600/15 border border-blue-500/30 text-blue-400 rounded-2xl">
                            <Landmark size={32} />
                          </div>
                          <div>
                            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                              Regular Course Program
                            </h2>
                            <p className="text-xs text-zinc-400">Select a programme category to explore courses</p>
                          </div>
                        </div>

                        <button 
                          onClick={() => setSelectedProgramCategory(null)}
                          className="px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-blue-500 text-zinc-300 hover:text-white text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer"
                        >
                          <ArrowLeft size={16} />
                          <span>All Programs</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        
                        {/* Card 1: Diploma Programmes */}
                        <motion.div 
                          whileHover={{ y: -5 }}
                          className="relative p-8 rounded-3xl bg-zinc-950/85 backdrop-blur-md border border-blue-500/30 hover:border-blue-500/80 shadow-2xl flex flex-col justify-between transition-all group overflow-hidden"
                        >
                          <img 
                            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80" 
                            alt="Diploma" 
                            className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-35 transition-opacity duration-300 pointer-events-none filter brightness-90"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-zinc-950/50 pointer-events-none" />

                          <div className="relative z-10">
                            <div className="w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-md">
                              <CheckSquare size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                              Diploma Programmes
                            </h3>
                            <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-6">
                              3-year engineering, technical & healthcare diploma programs with direct employment pathways.
                            </p>
                          </div>

                          <button 
                            onClick={() => setSelectedSubCategory("regular-diploma")}
                            className="relative z-10 w-full py-3.5 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-300 font-bold text-xs uppercase tracking-wider hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                          >
                            View Courses →
                          </button>
                        </motion.div>

                        {/* Card 2: Undergraduate (UG) Programmes */}
                        <motion.div 
                          whileHover={{ y: -5 }}
                          className="relative p-8 rounded-3xl bg-zinc-950/85 backdrop-blur-md border border-blue-500/30 hover:border-blue-500/80 shadow-2xl flex flex-col justify-between transition-all group overflow-hidden"
                        >
                          <img 
                            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80" 
                            alt="UG Programmes" 
                            className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-35 transition-opacity duration-300 pointer-events-none filter brightness-90"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-zinc-950/50 pointer-events-none" />

                          <div className="relative z-10">
                            <div className="w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-md">
                              <GraduationCap size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                              Undergraduate (UG) Programmes
                            </h3>
                            <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-6">
                              BCA, BBA, B.Com, BA and other undergraduate degree programs with placement support.
                            </p>
                          </div>

                          <button 
                            onClick={() => setSelectedSubCategory("regular-ug")}
                            className="relative z-10 w-full py-3.5 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-300 font-bold text-xs uppercase tracking-wider hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                          >
                            View Courses →
                          </button>
                        </motion.div>

                        {/* Card 3: Postgraduate (PG) Programmes */}
                        <motion.div 
                          whileHover={{ y: -5 }}
                          className="relative p-8 rounded-3xl bg-zinc-950/85 backdrop-blur-md border border-blue-500/30 hover:border-blue-500/80 shadow-2xl flex flex-col justify-between transition-all group overflow-hidden"
                        >
                          <img 
                            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80" 
                            alt="PG Programmes" 
                            className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-35 transition-opacity duration-300 pointer-events-none filter brightness-90"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-zinc-950/50 pointer-events-none" />

                          <div className="relative z-10">
                            <div className="w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-md">
                              <Briefcase size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                              Postgraduate (PG) Programmes
                            </h3>
                            <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-6">
                              MBA, MCA, M.Com, MA and other postgraduate degree programs for advanced careers.
                            </p>
                          </div>

                          <button 
                            onClick={() => setSelectedSubCategory("regular-pg")}
                            className="relative z-10 w-full py-3.5 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-300 font-bold text-xs uppercase tracking-wider hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                          >
                            View Courses →
                          </button>
                        </motion.div>

                      </div>
                    </div>
                  )}

                  {/* LEVEL 2: DISTANCE LEARNING PROGRAM PAGE */}
                  {selectedProgramCategory === "distance" && selectedSubCategory === null && (
                    <div className="space-y-8">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-zinc-950/70 p-6 rounded-3xl border border-blue-500/30">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-blue-600/15 border border-blue-500/30 text-blue-400 rounded-2xl">
                            <Monitor size={32} />
                          </div>
                          <div>
                            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                              Distance Learning Program
                            </h2>
                            <p className="text-xs text-zinc-400">Select a programme category to explore courses</p>
                          </div>
                        </div>

                        <button 
                          onClick={() => setSelectedProgramCategory(null)}
                          className="px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-blue-500 text-zinc-300 hover:text-white text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer"
                        >
                          <ArrowLeft size={16} />
                          <span>All Programs</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        
                        {/* Card 1: Distance UG Programmes */}
                        <motion.div 
                          whileHover={{ y: -5 }}
                          className="relative p-8 rounded-3xl bg-zinc-950/85 backdrop-blur-md border border-blue-500/30 hover:border-blue-500/80 shadow-2xl flex flex-col justify-between transition-all group overflow-hidden"
                        >
                          <img 
                            src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80" 
                            alt="Distance UG" 
                            className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-35 transition-opacity duration-300 pointer-events-none filter brightness-90"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-zinc-950/50 pointer-events-none" />

                          <div className="relative z-10">
                            <div className="w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-md">
                              <GraduationCap size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                              Distance UG Programmes
                            </h3>
                            <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-6">
                              Flexible self-paced undergraduate programs — BA, BCA, BBA, B.Com.
                            </p>
                          </div>

                          <button 
                            onClick={() => setSelectedSubCategory("distance-ug")}
                            className="relative z-10 w-full py-3.5 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-300 font-bold text-xs uppercase tracking-wider hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                          >
                            View Courses →
                          </button>
                        </motion.div>

                        {/* Card 2: Distance PG Programmes */}
                        <motion.div 
                          whileHover={{ y: -5 }}
                          className="relative p-8 rounded-3xl bg-zinc-950/85 backdrop-blur-md border border-blue-500/30 hover:border-blue-500/80 shadow-2xl flex flex-col justify-between transition-all group overflow-hidden"
                        >
                          <img 
                            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80" 
                            alt="Distance PG" 
                            className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-35 transition-opacity duration-300 pointer-events-none filter brightness-90"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-zinc-950/50 pointer-events-none" />

                          <div className="relative z-10">
                            <div className="w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-md">
                              <Briefcase size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                              Distance PG Programmes
                            </h3>
                            <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-6">
                              Flexible self-paced postgraduate programs — MA, MCA, MBA, M.Com.
                            </p>
                          </div>

                          <button 
                            onClick={() => setSelectedSubCategory("distance-pg")}
                            className="relative z-10 w-full py-3.5 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-300 font-bold text-xs uppercase tracking-wider hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                          >
                            View Courses →
                          </button>
                        </motion.div>

                      </div>
                    </div>
                  )}

                  {/* LEVEL 3: DETAILED COURSES GRID FOR SELECTED SUB-CATEGORY */}
                  {selectedSubCategory !== null && (
                    <div className="space-y-6">
                      {/* Back Navigation Bar */}
                      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                        <button
                          onClick={() => {
                            if (selectedSubCategory === "diploma-all" || selectedSubCategory === "dm-all" || selectedSubCategory === "data-all") {
                              setSelectedProgramCategory(null);
                              setSelectedSubCategory(null);
                            } else {
                              setSelectedSubCategory(null);
                            }
                          }}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-blue-500 text-xs font-semibold transition-all cursor-pointer"
                        >
                          <ArrowLeft size={16} />
                          <span>Back</span>
                        </button>
                        
                        <span className="text-xs font-mono text-blue-400 uppercase tracking-widest font-semibold bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/30">
                          Category: {selectedSubCategory}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {COURSES.filter(c => {
                          if (selectedSubCategory === "regular-diploma") return c.level === "diploma";
                          if (selectedSubCategory === "regular-ug") return c.stream === "regular" && c.level === "ug";
                          if (selectedSubCategory === "regular-pg") return c.stream === "regular" && c.level === "pg";
                          if (selectedSubCategory === "distance-ug") return c.stream === "distance" && c.level === "ug";
                          if (selectedSubCategory === "distance-pg") return c.stream === "distance" && c.level === "pg";
                          if (selectedSubCategory === "diploma-all") return c.stream === "diploma";
                          if (selectedSubCategory === "dm-all") return c.stream === "digital-marketing";
                          if (selectedSubCategory === "data-all") return c.stream === "data-analytics";
                          return true;
                        }).map(renderCourseCard)}
                      </div>
                    </div>
                  )}
                </>
              )}

            </motion.div>
          )}

          {/* ================= PAGE 3: ABOUT ================= */}
          {activePage === "about" && (
            <motion.div
              key="about-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <AccreditationSection />
            </motion.div>
          )}

          {/* ================= PAGE 4: FAQ ================= */}
          {activePage === "faq" && (
            <motion.div
              key="faq-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <FAQSection />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* POP-OUT ADMISSIONS FORM MODAL (ROYAL BLUE THEME) */}
      <AnimatePresence>
        {isApplyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsApplyModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative z-10 w-full max-w-lg bg-zinc-950/95 backdrop-blur-xl rounded-3xl shadow-[0_0_50px_rgba(59,130,246,0.3)] overflow-hidden text-white text-left border border-blue-500/40"
            >
              {/* TOP ROYAL BLUE GRADIENT HEADER BANNER */}
              <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 p-6 sm:p-7 text-white relative border-b border-blue-500/30">
                <button 
                  onClick={() => setIsApplyModalOpen(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer"
                >
                  <X size={18} />
                </button>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/30 text-blue-200 text-[10px] font-semibold tracking-widest uppercase mb-3 border border-white/20">
                  <span>🎓 ADMISSIONS OPEN 2026–27</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2 leading-tight drop-shadow-md">
                  Take Your First Step to Success!
                </h3>
                <p className="text-xs sm:text-sm text-blue-100 font-light leading-relaxed mb-4">
                  Fill this quick form & secure your certified batch slot with 1:1 Lab access!
                </p>

                <div className="flex flex-wrap items-center gap-3 text-[11px] font-medium text-white/90">
                  <span className="flex items-center gap-1"><CheckCircle2 size={13} className="text-emerald-400" /> Free Counselling</span>
                  <span className="flex items-center gap-1"><CheckCircle2 size={13} className="text-emerald-400" /> Instant Callback</span>
                  <span className="flex items-center gap-1"><CheckCircle2 size={13} className="text-emerald-400" /> Scholarship Check</span>
                </div>
              </div>

              {/* FORM BODY WITH DARK FUTURISTIC INPUTS */}
              {!applySubmitted ? (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    setApplySubmitted(true);
                  }}
                  className="p-6 sm:p-7 space-y-4 bg-zinc-950/80"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Student Name */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-blue-300">Student Name *</label>
                      <div className="relative">
                        <User size={16} className="absolute left-3.5 top-3.5 text-blue-400" />
                        <input 
                          type="text" 
                          required
                          value={applyForm.name}
                          onChange={(e) => setApplyForm(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="e.g., Riya Sharma"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white placeholder-zinc-500 text-xs focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all outline-none"
                        />
                      </div>
                    </div>

                    {/* Email Address */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-blue-300">Email Address *</label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-3.5 top-3.5 text-blue-400" />
                        <input 
                          type="email" 
                          required
                          value={applyForm.email}
                          onChange={(e) => setApplyForm(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="student@email.com"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white placeholder-zinc-500 text-xs focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all outline-none"
                        />
                      </div>
                    </div>

                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* WhatsApp Number */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-blue-300">WhatsApp Number *</label>
                      <div className="relative">
                        <Phone size={16} className="absolute left-3.5 top-3.5 text-blue-400" />
                        <input 
                          type="tel" 
                          required
                          value={applyForm.phone}
                          onChange={(e) => setApplyForm(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="e.g., 9876543210"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white placeholder-zinc-500 text-xs focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all outline-none"
                        />
                      </div>
                    </div>

                    {/* State / Region */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-blue-300">State / Region *</label>
                      <div className="relative">
                        <MapPin size={16} className="absolute left-3.5 top-3.5 text-blue-400 pointer-events-none" />
                        <select
                          value={applyForm.state}
                          onChange={(e) => setApplyForm(prev => ({ ...prev, state: e.target.value }))}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white text-xs focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all outline-none cursor-pointer"
                        >
                          {INDIAN_STATES.map((st, i) => (
                            <option key={i} value={st} className="bg-zinc-950 text-white">{st}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                  </div>

                  {/* Course Interested In (CATEGORIZED INTO SECTIONS) */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-blue-300">Course Interested In *</label>
                    <div className="relative">
                      <GraduationCap size={16} className="absolute left-3.5 top-3.5 text-blue-400 pointer-events-none" />
                      <select
                        value={applyForm.course}
                        onChange={(e) => setApplyForm(prev => ({ ...prev, course: e.target.value }))}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white text-xs focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all outline-none cursor-pointer"
                      >
                        <optgroup label="💻 SKILL INDIA & DIPLOMA PROGRAMMES" className="bg-zinc-900 text-blue-400 font-bold">
                          {COURSES.filter(c => c.stream === "diploma").map(course => (
                            <option key={course.id} value={course.title} className="bg-zinc-950 text-white">
                              {course.title} ({course.fullTitle || course.code})
                            </option>
                          ))}
                        </optgroup>

                        <optgroup label="🎓 REGULAR UNDERGRADUATE (UG) DEGREE PROGRAMMES" className="bg-zinc-900 text-blue-400 font-bold">
                          {COURSES.filter(c => c.stream === "regular" && c.level === "ug").map(course => (
                            <option key={course.id} value={course.title} className="bg-zinc-950 text-white">
                              {course.title} ({course.fullTitle || course.code})
                            </option>
                          ))}
                        </optgroup>

                        <optgroup label="💼 REGULAR POSTGRADUATE (PG) DEGREE PROGRAMMES" className="bg-zinc-900 text-blue-400 font-bold">
                          {COURSES.filter(c => c.stream === "regular" && c.level === "pg").map(course => (
                            <option key={course.id} value={course.title} className="bg-zinc-950 text-white">
                              {course.title} ({course.fullTitle || course.code})
                            </option>
                          ))}
                        </optgroup>

                        <optgroup label="🌐 DISTANCE LEARNING PROGRAMMES (UG & PG)" className="bg-zinc-900 text-blue-400 font-bold">
                          {COURSES.filter(c => c.stream === "distance").map(course => (
                            <option key={course.id} value={course.title} className="bg-zinc-950 text-white">
                              {course.title} ({course.fullTitle || course.code})
                            </option>
                          ))}
                        </optgroup>

                        <optgroup label="🚀 DIGITAL MARKETING & DATA ANALYTICS" className="bg-zinc-900 text-blue-400 font-bold">
                          {COURSES.filter(c => c.stream === "digital-marketing" || c.stream === "data-analytics").map(course => (
                            <option key={course.id} value={course.title} className="bg-zinc-950 text-white">
                              {course.title} ({course.fullTitle || course.code})
                            </option>
                          ))}
                        </optgroup>
                      </select>
                    </div>
                  </div>

                  {/* SUBMIT BLUE BUTTON */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-[0_0_25px_rgba(59,130,246,0.4)] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 border border-blue-500/40"
                    >
                      SUBMIT ENQUIRY NOW 🪄
                    </button>
                  </div>

                  <p className="text-[10px] text-center text-zinc-400 leading-tight">
                    By submitting, you agree to receive callbacks regarding admissions, batch slots, and scholarships.
                  </p>
                </form>
              ) : (
                <div className="p-8 text-center space-y-4 bg-zinc-950">
                  <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40 shadow-md">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-xl font-extrabold text-white">Enquiry Submitted Successfully!</h4>
                  <p className="text-zinc-300 text-xs leading-relaxed max-w-sm mx-auto">
                    Thank you <span className="font-bold text-blue-400">{applyForm.name}</span>! Our admission desk will call your WhatsApp number <span className="font-bold text-white">{applyForm.phone}</span> shortly regarding <span className="font-bold text-emerald-400">{applyForm.course}</span>.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setIsApplyModalOpen(false);
                        setApplySubmitted(false);
                        setApplyForm(prev => ({ ...prev, name: "", email: "", phone: "" }));
                      }}
                      className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all cursor-pointer shadow-md"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FOOTER (REMAINS AT BOTTOM OF EVERY PAGE) */}
      <footer id="contact" className="relative z-10 border-t border-blue-500/25 bg-zinc-950 text-white pt-16 pb-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
            
            {/* Column 1: Brand & Bio */}
            <div className="lg:col-span-4 space-y-5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md">
                  <GraduationCap size={20} />
                </div>
                <span className="font-display font-bold text-lg tracking-wide text-white">
                  IINT <span className="font-light text-blue-400">NETWORKING</span>
                </span>
              </div>

              <p className="text-xs sm:text-sm leading-relaxed font-light text-zinc-400">
                Indian Institute of Networking & Technology (Adarsh Computer Education). Empowering students with industry-grade IT skills, government-approved certifications, and hands-on networking expertise.
              </p>

              <div className="pt-2 space-y-2">
                <span className="text-[10px] font-mono uppercase text-blue-400 tracking-widest block font-semibold">Connect With Us</span>
                <div className="flex gap-2.5 flex-wrap">
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-blue-500/30 bg-zinc-900/80 text-zinc-300 hover:text-blue-400 text-xs transition-all cursor-pointer"
                  >
                    <Instagram size={14} className="text-blue-400" />
                    <span>@IINT_Rohtak</span>
                  </a>
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-blue-500/30 bg-zinc-900/80 text-zinc-300 hover:text-blue-400 text-xs transition-all cursor-pointer"
                  >
                    <Instagram size={14} className="text-blue-400" />
                    <span>Admissions Hub</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-xs font-mono uppercase text-blue-400 tracking-widest font-semibold border-b border-blue-500/20 pb-2.5">
                Quick Links
              </h4>
              <ul className="space-y-2.5 text-xs text-zinc-400">
                <li>
                  <button 
                    onClick={() => handleSwitchPage("home")} 
                    className="hover:text-white transition-colors flex items-center gap-1.5 hover:translate-x-1 duration-200 cursor-pointer"
                  >
                    <ChevronRight size={13} className="text-blue-400" />
                    <span>Home Page</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleSwitchPage("courses")} 
                    className="hover:text-white transition-colors flex items-center gap-1.5 hover:translate-x-1 duration-200 cursor-pointer"
                  >
                    <ChevronRight size={13} className="text-blue-400" />
                    <span>Programmes & Categories</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleSwitchPage("about")} 
                    className="hover:text-white transition-colors flex items-center gap-1.5 hover:translate-x-1 duration-200 cursor-pointer"
                  >
                    <ChevronRight size={13} className="text-blue-400" />
                    <span>About IINT & Story</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      setIsApplyModalOpen(true);
                      setApplySubmitted(false);
                    }}
                    className="hover:text-blue-400 text-blue-400 font-medium transition-colors flex items-center gap-1.5 hover:translate-x-1 duration-200 cursor-pointer text-left"
                  >
                    <ChevronRight size={13} className="text-blue-400" />
                    <span>Enquiry & Admission Form</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleSwitchPage("faq")} 
                    className="hover:text-white transition-colors flex items-center gap-1.5 hover:translate-x-1 duration-200 cursor-pointer"
                  >
                    <ChevronRight size={13} className="text-blue-400" />
                    <span>Frequently Asked Questions</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Dedicated Enquiry & Contact Numbers */}
            <div className="lg:col-span-5 space-y-4">
              <h4 className="text-xs font-mono uppercase text-blue-400 tracking-widest font-semibold border-b border-blue-500/20 pb-2.5">
                Dedicated Enquiry Numbers & Contact
              </h4>

              <div className="space-y-3">
                {/* Main Enquiry Card */}
                <div className="p-4 rounded-xl border border-blue-500/30 bg-zinc-900/60 hover:border-blue-500/60 transition-all flex items-center justify-between gap-3 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-600/15 text-blue-400 rounded-lg border border-blue-500/30">
                      <Phone size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">Official Enquiry Number</p>
                      <a href="tel:+919812543111" className="font-bold text-sm text-white hover:text-blue-400 transition-colors">
                        +91 98125 43111
                      </a>
                    </div>
                  </div>
                  <a 
                    href="tel:+919812543111"
                    className="px-3.5 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-xs font-semibold transition-all cursor-pointer shrink-0 shadow-sm"
                  >
                    Call Now
                  </a>
                </div>

                {/* Admission Helpline Card */}
                <div className="p-4 rounded-xl border border-blue-500/30 bg-zinc-900/60 hover:border-blue-500/60 transition-all flex items-center justify-between gap-3 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-600/15 text-blue-400 rounded-lg border border-blue-500/30">
                      <Phone size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">Admission Helpline Desk</p>
                      <a href="tel:+919711375732" className="font-bold text-sm text-white hover:text-blue-400 transition-colors">
                        +91 97113 75732
                      </a>
                    </div>
                  </div>
                  <a 
                    href="tel:+919711375732"
                    className="px-3.5 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-xs font-semibold transition-all cursor-pointer shrink-0 shadow-sm"
                  >
                    Call Desk
                  </a>
                </div>

                {/* Email & Location details */}
                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg border border-blue-500/20 bg-zinc-900/40 text-zinc-300 flex items-center gap-2">
                    <Mail size={14} className="text-blue-400 shrink-0" />
                    <span className="truncate">info@iintinstitute.com</span>
                  </div>
                  <div className="p-3 rounded-lg border border-blue-500/20 bg-zinc-900/40 text-zinc-300 flex items-center gap-2">
                    <MapPin size={14} className="text-blue-400 shrink-0" />
                    <span className="truncate">Adarsh Computer Education, Narela</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Bottom Copyright Bar */}
          <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] font-mono text-zinc-400">
            <div>
              <p>© 2026 Indian Institute of Networking & Technology (Adarsh Computer Education). All rights reserved.</p>
              <p className="text-blue-400 mt-0.5 font-semibold">Authorized Training Partner • UGC Approved Universities • ISO 9001:2015 Certified Academy</p>
            </div>
            <div className="flex items-center gap-4 text-zinc-500">
              <span>Narela</span>
              <span>•</span>
              <span>Haryana & Delhi</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
