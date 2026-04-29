import { useState, useEffect, useRef } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const testimonials = [
  {
    name: 'Mugesh',
    role: 'CrossFit Athlete',
    avatar: 'M',
    color: '#ff6b00',
    quote: 'IRON EMPIRE is hands down the best gym in Thoothukudi. The community here is incredible, and the coaches really know their stuff. My strength has doubled in just 4 months!',
    stars: 5,
    tag: 'STRENGTH'
  },
  {
    name: 'Suganya',
    role: 'Fitness Enthusiast',
    avatar: 'S',
    color: '#d4a017',
    quote: 'The transformation programs here are legit. I lost 12kg and gained so much confidence. The diet plan they gave me was easy to follow and very effective.',
    stars: 5,
    tag: 'WEIGHT LOSS'
  },
  {
    name: 'Ramesh',
    role: 'Powerlifter',
    avatar: 'R',
    color: '#ff2020',
    quote: 'If you are serious about lifting, this is the place. The equipment is top-notch and the atmosphere is pure fire. Every session here feels like a personal best.',
    stars: 5,
    tag: 'POWER'
  },
  {
    name: 'Bala',
    role: 'Body Builder',
    avatar: 'B',
    color: '#ff6b00',
    quote: 'The personal training here transformed my physique completely. The trainers push you to limits you never knew you had. Best investment for my health!',
    stars: 5,
    tag: 'MUSCLE'
  },
  {
    name: 'Siva',
    role: 'HIIT Specialist',
    avatar: 'S',
    color: '#d4a017',
    quote: 'I love the variety of classes. From intense HIIT to focused strength sessions, there is something for everyone. The energy in the gym is just contagious!',
    stars: 5,
    tag: 'HIIT'
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: sliderRef, isVisible: sliderVisible } = useScrollAnimation();
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () => setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length),
      5000
    );

    return () => {
      resetTimeout();
    };
  }, [activeIndex]);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="relative py-24 overflow-hidden bg-[#080808]">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #ff2020, transparent)', filter: 'blur(100px)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`text-center mb-16 opacity-0-init ${headerVisible ? 'animate-in' : ''}`}
        >
          <span className="section-label">Success Stories</span>
          <h2 className="section-title text-white">
            WHAT OUR <span className="gradient-text">EMPIRE</span> SAYS
          </h2>
          <div className="divider-line w-32 mx-auto mt-4 mb-6" />
        </div>

        <div 
          ref={sliderRef}
          className={`relative max-w-5xl mx-auto opacity-0-init ${sliderVisible ? 'animate-in-scale' : ''}`}
        >
          {/* Main Slider Container */}
          <div className="relative overflow-hidden glass clip-angled p-8 md:p-16">
            <Quote className="absolute top-8 left-8 text-neon-red/20 w-16 h-16 md:w-24 md:h-24 -z-10" />
            
            <div 
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((t, i) => (
                <div key={i} className="min-w-full flex flex-col md:flex-row items-center gap-8 md:gap-12">
                  <div className="relative shrink-0">
                    <div 
                      className="w-32 h-32 md:w-48 md:h-48 rounded-2xl overflow-hidden border-2 border-neon-red/30 flex items-center justify-center"
                      style={{ background: `linear-gradient(135deg, ${t.color}20, ${t.color}40)` }}
                    >
                      <span 
                        className="font-display text-4xl md:text-6xl font-bold"
                        style={{ color: t.color }}
                      >
                        {t.avatar}
                      </span>
                    </div>
                    <div className="absolute -bottom-4 -right-4 glass px-3 py-1 rounded border border-white/10">
                      <span className="font-mono-custom text-[10px] text-gold tracking-widest">{t.tag}</span>
                    </div>
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <div className="flex justify-center md:justify-start gap-1 mb-4">
                      {Array(t.stars).fill(null).map((_, idx) => (
                        <Star key={idx} size={14} className="text-gold fill-gold" />
                      ))}
                    </div>
                    <p className="text-white text-lg md:text-2xl font-body italic leading-relaxed mb-6">
                      "{t.quote}"
                    </p>
                    <div>
                      <h4 className="font-display text-xl text-white tracking-wider uppercase">{t.name}</h4>
                      <p className="text-gray-500 font-mono-custom text-xs tracking-[0.2em] uppercase">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="absolute bottom-8 right-8 flex gap-3">
              <button 
                onClick={prevSlide}
                className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white hover:border-neon-red hover:text-neon-red transition-all duration-300"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={nextSlide}
                className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white hover:border-neon-red hover:text-neon-red transition-all duration-300"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-1.5 transition-all duration-500 rounded-full ${
                  activeIndex === i ? 'w-8 bg-neon-red' : 'w-2 bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
