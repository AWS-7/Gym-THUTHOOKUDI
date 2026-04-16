import { useState } from 'react';
import { Cpu, ChevronRight, Loader } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
function generateDiet(age, gender, height, weight, goal) {
  const bmr = gender === 'male'
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;
  const tdee = Math.round(bmr * 1.55);
  const calories = goal === 'loss' ? tdee - 500 : goal === 'gain' ? tdee + 400 : tdee;
  const protein = goal === 'gain' ? Math.round(weight * 2.2) : Math.round(weight * 1.8);
  const fat = Math.round(calories * 0.25 / 9);
  const carbs = Math.round((calories - protein * 4 - fat * 9) / 4);
  const meals = [
    {
      time: '7:00 AM',
      name: 'Power Breakfast',
      items: goal === 'gain'
        ? ['4 egg whites + 2 whole eggs', 'Oats with banana & honey', 'Whole milk (250ml)']
        : ['3 egg whites + 1 whole egg', 'Brown bread (2 slices)', 'Green tea'],
      kcal: Math.round(calories * 0.25),
    },
    {
      time: '10:30 AM',
      name: 'Pre-Workout Fuel',
      items: goal === 'loss'
        ? ['Greek yogurt (low fat)', 'Mixed nuts (20g)', 'Black coffee']
        : ['Banana + peanut butter', 'Rice cakes (2)', 'Whey protein shake'],
      kcal: Math.round(calories * 0.15),
    },
    {
      time: '1:30 PM',
      name: 'Power Lunch',
      items: goal === 'gain'
        ? ['Chicken breast (200g)', 'Brown rice (150g)', 'Mixed vegetables', 'Olive oil dressing']
        : ['Grilled chicken (150g)', 'Quinoa salad', 'Cucumber & tomato'],
      kcal: Math.round(calories * 0.30),
    },
    {
      time: '4:30 PM',
      name: 'Post-Workout Recovery',
      items: ['Whey protein (30g)', goal === 'loss' ? 'Apple' : 'Banana + dextrose (20g)', 'Water (500ml)'],
      kcal: Math.round(calories * 0.12),
    },
    {
      time: '8:00 PM',
      name: 'Dinner',
      items: goal === 'gain'
        ? ['Salmon / Fish (200g)', 'Sweet potato (150g)', 'Broccoli & spinach', 'Avocado']
        : ['Grilled fish (150g)', 'Mixed salad', 'Lemon water'],
      kcal: Math.round(calories * 0.18),
    },
  ];
  const tips = goal === 'loss'
    ? ['Drink 3–4L water daily', 'Avoid refined sugar completely', 'Last meal 3 hours before sleep', 'Add 30min cardio daily']
    : goal === 'gain'
    ? ['Eat every 3 hours consistently', 'Track protein intake daily', 'Creatine 5g post-workout', 'Sleep 8 hours minimum']
    : ['Maintain consistent meal timing', 'Focus on whole, unprocessed foods', 'Weekly body composition checks', 'Hydration is key'];
  return { calories, protein, carbs, fat, meals, tips };
}

