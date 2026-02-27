'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

interface TerminalLine {
  type: 'output' | 'success' | 'error';
  content: string;
}

export default function Contact() {
  const { isLight } = useTheme();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'output', content: '// Contact Form - Type your message below' },
    { type: 'output', content: '// Press Enter to send' },
    { type: 'output', content: '' },
  ]);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) return;

    setStatus('sending');

    const codeLines = [
      { type: 'output' as const, content: `const name = "${formData.name}";` },
      { type: 'output' as const, content: `const email = "${formData.email}";` },
      { type: 'output' as const, content: `const subject = "${formData.subject}";` },
      { type: 'output' as const, content: `const message = \`${formData.message}\`;` },
      { type: 'output' as const, content: '' },
      { type: 'output' as const, content: '> Transmitting message...' },
    ];

    setLines(codeLines);

    await new Promise(resolve => setTimeout(resolve, 1500));

    setLines([
      ...codeLines,
      { type: 'success', content: '✓ Message transmitted successfully' },
      { type: 'success', content: '✓ Status: Delivered' },
      { type: 'output', content: '' },
      { type: 'output', content: '// Thank you for reaching out!' },
      { type: 'output', content: '// I will get back to you soon.' },
    ]);

    setStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className={`py-24 relative ${isLight ? 'bg-gray-50' : ''}`}>
      <div className={`absolute inset-0 micro-graph ${isLight ? 'opacity-10' : 'opacity-30'}`}></div>

      <div className="max-w-3xl mx-auto px-6 md:px-20 relative z-10">
        <div className="text-center mb-8">
          <h2 className={`font-display font-black text-4xl uppercase tracking-tight mb-2 flex items-center justify-center gap-3 ${isLight ? 'text-gray-900' : 'text-white'}`}>
            <span className="material-symbols-outlined text-primary">mail</span>
            Contact
          </h2>
          <p className={isLight ? 'text-gray-600' : 'text-slate-400'}>Send me a message</p>
        </div>

        <div className={`rounded-2xl overflow-hidden ${isLight ? 'bg-white border border-gray-200 shadow-sm' : 'glass-panel'}`}>
          <div className={`border-b px-4 py-2 ${isLight ? 'bg-gray-50 border-gray-200' : 'bg-[#1e1b2e]/90 border-primary/20'}`}>
            <span className={`font-mono text-xs uppercase tracking-widest ${isLight ? 'text-gray-500' : 'text-slate-400'}`}>contact.ts</span>
          </div>

          <div className="flex">
            <div className={`w-1/3 p-4 font-mono text-xs border-r ${isLight ? 'bg-gray-50 border-gray-200' : 'bg-black/30 border-white/5'}`}>
              {status === 'success' ? (
                <div className="space-y-2">
                  <div className="text-green-500">✓ Delivered</div>
                  <div className={isLight ? 'text-gray-500' : 'text-slate-500'}>Message sent!</div>
                </div>
              ) : status === 'sending' ? (
                <div className="space-y-2">
                  <div className="text-cyber-lime animate-pulse">▌ Sending...</div>
                  <div className={isLight ? 'text-gray-500' : 'text-slate-500'}>Transmitting</div>
                </div>
              ) : (
                <div className={`space-y-2 ${isLight ? 'text-gray-500' : 'text-slate-500'}`}>
                  <div>Fields:</div>
                  <div>- name</div>
                  <div>- email</div>
                  <div>- subject</div>
                  <div>- message</div>
                </div>
              )}
            </div>

            <div className="flex-1 p-4">
              <form onSubmit={handleSubmit} className="space-y-3">
                {[
                  { key: 'name', label: 'name', type: 'text', placeholder: 'Your name' },
                  { key: 'email', label: 'email', type: 'email', placeholder: 'your@email.com' },
                  { key: 'subject', label: 'subject', type: 'text', placeholder: 'Subject' },
                ].map((field) => (
                  <div key={field.key} className="flex items-center gap-2">
                    <span className="text-primary font-mono text-sm">const</span>
                    <span className="text-cyber-lime font-mono text-sm">{field.label}</span>
                    <span className={isLight ? 'text-gray-400 font-mono text-sm' : 'text-slate-500 font-mono text-sm'}>=</span>
                    <input
                      type={field.type}
                      value={formData[field.key as keyof typeof formData]}
                      onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                      disabled={status !== 'idle'}
                      placeholder={field.placeholder}
                      className={`flex-1 border-b focus:border-cyber-lime outline-none font-mono text-sm py-1 ${isLight ? 'bg-transparent border-gray-300 text-gray-900 placeholder:text-gray-400' : 'bg-transparent border-white/10 text-white placeholder:text-slate-600'}`}
                    />
                    <span className={isLight ? 'text-gray-400 font-mono text-sm' : 'text-slate-500 font-mono text-sm'}>;</span>
                  </div>
                ))}

                <div className="flex items-start gap-2 pt-2">
                  <span className="text-primary font-mono text-sm">const</span>
                  <span className="text-cyber-lime font-mono text-sm">message</span>
                  <span className={isLight ? 'text-gray-400 font-mono text-sm' : 'text-slate-500 font-mono text-sm'}>=</span>
                  <span className="text-yellow-500 font-mono text-sm">`</span>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    disabled={status !== 'idle'}
                    placeholder="Your message..."
                    rows={3}
                    className={`flex-1 border-b focus:border-cyber-lime outline-none font-mono text-sm py-1 resize-none ${isLight ? 'bg-transparent border-gray-300 text-gray-900 placeholder:text-gray-400' : 'bg-transparent border-white/10 text-white placeholder:text-slate-600'}`}
                  />
                  <span className="text-yellow-500 font-mono text-sm">`</span>
                  <span className={isLight ? 'text-gray-400 font-mono text-sm' : 'text-slate-500 font-mono text-sm'}>;</span>
                </div>

                <button
                  type="submit"
                  disabled={status !== 'idle' || !formData.name || !formData.email || !formData.subject || !formData.message}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg transition-all hover:shadow-[0_0_20px_rgba(139,92,246,0.6)] disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                >
                  {status === 'sending' ? 'Transmitting...' : status === 'success' ? 'Sent!' : 'Execute Message'}
                </button>
              </form>
            </div>
          </div>

          <div className={`border-t px-4 py-2 ${isLight ? 'border-gray-200 bg-gray-50' : 'border-white/5 bg-black/20'}`}>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-green-500">●</span>
              <span className={isLight ? 'text-gray-500' : 'text-slate-500'}>Connected to sourov.dev</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
