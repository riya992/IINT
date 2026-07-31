import { useEffect, useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BookOpen, 
  Cpu, 
  ShieldCheck, 
  Layers, 
  Activity, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ArrowRight, 
  ArrowLeft,
  GraduationCap, 
  CheckCircle2, 
  Award, 
  Globe, 
  ChevronRight,
  Server,
  Zap,
  Users,
  Building,
  Play,
  Youtube,
  ExternalLink,
  Star,
  Instagram,
  Briefcase,
  Monitor
} from "lucide-react";
import ParticleCanvas from "./components/ParticleCanvas";
import NavigationBar from "./components/NavigationBar";
import FAQSection from "./components/FAQSection";
import AccreditationSection from "./components/AccreditationSection";
import CertificationBadges from "./components/CertificationBadges";
import Footer from "./components/Footer";
import HomeAboutPreview from "./components/HomeAboutPreview";
import HomePopularCourses from "./components/HomePopularCourses";
import HomeWhyIINT from "./components/HomeWhyIINT";
import HomeStudentReviews from "./components/HomeStudentReviews";
import HomeFAQPreview from "./components/HomeFAQPreview";
import ContactSection from "./components/ContactSection";
import EligibilityCriteria from "./components/EligibilityCriteria";
import GallerySection from "./components/GallerySection";
import RightFloatingDock from "./components/RightFloatingDock";
import { CourseDetailModal } from "./components/CourseDetailModal";
import QueryAIAssistant from "./components/QueryAIAssistant";
import { getCourseBgImage } from "./lib/courseImages";
import { submitStudentEnquiry } from "./lib/googleSheetApi";
import { saveWhatsAppEnquiry } from "./lib/whatsapp";