export default function DietGenerator() {
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(75);
  const [goal, setGoal] = useState('loss');
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation();

  const handleGenerate = () => {
    setLoading(true);
    setPlan(null);
    setTimeout(() => {
      setPlan(generateDiet(age, gender, height, weight, goal));
      setLoading(false);
    }, 1800);
  };
  const goalLabels= {
    loss: 'Fat Loss',
    gain: 'Muscle Gain',
    maintain: 'Maintenance',
  };
  return (
    <section id="diet" className="relative py-24 overflow-hidden bg-[#080808]">
      <div className="absolute inset-0 bg-dots opacity-20" />
      <div
        className="absolute right-0 bottom-0 w-96 h-96 opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #ff2020, transparent)', filter: 'blur(60px)' }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`text-center mb-16 opacity-0-init ${headerVisible ? 'animate-in' : ''}`}
        >
          <span className="section-label">AI-Powered Nutrition</span>
          <h2 className="section-title text-white">
            AI DIET <span className="gradient-text">GENERATOR</span>
          </h2>
          <div className="divider-line w-32 mx-auto mt-4 mb-6" />
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Enter your stats and get a personalized diet plan calculated for your exact goals.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div
            ref={formRef}
            className={`glass clip-angled p-8 opacity-0-init ${formVisible ? 'animate-in-left' : ''}`}
          >
            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-10 h-10 rounded flex items-center justify-center animate-pulse-glow"
                style={{ background: 'rgba(255,32,32,0.2)', border: '1px solid rgba(255,32,32,0.4)' }}
              >
                <Cpu size={18} className="text-neon-red" />
              </div>
              <span className="font-display text-lg text-white tracking-wider uppercase">Your Profile</span>
            </div>
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-mono-custom text-[10px] tracking-widest text-gray-500 uppercase block mb-2">
                    Age: <span className="text-electric-orange">{age}</span>
                  </label>
                  <input
                    type="range" min="15" max="65" value={age}
                    onChange={e => setAge(Number(e.target.value))}
                    className="w-full cursor-pointer"
                  />
                </div>
                <div>
                  <label className="font-mono-custom text-[10px] tracking-widest text-gray-500 uppercase block mb-2">
                    Weight: <span className="text-electric-orange">{weight}kg</span>
                  </label>
                  <input
                    type="range" min="40" max="150" value={weight}
                    onChange={e => setWeight(Number(e.target.value))}
                    className="w-full cursor-pointer"
                  />
                </div>
              </div>
              <div>
                <label className="font-mono-custom text-[10px] tracking-widest text-gray-500 uppercase block mb-2">
                  Height: <span className="text-electric-orange">{height}cm</span>
                </label>
                <input
                  type="range" min="140" max="220" value={height}
                  onChange={e => setHeight(Number(e.target.value))}
                  className="w-full cursor-pointer"
                />
              </div>
              <div>
                <label className="font-mono-custom text-[10px] tracking-widest text-gray-500 uppercase block mb-2">Gender</label>
                <div className="flex gap-3">
                  {['male', 'female'].map(g => (
                    <button
                      key={g}
                      onClick={() => setGender(g)}
                      className="flex-1 py-2 font-display text-sm tracking-widest uppercase transition-all duration-300 clip-angled-sm"
                      style={{
                        background: gender === g ? 'linear-gradient(135deg, #ff2020, #ff6b00)' : 'rgba(255,255,255,0.05)',
                        border: `1px solid ${gender === g ? '#ff2020' : 'rgba(255,255,255,0.1)'}`,
                        color: gender === g ? 'white' : '#888',
                      }}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="font-mono-custom text-[10px] tracking-widest text-gray-500 uppercase block mb-2">Goal</label>
                <div className="flex gap-3">
                  {['loss', 'gain', 'maintain'].map(g => (
                    <button
                      key={g}
                      onClick={() => setGoal(g)}
                      className="flex-1 py-2 font-display text-xs tracking-wider uppercase transition-all duration-300 clip-angled-sm"
                      style={{
                        background: goal === g ? 'linear-gradient(135deg, #d4a017, #ff6b00)' : 'rgba(255,255,255,0.05)',
                        border: `1px solid ${goal === g ? '#d4a017' : 'rgba(255,255,255,0.1)'}`,
                        color: goal === g ? 'white' : '#888',
                      }}
                    >
                      {goalLabels[g]}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full btn-primary text-white flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader size={16} className="animate-spin" />
                    <span>Calculating...</span>
                  </>
                ) : (
                  <>
                    <Cpu size={16} />
                    <span>Generate Diet Plan</span>
                    <ChevronRight size={16} />
                  </>
                )}
              </button>
            </div>
          </div>

          <div
            className={`opacity-0-init ${formVisible ? 'animate-in-right' : ''}`}
            style={{ animationDelay: '200ms' }}
          >
            {!plan && !loading && (
              <div className="glass clip-angled h-full flex items-center justify-center p-8 text-center">
                <div>
                  <div
                    className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 animate-pulse-glow"
                    style={{ background: 'rgba(255,32,32,0.1)', border: '1px solid rgba(255,32,32,0.3)' }}
                  >
                    <Cpu size={36} className="text-neon-red opacity-50" />
                  </div>
                  <p className="font-display text-xl text-gray-500 uppercase tracking-wider">Your Plan Awaits</p>
                  <p className="text-gray-600 text-sm mt-2">Fill in your details and generate your personalized diet plan</p>
                </div>
              </div>
            )}
            {loading && (
              <div className="glass clip-angled h-full flex items-center justify-center p-8 text-center">
                <div>
                  <div
                    className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6"
                    style={{ background: 'rgba(255,32,32,0.1)', border: '1px solid rgba(255,32,32,0.3)' }}
                  >
                    <Loader size={36} className="text-neon-red animate-spin" />
                  </div>
                  <p className="font-display text-xl text-white uppercase tracking-wider mb-2">AI Processing</p>
                  <p className="text-gray-400 text-sm font-mono-custom tracking-wider">Calculating optimal macros...</p>
                </div>
              </div>
            )}
            {plan && !loading && (
              <div className="glass clip-angled p-6 space-y-4 overflow-y-auto max-h-[650px] scrollbar-thin">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display text-lg text-white uppercase tracking-wider">Your Plan</span>
                  <span
                    className="font-mono-custom text-[10px] tracking-widest px-3 py-1 rounded"
                    style={{ background: 'rgba(212,160,23,0.2)', color: '#d4a017', border: '1px solid rgba(212,160,23,0.3)' }}
                  >
                    {goalLabels[goal]}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: 'Calories', val: plan.calories, unit: 'kcal', color: '#ff2020' },
                    { label: 'Protein', val: plan.protein, unit: 'g', color: '#ff6b00' },
                    { label: 'Carbs', val: plan.carbs, unit: 'g', color: '#d4a017' },
                    { label: 'Fat', val: plan.fat, unit: 'g', color: '#888' },
                  ].map((m, i) => (
                    <div key={i} className="text-center p-2 rounded" style={{ background: `${m.color}11`, border: `1px solid ${m.color}33` }}>
                      <div className="font-display text-lg" style={{ color: m.color }}>{m.val}</div>
                      <div className="font-mono-custom text-[9px] text-gray-500">{m.unit}</div>
                      <div className="font-mono-custom text-[9px] text-gray-600 uppercase">{m.label}</div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  {plan.meals.map((meal, i) => (
                    <div key={i} className="p-3 rounded" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono-custom text-[10px] text-electric-orange">{meal.time}</span>
                          <span className="font-display text-sm text-white">{meal.name}</span>
                        </div>
                        <span className="font-mono-custom text-[10px] text-gray-500">{meal.kcal} kcal</span>
                      </div>
                      <ul className="space-y-0.5">
                        {meal.items.map((item, j) => (
                          <li key={j} className="text-gray-400 text-[11px] flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-neon-red inline-block shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="p-3 rounded" style={{ background: 'rgba(212,160,23,0.05)', border: '1px solid rgba(212,160,23,0.2)' }}>
                  <p className="font-mono-custom text-[10px] text-gold tracking-widest uppercase mb-2">Pro Tips</p>
                  {plan.tips.map((tip, i) => (
                    <p key={i} className="text-gray-400 text-xs flex items-center gap-2 mb-1">
                      <ChevronRight size={10} className="text-gold shrink-0" />
                      {tip}
                    </p>
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
