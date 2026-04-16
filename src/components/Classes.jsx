import { useState, useEffect, useRef } from 'react';
import { Zap, Dumbbell, TrendingDown, TrendingUp, Activity, User } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useParallax } from '../hooks/useParallax';
const classes = [
  {
    icon: Zap,
    name: 'HIIT',
    tag: 'High Intensity',
    desc: 'Science-backed High-Intensity Interval Training designed to torch fat and skyrocket your metabolic rate in record time.',
    features: ['Fat Burning', 'Metabolic Boost', 'Tabata Sessions', 'High Energy'],
    color: '#ff2020',
    img: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    icon: Dumbbell,
    name: 'Strength Training',
    tag: 'Power Building',
    desc: 'Master the art of lifting. Progressive overload protocols designed to build raw power, dense muscle, and an unbreakable physique.',
    features: ['Powerlifting', 'Hypertrophy Cycles', '1RM Testing', 'Form Mastery'],
    color: '#ff6b00',
    img: 'https://images.pexels.com/photos/1547248/pexels-photo-1547248.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    icon: Activity,
    name: 'Cardiovascular',
    tag: 'Heart Health',
    desc: 'Enhance your vascularity and endurance. Optimized cardio programs to improve heart health and overall athletic performance.',
    features: ['Endurance Focus', 'Vascular Health', 'Stamina Building', 'Heart Rate Zones'],
    color: '#d4a017',
    img: 'https://images.pexels.com/photos/868483/pexels-photo-868483.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    icon: TrendingUp,
    name: 'Muscle Building',
    tag: 'Mass Gain',
    desc: 'Hypertrophy focused training for maximum muscle growth. From beginner gains to advanced physique development.',
    features: ['Hypertrophy Focus', 'Protein Timing', 'Split Programs', 'Progress Tracking'],
    color: '#ff2020',
    img: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    icon: TrendingDown,
    name: 'CrossFit',
    tag: 'Elite Fitness',
    desc: 'Constantly varied, high-intensity functional movements. The ultimate test of fitness and mental toughness.',
    features: ['Daily WODs', 'Olympic Lifting', 'Gymnastics', 'Community Workouts'],
    color: '#ff6b00',
    img: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    icon: User,
    name: 'Personal Training',
    tag: '1-on-1 Focus',
    desc: 'Exclusive one-on-one sessions with our elite coaches. Maximum attention, maximum results, maximum accountability.',
    features: ['Custom Programs', 'Daily Check-ins', 'Diet Planning', 'Monthly Assessments'],
    color: '#d4a017',
    img: 'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

function ClassCard({ cls, index, className = "" }) {
  const [hovered, setHovered] = useState(false);
  const { ref, isVisible } = useScrollAnimation();
  const Icon = cls.icon;

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded cursor-pointer group opacity-0-init ${isVisible ? 'animate-in-scale' : ''} ${className}`}
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute inset-0">
        <img src={cls.img} alt={cls.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: hovered
              ? `linear-gradient(to top, ${cls.color}ee 0%, ${cls.color}88 40%, rgba(8,8,8,0.7) 100%)`
              : 'linear-gradient(to top, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.7) 50%, rgba(8,8,8,0.3) 100%)',
          }}
        />
      </div>
      <div className="relative z-10 p-6 h-80 md:h-72 flex flex-col justify-end">
        <div
          className="w-10 h-10 rounded flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110"
          style={{ background: `${cls.color}33`, border: `1px solid ${cls.color}66` }}
        >
          <Icon size={18} style={{ color: cls.color }} />
        </div>
        <span
          className="font-mono-custom text-[10px] tracking-[0.25em] uppercase mb-1"
          style={{ color: cls.color }}
        >
          {cls.tag}
        </span>
        <h3 className="font-display text-2xl text-white uppercase tracking-wide mb-2">{cls.name}</h3>
        <div
          className="overflow-hidden transition-all duration-500"
          style={{ maxHeight: (hovered || window.innerWidth < 1024) ? '400px' : '0', opacity: (hovered || window.innerWidth < 1024) ? 1 : 0 }}
        >
          <p className="text-gray-300 text-xs md:text-sm mb-3 leading-relaxed">{cls.desc}</p>
          <div className="flex flex-wrap gap-2">
            {cls.features.map((f, i) => (
              <span
                key={i}
                className="text-[9px] md:text-[10px] font-mono-custom tracking-wider px-2 py-1 rounded"
                style={{ background: `${cls.color}22`, border: `1px solid ${cls.color}44`, color: cls.color }}
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default function Classes() {
  const scrollRef = useRef(null);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const parallaxText = useParallax(0.12);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    
    let intervalId;
    const startAutoScroll = () => {
      if (window.innerWidth >= 1024) return; // Only on mobile/tablet
      intervalId = window.setInterval(() => {
        if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 10) {
          scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollContainer.scrollBy({ left: 300, behavior: 'smooth' });
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
    <section id="classes" className="relative py-24 overflow-hidden bg-[#080808]">
      <div className="absolute inset-0 bg-dots opacity-30" />
      
      {/* Background Parallax Text */}
      <div 
        className="absolute bottom-10 -right-20 pointer-events-none select-none"
        style={{ transform: `translateY(${parallaxText}px)` }}
      >
        <h2 className="text-[20vw] font-display text-white/[0.04] leading-none whitespace-nowrap -rotate-6">
          NO LIMITS
        </h2>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`text-center mb-16 opacity-0-init ${headerVisible ? 'animate-in' : ''}`}
        >
          <span className="section-label">What We Offer</span>
          <h2 className="section-title text-white">
            CLASSES &amp; <span className="gradient-text">PROGRAMS</span>
          </h2>
          <div className="divider-line w-32 mx-auto mt-4 mb-6" />
          <p className="text-gray-400 max-w-xl mx-auto text-lg leading-relaxed">
            Six elite training disciplines — one destination. Every program crafted for peak performance.
          </p>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {classes.map((cls, i) => (
            <ClassCard key={i} cls={cls} index={i} />
          ))}
        </div>

        {/* Mobile/Tablet View */}
        <div className="lg:hidden">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar scroll-smooth"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {classes.map((cls, i) => (
              <ClassCard 
                key={i} 
                cls={cls} 
                index={i} 
                className="min-w-[300px] max-w-[300px] snap-center" 
              />
            ))}
          </div>
          <div className="flex justify-center gap-2">
            {classes.map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-neon-red/30" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