// Authentic IINT & Adarsh Education Course List
const COURSES = [
  {
    id: "digital-marketing-ai",
    code: "DM-AI",
    title: "Digital Marketing & AI Master Program",
    category: "Digital Programs",
    stream: "computer-diplomas",
    duration: "2, 3, 6 & 12 Months",
    certification: "2 & 3-Month Short Certificates, 6-Month Professional Certificate & 12-Month Master Diploma",
    courseOptions: [
      {
        title: "2-Month / 3-Month Short Certificate Modules",
        desc: "Enroll in individual targeted modules to earn standalone short certificates (e.g., Meta Ads Specialist, Google Ads & PPC, Technical SEO & Local Business, Generative AI & Prompt Engineering, Social Media Reels & Content Creation)."
      },
      {
        title: "6-Month Professional Certification",
        desc: "Core Digital Marketing, Performance Marketing (Meta & Google Ads), SEO, Social Media, and Generative AI Tools."
      },
      {
        title: "12-Month Master Diploma in Digital Marketing & AI",
        desc: "Advanced Master Diploma with Agency Live Accounts Internship, Capstone Projects, High-ROAS Scaling & Freelance Client Acquisition."
      }
    ],
    performanceMarketing: [
      "Meta Ads Manager: Facebook & Instagram Ads, Campaign Budget Optimization (CBO), Custom & Lookalike Audiences",
      "Google Ads Suite: Search, Display, Shopping, YouTube Video Ads, Smart Bidding, and Keyword Match Types",
      "Conversion Tracking & CAPI: Meta Pixel & Conversions API (CAPI) setup, Server-side tracking, Retargeting Funnels",
      "High-ROAS Optimization: Scaling profitable ad sets, Reducing Cost Per Lead (CPL), Landing Page A/B Testing"
    ],
    purposes: [
      {
        title: "Purpose 1: For Business Owners & Entrepreneurs",
        target: "Business Growth & Direct Sales Expansion",
        points: [
          "High-Converting Lead Generation & Sales Funnel Architecture",
          "Google Business Profile & Local Search Dominance for Storefronts",
          "Brand Positioning, Social Media Authority & Engagement Building",
          "Ad Budget Optimization, CPL Reduction & High Return on Ad Spend (ROAS)",
          "AI Chatbot Setup for Automated 24/7 Customer Support & Lead Nurturing"
        ]
      },
      {
        title: "Purpose 2: For Education & Career Job Seekers",
        target: "Corporate Careers, Agency Positions & Freelancing",
        points: [
          "Full-Stack Marketing Strategy & Technical/On-Page/Off-Page SEO",
          "Performance Marketing Mastery (Google Ads, Meta Ads & LinkedIn Ads)",
          "Generative AI & Prompt Engineering (ChatGPT 4o, Gemini, Midjourney, Canva AI)",
          "Social Media Management, Reels/Shorts Strategy & Viral Video Marketing",
          "Email Marketing Automation, CRM Pipelines & Lead Nurturing Sequences",
          "Google Analytics 4 (GA4), Campaign Auditing, Capstone Projects & Placement Portfolio"
        ]
      }
    ],
    description: "Our flagship comprehensive Digital Marketing & AI program with dual certification paths (6-Month Certificate & 12-Month Master Diploma). Features hands-on Performance Marketing (Meta Ads, Google Ads, ROAS optimization) tailored specifically for both Business Growth and Career Job Seekers.",
    syllabus: [
      "Module 1 - Search Engine Optimization (SEO & Local SEO): On-page SEO, technical audits, Google Search Console, keyword mapping, schema markup, and Google Business Profile local ranking",
      "Module 2 - Performance Marketing & Paid Ad Suite: Meta Ads Manager (Facebook & Instagram), Google Search/Display/Shopping/YouTube Ads, Conversions API (CAPI), and CBO/ABO budget scaling",
      "Module 3 - Social Media Growth & Viral Content: Content calendars, copywriting formulas, Instagram Reels & YouTube Shorts strategy, brand voice positioning, and engagement analytics",
      "Module 4 - Generative AI & Prompt Engineering: ChatGPT 4o & Gemini prompt engineering for ad copy, Midjourney/Canva AI graphics, AI video tools, and automated workflow triggers",
      "Module 5 - Email Marketing, CRM & Automation: Lead magnets, Mailchimp & Brevo sequences, CRM pipeline tracking, drip campaigns, and automated sales funnels",
      "Module 6 - Web Analytics (GA4), CRO & Capstone Portfolio: Google Analytics 4 tracking, Conversion Rate Optimization (CRO), A/B split testing, live client projects, and job placement portfolio"
    ],
    highlight: "100% practical lab training with dual 6-Month Certificate & 12-Month Master Diploma options, Performance Marketing live ad accounts, and dedicated business/job tracks.",
    careerPath: "Performance Marketing Lead, Digital Marketing Strategist, SEO Specialist, Agency Owner, Social Media Manager, AI Content Creator",
    color: "from-purple-500/20 to-fuchsia-500/20 border-purple-500/30 text-purple-400"
  },
  {
    id: "data-analytics",
    code: "DA-BI",
    title: "Data Analytics & Business Intelligence Program",
    category: "Digital Programs",
    stream: "computer-diplomas",
    duration: "2, 3, 6 & 12 Months",
    certification: "2 & 3-Month Short Certificates, 6-Month Professional Certificate & 12-Month Master Diploma",
    courseOptions: [
      {
        title: "2-Month / 3-Month Short Certificate Modules",
        desc: "Enroll in individual targeted modules for standalone short certificates (e.g., Advanced MS Excel & Pivot Analytics, SQL Database Engineering, Power BI & Tableau Dashboarding, Python for Data Science & Pandas)."
      },
      {
        title: "6-Month Professional Certification",
        desc: "Advanced MS Excel, SQL Querying, Power BI Interactive Dashboards, and Business Analytics."
      },
      {
        title: "1-Year Master Diploma in Data Analytics & Data Science",
        desc: "Full-Stack Analytics with Python, Advanced SQL, Power BI & Tableau, Predictive Modeling, Machine Learning Basics, and Real-World Capstones."
      }
    ],
    description: "Deep, industry-aligned Data Analytics & Business Intelligence program. Master the complete data pipeline: Extracting from SQL databases, cleaning with Power Query/Pandas, modeling with DAX, building interactive Power BI & Tableau dashboards, and performing predictive analysis with Python.",
    purposes: [
      {
        title: "Purpose 1: For MIS, Reporting & Business Managers",
        target: "Automated Reporting, Dashboards & Corporate Decision Making",
        points: [
          "Advanced Excel Automated Spreadsheets, Pivot Tables & Power Query ETL",
          "Interactive Executive Dashboards in Power BI & Tableau for Real-time Insights",
          "SQL Database Querying for On-Demand Corporate Data Extraction",
          "Financial Modeling, Forecasting & Business Trend Analysis",
          "Automated Data Refresh Pipelines & KPI Monitoring"
        ]
      },
      {
        title: "Purpose 2: For Job Seekers & Future Data Analysts",
        target: "Data Analyst, BI Developer & Analytics Careers",
        points: [
          "Full-Stack Data Engineering: SQL Joins, CTEs, Window Functions & Optimization",
          "Exploratory Data Analysis (EDA) with Python, Pandas & NumPy",
          "Data Visualization & Storytelling with Matplotlib, Seaborn & Power BI DAX",
          "Applied Business Statistics, Hypothesis Testing & Machine Learning Basics",
          "Real-World Industry Capstone Projects, GitHub Portfolio & 100% Placement Support"
        ]
      }
    ],
    syllabus: [
      "Module 1 - Advanced MS Excel for Business Analytics: Advanced VLOOKUP, XLOOKUP, INDEX-MATCH, Nested Logic, Pivot Tables, Slicers, Power Query ETL (Extract, Transform, Load), Data Cleaning, Financial Modeling, What-If Analysis, and Executive Reporting Dashboards",
      "Module 2 - SQL Database Engineering & Querying: Relational Database Management Systems (RDBMS), DDL/DML/DQL Commands, Primary & Foreign Key Schemas, Multi-table INNER/LEFT/RIGHT/FULL JOINs, Subqueries, Window Functions (OVER, PARTITION BY, RANK), Common Table Expressions (CTEs), Views, Stored Procedures, and Query Optimization",
      "Module 3 - Power BI & Tableau Dashboard Design: Data Modeling, Star Schema, Snowflake Schema, DAX (Data Analysis Expressions) calculated columns and measures, Interactive Dashboard Visuals, KPI Cards, Drill-through Reports, Publishing to Power BI Service, and Automated Data Refresh Pipelines",
      "Module 4 - Python for Data Science & Exploratory Data Analysis (EDA): Python Fundamentals, Jupyter Notebooks, NumPy for multidimensional array math, Pandas DataFrames for data manipulation, cleaning missing values, handling duplicates, and Data Visualization with Matplotlib & Seaborn",
      "Module 5 - Applied Business Statistics & Predictive Analytics: Descriptive & Inferential Statistics (Mean, Median, Standard Deviation, Variance, Hypothesis Testing), Correlation Analysis, Linear & Logistic Regression Modeling, Machine Learning Fundamentals with Scikit-Learn",
      "Module 6 - Real-World Capstone Projects & Portfolio: Hands-on analysis of end-to-end industry datasets (E-commerce Sales, Healthcare Analytics, Financial Risk Assessment), Live Executive Dashboard Presentation, GitHub & LinkedIn Portfolio Building, Mock Interviews, and 100% Placement Support"
    ],
    highlight: "Comprehensive practical training with real-world industry datasets, live dashboard publishing, and 100% placement support for MIS & Analyst roles.",
    careerPath: "Data Analyst, Power BI Developer, Business Intelligence Analyst, SQL DB Administrator, MIS Reporting Executive, Python Analytics Specialist",
    color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400"
  },
  {
    id: "office-automation",
    code: "OA-BASICS",
    title: "Office Automation",
    category: "Office Productivity",
    stream: "computer-diplomas",
    duration: "3 Months",
    certification: "Certified Office Automation Specialist",
    description: "Master complete office productivity tools and operating systems. Learn Microsoft Word, PowerPoint, MS Paint, Windows Administration, and general Internet skills.",
    syllabus: [
      "Computer Fundamentals & OS: Windows 11 system navigation, settings, and files",
      "MS Word: Advanced formatting, letter drafting, mail merge, and official documentation",
      "MS PowerPoint: Slide masters, interactive triggers, visual animations, and templates",
      "Internet Core: Email management, web searching, digital security, and online transactions",
      "MS Paint & Basic Imaging: Digital image resizing, cropping, and format conversion",
      "System Utilities: File compression, folder password settings, security, and backup recovery"
    ],
    highlight: "Highly recommended for clerical, data entry, front desk, and administrative roles.",
    color: "from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-400"
  },
  {
    id: "dtp",
    code: "DTP-GRAPHICS",
    title: "DTP (Photoshop / CorelDraw)",
    category: "Graphic Design",
    stream: "computer-diplomas",
    duration: "3 Months",
    certification: "Certified Desktop Publishing (DTP) & Graphics Expert",
    description: "Learn professional image editing and vector graphic designing. Design brochures, posters, business cards, banners, and vector assets.",
    syllabus: [
      "Adobe Photoshop: Image touchups, layer panels, maskings, grading, and poster creations",
      "CorelDraw: Vector illustrations, corporate logos, vector tracing, and packaging layouts",
      "Adobe PageMaker: Newsletter structures, magazine printing design, and books formatting",
      "Typography & Color Space: Color spectrum models (CMYK vs RGB) and dynamic font pairing",
      "Pre-Print Output: PDF optimizations, resolution scale methods, and commercial publishing standards"
    ],
    highlight: "Perfect for digital printing shops, marketing creators, and freelance graphics design projects.",
    color: "from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400"
  },
  {
    id: "languages",
    code: "PROG-LANG",
    title: "Programming Languages (C, C++, Java, Python)",
    category: "Software Engineering",
    stream: "computer-diplomas",
    duration: "4 Months",
    certification: "Certified Professional Software Coder",
    description: "Master absolute programming logic from basic syntax structure to advanced Object-Oriented paradigms (OOPs) in four of the most popular languages.",
    syllabus: [
      "C Language Core: Variable declaration, conditions, loops, array matrices, and pointers",
      "C++ Object-Oriented: Classes, encapsulated fields, inheritance, and dynamic polymorphism",
      "Core Java: JVM structure, compiler execution, thread routines, interfaces, and packages",
      "Python Basics: Indent syntax, dynamic dictionary methods, file lists, and writing scripts"
    ],
    highlight: "Essential foundation for engineering students, software testers, and database builders.",
    color: "from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-blue-400"
  },
  {
    id: "web-designing",
    code: "WEB-DESIGN",
    title: "Web Designing",
    category: "Web Development",
    stream: "computer-diplomas",
    duration: "3 Months",
    certification: "Certified Frontend Web Designer",
    description: "Create beautiful responsive modern websites. Master semantic HTML markup, advanced CSS layout systems, interactive styling, and bootstrap grids.",
    syllabus: [
      "HTML5 Semantics: DOM hierarchy, structural blocks, native media players, and form controls",
      "CSS3 Layouts: Modern Flexbox setups, grid calculations, custom animations, and media breakpoints",
      "Bootstrap & Tailwind: Responsive grid scaling, helper utilities, and responsive layouts",
      "JavaScript Basics: Dynamic DOM updates, interactive forms, dynamic variables, and operations",
      "Domain Hosting Deployment: FTP file transfers, web hosting panels, and DNS setup"
    ],
    highlight: "Ideal for UX designers, web bloggers, content creators, and frontend career builders.",
    color: "from-orange-500/20 to-red-500/20 border-orange-500/30 text-orange-400"
  },
  {
    id: "english-speaking",
    code: "ENG-SPEAKING",
    title: "English Speaking & Personality Development",
    category: "Language & Soft Skills",
    stream: "computer-diplomas",
    duration: "3 Months",
    certification: "Professional Communicator and Personality Development Certificate",
    description: "Build supreme confidence in professional English. Master conversational vocabulary, interview body language, and daily communication skills.",
    syllabus: [
      "Grammar Basics: Structural tenses, passive voices, direct speeches, and syntax styling",
      "Vocabulary Builder: Corporate jargon, casual idioms, and drafting professional emails",
      "Spoken Exercises: Situational dialogue, speech fluency, and stage confidence build",
      "Interview Cracking: Resume editing, body gestures, posture, and answering tricky questions",
      "Group Discussions: Presenting views logically, argument handling, and meeting protocols"
    ],
    highlight: "Dramatically improves interview performance and corporate desk presentation.",
    color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400"
  },
  {
    id: "advance-excel",
    code: "EXCEL-ADV",
    title: "Advance Excel",
    category: "Business Intelligence",
    stream: "computer-diplomas",
    duration: "2 Months",
    certification: "Certified Advance Excel Specialist",
    description: "Master corporate spreadsheet calculations, analytical modeling, dynamic dashboards, and automated report generators.",
    syllabus: [
      "Advanced Functions: VLOOKUP, HLOOKUP, XLOOKUP, INDEX-MATCH formulas, and calculations",
      "Data Refinement: Clean values, dynamic conditional styling, and custom data validates",
      "Pivot Matrix Reporting: Multi-dimension pivot charts, timelines, custom filter slicers",
      "Macro Automations: Recording repetitive tasks, basic VBA scripts, and automated sheets",
      "Power Query Setup: Dynamic data loading, column merges, and spreadsheet transformations"
    ],
    highlight: "Highly critical for sales analysts, HR assistants, back office administrators, and accountants.",
    color: "from-amber-500/20 to-yellow-500/20 border-amber-500/30 text-amber-400"
  },
  {
    id: "sql",
    code: "SQL-DB",
    title: "SQL & Database Management",
    category: "Database",
    stream: "computer-diplomas",
    duration: "2 Months",
    certification: "Certified SQL Database Developer",
    description: "Learn how to query, model, design, and manage large databases. Master SQL queries, database indexing, normalization, and relational layouts.",
    syllabus: [
      "Database Modeling: Entity mapping, relational models, primary keys, and foreign keys",
      "SQL Selection Core: Query structures, SELECT, WHERE conditions, ORDER BY, and LIMIT clauses",
      "Table Joins & Aggregates: INNER, LEFT, RIGHT, OUTER joins, GROUP BY, and HAVING aggregate filters",
      "SQL Subqueries: Multi-level subqueries, temp tables, nested operations, and database views",
      "DB Normalization: Database index optimizations, 1NF/2NF/3NF schemas, and performance tuning"
    ],
    highlight: "Highly professional skill for database managers, backend coders, and data engineers.",
    color: "from-cyan-500/20 to-teal-500/20 border-cyan-500/30 text-cyan-400"
  },
  {
    id: "dca",
    code: "DCA",
    title: "Diploma in Computer Applications (DCA)",
    category: "Computer & IT Diploma/Skill Programmes",
    stream: "computer-diplomas",
    duration: "12 Months",
    certification: "State Board Approved DCA Diploma & ISO 9001:2015 Certification",
    description: "A highly detailed professional-grade computer applications program. Tailored for absolute beginners to master operating system layers, official administrative office packages, basic internet security, database configurations, and computerized spreadsheet automation.",
    syllabus: [
      "Module 1 - Computer Fundamentals & OS: Computer history, input/output devices, hardware architectures, and Windows Operating System custom controls",
      "Module 2 - MS Office Suite: Advanced MS Word formatting, structural templates, MS Excel spreadsheet calculation formulas, and MS PowerPoint presentation animation layers",
      "Module 3 - MS Access DBMS: Creating database tables, query setups, data filters, database forms design, and basic relational structures",
      "Module 4 - Internet & Digital Media: Electronic emails setup, advanced search filters, safe online browsing guidelines, e-governance systems, and digital utility configuration"
    ],
    highlight: "Extremely popular for securing computer-operator, clerical, and admin assistant roles in both government and private sectors.",
    color: "from-rose-500/20 to-orange-500/20 border-rose-500/30 text-rose-400"
  },
  {
    id: "adca",
    code: "ADCA",
    title: "Advanced Diploma in Computer Applications (ADCA)",
    category: "Computer & IT Diploma/Skill Programmes",
    stream: "computer-diplomas",
    duration: "1 Year",
    certification: "National Level Registered ADCA Diploma (Govt. Approved)",
    description: "Our flagship advanced 1-year diploma program that comprehensively covers basic computing, administrative office management, expert graphic designing (DTP), financial accounting software (Tally Prime), and fundamental responsive website architecture.",
    syllabus: [
      "Semester 1 - Computing & Office Productivity: Full DCA syllabus, advanced keyboarding, MS Office suite expert levels, and basic internet technologies",
      "Semester 2 - Desktop Publishing (DTP): Professional graphic design using Adobe Photoshop, CorelDraw vector graphics, Adobe PageMaker brochure layouts, print output setups, and digital asset creations",
      "Semester 3 - Financial Accounting with GST: Double-entry bookkeeping concepts, invoice handling, computerized financial accounting via Tally Prime, and statutory GST/TDS filiations",
      "Semester 4 - Frontend Web Technology: Creating clean landing pages using semantic HTML5 code, responsive CSS3 styling structures, bootstrap responsive grids, and basic JavaScript interactions"
    ],
    highlight: "Comprehensive 1-year master diploma credential that maximizes career-readiness for multiple technical domains.",
    color: "from-blue-600/20 to-violet-600/20 border-blue-500/30 text-blue-400"
  },
  {
    id: "accounting",
    code: "Acc-Tally",
    title: "Professional Accounting & Tally Prime with GST",
    category: "Financial Systems",
    stream: "computer-diplomas",
    duration: "3 Months",
    certification: "Certified Corporate Tally Prime & GST Specialist",
    description: "A highly detailed financial account management course. Learn real double-entry book-keeping, inventory pipelines, statutory taxation (GST), and direct payroll systems inside Tally Prime.",
    syllabus: [
      "Module 1 - Financial Accounting Core: Accounting principles, journal vouchers entry, trial balances, double-entry book-keeping, and financial reports structure",
      "Module 2 - Tally Prime Working Setup: Company configuration, master registries, ledger creation, voucher creations, and security system setups",
      "Module 3 - Inventory Management Systems: Batch-wise storage tracking, stock groups management, price lists setups, godown allocations, and purchase/sales pipelines",
      "Module 4 - Statutory Taxation (GST & TDS): SGST, CGST, IGST calculations, dynamic e-way bill generation, input tax credit (ITC) setups, GST filing, and basic TDS salary tax entries"
    ],
    highlight: "Directly tailored for modern corporate accounts desks, retail bookkeeping, and fiscal auditing.",
    color: "from-indigo-500/20 to-purple-500/20 border-indigo-500/30 text-indigo-400"
  },
  {
    id: "hardware-networking",
    code: "HW-NET",
    title: "Diploma in Hardware & Networking",
    category: "Infrastructure",
    stream: "computer-diplomas",
    duration: "6 Months",
    certification: "Certified Computer Hardware & Networking Engineer",
    description: "Practical engineering setup covering device assembly, bios parameters, server configurations, routing setups, IP protocols, and network troubleshooting.",
    syllabus: [
      "Module 1 - Hardware Components: Microprocessors, Motherboards, RAM types, SMPS, BIOS setup, Hard drive configurations, and PC Assembly",
      "Module 2 - OS & Softwares: Operating System installation (Windows 10/11, Windows Server, Linux), driver configurations, system tools, and antivirus suites",
      "Module 3 - Networking Foundations: OSI layer reference model, TCP/IP setup, IP addressing (IPv4 vs IPv6), Subnetting, and cable crimping (Straight, Cross, Rollover)",
      "Module 4 - Network Administration: Switch configurations, Router settings, Wi-Fi router setup, DHCP servers, DNS configurations, and troubleshooting tools"
    ],
    highlight: "Perfect for technical support, network operators, system admins, and hardware repair desks.",
    color: "from-red-500/20 to-pink-500/20 border-red-500/30 text-red-400"
  },
  {
    id: "pgdca-distance",
    code: "PGDCA",
    title: "Post Graduate Diploma in Computer Applications (PGDCA)",
    category: "Computer & IT Diploma/Skill Programmes",
    stream: "computer-diplomas",
    duration: "1 Year (Flexible Mode)",
    certification: "University Approved PG Diploma (UGC Recognized)",
    description: "A comprehensive graduate-level flexible computer applications curriculum designed for aspiring professionals and graduates seeking formal tech credentials. Features continuous virtual lab access.",
    syllabus: [
      "Semester 1 - IT Systems & Programming: Advanced IT infrastructure, operating system environments, computer logic architectures, and programming via C++",
      "Semester 2 - DBMS & Software Engineering: Relational Database structures, SQL query optimization, Software development lifecycles, and Agile methodologies",
      "Semester 3 - Web Technologies & Networks: Web servers, HTML5, CSS3, Javascript frontend deployment, computer networks architecture, and cyber law codes"
    ],
    highlight: "Highly prestigious Post Graduate credential recognized across both government and corporate sectors.",
    color: "from-teal-500/20 to-emerald-500/20 border-teal-500/30 text-teal-400"
  },
  {
    id: "bed",
    code: "BED-UNIV",
    title: "Bachelor of Education (B.Ed)",
    category: "Teacher Training Programmes",
    stream: "teacher-training",
    duration: "2 Years",
    certification: "MDU / CRSU Approved & NCTE Recognized",
    description: "A professional degree preparing teachers for secondary and senior secondary schools. Focuses on developmental psychology, educational philosophy, guidance and counseling, and extensive pedagogical techniques.",
    syllabus: [
      "Year 1 - Foundational Pedagogy: Childhood & Growing Up, Contemporary India & Education, Learning and Teaching methods, Language across curriculum",
      "Year 1 - Methods: Pedagogy of School Subjects, Understanding Disciplines, Drama and Art in Education",
      "Year 2 - Professional Expertise: Knowledge & Curriculum, Assessment for Learning, Creating an Inclusive School, Gender, School and Society",
      "Year 2 - Practicals: School Internship, Teaching practice portfolios, and viva-voce evaluations"
    ],
    highlight: "Highly prestigious teacher qualification mandatory for TGT and PGT government job qualifications.",
    color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400"
  },
  {
    id: "deled",
    code: "DELED-JBT",
    title: "Diploma in Elementary Education (D.El.Ed / JBT)",
    category: "Teacher Training Programmes",
    stream: "teacher-training",
    duration: "2 Years",
    certification: "SCERT Board Approved & NCTE Recognized",
    description: "A foundational teacher preparation course designed for primary school instruction. Imparts teaching strategies, active learning, child psychology, and elementary subject teaching.",
    syllabus: [
      "Year 1 - Core Theory: Childhood and Development of Children, Education Society and Curriculum, Pedagogy across Curriculum",
      "Year 1 - Skill Core: Proficiency in English & Hindi, Mathematics Education, Environmental Studies Education",
      "Year 2 - Classroom Practice: Cognition Learning and Socio-Cultural Context, School Culture Leadership, Diversity & Inclusive Education",
      "Year 2 - Practicals: School Internship & Teaching Practice files, Self-Development workshops"
    ],
    highlight: "Essential and popular program for securing Primary Teacher (PRT) openings in State schools.",
    color: "from-violet-500/20 to-indigo-500/20 border-violet-500/30 text-violet-400"
  },
  {
    id: "med",
    code: "MED-UNIV",
    title: "Master of Education (M.Ed)",
    category: "Teacher Training Programmes",
    stream: "teacher-training",
    duration: "2 Years",
    certification: "University Approved Postgraduate Degree",
    description: "An elite postgraduate academic program focused on advanced research, instructional design, administration, policy-making, and specialized teacher education.",
    syllabus: [
      "Semester 1 & 2 - Core Studies: Historical, Political & Economic Foundations, Psychology of Learning, Education Studies",
      "Semester 1 & 2 - Research Core: Methodology of Educational Research, Tool Development, Information Communication Techs in Education",
      "Semester 3 & 4 - Administration: Teacher Education, Educational Administration & Leadership, Curriculum Studies",
      "Semester 3 & 4 - Thesis: Dissertation thesis submission, Viva Voce, and specialized institutional internship"
    ],
    highlight: "Perfect for becoming a lecturer in B.Ed/D.El.Ed colleges, research officer, or senior school principal.",
    color: "from-pink-500/20 to-rose-500/20 border-pink-500/30 text-pink-400"
  },
  {
    id: "bca-univ",
    code: "BCA",
    title: "Bachelor of Computer Applications (BCA)",
    category: "Undergraduate (UG) Programmes",
    stream: "ug-programmes",
    duration: "3 Years (6 Semesters)",
    certification: "UGC Recognized University Bachelor Degree",
    description: "Bachelor of Computer Applications focusing on software engineering and web development.",
    syllabus: [
      "Semester 1 & 2 - Foundation: C Programming, Discrete Mathematics, Computer Fundamentals, Communication English",
      "Semester 3 & 4 - Core Logic: Data Structures with C++, Operating Systems, Database Management Systems (Oracle SQL), Java Programming",
      "Semester 5 & 6 - Modern Tech: Web Technologies (React & Node), Software Engineering, Python Programming, Live Capstone Project"
    ],
    highlight: "High-demand undergraduate degree focusing on software engineering, web development, and IT placements.",
    color: "from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400"
  },
  {
    id: "mca-univ",
    code: "MCA",
    title: "Master of Computer Applications (MCA)",
    category: "Postgraduate (PG) Programmes",
    stream: "pg-programmes",
    duration: "2 Years (4 Semesters)",
    certification: "UGC Recognized Master Degree",
    description: "Master of Computer Applications for advanced software development and systems design.",
    syllabus: [
      "Semester 1 & 2: Advanced Software Architecture, Design Patterns, Enterprise Java, Data Structures & Algorithms",
      "Semester 3 & 4: Cloud Computing & DevOps, Cyber Security, AI & Machine Learning, 6-Month Industrial Capstone"
    ],
    highlight: "High-tier academic program focusing on advanced software architectures, strategic tech leadership, and AI.",
    color: "from-teal-500/20 to-emerald-500/20 border-teal-500/30 text-teal-400"
  },
  {
    id: "bba-univ",
    code: "BBA",
    title: "Bachelor of Business Administration (BBA)",
    category: "Undergraduate (UG) Programmes",
    stream: "ug-programmes",
    duration: "3 Years (6 Semesters)",
    certification: "UGC Recognized University Bachelor Degree",
    description: "Bachelor of Business Administration covering core management and entrepreneurship.",
    syllabus: [
      "Semester 1 & 2 - Business Foundations: Business Organization, Financial Accounting, Micro Economics, Business Communication",
      "Semester 3 & 4 - Management Core: Organizational Behavior, Marketing Management, Human Resource Management, Cost Accounting",
      "Semester 5 & 6 - Leadership & Strategy: Strategic Management, Entrepreneurship, Business Laws, Consumer Behavior, Corporate Internship"
    ],
    highlight: "Prepares students for core managerial positions, corporate decision-making, and MBA progression.",
    color: "from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400"
  },
  {
    id: "bba-aviation",
    code: "BBA-AM",
    title: "BBA Aviation Management",
    category: "Undergraduate (UG) Programmes",
    stream: "ug-programmes",
    duration: "3 Years (6 Semesters)",
    certification: "Specialized Aviation Business Degree",
    description: "Specialized aviation business administration program for airport and airline management.",
    syllabus: [
      "Semester 1 & 2: Aviation Fundamentals, Airline Management, Airport Operations & Services, Business Communication",
      "Semester 3 & 4: Passenger Transport Logistics, Aviation Security & Safety Standards, Air Cargo Operations, Accounting",
      "Semester 5 & 6: International Aviation Laws & IATA Regulations, Customer Service Management, Airport On-Site Internship"
    ],
    highlight: "Dedicated program for high-growth executive roles in international airports, ground handling, and commercial airlines.",
    color: "from-sky-500/20 to-indigo-500/20 border-sky-500/30 text-sky-400"
  },
  {
    id: "mba-univ",
    code: "MBA",
    title: "Master of Business Administration (MBA)",
    category: "Postgraduate (PG) Programmes",
    stream: "pg-programmes",
    duration: "2 Years (4 Semesters)",
    certification: "UGC Recognized Master Degree",
    description: "Master of Business Administration for strategic management leadership.",
    syllabus: [
      "Semester 1 & 2: Management Principles, Managerial Economics, Financial Management, Organizational Behavior, Marketing Core",
      "Semester 3 & 4: Strategic Management, Corporate Governance, Leadership & Ethics, Dual Specialization Capstone Project"
    ],
    highlight: "High-tier academic program focusing on strategic leadership, executive decision making, and consulting.",
    color: "from-rose-500/20 to-purple-500/20 border-rose-500/30 text-rose-400"
  },
  {
    id: "mba-aviation",
    code: "MBA-AM",
    title: "MBA Aviation Management",
    category: "Postgraduate (PG) Programmes",
    stream: "pg-programmes",
    duration: "2 Years (4 Semesters)",
    certification: "UGC Recognized Postgraduate Degree",
    description: "Specialized postgraduate aviation administration for global airline management.",
    syllabus: [
      "Semester 1 & 2: Global Airline Economics, Airport Fleet Operations, International Aviation Laws, Executive Business Strategy",
      "Semester 3 & 4: Aviation Safety Management Systems, Global Supply Chains in Aviation, Airport Revenue Models, Capstone Thesis"
    ],
    highlight: "Specialized executive qualification for international airport management and airline directors.",
    color: "from-indigo-500/20 to-blue-500/20 border-indigo-500/30 text-indigo-400"
  },
  {
    id: "mba-finance",
    code: "MBA-FIN",
    title: "MBA Finance",
    category: "Postgraduate (PG) Programmes",
    stream: "pg-programmes",
    duration: "2 Years (4 Semesters)",
    certification: "UGC Recognized Postgraduate Degree",
    description: "Advanced business degree specializing in investment management and corporate finance.",
    syllabus: [
      "Semester 1 & 2: Corporate Finance, Advanced Financial Accounting, Portfolio Management, Quantitative Methods",
      "Semester 3 & 4: Security Analysis, Financial Risk & Derivatives, Investment Banking, Corporate Tax Planning"
    ],
    highlight: "Specializes in investment banking, equity research, portfolio management, and corporate financial leadership.",
    color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400"
  },
  {
    id: "mba-hr",
    code: "MBA-HR",
    title: "MBA HR",
    category: "Postgraduate (PG) Programmes",
    stream: "pg-programmes",
    duration: "2 Years (4 Semesters)",
    certification: "UGC Recognized Postgraduate Degree",
    description: "Postgraduate specialization in human resource planning and organizational behavior.",
    syllabus: [
      "Semester 1 & 2: Organizational Behavior, Talent Acquisition & Recruitment, Labor Laws, Compensation & Benefits",
      "Semester 3 & 4: Strategic HR Management, Organizational Development, Performance Appraisal Systems, Industrial Relations"
    ],
    highlight: "Prepares senior HR business partners, talent acquisition leads, and corporate organizational consultants.",
    color: "from-purple-500/20 to-fuchsia-500/20 border-purple-500/30 text-purple-400"
  },
  {
    id: "mba-marketing",
    code: "MBA-MKT",
    title: "MBA Marketing",
    category: "Postgraduate (PG) Programmes",
    stream: "pg-programmes",
    duration: "2 Years (4 Semesters)",
    certification: "UGC Recognized Postgraduate Degree",
    description: "Advanced management study of consumer marketing, branding, and digital sales.",
    syllabus: [
      "Semester 1 & 2: Consumer Behavior, Market Research & Analytics, Brand Strategy, Integrated Marketing Communications",
      "Semester 3 & 4: Digital Marketing Strategy, Retail & B2B Sales Management, Product Portfolio Design, Global Marketing"
    ],
    highlight: "Mastery in modern consumer branding, growth marketing, digital channels, and sales leadership.",
    color: "from-amber-500/20 to-red-500/20 border-amber-500/30 text-amber-400"
  },
  {
    id: "mba-operations",
    code: "MBA-OPS",
    title: "MBA Operations",
    category: "Postgraduate (PG) Programmes",
    stream: "pg-programmes",
    duration: "2 Years (4 Semesters)",
    certification: "UGC Recognized Postgraduate Degree",
    description: "Specialized postgraduate studies in global supply chains and logistics management.",
    syllabus: [
      "Semester 1 & 2: Supply Chain Management, Logistics Operations, Production & Quality Control, Project Management",
      "Semester 3 & 4: Lean Manufacturing, Enterprise Resource Planning (ERP/SAP), Inventory Optimization, Global Procurement"
    ],
    highlight: "High demand for supply chain directors, logistics planners, and manufacturing operations leads.",
    color: "from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400"
  },
  {
    id: "bcom-univ",
    code: "B.Com",
    title: "Bachelor of Commerce (B.Com)",
    category: "Undergraduate (UG) Programmes",
    stream: "ug-programmes",
    duration: "3 Years (6 Semesters)",
    certification: "UGC Recognized University Bachelor Degree",
    description: "Bachelor of Commerce offering solid groundings in accounting and financial principles.",
    syllabus: [
      "Semester 1 & 2: Financial Accounting, Business Economics, Business Law, Principles of Management",
      "Semester 3 & 4: Corporate Accounting, Income Tax Law & Practice, Cost Accounting, Business Statistics",
      "Semester 5 & 6: Auditing & Assurance, Management Accounting, Goods & Services Tax (GST), Banking & Finance"
    ],
    highlight: "Solid groundings in corporate accounting, taxation, auditing, and financial management.",
    color: "from-emerald-500/20 to-green-500/20 border-emerald-500/30 text-emerald-400"
  },
  {
    id: "bcom-hons",
    code: "B.Com (Hons.)",
    title: "B.Com (Hons.)",
    category: "Undergraduate (UG) Programmes",
    stream: "ug-programmes",
    duration: "3 Years (6 Semesters)",
    certification: "UGC Recognized University Honors Degree",
    description: "Advanced honors commerce degree specializing in quantitative finance and corporate laws.",
    syllabus: [
      "Semester 1 & 2: Advanced Financial Accounting, Micro/Macro Economics, Quantitative Methods & Analytics",
      "Semester 3 & 4: Specialized Corporate Laws, Advanced Cost & Management Accounting, Financial Markets & Services",
      "Semester 5 & 6: Quantitative Finance, Security Analysis, International Trade & Finance, Advanced Tax & Audit Thesis"
    ],
    highlight: "Elite honors degree designed for CA aspirants, investment analysts, and corporate financial planners.",
    color: "from-teal-500/20 to-emerald-500/20 border-teal-500/30 text-teal-400"
  },
  {
    id: "ba-univ",
    code: "BA",
    title: "Bachelor of Arts (BA)",
    category: "Undergraduate (UG) Programmes",
    stream: "ug-programmes",
    duration: "3 Years",
    certification: "UGC Recognized University Bachelor Degree",
    description: "Bachelor of Arts offering broad multi-disciplinary education across humanities.",
    syllabus: [
      "Year 1: General English, Hindi / Regional Languages, Electives (History, Political Science, Sociology, Economics)",
      "Year 2: Indian Government & Politics, World History, Social Institutions & Dynamics, Micro/Macro Economics",
      "Year 3: International Relations, Modern Indian Thought, Applied Sociology, Humanities Capstone"
    ],
    highlight: "Broad multi-disciplinary foundation ideal for administrative civil services and competitive exams.",
    color: "from-yellow-500/20 to-amber-500/20 border-yellow-500/30 text-yellow-400"
  },
  {
    id: "ba-hons",
    code: "BA (Hons.)",
    title: "BA (Hons.)",
    category: "Undergraduate (UG) Programmes",
    stream: "ug-programmes",
    duration: "3 Years",
    certification: "UGC Recognized University Honors Degree",
    description: "Honors Bachelor of Arts offering intensive research-centric humanities studies.",
    syllabus: [
      "Year 1: Intensive Literature / Political Theory Specialization, Academic Writing & Research Methodology",
      "Year 2: Advanced Theoretical Frameworks, Critical Literary Analysis, Philosophy & Political Thought",
      "Year 3: Independent Research Dissertation, Contemporary Humanities Colloquium, Archival Studies"
    ],
    highlight: "Research-centric honors degree for journalism, academic publishing, and post-graduate studies.",
    color: "from-fuchsia-500/20 to-pink-500/20 border-fuchsia-500/30 text-fuchsia-400"
  },
  {
    id: "blib-univ",
    code: "B.Lib",
    title: "Bachelor of Library & Info. Science (B.Lib)",
    category: "Undergraduate (UG) Programmes",
    stream: "ug-programmes",
    duration: "1 Year",
    certification: "UGC Recognized Professional Graduate Degree",
    description: "A specialized professional degree training students in library classification, database cataloging, and digital archival management.",
    syllabus: [
      "Module 1: Library Information and Society, Library Classification Theory & Practice (Dewey Decimal)",
      "Module 2: Library Cataloging Theory & Practice (AACR-2), Information Sources and Services",
      "Module 3: Information Technology in Libraries, Archival Management, Practical Library Internship"
    ],
    highlight: "Mandatory qualification for school, university, and public library administration jobs.",
    color: "from-cyan-500/20 to-teal-500/20 border-cyan-500/30 text-cyan-400"
  },
  {
    id: "mcom-univ",
    code: "M.Com",
    title: "Master of Commerce (M.Com)",
    category: "Postgraduate (PG) Programmes",
    stream: "pg-programmes",
    duration: "2 Years (4 Semesters)",
    certification: "UGC Recognized Postgraduate Degree",
    description: "Master of Commerce specializing in advanced financial markets and corporate tax.",
    syllabus: [
      "Semester 1 & 2: Managerial Economics, Advanced Financial Accounting, Business Environment, Corporate Governance",
      "Semester 3 & 4: Strategic Management, Advanced Auditing, Financial Derivatives, Portfolio Management, Research Thesis"
    ],
    highlight: "Specialized degree in advanced financial markets, corporate taxation, auditing, and UGC NET preparation.",
    color: "from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-400"
  },
  {
    id: "ma-education",
    code: "MA Education",
    title: "MA Education",
    category: "Postgraduate (PG) Programmes",
    stream: "pg-programmes",
    duration: "2 Years (4 Semesters)",
    certification: "UGC Recognized Postgraduate Degree",
    description: "Master of Arts in Education covering educational philosophy and pedagogy.",
    syllabus: [
      "Semester 1 & 2: Philosophical & Sociological Foundations, Advanced Educational Psychology, Curriculum Design",
      "Semester 3 & 4: Educational Technology, School Administration & Leadership, Research Methodology, Master Dissertation"
    ],
    highlight: "Covering educational philosophy, pedagogy, curriculum design, and institutional leadership.",
    color: "from-pink-500/20 to-rose-500/20 border-pink-500/30 text-pink-400"
  },
  {
    id: "ma-english",
    code: "MA English",
    title: "MA English",
    category: "Postgraduate (PG) Programmes",
    stream: "pg-programmes",
    duration: "2 Years (4 Semesters)",
    certification: "UGC Recognized Postgraduate Degree",
    description: "Advanced postgraduate study in English literature, criticism, and linguistics.",
    syllabus: [
      "Semester 1 & 2: Classical & British Poetry, Shakespearean & Modern Drama, Literary Theory & Criticism, World Literature",
      "Semester 3 & 4: Indian Writing in English, Applied Linguistics & Phonetics, Postcolonial Studies, Academic Dissertation"
    ],
    highlight: "Advanced postgraduate study in English literature, criticism, linguistics, and editorial direction.",
    color: "from-violet-500/20 to-purple-500/20 border-violet-500/30 text-violet-400"
  },
  {
    id: "ma-hindi",
    code: "MA Hindi",
    title: "MA Hindi",
    category: "Postgraduate (PG) Programmes",
    stream: "pg-programmes",
    duration: "2 Years (4 Semesters)",
    certification: "UGC Recognized Postgraduate Degree",
    description: "Postgraduate research and translation training in Hindi literature.",
    syllabus: [
      "Semester 1 & 2: Ancient & Medieval Hindi Poetry (Kabir, Sur, Tulsi), Hindi Drama & Prose, History of Hindi Literature",
      "Semester 3 & 4: Modern Hindi Poetry, Translation Science & Technology, Functional Hindi & Journalism, Research Thesis"
    ],
    highlight: "Postgraduate research, translation studies, and official language officer career pathways.",
    color: "from-amber-500/20 to-yellow-500/20 border-amber-500/30 text-amber-400"
  },
  {
    id: "ma-history",
    code: "MA History",
    title: "MA History",
    category: "Postgraduate (PG) Programmes",
    stream: "pg-programmes",
    duration: "2 Years (4 Semesters)",
    certification: "UGC Recognized Postgraduate Degree",
    description: "Advanced study of ancient, medieval, and modern world histories.",
    syllabus: [
      "Semester 1 & 2: Historiography & Historical Methods, Ancient Indian History, Archaeology & Epigraphy",
      "Semester 3 & 4: Medieval & Modern Indian History, World Revolutions & Thought, Archival Studies, Research Paper"
    ],
    highlight: "Advanced study of ancient, medieval, and modern world histories, archaeology, and archival research.",
    color: "from-stone-500/20 to-zinc-500/20 border-stone-500/30 text-stone-400"
  },
  {
    id: "ma-political-science",
    code: "MA Political Science",
    title: "MA Political Science",
    category: "Postgraduate (PG) Programmes",
    stream: "pg-programmes",
    duration: "2 Years (4 Semesters)",
    certification: "UGC Recognized Postgraduate Degree",
    description: "Postgraduate study of political theories and international relations.",
    syllabus: [
      "Semester 1 & 2: Western & Indian Political Thought, Comparative Politics, Public Administration Theories",
      "Semester 3 & 4: International Relations & Diplomacy, Foreign Policy of India, Contemporary Political Theory, Thesis"
    ],
    highlight: "Postgraduate study of political theories, international relations, diplomacy, and administrative policy.",
    color: "from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-blue-400"
  },
  {
    id: "ma-sociology",
    code: "MA Sociology",
    title: "MA Sociology",
    category: "Postgraduate (PG) Programmes",
    stream: "pg-programmes",
    duration: "2 Years (4 Semesters)",
    certification: "UGC Recognized Postgraduate Degree",
    description: "Advanced sociological studies of social institutions and demographics.",
    syllabus: [
      "Semester 1 & 2: Classical Sociological Theories, Methodology of Social Research, Rural & Urban Sociology",
      "Semester 3 & 4: Sociology of Development, Gender & Society, Population & Demography, Field Research Report"
    ],
    highlight: "Advanced sociological studies of social institutions, demographics, and NGO development leadership.",
    color: "from-emerald-500/20 to-green-500/20 border-emerald-500/30 text-emerald-400"
  },
  {
    id: "ma-economics",
    code: "MA Economics",
    title: "MA Economics",
    category: "Postgraduate (PG) Programmes",
    stream: "pg-programmes",
    duration: "2 Years (4 Semesters)",
    certification: "UGC Recognized Postgraduate Degree",
    description: "Postgraduate research covering econometrics and public fiscal policy.",
    syllabus: [
      "Semester 1 & 2: Microeconomic Theory, Macroeconomic Analysis, Mathematical Economics, Basic Econometrics",
      "Semester 3 & 4: Advanced Econometrics, Public Finance & Fiscal Policy, Monetary Economics, Development Analytics"
    ],
    highlight: "Postgraduate research covering econometrics, public fiscal policy, and Indian Economic Service pathways.",
    color: "from-cyan-500/20 to-teal-500/20 border-cyan-500/30 text-cyan-400"
  },
  {
    id: "msc-it",
    code: "MSc IT",
    title: "MSc IT",
    category: "Postgraduate (PG) Programmes",
    stream: "pg-programmes",
    duration: "2 Years (4 Semesters)",
    certification: "UGC Recognized Postgraduate Degree",
    description: "Master of Science in Information Technology specializing in network engineering.",
    syllabus: [
      "Semester 1 & 2: Advanced Data Structures, Network Protocols, Operating Systems Internals, Database Architecture",
      "Semester 3 & 4: Network Engineering & Security, Cloud Infrastructure, Data Mining, Industrial Master Thesis"
    ],
    highlight: "Master of Science in Information Technology specializing in network engineering, systems, and cloud.",
    color: "from-teal-500/20 to-blue-500/20 border-teal-500/30 text-teal-400"
  },
  {
    id: "msw",
    code: "MSW",
    title: "MSW",
    category: "Postgraduate (PG) Programmes",
    stream: "pg-programmes",
    duration: "2 Years (4 Semesters)",
    certification: "UGC Recognized Postgraduate Degree",
    description: "Master of Social Work for community leadership and NGO administration.",
    syllabus: [
      "Semester 1 & 2: History & Philosophy of Social Work, Community Organization, Social Case Work, Concurrent Field Work",
      "Semester 3 & 4: Corporate Social Responsibility (CSR), Disaster Management, Medical Social Work, NGO Administration Thesis"
    ],
    highlight: "Master of Social Work for community leadership, CSR management, and NGO administration.",
    color: "from-orange-500/20 to-amber-500/20 border-orange-500/30 text-orange-400"
  },
  {
    id: "poly-me",
    code: "POLY-ME",
    title: "Polytechnic Diploma in Mechanical Engineering",
    category: "Diploma Programmes",
    stream: "diploma-programmes",
    duration: "3 Years",
    certification: "State Board of Technical Education Approved Diploma",
    description: "A comprehensive 3-year technical engineering program focusing on thermal engineering, machine design, manufacturing systems, and automotive mechanics.",
    syllabus: [
      "Semester 1 & 2: Applied Physics, Applied Mathematics, Engineering Drawing, Workshops",
      "Semester 3 & 4: Strength of Materials, Thermodynamics, Fluid Mechanics, Theory of Machines",
      "Semester 5 & 6: Computer Aided Design (CAD), Industrial Engineering, CNC Machining, and Capstone Project"
    ],
    highlight: "Equips students with direct technical skills for public and private industrial employment.",
    color: "from-amber-500/20 to-yellow-500/20 border-amber-500/30 text-amber-400"
  },
  {
    id: "poly-civil",
    code: "POLY-CE",
    title: "Polytechnic Diploma in Civil Engineering",
    category: "Diploma Programmes",
    stream: "diploma-programmes",
    duration: "3 Years",
    certification: "State Board of Technical Education Approved Diploma",
    description: "Learn structural engineering, surveying, building drawing, and construction material management in this core technical branch.",
    syllabus: [
      "Semester 1 & 2: Communication Skills, Engineering Chemistry, Basics of IT, Applied Mechanics",
      "Semester 3 & 4: Surveying, Concrete Technology, Structural Mechanics, Building Construction",
      "Semester 5 & 6: Irrigation Engineering, Water Supply & Waste Water Engineering, Estimating & Costing"
    ],
    highlight: "Prepares candidates for Junior Engineer (JE) roles and real estate site engineering profiles.",
    color: "from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-blue-400"
  },
  {
    id: "poly-cse",
    code: "POLY-CSE",
    title: "Polytechnic Diploma in Computer Science Engineering",
    category: "Diploma Programmes",
    stream: "diploma-programmes",
    duration: "3 Years",
    certification: "State Board of Technical Education Approved Diploma",
    description: "Acquire technical proficiency in computer programming, database administration, operating systems, and web architecture.",
    syllabus: [
      "Semester 1 & 2: Digital Electronics, Computer Fundamentals, Mathematics, C Programming",
      "Semester 3 & 4: Data Structures, Operating Systems, Computer Networks, Database Systems",
      "Semester 5 & 6: Java Programming, Web Development, Software Engineering, and Industrial Project"
    ],
    highlight: "High-demand technical diploma for software development, IT support, and system administration.",
    color: "from-cyan-500/20 to-teal-500/20 border-cyan-500/30 text-cyan-400"
  },
  {
    id: "dpharma",
    code: "D-PHARMA",
    title: "Diploma in Pharmacy (D.Pharma)",
    category: "Diploma Programmes",
    stream: "diploma-programmes",
    duration: "2 Years",
    certification: "PCI (Pharmacy Council of India) Recognized Diploma",
    description: "A professional healthcare program covering pharmaceutics, pharmacology, pharmaceutical chemistry, and hospital clinical training.",
    syllabus: [
      "Year 1: Pharmaceutics-I, Pharmaceutical Chemistry-I, Pharmacognosy, Biochemistry, Human Anatomy & Physiology",
      "Year 2: Pharmaceutics-II, Pharmaceutical Chemistry-II, Pharmacology & Toxicology, Pharmaceutical Jurisprudence"
    ],
    highlight: "Mandatory qualification to register as a licensed Pharmacist and open a retail/wholesale pharmacy shop.",
    color: "from-rose-500/20 to-pink-500/20 border-rose-500/30 text-rose-400"
  },
  {
    id: "poly-ee",
    code: "POLY-EE",
    title: "Polytechnic Diploma in Electrical Engineering",
    category: "Diploma Programmes",
    stream: "diploma-programmes",
    duration: "3 Years",
    certification: "State Board of Technical Education Approved Diploma",
    description: "Master electrical machines, power transmission systems, high-voltage circuits, switchgear protection, and renewable power infrastructure.",
    syllabus: [
      "Semester 1 & 2: Basic Electrical Engineering, Engineering Drawing, Applied Physics, Mathematics",
      "Semester 3 & 4: Electrical Machines-I, Circuit Theory, Electronics, Power Generation & Transmission",
      "Semester 5 & 6: Switchgear & Protection, Industrial Drives, Renewable Energy Systems, Substation Practical"
    ],
    highlight: "Prepares candidates for Junior Engineer (JE) exams in state power corporations and industrial plants.",
    color: "from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400"
  },
  {
    id: "dmlt",
    code: "DMLT",
    title: "Diploma in Medical Laboratory Technology (DMLT)",
    category: "Diploma Programmes",
    stream: "diploma-programmes",
    duration: "2 Years",
    certification: "State Paramedical Council Approved Diploma",
    description: "Specialized clinical healthcare training in diagnostic pathology, hematology, clinical biochemistry, microbiology, and blood banking.",
    syllabus: [
      "Year 1: Clinical Pathology, Hematology, Blood Banking, Human Anatomy & Physiology",
      "Year 2: Clinical Biochemistry, Medical Microbiology, Parasitology, Laboratory Management & Ethics"
    ],
    highlight: "High employment demand in diagnostics, pathology labs, multispecialty hospitals, and research facilities.",
    color: "from-teal-500/20 to-emerald-500/20 border-teal-500/30 text-teal-400"
  }
];



