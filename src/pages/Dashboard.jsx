import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  Thermometer,
  Droplets,
  Scale,
  AlertTriangle,
  CheckCircle,
  Plus,
  RefreshCw,
  TrendingUp,
  FileText,
  MapPin,
  Cpu,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { sampleHives, sampleApiaries } from '../data/sampleHives';
import { SensorSparkline } from '../components/common/SensorSparkline';

export const Dashboard = () => {
  const { t, isHindi } = useLanguage();
  const [selectedApiary, setSelectedApiary] = useState(sampleApiaries[0].id);
  const [selectedHiveId, setSelectedHiveId] = useState(sampleHives[0].id);
  const [hivesList, setHivesList] = useState(sampleHives);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showAddHiveModal, setShowAddHiveModal] = useState(false);

  // Form state for adding new hive
  const [newHiveName, setNewHiveName] = useState('');
  const [newHiveQueen, setNewHiveQueen] = useState('Active');

  const selectedHive = hivesList.find(h => h.id === selectedHiveId) || hivesList[0];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Simulate minor fluctuation
      setHivesList(prev =>
        prev.map(h => ({
          ...h,
          temperature: +(h.temperature + (Math.random() * 0.2 - 0.1)).toFixed(1),
          weight: +(h.weight + (Math.random() * 0.1 - 0.05)).toFixed(1),
          lastSync: 'Just now'
        }))
      );
      setIsRefreshing(false);
    }, 600);
  };

  const handleAddHive = (e) => {
    e.preventDefault();
    if (!newHiveName) return;

    const newId = `HIVE-0${hivesList.length + 1}`;
    const newEntry = {
      id: newId,
      apiaryId: selectedApiary,
      name: newHiveName,
      status: 'healthy',
      temperature: 34.5,
      humidity: 57.0,
      weight: 35.0,
      battery: 100,
      signal: -60,
      queenStatus: newHiveQueen,
      lastSync: 'Just now',
      alertMessage: null,
      history: [
        { time: '00:00', temp: 34.0, humidity: 58.0, weight: 34.8 },
        { time: '06:00', temp: 34.2, humidity: 57.5, weight: 34.9 },
        { time: '12:00', temp: 34.8, humidity: 56.0, weight: 35.0 },
        { time: '18:00', temp: 34.5, humidity: 57.0, weight: 35.0 }
      ]
    };

    setHivesList([...hivesList, newEntry]);
    setSelectedHiveId(newId);
    setNewHiveName('');
    setShowAddHiveModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Dashboard Top Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-chocolate-200/60 dark:border-chocolate-800">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-chocolate-900 dark:text-ivory-50 tracking-tight">
              {t('dashboard.title')}
            </h1>
            <span className="px-2 py-0.5 text-xs font-semibold rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
              ● {t('common.live')}
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-chocolate-600 dark:text-chocolate-300">
            {t('dashboard.subtitle')}
          </p>
        </div>

        {/* Apiary Selector & Refresh */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center space-x-2 bg-white dark:bg-charcoal-800 px-3 py-1.5 rounded-xl border border-chocolate-200 dark:border-chocolate-700 shadow-sm text-xs">
            <MapPin className="w-3.5 h-3.5 text-amber-600" />
            <select
              value={selectedApiary}
              onChange={(e) => setSelectedApiary(e.target.value)}
              className="bg-transparent text-chocolate-900 dark:text-ivory-100 font-semibold focus:outline-none"
            >
              {sampleApiaries.map(apiary => (
                <option key={apiary.id} value={apiary.id} className="dark:bg-charcoal-800">
                  {apiary.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-chocolate-300 dark:border-chocolate-700 bg-white dark:bg-charcoal-800 text-xs font-semibold text-chocolate-800 dark:text-ivory-100 hover:border-amber-500 shadow-sm transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-amber-600 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? t('common.loading') : isHindi ? 'ताज़ा करें' : 'Refresh'}</span>
          </button>

          <button
            onClick={() => setShowAddHiveModal(true)}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t('dashboard.actions.addNewHive')}</span>
          </button>
        </div>
      </div>

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-charcoal-800 border border-chocolate-200/80 dark:border-chocolate-800 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-chocolate-600 dark:text-chocolate-400">
              {t('dashboard.quickStats.totalHives')}
            </span>
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-600">
              <Layers className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 text-2xl font-extrabold text-chocolate-900 dark:text-ivory-100">
            {hivesList.length} {isHindi ? 'छत्ते' : 'Hives'}
          </div>
          <p className="mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            ● {hivesList.filter(h => h.status === 'healthy').length} Optimal Health
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-charcoal-800 border border-chocolate-200/80 dark:border-chocolate-800 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-chocolate-600 dark:text-chocolate-400">
              {t('dashboard.quickStats.healthScore')}
            </span>
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600">
              <CheckCircle className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
            92.8%
          </div>
          <p className="mt-1 text-[11px] text-chocolate-500 font-medium">
            AI Brood Vitality Index
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-charcoal-800 border border-chocolate-200/80 dark:border-chocolate-800 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-chocolate-600 dark:text-chocolate-400">
              {t('dashboard.quickStats.yieldToday')}
            </span>
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-600">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 text-2xl font-extrabold text-amber-600 dark:text-amber-400">
            +3.4 kg
          </div>
          <p className="mt-1 text-[11px] text-chocolate-500 font-medium">
            Last 24 Hours Net Delta
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-charcoal-800 border border-chocolate-200/80 dark:border-chocolate-800 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-chocolate-600 dark:text-chocolate-400">
              {t('dashboard.quickStats.activeSensors')}
            </span>
            <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600">
              <Cpu className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 text-2xl font-extrabold text-chocolate-900 dark:text-ivory-100">
            24 / 24
          </div>
          <p className="mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            ESP32 Wi-Fi & MQTT Active
          </p>
        </div>
      </div>

      {/* Automated Disease & Temperature Advisory Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 dark:bg-charcoal-800 border-l-4 border-l-amber-500 border-r border-t border-b border-amber-200/80 dark:border-chocolate-700 shadow-sm">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
              {isHindi ? 'स्वचालित किसान परामर्श एवं अलर्ट (Automated Advisory)' : 'Automated Apiary Advisory Alert'}
            </h4>
            <p className="text-xs sm:text-sm text-chocolate-800 dark:text-chocolate-200 leading-relaxed">
              {isHindi
                ? 'छत्ता #02 में अचानक 1.8 किग्रा वजन की कमी दर्ज की गई है। कृपया मधुमक्खियों के झुंड निकलने (स्वार्मिंग) अथवा शहद चोरी की संभावना की जांच करें। अन्य सभी छत्ते 34.5°C के सामान्य तापमान पर स्वस्थ हैं।'
                : 'Alert on Hive #02: Sudden weight loss of -1.8 kg recorded at 16:00. Inspect for potential swarming preparation or honey extraction. Other hives are maintaining steady 34.5°C incubation.'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content: Hive Cards Grid & Selected Hive Detailed Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Registered Hives List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-chocolate-700 dark:text-chocolate-300">
              {t('dashboard.hivesSection')}
            </h3>
            <span className="text-xs text-chocolate-500">
              {hivesList.length} {isHindi ? 'छत्ते सक्रिय' : 'Hives Active'}
            </span>
          </div>

          <div className="space-y-3">
            {hivesList.map((hive) => {
              const isSelected = hive.id === selectedHiveId;
              const isWarning = hive.status === 'warning';
              const isAttention = hive.status === 'attention';

              return (
                <div
                  key={hive.id}
                  onClick={() => setSelectedHiveId(hive.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500/10 dark:bg-charcoal-700 border-amber-600 shadow-md ring-1 ring-amber-500/30'
                      : 'bg-white dark:bg-charcoal-800 border-chocolate-200/80 dark:border-chocolate-800 hover:border-amber-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 rounded-lg bg-chocolate-900 dark:bg-charcoal-900 text-amber-400 flex items-center justify-center font-mono font-bold text-xs">
                        {hive.id.replace('HIVE-', '#')}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-chocolate-900 dark:text-ivory-100">
                          {hive.name}
                        </h4>
                        <p className="text-[11px] text-chocolate-500">
                          {hive.queenStatus}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isWarning
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
                          : isAttention
                          ? 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300'
                          : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                      }`}
                    >
                      {hive.status.toUpperCase()}
                    </span>
                  </div>

                  {/* Sensor Mini-stats */}
                  <div className="mt-3 pt-3 border-t border-chocolate-100 dark:border-chocolate-700/60 grid grid-cols-3 gap-2 text-center text-xs">
                    <div>
                      <span className="text-[10px] text-chocolate-500 block">{t('common.temperature')}</span>
                      <span className="font-semibold text-chocolate-800 dark:text-ivory-200">{hive.temperature}°C</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-chocolate-500 block">{t('common.humidity')}</span>
                      <span className="font-semibold text-chocolate-800 dark:text-ivory-200">{hive.humidity}%</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-chocolate-500 block">{t('common.weight')}</span>
                      <span className="font-semibold text-amber-700 dark:text-amber-400">{hive.weight} kg</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Telemetry of Selected Hive */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-charcoal-800 border border-chocolate-200/80 dark:border-chocolate-800 shadow-soft space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-chocolate-100 dark:border-chocolate-700 gap-2">
              <div>
                <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                  {selectedHive.id} • Digital Twin Record
                </span>
                <h3 className="text-xl font-bold text-chocolate-900 dark:text-ivory-100">
                  {selectedHive.name}
                </h3>
              </div>
              <div className="text-xs text-chocolate-500">
                Last synchronized: <strong className="text-chocolate-800 dark:text-ivory-200">{selectedHive.lastSync}</strong>
              </div>
            </div>

            {/* Gauges Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div className="p-4 rounded-xl bg-ivory-50 dark:bg-charcoal-900/60 border border-chocolate-200/50 dark:border-chocolate-700">
                <div className="flex items-center space-x-2 text-xs font-semibold text-chocolate-600 dark:text-chocolate-400 mb-1">
                  <Thermometer className="w-4 h-4 text-amber-600" />
                  <span>{t('common.temperature')}</span>
                </div>
                <div className="text-2xl font-extrabold text-chocolate-900 dark:text-ivory-100">
                  {selectedHive.temperature}°C
                </div>
                <span className="text-[10px] text-emerald-600 font-medium">Optimal 33-36°C</span>
              </div>

              <div className="p-4 rounded-xl bg-ivory-50 dark:bg-charcoal-900/60 border border-chocolate-200/50 dark:border-chocolate-700">
                <div className="flex items-center space-x-2 text-xs font-semibold text-chocolate-600 dark:text-chocolate-400 mb-1">
                  <Droplets className="w-4 h-4 text-cyan-600" />
                  <span>{t('common.humidity')}</span>
                </div>
                <div className="text-2xl font-extrabold text-chocolate-900 dark:text-ivory-100">
                  {selectedHive.humidity}%
                </div>
                <span className="text-[10px] text-emerald-600 font-medium">Optimal 50-65%</span>
              </div>

              <div className="p-4 rounded-xl bg-ivory-50 dark:bg-charcoal-900/60 border border-chocolate-200/50 dark:border-chocolate-700">
                <div className="flex items-center space-x-2 text-xs font-semibold text-chocolate-600 dark:text-chocolate-400 mb-1">
                  <Scale className="w-4 h-4 text-amber-600" />
                  <span>{t('common.weight')}</span>
                </div>
                <div className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">
                  {selectedHive.weight} kg
                </div>
                <span className="text-[10px] text-chocolate-500 font-medium">+0.3 kg / 24h</span>
              </div>
            </div>

            {/* Sparkline Charts */}
            <div className="space-y-4 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-chocolate-700 dark:text-chocolate-300">
                {t('dashboard.chartsSection')}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SensorSparkline
                  data={selectedHive.history}
                  dataKey="temp"
                  color="#D97706"
                  unit="°C"
                  title={isHindi ? 'तापमान रुझान (24h)' : 'Internal Brood Temp (°C)'}
                />
                <SensorSparkline
                  data={selectedHive.history}
                  dataKey="humidity"
                  color="#0284C7"
                  unit="%"
                  title={isHindi ? 'आर्द्रता रुझान (24h)' : 'Relative Humidity (%)'}
                />
              </div>

              <SensorSparkline
                data={selectedHive.history}
                dataKey="weight"
                color="#059669"
                unit="kg"
                title={isHindi ? 'छत्ते का वजन रुझान (24h)' : 'Gross Colony Weight (kg)'}
              />
            </div>

            {/* Quick Actions Shortcuts */}
            <div className="pt-4 border-t border-chocolate-100 dark:border-chocolate-700 flex flex-wrap gap-3">
              <Link
                to="/smart-hive"
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-chocolate-900 dark:bg-amber-600 text-white text-xs font-semibold hover:bg-chocolate-800 transition-colors"
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>{isHindi ? 'लाइव IoT टेलीमेट्री देखें' : 'View Live IoT Telemetry'}</span>
              </Link>

              <Link
                to="/ai-analysis"
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-ivory-200 dark:bg-charcoal-700 text-chocolate-900 dark:text-ivory-100 text-xs font-semibold hover:bg-ivory-300 transition-colors"
              >
                <span>{isHindi ? 'AI रोग जांच चलाएं' : 'Run AI Disease Analysis'}</span>
              </Link>

              <Link
                to="/harvest"
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-semibold hover:bg-amber-500/25 transition-colors"
              >
                <span>{isHindi ? 'शहद बैच बनाएं' : 'Create Honey Batch'}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Add Hive Modal */}
      {showAddHiveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-chocolate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-charcoal-800 rounded-3xl border border-chocolate-200 dark:border-chocolate-700 p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-chocolate-900 dark:text-ivory-100">
              {isHindi ? 'नया छत्ता पंजीकृत करें' : 'Register New Smart Hive'}
            </h3>
            <p className="text-xs text-chocolate-600 dark:text-chocolate-300">
              {isHindi
                ? 'नया IoT नोड जोड़ें और DHT22/वजन सेंसर से कनेक्ट करें।'
                : 'Add a new hive box and pair its ESP32 IoT microcontroller sensor node.'}
            </p>

            <form onSubmit={handleAddHive} className="space-y-3 pt-2">
              <div>
                <label className="text-xs font-semibold text-chocolate-700 dark:text-chocolate-300 block mb-1">
                  {isHindi ? 'छत्ते का नाम' : 'Hive Box Name / Identifier'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Deodar Hive #05"
                  value={newHiveName}
                  onChange={(e) => setNewHiveName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-chocolate-200 dark:border-chocolate-700 bg-ivory-50 dark:bg-charcoal-900 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-chocolate-700 dark:text-chocolate-300 block mb-1">
                  {isHindi ? 'रानी मक्खी की स्थिति' : 'Queen Bee Status'}
                </label>
                <select
                  value={newHiveQueen}
                  onChange={(e) => setNewHiveQueen(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-chocolate-200 dark:border-chocolate-700 bg-ivory-50 dark:bg-charcoal-900 text-sm focus:outline-none focus:border-amber-500"
                >
                  <option value="Active & Laying">Active & Laying (सक्रिय)</option>
                  <option value="New Virgin Queen">New Virgin Queen (नई रानी)</option>
                  <option value="Queenless Alert">Queenless Alert (रानी विहीन)</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddHiveModal(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl border border-chocolate-300 dark:border-chocolate-700 text-chocolate-700 dark:text-chocolate-300 hover:bg-ivory-100"
                >
                  {t('common.cancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-amber-600 text-white hover:bg-amber-700"
                >
                  {isHindi ? 'पंजीकृत करें' : 'Register Hive'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
