import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle, Award, Clock, Laptop, ShieldCheck, HelpCircle as HelpIcon, ArrowRight } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: "certifications" | "timings" | "labs" | "support";
  icon: any;
}

const FAQS: FAQItem[] = [
  {
    category: "timings",
    question: "What are the batch timings and flexibility? / बैच टाइमिंग्स और फ्लेक्सिबिलिटी की क्या व्यवस्था है?",
    answer: "English: We offer flexible batch timings between 9:00 AM and 7:00 PM for college students and working professionals, including special weekend batches on Saturday & Sunday.\n\nहिंदी: हम छात्रों और कामकाजी पेशेवरों के लिए सुबह 9:00 AM से शाम 7:00 PM के बीच फ्लेक्सिबल बैच टाइमिंग्स प्रदान करते हैं, जिसमें शनिवार और रविवार को विशेष वीकेंड बैच भी शामिल हैं।",
    icon: Clock
  },
  {
    category: "support",
    question: "What is the admission process? / प्रवेश प्रक्रिया (Admission Process) क्या है?",
    answer: "English: You can apply online via our website's 'Apply Now' form or visit our Sonepat Campus directly. Our expert career counselors will guide you within 24 hours to select the ideal program.\n\nहिंदी: आप हमारी वेबसाइट के 'Apply Now' फॉर्म से ऑनलाइन आवेदन कर सकते हैं या सीधे हमारे सोनीपत कैंपस में आ सकते हैं। हमारे एक्सपर्ट काउंसलर्स 24 घंटे के अंदर संपर्क करके सबसे बेहतरीन कोर्स चुनने में मदद करेंगे।",
    icon: Award
  },
  {
    category: "certifications",
    question: "Are these diplomas & certificates valid for Government and Private Jobs? / क्या ये डिप्लोमा और सर्टिफिकेट सरकारी व प्राइवेट नौकरियों के लिए मान्य हैं?",
    answer: "English: Yes, 100% valid! Indian Institute of Networking and Technology Foundation is registered with the Govt of India. All certifications are fully recognized for government job registrations, competitive exams, banking, and top private sector companies.\n\nहिंदी: हाँ, 100% मान्य है! भारतीय नेटवर्किंग एवं प्रौद्योगिकी संस्थान फाउंडेशन भारत सरकार द्वारा पंजीकृत और मान्यता प्राप्त है। हमारे प्रमाण पत्र सरकारी नौकरी पंजीकरण, प्रतियोगी परीक्षाओं, बैंकिंग और शीर्ष निजी कंपनियों के लिए पूरी तरह मान्य हैं।",
    icon: ShieldCheck
  },
  {
    category: "labs",
    question: "What is the course duration and is study material provided? / कोर्स की अवधि क्या है और क्या स्टडी मटेरियल प्रदान किया जाता है?",
    answer: "English: Course duration ranges from 2 months (short-term skill certificates) to 1 year (ADCA, PGDCA) or 3 years (UG/Diploma degrees). Printed chapter-wise study materials, practical workbooks, and project guides are provided completely free of cost.\n\nहिंदी: कोर्सेज की अवधि 2 महीने (शॉर्ट-टर्म) से लेकर 1 वर्ष (ADCA, PGDCA) या 3 वर्ष (UG/डिप्लोमा) तक होती है। प्रत्येक छात्र को चैप्टर-वाइज प्रिंटेड स्टडी मटेरियल, प्रैक्टिकल वर्कबुक और प्रोजेक्ट असाइनमेंट्स निशुल्क दिए जाते हैं।",
    icon: Laptop
  },
  {
    category: "support",
    question: "What support is provided for missed classes and extra lab practice? / क्लास मिस होने और एक्स्ट्रा प्रैक्टिकल लैब प्रैक्टिस के लिए क्या सपोर्ट मिलता है?",
    answer: "English: If you miss a class, backup doubt-clearing sessions are arranged. Our modern computer labs remain open all day so you can practice extra hours anytime with dedicated faculty guidance.\n\nहिंदी: यदि आपकी क्लास मिस हो जाती है, तो बैकअप और डाउट-क्लियरिंग सेशंस दिए जाते हैं। हमारी आधुनिक कंप्यूटर लैब पूरे दिन खुली रहती है ताकि आप फैकल्टी के मार्गदर्शन में जब चाहें अतिरिक्त अभ्यास कर सकें।",
    icon: HelpCircle
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      id="faq" 
      className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-24 border-t border-zinc-900/60"
    >
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-violet-600/5 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-16 gap-3">
        <span className="text-xs font-mono uppercase text-violet-400 tracking-widest flex items-center gap-1.5">
          <HelpIcon size={12} /> Got Questions?
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
          Frequently Asked Questions
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full mt-2" />
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-light mt-3">
          आदर्श कंप्यूटर एजुकेशन से जुड़े कुछ मुख्य सवाल और उनके सटीक जवाब।
        </p>
      </div>

      {/* Accordion Container */}
      <div className="space-y-4">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          const CategoryIcon = faq.icon;

          return (
            <div
              key={index}
              id={`faq-item-${index}`}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen 
                  ? "bg-zinc-900/45 border-violet-500/30 shadow-lg shadow-violet-500/[0.02]" 
                  : "bg-zinc-950/35 border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/10"
              }`}
            >
              {/* Trigger Button */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left gap-3 sm:gap-4 focus:outline-none cursor-pointer"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div className={`p-2 sm:p-2.5 rounded-xl border transition-all duration-300 shrink-0 ${
                    isOpen 
                      ? "bg-violet-500/10 text-violet-400 border-violet-500/20" 
                      : "bg-zinc-900/60 text-zinc-400 border-zinc-800"
                  }`}>
                    <CategoryIcon size={18} className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className={`font-semibold text-xs sm:text-base tracking-tight transition-colors truncate whitespace-normal line-clamp-2 ${
                    isOpen ? "text-white" : "text-zinc-300"
                  }`}>
                    {faq.question}
                  </span>
                </div>
                
                <div className={`p-1 rounded-lg border transition-all duration-300 shrink-0 ${
                  isOpen 
                    ? "bg-violet-500/10 text-violet-400 border-violet-500/20 rotate-180" 
                    : "bg-zinc-900/60 text-zinc-500 border-zinc-800"
                }`}>
                  <ChevronDown size={16} />
                </div>
              </button>

              {/* Collapsible Content */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-1 pl-4 xs:pl-12 sm:pl-16 border-t border-zinc-900/60">
                      <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-light">
                        {faq.answer}
                      </p>
                      
                      {/* Sub-context indicator */}
                      <div className="mt-4 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                          Active & Updated for 2026 Curriculum
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Trust Quote / Helper */}
      <div className="mt-12 text-center p-6 rounded-2xl bg-zinc-950/20 border border-zinc-900/60 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-left">
          <h4 className="text-sm font-bold text-white tracking-tight">Have a custom requirement?</h4>
          <p className="text-xs text-zinc-500 font-light mt-0.5">Need customized schedules or corporate enterprise licensing?</p>
        </div>
        <a
          href="tel:+919255593976"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs font-bold border border-emerald-500/30 transition-all active:scale-95 cursor-pointer flex items-center gap-2 shrink-0 shadow-lg"
        >
          📞 Talk to Counselor
        </a>
      </div>

    </section>
  );
}
