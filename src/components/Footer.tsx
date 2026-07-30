import { MouseEvent } from "react";
import { MapPin, Phone, Mail, Globe, Instagram, Facebook, Youtube, MessageCircle } from "lucide-react";
import IINTLogo from "./IINTLogo";

interface FooterProps {
  onNavigate?: (pageId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleNavClick = (e: MouseEvent, pageId: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(pageId);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="relative z-10 bg-[#080d1a] border-t border-blue-900/40 pt-12 sm:pt-16 pb-8 px-4 sm:px-6 md:px-10 text-left">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Main 4-Column Layout strictly for IINT Computer Education */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Column 1: Brand Logo & Mission (col-span-4) */}
          <div className="lg:col-span-4 space-y-5">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <IINTLogo size="md" showTagline={true} />
            </div>

            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-light">
              IINT Computer Education is Delhi & Haryana's premier academy for practical vocational computer diplomas, Digital Marketing & AI, Data Analytics & Power BI, financial accounting (Tally Prime with GST), software coding, graphic design, hardware networking, teacher training, and university degree programs. Certified ISO 9001:2015.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://www.instagram.com/iint_sonipat?igsh=MXIxYXY4MnN6emJtbw=="
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-pink-500/50 hover:bg-pink-950/30 text-zinc-400 hover:text-pink-400 flex items-center justify-center transition-all cursor-pointer"
                title="Instagram"
              >
                <Instagram size={15} />
              </a>
              <a
                href="https://wa.me/919255593976"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 hover:bg-emerald-950/30 text-zinc-400 hover:text-emerald-400 flex items-center justify-center transition-all cursor-pointer"
                title="WhatsApp Message"
              >
                <MessageCircle size={15} />
              </a>
              <a
                href="https://www.facebook.com/share/19A6P1KQG9/"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-blue-500/50 hover:bg-blue-950/30 text-zinc-400 hover:text-blue-400 flex items-center justify-center transition-all cursor-pointer"
                title="Facebook"
              >
                <Facebook size={15} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-red-500/50 hover:bg-red-950/30 text-zinc-400 hover:text-red-400 flex items-center justify-center transition-all cursor-pointer"
                title="YouTube Channel"
              >
                <Youtube size={15} />
              </a>
            </div>
          </div>

          {/* Column 2: CONTACT DETAILS (col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-sans font-extrabold uppercase text-white tracking-wider flex items-center gap-2">
              IINT BRANCH LOCATIONS
            </h4>

            <div className="space-y-3.5 text-xs">
              {/* Head Branch Rohini */}
              <a 
                href="https://g.co/kgs/7kcNyT" 
                target="_blank" 
                rel="noreferrer"
                className="flex gap-2.5 items-start p-2.5 rounded-xl hover:bg-blue-900/30 transition-all border border-blue-500/30 hover:border-blue-400 cursor-pointer group bg-blue-950/20"
                title="Click to open Head Branch Rohini on Google Maps"
              >
                <MapPin size={15} className="text-blue-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div className="space-y-0.5 w-full">
                  <span className="text-[11px] font-sans text-blue-400 uppercase font-bold flex items-center justify-between">
                    <span>Head Branch (Rohini)</span>
                    <span className="text-[10px] text-blue-300 font-medium">🗺️ Map</span>
                  </span>
                  <p className="text-zinc-200 font-sans font-medium text-xs leading-snug group-hover:text-white transition-colors">
                    3rd Floor, C - 9/7, above Liberty Showroom, opp. Metro Pillar - 396, Pocket 9, Sector 7, Rohini, Delhi, 110085
                  </p>
                  <p className="text-xs font-sans text-blue-300 font-bold">
                    📞 070110 16060
                  </p>
                </div>
              </a>

              {/* Head Branch Narela */}
              <a 
                href="https://maps.google.com/?q=IINT+Adarsh+Computer+Education+Narela+Delhi" 
                target="_blank" 
                rel="noreferrer"
                className="flex gap-2.5 items-start p-2.5 rounded-xl hover:bg-blue-900/30 transition-all border border-blue-500/30 hover:border-blue-400 cursor-pointer group bg-blue-950/20"
                title="Click to open Head Branch Narela on Google Maps"
              >
                <MapPin size={15} className="text-blue-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div className="space-y-0.5 w-full">
                  <span className="text-[11px] font-sans text-blue-400 uppercase font-bold flex items-center justify-between">
                    <span>Head Branch (Narela)</span>
                    <span className="text-[10px] text-blue-300 font-medium">🗺️ Map</span>
                  </span>
                  <p className="text-zinc-200 font-sans font-medium text-xs leading-snug group-hover:text-white transition-colors">
                    IINT Adarsh Computer Education, 1st Floor, Near RK Sweets, Safiabad Road, Narela, Delhi 110040
                  </p>
                  <p className="text-xs font-sans text-blue-300 font-bold">
                    📞 +91 92126 21301
                  </p>
                </div>
              </a>

              {/* Branch 1 */}
              <a 
                href="https://maps.google.com/?q=IINT+Computer+Education+Murthal+Road+Sonipat" 
                target="_blank" 
                rel="noreferrer"
                className="flex gap-2.5 items-start p-2.5 rounded-xl hover:bg-blue-900/30 transition-all border border-blue-500/30 hover:border-blue-400 cursor-pointer group bg-blue-950/20"
                title="Click to open Branch 1 location on Google Maps"
              >
                <MapPin size={15} className="text-blue-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div className="space-y-0.5 w-full">
                  <span className="text-[11px] font-sans text-blue-400 uppercase font-bold flex items-center justify-between">
                    <span>Branch 1 (Murthal Road)</span>
                    <span className="text-[10px] text-blue-300 font-medium">🗺️ Map</span>
                  </span>
                  <p className="text-zinc-200 font-sans font-medium text-xs leading-snug group-hover:text-white transition-colors">
                    Opposite GVM College, Near GGSSS School, Murthal Road, Sonepat, Haryana
                  </p>
                  <p className="text-xs font-sans text-blue-300 font-bold">
                    📞 +91 92555 93976
                  </p>
                </div>
              </a>

              {/* Branch 2 */}
              <a 
                href="https://maps.google.com/?q=IINT+Computer+Education+Model+Town+Sonipat" 
                target="_blank" 
                rel="noreferrer"
                className="flex gap-2.5 items-start p-2.5 rounded-xl hover:bg-blue-900/30 transition-all border border-blue-500/30 hover:border-blue-400 cursor-pointer group bg-blue-950/20"
                title="Click to open Branch 2 location on Google Maps"
              >
                <MapPin size={15} className="text-blue-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div className="space-y-0.5 w-full">
                  <span className="text-[11px] font-sans text-blue-400 uppercase font-bold flex items-center justify-between">
                    <span>Branch 2 (Model Town)</span>
                    <span className="text-[10px] text-blue-300 font-medium">🗺️ Map</span>
                  </span>
                  <p className="text-zinc-200 font-sans font-medium text-xs leading-snug group-hover:text-white transition-colors">
                    Behind R.K. Sweets, Near Kachey Quarter, Model Town, Subhash Chowk, Sonepat, Haryana
                  </p>
                  <p className="text-xs font-sans text-blue-300 font-bold">
                    📞 +91 82229 73338
                  </p>
                </div>
              </a>

              {/* Branch 3 (Bawana) */}
              <a 
                href="https://maps.google.com/?q=IINT+Computer+Center+Jaipal+Tower+Bawana+Delhi" 
                target="_blank" 
                rel="noreferrer"
                className="flex gap-2.5 items-start p-2.5 rounded-xl hover:bg-blue-900/30 transition-all border border-blue-500/30 hover:border-blue-400 cursor-pointer group bg-blue-950/20"
                title="Click to open Branch 3 Bawana on Google Maps"
              >
                <MapPin size={15} className="text-blue-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div className="space-y-0.5 w-full">
                  <span className="text-[11px] font-sans text-blue-400 uppercase font-bold flex items-center justify-between">
                    <span>Branch 3 (Bawana)</span>
                    <span className="text-[10px] text-blue-300 font-medium">🗺️ Map</span>
                  </span>
                  <p className="text-zinc-200 font-sans font-medium text-xs leading-snug group-hover:text-white transition-colors">
                    IINT Computer Center, 2nd Floor, Jaipal Tower, Main Auchandi Road, Bawana, Delhi
                  </p>
                  <p className="text-xs font-sans text-blue-300 font-bold">
                    📞 +91 98910 65660
                  </p>
                </div>
              </a>

              {/* Email */}
              <a 
                href="mailto:learn.iintindia@gmail.com"
                className="flex gap-2.5 items-center pt-1 px-2 hover:text-emerald-400 transition-colors group cursor-pointer"
                title="Send email to learn.iintindia@gmail.com"
              >
                <Mail size={15} className="text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
                <p className="text-zinc-200 font-sans text-xs font-bold underline decoration-emerald-500/50 group-hover:text-emerald-300">learn.iintindia@gmail.com</p>
              </a>

              {/* Web */}
              <a 
                href="https://www.iinteducation.com" 
                target="_blank" 
                rel="noreferrer" 
                className="flex gap-2.5 items-center px-2 hover:text-emerald-400 transition-colors group cursor-pointer"
              >
                <Globe size={15} className="text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
                <p className="text-zinc-300 font-sans text-[11px] group-hover:text-emerald-300">www.iinteducation.com</p>
              </a>
            </div>
          </div>

          {/* Column 3: HELPLINE DESK (col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-2">
              <Phone size={15} className="text-emerald-400 shrink-0" />
              <h4 className="text-xs font-sans font-extrabold uppercase text-white tracking-wider">
                ADMISSION HELPLINES
              </h4>
              <span className="text-[9px] font-sans uppercase bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded-full font-bold border border-emerald-500/20">
                9AM–7PM
              </span>
            </div>

            <div className="space-y-2.5 text-xs text-zinc-300 font-sans">
              <a href="tel:+917011016060" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                <Phone size={13} className="text-white shrink-0" />
                <span className="font-semibold text-white text-xs">070110 16060 (Rohini)</span>
              </a>
              <a href="tel:+919212621301" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                <Phone size={13} className="text-white shrink-0" />
                <span className="font-semibold text-white text-xs">+91 92126 21301 (Narela)</span>
              </a>
              <a href="tel:+919255593976" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                <Phone size={13} className="text-white shrink-0" />
                <span className="font-semibold text-white text-xs">+91 92555 93976 (Sonipat)</span>
              </a>
              <a href="tel:+918222973338" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                <Phone size={13} className="text-white shrink-0" />
                <span className="font-semibold text-white text-xs">+91 82229 73338 (Sonipat)</span>
              </a>
              <a href="tel:+919891065660" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                <Phone size={13} className="text-white shrink-0" />
                <span className="font-semibold text-white text-xs">+91 98910 65660 (Bawana)</span>
              </a>
              <a href="mailto:learn.iintindia@gmail.com" className="flex items-center gap-2 hover:text-emerald-400 transition-colors pt-2 border-t border-zinc-800/80">
                <Mail size={13} className="text-emerald-400 shrink-0" />
                <span className="font-bold text-emerald-300 text-xs">learn.iintindia@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Column 4: QUICK LINKS (col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono font-black uppercase text-white tracking-wider">
              QUICK LINKS
            </h4>

            <ul className="space-y-2.5 text-xs text-zinc-200 font-semibold">
              <li>
                <a 
                  href="#home" 
                  onClick={(e) => handleNavClick(e, "home")} 
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer group"
                >
                  <span className="text-emerald-400 group-hover:translate-x-0.5 transition-transform">›</span> Home
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  onClick={(e) => handleNavClick(e, "about")} 
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer group"
                >
                  <span className="text-emerald-400 group-hover:translate-x-0.5 transition-transform">›</span> About IINT
                </a>
              </li>
              <li>
                <a 
                  href="#courses" 
                  onClick={(e) => handleNavClick(e, "courses")} 
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer group"
                >
                  <span className="text-emerald-400 group-hover:translate-x-0.5 transition-transform">›</span> Courses
                </a>
              </li>
              <li>
                <a 
                  href="#gallery" 
                  onClick={(e) => handleNavClick(e, "gallery")} 
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer group text-blue-300 font-bold"
                >
                  <span className="text-blue-400 group-hover:translate-x-0.5 transition-transform">›</span> Campus Gallery & Photos
                </a>
              </li>
              <li>
                <a 
                  href="#brochures" 
                  onClick={(e) => handleNavClick(e, "brochures")} 
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer group"
                >
                  <span className="text-emerald-400 group-hover:translate-x-0.5 transition-transform">›</span> Download Brochure (JPG)
                </a>
              </li>
              <li>
                <a 
                  href="#faq" 
                  onClick={(e) => handleNavClick(e, "faq")} 
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer group"
                >
                  <span className="text-emerald-400 group-hover:translate-x-0.5 transition-transform">›</span> FAQ & Help Desk
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  onClick={(e) => handleNavClick(e, "contact")} 
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer group"
                >
                  <span className="text-emerald-400 group-hover:translate-x-0.5 transition-transform">›</span> Contact Us
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright bar */}
        <div className="pt-8 border-t border-zinc-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-zinc-500 text-xs font-mono">
          <p>© 2026 IINT Computer Education (Indian Institute of Networking & Technology). All Rights Reserved.</p>
          <span className="text-zinc-600 text-[11px]">ISO 9001:2015 Certified Educational Institute • Rohini (Delhi) • Sonepat • Narela • Bawana</span>
        </div>

      </div>
    </footer>
  );
}



