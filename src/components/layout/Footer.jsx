import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, ExternalLink, Award, FileText } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Footer = () => {
  const { t, isHindi } = useLanguage();

  return (
    <footer className="mt-20 bg-chocolate-900 text-ivory-200 border-t border-chocolate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Column 1: Platform Brand & SIH */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white shadow-md">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l7.79 4.5v9L12 20l-7.79-4.5v-9L12 2z" />
                </svg>
              </div>
              <div>
                <span className="font-extrabold text-lg tracking-tight text-white">HONEY CHAIN</span>
                <p className="text-xs text-amber-400 font-medium">Team HiveNova</p>
              </div>
            </div>

            <p className="text-xs text-chocolate-200 leading-relaxed">
              {isHindi
                ? 'स्मार्ट इंडिया हैकाथॉन 2026 (SIH26021) हेतु विकसित। IoT, AI एवं ब्लॉकचेन द्वारा छत्ते से ग्राहक तक संपूर्ण शहद अनुरेखण।'
                : 'Engineered for Smart India Hackathon 2026 (SIH26021). End-to-end honey traceability & precision beekeeping powered by IoT, AI & distributed ledger.'}
            </p>

            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-chocolate-800 border border-chocolate-700 text-xs text-amber-300">
              <Award className="w-4 h-4 text-amber-400" />
              <span>SIH Team ID: 168252</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="text-xs uppercase font-bold text-amber-400 tracking-wider mb-3">
              {isHindi ? 'प्लेटफ़ॉर्म नेविगेशन' : 'Platform Navigation'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="text-chocolate-200 hover:text-white transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-chocolate-200 hover:text-white transition-colors">
                  {t('nav.dashboard')}
                </Link>
              </li>
              <li>
                <Link to="/smart-hive" className="text-chocolate-200 hover:text-white transition-colors">
                  {t('nav.smartHive')}
                </Link>
              </li>
              <li>
                <Link to="/ai-analysis" className="text-chocolate-200 hover:text-white transition-colors">
                  {t('nav.aiAnalysis')}
                </Link>
              </li>
              <li>
                <Link to="/harvest" className="text-chocolate-200 hover:text-white transition-colors">
                  {t('nav.harvest')}
                </Link>
              </li>
              <li>
                <Link to="/blockchain" className="text-chocolate-200 hover:text-white transition-colors">
                  {t('nav.blockchain')}
                </Link>
              </li>
              <li>
                <Link to="/verify" className="text-amber-300 font-semibold hover:text-amber-200 transition-colors flex items-center space-x-1">
                  <span>{t('nav.verify')}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: National Initiatives Alignment */}
          <div>
            <h4 className="text-xs uppercase font-bold text-amber-400 tracking-wider mb-3">
              {isHindi ? 'राष्ट्रीय मिशन संरेखण' : 'National Initiatives Alignment'}
            </h4>
            <ul className="space-y-2.5 text-xs text-chocolate-200">
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5"></span>
                <span>
                  <strong>NBHM:</strong> National Beekeeping & Honey Mission (Govt. of India)
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5"></span>
                <span>
                  <strong>Madhukranti Portal:</strong> Online Source & Beekeeper Registry
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5"></span>
                <span>
                  <strong>BDC EAC-PM:</strong> Beekeeping Development Committee Framework
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5"></span>
                <span>
                  <strong>FSSAI:</strong> Standard Manual of Analysis for Honey & Beehive Products
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Technology Architecture */}
          <div>
            <h4 className="text-xs uppercase font-bold text-amber-400 tracking-wider mb-3">
              {isHindi ? 'तकनीकी वास्तुकला' : 'Core Architecture'}
            </h4>
            <div className="space-y-2 text-xs text-chocolate-200">
              <div className="p-2.5 rounded bg-chocolate-800/70 border border-chocolate-700">
                <p className="font-semibold text-white">Hardware / IoT:</p>
                <p className="text-[11px] text-chocolate-300">ESP32, DHT22/11, HX711 Load Cell, ESP32-CAM</p>
              </div>
              <div className="p-2.5 rounded bg-chocolate-800/70 border border-chocolate-700">
                <p className="font-semibold text-white">AI / Deep Learning:</p>
                <p className="text-[11px] text-chocolate-300">EfficientNet-B0 CNN, OpenCV, Yield Forecasting</p>
              </div>
              <div className="p-2.5 rounded bg-chocolate-800/70 border border-chocolate-700">
                <p className="font-semibold text-white">Blockchain Ledger:</p>
                <p className="text-[11px] text-chocolate-300">Cosmos SDK, CometBFT, Hyperledger Private Network</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-chocolate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-chocolate-400 space-y-3 sm:space-y-0">
          <p>
            © 2026 Honey Chain. Smart India Hackathon 2026 Prototype by Team HiveNova.
          </p>
          <div className="flex items-center space-x-4">
            <Link to="/about" className="hover:text-amber-400 transition-colors">
              {t('nav.about')}
            </Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-amber-400 transition-colors">
              {t('nav.contact')}
            </Link>
            <span>•</span>
            <span className="text-amber-400/80">SIH Problem Statement: SIH26021</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
