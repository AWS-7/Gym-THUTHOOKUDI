import { IceCream, MapPin, ExternalLink } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

// Ice Cream Image - Add your image here
const iceCreamImage = {
  src: '/icecream.jpg',
  alt: 'Premium Ice Cream'
};

export default function SisterConcern() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative py-16 overflow-hidden bg-[#0a0a0a]">
      <div className="absolute inset-0 bg-dots opacity-30" />
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2 w-full h-px opacity-20"
        style={{ background: 'linear-gradient(90deg, transparent, #ff6b00, #d4a017, transparent)' }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`flex flex-col gap-6 p-8 rounded-2xl border border-white/5 bg-[#080808]/50 backdrop-blur-sm opacity-0-init ${isVisible ? 'animate-in' : ''}`}
        >
          {/* Top Row - Info */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left - Badge */}
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #ff6b00, #d4a017)' }}
              >
                <IceCream className="w-8 h-8 text-white" />
              </div>
              <div>
                <span className="font-mono-custom text-[10px] tracking-widest text-[#ff6b00] uppercase block">
                  By The Same Owner
                </span>
                <h3 className="font-display text-2xl md:text-3xl text-white tracking-wide">
                  [Shop Name]
                </h3>
                <p className="text-gray-400 text-sm">Ice Cream & Desserts</p>
              </div>
            </div>

            {/* Center - Tagline */}
            <div className="text-center md:text-left">
              <p className="font-mono-custom text-sm text-gray-400 italic">
                "Reward Your Hard Work"
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Premium ice creams after your workout
              </p>
            </div>

            {/* Right - Location & CTA */}
            <div className="flex flex-col items-center md:items-end gap-2">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin size={14} className="text-[#ff6b00]" />
                <span>[Location]</span>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
                style={{ 
                  background: 'linear-gradient(135deg, #ff6b00, #d4a017)',
                  color: 'white'
                }}
              >
                Visit Us
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Ice Cream Image */}
          <div className="flex justify-center mt-4">
            <div className="relative w-full max-w-md aspect-video rounded-xl overflow-hidden border border-white/10 group cursor-pointer">
              <img
                src={iceCreamImage.src}
                alt={iceCreamImage.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              {/* Placeholder when image not found */}
              <div className="absolute inset-0 hidden items-center justify-center bg-gradient-to-br from-[#ff6b00]/20 to-[#d4a017]/20">
                <IceCream className="w-12 h-12 text-[#ff6b00]" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute bottom-3 left-3 text-sm text-white font-mono-custom opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {iceCreamImage.alt}
              </span>
            </div>
          </div>
          
          {/* Image path info */}
          <p className="text-center text-gray-600 text-xs font-mono-custom">
            Add image to public folder: icecream.jpg
          </p>
        </div>
      </div>
    </section>
  );
}
