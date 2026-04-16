import { useState, useEffect, useRef } from 'react';
import { Instagram, Twitter, Award, Zap } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const coaches = [
  {
    name: 'Vikram Singh',
    role: 'Head CrossFit Coach',
    image: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Certified CrossFit Level 2 Trainer with 10+ years of experience in elite strength & conditioning.',
    specialties: ['CrossFit', 'Olympic Lifting', 'Mobility'],
    color: '#ff2020',
  },
  {
    name: 'Sarah Joseph',
    role: 'Strength & Conditioning',
    image: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Specializes in hypertrophy and functional strength training. Helping athletes reach their peak performance.',
    specialties: ['Hypertrophy', 'Fat Loss', 'Functional Training'],
    color: '#ff6b00',
  },
  {
    name: 'Rahul Dravid',
    role: 'Nutrition Specialist',
    image: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Precision Nutrition Level 1 certified. Designing custom fuel plans for maximum gym performance.',
    specialties: ['Keto/Paleo', 'Sports Nutrition', 'Weight Management'],
    color: '#d4a017',
  },
];

function CoachCard({ coach, index, className = "" }) {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <div
      ref={ref}
      className={`glass clip-angled group relative overflow-hidden flex flex-col h-full opacity-0-init ${isVisible ? 'animate-in' : ''} ${className}`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="relative h-48 md:h-64 overflow-hidden flex-shrink-0">
        <img
          src={coach.image}
          alt={`${coach.name} - ${coach.role} at IRON EMPIRE Gym Thoothukudi`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-60" />
        
        {/* Social Hover Overlay */}
        <div className="absolute inset-0 bg-neon-red/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <a href="#" className="w-8 h-8 md:w-10 md:h-10 rounded-full glass border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-neon-red transition-all">
            <Instagram size={16} />
          </a>
          <a href="#" className="w-8 h-8 md:w-10 md:h-10 rounded-full glass border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-neon-red transition-all">
            <Twitter size={16} />
          </a>
        </div>
      </div>

      <div className="p-4 md:p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-2">
          <Zap size={10} style={{ color: coach.color }} />
          <span className="font-mono-custom text-[8px] md:text-[10px] tracking-[0.2em] uppercase" style={{ color: coach.color }}>
            {coach.role}
          </span>
        </div>
        <h3 className="font-display text-lg md:text-2xl text-white mb-2 md:mb-3 tracking-wider">{coach.name}</h3>
        <p className="text-gray-400 text-[10px] md:text-sm mb-4 md:mb-6 leading-relaxed line-clamp-3">{coach.bio}</p>
        
        <div className="mt-auto flex flex-wrap gap-1.5 md:gap-2">
          {coach.specialties.map((s, i) => (
            <span key={i} className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono-custom text-[7px] md:text-[9px] text-gray-300 uppercase tracking-widest">
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Coaches() {
  const scrollRef = useRef(null);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    
    let intervalId;
    const startAutoScroll = () => {
      if (window.innerWidth >= 1024) return;
      intervalId = window.setInterval(() => {
        if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 10) {
          scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollContainer.scrollBy({ left: 280, behavior: 'smooth' });
        }
      }, 3000);
    };

    startAutoScroll();
    const stop = () => clearInterval(intervalId);
    const resume = () => startAutoScroll();

    scrollContainer.addEventListener('touchstart', stop);
    scrollContainer.addEventListener('touchend', resume);
    scrollContainer.addEventListener('mouseenter', stop);
    scrollContainer.addEventListener('mouseleave', resume);

    return () => {
      clearInterval(intervalId);
      scrollContainer.removeEventListener('touchstart', stop);
      scrollContainer.removeEventListener('touchend', resume);
      scrollContainer.removeEventListener('mouseenter', stop);
      scrollContainer.removeEventListener('mouseleave', resume);
    };
  }, []);

  return (
    <section id="coaches" className="relative py-24 overflow-hidden bg-[#080808]">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`text-center mb-16 opacity-0-init ${headerVisible ? 'animate-in' : ''}`}
        >
          <span className="section-label">Expert Team</span>
          <h2 className="section-title text-white">
            THE <span className="gradient-text">ELITE</span> COACHES
          </h2>
          <div className="divider-line w-32 mx-auto mt-4 mb-6" />
          <p className="text-gray-400 max-w-xl mx-auto text-lg leading-relaxed">
            Our trainers are more than just coaches — they are world-class athletes dedicated to your transformation.
          </p>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          {coaches.map((c, i) => (
            <CoachCard key={i} coach={c} index={i} />
          ))}
        </div>

        {/* Mobile View */}
        <div className="lg:hidden">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar scroll-smooth"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {coaches.map((c, i) => (
              <div key={i} className="min-w-[280px] max-w-[280px] snap-center">
                <CoachCard coach={c} index={i} />
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2">
            {coaches.map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-neon-red/30" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
