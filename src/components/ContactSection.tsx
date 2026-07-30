import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Phone, Mail, MapPin, Send, CheckCircle2, ShieldAlert, Clock } from "lucide-react";
import { submitToGoogleSheet } from "../lib/googleSheetApi";

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
                  <span className="text-white text-xs sm:text-sm font-black block mt-0.5">070110 16060, 9255593976, 8222973338</span>
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

              {/* Head Branch Rohini */}
              <div className="p-4 rounded-2xl bg-blue-950/20 backdrop-blur-md border border-blue-500/30 flex gap-3.5 items-start hover:border-blue-400 transition-all">
                <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400 border border-blue-500/20 shrink-0 mt-0.5">
                  <MapPin size={16} />
                </div>
                <div className="space-y-1 w-full">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-sans text-blue-400 uppercase tracking-wide font-extrabold">Head Branch (Rohini)</span>
                    <a 
                      href="https://g.co/kgs/7kcNyT" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-[10px] text-blue-300 hover:underline font-sans bg-blue-900/60 px-2 py-0.5 rounded border border-blue-500/30"
                    >
                      Google Map ↗
                    </a>
                  </div>
                  <span className="text-white text-xs sm:text-sm block leading-relaxed font-sans font-medium">
                    3rd Floor, C - 9/7, above Liberty Showroom, opp. Metro Pillar - 396, Pocket 9, Sector 7, Rohini, Delhi, 110085
                  </span>
                  <div className="text-xs text-blue-300 font-sans font-bold flex items-center gap-1 pt-0.5">
                    <Phone size={12} />
                    <span>Phone: 070110 16060</span>
                  </div>
                </div>
              </div>

              {/* Head Branch Narela */}
              <div className="p-4 rounded-2xl bg-blue-950/20 backdrop-blur-md border border-blue-500/30 flex gap-3.5 items-start hover:border-blue-400 transition-all">
                <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400 border border-blue-500/20 shrink-0 mt-0.5">
                  <MapPin size={16} />
                </div>
                <div className="space-y-1 w-full">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-sans text-blue-400 uppercase tracking-wide font-extrabold">Head Branch (Narela)</span>
                    <a 
                      href="https://maps.google.com/?q=IINT+Adarsh+Computer+Education+Narela+Delhi" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-[10px] text-blue-300 hover:underline font-sans bg-blue-900/60 px-2 py-0.5 rounded border border-blue-500/30"
                    >
                      Google Map ↗
                    </a>
                  </div>
                  <span className="text-white text-xs sm:text-sm block leading-relaxed font-sans font-medium">IINT Adarsh Computer Education, 1st Floor, Near RK Sweets, Safiabad Road, Narela, Delhi 110040</span>
                  <div className="text-xs text-blue-300 font-sans font-bold flex items-center gap-1 pt-0.5">
                    <Phone size={12} />
                    <span>Phone: +91 92126 21301</span>
                  </div>
                </div>
              </div>

              {/* Branch 1 */}
              <div className="p-4 rounded-2xl bg-blue-950/20 backdrop-blur-md border border-blue-500/30 flex gap-3.5 items-start hover:border-blue-400 transition-all">
                <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400 border border-blue-500/20 shrink-0 mt-0.5">
                  <MapPin size={16} />
                </div>
                <div className="space-y-1 w-full">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-sans text-blue-400 uppercase tracking-wide font-extrabold">Branch 1 (Murthal Road)</span>
                    <a 
                      href="https://maps.google.com/?q=IINT+Computer+Education+Murthal+Road+Sonipat" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-[10px] text-blue-300 hover:underline font-sans bg-blue-900/60 px-2 py-0.5 rounded border border-blue-500/30"
                    >
                      Google Map ↗
                    </a>
                  </div>
                  <span className="text-white text-xs sm:text-sm block leading-relaxed font-sans font-medium">Opposite GVM College, Near GGSSS School, Murthal Road, Sonepat, Haryana</span>
                  <div className="text-xs text-blue-300 font-sans font-bold flex items-center gap-1 pt-0.5">
                    <Phone size={12} />
                    <span>Phone: +91 92555 93976</span>
                  </div>
                </div>
              </div>

              {/* Branch 2 */}
              <div className="p-4 rounded-2xl bg-blue-950/20 backdrop-blur-md border border-blue-500/30 flex gap-3.5 items-start hover:border-blue-400 transition-all">
                <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400 border border-blue-500/20 shrink-0 mt-0.5">
                  <MapPin size={16} />
                </div>
                <div className="space-y-1 w-full">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-sans text-blue-400 uppercase tracking-wide font-extrabold">Branch 2 (Model Town)</span>
                    <a 
                      href="https://maps.google.com/?q=IINT+Computer+Education+Model+Town+Sonipat" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-[10px] text-blue-300 hover:underline font-sans bg-blue-900/60 px-2 py-0.5 rounded border border-blue-500/30"
                    >
                      Google Map ↗
                    </a>
                  </div>
                  <span className="text-white text-xs sm:text-sm block leading-relaxed font-sans font-medium">Behind R.K. Sweets, Near Kachey Quarter, Model Town, Subhash Chowk, Sonepat, Haryana</span>
                  <div className="text-xs text-blue-300 font-sans font-bold flex items-center gap-1 pt-0.5">
                    <Phone size={12} />
                    <span>Phone: +91 82229 73338</span>
                  </div>
                </div>
              </div>

              {/* Branch 3 (Bawana) */}
              <div className="p-4 rounded-2xl bg-blue-950/20 backdrop-blur-md border border-blue-500/30 flex gap-3.5 items-start hover:border-blue-400 transition-all">
                <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400 border border-blue-500/20 shrink-0 mt-0.5">
                  <MapPin size={16} />
                </div>
                <div className="space-y-1 w-full">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-sans text-blue-400 uppercase tracking-wide font-extrabold">Branch 3 (Bawana)</span>
                    <a 
                      href="https://maps.google.com/?q=IINT+Computer+Center+Jaipal+Tower+Bawana+Delhi" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-[10px] text-blue-300 hover:underline font-sans bg-blue-900/60 px-2 py-0.5 rounded border border-blue-500/30"
                    >
                      Google Map ↗
                    </a>
                  </div>
                  <span className="text-white text-xs sm:text-sm block leading-relaxed font-sans font-medium">IINT Computer Center, 2nd Floor, Jaipal Tower, Main Auchandi Road, Bawana, Delhi</span>
                  <div className="text-xs text-blue-300 font-sans font-bold flex items-center gap-1 pt-0.5">
                    <Phone size={12} />
                    <span>Phone: +91 98910 65660</span>
                  </div>
                </div>
              </div>

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
            <iframe 
              src="https://maps.google.com/maps?q=3rd+Floor,+C+-+9/7,+above+Liberty+Showroom,+opp.+Metro+Pillar+-+396,+Pocket+9,+Sector+7,+Rohini,+Delhi,+110085&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              className="w-full h-full border-0 brightness-[0.75] contrast-[1.15] saturate-[0.8] group-hover:brightness-[0.85] transition-all duration-300"
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-sans font-extrabold text-blue-400 border border-blue-500/30 shadow-md">
              📍 Head Branch — Rohini, Delhi (Sector 7)
            </div>
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
