import { useEffect, useRef } from 'react';
import { TrendingDown, TrendingUp, Activity } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
const weightData = [92, 89, 86, 83, 79, 76, 73, 70, 68, 65, 63, 61];
const muscleData = [60, 61.5, 63, 64, 65.5, 67, 68.5, 70, 71, 72.5, 74, 75.5];
const fatData = [28, 26, 24, 22, 20, 18, 17, 16, 14.5, 13, 12, 10.5];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function LineChart({
  data, color, label, unit, isVisible,
}) {
  const svgRef = useRef(null);
  const min = Math.min(...data) - 2;
  const max = Math.max(...data) + 2;
  const w = 100;
  const h = 100;
  const points = data.map((v, i) => ({
    x: (i / (data.length - 1)) * w,
    y: h - ((v - min) / (max - min)) * h,
  }));
  const path = points.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = points[i - 1];
    const cp1x = prev.x + (p.x - prev.x) * 0.4;
    const cp1y = prev.y;
    const cp2x = p.x - (p.x - prev.x) * 0.4;
    const cp2y = p.y;
    return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p.x} ${p.y}`;
  }, '');
  const area = `${path} L ${w} ${h} L 0 ${h} Z`;
  return (
    <div className="glass clip-angled p-5 group">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
        <span className="font-display text-sm text-white uppercase tracking-wider">{label}</span>
      </div>
      <div className="relative" style={{ paddingBottom: '56%' }}>
        <svg
          ref={svgRef}
          viewBox={`0 0 ${w} ${h}`}
          className="absolute inset-0 w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={`grad-${label}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
            <filter id={`glow-${label}`}>
              <feGaussianBlur stdDeviation="1" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {[0, 25, 50, 75, 100].map(y => (
            <line key={y} x1="0" y1={y} x2={w} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
          ))}
          <path
            d={area}
            fill={`url(#grad-${label})`}
            style={{
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 1s ease 0.5s',
            }}
          />
          <path
            d={path}
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            filter={`url(#glow-${label})`}
            style={{
              strokeDasharray: '300',
              strokeDashoffset: isVisible ? '0' : '300',
              transition: 'stroke-dashoffset 2s ease 0.3s',
            }}
          />
          {points.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="1.5"
              fill={color}
              style={{
                opacity: isVisible ? 1 : 0,
                transition: `opacity 0.3s ease ${0.3 + i * 0.15}s`,
                filter: `drop-shadow(0 0 3px ${color})`,
              }}
            />
          ))}
        </svg>
      </div>
      <div className="flex justify-between mt-2">
        {months.filter((_, i) => i % 2 === 0).map((m, i) => (
          <span key={i} className="font-mono-custom text-[9px] text-gray-600">{m}</span>
        ))}
      </div>
      <div className="mt-3 flex justify-between items-center">
        <span className="font-mono-custom text-[10px] text-gray-500">Start: <span style={{ color }}>{data[0]}{unit}</span></span>
        <div className="flex items-center gap-1">
          {data[data.length - 1] < data[0] ? (
            <TrendingDown size={12} style={{ color }} />
          ) : (
            <TrendingUp size={12} style={{ color }} />
          )}
          <span className="font-mono-custom text-[10px]" style={{ color }}>
            {Math.abs(data[data.length - 1] - data[0]).toFixed(1)}{unit} change
          </span>
        </div>
        <span className="font-mono-custom text-[10px] text-gray-500">Now: <span style={{ color }}>{data[data.length - 1]}{unit}</span></span>
      </div>
    </div>
  );
}
function RadialChart({ pct, label, color, isVisible, className = "" }) {
  const r = 40;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <div className={`glass clip-angled-sm p-5 text-center ${className}`}>
      <div className="relative w-28 h-28 mx-auto mb-3">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
          <circle
            cx="50" cy="50" r={r} fill="none"
            stroke={color} strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={isVisible ? offset : circ}
            style={{
              transition: 'stroke-dashoffset 1.5s cubic-bezier(0.16,1,0.3,1) 0.5s',
              filter: `drop-shadow(0 0 4px ${color})`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-2xl" style={{ color }}>{pct}%</span>
        </div>
      </div>
      <span className="font-mono-custom text-[10px] tracking-widest text-gray-500 uppercase">{label}</span>
    </div>
  );
}

export default function FitnessCharts() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation(0.1);
  const { ref: chartsRef, isVisible: chartsVisible } = useScrollAnimation(0.1);
  const { ref: radialRef, isVisible: radialVisible } = useScrollAnimation(0.05);

  return (
    <section id="progress" className="relative py-24 overflow-hidden bg-[#080808]">
      <div className="absolute inset-0 bg-dots opacity-20" />
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 opacity-5"
        style={{ background: 'radial-gradient(circle, #d4a017, transparent)', filter: 'blur(60px)' }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`text-center mb-16 opacity-0-init ${headerVisible ? 'animate-in' : ''}`}
        >
          <span className="section-label">Track Progress</span>
          <h2 className="section-title text-white">
            FITNESS <span className="gradient-text">CHARTS</span>
          </h2>
          <div className="divider-line w-32 mx-auto mt-4 mb-6" />
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Real member progress data showing what consistent training at IRON EMPIRE achieves.
          </p>
        </div>

        <div
          ref={chartsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10"
        >
          <div className={`opacity-0-init ${chartsVisible ? 'animate-in' : ''}`} style={{ animationDelay: '0ms' }}>
            <LineChart data={weightData} color="#ff2020" label="Weight Loss Progress" unit="kg" isVisible={chartsVisible} />
          </div>
          <div className={`opacity-0-init ${chartsVisible ? 'animate-in' : ''}`} style={{ animationDelay: '150ms' }}>
            <LineChart data={muscleData} color="#22c55e" label="Muscle Mass Gain" unit="kg" isVisible={chartsVisible} />
          </div>
          <div className={`opacity-0-init ${chartsVisible ? 'animate-in' : ''}`} style={{ animationDelay: '300ms' }}>
            <LineChart data={fatData} color="#ff6b00" label="Body Fat Reduction" unit="%" isVisible={chartsVisible} />
          </div>
        </div>

        <div
          ref={radialRef}
          className={`opacity-0-init ${radialVisible ? 'animate-in' : ''}`}
        >
          <div className="glass clip-angled p-6">
            <div className="flex items-center gap-2 mb-6">
              <Activity size={18} className="text-electric-orange" />
              <span className="font-display text-lg text-white uppercase tracking-wider">Member Success Metrics</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              <RadialChart pct={94} label="Goal Achievement" color="#ff2020" isVisible={radialVisible} />
              <RadialChart pct={88} label="Retention Rate" color="#ff6b00" isVisible={radialVisible} />
              <RadialChart pct={96} label="Satisfaction" color="#d4a017" isVisible={radialVisible} />
              <RadialChart pct={78} label="Fat Loss Results" color="#22c55e" isVisible={radialVisible} />
              <RadialChart pct={85} label="Strength Gains" color="#3b9ede" isVisible={radialVisible} />
              <RadialChart pct={91} label="Diet Adherence" color="#a855f7" isVisible={radialVisible} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
