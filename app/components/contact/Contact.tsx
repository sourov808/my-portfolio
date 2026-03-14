'use client';

import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import ContactForm from './ContactForm';
import ContactSocials from './ContactSocials';

export default function Contact() {
  const { isLight } = useTheme();

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

        <ContactForm isLight={isLight} />
        <ContactSocials isLight={isLight} />
      </div>
    </section>
  );
}
