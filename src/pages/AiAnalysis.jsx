import React, { useState } from 'react';
import {
  BrainCircuit,
  Upload,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Cpu,
  Info,
  Layers,
  Sparkles,
  RefreshCw,
  FileSearch
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { aiDiagnosticSamples } from '../data/aiDatasets';

export const AiAnalysis = () => {
  const { t, isHindi } = useLanguage();
  const [selectedSample, setSelectedSample] = useState(aiDiagnosticSamples[0]);
  const [isInferencing, setIsInferencing] = useState(false);
  const [customImage, setCustomImage] = useState(null);

  const handleSelectSample = (sample) => {
    setCustomImage(null);
    setIsInferencing(true);
    setTimeout(() => {
      setSelectedSample(sample);
      setIsInferencing(false);
    }, 400);
  };

  const handleCustomUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomImage(url);
      setIsInferencing(true);

      setTimeout(() => {
        // Construct simulated custom analysis
        const customResult = {
          ...aiDiagnosticSamples[0],
          id: 'custom-upload',
          name: file.name,
          nameHi: file.name,
          image: url,
          confidence: +(93 + Math.random() * 5).toFixed(1),
          primaryDiagnosis: 'Healthy Honeycomb Structure (Automated Inspection)',
          primaryDiagnosisHi: 'स्वस्थ छत्ता संरचना (स्वचालित निरीक्षण परिणाम)',
          healthIndex: 94.0
        };
        setSelectedSample(customResult);
        setIsInferencing(false);
      }, 700);
    }
  };

  const isWarning = selectedSample.status === 'warning';
  const isCritical = selectedSample.status === 'critical';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Title & Model Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-chocolate-200/60 dark:border-chocolate-800">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-chocolate-900 dark:text-ivory-50 tracking-tight">
              {t('aiAnalysis.title')}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/30">
              EfficientNet-B0 CNN
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-chocolate-600 dark:text-chocolate-300">
            {t('aiAnalysis.subtitle')}
          </p>
        </div>

        {/* Clear Demonstration Mode Badge */}
        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20 text-xs font-semibold">
          <Info className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>{t('common.demoMode')}: EfficientNet-B0 Model Demonstration</span>
        </div>
      </div>

      {/* Comb Image Selector & Custom Upload Area */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-chocolate-700 dark:text-chocolate-300">
          {t('aiAnalysis.selectorTitle')}
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {aiDiagnosticSamples.map((sample) => {
            const isSelected = selectedSample.id === sample.id && !customImage;
            return (
              <button
                key={sample.id}
                onClick={() => handleSelectSample(sample)}
                className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-600 ring-2 ring-amber-500/30 shadow-md'
                    : 'bg-white dark:bg-charcoal-800 border-chocolate-200/80 dark:border-chocolate-800 hover:border-amber-400'
                }`}
              >
                <div className="w-full h-24 rounded-xl overflow-hidden mb-2 bg-chocolate-100 dark:bg-charcoal-900">
                  <img
                    src={sample.image}
                    alt={sample.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-chocolate-900 dark:text-ivory-100 leading-snug">
                    {isHindi ? sample.nameHi : sample.name}
                  </h4>
                  <span className={`text-[10px] font-semibold mt-1 inline-block ${
                    sample.status === 'healthy' ? 'text-emerald-600' : 'text-amber-600'
                  }`}>
                    {sample.confidence}% Conf.
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Upload Custom Photo Option */}
        <div className="pt-2">
          <label className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl border border-dashed border-chocolate-300 dark:border-chocolate-700 bg-ivory-50 dark:bg-charcoal-800 hover:border-amber-500 text-xs font-semibold text-chocolate-800 dark:text-ivory-200 cursor-pointer transition-colors">
            <Upload className="w-4 h-4 text-amber-600" />
            <span>{t('aiAnalysis.uploadPrompt')}</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleCustomUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Diagnostic Analysis Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Image Preview with Bounding Box Overlay */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-charcoal-800 border border-chocolate-200/80 dark:border-chocolate-800 shadow-soft space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-chocolate-700 dark:text-chocolate-300">
                Inspection Image & Vision HUD
              </span>
              <span className="text-[10px] font-mono text-chocolate-500">
                OpenCV Preprocessed (224x224)
              </span>
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-video bg-chocolate-950 flex items-center justify-center">
              <img
                src={selectedSample.image}
                alt="Selected Comb Inspection"
                className="w-full h-full object-cover"
              />

              {/* Bounding box simulation HUD */}
              <div className="absolute inset-4 border-2 border-dashed border-amber-400/80 rounded-lg pointer-events-none flex flex-col justify-between p-2">
                <span className="self-start text-[10px] font-mono bg-black/70 text-amber-300 px-1.5 py-0.5 rounded">
                  ROI: Brood Comb Area
                </span>
                <span className="self-end text-[10px] font-mono bg-black/70 text-emerald-400 px-1.5 py-0.5 rounded">
                  Score: {selectedSample.confidence}%
                </span>
              </div>
            </div>

            <div className="pt-2 text-xs text-chocolate-500">
              {t('aiAnalysis.accuracyNote')}
            </div>
          </div>
        </div>

        {/* Right Column: AI Diagnostics & Remedial Plan */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-charcoal-800 border border-chocolate-200/80 dark:border-chocolate-800 shadow-soft space-y-6">
            
            {/* Header: Health Index & Confidence */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-chocolate-100 dark:border-chocolate-700">
              <div>
                <span className="text-xs font-semibold text-chocolate-500 block">
                  {t('aiAnalysis.healthStatus')}
                </span>
                <div className="text-2xl font-extrabold text-chocolate-900 dark:text-ivory-50 flex items-center space-x-2">
                  <span>{selectedSample.healthIndex}%</span>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                    selectedSample.status === 'healthy'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                      : isCritical
                      ? 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
                  }`}>
                    {selectedSample.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="text-right sm:text-right">
                <span className="text-xs font-semibold text-chocolate-500 block">
                  {t('aiAnalysis.confidence')}
                </span>
                <span className="text-xl font-extrabold text-amber-600 dark:text-amber-400">
                  {selectedSample.confidence}%
                </span>
              </div>
            </div>

            {/* Condition Diagnosis */}
            <div className="p-4 rounded-2xl bg-ivory-50 dark:bg-charcoal-900 border border-chocolate-200/60 dark:border-chocolate-700 space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                {t('aiAnalysis.detectedCondition')}
              </span>
              <p className="text-base font-bold text-chocolate-900 dark:text-ivory-100">
                {isHindi ? selectedSample.primaryDiagnosisHi : selectedSample.primaryDiagnosis}
              </p>
            </div>

            {/* Feature Extraction Table */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-chocolate-700 dark:text-chocolate-300">
                Extracted Biological Markers
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-ivory-50 dark:bg-charcoal-900 border border-chocolate-100 dark:border-chocolate-700">
                  <span className="text-chocolate-500 block text-[10px]">Capping Uniformity:</span>
                  <span className="font-semibold text-chocolate-800 dark:text-ivory-200">
                    {selectedSample.features.cappingUniformity}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-ivory-50 dark:bg-charcoal-900 border border-chocolate-100 dark:border-chocolate-700">
                  <span className="text-chocolate-500 block text-[10px]">Mite Count / 100 Bees:</span>
                  <span className="font-semibold text-chocolate-800 dark:text-ivory-200">
                    {selectedSample.features.miteCountPer100Bees}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-ivory-50 dark:bg-charcoal-900 border border-chocolate-100 dark:border-chocolate-700 sm:col-span-2">
                  <span className="text-chocolate-500 block text-[10px]">Larval Morphological Appearance:</span>
                  <span className="font-semibold text-chocolate-800 dark:text-ivory-200">
                    {selectedSample.features.larvalAppearance}
                  </span>
                </div>
              </div>
            </div>

            {/* Yield Forecasting Section */}
            <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-charcoal-900 border border-amber-500/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center space-x-1.5">
                  <TrendingUp className="w-4 h-4 text-amber-600" />
                  <span>{t('aiAnalysis.yieldForecast')}</span>
                </span>
                <span className="text-[10px] font-mono text-chocolate-500">
                  Model Confidence: {selectedSample.yieldForecast.confidence}%
                </span>
              </div>

              <div className="flex items-baseline space-x-3">
                <span className="text-2xl font-extrabold text-chocolate-900 dark:text-ivory-100">
                  {selectedSample.yieldForecast.estimatedKg}
                </span>
                <span className="text-xs text-chocolate-600 dark:text-chocolate-400">
                  Harvest window: <strong>{selectedSample.yieldForecast.harvestWindowDays}</strong>
                </span>
              </div>
            </div>

            {/* Actionable Remedial Advisory */}
            <div className="p-4 rounded-2xl bg-chocolate-900 text-ivory-100 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>{t('aiAnalysis.remedyTitle')}</span>
              </span>
              <p className="text-xs sm:text-sm text-chocolate-200 leading-relaxed">
                {isHindi ? selectedSample.advisory.hi : selectedSample.advisory.en}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
