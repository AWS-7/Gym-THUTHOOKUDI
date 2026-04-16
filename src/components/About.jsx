import { useRef } from 'react';
import { Shield, Target, Flame, Award } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useParallax } from '../hooks/useParallax';
const pillars = [
  {
    icon: Shield,
    title: 'Elite Training',
    desc: 'Science-backed programs designed for maximum results — whether CrossFit WODs or personalized strength plans.',
    color: '#ff2020',
  },
  {
    icon: Target,
    title: 'Goal Focused',
    desc: 'Every member gets a customized roadmap. Weight loss, muscle gain, or athletic performance — we deliver.',
    color: '#ff6b00',
  },
  {
    icon: Award,
    title: 'Certified Coaches',
    desc: 'Our team holds international certifications in CrossFit, strength conditioning, and sports nutrition.',
    color: '#d4a017',
  },
  {
    icon: Flame,
    title: 'Proven Results',
    desc: '500+ successful transformations. Our community speaks for itself — real results, real people.',
    color: '#ff2020',
  },
];

const timeline = [
  { year: '2023', event: 'Founded in Thoothukudi with a vision for elite fitness & CrossFit' },
  { year: '2024', event: 'Expanded to full-scale Fitness Studio & certified coaching team' },
  { year: '2025', event: 'IRON EMPIRE — Tamil Nadu\'s fastest growing fitness brand' },
  { year: '2026', event: 'Expanding with advanced tech, AI nutrition & smart training' },
];

function AnimatedCard({ icon: Icon, title, desc, color, delay }) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`glass clip-angled p-6 group cursor-default opacity-0-init ${isVisible ? 'animate-in' : ''}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className="w-12 h-12 rounded flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
        style={{ background: `${color}22`, border: `1px solid ${color}44` }}
      >
        <Icon size={22} style={{ color }} />
      </div>
      <h3 className="font-display text-lg tracking-wider text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

export default function About() {
  const { ref: headerScrollRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: timelineRef, isVisible: timelineVisible } = useScrollAnimation();
  const parallaxText = useParallax(-0.15);

  return (
    <section id="about" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-charcoal/30" />
      
      {/* Background Parallax Text */}
      <div 
        className="absolute top-1/4 -left-20 pointer-events-none select-none"
        style={{ transform: `translateY(${parallaxText}px)` }}
      >
        <h2 className="text-[18vw] font-display text-white/[0.04] leading-none whitespace-nowrap rotate-12">
          DISCIPLINE
        </h2>
      </div>

      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #ff2020, transparent)', filter: 'blur(60px)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headerScrollRef}
          className={`text-center mb-16 opacity-0-init ${headerVisible ? 'animate-in' : ''}`}
        >
          <span className="section-label">Our Story</span>
          <h2 className="section-title text-white">
            WHO WE <span className="gradient-text">ARE</span>
          </h2>
          <div className="divider-line w-32 mx-auto mt-4 mb-6" />
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Born in Thoothukudi, built on sweat and discipline — IRON EMPIRE is not just a gym.
            It's a movement. We forge champions, one rep at a time.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {pillars.map((p, i) => (
            <AnimatedCard key={i} {...p} delay={i * 150} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            ref={timelineRef}
            className={`opacity-0-init ${timelineVisible ? 'animate-in-left' : ''}`}
          >
            <span className="section-label">Our Journey</span>
            <h3 className="font-display text-3xl md:text-4xl text-white uppercase tracking-wide mb-8">
              Built Over <span className="gradient-text-gold">3 Years</span>
            </h3>
            <div className="relative pl-6">
              <div
                className="absolute left-0 top-0 bottom-0 w-px"
                style={{ background: 'linear-gradient(to bottom, #ff2020, #d4a017, transparent)' }}
              />
              {timeline.map((item, i) => (
                <div
                  key={i}
                  className="relative mb-6 last:mb-0 group"
                  style={{
                    opacity: timelineVisible ? 1 : 0,
                    transform: timelineVisible ? 'none' : 'translateX(-20px)',
                    transition: `all 0.6s ease ${400 + i * 120}ms`,
                  }}
                >
                  <div
                    className="absolute -left-[27px] top-1 w-3 h-3 rounded-full border-2 border-neon-red transition-all duration-300 group-hover:scale-150 group-hover:shadow-lg"
                    style={{ background: '#080808', boxShadow: '0 0 6px #ff2020' }}
                  />
                  <div className="flex items-start gap-4">
                    <span
                      className="font-mono-custom text-xs font-bold shrink-0"
                      style={{ color: '#d4a017' }}
                    >
                      {item.year}
                    </span>
                    <p className="text-gray-300 text-sm leading-relaxed">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className={`opacity-0-init ${timelineVisible ? 'animate-in-right' : ''}`}
            style={{ animationDelay: '200ms' }}
          >
            <div className="glass clip-angled p-8 relative overflow-hidden">
              <div
                className="absolute top-0 right-0 w-48 h-48 opacity-10"
                style={{ background: 'radial-gradient(circle, #d4a017, transparent)', filter: 'blur(30px)' }}
              />
              <span className="section-label">Our Mission</span>
              <h3 className="font-display text-2xl md:text-3xl text-white uppercase tracking-wide mb-4">
                Forging <span className="gradient-text">Champions</span>
              </h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                At IRON EMPIRE, we believe every individual carries the potential of a champion. Our mission is to unlock that potential through world-class coaching, cutting-edge programs, and a community that pushes you beyond your limits.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                Our vision is to make Thoothukudi a hub of fitness excellence — where transformation stories inspire the entire region.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: '500+', text: 'Lives Changed' },
                  { num: '8+', text: 'Years Strong' },
                  { num: '15+', text: 'Expert Coaches' },
                  { num: '#1', text: 'In Thoothukudi' },
                ].map((s, i) => (
                  <div key={i} className="text-center p-3 rounded" style={{ background: 'rgba(255,32,32,0.05)' }}>
                    <div className="font-display text-2xl gradient-text">{s.num}</div>
                    <div className="font-mono-custom text-[10px] tracking-widest text-gray-500 uppercase">{s.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
