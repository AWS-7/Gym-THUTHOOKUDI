import { Award, BadgeCheck, Trophy, Shield } from 'lucide-react';
import { useEffect } from 'react';
import { useScrollAnimation, useCounter } from '../hooks/useScrollAnimation';

function AchievementItem({ num, label, isVisible, delay }) {
  const { count, activate } = useCounter(num, 2500);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(activate, delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, activate, delay]);

  return (
    <div
      className={`text-center p-5 opacity-0-init ${isVisible ? 'animate-in' : ''}`}
      style={{
        animationDelay: `${delay}ms`,
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '2px',
      }}
    >
      <div className="font-display text-3xl gradient-text mb-1">{count}</div>
      <div className="font-mono-custom text-[10px] tracking-widest text-gray-500 uppercase leading-tight">{label}</div>
    </div>
  );
}

const certs = [
  { title: 'CrossFit Level 2', icon: Trophy, body: 'CrossFit HQ — Certified Trainers', color: '#ff2020' },
  { title: 'NSCA-CPT', icon: Award, body: 'National Strength & Conditioning', color: '#ff6b00' },
  { title: 'Precision Nutrition', icon: BadgeCheck, body: 'PN Level 1 Certified', color: '#d4a017' },
  { title: 'ACE Certified', icon: Shield, body: 'American Council on Exercise', color: '#ff2020' },
  { title: 'ISSA Certified', icon: Award, body: 'International Sports Sciences Assoc.', color: '#ff6b00' },
  { title: 'First Aid & CPR', icon: BadgeCheck, body: 'Red Cross Certified — All Coaches', color: '#d4a017' },
];

const achievements = [
  { num: '500+', label: 'Successful Transformations' },
  { num: '8+', label: 'Years of Excellence' },
  { num: '15+', label: 'Certified Coaches' },
  { num: '50+', label: 'Programs Completed' },
  { num: '10+', label: 'Awards & Recognitions' },
  { num: '#1', label: 'CrossFit Box in Thoothukudi' },
];

export default function Certifications() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: certsRef, isVisible: certsVisible } = useScrollAnimation();
  const { ref: achieveRef, isVisible: achieveVisible } = useScrollAnimation();

  return (
    <section id="certifications" className="relative py-24 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, #080808 0%, #0d0d0d 50%, #080808 100%)' }}
      />
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2 w-full h-px opacity-30"
        style={{ background: 'linear-gradient(90deg, transparent, #ff2020, #d4a017, transparent)' }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`text-center mb-16 opacity-0-init ${headerVisible ? 'animate-in' : ''}`}
        >
          <span className="section-label">Trust & Excellence</span>
          <h2 className="section-title text-white">
            CERTIFIED &amp; <span className="gradient-text-gold">AWARDED</span>
          </h2>
          <div className="divider-line w-32 mx-auto mt-4 mb-6" />
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Our coaches hold the highest internationally recognized certifications in fitness and nutrition.
          </p>
        </div>

        <div
          ref={certsRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-20"
        >
          {certs.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={i}
                className={`glass clip-angled-sm p-5 text-center group hover:-translate-y-2 transition-all duration-500 opacity-0-init ${certsVisible ? 'animate-in-scale' : ''}`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div
                  className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110 animate-pulse-glow-gold"
                  style={{ background: `${c.color}22`, border: `1px solid ${c.color}66` }}
                >
                  <Icon size={20} style={{ color: c.color }} />
                </div>
                <h4 className="font-display text-sm text-white tracking-wide mb-1">{c.title}</h4>
                <p className="text-gray-500 text-[10px] leading-tight">{c.body}</p>
              </div>
            );
          })}
        </div>

        <div
          ref={achieveRef}
          className={`opacity-0-init ${achieveVisible ? 'animate-in' : ''}`}
        >
          <div className="text-center mb-10">
            <h3 className="font-display text-3xl text-white uppercase tracking-wider">
              Numbers That <span className="gradient-text">Speak</span>
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {achievements.map((a, i) => (
              <AchievementItem
                key={i}
                num={a.num}
                label={a.label}
                isVisible={achieveVisible}
                delay={i * 100}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
