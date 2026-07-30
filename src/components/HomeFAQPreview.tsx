import { useState } from "react";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const TOP_FAQS: FAQItem[] = [
  {
    question: "What are the batch timings and flexibility? / बैच टाइमिंग्स और फ्लेक्सिबिलिटी की क्या व्यवस्था है?",
    answer: "English: We offer flexible batch timings between 9:00 AM and 7:00 PM for college students and working professionals, including special weekend batches on Saturday & Sunday.\n\nहिंदी: हम छात्रों और कामकाजी पेशेवरों के लिए सुबह 9:00 AM से शाम 7:00 PM के बीच फ्लेक्सिबल बैच टाइमिंग्स प्रदान करते हैं, जिसमें शनिवार और रविवार को विशेष वीकेंड बैच भी शामिल हैं।"
  },
  {
    question: "What is the admission process? / प्रवेश प्रक्रिया (Admission Process) क्या है?",
    answer: "English: You can apply online via our website's 'Apply Now' form or visit our Sonepat Campus directly. Our expert career counselors will guide you within 24 hours to select the ideal program.\n\nहिंदी: आप हमारी वेबसाइट के 'Apply Now' फॉर्म से ऑनलाइन आवेदन कर सकते हैं या सीधे हमारे सोनीपत कैंपस में आ सकते हैं। हमारे एक्सपर्ट काउंसलर्स 24 घंटे के अंदर संपर्क करके सबसे बेहतरीन कोर्स चुनने में मदद करेंगे।"
  },
  {
    question: "Are these diplomas & certificates valid for Government and Private Jobs? / क्या ये डिप्लोमा और सर्टिफिकेट सरकारी व प्राइवेट नौकरियों के लिए मान्य हैं?",
    answer: "English: Yes, 100% valid! Adarsh Welfare and Education Society is registered with the Govt of India. All certifications are fully recognized for government job registrations, competitive exams, banking, and top private sector companies.\n\nहिंदी: हाँ, 100% मान्य है! आदर्श वेलफेयर एंड एजुकेशन सोसाइटी भारत सरकार द्वारा पंजीकृत और मान्यता प्राप्त है। हमारे प्रमाण पत्र सरकारी नौकरी पंजीकरण, प्रतियोगी परीक्षाओं, बैंकिंग और शीर्ष निजी कंपनियों के लिए पूरी तरह मान्य हैं।"
  },
  {
    question: "What is the course duration and is study material provided? / कोर्स की अवधि क्या है और क्या स्टडी मटेरियल प्रदान किया जाता है?",
    answer: "English: Course duration ranges from 2 months (short-term skill certificates) to 1 year (ADCA, PGDCA) or 3 years (UG/Diploma degrees). Printed chapter-wise study materials, practical workbooks, and project guides are provided completely free of cost.\n\nहिंदी: कोर्सेज की अवधि 2 महीने (शॉर्ट-टर्म) से लेकर 1 वर्ष (ADCA, PGDCA) या 3 वर्ष (UG/डिप्लोमा) तक होती है। प्रत्येक छात्र को चैप्टर-वाइज प्रिंटेड स्टडी मटेरियल, प्रैक्टिकल वर्कबुक और प्रोजेक्ट असाइनमेंट्स निशुल्क दिए जाते हैं।"
  },
  {
    question: "What support is provided for missed classes and extra lab practice? / क्लास मिस होने और एक्स्ट्रा प्रैक्टिकल लैब प्रैक्टिस के लिए क्या सपोर्ट मिलता है?",
    answer: "English: If you miss a class, backup doubt-clearing sessions are arranged. Our modern computer labs remain open all day so you can practice extra hours anytime with dedicated faculty guidance.\n\nहिंदी: यदि आपकी क्लास मिस हो जाती है, तो बैकअप और डाउट-क्लियरिंग सेशंस दिए जाते हैं। हमारी आधुनिक कंप्यूटर लैब पूरे दिन खुली रहती है ताकि आप फैकल्टी के मार्गदर्शन में जब चाहें अतिरिक्त अभ्यास कर सकें।"
  }
];

interface HomeFAQPreviewProps {
  onNavigate: (pageId: string) => void;
}

export default function HomeFAQPreview({ onNavigate }: HomeFAQPreviewProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq-preview" className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 border-t border-zinc-900/60">
      
      {/* Header */}
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12 gap-3">
        <span className="text-xs font-sans font-extrabold uppercase text-emerald-400 tracking-widest bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-500/15 flex items-center gap-1.5">
          <HelpCircle size={12} /> FAQ Quick Look
        </span>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
          Got Questions? Quick Answers
        </h2>
        <p className="text-zinc-400 text-xs sm:text-sm font-light">
          Here are some of the most common questions our students ask before enrolling. Click any to learn more.
        </p>
      </div>

      {/* FAQ list */}
      <div className="space-y-3.5 max-w-3xl mx-auto">
        {TOP_FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen 
                  ? "bg-zinc-900/40 border-emerald-500/20 shadow-lg" 
                  : "bg-zinc-950/20 border-zinc-900 hover:border-zinc-850"
              }`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-5 py-4 flex items-center justify-between text-left gap-4 cursor-pointer"
              >
                <span className={`text-xs sm:text-sm font-bold transition-colors ${isOpen ? "text-white" : "text-zinc-300"}`}>
                  {faq.question}
                </span>
                <div className={`p-1 rounded-lg border transition-all duration-300 ${
                  isOpen ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 rotate-180" : "bg-zinc-900/60 text-zinc-500 border-zinc-800"
                }`}>
                  <ChevronDown size={14} />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 border-t border-zinc-900/40 text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Button to view all */}
      <div className="mt-8 text-center">
        <button
          onClick={() => {
            onNavigate("faq");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="px-6 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white text-xs font-semibold border border-zinc-850 hover:border-zinc-700 transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 mx-auto"
        >
          View All FAQs
          <ArrowRight size={12} />
        </button>
      </div>

    </section>
  );
}