const INDIAN_STATES = [
  "Haryana",
  "Delhi NCR",
  "Punjab",
  "Uttar Pradesh",
  "Rajasthan",
  "Bihar",
  "Himachal Pradesh",
  "Uttarakhand",
  "Madhya Pradesh",
  "Maharashtra",
  "Chandigarh",
  "Jammu & Kashmir",
  "Jharkhand",
  "West Bengal",
  "Gujarat",
  "Assam & North East",
  "Other State / All India"
];

const COURSE_GROUPS = [
  {
    category: "Digital Marketing & AI Master Program",
    courses: COURSES.filter(c => c.id === "digital-marketing-ai")
  },
  {
    category: "Data Analytics & Business Intelligence",
    courses: COURSES.filter(c => c.id === "data-analytics")
  },
  {
    category: "Computer Education & IT Diplomas",
    courses: COURSES.filter(c => c.stream === "computer-diplomas" && c.id !== "digital-marketing-ai" && c.id !== "data-analytics")
  },
  {
    category: "Diploma Programmes (Polytechnic / D.Pharma / DMLT)",
    courses: COURSES.filter(c => c.stream === "diploma-programmes")
  },
  {
    category: "Undergraduate (UG) Programmes",
    courses: COURSES.filter(c => c.stream === "ug-programmes")
  },
  {
    category: "Postgraduate (PG) Programmes",
    courses: COURSES.filter(c => c.stream === "pg-programmes")
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [headline, setHeadline] = useState("hindi"); // Alternates between "hindi" and "english"
  
  // Filter the requested trending courses
  const trendingCourses = COURSES.filter(c => 
    ["digital-marketing-ai", "data-analytics", "adca", "dca", "accounting", "web-designing", "hardware-networking", "dtp", "languages", "office-automation", "english-speaking", "advance-excel", "sql"].includes(c.id)
  );

  // Alternating headline timer: 6 seconds Hindi, 6 seconds "THE ROOT OF PROGRESS"
  useEffect(() => {
    const timer = setInterval(() => {
      setHeadline(prev => (prev === "hindi" ? "english" : "hindi"));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Tabs and Prefill values
  const [activeCourseStream, setActiveCourseStream] = useState("all");
  const [selectedCourseCategory, setSelectedCourseCategory] = useState<string | null>(null);
  const [selectedCourseDetail, setSelectedCourseDetail] = useState<typeof COURSES[0] | null>(null);

  // Stats Counters state
  const [stats, setStats] = useState({ years: 0, alumni: 0, placement: 0 });

  // Apply Now Modal States - Opens automatically on website load
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(true);
  const [applyForm, setApplyForm] = useState({ name: "", phone: "", email: "", state: "Haryana", city: "", course: COURSES[0].title });
  const [applySubmitted, setApplySubmitted] = useState(false);
  const [isApplySubmitting, setIsApplySubmitting] = useState(false);
  const [applyError, setApplyError] = useState("");
  const [applySuccessData, setApplySuccessData] = useState({ name: "", phone: "", email: "", state: "Haryana", city: "", course: COURSES[0].title });

  const handleViewCategory = (streamId: string) => {
    setActiveCourseStream(streamId);
    setTimeout(() => {
      const el = document.getElementById("catalog-list-start");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };



  // Active state for Navigation highlights
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
  };

  useEffect(() => {
    if (applyForm.name || applyForm.phone || applyForm.email || applyForm.city) {
      saveWhatsAppEnquiry({
        name: applyForm.name,
        phone: applyForm.phone,
        email: applyForm.email,
        state: applyForm.state,
        city: applyForm.city,
        course: applyForm.course,
      });
    }
  }, [applyForm]);


  // Filtered courses list
  const filteredCourses = activeCourseStream === "all" 
    ? COURSES 
    : COURSES.filter(c => c.stream === activeCourseStream);

  return (
    <div className="relative w-full min-h-screen bg-[#080d1a] text-white overflow-x-hidden selection:bg-blue-600/30 selection:text-blue-200">
      
      {/* Dynamic 3D WebGL Particle Canvas Background (Persisted strictly) */}
      <ParticleCanvas scrollProgress={scrollProgress} />

      {/* Floating Glassmorphic Top Navigation Bar */}
      <NavigationBar 
        currentPage={currentPage}
        onNavigate={(pageId) => {
          setCurrentPage(pageId);
          setActiveCourseStream("all");
        }}
        onApplyNow={() => {
          setIsApplyModalOpen(true);
          setApplySubmitted(false);
        }} 
      />

      {/* Ambient Lighting / Reading Enhancements */}
      <div className="fixed inset-0 pointer-events-none z-1 bg-gradient-to-b from-[#080d1a] via-transparent to-[#080d1a] opacity-80" />
      <div className="fixed inset-0 pointer-events-none z-1 bg-[radial-gradient(circle_at_center,transparent_30%,#080d1a_90%)] opacity-85" />

      {/* Pages Container with Page-Based Layout */}
      <div className="relative min-h-[calc(100vh-80px)]">
        <AnimatePresence mode="wait">
          
          {/* 1. HOME VIEW */}
          {currentPage === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <section className="relative z-10 flex flex-col justify-between items-center px-3 sm:px-4 pt-16 sm:pt-24 pb-4 sm:pb-6 min-h-[calc(100vh-4.5rem)] sm:min-h-0">
                {/* Static Title Block with Foundation Badge */}
                <div className="w-full max-w-5xl mx-auto text-center flex flex-col items-center justify-center my-auto select-none">
                  <div className="flex flex-col items-center justify-center gap-1 sm:gap-2 w-full">
                    
                    {/* Admission Open 2026-27 Dynamic Blinking Badge */}
                    <span className="relative inline-flex items-center gap-1.5 sm:gap-2 text-emerald-300 font-sans tracking-wider text-[10px] sm:text-xs md:text-sm uppercase bg-gradient-to-r from-emerald-950/90 via-teal-950/90 to-cyan-950/90 px-3.5 sm:px-6 py-1 sm:py-2 rounded-full border border-emerald-400/80 shadow-[0_0_20px_rgba(16,185,129,0.4)] font-black text-center leading-relaxed animate-glow-blink my-0.5 cursor-pointer" onClick={() => setIsApplyModalOpen(true)}>
                      <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-90"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-emerald-400"></span>
                      </span>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 drop-shadow-[0_0_12px_rgba(16,185,129,0.6)]">
                        🎓 ADMISSIONS OPEN NOW
                      </span>
                    </span>

                    {/* Animated Headline Container with Fixed Height so buttons stay 100% stable during 6s transition */}
                    <div className="h-[160px] xs:h-[180px] sm:h-[180px] md:h-[200px] w-full flex items-center justify-center overflow-visible py-1 sm:py-2">
                      <AnimatePresence mode="wait">
                        {headline === "hindi" ? (
                          <motion.h1
                            key="hindi"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="font-sans text-[28px] xs:text-[34px] sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-normal text-white leading-tight sm:leading-snug filter drop-shadow-[0_0_35px_rgba(255,255,255,0.25)] text-center px-1 sm:px-4 max-w-[290px] xs:max-w-[360px] sm:max-w-none mx-auto"
                          >
                            <span className="block sm:inline">सर्टिफिकेट भारत</span>{" "}
                            <span className="block sm:inline">सरकार का,</span>{" "}
                            <span className="block sm:inline">हुनर डिजिटल युग</span>{" "}
                            <span className="block sm:inline">का</span>
                          </motion.h1>
                        ) : (
                          <motion.h1
                            key="english"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="font-sans text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-normal text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-400 leading-tight filter drop-shadow-[0_0_40px_rgba(255,255,255,0.15)] text-center px-2 sm:px-4 uppercase max-w-xs sm:max-w-none mx-auto"
                          >
                            THE ROOT OF PROGRESS
                          </motion.h1>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Premium CTA Links */}
                  <div className="w-full max-w-4xl text-center px-2 sm:px-4 flex flex-col items-center">
                    <div className="flex flex-row items-center justify-center gap-2 xs:gap-3 sm:gap-4 mt-6 xs:mt-8 sm:mt-10 mb-3 sm:mb-8 w-full max-w-md mx-auto">
                      <button 
                        onClick={() => {
                          setCurrentPage("courses");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="flex-1 px-3 xs:px-5 sm:px-8 py-2 sm:py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs xs:text-sm transition-all shadow-lg hover:shadow-blue-500/25 active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap"
                      >
                        <span>Explore Course</span>
                        <ArrowRight size={15} className="shrink-0" />
                      </button>
                      <button 
                        onClick={() => {
                          setIsApplyModalOpen(true);
                          setApplySubmitted(false);
                        }}
                        className="flex-1 px-3 xs:px-5 sm:px-8 py-2 sm:py-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs xs:text-sm transition-all shadow-lg hover:shadow-emerald-500/10 active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap"
                      >
                        <span>Apply Now</span>
                        <GraduationCap size={15} className="shrink-0" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Trending Courses Heading & Click Subtitle (Positioned at the bottom of the initial fold) */}
                <div className="text-center mt-auto pt-3 pb-1 flex flex-col items-center justify-center gap-1.5">
                  <h2 className="text-base xs:text-lg sm:text-3xl md:text-4xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 filter drop-shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2">
                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500 animate-ping inline-block" />
                    🔥 TRENDING COURSES
                  </h2>
                  <p className="text-[10px] sm:text-base font-semibold text-zinc-200 tracking-wide bg-zinc-900/90 px-3.5 sm:px-6 py-1 sm:py-2 rounded-full border border-zinc-800 shadow-md max-w-full">
                    Click on any course card to explore full syllabus & details
                  </p>
                </div>
              </section>

              {/* Dynamic Trending Courses Marquee Cards - Revealed when scrolling down */}
              <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 pt-4 pb-6 sm:py-8 relative">
                <div className="flex whitespace-nowrap overflow-hidden py-2 sm:py-4">
                  <div className="animate-marquee flex gap-4 sm:gap-8 py-2 sm:py-4">
                    {[...trendingCourses, ...trendingCourses, ...trendingCourses].map((course, idx) => {
                      return (
                        <div
                          key={`${course.id}-trending-${idx}`}
                          onClick={() => {
                            let catId = "computer-education";
                            if (course.id === "digital-marketing-ai") catId = "digital-marketing-ai";
                            else if (course.id === "data-analytics") catId = "data-analytics";
                            else if (course.stream === "computer-diplomas") catId = "computer-education";
                            else if (course.stream) catId = course.stream;

                            setSelectedCourseCategory(catId);
                            setSelectedCourseDetail(course);
                          }}
                          className="w-[260px] xs:w-[300px] sm:w-[360px] md:w-[420px] min-h-[200px] sm:min-h-[220px] p-4 xs:p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-zinc-900/90 border border-zinc-700/70 hover:border-emerald-400 shadow-xl hover:shadow-emerald-500/25 transition-all duration-500 cursor-pointer flex flex-col justify-between shrink-0 select-none group relative overflow-hidden"
                        >
                          {/* Course Background Image */}
                          <img 
                            src={getCourseBgImage(course.id)} 
                            alt={course.title} 
                            className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 pointer-events-none" 
                            referrerPolicy="no-referrer"
                          />

                          {/* Subtle Scrim Gradient Overlay for Crisp Text Readability */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10 rounded-3xl pointer-events-none" />

                          <div className="relative z-10 space-y-3">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[11px] font-sans text-emerald-300 font-extrabold bg-emerald-950/90 px-3 py-1 rounded-full border border-emerald-400/60 shadow-lg backdrop-blur-md">
                                {course.code}
                              </span>
                            </div>
                            
                            <h4 className="text-lg sm:text-xl md:text-2xl font-black tracking-tight text-white group-hover:text-emerald-300 transition-all duration-300 leading-snug whitespace-normal line-clamp-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                              {course.title}
                            </h4>
                          </div>

                          <div className="relative z-10 mt-5 pt-3.5 border-t border-white/20 flex items-center justify-end">
                            <span className="text-xs font-sans font-extrabold text-white bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-full border border-emerald-400/80 shadow-lg group-hover:scale-105 transition-all duration-300 flex items-center gap-1.5">
                              Explore Details →
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Custom Highlight Certification Badges with Straight Line & Recognised by Govt. of India */}
              <CertificationBadges />

              {/* Home Sub-Sections Preview Scrolling Website (Legacy of Excellence) */}
              <HomeAboutPreview onNavigate={setCurrentPage} />
              
              <HomePopularCourses 
                courses={COURSES} 
                onSelectCourse={setSelectedCourseDetail} 
                onNavigate={setCurrentPage} 
                setActiveCourseStream={setActiveCourseStream}
                onSelectCategory={(catId) => {
                  setSelectedCourseCategory(catId);
                  setCurrentPage("courses");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />

              {/* Floating Clean Stats Counters without outer card boundaries */}
              <div className="w-full max-w-5xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4 mb-16 relative z-10 font-sans">
                {/* 20+ Years */}
                <div className="p-6 text-center flex flex-col items-center group cursor-pointer transition-all duration-300">
                  <div className="p-3 bg-blue-900/90 rounded-xl text-cyan-300 mb-3 border border-cyan-400/40 group-hover:bg-emerald-500 group-hover:text-black group-hover:border-emerald-300 transition-all duration-300 group-hover:scale-110">
                    <Building size={22} />
                  </div>
                  <span className="text-3xl sm:text-4xl font-black tracking-tight text-white font-sans">{stats.years}+ Years</span>
                  <span className="text-xs font-sans text-cyan-300 group-hover:text-emerald-400 font-extrabold uppercase tracking-wider mt-1.5 transition-colors duration-300">
                    Educational Leadership (2006–Present)
                  </span>
                </div>

                {/* 15,000+ Alumni */}
                <div className="p-6 text-center flex flex-col items-center group cursor-pointer transition-all duration-300">
                  <div className="p-3 bg-blue-900/90 rounded-xl text-cyan-300 mb-3 border border-cyan-400/40 group-hover:bg-emerald-500 group-hover:text-black group-hover:border-emerald-300 transition-all duration-300 group-hover:scale-110">
                    <Users size={22} />
                  </div>
                  <span className="text-3xl sm:text-4xl font-black tracking-tight text-white font-sans">{stats.alumni.toLocaleString()}+</span>
                  <span className="text-xs font-sans text-cyan-300 group-hover:text-emerald-400 font-extrabold uppercase tracking-wider mt-1.5 transition-colors duration-300">
                    Trained Alumni
                  </span>
                </div>

                {/* 100% Practical Labs */}
                <div className="p-6 text-center flex flex-col items-center group cursor-pointer transition-all duration-300">
                  <div className="p-3 bg-blue-900/90 rounded-xl text-cyan-300 mb-3 border border-cyan-400/40 group-hover:bg-emerald-500 group-hover:text-black group-hover:border-emerald-300 transition-all duration-300 group-hover:scale-110">
                    <Award size={22} />
                  </div>
                  <span className="text-3xl sm:text-4xl font-black tracking-tight text-white font-sans">{stats.placement}%</span>
                  <span className="text-xs font-sans text-cyan-300 group-hover:text-emerald-400 font-extrabold uppercase tracking-wider mt-1.5 transition-colors duration-300">
                    Practical Labs & Job Support
                  </span>
                </div>
              </div>

              <HomeWhyIINT />
              
              <HomeStudentReviews />
              
              <HomeFAQPreview onNavigate={setCurrentPage} />

              <Footer onNavigate={setCurrentPage} />
            </motion.div>
          )}

          {/* 2. COURSES CATALOG VIEW */}
          {currentPage === "courses" && (
            <motion.div
              key="courses"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full pt-24"
            >
              <section className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6">
                {selectedCourseCategory === null ? (
                  /* Initial View: Clean 5 Category Cards directly matching user's screenshot */
                  <div>
                    <HomePopularCourses 
                      courses={COURSES} 
                      onSelectCourse={setSelectedCourseDetail} 
                      onNavigate={setCurrentPage} 
                      setActiveCourseStream={setActiveCourseStream}
                      onSelectCategory={(catId) => {
                        setSelectedCourseCategory(catId);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    />
                  </div>
                ) : (
                  /* Category Detail Sub-Page View with Previous Button & Subcategory Drill-Down */
                  <div className="space-y-6">
                    {/* Top Navigation Row with Previous Button */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 pb-2 border-b border-zinc-900">
                      <button
                        id="btn-back-to-categories"
                        onClick={() => {
                          if (selectedCourseCategory === "diploma-programmes" || selectedCourseCategory === "ug-programmes" || selectedCourseCategory === "pg-programmes") {
                            setSelectedCourseCategory("regular-courses");
                          } else {
                            setSelectedCourseCategory(null);
                          }
                        }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 hover:bg-emerald-950/80 border border-zinc-800 hover:border-emerald-500/50 text-zinc-300 hover:text-emerald-400 font-mono text-xs font-bold transition-all cursor-pointer shadow-xl group"
                      >
                        <ArrowLeft className="h-4 w-4 text-emerald-400 group-hover:-translate-x-1 transition-transform" />
                        <span>
                          {selectedCourseCategory === "diploma-programmes" || selectedCourseCategory === "ug-programmes" || selectedCourseCategory === "pg-programmes"
                            ? "← Back to Regular Course Subcategories"
                            : "← Previous / Back to All Course Categories"
                          }
                        </span>
                      </button>
                    </div>

                    {/* CATEGORY LEVEL 2: REGULAR COURSE PROGRAM SUBCATEGORIES SELECTION (SCREENSHOT 27) */}
                    {selectedCourseCategory === "regular-courses" ? (
                      <div className="space-y-8">
                        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950/80 border border-zinc-900 relative overflow-hidden">
                          <span className="text-[10px] font-mono uppercase bg-emerald-950 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20 font-bold">
                            PROGRAMME CATEGORIES
                          </span>
                          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight mt-3 mb-2">
                            Regular Course Program
                          </h2>
                          <p className="text-zinc-400 text-xs sm:text-sm font-light max-w-2xl">
                            Select a programme category below to view specific degree and diploma courses:
                          </p>
                        </div>

                        {/* 3 Subcategory Cards Grid matching Screenshot 27 */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {/* Card 1: Diploma Programmes */}
                          <div 
                            id="card-sub-diploma"
                            onClick={() => setSelectedCourseCategory("diploma-programmes")}
                            className="p-8 rounded-3xl bg-zinc-950 border border-zinc-700/70 hover:border-amber-400 transition-all duration-300 cursor-pointer group flex flex-col justify-between shadow-2xl relative overflow-hidden min-h-[220px]"
                          >
                            <img 
                              src={getCourseBgImage("poly-me")} 
                              alt="Diploma Programmes" 
                              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 pointer-events-none"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30 rounded-3xl pointer-events-none" />

                            <div className="relative z-10 space-y-4">
                              <div className="p-2.5 w-fit rounded-2xl bg-black/80 border border-amber-500/40 text-amber-400 backdrop-blur-md shadow-md">
                                <GraduationCap size={24} />
                              </div>
                              <h3 className="text-2xl font-black text-white group-hover:text-amber-300 transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                                Diploma Programmes
                              </h3>
                            </div>
                            <div className="relative z-10 mt-8 pt-4 border-t border-white/20 flex items-center justify-between">
                              <span className="text-xs font-mono text-amber-300 font-bold bg-black/80 px-3.5 py-1.5 rounded-full border border-amber-400/50 backdrop-blur-md">Explore Courses →</span>
                              <ArrowRight size={16} className="text-amber-400 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>

                          {/* Card 2: Undergraduate (UG) Programmes */}
                          <div 
                            id="card-sub-ug"
                            onClick={() => setSelectedCourseCategory("ug-programmes")}
                            className="p-8 rounded-3xl bg-zinc-950 border border-zinc-700/70 hover:border-blue-400 transition-all duration-300 cursor-pointer group flex flex-col justify-between shadow-2xl relative overflow-hidden min-h-[220px]"
                          >
                            <img 
                              src={getCourseBgImage("bca")} 
                              alt="Undergraduate Programmes" 
                              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 pointer-events-none"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30 rounded-3xl pointer-events-none" />

                            <div className="relative z-10 space-y-4">
                              <div className="p-2.5 w-fit rounded-2xl bg-black/80 border border-blue-500/40 text-blue-400 backdrop-blur-md shadow-md">
                                <Award size={24} />
                              </div>
                              <h3 className="text-2xl font-black text-white group-hover:text-blue-300 transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                                Undergraduate (UG) Programmes
                              </h3>
                            </div>
                            <div className="relative z-10 mt-8 pt-4 border-t border-white/20 flex items-center justify-between">
                              <span className="text-xs font-mono text-blue-300 font-bold bg-black/80 px-3.5 py-1.5 rounded-full border border-blue-400/50 backdrop-blur-md">Explore Courses →</span>
                              <ArrowRight size={16} className="text-blue-400 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>

                          {/* Card 3: Postgraduate (PG) Programmes */}
                          <div 
                            id="card-sub-pg"
                            onClick={() => setSelectedCourseCategory("pg-programmes")}
                            className="p-8 rounded-3xl bg-zinc-950 border border-zinc-700/70 hover:border-violet-400 transition-all duration-300 cursor-pointer group flex flex-col justify-between shadow-2xl relative overflow-hidden min-h-[220px]"
                          >
                            <img 
                              src={getCourseBgImage("mba")} 
                              alt="Postgraduate Programmes" 
                              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 pointer-events-none"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30 rounded-3xl pointer-events-none" />

                            <div className="relative z-10 space-y-4">
                              <div className="p-2.5 w-fit rounded-2xl bg-black/80 border border-violet-500/40 text-violet-400 backdrop-blur-md shadow-md">
                                <BookOpen size={24} />
                              </div>
                              <h3 className="text-2xl font-black text-white group-hover:text-violet-300 transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                                Postgraduate (PG) Programmes
                              </h3>
                            </div>
                            <div className="relative z-10 mt-8 pt-4 border-t border-white/20 flex items-center justify-between">
                              <span className="text-xs font-mono text-violet-300 font-bold bg-black/80 px-3.5 py-1.5 rounded-full border border-violet-400/50 backdrop-blur-md">Explore Courses →</span>
                              <ArrowRight size={16} className="text-violet-400 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Filtered Deep Details & Eligibility List */}
                        <EligibilityCriteria 
                          courses={COURSES}
                          initialCategory={selectedCourseCategory}
                          onSelectCourseDetail={setSelectedCourseDetail}
                          onApplyForProgram={(progName) => {
                            setApplyForm(prev => ({ ...prev, course: progName }));
                            setIsApplyModalOpen(true);
                            setApplySubmitted(false);
                          }}
                        />
                      </>
                    )}
                  </div>
                )}
              </section>

              <Footer onNavigate={setCurrentPage} />
            </motion.div>
          )}

          {/* 3. ABOUT VIEW */}
          {currentPage === "about" && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full pt-24"
            >
              <AccreditationSection />
              <Footer onNavigate={setCurrentPage} />
            </motion.div>
          )}

          {/* 4. FAQ VIEW */}
          {currentPage === "faq" && (
            <motion.div
              key="faq"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full pt-24"
            >
              <FAQSection />
              <Footer onNavigate={setCurrentPage} />
            </motion.div>
          )}

          {/* 5. CONTACT VIEW */}
          {currentPage === "contact" && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full pt-24"
            >
              <ContactSection isFullPage={true} />
              <Footer onNavigate={setCurrentPage} />
            </motion.div>
          )}

          {/* 6. GALLERY VIEW */}
          {currentPage === "gallery" && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full pt-24"
            >
              <GallerySection onApplyForAdmission={() => setIsApplyModalOpen(true)} />
              <Footer onNavigate={setCurrentPage} />
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* DEEP PROGRAMME & ELIGIBILITY DETAILS MODAL */}
      <AnimatePresence>
        {selectedCourseDetail && (
          <CourseDetailModal
            course={selectedCourseDetail}
            onClose={() => setSelectedCourseDetail(null)}
            onApply={(progName) => {
              handleSelectProgramFromCourses(progName);
              setSelectedCourseDetail(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* APPLY NOW FORM MODAL */}
      <AnimatePresence>
        {isApplyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsApplyModalOpen(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative z-10 w-full max-w-lg rounded-3xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 shadow-2xl p-6 sm:p-8 text-left text-zinc-900 dark:text-white"
            >
              <div className="flex items-start justify-between gap-4 border-b border-zinc-200 dark:border-zinc-900 pb-4 mb-5">
                <div>
                  <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-500/15">
                    Admission Form
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-900 dark:text-white mt-1">
                    Apply Now
                  </h3>
                  <p className="text-xs text-zinc-500 font-mono mt-1">Enter your details to register for Adarsh Programs</p>
                </div>
                <button 
                  onClick={() => setIsApplyModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {!applySubmitted ? (
                <form 
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setApplyError("");
                    setIsApplySubmitting(true);

                    const result = await submitStudentEnquiry({
                      name: applyForm.name,
                      course: applyForm.course,
                      state: applyForm.state,
                      city: applyForm.city,
                      email: applyForm.email,
                      phone: applyForm.phone,
                    });

                    setIsApplySubmitting(false);

                    if (!result.success) {
                      setApplyError(result.error || "Submission failed. Please try again.");
                      return;
                    }

                    setApplySuccessData({ ...applyForm });
                    saveWhatsAppEnquiry({
                      name: applyForm.name,
                      phone: applyForm.phone,
                      email: applyForm.email,
                      state: applyForm.state,
                      city: applyForm.city,
                      course: applyForm.course,
                    });
                    setApplyForm({ name: "", phone: "", email: "", state: "Haryana", city: "", course: COURSES[0].title });
                    setApplySubmitted(true);
                  }}
                  className="space-y-3.5"
                >
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-bold">Student Name *</label>
                    <input 
                      type="text" 
                      required
                      value={applyForm.name}
                      onChange={(e) => setApplyForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter student full name"
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-white focus:border-emerald-500 focus:bg-white dark:focus:bg-zinc-900/80 transition-all outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-bold">Phone Number / WhatsApp *</label>
                      <input 
                        type="tel" 
                        required
                        value={applyForm.phone}
                        onChange={(e) => setApplyForm(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="+91 Mobile Number"
                        className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-white focus:border-emerald-500 focus:bg-white dark:focus:bg-zinc-900/80 transition-all outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-bold">Email Address</label>
                      <input 
                        type="email" 
                        required
                        value={applyForm.email}
                        onChange={(e) => setApplyForm(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="name@email.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-white focus:border-emerald-500 focus:bg-white dark:focus:bg-zinc-900/80 transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* Select State & City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-bold flex items-center justify-between">
                        <span>Select State *</span>
                        <span className="text-emerald-500 dark:text-emerald-400 text-[9px]">Location</span>
                      </label>
                      <select
                        value={applyForm.state}
                        onChange={(e) => setApplyForm(prev => ({ ...prev, state: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-white focus:border-emerald-500 focus:bg-white dark:focus:bg-zinc-900/90 transition-all outline-none cursor-pointer"
                      >
                        {INDIAN_STATES.map(st => (
                          <option key={st} value={st} className="text-zinc-900 dark:text-white bg-white dark:bg-zinc-950">
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-bold">City *</label>
                      <input
                        type="text"
                        required
                        value={applyForm.city}
                        onChange={(e) => setApplyForm(prev => ({ ...prev, city: e.target.value }))}
                        placeholder="Enter your city"
                        className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-white focus:border-emerald-500 focus:bg-white dark:focus:bg-zinc-900/80 transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* Targeted Course Dropdown with Categories */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-bold flex items-center justify-between">
                      <span>Targeted Course *</span>
                      <span className="text-emerald-500 dark:text-emerald-400 text-[9px]">All Programs</span>
                    </label>
                    <select
                      value={applyForm.course}
                      onChange={(e) => setApplyForm(prev => ({ ...prev, course: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-white focus:border-emerald-500 focus:bg-white dark:focus:bg-zinc-900/90 transition-all outline-none cursor-pointer"
                    >
                      {COURSE_GROUPS.map(group => (
                        <optgroup key={group.category} label={`── ${group.category} ──`} className="bg-zinc-100 dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 font-extrabold py-1">
                          {group.courses.map(course => (
                            <option key={course.id} value={course.title} className="text-zinc-900 dark:text-white bg-white dark:bg-zinc-950 font-normal py-1">
                              {course.title} ({course.code})
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>

                  <div className="pt-3">
                    {applyError && (
                      <p className="text-xs text-red-500 text-center mb-3">{applyError}</p>
                    )}
                    <button
                      type="submit"
                      disabled={isApplySubmitting}
                      className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isApplySubmitting ? "Submitting..." : "Submit Admission Enquiry"}
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </form>
              ) : (
                <div className="py-8 text-center space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-lg font-bold text-zinc-900 dark:text-white">Admission Enquiry Submitted!</h4>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed max-w-sm mx-auto font-light">
                    Thank you, <span className="text-emerald-600 dark:text-emerald-400 font-bold">{applySuccessData.name}</span>! Your admission enquiry for <span className="text-zinc-900 dark:text-white font-bold">{applySuccessData.course}</span> from <span className="text-emerald-600 dark:text-emerald-400 font-bold">{applySuccessData.city}, {applySuccessData.state}</span> has been logged.
                  </p>
                  <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                    Our admission counselor will call you at <span className="text-emerald-600 dark:text-emerald-400 font-medium">{applySuccessData.phone}</span> within 24 hours to assist with seat reservation and documentation.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setIsApplyModalOpen(false);
                        setApplySubmitted(false);
                        setApplyError("");
                        setApplyForm({ name: "", phone: "", email: "", state: "Haryana", city: "", course: COURSES[0].title });
                      }}
                      className="px-6 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold border border-zinc-800 transition-all cursor-pointer"
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

      {/* Right Floating Quick Action Dock & AI Assistant Widget */}
      <RightFloatingDock />
      <QueryAIAssistant />

    </div>
  );
}
