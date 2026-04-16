import { useState, useEffect } from 'react';

export function useParallax(speed = 0.5, initialOffset = 0) {
  const [offset, setOffset] = useState(initialOffset);

  useEffect(() => {
    const handleScroll = () => {
      // Use requestAnimationFrame for smoother performance
      requestAnimationFrame(() => {
        setOffset(initialOffset + window.pageYOffset * speed);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, initialOffset]);

  return offset;
}
