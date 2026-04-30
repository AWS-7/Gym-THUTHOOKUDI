import { IceCream, Sparkles, Clock, MapPin } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function SisterConcern() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative py-12 overflow-hidden bg-[#0a0a0a]">
      {/* Animated background gradient */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,107,0,0.15) 0%, transparent 70%)'
        }}
      />
      <div className="absolute inset-0 bg-dots opacity-20" />
      
      {/* Top gradient line */}
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2 w-full h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #ff6b00, #d4a017, #ff2020, transparent)' }}
      />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#080808] to-[#0d0d0d] opacity-0-init ${isVisible ? 'animate-in' : ''}`}
        >
          {/* Glow effects */}
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-[#ff6b00]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-[#d4a017]/20 rounded-full blur-3xl" />
          
          <div className="relative p-6 md:p-8">
            {/* Coming Soon Badge */}
            <div className="flex justify-center mb-4">
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#ff6b00]/50"
                style={{ background: 'rgba(255,107,0,0.1)' }}
              >
                <Sparkles size={14} className="text-[#ff6b00] animate-pulse" />
                <span className="font-mono-custom text-xs tracking-widest text-[#ff6b00] uppercase">
                  Coming Soon
                </span>
                <Sparkles size={14} className="text-[#d4a017] animate-pulse" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>

            {/* Main Content */}
            <div className="text-center">
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center relative"
                  style={{ 
                    background: 'linear-gradient(135deg, #ff6b00, #d4a017)',
                    boxShadow: '0 0 40px rgba(255,107,0,0.4)'
                  }}
                >
                  <IceCream className="w-8 h-8 text-white" />
                  {/* Orbiting dots */}
                  <div className="absolute inset-0 animate-spin" style={{ animationDuration: '8s' }}>
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full" />
                  </div>
                </div>
              </div>

              {/* Shop Name */}
              <h3 className="font-display text-2xl md:text-4xl text-white tracking-wide mb-1">
                <span className="gradient-text-gold">Happy Ending</span>
              </h3>
              <p className="font-display text-lg md:text-xl text-gray-400 tracking-wider mb-3">
                Ice Cream Shop
              </p>

              {/* Tagline */}
              <p className="font-mono-custom text-sm text-gray-500 italic max-w-md mx-auto mb-6">
                "The Perfect Reward After a Great Workout"
              </p>

              {/* Features Preview */}
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                {[
                  { icon: IceCream, label: 'Premium Ice Creams' },
                  { icon: Sparkles, label: 'Fresh Desserts' },
                  { icon: MapPin, label: 'Same Location' },
                ].map((item, i) => (
                  <div 
                    key={i}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5"
                  >
                    <item.icon size={12} className="text-[#ff6b00]" />
                    <span className="text-xs text-gray-400">{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Countdown / Notify Section */}
              <div className="border-t border-white/10 pt-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Clock size={16} className="text-[#d4a017]" />
                  <span className="font-mono-custom text-sm text-gray-400">
                    Opening Shortly
                  </span>
                </div>
                
                <p className="text-gray-500 text-sm mb-4">
                  Stay tuned for the sweetest addition to your fitness journey!
                </p>

                {/* CTA Button */}
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  style={{ 
                    background: 'linear-gradient(135deg, #ff6b00, #d4a017)',
                    color: 'white',
                    boxShadow: '0 4px 20px rgba(255,107,0,0.3)'
                  }}
                >
                  <span>Get Notified</span>
                  <Sparkles size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom decorative line */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-1"
            style={{ 
              background: 'linear-gradient(90deg, transparent, #ff6b00, #d4a017, #ff6b00, transparent)'
            }}
          />
        </div>
      </div>
    </section>
  );
}
