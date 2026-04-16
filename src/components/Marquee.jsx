import { Zap } from 'lucide-react';
const items = [
  'HIIT', 'Strength Training', 'Cardiovascular Training', 'CrossFit',
  'Personal Training', 'Muscle Gain', 'Fat Loss', 'Body Transformation',
  'Heart Health', 'Endurance', 'Vascularity', 'Elite Coaching',
];
export default function Marquee() {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-4" style={{ background: 'linear-gradient(90deg, #ff2020, #ff6b00)' }}>
      <div className="flex gap-0 animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-6">
            <Zap size={14} className="text-white/70" />
            <span className="font-display text-sm tracking-[0.2em] uppercase text-white font-bold">{item}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
