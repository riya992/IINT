import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Bot, Sparkles, Clock, Phone, MapPin, Award, CheckCircle2 } from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
}

export default function QueryAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltipBadge, setShowTooltipBadge] = useState(true);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "Hello! Welcome to IINT Adarsh Computer Education AI Assistant. How can I help you today with courses, fees, batch timings (9 AM - 7 PM), or admissions?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const quickPrompts = [
    "What are the institute batch timings?",
    "Tell me about DCA & ADCA courses",
    "Are certificates valid for Govt Jobs?",
    "How to apply for online admission?",
    "Where is Sonepat campus located?"
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage("");

    // Generate intelligent AI response based on Adarsh Institute facts
    setTimeout(() => {
      let botReply = "Thank you for your query! Our admission helplines at 070110 16060, +91 92126 21301, 9255593976, 8222973338, and +91 98910 65660 are available to assist you.";
      const lower = query.toLowerCase();

      if (lower.includes("timing") || lower.includes("batch") || lower.includes("time") || lower.includes("open") || lower.includes("hours")) {
        botReply = "⏰ Batch Timings: IINT Adarsh Institute operates flexible batches from 9:00 AM to 7:00 PM (Monday to Saturday). Special weekend batches are also available for working professionals and college students!";
      } else if (lower.includes("dca") || lower.includes("adca") || lower.includes("computer") || lower.includes("diploma")) {
        botReply = "💻 Computer Diplomas:\n• DCA (Diploma in Computer Applications - 12 Months)\n• ADCA (Advanced Diploma in Computer Applications - 1 Year)\n• Tally Prime with GST, Python & Web Development.\nAll programs include 100% practical lab practice!";
      } else if (lower.includes("govt") || lower.includes("valid") || lower.includes("job") || lower.includes("certificate") || lower.includes("recognition")) {
        botReply = "✅ Government Recognition: Yes, 100% valid! Adarsh Welfare and Education Society is registered with the Govt of India (ISO 9001:2015). Our diplomas/certificates are recognized for Govt job registrations, banking, and top private sector companies.";
      } else if (lower.includes("fee") || lower.includes("cost") || lower.includes("price") || lower.includes("discount")) {
        botReply = "💳 Fee Structure: Course fees are highly affordable with flexible monthly installment options and merit concessions. Please fill out our 'Apply Now' form or call 070110 16060 / 9255593976 for exact fee breakups and current scholarship offers!";
      } else if (lower.includes("apply") || lower.includes("admission") || lower.includes("register") || lower.includes("join")) {
        botReply = "📝 Admissions: You can apply directly online using the 'Apply Now' button at the top, or visit any of our Sonepat, Narela & Bawana Campuses directly between 9 AM and 7 PM.";
      } else if (lower.includes("location") || lower.includes("address") || lower.includes("where") || lower.includes("rohini") || lower.includes("sonepat") || lower.includes("sonipat") || lower.includes("head") || lower.includes("branch") || lower.includes("narela") || lower.includes("bawana")) {
        botReply = "📍 Campus Addresses:\n• Head Branch (Rohini): 3rd Floor, C - 9/7, above Liberty Showroom, opp. Metro Pillar - 396, Pocket 9, Sector 7, Rohini, Delhi, 110085 (Phone: 070110 16060 | Map: https://g.co/kgs/7kcNyT)\n• Head Branch (Narela): IINT Adarsh Computer Education, 1st Floor, Near RK Sweets, Safiabad Road, Narela, Delhi 110040 (Phone: +91 92126 21301)\n• Branch 1 (Murthal Road): Opposite GVM College, Near GGSSS School, Murthal Road, Sonepat (Phone: 9255593976)\n• Branch 2 (Model Town): Behind R.K. Sweets, Near Kachey Quarter, Model Town, Sonepat (Phone: 8222973338)\n• Branch 3: IINT Computer Center, 2nd Floor, Jaipal Tower, Main Auchandi Road, Bawana, Delhi (Phone: +91 98910 65660)";
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  return (
    <div className="fixed bottom-3 right-1 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-2">
      
      {/* Floating Badge Tooltip and Button Row */}
      <div className="flex flex-row items-center justify-end gap-2">
        {/* Floating Badge Tooltip on side: "Hello! How IINT can help you?" */}
        <AnimatePresence>
          {showTooltipBadge && !isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: 10 }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-zinc-950/95 text-white border border-zinc-800 shadow-2xl backdrop-blur-md text-[11px] xs:text-xs font-semibold cursor-pointer group whitespace-nowrap"
              onClick={() => setIsOpen(true)}
            >
              <span className="flex items-center gap-1 text-zinc-100">
                <Sparkles size={14} className="text-amber-400 animate-pulse shrink-0" />
                Hello! How IINT can help you?
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTooltipBadge(false);
                }}
                className="p-1 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors ml-0.5"
                title="Close notification"
              >
                <X size={12} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI Assistant Floating Button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTooltipBadge(false);
          }}
          className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-emerald-500 p-0.5 shadow-[0_0_25px_rgba(245,158,11,0.35)] flex items-center justify-center cursor-pointer group shrink-0"
        >
          <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center text-amber-400 group-hover:text-white transition-colors">
            {isOpen ? <X size={22} /> : <MessageSquare size={22} className="fill-amber-400/20" />}
          </div>
        </motion.button>
      </div>

      {/* Query AI Assistant Drawer / Popup Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-[92vw] sm:w-[380px] h-[500px] sm:h-[520px] rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl flex flex-col overflow-hidden text-white mt-1"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-zinc-900 to-zinc-950 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 text-white shadow-md">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white tracking-tight flex items-center gap-1.5">
                    Query AI Assistant
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  </h3>
                  <p className="text-[10px] text-zinc-400 font-mono">Instant Support • Batch Hours: 9 AM - 7 PM</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-zinc-950/60 font-sans text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-br-none"
                        : "bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-bl-none whitespace-pre-line"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] font-mono text-zinc-500 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            <div className="p-2 bg-zinc-900/80 border-t border-zinc-800/80 flex gap-1.5 overflow-x-auto no-scrollbar text-[10px]">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  className="px-2.5 py-1 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700/60 whitespace-nowrap transition-all cursor-pointer shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-zinc-950 border-t border-zinc-800 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about courses, fees, batch timings..."
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-amber-500 outline-none transition-all"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="p-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:opacity-90 disabled:opacity-40 text-white transition-all cursor-pointer shadow-md"
              >
                <Send size={15} />
              </button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
