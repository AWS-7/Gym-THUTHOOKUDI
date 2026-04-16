import { useEffect, useState } from 'react';
import { X, Gift, Zap, ArrowRight } from 'lucide-react';
export default function PromotionPopup() {
  const [show, setShow] = useState(false);
  const [closing, setClosing] = useState(false);
  useEffect(() => {
    // Show popup after 30 seconds
    const showTimer = setTimeout(() => {
      setShow(true);
    }, 30000);
    return () => clearTimeout(showTimer);
  }, []);
  useEffect(() => {
    if (show) {
      // Auto close after 5 seconds
      const closeTimer = setTimeout(() => {
        handleClose();
      }, 5000);
      return () => clearTimeout(closeTimer);
    }
  }, [show]);
  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setShow(false);
      setClosing(false);
    }, 500);
  };
  if (!show) return null;
  return (
    <div className={`fixed inset-0 z-[200] flex items-center justify-center p-4 transition-all duration-500 ${closing ? 'opacity-0' : 'opacity-100'}`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      {/* Popup Content */}
      <div 
        className={`relative w-full max-w-lg glass clip-angled overflow-hidden shadow-2xl transform transition-all duration-700 ${closing ? 'translate-y-20 scale-95' : 'translate-y-0 scale-100 animate-in-scale'}`}
        style={{ border: '1px solid rgba(255, 32, 32, 0.3)' }}
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-red via-gold to-neon-red animate-shimmer" style={{ backgroundSize: '200% auto' }} />
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full glass flex items-center justify-center text-white hover:text-neon-red transition-colors z-10"
        >
          <X size={18} />
        </button>
        <div className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-neon-red/10 border border-neon-red/30 flex items-center justify-center text-neon-red">
              <Gift size={28} className="animate-pulse-glow" />
            </div>
            <div>
              <span className="font-mono-custom text-[10px] text-gold tracking-[0.3em] uppercase block mb-1">Limited Offer</span>
              <h3 className="font-display text-2xl text-white uppercase tracking-wider">Join the Empire</h3>
            </div>
          </div>
          <p className="text-gray-300 text-lg mb-6 leading-relaxed">
            Get a <span className="text-neon-red font-bold">FREE Trial Session</span> and 10% discount on your first annual membership
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#contact" 
              onClick={handleClose}
              className="flex-1 btn-primary text-white flex items-center justify-center gap-2 py-4"
            >
              Claim Offer Now <ArrowRight size={16} />
            </a>
            <button 
              onClick={handleClose}
              className="px-8 py-4 font-display text-xs tracking-widest uppercase glass text-gray-400 hover:text-white transition-all clip-angled-sm"
            >
              Maybe Later
            </button>
          </div>
          <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap size={14} className="text-neon-red" />
              <span className="font-mono-custom text-[9px] text-gray-500 uppercase tracking-widest">Iron Empire Studio</span>
            </div>
            <span className="font-mono-custom text-[9px] text-neon-red/60 uppercase tracking-widest animate-pulse">Closing in 5s...</span>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-neon-red/10 blur-[50px] rounded-full pointer-events-none" />
      </div>
    </div>
  );
}
