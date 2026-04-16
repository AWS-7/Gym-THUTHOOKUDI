import { useState } from 'react';
import { Activity, ChevronRight } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
const categories = [
  { label: 'Underweight', min: 0, max: 18.5, color: '#3b9ede', desc: 'You may need to gain some weight. Consult a nutritionist.' },
  { label: 'Normal', min: 18.5, max: 25, color: '#22c55e', desc: 'Excellent Maintain your healthy lifestyle.' },
  { label: 'Overweight', min: 25, max: 30, color: '#f59e0b', desc: 'Consider a structured fat loss program.' },
  { label: 'Obese I', min: 30, max: 35, color: '#ff6b00', desc: 'Join our weight loss program for guided transformation.' },
  { label: 'Obese II', min: 35, max: 40, color: '#ff2020', desc: 'Medical attention advised. Our trainers can help.' },
  { label: 'Extreme', min: 40, max: 100, color: '#cc0000', desc: 'Please consult a doctor before starting any program.' },
];
function getCategory(bmi) {
  return categories.find(c => bmi >= c.min && bmi < c.max) || categories[categories.length - 1];
}

function BMIMeter({ bmi }) {
  const clampedBMI = bmi ? Math.min(Math.max(bmi, 10), 45) : null;
  const pct = clampedBMI ? ((clampedBMI - 10) / 35) * 100 : 0;
  return (
    <div className="relative">
      <div className="h-6 rounded-full overflow-hidden mb-2" style={{
        background: 'linear-gradient(90deg, #3b9ede 0%, #22c55e 25%, #f59e0b 50%, #ff6b00 70%, #ff2020 85%, #cc0000 100%)',
      }}>
        {clampedBMI && (
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-1000 ease-out"
            style={{ left: `${pct}%` }}
          >
            <div className="w-4 h-8 flex flex-col items-center">
              <div className="w-0.5 h-3 bg-white" />
              <div className="w-3 h-3 rounded-full bg-white shadow-lg" style={{ boxShadow: '0 0 8px rgba(255,255,255,0.8)' }} />
              <div className="w-0.5 h-3 bg-white" />
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-between font-mono-custom text-[9px] text-gray-600 px-1">
        <span>10</span><span>18.5</span><span>25</span><span>30</span><span>35</span><span>40+</span>
      </div>
    </div>
  );
}

export default function BMICalculator() {
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [bmi, setBmi] = useState(null);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: calcRef, isVisible: calcVisible } = useScrollAnimation();

  const calculate = () => {
    const h = height / 100;
    setBmi(parseFloat((weight / (h * h)).toFixed(1)));
  };

  const category = bmi ? getCategory(bmi) : null;

  return (
    <section id="bmi" className="relative py-24 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, #080808 0%, #111111 50%, #080808 100%)' }}
      />
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`text-center mb-16 opacity-0-init ${headerVisible ? 'animate-in' : ''}`}
        >
          <span className="section-label">Fitness Tools</span>
          <h2 className="section-title text-white">
            BMI <span className="gradient-text">CALCULATOR</span>
          </h2>
          <div className="divider-line w-32 mx-auto mt-4 mb-6" />
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Calculate your Body Mass Index and understand where you stand on your fitness journey.
          </p>
        </div>

        <div
          ref={calcRef}
          className={`max-w-3xl mx-auto opacity-0-init ${calcVisible ? 'animate-in-scale' : ''}`}
        >
          <div className="glass clip-angled p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="font-mono-custom text-[10px] tracking-widest text-gray-500 uppercase block mb-3">
                  Height: <span className="text-electric-orange text-sm">{height} cm</span>
                </label>
                <input
                  type="range" min="140" max="220" value={height}
                  onChange={e => setHeight(Number(e.target.value))}
                  className="w-full cursor-pointer mb-2"
                />
                <div className="flex justify-between font-mono-custom text-[10px] text-gray-600">
                  <span>140cm</span><span>220cm</span>
                </div>
              </div>
              <div>
                <label className="font-mono-custom text-[10px] tracking-widest text-gray-500 uppercase block mb-3">
                  Weight: <span className="text-electric-orange text-sm">{weight} kg</span>
                </label>
                <input
                  type="range" min="30" max="200" value={weight}
                  onChange={e => setWeight(Number(e.target.value))}
                  className="w-full cursor-pointer mb-2"
                />
                <div className="flex justify-between font-mono-custom text-[10px] text-gray-600">
                  <span>30kg</span><span>200kg</span>
                </div>
              </div>
            </div>

            <button onClick={calculate} className="w-full btn-primary text-white flex items-center justify-center gap-2 mb-8">
              <Activity size={16} />
              <span>Calculate BMI</span>
              <ChevronRight size={16} />
            </button>
            {bmi && category && (
              <div className="animate-in">
                <div className="text-center mb-6">
                  <div
                    className="font-display text-7xl font-bold mb-2"
                    style={{ color: category.color, textShadow: `0 0 30px ${category.color}88` }}
                  >
                    {bmi}
                  </div>
                  <div
                    className="inline-block font-display text-xl uppercase tracking-wider px-6 py-2 clip-angled-sm"
                    style={{ background: `${category.color}22`, border: `1px solid ${category.color}66`, color: category.color }}
                  >
                    {category.label}
                  </div>
                </div>
                <BMIMeter bmi={bmi} />
                <div
                  className="mt-6 p-4 rounded"
                  style={{ background: `${category.color}11`, border: `1px solid ${category.color}33` }}
                >
                  <p className="text-gray-300 text-sm text-center mb-3">{category.desc}</p>
                  {category.label !== 'Normal' && (
                    <div className="text-center">
                      <a href="#plans" className="btn-primary text-white text-xs inline-block">
                        See Our Programs
                      </a>
                    </div>
                  )}
                </div>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {categories.slice(0, 6).map((c, i) => (
                    <div
                      key={i}
                      className="p-2 rounded text-center transition-all duration-300"
                      style={{
                        background: category.label === c.label ? `${c.color}22` : 'rgba(255,255,255,0.02)',
                        border: `1px solid ${category.label === c.label ? c.color + '88' : 'rgba(255,255,255,0.05)'}`,
                      }}
                    >
                      <div className="font-mono-custom text-[8px] tracking-widest uppercase" style={{ color: c.color }}>{c.label}</div>
                      <div className="font-display text-[10px] text-gray-600">{c.min}–{c.max === 100 ? '40+' : c.max}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
