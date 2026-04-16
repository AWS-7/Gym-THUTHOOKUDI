import { useEffect, useRef, useState } from 'react';
export function useScrollAnimation(threshold = 0.15) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
}
export function useCounter(endStr, duration = 2000, start = 0) {
  const [count, setCount] = useState(start);
  const [active, setActive] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Parse end value and suffix
  const endMatch = String(endStr).match(/^([#\d]+)(.*)$/);
  const endValue = endMatch ? parseInt(endMatch[1].replace('#', '1')) : 0;
  const suffix = endMatch ? endMatch[2] : '';
  const prefix = String(endStr).startsWith('#') ? '#' : '';

  useEffect(() => {
    if (!active || hasAnimated) return;
    
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function (easeOutExpo)
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(eased * (endValue - start) + start));
      
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setHasAnimated(true);
      }
    };
    requestAnimationFrame(step);
  }, [active, endValue, start, duration, hasAnimated]);

  return { 
    count: prefix + count + suffix, 
    activate: () => setActive(true) 
  };
}
