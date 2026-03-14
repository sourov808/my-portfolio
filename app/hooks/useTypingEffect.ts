import { useState, useEffect } from 'react';

export function useTypingEffect(texts: string[]) {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];

    if (!isDeleting) {
      if (charIndex < currentText.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentText.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        const delay = currentText === 'Available for Work' ? 3000 : 1500;
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, delay);
        return () => clearTimeout(timeout);
      }
    } else {
      if (charIndex > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(currentText.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsDeleting(false);
          setTextIndex((textIndex + 1) % texts.length);
        }, 50);
        return () => clearTimeout(timeout);
      }
    }
  }, [charIndex, isDeleting, textIndex, texts]);

  return displayText;
}
