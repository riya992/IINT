import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowRight, RefreshCw, Cpu, Dna, Atom, GraduationCap, Clock, BookOpen, AlertCircle } from "lucide-react";
import { ProgramArchetype } from "../types";

interface ProgramMatcherProps {
  onSelectProfile: (archetype: string, program: string) => void;
  registeredApplication: boolean;
}

export default function ProgramMatcher({ onSelectProfile, registeredApplication }: ProgramMatcherProps) {
  const [step, setStep] = useState(1);
  const [focus, setFocus] = useState<string | null>(null);
  const [environment, setEnvironment] = useState<string | null>(null);

  const focusOptions = [
    {
      id: "networking",
      label: "Network Engineering & Cloud Security",
      description: "You are fascinated by Cisco routers, physical switch racks, firewalls, and cloud server administration.",
      icon: <Cpu className="text-cyan-400" size={20} />,
    },
    {
      id: "software",
      label: "Software Engineering & Web Apps",
      description: "You want to design professional websites, write clean Python/Java scripts, and build full-stack web applications.",
      icon: <Atom className="text-violet-400" size={20} />,
    },
    {
      id: "accounting",
      label: "Financial Accounting & Office Automation (Tally GST)",
      description: "You wish to master professional corporate accounting, corporate taxation with GST, and advanced MS Office automation.",
      icon: <BookOpen className="text-emerald-400" size={20} />,
    },
  ];

  const envOptions = [
    {
      id: "hardware",
      label: "Physical Lab & Device Configuration",
      description: "Hands-on calibration and cabling of physical Cisco router racks, server mainboards, and workspace rigs.",
    },
    {
      id: "theory",
      label: "Virtualized Simulators & Modern IDEs",
      description: "Designing virtual corporate networks in Cisco Packet Tracer, or compiling web software in VS Code.",
    },
    {
      id: "field",
      label: "Corporate Case-Studies & Live Accounts",
      description: "Working on real client balance sheets, live networking situations, or enterprise technical files.",
    },
  ];

  // Logic to determine customized student archetypes
  const getArchetype = (): ProgramArchetype => {
    if (focus === "networking") {
      if (environment === "hardware") {
        return {
          id: "arch-1",
          name: "Enterprise Systems Network Architect",
          description: "You belong on the physical implementation tier of enterprise communications, designing robust physical routing paths and cabled core backbones.",
          courses: ["NET-101: Physical Router Setup", "NET-202: WAN Redundancy & OSPFv3", "NET-303: LAN Switching & Trunks"],
          duration: "1 Year Advanced Diploma",
          icon: "Cpu",
        };
      } else if (environment === "theory") {
        return {
          id: "arch-2",
          name: "Cisco Virtual Systems Engineer",
          description: "Your domain is virtual routing topographies, managing simulated enterprise backbones, VPN tunnels, and virtual firewalls.",
          courses: ["NET-150: Cisco Packet Tracer Labs", "NET-220: Network Topology Design", "SEC-340: Virtual Firewall Config"],
          duration: "6 Months Diploma",
          icon: "BookOpen",
        };
      } else {
        return {
          id: "arch-3",
          name: "On-Site Network Support Specialist",
          description: "You will lead practical diagnostics, client-server administration, and physical security auditing in active corporate offices.",
          courses: ["NET-190: Structured Cabling", "SYS-210: Client-Server Deployments", "SEC-310: Network Security Auditing"],
          duration: "1 Year Diploma",
          icon: "Activity",
        };
      }
    } else if (focus === "software") {
      if (environment === "hardware") {
        return {
          id: "arch-4",
          name: "Embedded Systems & IoT Developer",
          description: "You will bridge hardware and code, programming hardware chips and physical components using Python and C/C++ scripts.",
          courses: ["SWE-101: C/C++ Core foundations", "SWE-205: Python IoT Control", "SYS-310: Microcontroller Arch"],
          duration: "1 Year ADCA Program",
          icon: "Dna",
        };
      } else if (environment === "theory") {
        return {
          id: "arch-5",
          name: "Full-Stack Web Software Engineer",
          description: "You will engineer scalable, modern web application suites utilizing modern React frontends paired with robust Node.js and SQL/NoSQL databases.",
          courses: ["SWE-210: React Web Applications", "SWE-320: NodeJS Backend Services", "DBM-250: SQL & Database Querying"],
          duration: "1 Year Advanced Diploma",
          icon: "Cpu",
        };
      } else {
        return {
          id: "arch-6",
          name: "Agile Software Solutions Developer",
          description: "You will specialize in customized corporate application engineering, QA automated test protocols, and mobile platform integration.",
          courses: ["SWE-290: Client Agile Workflows", "SWE-310: QA Testing & Deployments", "SWE-390: Mobile App Systems"],
          duration: "1 Year Program",
          icon: "Shield",
        };
      }
    } else {
      if (environment === "hardware") {
        return {
          id: "arch-7",
          name: "IT Infrastructure & Support Specialist",
          description: "You will assemble, diagnose, and troubleshoot professional corporate computing hardware, system operating software, and office workstations.",
          courses: ["SYS-101: Hardware Assembly & Fix", "SYS-202: Active Directory Setup", "OFF-110: Advanced Excel Automation"],
          duration: "6 Months Diploma",
          icon: "Brain",
        };
      } else if (environment === "theory") {
        return {
          id: "arch-8",
          name: "Financial Accounts Analyst (Tally Prime)",
          description: "You will design complete, compliant accounting systems, handling professional ledgers, inventory tracking, and GST returns.",
          courses: ["ACC-101: Financial Ledger Setup", "ACC-202: GST & Taxation Standards", "OFF-105: Corporate Office Automation"],
          duration: "6 Months Specialization",
          icon: "Cpu",
        };
      } else {
        return {
          id: "arch-9",
          name: "Lead Business Systems Administrator",
          description: "You will manage enterprise workflow logs, corporate business files, payroll schedules, and advanced spreadsheet automation.",
          courses: ["ACC-290: Live Audit & Payroll", "OFF-120: Client Document Systems", "ACC-310: Corporate Balance Sheets"],
          duration: "1 Year ADCA Program",
          icon: "Globe",
        };
      }
    }
  };

  const activeArchetype = getArchetype();

  const handleReset = () => {
    setFocus(null);
    setEnvironment(null);
    setStep(1);
  };

  const handleConfirmProfile = () => {
    if (activeArchetype) {
      onSelectProfile(activeArchetype.name, `${activeArchetype.name} Program`);
    }
  };

  return (
    <div className="bg-zinc-950/70 border border-zinc-850/80 p-6 md:p-8 rounded-2xl shadow-xl relative overflow-hidden backdrop-blur-md">
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-gradient-to-br from-violet-600/10 to-transparent rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-gradient-to-tr from-cyan-600/10 to-transparent rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-cyan-400" />
          <span className="font-mono text-[10px] tracking-wider text-zinc-400 uppercase">
            Discovery Module: Affiliated Careers (NSDC, NDLM, MSME, NASSCOM, ISO:9001)
          </span>
        </div>
        {step > 1 && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-[10px] font-mono text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
          >
            <RefreshCw size={10} />
            Reset Profiler
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4"
          >
            <div>
              <h3 className="font-display text-lg md:text-xl font-bold text-white">
                Step 1: Where is your curiosity centered?
              </h3>
              <p className="text-zinc-400 text-xs mt-1">
                Select the primary research vector that sparks your intellectual ambition.
              </p>
            </div>

            <div className="flex flex-col gap-3 mt-2">
              {focusOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setFocus(opt.id);
                    setStep(2);
                  }}
                  className="flex items-start gap-4 p-4 rounded-xl border border-zinc-900 bg-black/40 hover:border-zinc-800 hover:bg-zinc-900/30 text-left transition-all group cursor-pointer"
                >
                  <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 group-hover:bg-zinc-850 group-hover:border-zinc-700 transition-all">
                    {opt.icon}
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-sm md:text-base text-zinc-200 group-hover:text-white transition-colors">
                      {opt.label}
                    </h4>
                    <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                      {opt.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4"
          >
            <div>
              <h3 className="font-display text-lg md:text-xl font-bold text-white">
                Step 2: What is your preferred sandbox environment?
              </h3>
              <p className="text-zinc-400 text-xs mt-1">
                Select where you prefer to deploy your research hours.
              </p>
            </div>

            <div className="flex flex-col gap-3 mt-2">
              {envOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setEnvironment(opt.id);
                    setStep(3);
                  }}
                  className="flex flex-col p-4 rounded-xl border border-zinc-900 bg-black/40 hover:border-zinc-800 hover:bg-zinc-900/30 text-left transition-all group cursor-pointer"
                >
                  <h4 className="font-display font-semibold text-sm md:text-base text-zinc-200 group-hover:text-white transition-colors">
                    {opt.label}
                  </h4>
                  <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                    {opt.description}
                  </p>
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(1)}
              className="text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors mt-2 text-left w-fit cursor-pointer"
            >
              ← Back to Step 1
            </button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-5"
          >
            <div className="text-center p-4 rounded-xl bg-gradient-to-r from-violet-950/30 to-cyan-950/30 border border-violet-800/30">
              <span className="font-mono text-[9px] uppercase tracking-widest text-cyan-400">
                Profiling Complete • Student Profile Matched
              </span>
              <h3 className="font-display text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-violet-200 to-cyan-200 mt-1">
                {activeArchetype.name}
              </h3>
              <p className="text-zinc-300 text-xs mt-2 max-w-lg mx-auto leading-relaxed">
                {activeArchetype.description}
              </p>
            </div>

            {/* Profile specifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-black/40 border border-zinc-900">
                <div className="flex items-center gap-1.5 text-zinc-400 font-mono text-[9px] uppercase tracking-wider mb-2">
                  <BookOpen size={12} className="text-violet-400" />
                  Recommended Primers
                </div>
                <ul className="flex flex-col gap-1.5">
                  {activeArchetype.courses.map((c, idx) => (
                    <li key={idx} className="font-mono text-[10px] text-zinc-300 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-violet-400" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-3 justify-between p-4 rounded-xl bg-black/40 border border-zinc-900">
                <div>
                  <div className="flex items-center gap-1.5 text-zinc-400 font-mono text-[9px] uppercase tracking-wider mb-1">
                    <Clock size={12} className="text-cyan-400" />
                    Optimal Tract Duration
                  </div>
                  <span className="text-lg font-display font-semibold text-white">
                    {activeArchetype.duration} full-time study
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-mono">
                  <GraduationCap size={12} />
                  Includes NSDC Skill Certificate & MSME/NASSCOM training credits
                </div>
              </div>
            </div>

            {registeredApplication ? (
              <div className="p-3 bg-emerald-950/20 border border-emerald-900/50 rounded-xl flex items-start gap-2 text-[11px] text-emerald-400 leading-relaxed">
                <AlertCircle size={14} className="mt-0.5 shrink-0" />
                You already have an active application portal matching this session! Check the status at the bottom of the page in the Applications Registry.
              </div>
            ) : (
              <div className="flex items-center gap-3 mt-1.5 flex-col sm:flex-row">
                <button
                  onClick={handleConfirmProfile}
                  className="w-full sm:w-auto flex-1 flex items-center justify-center gap-1.5 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-xs font-semibold shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                >
                  Lock In & Apply for {activeArchetype.name}
                  <ArrowRight size={14} />
                </button>
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl border border-zinc-800 hover:border-zinc-700 hover:bg-white/2 text-zinc-400 hover:text-zinc-200 text-xs font-semibold transition-all cursor-pointer"
                >
                  Start Over
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
