'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { socialLinks } from '../constants/socialLinks';

const socialLinksData = [
  {
    label: 'GitHub',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    href: socialLinks.github,
    colorLight: 'hover:text-[#24292e]',
    colorDark: 'hover:text-white',
  },
  {
    label: 'LinkedIn',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    href: socialLinks.linkedin,
    colorLight: 'hover:text-[#0a66c2]',
    colorDark: 'hover:text-[#0a66c2]',
  },
  {
    label: 'X (Twitter)',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    href: socialLinks.x,
    colorLight: 'hover:text-black',
    colorDark: 'hover:text-white',
  },
];

export default function Contact() {
  const { isLight } = useTheme();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSubmit = formData;
    
    if (!dataToSubmit.name || !dataToSubmit.email || !dataToSubmit.subject || !dataToSubmit.message) return;

    setStatus('sending');
    setErrorMsg('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSubmit),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send');
      }
      
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'An unexpected error occurred';
      console.error('Email error:', error);
      setStatus('error');
      setErrorMsg(message);
    }
  };

  const resetForm = () => {
    setStatus('idle');
    setErrorMsg('');
  };

  return (
    <section id="contact" className="py-24 md:py-28 relative bg-white">

      <div className="max-w-[1000px] mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-8 md:mb-10"
        >
          <h2 className={`font-display font-black text-3xl md:text-4xl tracking-tight mb-3 ${isLight ? 'text-gray-900' : 'text-white'}`}>
            Let&apos;s Work Together
          </h2>
          <p className={`max-w-lg mx-auto text-base md:text-lg ${isLight ? 'text-gray-600' : 'text-slate-400'}`}>Have a project in mind or need help building a scalable web application? I&apos;d love to hear about it.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`rounded-2xl overflow-hidden ${isLight ? 'bg-white border border-gray-200 shadow-md' : 'bg-[#1E293B]/60 border border-white/10 shadow-lg'}`}
        >
          <div className="p-6 md:p-10">
            <h3 className={`text-lg md:text-xl font-semibold mb-5 md:mb-6 ${isLight ? 'text-gray-800' : 'text-white'}`}>
              Start a Conversation
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <label className={`block text-sm font-medium mb-2 ${isLight ? 'text-gray-600' : 'text-slate-400'}`}>
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={status !== 'idle'}
                    placeholder="Your name"
                    className={`w-full px-4 py-3 rounded-xl border text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 ${
                      isLight
                        ? 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#4F46E5]'
                        : 'bg-[#0F172A]/40 border-white/10 text-white placeholder:text-slate-500 focus:border-[#4F46E5]'
                    }`}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <label className={`block text-sm font-medium mb-2 ${isLight ? 'text-gray-600' : 'text-slate-400'}`}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={status !== 'idle'}
                    placeholder="your@email.com"
                    className={`w-full px-4 py-3 rounded-xl border text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 ${
                      isLight
                        ? 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#4F46E5]'
                        : 'bg-[#0F172A]/40 border-white/10 text-white placeholder:text-slate-500 focus:border-[#4F46E5]'
                    }`}
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <label className={`block text-sm font-medium mb-2 ${isLight ? 'text-gray-600' : 'text-slate-400'}`}>
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  disabled={status !== 'idle'}
                  placeholder="What's this about?"
                  className={`w-full px-4 py-3 rounded-xl border text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 ${
                    isLight
                      ? 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#4F46E5]'
                      : 'bg-[#0F172A]/40 border-white/10 text-white placeholder:text-slate-500 focus:border-[#4F46E5]'
                  }`}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <label className={`block text-sm font-medium mb-2 ${isLight ? 'text-gray-600' : 'text-slate-400'}`}>
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  disabled={status !== 'idle'}
                  placeholder="Tell me about your project..."
                  rows={4}
                  className={`w-full px-4 py-3 rounded-xl border text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 resize-none ${
                    isLight
                      ? 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#4F46E5]'
                      : 'bg-[#0F172A]/40 border-white/10 text-white placeholder:text-slate-500 focus:border-[#4F46E5]'
                  }`}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <button
                  type="submit"
                  disabled={status !== 'idle' && status !== 'success' && status !== 'error' || !formData.name || !formData.email || !formData.subject || !formData.message}
                  className="w-full bg-[#4F46E5] hover:bg-[#6366F1] text-white font-semibold py-4 md:py-3.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#4F46E5]/30 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 text-base"
                >
                  {status === 'sending' ? 'Sending...' : status === 'success' ? 'Sent!' : status === 'error' ? 'Failed - Try Again' : 'Send Message'}
                </button>
              </motion.div>

              {(status === 'success' || status === 'error') && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 p-4 rounded-xl text-center"
                >
                  <p className={`text-sm mb-3 ${status === 'success' ? (isLight ? 'text-green-600' : 'text-green-400') : (isLight ? 'text-red-500' : 'text-red-400')}`}>
                    {status === 'success'
                      ? 'Message sent successfully'
                      : (errorMsg || 'Failed to send message. Please try again.')}
                  </p>

                  {status === 'error' && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="text-sm text-[#4F46E5] hover:text-[#6366F1] underline underline-offset-2 transition-colors"
                    >
                      Try Again
                    </button>
                  )}
                </motion.div>
              )}
            </form>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-12 md:mt-16 max-w-2xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-6 md:mb-8">
            <div className={`h-px w-12 sm:w-24 ${isLight ? 'bg-gray-300' : 'bg-white/10'}`}></div>
            <p className={`text-sm font-medium ${isLight ? 'text-gray-500' : 'text-slate-400'}`}>
              Or connect with me directly
            </p>
            <div className={`h-px w-12 sm:w-24 ${isLight ? 'bg-gray-300' : 'bg-white/10'}`}></div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
            {socialLinksData.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.4, delay: 0.55 + index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`group flex items-center gap-2 sm:gap-3 transition-colors duration-300 hover:-translate-y-0.5 ${isLight ? `text-gray-600 ${link.colorLight}` : `text-slate-400 ${link.colorDark}`}`}
              >
                <span className="opacity-80 group-hover:opacity-100 transition-opacity">
                  {link.icon}
                </span>
                <span className="font-medium text-sm sm:text-base relative pb-1">
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#4F46E5] transition-all duration-300 group-hover:w-full"></span>
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
