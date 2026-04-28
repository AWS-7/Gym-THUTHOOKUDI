import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Play } from 'lucide-react';
import { useParallax } from '../hooks/useParallax';
import { useCounter } from '../hooks/useScrollAnimation';

const statsData = [
  { value: '100+', label: 'Members' },
  { value: '3+', label: 'Years' },
  { value: '15+', label: 'Programs' },
  { value: '98%', label: 'Success Rate' },
];

function StatItem({ val, label, delay }) {
  const { count, activate } = useCounter(val, 2500);
  
  useEffect(() => {
    const timer = setTimeout(activate, delay);
    return () => clearTimeout(timer);
  }, [activate, delay]);

  return (
    <div className="glass clip-angled-sm p-4 text-center group hover:border-neon-red/30 transition-all duration-300">
      <div className="font-display text-2xl md:text-3xl gradient-text font-bold">
        {count}
      </div>
      <div className="font-mono-custom text-[10px] tracking-[0.2em] text-gray-400 uppercase mt-1">{label}</div>
    </div>
  );
}

const words = ['STRENGTH', 'HIIT', 'CARDIO', 'EMPIRE', 'POWER'];

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);
  const particlesRef = useRef(null);
  const parallaxOffset = useParallax(0.3);
  const parallaxOffsetSlow = useParallax(0.1);
  const parallaxOffsetNegative = useParallax(-0.1);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => {
        setWordIndex(i => (i + 1) % words.length);
        setWordVisible(true);
      }, 400);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center pt-36 md:pt-48 pb-20 overflow-hidden"
    >
      <div 
        className="absolute inset-0 bg-[#080808]"
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255,32,32,0.12) 0%, rgba(255,107,0,0.06) 40%, transparent 70%)',
            transform: `translateY(${parallaxOffsetSlow}px)`,
          }}
        />
        <div className="absolute inset-0 bg-grid opacity-60" />
        
        {/* Large Parallax Background Text */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
          style={{ transform: `translate(-50%, calc(-50% + ${parallaxOffsetNegative}px))` }}
        >
          <h2 className="text-[20vw] font-display text-white/[0.06] leading-none whitespace-nowrap">
            IRON EMPIRE
          </h2>
        </div>

        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 80% 80%, rgba(212,160,23,0.08) 0%, transparent 60%)',
            transform: `translateY(${parallaxOffset}px)`,
          }}
        />
      </div>
      <div 
        ref={particlesRef} 
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 3 === 0 ? '#ff2020' : i % 3 === 1 ? '#ff6b00' : '#d4a017',
              opacity: Math.random() * 0.6 + 0.2,
              animation: `particleFloat ${Math.random() * 6 + 4}s ease-in-out ${Math.random() * 4}s infinite`,
              transform: `translateY(${parallaxOffset * (i % 2 === 0 ? 1.5 : 0.8)}px)`,
            }}
          />
        ))}
      </div>
      <div
        className="absolute top-20 right-10 w-64 h-64 rounded-full opacity-10 animate-float-slow"
        style={{
          background: 'radial-gradient(circle, #ff2020 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute bottom-20 left-10 w-48 h-48 rounded-full opacity-10 animate-float"
        style={{
          background: 'radial-gradient(circle, #d4a017 0%, transparent 70%)',
          filter: 'blur(30px)',
          animationDelay: '3s',
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className={`mb-6 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transitionDelay: '200ms' }}
        >
          <span className="section-label text-center block opacity-80">Thoothukudi, Tamil Nadu</span>
        </div>
        <div
          className={`transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transitionDelay: '400ms' }}
        >
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase leading-none mb-2">
            <span className="block text-white tracking-tight">BUILD YOUR</span>
            <span
              className={`block gradient-text tracking-tight transition-all duration-400 ${
                wordVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
              style={{ transition: 'opacity 0.3s ease, transform 0.3s ease' }}
            >
              {words[wordIndex]}
            </span>
          </h1>
        </div>
        <div
          className={`mt-6 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transitionDelay: '600ms' }}
        >
          <p className="font-display text-xl md:text-3xl text-white/80 tracking-[0.15em] uppercase">
            Transform Your Body.{' '}
            <span className="gradient-text-gold">Build Your IRON EMPIRE.</span>
          </p>
          <p className="mt-3 font-mono-custom text-sm text-gray-400 tracking-widest">
            CrossFit &nbsp;•&nbsp; Strength &nbsp;•&nbsp; Fat Loss &nbsp;•&nbsp; Muscle Gain
          </p>
        </div>
        <div
          className={`mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transitionDelay: '800ms' }}
        >
          <a href="#plans" className="btn-primary text-white">
            View Plans
          </a>
          <a href="#contact" className="btn-outline">
            Contact Us
          </a>
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 group">
            <span
              className="w-10 h-10 rounded-full flex items-center justify-center border border-white/20 group-hover:border-neon-red transition-all duration-300"
              style={{ background: 'rgba(255,32,32,0.1)' }}
            >
              <Play size={14} className="text-neon-red ml-0.5" />
            </span>
            <span className="font-display text-sm tracking-widest uppercase">Watch Story</span>
          </button>
        </div>
        <div
          className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transitionDelay: '1000ms' }}
        >
          {statsData.map((stat, i) => (
            <StatItem 
              key={i} 
              val={stat.value} 
              label={stat.label} 
              delay={1200 + (i * 100)} 
            />
          ))}
        </div>
      </div>
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 hover:text-white transition-colors duration-300 group"
      >
        <span className="font-mono-custom text-[10px] tracking-widest uppercase">Scroll</span>
        <ChevronDown size={18} className="animate-bounce" />
      </a>
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #080808)' }}
      />
    </section>
  );
}
