import { Instagram, Facebook, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
export default function SocialSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const socialLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      handle: '@iron_empire_official',
      url: 'https://www.instagram.com/iron_empire_official',
      color: '#e1306c',
      desc: 'Daily WODs, motivation, and member highlights.',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      handle: 'Iron Empire Fitness Studio',
      url: 'https://www.facebook.com',
      color: '#1877f2',
      desc: 'Join our community and stay updated on events.',
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-[#0a0a0a]">
      <div className="absolute inset-0 bg-dots opacity-10" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`text-center mb-12 opacity-0-init ${headerVisible ? 'animate-in' : ''}`}
        >
          <span className="section-label">Join Our Community</span>
          <h2 className="section-title text-white">
            FOLLOW <span className="gradient-text">US</span>
          </h2>
          <div className="divider-line w-24 mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {socialLinks.map((social, i) => (
            <a
              key={i}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              className="glass clip-angled p-8 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-500"
              style={{
                border: `1px solid ${social.color}22`,
                background: `linear-gradient(135deg, ${social.color}05 0%, transparent 100%)`,
              }}
            >
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500"
                style={{ background: `${social.color}15`, border: `1px solid ${social.color}33` }}
              >
                <social.icon size={32} style={{ color: social.color }} />
              </div>
              <h3 className="font-display text-2xl text-white uppercase tracking-wider mb-2">{social.name}</h3>
              <p className="font-mono-custom text-xs tracking-widest mb-4" style={{ color: social.color }}>{social.handle}</p>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">{social.desc}</p>
              <div className="flex items-center gap-2 font-display text-xs tracking-widest uppercase text-white group-hover:text-neon-red transition-colors">
                Connect Now <ArrowRight size={14} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
