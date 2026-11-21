import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  QrCode,
  Camera,
  CheckCircle2,
  AlertTriangle,
  Award,
  ShieldCheck,
  MapPin,
  Calendar,
  User,
  Droplet,
  ExternalLink,
  Printer,
  RotateCcw,
  Sparkles,
  Layers,
  Thermometer,
  FileCheck,
  Check,
  Copy
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { sampleBatches } from '../data/sampleBatches';
import { HoneyPourAnimation } from '../components/common/HoneyPourAnimation';

export const QrVerification = () => {
  const { t, isHindi } = useLanguage();
  const [searchParams] = useSearchParams();

  // Inputs
  const [inputBatchId, setInputBatchId] = useState('');
  const [activeBatch, setActiveBatch] = useState(null);
  const [isPouring, setIsPouring] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Camera stream state
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const videoRef = useRef(null);

  // Read URL query parameter if present (?batch=HC-2026-HIMA-081)
  useEffect(() => {
    const urlBatch = searchParams.get('batch');
    if (urlBatch) {
      setInputBatchId(urlBatch);
      executeVerification(urlBatch);
    }
  }, [searchParams]);

  // Start Camera
  const startCamera = async () => {
    setCameraError(null);
    setCameraActive(true);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } else {
        setCameraError('Camera API is not supported on this device or browser.');
      }
    } catch (err) {
      console.error('Camera access error:', err);
      setCameraError('Unable to access device camera. Please check camera permissions or enter the batch ID manually.');
    }
  };

  // Stop Camera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
    setCameraError(null);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Trigger verification flow
  const executeVerification = (batchCode) => {
    if (!batchCode.trim()) return;

    setErrorMessage('');
    const cleanId = batchCode.trim().toUpperCase();
    const found = sampleBatches.find(b => b.batchId.toUpperCase() === cleanId);

    if (found) {
      stopCamera();
      // Trigger sophisticated honey-pouring transition
      setIsPouring(true);
      // Wait for animation to finish or set activeBatch
      setActiveBatch(found);
    } else {
      setErrorMessage(
        isHindi
          ? `बैच कोड "${cleanId}" डेटाबेस में नहीं मिला। कृपया नीचे दिए गए नमूना बैच से परीक्षण करें।`
          : `Batch ID "${cleanId}" not recognized. Please try one of the verified sample batches below.`
      );
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    executeVerification(inputBatchId);
  };

  const handleSelectSample = (sampleId) => {
    setInputBatchId(sampleId);
    executeVerification(sampleId);
  };

  const handleReset = () => {
    setActiveBatch(null);
    setInputBatchId('');
    setErrorMessage('');
  };

  const isFlagged = activeBatch && activeBatch.status === 'flagged_counterfeit';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Honey Pouring Transition Overlay */}
      {isPouring && (
        <HoneyPourAnimation onComplete={() => setIsPouring(false)} />
      )}

      {/* Top Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-300 text-xs font-semibold border border-amber-500/20">
          <QrCode className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span>{isHindi ? 'उपभोक्ता डिजिटल पासपोर्ट पोर्टल' : 'Consumer Trust & Transparency Portal'}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-chocolate-900 dark:text-ivory-50 tracking-tight">
          {t('verify.title')}
        </h1>

        <p className="text-sm text-chocolate-600 dark:text-chocolate-300 leading-relaxed">
          {t('verify.subtitle')}
        </p>
      </div>

      {/* Scanner & Manual Input Section (shown when no active passport is open) */}
      {!activeBatch && (
        <div className="max-w-2xl mx-auto space-y-6">
          
          {/* Camera Viewfinder Box */}
          <div className="p-6 rounded-3xl bg-white dark:bg-charcoal-800 border border-chocolate-200/80 dark:border-chocolate-800 shadow-soft text-center space-y-4">
            
            {cameraActive ? (
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-black flex items-center justify-center">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />

                {/* Reticle Overlay */}
                <div className="absolute inset-8 border-2 border-dashed border-amber-400 rounded-xl pointer-events-none flex items-center justify-center">
                  <div className="w-16 h-16 border-t-2 border-l-2 border-amber-500 absolute top-2 left-2"></div>
                  <div className="w-16 h-16 border-t-2 border-r-2 border-amber-500 absolute top-2 right-2"></div>
                  <div className="w-16 h-16 border-b-2 border-l-2 border-amber-500 absolute bottom-2 left-2"></div>
                  <div className="w-16 h-16 border-b-2 border-r-2 border-amber-500 absolute bottom-2 right-2"></div>
                  <span className="text-[11px] font-semibold text-white bg-black/60 px-2 py-1 rounded">
                    {t('verify.scanning')}
                  </span>
                </div>
              </div>
            ) : (
              <div className="py-10 px-4 rounded-2xl bg-ivory-50 dark:bg-charcoal-900 border-2 border-dashed border-chocolate-200 dark:border-chocolate-700 flex flex-col items-center justify-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <Camera className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-chocolate-900 dark:text-ivory-100">
                    {t('verify.cameraNotice')}
                  </h3>
                  <p className="text-xs text-chocolate-500">
                    {isHindi ? 'कैमरा स्कैनर खोलकर शहद के डिब्बे पर छपा कोड स्कैन करें' : 'Position your phone camera over the security QR code on the honey jar label'}
                  </p>
                </div>
              </div>
            )}

            {cameraError && (
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-charcoal-900 border border-amber-200 text-xs text-amber-900 dark:text-amber-200">
                {cameraError}
              </div>
            )}

            <div className="flex justify-center gap-3">
              {cameraActive ? (
                <button
                  onClick={stopCamera}
                  className="px-5 py-2.5 rounded-xl border border-chocolate-300 dark:border-chocolate-700 font-semibold text-xs text-chocolate-800 dark:text-ivory-100 hover:bg-ivory-100"
                >
                  {t('verify.stopCamera')}
                </button>
              ) : (
                <button
                  onClick={startCamera}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-colors shadow-sm"
                >
                  <Camera className="w-4 h-4" />
                  <span>{t('verify.startCamera')}</span>
                </button>
              )}
            </div>
          </div>

          {/* Manual Batch Entry Form */}
          <div className="p-6 rounded-3xl bg-white dark:bg-charcoal-800 border border-chocolate-200/80 dark:border-chocolate-800 shadow-soft space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-chocolate-700 dark:text-chocolate-300">
              {t('verify.manualEntry')}
            </h3>

            <form onSubmit={handleManualSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder={t('verify.manualPlaceholder')}
                value={inputBatchId}
                onChange={(e) => setInputBatchId(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border border-chocolate-200 dark:border-chocolate-700 bg-ivory-50 dark:bg-charcoal-900 text-sm font-mono uppercase focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-chocolate-900 dark:bg-amber-600 hover:bg-chocolate-800 dark:hover:bg-amber-500 text-white font-semibold text-sm transition-colors shadow-sm"
              >
                {t('verify.verifyAction')}
              </button>
            </form>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-charcoal-900 border border-rose-200 text-xs text-rose-800 dark:text-rose-300">
                {errorMessage}
              </div>
            )}

            {/* Quick Demo Batch Selector */}
            <div className="pt-3 border-t border-chocolate-100 dark:border-chocolate-700 space-y-2">
              <span className="text-[11px] font-semibold text-chocolate-500 block">
                {t('verify.quickDemoTitle')}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => handleSelectSample('HC-2026-HIMA-081')}
                  className="p-2.5 rounded-xl border border-chocolate-200 dark:border-chocolate-700 hover:border-amber-500 bg-ivory-50 dark:bg-charcoal-900 text-left font-mono font-bold text-chocolate-800 dark:text-ivory-200 flex justify-between items-center transition-all"
                >
                  <span>HC-2026-HIMA-081</span>
                  <span className="text-[10px] text-emerald-600 font-sans font-semibold">Himachal Pure</span>
                </button>

                <button
                  onClick={() => handleSelectSample('HC-2026-KASH-114')}
                  className="p-2.5 rounded-xl border border-chocolate-200 dark:border-chocolate-700 hover:border-amber-500 bg-ivory-50 dark:bg-charcoal-900 text-left font-mono font-bold text-chocolate-800 dark:text-ivory-200 flex justify-between items-center transition-all"
                >
                  <span>HC-2026-KASH-114</span>
                  <span className="text-[10px] text-cyan-600 font-sans font-semibold">Kashmir Acacia</span>
                </button>

                <button
                  onClick={() => handleSelectSample('HC-2026-SUND-042')}
                  className="p-2.5 rounded-xl border border-chocolate-200 dark:border-chocolate-700 hover:border-amber-500 bg-ivory-50 dark:bg-charcoal-900 text-left font-mono font-bold text-chocolate-800 dark:text-ivory-200 flex justify-between items-center transition-all"
                >
                  <span>HC-2026-SUND-042</span>
                  <span className="text-[10px] text-amber-600 font-sans font-semibold">Sundarbans Wild</span>
                </button>

                <button
                  onClick={() => handleSelectSample('HC-2026-WARN-999')}
                  className="p-2.5 rounded-xl border border-rose-200 dark:border-rose-900/40 hover:border-rose-500 bg-rose-50/50 dark:bg-rose-950/20 text-left font-mono font-bold text-rose-800 dark:text-rose-300 flex justify-between items-center transition-all"
                >
                  <span>HC-2026-WARN-999</span>
                  <span className="text-[10px] text-rose-600 font-sans font-semibold">Fraud Demo Alert</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Verified Digital Passport (Revealed After Pouring Animation) */}
      {activeBatch && !isPouring && (
        <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
          
          {/* Header Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
            <button
              onClick={handleReset}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-chocolate-300 dark:border-chocolate-700 text-chocolate-800 dark:text-ivory-200 hover:bg-ivory-100 dark:hover:bg-charcoal-800 self-start"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t('verify.resetScanner')}</span>
            </button>

            <button
              onClick={() => window.print()}
              className="inline-flex items-center space-x-1.5 px-4 py-1.5 text-xs font-semibold rounded-xl bg-chocolate-900 dark:bg-charcoal-800 text-white hover:bg-chocolate-800 transition-colors shadow-sm self-start sm:self-auto"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span>{t('common.printCertificate')}</span>
            </button>
          </div>

          {/* Verification Status Banner */}
          {isFlagged ? (
            <div className="p-6 rounded-3xl bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-500 text-rose-900 dark:text-rose-200 shadow-md space-y-2">
              <div className="flex items-center space-x-2 text-rose-600 font-extrabold text-base sm:text-lg">
                <AlertTriangle className="w-6 h-6" />
                <span>{t('verify.fraudAlert')}</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed">
                {isHindi
                  ? 'यह नमूना C4 चीनी मिलावट परीक्षण में विफल रहा है। इसमें 42.6% विदेशी सिंथेटिक कॉर्न सीरप पाया गया है। छत्ते का कोई भी IoT सेंसर डेटा ब्लॉकचेन पर उपलब्ध नहीं है।'
                  : 'This sample has failed isotopic C4 carbon testing (42.6% foreign inverted sugar syrup detected). Zero verifiable IoT hive telemetry recorded on the CometBFT ledger. Confiscated under FSSAI Vigilance Act.'}
              </p>
            </div>
          ) : (
            <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-6 h-6 text-amber-200" />
                  <span className="font-extrabold text-lg sm:text-xl tracking-tight">
                    {t('verify.genuineBadge')}
                  </span>
                </div>
                <span className="text-[11px] font-mono font-bold bg-white/20 px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                  PASSPORT VERIFIED
                </span>
              </div>
              <p className="text-xs sm:text-sm text-amber-100">
                {isHindi
                  ? 'यह शहद सीधे प्रमाणित मधुमक्खी पालक के छत्ते से निकाला गया है एवं FSSAI मानकों के अनुरूप पूर्णतः शुद्ध है।'
                  : 'Cryptographically anchored to CometBFT Block #' + activeBatch.blockchain.blockHeight + '. Harvested with zero sugar feeding or thermal adulteration.'}
              </p>
            </div>
          )}

          {/* Main Passport Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-charcoal-800 border border-chocolate-200/80 dark:border-chocolate-800 shadow-card space-y-8">
            
            {/* Section 1: Product & Batch Identification */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-chocolate-100 dark:border-chocolate-700">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                  BATCH ID: {activeBatch.batchId}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-chocolate-900 dark:text-ivory-50">
                  {isHindi ? activeBatch.productNameHi : activeBatch.productName}
                </h2>
                <p className="text-xs text-chocolate-500">
                  Floral Botanical Origin: <strong>{isHindi ? activeBatch.floraSourceHi : activeBatch.floraSource}</strong> • Net Weight: {activeBatch.netWeight}
                </p>
              </div>

              {/* Verified Stamp Emblem */}
              <div className="flex items-center space-x-3 p-3 rounded-2xl bg-ivory-50 dark:bg-charcoal-900 border border-chocolate-200 dark:border-chocolate-700">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                  <Award className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] uppercase font-bold text-chocolate-500 block">Quality Standard</span>
                  <span className="text-xs font-bold text-chocolate-900 dark:text-ivory-100">FSSAI & NBHM</span>
                  <span className="text-[10px] text-emerald-600 font-semibold block">Agmark Grade A</span>
                </div>
              </div>
            </div>

            {/* Section 2: Beekeeper Profile & Hive Source */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-chocolate-700 dark:text-chocolate-300 flex items-center space-x-2">
                <User className="w-4 h-4 text-amber-600" />
                <span>{t('verify.beekeeperDetails')}</span>
              </h3>

              <div className="p-5 rounded-2xl bg-ivory-50 dark:bg-charcoal-900 border border-chocolate-200/60 dark:border-chocolate-700 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-chocolate-500 block text-[10px]">Beekeeper Name:</span>
                  <span className="font-bold text-sm text-chocolate-900 dark:text-ivory-100">
                    {isHindi ? activeBatch.beekeeper.nameHi : activeBatch.beekeeper.name}
                  </span>
                  <span className="text-[11px] text-amber-700 dark:text-amber-400 font-mono block">
                    {activeBatch.beekeeper.id}
                  </span>
                </div>

                <div>
                  <span className="text-chocolate-500 block text-[10px]">Producer Federation:</span>
                  <span className="font-semibold text-chocolate-800 dark:text-ivory-200">
                    {isHindi ? activeBatch.beekeeper.cooperativeHi : activeBatch.beekeeper.cooperative}
                  </span>
                </div>

                <div>
                  <span className="text-chocolate-500 block text-[10px]">Geographic Origin:</span>
                  <span className="font-semibold text-chocolate-800 dark:text-ivory-200">
                    {activeBatch.beekeeper.village}, {activeBatch.beekeeper.state}
                  </span>
                  <span className="text-[10px] font-mono text-chocolate-500 block">
                    {activeBatch.beekeeper.latitude}, {activeBatch.beekeeper.longitude}
                  </span>
                </div>

                <div>
                  <span className="text-chocolate-500 block text-[10px]">Source Hives (IoT):</span>
                  <span className="font-semibold text-chocolate-800 dark:text-ivory-200">
                    {activeBatch.hives.join(', ')}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-medium block">
                    Telemetry Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Section 3: FSSAI Lab Quality Report */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-chocolate-700 dark:text-chocolate-300 flex items-center space-x-2">
                <FileCheck className="w-4 h-4 text-amber-600" />
                <span>{t('verify.labDetails')}</span>
              </h3>

              <div className="p-5 rounded-2xl bg-ivory-50 dark:bg-charcoal-900 border border-chocolate-200/60 dark:border-chocolate-700 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between text-xs pb-3 border-b border-chocolate-100 dark:border-chocolate-700/60 gap-1">
                  <span>Testing Laboratory: <strong>{isHindi ? activeBatch.labTests.certifiedByHi : activeBatch.labTests.certifiedBy}</strong></span>
                  <span className="font-mono text-chocolate-500">Report #{activeBatch.labTests.testReportId}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                  
                  <div className="p-3 rounded-xl bg-white dark:bg-charcoal-800 border border-chocolate-100 dark:border-chocolate-700">
                    <span className="text-chocolate-500 block text-[10px]">Moisture Content:</span>
                    <div className="text-base font-extrabold text-chocolate-900 dark:text-ivory-100">
                      {activeBatch.labTests.moistureContent}%
                    </div>
                    <span className="text-[10px] text-emerald-600 font-semibold">{activeBatch.labTests.moistureStatus}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-charcoal-800 border border-chocolate-100 dark:border-chocolate-700">
                    <span className="text-chocolate-500 block text-[10px]">HMF Level (Freshness):</span>
                    <div className="text-base font-extrabold text-chocolate-900 dark:text-ivory-100">
                      {activeBatch.labTests.hmfLevel} mg/kg
                    </div>
                    <span className="text-[10px] text-emerald-600 font-semibold">{activeBatch.labTests.hmfStatus}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-charcoal-800 border border-chocolate-100 dark:border-chocolate-700">
                    <span className="text-chocolate-500 block text-[10px]">C4 Sugar Adulteration Assay:</span>
                    <div className="text-base font-extrabold text-chocolate-900 dark:text-ivory-100">
                      {activeBatch.labTests.c4SugarSyrupTest}
                    </div>
                    <span className="text-[10px] text-emerald-600 font-semibold">{activeBatch.labTests.c4Status}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-charcoal-800 border border-chocolate-100 dark:border-chocolate-700">
                    <span className="text-chocolate-500 block text-[10px]">Natural Pollen Count:</span>
                    <div className="text-base font-extrabold text-chocolate-900 dark:text-ivory-100">
                      {activeBatch.labTests.pollenCountPerGram.toLocaleString()} /g
                    </div>
                    <span className="text-[10px] text-emerald-600 font-semibold">{activeBatch.labTests.pollenStatus}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-charcoal-800 border border-chocolate-100 dark:border-chocolate-700">
                    <span className="text-chocolate-500 block text-[10px]">Sucrose Content:</span>
                    <div className="text-base font-extrabold text-chocolate-900 dark:text-ivory-100">
                      {activeBatch.labTests.sucrosePercent}%
                    </div>
                    <span className="text-[10px] text-emerald-600 font-semibold">{activeBatch.labTests.sucroseStatus}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-charcoal-800 border border-chocolate-100 dark:border-chocolate-700">
                    <span className="text-chocolate-500 block text-[10px]">Diastase Enzyme Activity:</span>
                    <div className="text-base font-extrabold text-chocolate-900 dark:text-ivory-100">
                      {activeBatch.labTests.diastaseActivity} Schade
                    </div>
                    <span className="text-[10px] text-emerald-600 font-semibold">{activeBatch.labTests.diastaseStatus}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Supply Chain Trajectory Timeline */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-chocolate-700 dark:text-chocolate-300 flex items-center space-x-2">
                <Layers className="w-4 h-4 text-amber-600" />
                <span>Supply Chain Provenance Milestones</span>
              </h3>

              <div className="space-y-3 relative before:absolute before:inset-y-0 before:left-3 before:w-0.5 before:bg-chocolate-200 dark:before:bg-chocolate-700">
                {activeBatch.supplyChainJourney.map((milestone, idx) => (
                  <div key={idx} className="relative pl-8 text-xs space-y-1">
                    <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-amber-600 border-2 border-white dark:border-charcoal-800"></div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <span className="font-bold text-chocolate-900 dark:text-ivory-100 text-sm">
                        {isHindi ? milestone.stepHi : milestone.step}
                      </span>
                      <span className="text-chocolate-500 text-[11px]">{milestone.date}</span>
                    </div>
                    <p className="text-chocolate-600 dark:text-chocolate-300">
                      {milestone.details}
                    </p>
                    <div className="text-[10px] font-mono text-chocolate-500 flex items-center space-x-2">
                      <span>{milestone.location}</span>
                      <span>•</span>
                      <span className="text-amber-700 dark:text-amber-400 font-semibold">Tx: {milestone.txHash}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 5: Blockchain Proof Hash */}
            <div className="p-4 rounded-2xl bg-chocolate-900 text-ivory-100 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between font-sans">
                <span className="font-bold text-amber-400 text-xs">
                  CometBFT Consensus Proof
                </span>
                <span className="text-[10px] text-emerald-400">
                  Block #{activeBatch.blockchain.blockHeight}
                </span>
              </div>
              <div className="text-[11px] break-all text-chocolate-200">
                {activeBatch.blockchain.txHash}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
