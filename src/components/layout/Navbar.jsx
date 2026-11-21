import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Globe, QrCode, Menu, X, ShieldCheck, Activity, Cpu } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

export const Navbar = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  const { lang, toggleLang, isHindi, t } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/dashboard', label: t('nav.dashboard') },
    { to: '/smart-hive', label: t('nav.smartHive') },
    { to: '/ai-analysis', label: t('nav.aiAnalysis') },
    { to: '/harvest', label: t('nav.harvest') },
    { to: '/blockchain', label: t('nav.blockchain') },
    { to: '/about', label: t('nav.about') },
    { to: '/contact', label: t('nav.contact') },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-ivory-100/90 dark:bg-charcoal-900/90 border-b border-chocolate-200/60 dark:border-chocolate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo & Hackathon Identity */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-md shadow-amber-600/20 group-hover:scale-105 transition-transform">
              {/* Honeycomb Hexagon SVG */}
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l7.79 4.5v9L12 20l-7.79-4.5v-9L12 2z" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 6.5l4.33 2.5v5L12 16.5l-4.33-2.5v-5L12 6.5z" />
              </svg>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white dark:border-charcoal-900" title="IoT Network Online"></div>
            </div>

            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-lg md:text-xl tracking-tight text-chocolate-900 dark:text-ivory-50">
                  {isHindi ? 'हनी चेन' : 'HONEY CHAIN'}
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30">
                  SIH 2026
                </span>
              </div>
              <p className="text-[11px] font-medium text-chocolate-600 dark:text-chocolate-400">
                {isHindi ? 'टीम हाइव-नोवा • SIH26021' : 'Team HiveNova • SIH26021'}
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
                  isActive(link.to)
                    ? 'bg-amber-500/15 text-amber-800 dark:text-amber-300 font-semibold'
                    : 'text-chocolate-700 dark:text-ivory-200 hover:text-amber-700 dark:hover:text-amber-400 hover:bg-ivory-200/50 dark:hover:bg-charcoal-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action Buttons: Language, Theme & Verify CTA */}
          <div className="hidden sm:flex items-center space-x-2 md:space-x-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLang}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg border border-chocolate-300/70 dark:border-chocolate-700 bg-white/80 dark:bg-charcoal-800 text-xs font-semibold text-chocolate-800 dark:text-ivory-100 hover:border-amber-500 transition-colors shadow-sm"
              title="Switch Language / भाषा बदलें"
            >
              <Globe className="w-3.5 h-3.5 text-amber-600" />
              <span>{isHindi ? 'EN' : 'हिंदी'}</span>
            </button>

            {/* Theme Switcher */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-chocolate-300/70 dark:border-chocolate-700 bg-white/80 dark:bg-charcoal-800 text-chocolate-800 dark:text-ivory-100 hover:text-amber-600 dark:hover:text-amber-400 transition-colors shadow-sm"
              title={isDark ? 'Light Mode' : 'Dark Mode'}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-chocolate-700" />
              )}
            </button>

            {/* Primary CTA - Verify Honey via QR */}
            <Link
              to="/verify"
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-xs md:text-sm font-semibold shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              <QrCode className="w-4 h-4" />
              <span>{t('nav.verifyCTA')}</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={toggleLang}
              className="px-2 py-1 text-xs font-bold rounded border border-chocolate-300 dark:border-chocolate-700 text-chocolate-800 dark:text-ivory-100"
            >
              {isHindi ? 'EN' : 'हिं'}
            </button>

            <button
              onClick={toggleTheme}
              className="p-1.5 rounded border border-chocolate-300 dark:border-chocolate-700 text-chocolate-800 dark:text-ivory-100"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-chocolate-800 dark:text-ivory-100 hover:bg-ivory-200 dark:hover:bg-charcoal-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-6 bg-ivory-100 dark:bg-charcoal-900 border-b border-chocolate-200 dark:border-chocolate-800 space-y-2 animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-sm font-medium ${
                isActive(link.to)
                  ? 'bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold'
                  : 'text-chocolate-800 dark:text-ivory-200 hover:bg-ivory-200 dark:hover:bg-charcoal-800'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              to="/verify"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-lg bg-amber-600 text-white font-semibold text-sm shadow"
            >
              <QrCode className="w-4 h-4" />
              <span>{t('nav.verifyCTA')}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
