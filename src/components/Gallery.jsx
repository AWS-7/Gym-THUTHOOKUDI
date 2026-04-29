import { useState, useEffect, useRef } from 'react';
import { Maximize2, X } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import gympic from '../images/gympic.jpeg';
import gympic2 from '../images/gympic2.jpeg';
import galleryPic1 from '../images/1777468935763.jpg';
import galleryPic2 from '../images/1777468935768.jpg';
const galleryItems = [
  {
    id: 1,
    title: 'Main Gym Floor',
    category: 'Training Area',
    image: 'gym_one.jpeg',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    id: 2,
    title: 'Transformation Result',
    category: 'Results',
    image: 'gym_two.jpeg',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 3,
    title: 'Muscle Definition',
    category: 'Results',
    image: 'gym_three.jpeg',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 4,
    title: 'Gym Equipment Area',
    category: 'Training Area',
    image: gympic,
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 5,
    title: 'Workout Zone',
    category: 'Training Area',
    image: gympic2,
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 9,
    title: 'Training Session',
    category: 'Training Area',
    image: galleryPic1,
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 10,
    title: 'Workout Equipment',
    category: 'Facilities',
    image: galleryPic2,
    span: 'md:col-span-1 md:row-span-1',
  },
];
function GalleryCard({ item, i, isVisible, onSelect, className = "" }) {
  return (
    <div
      className={`relative group overflow-hidden cursor-pointer clip-angled-sm opacity-0-init ${
        isVisible ? 'animate-in-scale' : ''
      } ${item.span} ${className}`}
      style={{ animationDelay: `${i * 100}ms` }}
      onClick={() => onSelect(item.image)}
    >
      <img
        src={item.image}
        alt={`${item.title} - ${item.category} at IRON EMPIRE Thoothukudi`}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-4 left-4">
          <p className="font-mono-custom text-[10px] text-neon-red tracking-widest uppercase mb-1">
            {item.category}
          </p>
          <h3 className="font-display text-white text-lg tracking-wider">
            {item.title}
          </h3>
        </div>
      </div>
    </div>
  );
}
export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const scrollRef = useRef(null);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation(0.1);
  const { ref: mobileGridRef, isVisible: mobileGridVisible } = useScrollAnimation(0.1);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    let intervalId;
    const startAutoScroll = () => {
      intervalId = window.setInterval(() => {
        if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 10) {
          scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollContainer.scrollBy({ left: 300, behavior: 'smooth' });
        }
      }, 3000);
    };
    startAutoScroll();
    const handleInteraction = () => clearInterval(intervalId);
    const handleEnd = () => startAutoScroll();
    scrollContainer.addEventListener('touchstart', handleInteraction);
    scrollContainer.addEventListener('touchend', handleEnd);
    scrollContainer.addEventListener('mouseenter', handleInteraction);
    scrollContainer.addEventListener('mouseleave', handleEnd);
    return () => {
      clearInterval(intervalId);
      scrollContainer.removeEventListener('touchstart', handleInteraction);
      scrollContainer.removeEventListener('touchend', handleEnd);
      scrollContainer.removeEventListener('mouseenter', handleInteraction);
      scrollContainer.removeEventListener('mouseleave', handleEnd);
    };
  }, []);

  return (
    <section id="gallery" className="relative py-24 overflow-hidden bg-[#080808]">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`text-center mb-16 opacity-0-init ${headerVisible ? 'animate-in' : ''}`}
        >
          <span className="section-label">Virtual Tour</span>
          <h2 className="section-title text-white">
            OUR <span className="gradient-text">FACILITY</span>
          </h2>
          <div className="divider-line w-32 mx-auto mt-4 mb-6" />
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Take a look inside IRON EMPIRE. World-class equipment and an atmosphere built for champions.
          </p>
        </div>

        {/* Desktop Grid */}
        <div
          ref={gridRef}
          className="hidden md:grid grid-cols-4 auto-rows-[200px] gap-4"
        >
          {galleryItems.map((item, i) => (
            <GalleryCard 
              key={item.id} 
              item={item} 
              i={i} 
              isVisible={gridVisible} 
              onSelect={setSelectedImage} 
            />
          ))}
        </div>

        {/* Mobile Side Scroll */}
        <div className="md:hidden" ref={mobileGridRef}>
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar scroll-smooth"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {galleryItems.map((item, i) => (
              <GalleryCard
                key={item.id}
                item={item}
                i={i}
                isVisible={mobileGridVisible}
                onSelect={setSelectedImage}
                className="min-w-[300px] max-w-[300px] snap-center h-[400px]"
              />
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-2">
            {galleryItems.map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-neon-red/30"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
          <div 
            className="absolute inset-0 bg-black/95 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          />
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:text-neon-red transition-colors z-10"
          >
            <X size={24} />
          </button>
          <img
            src={selectedImage}
            alt="Full size"
            className="relative z-10 max-w-full max-h-full object-contain animate-in-scale"
          />
        </div>
      )}
    </section>
  );
}
