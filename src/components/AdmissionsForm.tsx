import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, FileText, CheckCircle2, User, Mail, Sparkles, Book, ArrowRight, ShieldCheck, Trash2, Edit, X } from "lucide-react";
import { InquiryFormInput, SavedApplication } from "../types";

interface AdmissionsFormProps {
  prefilledArchetype: string;
  prefilledProgram: string;
  onClearPrefill: () => void;
  onApplicationAdded: () => void;
}

export default function AdmissionsForm({
  prefilledArchetype,
  prefilledProgram,
  onClearPrefill,
  onApplicationAdded,
}: AdmissionsFormProps) {
  const [formData, setFormData] = useState<InquiryFormInput>({
    name: "",
    email: "",
    vision: "",
    program: "",
    archetype: "",
  });

  const [savedApplications, setSavedApplications] = useState<SavedApplication[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [editingAppId, setEditingAppId] = useState<string | null>(null);
  const [editVision, setEditVision] = useState("");

  // Available study tracks
  const availablePrograms = [
    "Topological Qubit Architect Program",
    "Quantum Complexity Theorist Program",
    "Quantum Network Systems Engineer Program",
    "Synthetic Genome Programmer Program",
    "Computational Evolutionary Biologist Program",
    "Bio-Digital Deployment Specialist Program",
    "Cortical Interface Neuro-Engineer Program",
    "Cybernetic Mind Architect Program",
    "Bio-Social Interface Engineer Program",
  ];

  // Load applications on mount
  useEffect(() => {
    const local = localStorage.getItem("iint_apps");
    if (local) {
      try {
        setSavedApplications(JSON.parse(local));
      } catch (e) {
        console.error("Error parsing saved applications", e);
      }
    }
  }, []);

  // Sync prefill from wizard
  useEffect(() => {
    if (prefilledArchetype) {
      setFormData((prev) => ({
        ...prev,
        archetype: prefilledArchetype,
        program: prefilledProgram,
      }));
    }
  }, [prefilledArchetype, prefilledProgram]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.vision || !formData.program) {
      alert("Please fulfill all credential fields before launching submission.");
      return;
    }

    const newApp: SavedApplication = {
      id: `AE-${Math.floor(1000 + Math.random() * 9000)}`,
      name: formData.name,
      email: formData.email,
      vision: formData.vision,
      program: formData.program,
      archetype: formData.archetype || "Independent Scholar",
      status: "Reviewing",
      submittedAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const updated = [newApp, ...savedApplications];
    setSavedApplications(updated);
    localStorage.setItem("iint_apps", JSON.stringify(updated));

    setIsSubmitted(true);
    setFormData({
      name: "",
      email: "",
      vision: "",
      program: "",
      archetype: "",
    });
    onClearPrefill();
    onApplicationAdded();

    // Reset success banner after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 6000);
  };

  const handleDeleteApplication = (id: string) => {
    const updated = savedApplications.filter((app) => app.id !== id);
    setSavedApplications(updated);
    localStorage.setItem("iint_apps", JSON.stringify(updated));
    onApplicationAdded();
  };

  const handleStartEdit = (app: SavedApplication) => {
    setEditingAppId(app.id);
    setEditVision(app.vision);
  };

  const handleSaveEdit = (id: string) => {
    const updated = savedApplications.map((app) => {
      if (app.id === id) {
        return { ...app, vision: editVision };
      }
      return app;
    });
    setSavedApplications(updated);
    localStorage.setItem("iint_apps", JSON.stringify(updated));
    setEditingAppId(null);
  };

  return (
    <div className="space-y-8">
      {/* Dynamic Success Alert */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-3"
          >
            <div className="p-1.5 rounded-full bg-emerald-500/20 text-emerald-400 mt-0.5">
              <CheckCircle2 size={16} />
            </div>
            <div>
              <h4 className="font-display font-bold text-emerald-400 text-sm">
                Admissions Request Dispatched Successfully
              </h4>
              <p className="text-zinc-300 text-xs mt-1 leading-relaxed">
                Your credentials and personal vision statement have been encrypted and submitted to the IINT Academic & Affiliation Council. Check the active status of your registry portal below.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* The Application Form */}
        <div className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-6 md:p-8 relative">
          <div className="flex items-center gap-2 mb-6">
            <FileText size={16} className="text-violet-400" />
            <h3 className="font-display text-lg font-bold text-white">
              Secured Admission Registry
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {prefilledArchetype && (
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-violet-950/20 to-cyan-950/20 border border-violet-500/20 flex items-center justify-between">
                <div>
                  <span className="font-mono text-[8px] uppercase tracking-wider text-zinc-500 block">
                    Wizard Prefilled Core Program
                  </span>
                  <span className="text-xs font-semibold text-violet-300">
                    {prefilledArchetype}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onClearPrefill}
                  className="p-1 rounded-full text-zinc-500 hover:text-zinc-300 hover:bg-white/5 transition-colors cursor-pointer"
                  title="Clear match"
                >
                  <X size={12} />
                </button>
              </div>
            )}

            {/* Name Input */}
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <User size={12} className="text-zinc-500" />
                Full Legal Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Dr. Elena Rostova"
                className="w-full bg-black/40 border border-zinc-850 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20 text-xs md:text-sm text-white rounded-xl px-4 py-3 outline-none transition-all"
              />
            </div>

            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <Mail size={12} className="text-zinc-500" />
                Contact Address (Email)
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g., elena.rostova@nexus.org"
                className="w-full bg-black/40 border border-zinc-850 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20 text-xs md:text-sm text-white rounded-xl px-4 py-3 outline-none transition-all"
              />
            </div>

            {/* Program Dropdown */}
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <Book size={12} className="text-zinc-500" />
                Selected Research Tract
              </label>
              <select
                required
                value={formData.program}
                onChange={(e) => {
                  const val = e.target.value;
                  // strip "Program" suffix for archetype
                  const arch = val.replace(" Program", "");
                  setFormData({ ...formData, program: val, archetype: arch });
                }}
                className="w-full bg-black/50 border border-zinc-850 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20 text-xs md:text-sm text-white rounded-xl px-4 py-3 outline-none transition-all cursor-pointer"
              >
                <option value="" disabled className="bg-zinc-950">
                  Select your core academic specialization...
                </option>
                {availablePrograms.map((p, idx) => (
                  <option key={idx} value={p} className="bg-zinc-950">
                    {p}
                  </option>
                ))}
              </select>
            </div>

            {/* Statement of Vision */}
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <Sparkles size={12} className="text-zinc-500" />
                Statement of Intellectual Vision
              </label>
              <textarea
                required
                rows={4}
                value={formData.vision}
                onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                placeholder="State your prospective research goal. Why do you wish to expand the frontiers of human cognition?"
                className="w-full bg-black/40 border border-zinc-850 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20 text-xs md:text-sm text-white rounded-xl px-4 py-3 outline-none transition-all resize-none leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg hover:shadow-violet-500/10 active:scale-95 transition-all cursor-pointer mt-2"
            >
              Dispatch Application Dossier
              <Send size={12} />
            </button>
          </form>
        </div>

        {/* Informational Guidance / Admission Criteria */}
        <div className="flex flex-col gap-6 justify-between">
          <div className="bg-zinc-950/40 border border-zinc-900 rounded-2xl p-6 md:p-8 space-y-4">
            <span className="font-mono text-[9px] uppercase tracking-wider text-cyan-400 block">
              Official Institutional Affiliations
            </span>
            <h3 className="font-display text-lg md:text-xl font-bold text-white">
              Recognized Credentials & Standards
            </h3>
            <p className="text-zinc-400 text-xs leading-relaxed">
              IINT is fully affiliated and certified with leading government frameworks and industry bodies, guaranteeing national & international recognition of your advanced technical skills.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-violet-950 text-violet-400 text-[10px] font-mono flex items-center justify-center shrink-0 border border-violet-800/30">
                  01
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-zinc-200">NSDC Affiliated</h4>
                  <p className="text-zinc-400 text-[11px] mt-0.5">Aligned with the National Skill Development Corporation for verified career-ready skill certifications.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-violet-950 text-violet-400 text-[10px] font-mono flex items-center justify-center shrink-0 border border-violet-800/30">
                  02
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-zinc-200">NDLM & NASSCOM Standard</h4>
                  <p className="text-zinc-400 text-[11px] mt-0.5">Partnered under National Digital Literacy Mission & NASSCOM syllabus rules for elite software engineering standards.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-violet-950 text-violet-400 text-[10px] font-mono flex items-center justify-center shrink-0 border border-violet-800/30">
                  03
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-zinc-200">MSME & ISO 9001:2015 Certified</h4>
                  <p className="text-zinc-400 text-[11px] mt-0.5">Officially registered under MSME, and globally recognized under ISO 9001:2015 Quality Management standards.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-r from-zinc-950 to-zinc-900 border border-zinc-850 flex items-center gap-4">
            <div className="p-3 bg-cyan-950/50 border border-cyan-800/30 text-cyan-400 rounded-xl">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Federally Encrypted Channel
              </h4>
              <p className="text-zinc-400 text-[11px] mt-1 leading-relaxed">
                All dossiers undergo rigorous cryptographic privacy filters. Zero proprietary research drafts are indexable by external scraper modules.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Applications Registry Portal */}
      {savedApplications.length > 0 && (
        <div className="pt-8 border-t border-zinc-900">
          <div className="flex items-center justify-between mb-5">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-violet-400 block">
                Live Admissions Monitor
              </span>
              <h3 className="font-display text-lg font-bold text-white mt-0.5">
                Your Active Portals Registry ({savedApplications.length})
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedApplications.map((app) => (
              <div
                key={app.id}
                className="bg-zinc-950/80 border border-zinc-850 p-5 rounded-xl relative flex flex-col gap-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-white px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                        {app.id}
                      </span>
                      <span className="text-zinc-500 text-[10px] font-mono">
                        {app.submittedAt}
                      </span>
                    </div>
                    <h4 className="font-display font-bold text-sm text-zinc-200 mt-2">
                      {app.name}
                    </h4>
                    <span className="text-[10px] font-mono text-cyan-300 mt-1 block">
                      {app.program} ({app.archetype})
                    </span>
                  </div>

                  {/* Dynamic Status Indicator */}
                  <span className="text-[10px] font-mono font-bold text-violet-400 bg-violet-950/50 border border-violet-850 px-2 py-0.5 rounded-full">
                    {app.status}
                  </span>
                </div>

                <div className="text-xs bg-black/40 border border-zinc-900 p-3.5 rounded-lg">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-500 block mb-1">
                    Submitted Vision Defense:
                  </span>
                  {editingAppId === app.id ? (
                    <div className="space-y-2 mt-2">
                      <textarea
                        value={editVision}
                        onChange={(e) => setEditVision(e.target.value)}
                        className="w-full bg-zinc-900/50 border border-zinc-800 text-xs text-white rounded-lg p-2.5 outline-none focus:border-violet-500"
                        rows={3}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSaveEdit(app.id)}
                          className="px-2.5 py-1 rounded bg-violet-600 hover:bg-violet-500 text-white font-mono text-[9px] font-bold cursor-pointer"
                        >
                          SAVE_CHANGES
                        </button>
                        <button
                          onClick={() => setEditingAppId(null)}
                          className="px-2.5 py-1 rounded border border-zinc-800 hover:bg-white/2 text-zinc-400 font-mono text-[9px] font-bold cursor-pointer"
                        >
                          CANCEL
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-zinc-300 italic leading-relaxed text-[11px]">
                      "{app.vision}"
                    </p>
                  )}
                </div>

                {/* Simulated Admissions Pipeline */}
                <div>
                  <span className="text-[8px] font-mono uppercase text-zinc-500 tracking-wider block mb-2">
                    Evaluation Matrix Progress:
                  </span>
                  <div className="grid grid-cols-4 gap-1 text-[8px] font-mono text-center">
                    <div className="p-1 rounded bg-emerald-950/40 border border-emerald-900 text-emerald-400">
                      RECEIVED
                    </div>
                    <div className="p-1 rounded bg-violet-950/30 border border-violet-900/50 text-violet-300 animate-pulse">
                      ASSESSING
                    </div>
                    <div className="p-1 rounded bg-zinc-900/40 text-zinc-600">
                      INTERVIEW
                    </div>
                    <div className="p-1 rounded bg-zinc-900/40 text-zinc-600">
                      DECISION
                    </div>
                  </div>
                </div>

                {/* Actions */}
                {editingAppId !== app.id && (
                  <div className="flex items-center gap-3 border-t border-zinc-900 pt-3 mt-1">
                    <button
                      onClick={() => handleStartEdit(app)}
                      className="flex items-center gap-1 text-[10px] font-mono text-zinc-500 hover:text-white transition-colors cursor-pointer"
                    >
                      <Edit size={10} />
                      EDIT_VISION_STATEMENT
                    </button>
                    <button
                      onClick={() => handleDeleteApplication(app.id)}
                      className="flex items-center gap-1 text-[10px] font-mono text-red-500/80 hover:text-red-400 transition-colors cursor-pointer ml-auto"
                    >
                      <Trash2 size={10} />
                      WITHDRAW_DOSSIER
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
