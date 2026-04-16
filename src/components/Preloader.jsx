import { useEffect, useState } from 'react';
export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Real-time loading simulation based on asset readiness
    let interval;
    const updateProgress = () => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Increment faster if page is already loaded
        const increment = document.readyState === 'complete' ? 5 : 1;
        return Math.min(prev + increment, 100);
      });
    };
    interval = window.setInterval(updateProgress, 30);
    const handleLoad = () => {
      // Force progress to 100 when everything is ready
      setProgress(100);
    };
    window.addEventListener('load', handleLoad);
    return () => {
      clearInterval(interval);
      window.removeEventListener('load', handleLoad);
    };
  }, []);
  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        setIsExiting(true);
        setTimeout(onComplete, 800); // Wait for exit animation
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);
  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#080808] transition-all duration-700 ease-in-out ${
        isExiting ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative mb-8">
        {/* Glowing Logo */}
        <div className="relative z-10 animate-pulse-glow h-40 md:h-56 w-auto overflow-hidden">
          <img 
            src="logo.png" 
            alt="IRON EMPIRE CrossFit & Fitness Studio Thoothukudi" 
            className="h-full w-auto object-contain"
            style={{ filter: 'drop-shadow(0 0 20px rgba(255, 32, 32, 0.7))' }}
          />
        </div>
        {/* Spinning Rings */}
        <div className="absolute inset-[-60px] border-2 border-neon-red/10 rounded-full animate-[spin_3s_linear_infinite]" />
        <div className="absolute inset-[-90px] border border-gold/5 rounded-full animate-[spin_5s_linear_reverse_infinite]" />
      </div>
      <div className="text-center mb-10">
        <h2 className="font-display text-3xl tracking-[0.2em] text-white mb-2" style={{ display: 'none' }}>
          IRON <span className="text-neon-red">EMPIRE</span>
        </h2>
        <p className="font-mono-custom text-[10px] tracking-[0.4em] text-gray-500 uppercase">
          Forging Excellence...
        </p>
      </div>
      {/* Progress Bar Container */}
      <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden relative">
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-neon-red via-electric-orange to-gold transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
        {/* Glow effect on the bar */}
        <div 
          className="absolute top-0 left-0 h-full w-20 bg-white/20 blur-md transition-all duration-300"
          style={{ left: `calc(${progress}% - 80px)` }}
        />
      </div>
      <div className="mt-4 font-mono-custom text-xs text-neon-red/60 tracking-widest">
        {progress}%
      </div>
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-at-c from-neon-red/5 to-transparent opacity-30 pointer-events-none" />
    </div>
  );
}
