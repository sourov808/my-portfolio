'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ContactFormProps {
  isLight: boolean;
}

export default function ContactForm({ isLight }: ContactFormProps) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) return;

    setStatus('sending');
    setErrorMsg('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
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
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`rounded-2xl overflow-hidden ${isLight ? 'bg-white border border-gray-200 shadow-md' : 'bg-bg-secondary/60 border border-white/10 shadow-lg'}`}
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
                className={`w-full px-4 py-3 rounded-xl border text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                  isLight
                    ? 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-primary'
                    : 'bg-bg-primary/40 border-white/10 text-white placeholder:text-slate-500 focus:border-primary'
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
                className={`w-full px-4 py-3 rounded-xl border text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                  isLight
                    ? 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-primary'
                    : 'bg-bg-primary/40 border-white/10 text-white placeholder:text-slate-500 focus:border-primary'
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
              className={`w-full px-4 py-3 rounded-xl border text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                isLight
                  ? 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-primary'
                  : 'bg-bg-primary/40 border-white/10 text-white placeholder:text-slate-500 focus:border-primary'
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
              className={`w-full px-4 py-3 rounded-xl border text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none ${
                isLight
                  ? 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-primary'
                  : 'bg-bg-primary/40 border-white/10 text-white placeholder:text-slate-500 focus:border-primary'
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
              className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-4 md:py-3.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 text-base"
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
                {status === 'success' ? 'Message sent successfully' : (errorMsg || 'Failed to send message. Please try again.')}
              </p>
              {status === 'error' && (
                <button type="button" onClick={resetForm} className="text-sm text-primary hover:text-primary-hover underline underline-offset-2 transition-colors">
                  Try Again
                </button>
              )}
            </motion.div>
          )}
        </form>
      </div>
    </motion.div>
  );
}
