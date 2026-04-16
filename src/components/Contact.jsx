import { useState } from 'react';
import { MapPin, Phone, MessageCircle, Mail, Send, CheckCircle, Instagram } from 'lucide-react';
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
            <div className="glass clip-angled p-4 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center opacity-30">
                  <MapPin size={48} className="mx-auto text-neon-red mb-2" />
                  <p className="font-display text-lg uppercase tracking-wider text-white">Thoothukudi, Tamil Nadu</p>
                </div>
              </div>
              <div
                className="h-48 rounded relative"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,32,32,0.05) 0%, rgba(212,160,23,0.05) 100%)',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <div className="absolute inset-0 bg-grid opacity-50" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                  <div className="w-6 h-6 rounded-full bg-neon-red animate-pulse-glow mb-3" />
                  <p className="font-display text-sm text-white uppercase tracking-wider">IRON EMPIRE</p>
                  <p className="font-mono-custom text-[10px] text-gray-500 mt-1">Thoothukudi, Tamil Nadu</p>
                  <a
                    href="https://maps.google.com/?q=Thoothukudi,Tamil+Nadu"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 font-mono-custom text-[10px] tracking-widest text-electric-orange hover:text-neon-red transition-colors uppercase border border-electric-orange/40 px-3 py-1 rounded hover:border-neon-red/60"
                  >
                    Open Maps →
                  </a>
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
