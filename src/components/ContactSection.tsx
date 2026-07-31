import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Phone, Mail, MapPin, Send, CheckCircle2, ShieldAlert, Clock } from "lucide-react";
import { submitToGoogleSheet } from "../lib/googleSheetApi";
import { saveWhatsAppEnquiry } from "../lib/whatsapp";
import { IINT_BRANCHES, getGoogleMapsDirectionsUrl, getGoogleMapsEmbedUrl, getTelLink } from "../lib/locations";

interface ContactSectionProps {
  isFullPage?: boolean;
}

export default function ContactSection({ isFullPage = false }: ContactSectionProps) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", state: "Haryana", subject: "Admission", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) return;

    setIsSubmitting(true);

    const sent = await submitToGoogleSheet({
      formType: "contact",
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      state: formData.state,
      subject: formData.subject,
      message: formData.message,
    });

    setIsSubmitting(false);

    if (!sent) {
      alert("Could not reach the server. Please try again or call the campus helpline.");
      return;
    }

    saveWhatsAppEnquiry({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      state: formData.state,
      message: formData.message,
      course: formData.subject,
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", phone: "", state: "Haryana", subject: "Admission", message: "" });
      setIsSubmitted(false);
    }, 4500);
  };

  return (
    <section 
      id="contact-section" 
      className={`relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-24 ${
        !isFullPage ? "border-t border-zinc-900/60" : "pt-24"
      }`}
    >
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16 gap-3">
        <span className="text-xs font-sans uppercase text-emerald-400 tracking-widest bg-emerald-950/40 px-3 py-1.5 rounded-full border border-emerald-500/20 font-extrabold">
          Campus Connection
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none text-white uppercase">
          {isFullPage ? "Contact Admissions & Campus" : "Get In Touch With IINT"}
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mt-2 animate-pulse" />
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-light mt-3">
          Have questions about syllabus, batch timings, fees, or certifications? Reach out to our campus counselors or send us a message directly.
        </p>
      </div>

      {/* Main Form & details Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Campus Details & Interactive Map */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              Campus Location & Helplines
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed">
              We welcome you to visit our Head Branch campus in Rohini, Delhi or any of our Sonepat, Narela & Bawana campuses to inspect our active lab environments and consult with counselors in person.
            </p>

            <div className="grid grid-cols-1 gap-3.5">
              <div className="p-4 rounded-2xl bg-zinc-950/40 backdrop-blur-md border border-zinc-900 flex gap-3.5 items-center">
                <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/15 shrink-0">
                  <Phone size={16} />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">Helpline Numbers</span>
                  <span className="text-white text-xs sm:text-sm font-black block mt-0.5">
                    <a href="tel:+917011016060" className="hover:text-emerald-400 transition-colors">7011016060</a>
                    {", "}
                    <a href="tel:+919255593976" className="hover:text-emerald-400 transition-colors">9255593976</a>
                    {", "}
                    <a href="tel:+918222973338" className="hover:text-emerald-400 transition-colors">8222973338</a>
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950/40 backdrop-blur-md border border-zinc-900 flex gap-3.5 items-center">
                <div className="p-2.5 bg-teal-500/10 rounded-xl text-teal-400 border border-teal-500/15 shrink-0">
                  <Mail size={16} />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">Official Email</span>
                  <a href="mailto:learn.iintindia@gmail.com" className="text-emerald-300 hover:underline text-xs sm:text-sm block mt-0.5 font-mono font-bold">learn.iintindia@gmail.com</a>
                </div>
              </div>

              {IINT_BRANCHES.map((branch) => (
                <div
                  key={branch.id}
                  className="p-4 rounded-2xl bg-blue-950/20 backdrop-blur-md border border-blue-500/30 flex gap-3.5 items-start hover:border-blue-400 transition-all group"
                >
                  <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400 border border-blue-500/20 shrink-0 mt-0.5">
                    <MapPin size={16} />
                  </div>
                  <div className="space-y-1 w-full">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-sans text-blue-400 uppercase tracking-wide font-extrabold">{branch.name}</span>
                      <a
                        href={getGoogleMapsDirectionsUrl(branch.address)}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] text-blue-300 font-sans bg-blue-900/60 px-2 py-0.5 rounded border border-blue-500/30 shrink-0 hover:text-white"
                      >
                        Directions ↗
                      </a>
                    </div>
                    <a
                      href={getGoogleMapsDirectionsUrl(branch.address)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-white text-xs sm:text-sm block leading-relaxed font-sans font-medium hover:text-blue-100 transition-colors"
                    >
                      {branch.address}
                    </a>
                    <a
                      href={getTelLink(branch.phone)}
                      className="text-xs text-blue-300 font-sans font-bold flex items-center gap-1 pt-0.5 hover:text-emerald-400 transition-colors w-fit"
                    >
                      <Phone size={12} />
                      <span>{branch.phone}</span>
                    </a>
                  </div>
                </div>
              ))}

              <div className="p-4 rounded-2xl bg-zinc-950/40 backdrop-blur-md border border-zinc-900 flex gap-3.5 items-center">
                <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/15 shrink-0">
                  <Clock size={16} />
                </div>
                <div>
                  <span className="text-[10px] font-sans text-zinc-400 uppercase tracking-wider block font-bold">Operational Hours</span>
                  <span className="text-white text-xs sm:text-sm block mt-0.5 font-sans font-medium">Monday – Saturday: 9:00 AM to 7:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Head Branch Rohini Interactive Map */}
          <div className="relative rounded-3xl overflow-hidden border border-zinc-900 h-48 sm:h-64 shadow-2xl bg-zinc-950 mt-4 group">
            <a
              href={getGoogleMapsDirectionsUrl(IINT_BRANCHES[0].address)}
              target="_blank"
              rel="noreferrer"
              className="block w-full h-full"
              title="Open directions to Head Branch Rohini"
            >
              <iframe 
                src={getGoogleMapsEmbedUrl(IINT_BRANCHES[0].address)}
                className="w-full h-full border-0 brightness-[0.75] contrast-[1.15] saturate-[0.8] group-hover:brightness-[0.85] transition-all duration-300 pointer-events-none"
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="IINT Head Branch Rohini Map"
              />
            </a>
            <a
              href={getGoogleMapsDirectionsUrl(IINT_BRANCHES[0].address)}
              target="_blank"
              rel="noreferrer"
              className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-sans font-extrabold text-blue-400 border border-blue-500/30 shadow-md hover:bg-blue-950/90 transition-colors"
            >
              📍 Head Branch — Rohini, Delhi (Tap for Directions)
            </a>
          </div>
        </div>

        {/* Right Column: High-End Contact Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-zinc-950/45 border border-zinc-900/90 shadow-2xl flex flex-col justify-between space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Direct Counselor Contact Request
            </h3>
            <p className="text-zinc-500 text-xs font-light">
              Submit your direct question regarding admissions, specific course fees, dynamic batch durations or offline structures.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Your Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter full name"
                  className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl bg-zinc-900/30 border border-zinc-800 text-white focus:border-emerald-500 focus:bg-zinc-950/50 transition-all outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Mobile Number</label>
                <input 
                  type="tel" 
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl bg-zinc-900/30 border border-zinc-800 text-white focus:border-emerald-500 focus:bg-zinc-950/50 transition-all outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Email Address</label>
                <input 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="name@gmail.com"
                  className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl bg-zinc-900/30 border border-zinc-800 text-white focus:border-emerald-500 focus:bg-zinc-950/50 transition-all outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Select State</label>
                <select 
                  value={formData.state}
                  onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                  className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl bg-zinc-900/40 border border-zinc-800 text-white focus:border-emerald-500 focus:bg-zinc-950/50 transition-all outline-none cursor-pointer"
                >
                  {INDIAN_STATES.map(st => (
                    <option key={st} value={st} className="bg-zinc-950">
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Subject Category</label>
              <select 
                value={formData.subject}
                onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl bg-zinc-900/40 border border-zinc-800 text-white focus:border-emerald-500 focus:bg-zinc-950/50 transition-all outline-none cursor-pointer"
              >
                <option value="Admission" className="bg-zinc-950">Admission Details</option>
                <option value="Fee" className="bg-zinc-950">Course Fee Structure</option>
                <option value="Batches" className="bg-zinc-950">Batch Timings & Schedule</option>
                <option value="Verification" className="bg-zinc-950">Certificate Verification</option>
                <option value="Other" className="bg-zinc-950">General Query</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Your Message / Query</label>
              <textarea 
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Type your questions here..."
                className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl bg-zinc-900/30 border border-zinc-800 text-white focus:border-emerald-500 focus:bg-zinc-950/50 transition-all outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
            >
              {isSubmitting ? "Submitting..." : "Submit Query"}
              <Send size={14} />
            </button>
          </form>

          <AnimatePresence>
            {isSubmitted && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/25 text-emerald-400 text-xs flex items-start gap-3"
              >
                <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Query Logged Successfully!</span>
                  <span className="text-zinc-400 block mt-1 font-light">Thank you, {formData.name}. Our admission executive counselor will call you back on your registered phone number within the next few hours.</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </section>
  );
}
