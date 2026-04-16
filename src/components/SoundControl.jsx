import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function SoundControl() {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const bgMusicRef = useRef(null);

  useEffect(() => {
    // Initialize audio
    // Using a royalty-free energetic track URL for gym vibe
    bgMusicRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    bgMusicRef.current.loop = true;
    bgMusicRef.current.volume = 0.3;

    return () => {
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current = null;
      }
    };
  }, []);

  const toggleSound = () => {
    if (!bgMusicRef.current) return;

    if (isMuted) {
      bgMusicRef.current.play().catch(err => console.log("Audio play blocked", err));
      setIsPlaying(true);
      setIsMuted(false);
      window.dispatchEvent(new CustomEvent('soundEnabled', { detail: true }));
    } else {
      bgMusicRef.current.pause();
      setIsPlaying(false);
      setIsMuted(true);
      window.dispatchEvent(new CustomEvent('soundEnabled', { detail: false }));
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-center gap-3">
      {/* Sound Status Label */}
      <div className={`font-mono-custom text-[10px] tracking-widest uppercase transition-all duration-300 ${isPlaying ? 'text-neon-red opacity-100' : 'text-gray-500 opacity-0'}`}>
        Music On
      </div>

      <button
        onClick={toggleSound}
        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 group relative ${
          !isMuted 
          ? 'bg-neon-red shadow-[0_0_20px_rgba(255,32,32,0.4)] scale-110' 
          : 'bg-white/5 border border-white/10 hover:border-neon-red/50'
        }`}
      >
        {/* Ripple Effect for active state */}
        {!isMuted && (
          <div className="absolute inset-0 rounded-full animate-ping bg-neon-red/20 pointer-events-none" />
        )}
        
        {!isMuted ? (
          <Volume2 size={24} className="text-white animate-pulse" />
        ) : (
          <VolumeX size={24} className="text-gray-400 group-hover:text-white transition-colors" />
        )}

        {/* Floating Note Icons when playing */}
        {!isMuted && (
          <>
            <Music size={12} className="absolute -top-2 -right-1 text-neon-red animate-bounce" style={{ animationDelay: '0.1s' }} />
            <Music size={10} className="absolute top-0 -left-2 text-electric-orange animate-bounce" style={{ animationDelay: '0.4s' }} />
          </>
        )}
      </button>
    </div>
  );
}
