import { Sparkles } from 'lucide-react';
import image1 from '../images/image1.jpeg';
import image2 from '../images/image2.jpeg';
import image3 from '../images/image3.jpeg';
import image4 from '../images/image4.jpeg';
import images5 from '../images/images5.jpeg';
import images6 from '../images/images6.jpeg';
import images7 from '../images/images7.jpeg';
import images8 from '../images/images8.jpeg';
import images9 from '../images/images9.jpeg';
import images10 from '../images/images10.jpeg';
import images11 from '../images/images11.jpeg';

const supplementImages = [
  { src: image1, alt: 'Supplement 1' },
  { src: image2, alt: 'Supplement 2' },
  { src: image3, alt: 'Supplement 3' },
  { src: image4, alt: 'Supplement 4' },
  { src: images5, alt: 'Supplement 5' },
  { src: images6, alt: 'Supplement 6' },
  { src: images7, alt: 'Supplement 7' },
  { src: images8, alt: 'Supplement 8' },
  { src: images9, alt: 'Supplement 9' },
  { src: images10, alt: 'Supplement 10' },
  { src: images11, alt: 'Supplement 11' },
];

export default function Supplements() {
  const doubledImages = [...supplementImages, ...supplementImages];

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

      {/* Mobile Auto-Scrolling Images */}
      <div className="relative overflow-hidden py-8 bg-[#0a0a0a] border-y border-white/5">
        <div className="flex gap-6 animate-marquee-mobile whitespace-nowrap">
          {doubledImages.map((image, i) => (
            <div
              key={i}
              className="flex-shrink-0 inline-flex items-center justify-center p-2 bg-[#111] rounded-xl border border-white/10 hover:border-[#ff2020]/50 transition-all duration-300"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-24 h-24 md:w-32 md:h-32 object-contain rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Grid View */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 hidden md:grid md:grid-cols-4 lg:grid-cols-6 gap-4">
        {supplementImages.map((image, i) => (
          <div
            key={i}
            className="flex items-center justify-center p-4 bg-[#0a0a0a] rounded-xl border border-white/10 hover:border-[#ff2020]/50 hover:bg-[#111] transition-all duration-300 group"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-28 object-contain rounded-lg group-hover:scale-105 transition-transform duration-300"
            />
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
