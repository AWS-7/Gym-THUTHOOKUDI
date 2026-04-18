import { Sparkles } from 'lucide-react';

const supplementBrands = [
  { name: 'ON', fullName: 'Optimum Nutrition' },
  { name: 'MuscleTech', fullName: 'MuscleTech' },
  { name: 'Dymatize', fullName: 'Dymatize' },
  { name: 'BSN', fullName: 'BSN' },
  { name: 'Isopure', fullName: 'Isopure' },
  { name: 'Cellucor', fullName: 'Cellucor C4' },
  { name: 'BPI', fullName: 'BPI Sports' },
  { name: 'GNC', fullName: 'GNC Pro' },
  { name: 'MyProtein', fullName: 'MyProtein' },
  { name: 'Universal', fullName: 'Universal Nutrition' },
  { name: 'Nutrabay', fullName: 'Nutrabay' },
  { name: 'AS-IT-IS', fullName: 'AS-IT-IS Nutrition' },
];

export default function Supplements() {
  const doubledBrands = [...supplementBrands, ...supplementBrands];

  return (
    <section id="supplements" className="py-20 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff2020]/10 border border-[#ff2020]/30 mb-6">
            <Sparkles className="w-4 h-4 text-[#ff2020]" />
            <span className="text-sm font-medium text-[#ff2020] tracking-wider uppercase">Premium Nutrition</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            We Are Providing <span className="text-[#ff2020]">Supplements</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Get authentic protein powders, pre-workouts, and nutrition supplements from top global brands at competitive prices.
          </p>
        </div>
      </div>

      {/* Mobile Auto-Scrolling Brand Logos */}
      <div className="relative overflow-hidden py-8 bg-[#0a0a0a] border-y border-white/5">
        <div className="flex gap-12 animate-marquee-mobile whitespace-nowrap">
          {doubledBrands.map((brand, i) => (
            <div
              key={i}
              className="flex-shrink-0 inline-flex items-center justify-center px-6 py-3 bg-[#111] rounded-xl border border-white/10 hover:border-[#ff2020]/50 transition-all duration-300"
            >
              <span className="font-display text-xl md:text-2xl font-bold text-white/90 tracking-wide">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Grid View */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 hidden md:grid md:grid-cols-4 lg:grid-cols-6 gap-4">
        {supplementBrands.map((brand, i) => (
          <div
            key={i}
            className="flex items-center justify-center p-6 bg-[#0a0a0a] rounded-xl border border-white/10 hover:border-[#ff2020]/50 hover:bg-[#111] transition-all duration-300 group"
          >
            <span className="font-display text-lg font-bold text-white/70 group-hover:text-[#ff2020] transition-colors text-center">
              {brand.name}
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 text-center">
        <p className="text-white/50 text-sm mb-4">Contact us for supplement orders and recommendations</p>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-8 py-3 bg-[#ff2020] text-white font-bold rounded-full hover:bg-[#ff2020]/80 transition-colors"
        >
          Order Now
        </a>
      </div>
    </section>
  );
}
