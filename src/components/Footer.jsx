import { Zap, Instagram, Facebook, Youtube, Twitter, Phone, Mail, MapPin, ArrowUp } from 'lucide-react';
const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Facility Gallery', href: '#gallery' },
  { label: 'Membership Plans', href: '#plans' },
  { label: 'FAQ', href: '#faq' },
];
const toolLinks = [
  { label: 'BMI Calculator', href: '#bmi' },
  { label: 'AI Diet Generator', href: '#diet' },
  { label: 'Fitness Charts', href: '#progress' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact Us', href: '#contact' },
];
const socials = [
  { icon: Instagram, label: 'Instagram', color: '#e1306c', href: 'https://www.instagram.com/iron_empire_official' },
  { icon: Facebook, label: 'Facebook', color: '#1877f2', href: '#' },
  { icon: Youtube, label: 'YouTube', color: '#ff0000', href: '#' },
  { icon: Twitter, label: 'Twitter', color: '#1da1f2', href: '#' },
];

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  return (
    <footer className="relative overflow-hidden" style={{ background: '#060606' }}>
      <div className="divider-line" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-xl h-64 opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #ff2020, transparent)', filter: 'blur(50px)' }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-1">
            <a href="#home" className="flex items-center gap-3 mb-5 group">
              <Zap
                className="text-neon-red group-hover:text-electric-orange transition-colors"
                size={28}
                style={{ filter: 'drop-shadow(0 0 8px #ff2020)' }}
              />
              <div>
                <div className="font-display text-xl tracking-[0.15em] text-white">IRON EMPIRE</div>
                <div className="font-mono-custom text-[9px] tracking-[0.4em] uppercase text-gold">
                  CrossFit & Fitness Studio
                </div>
              </div>
            </a>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Thoothukudi's most premium fitness destination. Transforming bodies, forging champions since 2016.
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, label, color, href }, i) => (
                <a
                  key={i}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: `${color}15`,
                    border: `1px solid ${color}33`,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = `${color}30`;
                    e.currentTarget.style.boxShadow = `0 0 12px ${color}44`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = `${color}15`;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <Icon size={15} style={{ color }} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display text-sm uppercase tracking-[0.2em] text-white mb-5">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-gray-500 text-sm hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span
                      className="w-0 h-px bg-neon-red transition-all duration-300 group-hover:w-3"
                      style={{ display: 'inline-block' }}
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm uppercase tracking-[0.2em] text-white mb-5">Tools & More</h4>
            <ul className="space-y-2">
              {toolLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-gray-500 text-sm hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span
                      className="w-0 h-px bg-neon-red transition-all duration-300 group-hover:w-3"
                      style={{ display: 'inline-block' }}
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm uppercase tracking-[0.2em] text-white mb-5">Location</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-neon-red shrink-0 mt-1" />
                <p className="text-gray-500 text-sm leading-relaxed">
                  IRON EMPIRE CrossFit & Fitness Studio,<br />
                  Thoothukudi, Tamil Nadu — 628001
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-neon-red shrink-0" />
                <p className="text-gray-500 text-sm">+91 63804 27781</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-neon-red shrink-0" />
                <p className="text-gray-500 text-sm">info@ironempire.com</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs font-mono-custom tracking-wider uppercase">
            © 2026 IRON EMPIRE CrossFit & Fitness Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button 
              onClick={scrollTop}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1 group"
              style={{ background: 'rgba(255,32,32,0.1)', border: '1px solid rgba(255,32,32,0.3)' }}
            >
              <ArrowUp size={16} className="text-neon-red group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
