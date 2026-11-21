import React, { useState, useEffect } from 'react';
import {
  Cpu,
  Thermometer,
  Droplets,
  Scale,
  Camera,
  Wifi,
  BatteryCharging,
  AlertTriangle,
  CheckCircle2,
  Play,
  Pause,
  RefreshCw,
  Info,
  Clock,
  ShieldAlert
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { sampleHives } from '../data/sampleHives';
import { SensorSparkline } from '../components/common/SensorSparkline';

export const SmartHive = () => {
  const { t, isHindi } = useLanguage();
  const [selectedHive, setSelectedHive] = useState(sampleHives[0]);
  const [isSimulating, setIsSimulating] = useState(true);
  const [lastPacketTime, setLastPacketTime] = useState(new Date().toLocaleTimeString());
  const [camSnapshotTime, setCamSnapshotTime] = useState('14:20:00 (Auto-Captured)');

  // Telemetry live state
  const [temp, setTemp] = useState(selectedHive.temperature);
  const [humidity, setHumidity] = useState(selectedHive.humidity);
  const [weight, setWeight] = useState(selectedHive.weight);
  const [battery, setBattery] = useState(selectedHive.battery);
  const [wifiRssi, setWifiRssi] = useState(selectedHive.signal);
  const [telemetryHistory, setTelemetryHistory] = useState(selectedHive.history);

  // Simulation interval for real-time demonstration
  useEffect(() => {
    let timer = null;
    if (isSimulating) {
      timer = setInterval(() => {
        // Minor natural sensor jitter
        const tempDelta = (Math.random() * 0.2 - 0.1);
        const humDelta = (Math.random() * 0.4 - 0.2);
        const weightDelta = (Math.random() * 0.04 - 0.02);

        setTemp(prev => +(prev + tempDelta).toFixed(1));
        setHumidity(prev => +(prev + humDelta).toFixed(1));
        setWeight(prev => +(prev + weightDelta).toFixed(2));
        setLastPacketTime(new Date().toLocaleTimeString());

        // Update history
        setTelemetryHistory(prev => {
          const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const updated = [...prev.slice(1), {
            time: now,
            temp: +(temp + tempDelta).toFixed(1),
            humidity: +(humidity + humDelta).toFixed(1),
            weight: +(weight + weightDelta).toFixed(2)
          }];
          return updated;
        });
      }, 2500);
    }
    return () => clearInterval(timer);
  }, [isSimulating, temp, humidity, weight]);

  const handleHiveChange = (hiveId) => {
    const h = sampleHives.find(x => x.id === hiveId) || sampleHives[0];
    setSelectedHive(h);
    setTemp(h.temperature);
    setHumidity(h.humidity);
    setWeight(h.weight);
    setBattery(h.battery);
    setWifiRssi(h.signal);
    setTelemetryHistory(h.history);
  };

  const handleCaptureSnapshot = () => {
    setCamSnapshotTime(`${new Date().toLocaleTimeString()} (Manual Snap)`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Title & Distinction Notice */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-chocolate-200/60 dark:border-chocolate-800">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-chocolate-900 dark:text-ivory-50 tracking-tight">
              {t('smartHive.title')}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30">
              ESP32 MQTT Node
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-chocolate-600 dark:text-chocolate-300">
            {t('smartHive.subtitle')}
          </p>
        </div>

        {/* Live Simulator Toggle Switch */}
        <div className="flex items-center space-x-3 bg-white dark:bg-charcoal-800 px-4 py-2 rounded-2xl border border-chocolate-200 dark:border-chocolate-700 shadow-sm">
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold text-chocolate-500 block">
              {isHindi ? 'लाइव सिमुलेटर' : 'Simulation Stream'}
            </span>
            <span className="text-xs font-bold text-chocolate-900 dark:text-ivory-100 flex items-center space-x-1.5">
              <span className={`w-2 h-2 rounded-full ${isSimulating ? 'bg-emerald-500 animate-pulse' : 'bg-chocolate-400'}`}></span>
              <span>{isSimulating ? t('smartHive.simActive') : t('smartHive.simPaused')}</span>
            </span>
          </div>

          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className={`p-2 rounded-xl text-white font-semibold text-xs shadow-sm transition-colors ${
              isSimulating ? 'bg-amber-600 hover:bg-amber-700' : 'bg-chocolate-700 hover:bg-chocolate-800'
            }`}
            title="Start/Pause live data feed"
          >
            {isSimulating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Demonstration Data Transparency Notice */}
      <div className="p-3.5 rounded-2xl bg-amber-500/10 dark:bg-charcoal-800 border border-amber-500/30 flex items-center justify-between text-xs text-amber-900 dark:text-amber-200">
        <div className="flex items-center space-x-2">
          <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
          <span>
            <strong>{t('common.demoMode')}:</strong> {t('common.demoNotice')} (DHT22 / HX711 simulated telemetry stream).
          </span>
        </div>
        <div className="text-[11px] font-mono text-chocolate-600 dark:text-chocolate-400 hidden sm:block">
          Packet Interval: 2.5s • Last: {lastPacketTime}
        </div>
      </div>

      {/* Hive Selector Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {sampleHives.map(hive => (
          <button
            key={hive.id}
            onClick={() => handleHiveChange(hive.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
              selectedHive.id === hive.id
                ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                : 'bg-white dark:bg-charcoal-800 text-chocolate-800 dark:text-ivory-200 border-chocolate-200 dark:border-chocolate-700 hover:border-amber-400'
            }`}
          >
            {hive.name} ({hive.id})
          </button>
        ))}
      </div>

      {/* 4 Sensor Telemetry Hardware Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Sensor 1: DHT22 Temperature */}
        <div className="p-5 rounded-3xl bg-white dark:bg-charcoal-800 border border-chocolate-200/80 dark:border-chocolate-800 shadow-soft space-y-3">
          <div className="flex items-center justify-between">
            <span className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600">
              <Thermometer className="w-5 h-5" />
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600">
              DHT22 SENSOR
            </span>
          </div>

          <div>
            <span className="text-xs font-semibold text-chocolate-600 dark:text-chocolate-400 block">
              {t('smartHive.metrics.ambientTemp')}
            </span>
            <div className="text-3xl font-extrabold text-chocolate-900 dark:text-ivory-100 mt-1">
              {temp}°C
            </div>
          </div>

          <div className="pt-2 border-t border-chocolate-100 dark:border-chocolate-700/60 text-[11px] text-chocolate-500 space-y-1">
            <div className="flex justify-between">
              <span>Optimal Incubation:</span>
              <span className="font-semibold text-chocolate-700 dark:text-ivory-200">33.0°C - 36.0°C</span>
            </div>
            <div className="flex justify-between">
              <span>Sampling Cycle:</span>
              <span className="font-mono text-chocolate-700 dark:text-ivory-200">Every 20 mins</span>
            </div>
          </div>
        </div>

        {/* Sensor 2: DHT22 Humidity */}
        <div className="p-5 rounded-3xl bg-white dark:bg-charcoal-800 border border-chocolate-200/80 dark:border-chocolate-800 shadow-soft space-y-3">
          <div className="flex items-center justify-between">
            <span className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-600">
              <Droplets className="w-5 h-5" />
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600">
              DHT22 SENSOR
            </span>
          </div>

          <div>
            <span className="text-xs font-semibold text-chocolate-600 dark:text-chocolate-400 block">
              {t('smartHive.metrics.ambientHumidity')}
            </span>
            <div className="text-3xl font-extrabold text-chocolate-900 dark:text-ivory-100 mt-1">
              {humidity}%
            </div>
          </div>

          <div className="pt-2 border-t border-chocolate-100 dark:border-chocolate-700/60 text-[11px] text-chocolate-500 space-y-1">
            <div className="flex justify-between">
              <span>Optimal Wax Plasticity:</span>
              <span className="font-semibold text-chocolate-700 dark:text-ivory-200">50% - 65%</span>
            </div>
            <div className="flex justify-between">
              <span>Condensation Risk:</span>
              <span className="font-semibold text-emerald-600">Low / Safe</span>
            </div>
          </div>
        </div>

        {/* Sensor 3: Load Cell + HX711 */}
        <div className="p-5 rounded-3xl bg-white dark:bg-charcoal-800 border border-chocolate-200/80 dark:border-chocolate-800 shadow-soft space-y-3">
          <div className="flex items-center justify-between">
            <span className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600">
              <Scale className="w-5 h-5" />
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600">
              LOAD CELL + HX711
            </span>
          </div>

          <div>
            <span className="text-xs font-semibold text-chocolate-600 dark:text-chocolate-400 block">
              {t('smartHive.metrics.totalWeight')}
            </span>
            <div className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">
              {weight} kg
            </div>
          </div>

          <div className="pt-2 border-t border-chocolate-100 dark:border-chocolate-700/60 text-[11px] text-chocolate-500 space-y-1">
            <div className="flex justify-between">
              <span>Sensor Resolution:</span>
              <span className="font-mono text-chocolate-700 dark:text-ivory-200">24-bit ADC (±10g)</span>
            </div>
            <div className="flex justify-between">
              <span>Daily Nectar Accumulation:</span>
              <span className="font-semibold text-emerald-600">+0.32 kg</span>
            </div>
          </div>
        </div>

        {/* Sensor 4: ESP32 Diagnostics */}
        <div className="p-5 rounded-3xl bg-white dark:bg-charcoal-800 border border-chocolate-200/80 dark:border-chocolate-800 shadow-soft space-y-3">
          <div className="flex items-center justify-between">
            <span className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600">
              <Cpu className="w-5 h-5" />
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-600">
              ESP32 NODE
            </span>
          </div>

          <div>
            <span className="text-xs font-semibold text-chocolate-600 dark:text-chocolate-400 block">
              {t('smartHive.metrics.batteryLevel')}
            </span>
            <div className="text-3xl font-extrabold text-chocolate-900 dark:text-ivory-100 mt-1 flex items-baseline space-x-2">
              <span>{battery}%</span>
              <span className="text-xs font-semibold text-emerald-600">Solar Charging</span>
            </div>
          </div>

          <div className="pt-2 border-t border-chocolate-100 dark:border-chocolate-700/60 text-[11px] text-chocolate-500 space-y-1">
            <div className="flex justify-between">
              <span>Wi-Fi RSSI:</span>
              <span className="font-mono text-chocolate-700 dark:text-ivory-200">{wifiRssi} dBm (Good)</span>
            </div>
            <div className="flex justify-between">
              <span>MQTT Security:</span>
              <span className="font-semibold text-emerald-600">TLS 1.3 Encrypted</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Section: ESP32-CAM Visual Stream & Live Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: ESP32-CAM Hive Camera Feed */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-charcoal-800 border border-chocolate-200/80 dark:border-chocolate-800 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Camera className="w-4 h-4 text-amber-600" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-chocolate-800 dark:text-ivory-100">
                  {t('smartHive.liveStreamTitle')}
                </h3>
              </div>
              <button
                onClick={handleCaptureSnapshot}
                className="inline-flex items-center space-x-1 px-2.5 py-1 text-xs rounded-lg bg-ivory-200 dark:bg-charcoal-700 hover:bg-amber-100 text-chocolate-800 dark:text-ivory-200 font-semibold transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Snap Frame</span>
              </button>
            </div>

            {/* Simulated Hive Camera Frame Display */}
            <div className="relative rounded-2xl overflow-hidden border border-chocolate-200 dark:border-chocolate-700 aspect-video bg-chocolate-950 flex items-center justify-center group">
              <img
                src="https://images.unsplash.com/photo-1473081556163-2a17de81fc97?auto=format&fit=crop&w=800&q=80"
                alt="Hive Frame Camera Feed"
                className="w-full h-full object-cover opacity-90 group-hover:scale-102 transition-transform duration-500"
              />

              {/* Camera Stream Overlay HUD */}
              <div className="absolute top-3 left-3 px-2 py-1 rounded bg-black/60 text-[10px] font-mono text-emerald-400 backdrop-blur-sm flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>ESP32-CAM • 1600x1200</span>
              </div>

              <div className="absolute top-3 right-3 px-2 py-1 rounded bg-black/60 text-[10px] font-mono text-amber-300 backdrop-blur-sm">
                IR Illumination: ON
              </div>

              <div className="absolute bottom-3 inset-x-3 p-2 rounded-lg bg-black/70 backdrop-blur-sm text-[11px] text-white flex justify-between items-center">
                <span>{camSnapshotTime}</span>
                <span className="text-emerald-400 font-semibold">Queen Detected</span>
              </div>
            </div>

            <p className="text-xs text-chocolate-600 dark:text-chocolate-300">
              {t('smartHive.frameInterval')}
            </p>
          </div>
        </div>

        {/* Right Column: Telemetry Graph & Edge Rules */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-charcoal-800 border border-chocolate-200/80 dark:border-chocolate-800 shadow-soft space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-chocolate-800 dark:text-ivory-100">
              Real-time Multi-Sensor Telemetry
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SensorSparkline
                data={telemetryHistory}
                dataKey="temp"
                color="#D97706"
                unit="°C"
                title={isHindi ? 'तापमान (DHT22)' : 'Brood Temperature (DHT22)'}
              />
              <SensorSparkline
                data={telemetryHistory}
                dataKey="humidity"
                color="#0284C7"
                unit="%"
                title={isHindi ? 'आर्द्रता (DHT22)' : 'Relative Humidity (DHT22)'}
              />
            </div>

            <SensorSparkline
              data={telemetryHistory}
              dataKey="weight"
              color="#059669"
              unit="kg"
              title={isHindi ? 'छत्ते का वजन (HX711)' : 'Colony Weight (Load Cell)'}
            />
          </div>

          {/* Edge Rules & Anomaly Detection */}
          <div className="p-6 rounded-3xl bg-white dark:bg-charcoal-800 border border-chocolate-200/80 dark:border-chocolate-800 shadow-soft space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-chocolate-700 dark:text-chocolate-300 flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>{t('smartHive.thresholds.title')}</span>
            </h4>

            <ul className="space-y-2 text-xs text-chocolate-700 dark:text-chocolate-300">
              <li className="flex items-center justify-between p-2.5 rounded-xl bg-ivory-50 dark:bg-charcoal-900 border border-chocolate-100 dark:border-chocolate-700">
                <span>{t('smartHive.thresholds.rule1')}</span>
                <span className="font-semibold text-emerald-600">NORMAL</span>
              </li>
              <li className="flex items-center justify-between p-2.5 rounded-xl bg-ivory-50 dark:bg-charcoal-900 border border-chocolate-100 dark:border-chocolate-700">
                <span>{t('smartHive.thresholds.rule2')}</span>
                <span className="font-semibold text-emerald-600">NORMAL</span>
              </li>
              <li className="flex items-center justify-between p-2.5 rounded-xl bg-ivory-50 dark:bg-charcoal-900 border border-chocolate-100 dark:border-chocolate-700">
                <span>{t('smartHive.thresholds.rule3')}</span>
                <span className="font-semibold text-amber-600">ARMED</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
