import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useParallax } from '../hooks/useParallax';

import image1 from '../images/1777389260377.jpg';
import image2 from '../images/1777389260383.jpg';
import image3 from '../images/1777389260365.jpg';
import image4 from '../images/1777389260359.jpg';
import image5 from '../images/1777389260372.jpg';
import image6 from '../images/1777389593560.jpg';
import image7 from '../images/1777426267016.jpg';
import image8 from '../images/1777426267040.jpg';
import image9 from '../images/1777427306598.jpg';
import image10 from '../images/1777427306604.jpg';

const transformations = [
  {
    name: 'Esrome    ',
    duration: '6 Months',
    lost: '18kg',
    goal: 'Fat Loss',
    before: image1,
    after: image2,
    quote: 'IRON EMPIRE completely changed my life. The coaches push you beyond what you think is possible.',
    stars: 5,
  },
  {
    name: 'Senthilkumar',
    duration: '4 Months',
    lost: '12kg',
    goal: 'Fat Loss + Tone',
    before: image3,
    after: image4,
    quote: 'Finally found a gym that actually cares about your results. The personal training here is world-class.',
    stars: 5,
  },
  {
    name: 'Vinish',
    duration: '8 Months',
    lost: '+8kg Muscle',
    goal: 'Muscle Gain',
    before: image5,
    after: image6,
    quote: 'Gained 8kg of lean muscle in 8 months. The strength programs here are brutal — in the best way.',
    stars: 5,
  },
  {
    name: 'Vignesh ',
    duration: '5 Months',
    lost: '15kg',
    goal: 'Weight Loss',
    before: image7,
    after: image8,
    quote: "Never thought I'd be this confident. The team at IRON EMPIRE made it happen!",
    stars: 5,
  },
  {
    name: 'Mohan',
    duration: '12 Months',
    lost: '25kg',
    goal: 'Total Transformation',
    before: image9,
    after: image10,
    quote: '25kg gone in a year. The CrossFit programs and diet coaching together are absolutely lethal.',
    stars: 5,
  },
];

function TransformCard({ t, delay, className = "" }) {
  const [sliderPos, setSliderPos] = useState(50);
  const { ref, isVisible } = useScrollAnimation();
  const containerRef = useRef(null);

  const handleMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.pageX || (e.touches && e.touches[0].pageX)) - rect.left;
    const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pos);
  };

  return (
    <div
      ref={ref}
      className={`glass clip-angled overflow-hidden group opacity-0-init ${isVisible ? 'animate-in-scale' : ''} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div 
        ref={containerRef}
        className="relative h-64 overflow-hidden cursor-ew-resize select-none"
        onMouseMove={handleMove}
        onTouchMove={handleMove}
      >
        {/* Before Image (Bottom) */}
        <img
          src={t.before}
          alt={`Before Transformation - ${t.name} at IRON EMPIRE Thoothukudi`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 z-20">
          <span className="font-mono-custom text-[9px] tracking-wider px-2 py-0.5 rounded bg-black/60 text-white border border-white/10">BEFORE</span>
        </div>

        {/* After Image (Top with clip-path) */}
        <div 
          className="absolute inset-0 w-full h-full z-10"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <img
            src={t.after}
            alt={`After Transformation - ${t.name} ${t.lost} result at IRON EMPIRE`}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3 z-20">
            <span className="font-mono-custom text-[9px] tracking-wider px-2 py-0.5 rounded bg-neon-red/80 text-white border border-neon-red/20">AFTER</span>
          </div>
        </div>

        {/* Slider Handle */}
        <div 
          className="absolute top-0 bottom-0 z-30 w-0.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full glass border border-white/20 flex items-center justify-center">
            <div className="flex gap-0.5">
              <ChevronLeft size={10} className="text-white" />
              <ChevronRight size={10} className="text-white" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-3 left-3 right-3 z-20">
          <span
            className="font-mono-custom text-[9px] tracking-wider px-2 py-0.5 rounded bg-electric-orange/80 text-white"
          >
            {t.goal}
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h4 className="font-display text-base text-white tracking-wide">{t.name}</h4>
            <div className="flex gap-3 mt-1">
              <span className="font-mono-custom text-[10px] text-electric-orange">{t.duration}</span>
              <span className="font-mono-custom text-[10px] text-gold">{t.lost}</span>
            </div>
          </div>
          <div className="flex gap-0.5">
            {Array(t.stars).fill(null).map((_, i) => (
              <Star key={i} size={10} className="text-gold fill-gold" />
            ))}
          </div>
        </div>
        <p className="text-gray-400 text-xs leading-relaxed italic">"{t.quote}"</p>
      </div>
    </div>
  );
}

export default function Transformations() {
  const scrollRef = useRef(null);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const parallaxOffset = useParallax(0.15);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    let intervalId;
    const startAutoScroll = () => {
      intervalId = window.setInterval(() => {
        if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
          scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollContainer.scrollBy({ left: 280, behavior: 'smooth' });
        }
      }, 3000);
    };
    startAutoScroll();
    const handleTouchStart = () => clearInterval(intervalId);
    const handleTouchEnd = () => startAutoScroll();
    scrollContainer.addEventListener('touchstart', handleTouchStart);
    scrollContainer.addEventListener('touchend', handleTouchEnd);
    scrollContainer.addEventListener('mouseenter', handleTouchStart);
    scrollContainer.addEventListener('mouseleave', handleTouchEnd);
    return () => {
      clearInterval(intervalId);
      scrollContainer.removeEventListener('touchstart', handleTouchStart);
      scrollContainer.removeEventListener('touchend', handleTouchEnd);
      scrollContainer.removeEventListener('mouseenter', handleTouchStart);
      scrollContainer.removeEventListener('mouseleave', handleTouchEnd);
    };
  }, []);

  return (
    <section id="transformations" className="relative py-24 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ 
          background: 'linear-gradient(180deg, #080808 0%, #111111 50%, #080808 100%)',
          transform: `translateY(${parallaxOffset}px)`
        }}
      />
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #d4a017, transparent)', filter: 'blur(60px)' }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`text-center mb-16 opacity-0-init ${headerVisible ? 'animate-in' : ''}`}
        >
          <span className="section-label">Real Results</span>
          <h2 className="section-title text-white">
            TRANSFORMATION <span className="gradient-text">GALLERY</span>
          </h2>
          <div className="divider-line w-32 mx-auto mt-4 mb-6" />
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Every transformation is a story of courage. Tap each card to see the change.
          </p>
        </div>
        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-4">
          {transformations.map((t, i) => (
            <TransformCard key={i} t={t} delay={i * 100} />
          ))}
        </div>
        {/* Mobile/Tablet Side Scroll */}
        <div className="lg:hidden">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar scroll-smooth"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {transformations.map((t, i) => (
              <TransformCard
                key={i}
                t={t}
                delay={i * 100}
                className="min-w-[280px] max-w-[280px] snap-center"
              />
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-2">
            {transformations.map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-neon-red/30"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
