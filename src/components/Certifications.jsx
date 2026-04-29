import { Award, BadgeCheck, Trophy, Shield } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useScrollAnimation, useCounter } from '../hooks/useScrollAnimation';
import certImage from '../images/1777468750879.jpg';

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

const galleryCerts = [
  { id: 1, src: certImage, title: 'Professional Certification', alt: 'IRON EMPIRE Professional Certificate' },
];

const achievements = [
  { num: '100+', label: 'Successful Transformations' },
  { num: '3+', label: 'Years of Excellence' },
  { num: '50+', label: 'Programs Completed' },
  { num: '10+', label: 'Awards & Recognitions' },
  { num: '#1', label: 'CrossFit Box in Thoothukudi' },
];

export default function Certifications() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: certsRef, isVisible: certsVisible } = useScrollAnimation();
  const { ref: achieveRef, isVisible: achieveVisible } = useScrollAnimation();
  const [selectedCert, setSelectedCert] = useState(null);

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

        {/* Certificate Gallery */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="font-display text-2xl text-white uppercase tracking-wider">
              Our <span className="gradient-text-gold">Certificates</span>
            </h3>
            <p className="text-gray-400 text-sm mt-2">Click to view full size</p>
          </div>
          <div className="flex justify-center">
            {galleryCerts.map((cert) => (
              <div
                key={cert.id}
                onClick={() => setSelectedCert(cert)}
                className="relative group cursor-pointer overflow-hidden rounded-lg border border-white/10 hover:border-[#ff6b00]/50 transition-all duration-300"
                style={{ maxWidth: '400px' }}
              >
                <img
                  src={cert.src}
                  alt={cert.alt}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="font-display text-sm text-white">{cert.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox Modal */}
        {selectedCert && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
            onClick={() => setSelectedCert(null)}
          >
            <div className="relative max-w-4xl max-h-[90vh]">
              <img
                src={selectedCert.src}
                alt={selectedCert.alt}
                className="max-w-full max-h-[85vh] object-contain rounded-lg"
              />
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute -top-10 right-0 text-white hover:text-[#ff6b00] transition-colors"
              >
                ✕ Close
              </button>
            </div>
          </div>
        )}

        <div
          ref={achieveRef}
          className={`opacity-0-init ${achieveVisible ? 'animate-in' : ''}`}
        >
          <div className="text-center mb-10">
            <h3 className="font-display text-3xl text-white uppercase tracking-wider">
              Numbers That <span className="gradient-text">Speak</span>
            </h3>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
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
