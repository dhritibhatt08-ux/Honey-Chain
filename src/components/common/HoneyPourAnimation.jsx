import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const HoneyPourAnimation = ({ onComplete }) => {
  const { t, isHindi } = useLanguage();
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Start fading out after 1.8s, trigger complete at 2.2s
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 1800);

    const completeTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-chocolate-950/70 backdrop-blur-md transition-opacity duration-500 ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Top Honey Dispenser Rim */}
      <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-r from-amber-800 via-amber-500 to-amber-700 shadow-md"></div>

      {/* Main Cascading Honey Streams */}
      <div className="relative w-full h-full overflow-hidden flex justify-center pointer-events-none">
        {/* Stream 1 - Central thick stream */}
        <div className="absolute top-0 w-8 md:w-14 bg-gradient-to-b from-amber-600 via-amber-500 to-honey-400 rounded-b-full shadow-[0_0_30px_rgba(245,158,11,0.6)] honey-stream">
          <div className="w-1/3 h-full mx-auto bg-amber-200/40 rounded-full blur-[1px]"></div>
        </div>

        {/* Stream 2 - Left secondary drip */}
        <div className="absolute top-0 -translate-x-12 md:-translate-x-20 w-4 md:w-6 bg-gradient-to-b from-amber-700 via-amber-500 to-amber-300 rounded-b-full opacity-90 shadow-lg honey-stream" style={{ animationDelay: '0.15s', animationDuration: '1.9s' }}>
          <div className="w-1/2 h-full mx-auto bg-amber-100/50 rounded-full"></div>
        </div>

        {/* Stream 3 - Right secondary drip */}
        <div className="absolute top-0 translate-x-12 md:translate-x-20 w-4 md:w-6 bg-gradient-to-b from-amber-700 via-amber-500 to-amber-300 rounded-b-full opacity-90 shadow-lg honey-stream" style={{ animationDelay: '0.1s', animationDuration: '1.95s' }}>
          <div className="w-1/2 h-full mx-auto bg-amber-100/50 rounded-full"></div>
        </div>

        {/* Viscous Honey Droplet Beads Falling */}
        <div className="absolute top-1/3 w-6 h-9 bg-gradient-to-b from-amber-300 to-amber-600 rounded-full shadow-lg honey-stream" style={{ animationDelay: '0.3s' }}></div>
        <div className="absolute top-1/2 -translate-x-8 w-4 h-6 bg-gradient-to-b from-amber-200 to-amber-500 rounded-full shadow-md honey-stream" style={{ animationDelay: '0.4s' }}></div>

        {/* Bottom Viscous Settling Honey Puddle with Concentric Ripples */}
        <div className="absolute bottom-16 md:bottom-24 flex items-center justify-center">
          <div className="w-48 h-12 md:w-72 md:h-16 bg-gradient-to-r from-amber-700 via-amber-400 to-amber-600 rounded-full blur-[2px] opacity-90 honey-puddle shadow-[0_0_40px_rgba(245,158,11,0.8)]"></div>
          <div className="absolute w-32 h-8 md:w-48 md:h-10 bg-amber-300/80 rounded-full blur-[1px] honey-puddle" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>

      {/* Center Status Card */}
      <div className="relative z-10 mx-4 max-w-md p-6 rounded-2xl bg-white/95 dark:bg-chocolate-900/95 border border-amber-300/40 dark:border-amber-500/30 shadow-2xl text-center backdrop-blur-md">
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-amber-500/10 dark:bg-amber-400/10 flex items-center justify-center border border-amber-500/30">
          <svg className="w-6 h-6 text-amber-600 dark:text-amber-400 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>

        <h3 className="text-lg font-bold text-chocolate-900 dark:text-ivory-100">
          {isHindi ? 'ब्लॉकचेन प्रमाण सत्यापित हो रहा है...' : 'Verifying Cryptographic Provenance...'}
        </h3>
        <p className="mt-1 text-xs text-chocolate-600 dark:text-chocolate-300">
          {isHindi
            ? 'सेंसर टेलीमेट्री एवं FSSAI लैब रिकॉर्ड से डिजिटल पासपोर्ट तैयार किया जा रहा है'
            : 'Extracting IoT telemetry, FSSAI lab certificates and on-chain batch metadata'}
        </p>

        <button
          onClick={onComplete}
          className="mt-4 px-3 py-1 text-xs font-medium text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 underline transition-colors"
        >
          {isHindi ? 'तुरंत देखें (Skip)' : 'Skip Animation'}
        </button>
      </div>
    </div>
  );
};
