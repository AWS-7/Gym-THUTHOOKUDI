import { useState, useEffect, useRef } from 'react';
import { Check, Star, Zap, User, Users } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useParallax } from '../hooks/useParallax';

function VettiExplosion() {
  const [particles, setParticles] = useState([]);
  const [showFlash, setShowFlash] = useState(false);
  const triggered = useRef(false);
  const soundEnabled = useRef(false);

  useEffect(() => {
    const handleSoundChange = (e) => {
      soundEnabled.current = e.detail;
    };
    window.addEventListener('soundEnabled', handleSoundChange);
    return () => window.removeEventListener('soundEnabled', handleSoundChange);
  }, []);
  
  useEffect(() => {
    const checkScroll = () => {
      if (triggered.current) return;
      const section = document.getElementById('plans');
      if (!section) return;

      const rect = section.getBoundingClientRect();
      // Trigger when the top of the section is 40% into the viewport
      if (rect.top < window.innerHeight * 0.6) {
        triggered.current = true;
        
        // Play sound if enabled
        if (soundEnabled.current) {
          const explosionSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2871/2871-preview.mp3');
          explosionSound.volume = 0.5;
          explosionSound.play().catch(e => console.log('SFX block', e));
        }

        // Screen Shake Effect
        document.body.classList.add('animate-shake');
        setTimeout(() => document.body.classList.remove('animate-shake'), 500);

        setShowFlash(true);
        setTimeout(() => setShowFlash(false), 200);
        
        const newParticles = Array.from({ length: 180 }).map(() => {
          const angle = Math.random() * Math.PI * 2;
          const velocity = 15 + Math.random() * 50;
          return {
            id: Math.random(),
            x: 50,
            y: 50,
            angle,
            velocity,
            color: ['#ff2020', '#ff6b00', '#d4a017', '#ffffff', '#00eeff', '#ffff00'][Math.floor(Math.random() * 6)],
            size: 4 + Math.random() * 12,
          };
        });
        
        setParticles(newParticles);
        setTimeout(() => setParticles([]), 3000);
      }
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  if (particles.length === 0 && !showFlash) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[99999]">
      {/* Absolute center flash */}
      {showFlash && (
        <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px] z-[100000]" />
      )}
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white rounded-full blur-[120px] animate-ping opacity-60" />
      
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full animate-firework"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 30px ${p.color}, 0 0 60px ${p.color}`,
            '--dx': `${Math.cos(p.angle) * p.velocity * 20}px`,
            '--dy': `${Math.sin(p.angle) * p.velocity * 20}px`,
          }}
        />
      ))}
    </div>
  );
}
const menPlans = [
  {
    name: '1 Month',
    subtitle: 'Monthly Plan',
    price: '1,499',
    period: 'month',
    tag: null,
    color: '#ff6b00',
    features: [
      'Full Gym Access',
      'Basic Strength Training',
      'Cardio Equipment Use',
      'Locker Room Access',
      'Personal Training Options',
    ],
    cta: 'Start Now',
  },
  {
    name: '3 Months',
    subtitle: 'Quarterly Saver',
    price: '3,999',
    period: 'quarter',
    tag: 'POPULAR',
    color: '#ff2020',
    features: [
      'Full Gym Access',
      'Personalized Workout Plan',
      'Body Assessment',
      'Nutritional Guidance',
      'Priority Support',
    ],
    cta: 'Go Elite',
  },
  {
    name: '6 Months',
    subtitle: 'Half Year Goal',
    price: '6,499',
    period: '6 months',
    tag: 'BEST VALUE',
    color: '#d4a017',
    features: [
      'Full Gym Access',
      'Advanced Workout Plan',
      'Monthly Progress Tracking',
      'Supplement Guidance',
      'Discount on Personal Training',
    ],
    cta: 'Build Empire',
  },
  {
    name: '1 Year',
    subtitle: 'Annual Empire',
    price: '9,999',
    period: 'year',
    tag: 'ULTIMATE',
    color: '#d4a017',
    features: [
      'Full Gym Access',
      'Elite Performance Training',
      'Weekly Diet Monitoring',
      'Free Merchandise',
      'Exclusive Member Events',
    ],
    cta: 'Go Premium',
  },
  {
    name: '3 Months Transformation',
    subtitle: 'Transformation Goal',
    price: '3,000',
    period: 'quarter',
    tag: 'NEW',
    color: '#ff2020',
    features: [
      '3-Month Dedicated Plan',
      'Intensive Body Transformation',
      'Progress Monitoring',
      'Dietary Guidelines',
    ],
    cta: 'Transform Now',
  },
  {
    name: 'Personal Training',
    subtitle: 'Private Coaching',
    price: '5,000',
    period: 'month',
    tag: 'PREMIUM',
    color: '#d4a017',
    features: [
      '1-on-1 Dedicated Coaching',
      'Fully Customized Program',
      'Form & Technique Focus',
      '24/7 Coach Support',
    ],
    cta: 'Go Premium',
  },
  {
    name: '3 Month Trnsfamation + Personal Training',
    subtitle: 'Ultimate Combo',
    price: '8,000',
    period: 'quarter',
    tag: 'RECOMMENDED',
    color: '#ff6b00',
    features: [
      '3 Months Transformation Plan',
      'Includes Personal Training',
      'Complete Result Guarantee',
      'Elite Progress Tracking',
    ],
    cta: 'Get Result',
  },
];
const womenPlans = [
  {
    name: '1 Month',
    subtitle: 'Monthly Plan',
    price: '1,499',
    period: 'month',
    tag: null,
    color: '#ff6b00',
    features: [
      'Full Gym Access',
      'Cardio & Tone Training',
      'Yoga & Flexibility Use',
      'Safe & Secure Space',
      'Personalized Support',
    ],
    cta: 'Start Now',
  },
  {
    name: '3 Months',
    subtitle: 'Quarterly Saver',
    price: '3,499',
    period: 'quarter',
    tag: 'POPULAR',
    color: '#ff2020',
    features: [
      'Full Gym Access',
      'Weight Loss Program',
      'Body Transformation Plan',
      'Dietary Consulting',
      'Progress Reviews',
    ],
    cta: 'Go Elite',
  },
  {
    name: '6 Months',
    subtitle: 'Half Year Goal',
    price: '5,999',
    period: '6 months',
    tag: 'BEST VALUE',
    color: '#d4a017',
    features: [
      'Full Gym Access',
      'Strength & Conditioning',
      'Muscle Toning Plan',
      'Personalized Diet Plan',
      'Monthly Tracking',
    ],
    cta: 'Build Empire',
  },
  {
    name: '1 Year',
    subtitle: 'Annual Empire',
    price: '8,999',
    period: 'year',
    tag: 'ULTIMATE',
    color: '#d4a017',
    features: [
      'Full Gym Access',
      'Complete Lifestyle Shift',
      'Holistic Wellness Plan',
      'Dedicated Coach Support',
      'VIP Perks & Events',
    ],
    cta: 'Go Premium',
  },
  {
    name: '3 Months Transformation',
    subtitle: 'Transformation Goal',
    price: '3,000',
    period: 'quarter',
    tag: 'NEW',
    color: '#ff2020',
    features: [
      '3-Month Dedicated Plan',
      'Intensive Body Transformation',
      'Progress Monitoring',
      'Dietary Guidelines',
    ],
    cta: 'Transform Now',
  },
  {
    name: 'Personal Training',
    subtitle: 'Private Coaching',
    price: '5,000',
    period: 'month',
    tag: 'PREMIUM',
    color: '#d4a017',
    features: [
      '1-on-1 Dedicated Coaching',
      'Fully Customized Program',
      'Form & Technique Focus',
      '24/7 Coach Support',
    ],
    cta: 'Go Premium',
  },
  {
    name: '3 Month Trnsfamation + Personal Training',
    subtitle: 'Ultimate Combo',
    price: '8,000',
    period: 'quarter',
    tag: 'RECOMMENDED',
    color: '#ff6b00',
    features: [
      '3 Months Transformation Plan',
      'Includes Personal Training',
      'Complete Result Guarantee',
      'Elite Progress Tracking',
    ],
    cta: 'Get Result',
  },
];
const cardioMenPlans = [
  {
    name: '1 Month',
    subtitle: 'Cardio Only (Men)',
    price: '1,299',
    period: 'month',
    tag: null,
    color: '#ff6b00',
    features: [
      'Cardio Section Access',
      'Treadmills & Ellipticals',
      'Cycling Equipment',
      'Basic Support',
    ],
    cta: 'Start Now',
  },
  {
    name: '3 Months',
    subtitle: 'Cardio Only (Men)',
    price: '3,499',
    period: 'quarter',
    tag: 'POPULAR',
    color: '#ff2020',
    features: [
      'Full Cardio Access',
      'Endurance Tracking',
      'Body Assessment',
      'Standard Guidelines',
    ],
    cta: 'Go Elite',
  },
  {
    name: '6 Months',
    subtitle: 'Cardio Only (Men)',
    price: '5,999',
    period: '6 months',
    tag: 'BEST VALUE',
    color: '#d4a017',
    features: [
      'Full Cardio Access',
      'Monthly Progress Reviews',
      'Conditioning Tips',
      'Better Endurance',
    ],
    cta: 'Build Empire',
  },
  {
    name: '1 Year',
    subtitle: 'Cardio Only (Men)',
    price: '8,999',
    period: 'year',
    tag: 'ULTIMATE',
    color: '#d4a017',
    features: [
      'Annual Cardio Access',
      'Elite Conditioning Support',
      'Year-Round Motivation',
      'Maximum Result',
    ],
    cta: 'Go Premium',
  },
];
function PlanCard({ plan, index, className = "" }) {
  const { ref, isVisible } = useScrollAnimation();
  const isPopular = plan.tag === 'POPULAR' || plan.tag === 'ULTIMATE';
  return (
    <div
      ref={ref}
      className={`relative opacity-0-init ${isVisible ? 'animate-in' : ''} ${isPopular ? 'lg:scale-105' : ''} ${className}`}
      style={{ animationDelay: `${index * 120}ms` }}
    >
      {plan.tag && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 px-4 py-1 font-mono-custom text-[10px] tracking-[0.2em] font-bold whitespace-nowrap"
          style={{
            background: `linear-gradient(135deg, ${plan.color}, ${plan.color}aa)`,
            clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)',
          }}
        >
          {plan.tag}
        </div>
      )}
      <div
        className="glass clip-angled h-full flex flex-col overflow-hidden group transition-all duration-500 hover:-translate-y-2"
        style={{
          border: isPopular ? `1px solid ${plan.color}66` : '1px solid rgba(255,255,255,0.06)',
          boxShadow: isPopular ? `0 0 30px ${plan.color}22` : 'none',
        }}
      >
        <div
          className="h-1 w-full"
          style={{ background: `linear-gradient(90deg, ${plan.color}, ${plan.color}44)` }}
        />
        <div className="p-6 flex-1 flex flex-col">
          <div className="mb-6">
            <span
              className="font-mono-custom text-[10px] tracking-[0.25em] uppercase mb-1 block"
              style={{ color: plan.color }}
            >
              {plan.subtitle}
            </span>
            <h3 className="font-display text-2xl text-white uppercase tracking-wider">{plan.name}</h3>
          </div>
          <div className="mb-6 flex items-end gap-1">
            <span className="font-mono-custom text-sm text-gray-500 mb-1">₹</span>
            <span className="font-display text-5xl text-white leading-none">{plan.price}</span>
            <span className="font-mono-custom text-xs text-gray-500 mb-1">/{plan.period}</span>
          </div>
          <div className="divider-line mb-6" />
          <ul className="flex-1 space-y-3 mb-8">
            {plan.features.map((f, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                <span
                  className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: `${plan.color}22`, border: `1px solid ${plan.color}66` }}
                >
                  <Check size={10} style={{ color: plan.color }} />
                </span>
                {f}
              </li>
            ))}
          </ul>
          <button
            className="w-full py-3 font-display text-sm tracking-widest uppercase font-bold transition-all duration-300 clip-angled-sm hover:-translate-y-1"
            style={{
              background: isPopular ? `linear-gradient(135deg, ${plan.color}, ${plan.color}bb)` : 'transparent',
              border: `1px solid ${plan.color}`,
              color: isPopular ? 'white' : plan.color,
              boxShadow: isPopular ? `0 0 20px ${plan.color}44` : 'none',
            }}
            onMouseEnter={e => {
              if (!isPopular) {
                e.target.style.background = `${plan.color}22`;
              }
            }}
            onMouseLeave={e => {
              if (!isPopular) {
                e.target.style.background = 'transparent';
              }
            }}
          >
            {plan.cta}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Plans() {
  const [activeTab, setActiveTab] = useState('men');
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const parallaxText = useParallax(-0.1);

  return (
    <section id="plans" className="relative py-24 overflow-hidden bg-[#080808]">
      <VettiExplosion active={headerVisible} />
      <div className="absolute inset-0 bg-grid opacity-40" />
      
      {/* Background Parallax Text */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{ transform: `translate(-50%, calc(-50% + ${parallaxText}px))` }}
      >
        <h2 className="text-[25vw] font-display text-white/[0.02] leading-none whitespace-nowrap">
          RESULTS
        </h2>
      </div>

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #ff2020, transparent)', filter: 'blur(80px)' }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`text-center mb-10 opacity-0-init ${headerVisible ? 'animate-in' : ''}`}
        >
          <div className="relative inline-block">
            <span className="section-label mb-0">2026 TARIFF</span>
            {headerVisible && (
              <div className="absolute -inset-4 bg-neon-red/20 blur-xl rounded-full animate-pulse-glow -z-10" />
            )}
          </div>
          <h2 className="section-title text-white mt-4">
            PLANS &amp; <span className="gradient-text">PACKAGES</span>
          </h2>
          <div className="divider-line w-32 mx-auto mt-4 mb-6" />
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Official 2026 Price List. Choose the plan that fits your transformation goals.
          </p>
        </div>
        {/* Tab Switcher */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex glass p-1 clip-angled-sm flex-wrap justify-center gap-1">
            <button
              onClick={() => setActiveTab('men')}
              className={`flex items-center gap-2 px-6 py-3 font-display tracking-widest uppercase text-xs transition-all duration-300 clip-angled-sm ${
                activeTab === 'men' ? 'bg-neon-red text-white shadow-glow-red' : 'text-gray-400 hover:text-white'
              }`}
            >
              <User size={14} />
              Men
            </button>
            <button
              onClick={() => setActiveTab('women')}
              className={`flex items-center gap-2 px-6 py-3 font-display tracking-widest uppercase text-xs transition-all duration-300 clip-angled-sm ${
                activeTab === 'women' ? 'bg-gold text-white shadow-glow-gold' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Users size={14} />
              Women
            </button>
            <button
              onClick={() => setActiveTab('cardio')}
              className={`flex items-center gap-2 px-6 py-3 font-display tracking-widest uppercase text-xs transition-all duration-300 clip-angled-sm ${
                activeTab === 'cardio' ? 'bg-electric-orange text-white shadow-glow-orange' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Zap size={14} />
              Cardio (Men)
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {(activeTab === 'men' ? menPlans : activeTab === 'women' ? womenPlans : cardioMenPlans).map((plan, i) => (
            <PlanCard key={`${activeTab}-${i}`} plan={plan} index={i} />
          ))}
        </div>
        <div
          className="mt-12 glass clip-angled p-6 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <Zap className="text-electric-orange" size={20} />
            <span className="font-display text-lg text-white tracking-wider uppercase">Custom Corporate & Group Packages Available</span>
            <Zap className="text-electric-orange" size={20} />
          </div>
          <p className="text-gray-400 text-sm">Teams, offices, and institutions — reach out for exclusive group memberships & customized pricing.</p>
          <a href="#contact" className="inline-block mt-4 btn-outline text-xs">Enquire Now</a>
        </div>
      </div>
    </section>
  );
}
