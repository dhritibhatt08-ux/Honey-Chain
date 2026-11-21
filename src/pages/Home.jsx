import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Cpu,
  Radio,
  BrainCircuit,
  Droplet,
  QrCode,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Award,
  Layers,
  ChevronRight,
  Activity,
  Check
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { workflowStepsData } from '../data/workflowSteps';

export const Home = () => {
  const { t, isHindi } = useLanguage();
  const [activeStep, setActiveStep] = useState(1);

  const currentStepData = workflowStepsData.find(s => s.step === activeStep) || workflowStepsData[0];

  const getStepIcon = (iconName) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'Radio': return <Radio className="w-5 h-5" />;
      case 'BrainCircuit': return <BrainCircuit className="w-5 h-5" />;
      case 'Droplet': return <Droplet className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      case 'QrCode': return <QrCode className="w-5 h-5" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 honeycomb-pattern border-b border-chocolate-200/50 dark:border-chocolate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* SIH Hackathon Pill */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-xs font-semibold">
              <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>{t('home.sihCategory')}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-chocolate-900 dark:text-ivory-50 tracking-tight leading-tight">
              {t('home.heroTitle')}
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-chocolate-700 dark:text-chocolate-300 leading-relaxed font-normal">
              {t('home.heroDesc')}
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                to="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-chocolate-900 dark:bg-amber-600 text-white font-semibold text-sm hover:bg-chocolate-800 dark:hover:bg-amber-500 transition-all shadow-md shadow-chocolate-950/10 active:scale-98"
              >
                <span>{t('home.exploreBtn')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/verify"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-amber-500/15 dark:bg-charcoal-800 border-2 border-amber-600/40 text-chocolate-900 dark:text-ivory-100 font-semibold text-sm hover:bg-amber-500/25 dark:hover:bg-charcoal-700 transition-all active:scale-98"
              >
                <QrCode className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                <span>{t('home.verifyBtn')}</span>
              </Link>
            </div>

            {/* Team Identity */}
            <p className="pt-3 text-xs text-chocolate-500 dark:text-chocolate-400">
              Developed by <strong className="text-chocolate-800 dark:text-ivory-200">Team HiveNova</strong> (Team ID: 168252) • SIH 2026
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-charcoal-800 border border-chocolate-200/80 dark:border-chocolate-800 shadow-soft">
              <div className="text-xs font-semibold text-chocolate-600 dark:text-chocolate-400">
                {t('home.stats.activeHives')}
              </div>
              <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-chocolate-900 dark:text-ivory-100 flex items-baseline space-x-2">
                <span>34 Hives</span>
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">● 100% Online</span>
              </div>
              <p className="mt-1 text-[11px] text-chocolate-500">Across 3 Himalayan Apiary Clusters</p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-charcoal-800 border border-chocolate-200/80 dark:border-chocolate-800 shadow-soft">
              <div className="text-xs font-semibold text-chocolate-600 dark:text-chocolate-400">
                {t('home.stats.tracedHoney')}
              </div>
              <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400">
                1,840 kg
              </div>
              <p className="mt-1 text-[11px] text-chocolate-500">Pure Monofloral & Multifloral Honey</p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-charcoal-800 border border-chocolate-200/80 dark:border-chocolate-800 shadow-soft">
              <div className="text-xs font-semibold text-chocolate-600 dark:text-chocolate-400">
                {t('home.stats.verifiedBatches')}
              </div>
              <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-chocolate-900 dark:text-ivory-100">
                42 Batches
              </div>
              <p className="mt-1 text-[11px] text-chocolate-500">Minted on CometBFT Ledger</p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-charcoal-800 border border-chocolate-200/80 dark:border-chocolate-800 shadow-soft">
              <div className="text-xs font-semibold text-chocolate-600 dark:text-chocolate-400">
                {t('home.stats.integrityRate')}
              </div>
              <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                100%
              </div>
              <p className="mt-1 text-[11px] text-chocolate-500">Cryptographically Auditable Provenance</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Seven-Step Interactive Workflow */}
      <section className="py-16 md:py-24 bg-white dark:bg-charcoal-900/60 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-chocolate-900 dark:text-ivory-50 tracking-tight">
              {t('home.workflowTitle')}
            </h2>
            <p className="mt-2 text-sm text-chocolate-600 dark:text-chocolate-300">
              {t('home.workflowSubtitle')}
            </p>
          </div>

          {/* Stepper Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-8">
            {workflowStepsData.map((s) => {
              const selected = s.step === activeStep;
              return (
                <button
                  key={s.step}
                  onClick={() => setActiveStep(s.step)}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    selected
                      ? 'bg-amber-600 text-white border-amber-600 shadow-md'
                      : 'bg-ivory-50 dark:bg-charcoal-800 border-chocolate-200/70 dark:border-chocolate-800 text-chocolate-800 dark:text-ivory-200 hover:border-amber-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${selected ? 'bg-amber-700/60 text-white' : 'bg-amber-500/10 text-amber-700 dark:text-amber-300'}`}>
                      0{s.step}
                    </span>
                    <span className={selected ? 'text-amber-100' : 'text-amber-600'}>
                      {getStepIcon(s.icon)}
                    </span>
                  </div>
                  <div className="mt-3">
                    <h4 className="text-xs font-bold leading-snug">
                      {isHindi ? s.titleHi : s.titleEn}
                    </h4>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Detailed Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-ivory-50 dark:bg-charcoal-800 border border-chocolate-200 dark:border-chocolate-700 shadow-card">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 text-xs font-semibold">
                  <span>Step 0{currentStepData.step} of 07</span>
                  <span>•</span>
                  <span>{isHindi ? currentStepData.subtitleHi : currentStepData.subtitleEn}</span>
                </div>

                <h3 className="text-2xl font-extrabold text-chocolate-900 dark:text-ivory-50">
                  {isHindi ? currentStepData.titleHi : currentStepData.titleEn}
                </h3>

                <p className="text-sm text-chocolate-700 dark:text-chocolate-200 leading-relaxed">
                  {isHindi ? currentStepData.descHi : currentStepData.descEn}
                </p>

                <p className="text-xs text-chocolate-600 dark:text-chocolate-300 bg-white/70 dark:bg-charcoal-900/70 p-3.5 rounded-xl border border-chocolate-200/50 dark:border-chocolate-700">
                  <strong>Engineering Implementation:</strong> {isHindi ? currentStepData.detailsHi : currentStepData.detailsEn}
                </p>

                {/* Sensors / Technologies Tags */}
                <div>
                  <span className="text-[11px] font-bold text-chocolate-500 dark:text-chocolate-400 uppercase tracking-wider block mb-2">
                    Key Components & Protocols:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {currentStepData.sensors.map((sensor, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-xs rounded-lg bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20 font-medium"
                      >
                        {sensor}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step Visual Summary Graphic */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-white dark:bg-charcoal-900 rounded-2xl border border-chocolate-200/70 dark:border-chocolate-700 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white shadow-lg mb-4">
                  {getStepIcon(currentStepData.icon)}
                </div>

                <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                  {isHindi ? 'हनी चेन वर्कफ़्लो' : 'Honey Chain Architecture Node'}
                </span>
                <h4 className="mt-1 text-base font-bold text-chocolate-900 dark:text-ivory-100">
                  {isHindi ? currentStepData.titleHi : currentStepData.titleEn}
                </h4>

                <div className="mt-4 pt-4 border-t border-chocolate-100 dark:border-chocolate-800 w-full flex justify-between items-center text-xs">
                  <span className="text-chocolate-500">Validation Protocol:</span>
                  <span className="font-mono font-semibold text-emerald-600">Active / Passing</span>
                </div>

                <div className="mt-4 w-full flex justify-between gap-2">
                  <button
                    disabled={activeStep <= 1}
                    onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
                    className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-chocolate-300 dark:border-chocolate-700 font-semibold disabled:opacity-40"
                  >
                    Previous
                  </button>
                  <button
                    disabled={activeStep >= 7}
                    onClick={() => setActiveStep(prev => Math.min(7, prev + 1))}
                    className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-amber-600 text-white font-semibold hover:bg-amber-700 disabled:opacity-40"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Problem vs Solution & Impact (Direct from SIH Presentation) */}
      <section className="py-16 md:py-24 honeycomb-pattern border-t border-chocolate-200/50 dark:border-chocolate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-chocolate-900 dark:text-ivory-50 tracking-tight">
              {t('home.pillarsTitle')}
            </h2>
            <p className="mt-2 text-sm text-chocolate-600 dark:text-chocolate-300">
              {t('home.pillarsSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* The Problem Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-charcoal-800 border-t-4 border-t-rose-500 border-x border-b border-chocolate-200/80 dark:border-chocolate-800 shadow-soft space-y-4">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-chocolate-900 dark:text-ivory-100">
                {t('home.problemTitle')}
              </h3>
              <ul className="space-y-3 text-xs text-chocolate-700 dark:text-chocolate-300">
                <li className="flex items-start space-x-2">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>{isHindi ? 'शहद में चीनी और सीरप की भारी मिलावट जिससे ग्राहकों का भरोसा टूटता है।' : 'Widespread honey adulteration with cheap C4/C3 inverted sugar syrups destroying consumer trust.'}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>{isHindi ? 'सप्लाई चेन में पारदर्शिता की कमी, जिससे यह पता नहीं चलता कि शहद कहां से आया।' : 'Opaque and fragmented supply chain with zero verifiable origin for retail consumers.'}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>{isHindi ? 'मधुमक्खी पालकों को समय पर रोगों की जानकारी न मिलने से 40% तक कालोनियों का नुकसान।' : 'Severe economic loss and high colony mortality (~40%) for rural beekeepers lacking early disease alerts.'}</span>
                </li>
              </ul>
            </div>

            {/* The Solution Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-charcoal-800 border-t-4 border-t-amber-500 border-x border-b border-chocolate-200/80 dark:border-chocolate-800 shadow-soft space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-chocolate-900 dark:text-ivory-100">
                {t('home.solutionTitle')}
              </h3>
              <ul className="space-y-3 text-xs text-chocolate-700 dark:text-chocolate-300">
                <li className="flex items-start space-x-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{isHindi ? 'सस्ते IoT सेंसर द्वारा छत्ते के तापमान, नमी और वजन की 24 घंटे लगातार निगरानी।' : 'Affordable IoT sensors for continuous 24/7 hive temperature, humidity and colony weight monitoring.'}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{isHindi ? 'AI विजन (EfficientNet-B0) द्वारा रोगों की प्रारंभिक पहचान और शहद उत्पादन का सटीक अनुमान।' : 'EfficientNet-B0 computer vision AI detecting early disease patterns and forecasting harvest yield.'}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{isHindi ? 'ब्लॉकचेन तकनीक (Cosmos/Hyperledger) जिससे दर्ज रिकॉर्ड को कभी भी बदला नहीं जा सकता।' : 'Immutable private blockchain ledger guaranteeing 100% tamper-evident supply-chain provenance.'}</span>
                </li>
              </ul>
            </div>

            {/* The Impact Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-charcoal-800 border-t-4 border-t-emerald-500 border-x border-b border-chocolate-200/80 dark:border-chocolate-800 shadow-soft space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-chocolate-900 dark:text-ivory-100">
                {t('home.impactTitle')}
              </h3>
              <ul className="space-y-3 text-xs text-chocolate-700 dark:text-chocolate-300">
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span><strong>15-30%</strong> {isHindi ? 'शहद उत्पादन में वृद्धि (उचित समय पर कटाई)' : 'Increase in honey yield with real-time monitoring.'}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span><strong>~40%</strong> {isHindi ? 'कालोनी नुकसान में कमी (समय पर रोग चेतावनी)' : 'Reduction in colony losses with early disease alerts.'}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span><strong>&lt; 5s</strong> {isHindi ? 'क्यूआर कोड द्वारा त्वरित प्रामाणिकता जांच' : 'QR-based consumer traceability check restoring trust.'}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span><strong>20-40%</strong> {isHindi ? 'मिलावट में कमी और FSSAI मानकों का पूर्ण पालन' : 'Fraud reduction supporting national FSSAI & NBHM standards.'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Consumer Call to Action Banner */}
      <section className="py-14 bg-gradient-to-r from-amber-600 via-amber-700 to-chocolate-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs font-semibold">
            <QrCode className="w-4 h-4 text-amber-200" />
            <span>Interactive Consumer Experience</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {isHindi ? 'क्या आपका शहद वाकई 100% शुद्ध है? अभी जांचें' : 'Do You Know Where Your Honey Came From?'}
          </h2>

          <p className="text-sm text-amber-100 max-w-xl mx-auto leading-relaxed">
            {isHindi
              ? 'हनी चेन से प्रमाणित किसी भी शीशी का QR कोड स्कैन करें और देखें कि किस किसान ने, किस घाटी में, किस फूल से यह शहद तैयार किया है।'
              : 'Scan the QR code on any Honey Chain verified bottle to inspect its beekeeper origin, harvest climate, and FSSAI lab chemical analysis.'}
          </p>

          <div className="pt-2">
            <Link
              to="/verify"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-white text-chocolate-900 font-bold text-sm hover:bg-ivory-100 transition-colors shadow-lg shadow-black/20"
            >
              <QrCode className="w-4 h-4 text-amber-600" />
              <span>{isHindi ? 'शहद सत्यापन पोर्टल खोलें' : 'Open QR Verification Portal'}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
