import React, { useEffect, useState } from 'react';

declare global {
  interface Window {
    katex: any;
  }
}

interface MathDisplayProps {
  formula: string;
}

export const MathDisplay: React.FC<MathDisplayProps> = ({ formula }) => {
  const [html, setHtml] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Ensure KaTeX is available before attempting render
    const checkKaTeX = () => {
        if (typeof window.katex !== 'undefined') {
            setIsLoaded(true);
            return true;
        }
        return false;
    };

    if (!checkKaTeX()) {
        const interval = setInterval(() => {
            if (checkKaTeX()) clearInterval(interval);
        }, 100);
        // Timeout after 3 seconds to stop polling
        const timeout = setTimeout(() => clearInterval(interval), 3000);
        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }
  }, []);

  useEffect(() => {
    if (!isLoaded || typeof window.katex === 'undefined') return;

    try {
      // renderToString is used instead of render() to avoid direct DOM manipulation checks
      // that fail in environments incorrectly flagged as "Quirks Mode" (BackCompat).
      const rendered = window.katex.renderToString(formula, {
        throwOnError: false,
        displayMode: true,
        output: 'html',
        errorColor: '#ef4444',
        strict: false,
      });
      setHtml(rendered);
    } catch (e) {
      console.warn("KaTeX render error:", e);
      setHtml(''); // Fallback to raw text
    }
  }, [formula, isLoaded]);

  if (!html) {
    return (
      <div className="text-gray-300 font-mono text-sm overflow-x-auto py-2 px-2 opacity-80" aria-label="Formula">
        {formula}
      </div>
    );
  }

  return (
    <div 
      className="text-gray-300 font-mono text-sm overflow-x-auto py-2 px-2"
      aria-label="Mathematical formula"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};