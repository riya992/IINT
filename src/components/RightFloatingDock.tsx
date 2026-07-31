import { useState } from "react";
import { MessageCircle, Phone, Instagram, Facebook, Download } from "lucide-react";
import { WHATSAPP_GROUP_URL, openWhatsAppGroupWithEnquiry } from "../lib/whatsapp";
import { downloadIINTBrochure } from "../lib/downloadBrochure";

export default function RightFloatingDock() {
  const [phoneOpen, setPhoneOpen] = useState(false);
  const [whatsappToast, setWhatsappToast] = useState("");
  const [brochureToast, setBrochureToast] = useState("");

  const handleBrochureDownload = async () => {
    await downloadIINTBrochure();
    setBrochureToast("Brochure download shuru — apne phone ki downloads folder check karein");
    setTimeout(() => setBrochureToast(""), 4000);
  };

  return (
    <>
      <div className="fixed right-0 bottom-24 sm:bottom-28 z-40 flex flex-col gap-1.5 p-1.5 bg-zinc-950/90 backdrop-blur-lg border-l border-y border-zinc-800/80 rounded-l-2xl shadow-2xl">
        <a
          href={WHATSAPP_GROUP_URL}
          target="_blank"
          rel="noreferrer"
          title="Join IINT WhatsApp Group"
          onClick={async (e) => {
            e.preventDefault();
            const copied = await openWhatsAppGroupWithEnquiry();
            setWhatsappToast(
              copied
                ? "Group khul raha hai — student details copy ho gayi hain, chat mein paste karein"
                : "WhatsApp group khul raha hai"
            );
            setTimeout(() => setWhatsappToast(""), 4500);
          }}
          className="w-8 h-8 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center transition-all duration-300 shadow-md hover:scale-105 group relative cursor-pointer"
        >
          <MessageCircle size={16} className="fill-white/20" />
          <span className="absolute right-10 bg-zinc-900 text-white text-[11px] font-medium px-2.5 py-1 rounded-lg border border-zinc-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
            WhatsApp Group
          </span>
        </a>

        <div className="relative group">
          <button
            type="button"
            title="Call Helpline"
            onClick={() => setPhoneOpen((open) => !open)}
            className="w-8 h-8 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center transition-all duration-300 shadow-md hover:scale-105 cursor-pointer"
          >
            <Phone size={16} className="fill-slate-950/20" />
          </button>

          <div
            className={`absolute right-10 top-1/2 -translate-y-1/2 transition-all duration-200 z-50 ${
              phoneOpen
                ? "opacity-100 visible pointer-events-auto"
                : "opacity-0 invisible pointer-events-none md:group-hover:opacity-100 md:group-hover:visible md:group-hover:pointer-events-auto"
            }`}
          >
            <div className="bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl p-2 min-w-[148px] flex flex-col gap-1">
              <p className="text-[9px] font-bold uppercase tracking-wider text-amber-400 px-1.5 pb-0.5 border-b border-zinc-800">
                Call Helpline
              </p>
              <a
                href="tel:+917011016060"
                onClick={() => setPhoneOpen(false)}
                className="text-[11px] font-semibold text-white hover:text-amber-300 px-2 py-1.5 rounded-lg hover:bg-zinc-800 transition-colors whitespace-nowrap"
              >
                📞 7011016060
              </a>
              <a
                href="tel:+919255593976"
                onClick={() => setPhoneOpen(false)}
                className="text-[11px] font-semibold text-white hover:text-amber-300 px-2 py-1.5 rounded-lg hover:bg-zinc-800 transition-colors whitespace-nowrap"
              >
                📞 9255593976
              </a>
            </div>
          </div>
        </div>

        <a
          href="https://www.instagram.com/iint_sonipat?igsh=MXIxYXY4MnN6emJtbw=="
          target="_blank"
          rel="noreferrer"
          title="Follow on Instagram"
          className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 hover:opacity-90 text-white flex items-center justify-center transition-all duration-300 shadow-md hover:scale-105 group relative cursor-pointer"
        >
          <Instagram size={16} />
          <span className="absolute right-10 bg-zinc-900 text-white text-[11px] font-medium px-2.5 py-1 rounded-lg border border-zinc-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
            Instagram Updates
          </span>
        </a>

        <a
          href="https://www.facebook.com/share/19A6P1KQG9/"
          target="_blank"
          rel="noreferrer"
          title="Facebook Page"
          className="w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-all duration-300 shadow-md hover:scale-105 group relative cursor-pointer"
        >
          <Facebook size={16} className="fill-white/20" />
          <span className="absolute right-10 bg-zinc-900 text-white text-[11px] font-medium px-2.5 py-1 rounded-lg border border-zinc-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
            Facebook Page
          </span>
        </a>

        <button
          type="button"
          onClick={handleBrochureDownload}
          title="Download IINT Brochure"
          className="w-8 h-8 rounded-lg bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center transition-all duration-300 shadow-md hover:scale-105 group relative cursor-pointer"
        >
          <Download size={16} />
          <span className="absolute right-10 bg-zinc-900 text-white text-[11px] font-medium px-2.5 py-1 rounded-lg border border-zinc-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
            Download Brochure
          </span>
        </button>
      </div>

      {whatsappToast && (
        <div className="fixed bottom-36 right-14 sm:right-16 z-50 max-w-[220px] bg-zinc-900 border border-emerald-500/40 text-emerald-100 text-[11px] font-medium px-3 py-2 rounded-xl shadow-2xl">
          {whatsappToast}
        </div>
      )}

      {brochureToast && (
        <div className="fixed bottom-48 right-14 sm:right-16 z-50 max-w-[220px] bg-zinc-900 border border-rose-500/40 text-rose-100 text-[11px] font-medium px-3 py-2 rounded-xl shadow-2xl">
          {brochureToast}
        </div>
      )}
    </>
  );
}
