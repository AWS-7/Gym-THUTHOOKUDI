import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
const faqs = [
  {
    question: 'Is there a trial class available for new members?',
    answer: 'Yes We offer a complimentary trial session for first-time visitors. This allows you to experience our training environment and meet our certified coaches before committing to a plan.',
    category: 'Membership',
  },
  {
    question: 'Do you have dedicated parking for gym members?',
    answer: 'We provide free, secure parking for all IRON EMPIRE members directly in front of the facility. Our premises are under 24/7 CCTV surveillance.',
    category: 'Facility',
  },
  {
    question: 'What are the timing options for CrossFit classes?',
    answer: 'Our CrossFit WODs run throughout the day(5:30 AM, 7:00 AM, 8:30 AM) and Evening (5:00 PM, 6:30 PM, 8:00 PM). Private coaching is available during all operational hours.',
    category: 'Classes',
  },
  {
    question: 'Can I pause my membership if I travel?',
    answer: 'Members with 6-month and annual plans can pause their membership once for up to 15 days due to travel or medical reasons. Please inform our front desk at least 3 days in advance.',
    category: 'Policy',
  },
  {
    question: 'Are there separate locker rooms and showers?',
    answer: 'Yes, we have modern, hygienic locker rooms and shower facilities separate for men and women. We also offer daily locker service and towel service for Elite members.',
    category: 'Facility',
  },
  {
    question: 'Do you provide personalized diet plans?',
    answer: 'Absolutely. All our premium plans include a personalized nutrition roadmap. Our certified nutritionists will design a plan based on your specific goals—whether it\'s fat loss, muscle gain, or athletic performance.',
    category: 'Programs',
  },
];
function FAQItem({ faq, isOpen, onToggle, index }) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`glass clip-angled-sm mb-4 overflow-hidden transition-all duration-500 opacity-0-init ${isVisible ? 'animate-in' : ''}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-center justify-between text-left group transition-all duration-300 hover:bg-white/5"
      >
        <div className="flex items-center gap-4">
          <span className="font-mono-custom text-xs text-electric-orange/60 tracking-widest uppercase">
            0{index + 1}
          </span>
          <h4 className={`font-display text-lg tracking-wide transition-colors duration-300 ${isOpen ? 'text-neon-red' : 'text-white group-hover:text-neon-red'}`}>
            {faq.question}
          </h4>
        </div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-neon-red rotate-180' : 'bg-white/5'}`}>
          <ChevronDown size={18} className={isOpen ? 'text-white' : 'text-gray-400'} />
        </div>
      </button>
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[300px] opacity-100 border-t border-white/5' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-6">
          <p className="text-gray-400 text-base leading-relaxed mb-4">
            {faq.answer}
          </p>
          <div className="flex items-center gap-2">
            <span className="font-mono-custom text-[10px] px-2 py-0.5 rounded bg-electric-orange/10 text-electric-orange uppercase tracking-widest border border-electric-orange/20">
              {faq.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  return (
    <section id="faq" className="relative py-24 overflow-hidden bg-[#080808]">
      <div className="absolute inset-0 bg-dots opacity-20" />
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #ff6b00, transparent)', filter: 'blur(80px)' }}
      />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`text-center mb-16 opacity-0-init ${headerVisible ? 'animate-in' : ''}`}
        >
          <span className="section-label">Common Questions</span>
          <h2 className="section-title text-white">
            FAQ <span className="gradient-text">SECTION</span>
          </h2>
          <div className="divider-line w-32 mx-auto mt-4 mb-6" />
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Everything you need to know about joining the IRON EMPIRE community.
          </p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        <div className="mt-12 p-8 glass clip-angled text-center relative group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-red/5 to-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-neon-red/10 flex items-center justify-center text-neon-red">
              <HelpCircle size={24} />
            </div>
            <div>
              <h3 className="font-display text-xl text-white uppercase tracking-wider mb-2">Still have questions?</h3>
              <p className="text-gray-400 text-sm mb-6">Our team is ready to help you start your transformation journey today.</p>
              <a href="#contact" className="btn-primary text-white text-xs px-10">Chat With Us</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
