import React from 'react';
import {
  Award,
  ShieldCheck,
  Cpu,
  BrainCircuit,
  Layers,
  FileText,
  TrendingUp,
  CheckCircle2,
  ExternalLink,
  Target,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const About = () => {
  const { t, isHindi } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 animate-fadeIn">
      
      {/* Top Hero Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-300 text-xs font-semibold border border-amber-500/20">
          <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span>Smart India Hackathon 2026 • SIH26021</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-chocolate-900 dark:text-ivory-50 tracking-tight">
          {t('about.title')}
        </h1>

        <p className="text-base text-chocolate-600 dark:text-chocolate-300 leading-relaxed">
          {t('about.subtitle')}
        </p>
      </div>

      {/* SIH Hackathon Meta Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-charcoal-800 border border-chocolate-200/80 dark:border-chocolate-800 shadow-soft">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          <div>
            <span className="text-chocolate-500 uppercase font-semibold text-[10px] block">Problem Statement ID</span>
            <span className="text-base font-extrabold text-chocolate-900 dark:text-ivory-100">SIH26021</span>
          </div>

          <div>
            <span className="text-chocolate-500 uppercase font-semibold text-[10px] block">Hackathon Category</span>
            <span className="text-base font-extrabold text-amber-600 dark:text-amber-400">Cyber Security & Blockchain</span>
          </div>

          <div>
            <span className="text-chocolate-500 uppercase font-semibold text-[10px] block">Team Identification</span>
            <span className="text-base font-extrabold text-chocolate-900 dark:text-ivory-100">Team HiveNova (ID: 168252)</span>
          </div>

          <div>
            <span className="text-chocolate-500 uppercase font-semibold text-[10px] block">Target Domain</span>
            <span className="text-base font-extrabold text-chocolate-900 dark:text-ivory-100">Smart Apiculture & Traceability</span>
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-ivory-50 dark:bg-charcoal-800 border border-chocolate-200 dark:border-chocolate-700 shadow-soft space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-chocolate-900 dark:text-ivory-100">
            {t('about.objectiveTitle')}
          </h3>
          <p className="text-xs sm:text-sm text-chocolate-700 dark:text-chocolate-300 leading-relaxed">
            {t('about.objectiveDesc')}
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-ivory-50 dark:bg-charcoal-800 border border-chocolate-200 dark:border-chocolate-700 shadow-soft space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-chocolate-900 dark:text-ivory-100">
            Market Opportunity & National Need
          </h3>
          <p className="text-xs sm:text-sm text-chocolate-700 dark:text-chocolate-300 leading-relaxed">
            India's honey production has surged ~87.7% in the past decade, with FY2023-24 exports surpassing 1.07 lakh metric tonnes. However, international shipments and domestic buyers frequently encounter adulteration concerns. Honey Chain guarantees end-to-end cryptographic provenance from hive to bottle.
          </p>
        </div>
      </div>

      {/* Technical Architecture Stack Breakdown (Slide 3) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-charcoal-800 border border-chocolate-200/80 dark:border-chocolate-800 shadow-soft space-y-6">
        <h3 className="text-base font-bold text-chocolate-900 dark:text-ivory-100 uppercase tracking-wider">
          {t('about.techStackTitle')}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          
          <div className="p-4 rounded-2xl bg-ivory-50 dark:bg-charcoal-900 border border-chocolate-100 dark:border-chocolate-700 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Cpu className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-chocolate-900 dark:text-ivory-100">01. Hardware Layer</h4>
            <p className="text-chocolate-600 dark:text-chocolate-300">
              ESP32 Microcontroller, DHT22/11 Temp & Humidity, HX711 Load Cell, ESP32-CAM frame capture with smart illumination.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-ivory-50 dark:bg-charcoal-900 border border-chocolate-100 dark:border-chocolate-700 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-600 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-chocolate-900 dark:text-ivory-100">02. Communication Layer</h4>
            <p className="text-chocolate-600 dark:text-chocolate-300">
              Lightweight MQTT Protocol for low-bandwidth rural transmission, REST APIs, JSON telemetry schema.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-ivory-50 dark:bg-charcoal-900 border border-chocolate-100 dark:border-chocolate-700 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <BrainCircuit className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-chocolate-900 dark:text-ivory-100">03. AI / ML Layer</h4>
            <p className="text-chocolate-600 dark:text-chocolate-300">
              EfficientNet-B0 CNN, OpenCV Preprocessing, Honeybee Hive Health dataset training, disease detection & yield forecasting.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-ivory-50 dark:bg-charcoal-900 border border-chocolate-100 dark:border-chocolate-700 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-chocolate-900 dark:text-ivory-100">04. Blockchain Layer</h4>
            <p className="text-chocolate-600 dark:text-chocolate-300">
              Cosmos SDK, CometBFT Consensus, Go custom modules, SHA-256 Merkle root verification, tamper-evident private ledger.
            </p>
          </div>
        </div>
      </div>

      {/* Government Initiatives & Policy Alignment (Slide 6) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-charcoal-800 border border-chocolate-200/80 dark:border-chocolate-800 shadow-soft space-y-4">
        <h3 className="text-base font-bold text-chocolate-900 dark:text-ivory-100 uppercase tracking-wider">
          {t('about.policyTitle')}
        </h3>

        <div className="space-y-3 text-xs text-chocolate-700 dark:text-chocolate-200">
          <div className="p-4 rounded-xl bg-ivory-50 dark:bg-charcoal-900 border border-chocolate-100 dark:border-chocolate-700 space-y-1">
            <h4 className="font-bold text-chocolate-900 dark:text-ivory-100">
              1. National Beekeeping & Honey Mission (NBHM) - Govt. of India
            </h4>
            <p className="text-chocolate-600 dark:text-chocolate-300">
              NBHM explicitly mandates the development of blockchain and traceability systems for honey and beehive products alongside scientific beekeeping IT adoption.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-ivory-50 dark:bg-charcoal-900 border border-chocolate-100 dark:border-chocolate-700 space-y-1">
            <h4 className="font-bold text-chocolate-900 dark:text-ivory-100">
              2. Madhukranti Portal Integration
            </h4>
            <p className="text-chocolate-600 dark:text-chocolate-300">
              Launched under NBHM for online registration and source traceability of honey, ensuring all beekeepers have recognized digital credentials.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-ivory-50 dark:bg-charcoal-900 border border-chocolate-100 dark:border-chocolate-700 space-y-1">
            <h4 className="font-bold text-chocolate-900 dark:text-ivory-100">
              3. Beekeeping Development Committee (EAC-PM)
            </h4>
            <p className="text-chocolate-600 dark:text-chocolate-300">
              Recommended that honey sold or exported should be strictly traceable to registered beekeepers using digital methods like blockchain.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-ivory-50 dark:bg-charcoal-900 border border-chocolate-100 dark:border-chocolate-700 space-y-1">
            <h4 className="font-bold text-chocolate-900 dark:text-ivory-100">
              4. FSSAI Honey & Beehive Analysis Standards
            </h4>
            <p className="text-chocolate-600 dark:text-chocolate-300">
              FSSAI Manual of Methods of Analysis for Honey verifies moisture (≤20%), HMF (≤80 mg/kg), and isotopic C4 foreign sugar absence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
