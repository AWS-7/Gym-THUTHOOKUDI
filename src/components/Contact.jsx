import { useState } from 'react';
import { MapPin, Phone, MessageCircle, Mail, Send, CheckCircle, Instagram, ExternalLink } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', goal: '', message: '' });
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Construct WhatsApp message
    const whatsappNumber = '916380427781';
    const text = `*New Inquiry from Iron Empire Website*%0A%0A` +
      `*Name:* ${form.name}%0A` +
      `*Phone:* ${form.phone}%0A` +
      `*Email:* ${form.email}%0A` +
      `*Goal:* ${form.goal}%0A` +
      `*Message:* ${form.message}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
    setSent(true);
  };

  const inputClass = `w-full px-4 py-3 font-body text-sm text-white placeholder-gray-600 outline-none transition-all duration-300 focus:border-neon-red/60 rounded-sm bg-white/5 border border-white/10 focus:bg-white/8`;

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, #080808 0%, #0d0d0d 100%)' }}
      />
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 opacity-5"
        style={{ background: 'radial-gradient(circle, #ff2020, transparent)', filter: 'blur(60px)' }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`text-center mb-16 opacity-0-init ${headerVisible ? 'animate-in' : ''}`}
        >
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title text-white">
            CONTACT <span className="gradient-text">US</span>
          </h2>
          <div className="divider-line w-32 mx-auto mt-4 mb-6" />
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Ready to start your journey? Visit us or drop a message. We respond fast.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div
            ref={formRef}
            className={`opacity-0-init ${formVisible ? 'animate-in-left' : ''}`}
          >
            <div className="space-y-4 mb-8">
              {[
                {
                  icon: MapPin,
                  title: 'Find Us',
                  lines: ['IRON EMPIRE CrossFit & Fitness Studio', 'Thoothukudi (Tuticorin)', 'Tamil Nadu — 628 001, India'],
                  color: '#ff2020',
                  link: null,
                },
                {
                  icon: Phone,
                  title: 'Call Us',
                  lines: ['+91 63804 27781'],
                  color: '#ff6b00',
                  link: 'tel:+916380427781',
                },
                {
                  icon: MessageCircle,
                  title: 'WhatsApp',
                  lines: ['Chat with us instantly', '+91 63804 27781'],
                  color: '#22c55e',
                  link: 'https://wa.me/916380427781',
                },
                {
                  icon: Instagram,
                  title: 'Instagram',
                  lines: ['@iron_empire_official'],
                  color: '#e1306c',
                  link: 'https://www.instagram.com/iron_empire_official',
                },
                {
                  icon: Mail,
                  title: 'Email',
                  lines: ['info@ironempire.com', 'coaching@ironempire.com'],
                  color: '#d4a017',
                  link: 'mailto:info@ironempire.com',
                },
              ].map((info, i) => {
                const Icon = info.icon;
                return (
                  <div
                    key={i}
                    className="glass clip-angled-sm p-4 flex items-start gap-4 group hover:-translate-y-1 transition-all duration-300"
                    style={{
                      opacity: formVisible ? 1 : 0,
                      transform: formVisible ? 'none' : 'translateX(-20px)',
                      transition: `all 0.6s ease ${i * 100 + 200}ms`,
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300"
                      style={{ background: `${info.color}22`, border: `1px solid ${info.color}44` }}
                    >
                      <Icon size={16} style={{ color: info.color }} />
                    </div>
                    <div>
                      <p className="font-display text-sm text-white uppercase tracking-wider mb-1">{info.title}</p>
                      {info.lines.map((line, j) => (
                        info.link && j === 0 ? (
                          <a
                            key={j}
                            href={info.link}
                            target="_blank"
                            rel="noreferrer"
                            className="block text-sm hover:underline transition-colors duration-300"
                            style={{ color: info.color }}
                          >
                            {line}
                          </a>
                        ) : (
                          <p key={j} className="text-gray-400 text-sm">{line}</p>
                        )
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            {/* 3D Map Model */}
            <div className="glass clip-angled p-1 relative overflow-hidden group">
              {/* 3D Map Container */}
              <div className="relative h-56 rounded overflow-hidden" style={{ perspective: '1000px' }}>
                {/* Animated Map Background */}
                <div 
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                  }}
                >
                  {/* Grid Lines */}
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(255,107,0,0.3) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,107,0,0.3) 1px, transparent 1px)
                      `,
                      backgroundSize: '40px 40px',
                      transform: 'rotateX(60deg) translateY(-20px)',
                      transformOrigin: 'center top',
                    }}
                  />
                  
                  {/* 3D Building Models */}
                  <div className="absolute inset-0 flex items-end justify-center pb-8">
                    {/* Building 1 */}
                    <div 
                      className="mx-1 transition-all duration-500 hover:scale-110"
                      style={{
                        width: '30px',
                        height: '60px',
                        background: 'linear-gradient(180deg, #ff6b00 0%, #d4a017 100%)',
                        transform: 'rotateX(-20deg) translateZ(20px)',
                        boxShadow: '0 10px 30px rgba(255,107,0,0.4)',
                      }}
                    />
                    {/* Building 2 - Main Gym */}
                    <div 
                      className="mx-1 relative"
                      style={{
                        width: '50px',
                        height: '90px',
                        background: 'linear-gradient(180deg, #ff2020 0%, #ff6b00 100%)',
                        transform: 'rotateX(-20deg) translateZ(40px)',
                        boxShadow: '0 15px 40px rgba(255,32,32,0.5)',
                      }}
                    >
                      {/* Roof Glow */}
                      <div 
                        className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-3 rounded-full animate-pulse"
                        style={{ background: 'rgba(255,107,0,0.8)', filter: 'blur(8px)' }}
                      />
                    </div>
                    {/* Building 3 */}
                    <div 
                      className="mx-1"
                      style={{
                        width: '25px',
                        height: '50px',
                        background: 'linear-gradient(180deg, #d4a017 0%, #ff6b00 100%)',
                        transform: 'rotateX(-20deg) translateZ(15px)',
                        boxShadow: '0 8px 25px rgba(212,160,23,0.4)',
                      }}
                    />
                  </div>
                  
                  {/* Road Lines */}
                  <div 
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-20"
                    style={{
                      background: 'linear-gradient(0deg, rgba(255,255,255,0.05) 0%, transparent 100%)',
                      transform: 'rotateX(60deg)',
                      transformOrigin: 'bottom center',
                    }}
                  />
                </div>
                
                {/* Map Pin Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="relative">
                    {/* Pulsing Rings */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full border border-[#ff6b00]/30 animate-ping" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full border border-[#ff6b00]/50 animate-ping" style={{ animationDelay: '0.5s' }} />
                    </div>
                    {/* Main Pin */}
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center animate-bounce"
                      style={{ 
                        background: 'linear-gradient(135deg, #ff6b00, #d4a017)',
                        boxShadow: '0 0 30px rgba(255,107,0,0.6)',
                      }}
                    >
                      <MapPin size={24} className="text-white" />
                    </div>
                  </div>
                </div>
                
                {/* Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-display text-sm text-white uppercase tracking-wider">IRON EMPIRE</p>
                      <p className="font-mono-custom text-[10px] text-gray-400 mt-0.5">Thoothukudi, Tamil Nadu</p>
                    </div>
                    <a
                      href="https://maps.google.com/?q=Thoothukudi,Tamil+Nadu"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 font-mono-custom text-[10px] tracking-wider text-[#ff6b00] hover:text-white transition-colors uppercase border border-[#ff6b00]/50 px-2 py-1 rounded hover:bg-[#ff6b00]/20"
                    >
                      <span>Maps</span>
                      <ExternalLink size={10} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`opacity-0-init ${formVisible ? 'animate-in-right' : ''}`}
            style={{ animationDelay: '200ms' }}
          >
            <div className="glass clip-angled p-8">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-6 animate-pulse-glow"
                    style={{ background: 'rgba(34,197,94,0.2)', border: '1px solid rgba(34,197,94,0.4)' }}
                  >
                    <CheckCircle size={36} className="text-green-400" />
                  </div>
                  <h3 className="font-display text-2xl text-white uppercase tracking-wider mb-3">Message Sent!</h3>
                  <p className="text-gray-400 mb-6">We'll get back to you within 24 hours. Your empire journey begins now.</p>
                  <button onClick={() => setSent(false)} className="btn-outline text-xs">Send Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="font-display text-xl text-white uppercase tracking-wider mb-6">Send a Message</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono-custom text-[10px] tracking-widest text-gray-500 uppercase block mb-2">Name *</label>
                      <input
                        required
                        type="text"
                        placeholder="Your name"
                        className={inputClass}
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="font-mono-custom text-[10px] tracking-widest text-gray-500 uppercase block mb-2">Phone</label>
                      <input
                        type="tel"
                        placeholder="+91 00000 00000"
                        className={inputClass}
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-mono-custom text-[10px] tracking-widest text-gray-500 uppercase block mb-2">Email *</label>
                    <input
                      required
                      type="email"
                      placeholder="you@email.com"
                      className={inputClass}
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="font-mono-custom text-[10px] tracking-widest text-gray-500 uppercase block mb-2">Fitness Goal</label>
                    <select
                      className={inputClass}
                      value={form.goal}
                      onChange={e => setForm({ ...form, goal: e.target.value })}
                    >
                      <option value="">Select your goal</option>
                      <option value="loss">Weight Loss</option>
                      <option value="gain">Muscle Gain</option>
                      <option value="crossfit">CrossFit Training</option>
                      <option value="personal">Personal Training</option>
                      <option value="general">General Fitness</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-mono-custom text-[10px] tracking-widest text-gray-500 uppercase block mb-2">Message</label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your fitness goals..."
                      className={`${inputClass} resize-none`}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-3">
                    <button type="submit" className="flex-1 btn-primary text-white flex items-center justify-center gap-2">
                      <Send size={14} />
                      <span>Send Message</span>
                    </button>
                    <a
                      href="https://wa.me/916380427781"
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-3 font-display text-xs tracking-widest uppercase clip-angled-sm transition-all duration-300 flex items-center gap-2"
                      style={{
                        background: 'rgba(34,197,94,0.15)',
                        border: '1px solid rgba(34,197,94,0.4)',
                        color: '#22c55e',
                      }}
                    >
                      <MessageCircle size={14} />
                      <span className="hidden sm:inline">WhatsApp</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
