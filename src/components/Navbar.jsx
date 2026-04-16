import { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';
const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Plans', href: '#plans' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [logoError, setLogoError] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    const sections = links.map(l => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled ? 'glass-dark py-1 shadow-lg' : 'bg-transparent py-2'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 group">
          <div className={`relative h-14 md:h-20 w-auto overflow-hidden ${logoError ? 'hidden' : 'block'}`}>
            <img 
              src="logo.png" 
              alt="IRON EMPIRE Logo" 
              className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-110"
              style={{ filter: 'drop-shadow(0 0 12px rgba(255, 32, 32, 0.6))' }}
              onError={() => setLogoError(true)}
            />
          </div>
          <div className={`leading-none ${logoError ? 'block' : 'hidden sm:block'}`} style={{ display: logoError ? 'block' : undefined }}>
            <div className="font-display text-lg tracking-[0.15em] text-white">IRON EMPIRE</div>
            <div
              className="font-mono-custom text-[9px] tracking-[0.4em] uppercase text-gold"
            >
              Fitness Studio
            </div>
          </div>
        </a>
        <div className="hidden lg:flex items-center gap-1">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={`relative font-display text-sm tracking-widest uppercase px-4 py-2 transition-all duration-300 group ${
                active === link.href.slice(1) ? 'text-neon-red' : 'text-gray-300 hover:text-white'
              }`}
            >
              {link.label}
              <span
                className={`absolute bottom-0 left-0 h-px transition-all duration-300 ${
                  active === link.href.slice(1) ? 'w-full bg-neon-red' : 'w-0 bg-electric-orange group-hover:w-full'
                }`}
              />
            </a>
          ))}
        </div>
        <a href="#contact" className="hidden lg:block btn-primary text-white text-xs">
          Join Now
        </a>
      <button
        className="lg:hidden text-white p-2"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <Menu size={24} />
      </button>
    </div>
    {/* Side Drawer Menu */}
    <div
      className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
          onClick={() => setOpen(false)}
        />
        {/* Drawer Content */}
        <div
          className={`absolute top-0 right-0 w-[280px] h-full glass-dark border-l border-white/10 p-6 flex flex-col gap-6 shadow-2xl transform transition-transform duration-500 ease-out ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Zap className="text-neon-red" size={20} />
              <span className="font-display text-sm tracking-widest text-white uppercase">Menu</span>
            </div>
            <button 
              onClick={() => setOpen(false)} 
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col gap-1">
            {links.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`font-display text-base tracking-widest uppercase py-4 border-b border-white/5 transition-all duration-300 ${
                  active === link.href.slice(1) ? 'text-neon-red pl-2' : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="mt-auto">
            <a 
              href="#contact" 
              onClick={() => setOpen(false)} 
              className="btn-primary text-white text-xs w-full flex items-center justify-center py-4"
            >
              Join Now
            </a>
            <div className="mt-6 text-center">
              <p className="font-mono-custom text-[10px] text-gray-500 uppercase tracking-widest">
                IRON EMPIRE © 2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
