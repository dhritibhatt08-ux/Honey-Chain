export const aiDiagnosticSamples = [
  {
    id: 'sample-healthy',
    name: 'Healthy Brood Comb & Active Queen',
    nameHi: 'स्वस्थ छत्ता एवं सक्रिय रानी मक्खी',
    image: 'https://images.unsplash.com/photo-1473081556163-2a17de81fc97?auto=format&fit=crop&w=800&q=80',
    modelArchitecture: 'EfficientNet-B0 + OpenCV Preprocessing (Resize 224x224, Normalized)',
    healthIndex: 96.8,
    status: 'healthy',
    primaryDiagnosis: 'Optimal Colony Health (No Pathogens Detected)',
    primaryDiagnosisHi: 'उत्कृष्ट छत्ता स्वास्थ्य (कोई रोग या कीट नहीं)',
    confidence: 97.4,
    features: {
      cappingUniformity: '98.2% Regular Hexagonal Cappings',
      larvalAppearance: 'Pearlescent white, plump, healthy C-shape',
      miteCountPer100Bees: '0.2 (Well below 3.0 economic damage threshold)',
      combDensity: '89.4% Active brood area'
    },
    sensorCorrelation: {
      temperature: '34.6°C (Ideal brood nest incubation: 33-36°C)',
      humidity: '58.2% RH (Ideal wax plasticity & larval hydration)',
      status: 'Sensor telemetry confirms optimal physiological state'
    },
    yieldForecast: {
      estimatedKg: '18.5 - 22.0 kg',
      harvestWindowDays: '12 - 16 days',
      confidence: 94.2
    },
    advisory: {
      en: 'Maintain regular hive monitoring schedule. Add extra honey super chamber as comb storage capacity is approaching 85%. Ensure clean water source nearby.',
      hi: 'नियमित रूप से छत्ते की निगरानी जारी रखें। भंडारण क्षमता 85% के करीब पहुंच रही है, इसलिए अतिरिक्त सुपर चैंबर लगाएं। पास में साफ पानी की व्यवस्था रखें।'
    }
  },
  {
    id: 'sample-varroa',
    name: 'Varroa Destructor Mite Infestation',
    nameHi: 'वरोआ माइट परजीवी संक्रमण',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
    modelArchitecture: 'EfficientNet-B0 (Trained on Honeybee Hive Health Dataset)',
    healthIndex: 54.2,
    status: 'warning',
    primaryDiagnosis: 'Varroa Destructor Parasitic Mites Detected',
    primaryDiagnosisHi: 'वरोआ माइट परजीवी संक्रमण की पुष्टि',
    confidence: 95.8,
    features: {
      cappingUniformity: 'Perforated and sunken cell cappings detected',
      larvalAppearance: 'Deformed wing virus (DWV) markers on emerging worker bees',
      miteCountPer100Bees: '5.8 mites/100 bees (CRITICAL THRESHOLD EXCEEDED)',
      combDensity: '62.1% Reduced brood viability'
    },
    sensorCorrelation: {
      temperature: '35.8°C (Elevated nest temperature due to agitation)',
      humidity: '64.0% RH (Elevated humidity promotes mite reproduction)',
      status: 'Anomalous temperature spikes align with colony stress pattern'
    },
    yieldForecast: {
      estimatedKg: '6.0 - 8.5 kg (-55% reduction)',
      harvestWindowDays: 'Delayed (>30 days)',
      confidence: 88.5
    },
    advisory: {
      en: 'IMMEDIATE INTERVENTION REQUIRED: Install organic thymol or formic acid vapor strips immediately. Avoid synthetic chemicals during active nectar flow. Re-inspect colony after 7 days.',
      hi: 'तत्काल उपाय आवश्यक: छत्ते में तुरंत थाइमोल या फॉर्मिक एसिड स्ट्रिप्स लगाएं। शहद प्रवाह के दौरान रसायनों से बचें। 7 दिनों के बाद पुनः निरीक्षण करें।'
    }
  },
  {
    id: 'sample-foulbrood',
    name: 'American Foulbrood (Paenibacillus larvae)',
    nameHi: 'अमेरिकन फाउलब्रूड (AFB) जीवाणु रोग',
    image: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=800&q=80',
    modelArchitecture: 'EfficientNet-B0 Multi-Class Classification Head',
    healthIndex: 28.5,
    status: 'critical',
    primaryDiagnosis: 'Severe American Foulbrood (AFB) Bacterial Infection',
    primaryDiagnosisHi: 'गंभीर अमेरिकन फाउलब्रूड (AFB) जीवाणु संक्रमण',
    confidence: 96.1,
    features: {
      cappingUniformity: 'Dark, moist, deeply sunken cappings with puncture holes',
      larvalAppearance: 'Brown, ropy gelatinous brood residue (positive ropiness test)',
      miteCountPer100Bees: '1.2 mites (Secondary indicator)',
      combDensity: '34.0% Severely degraded brood area'
    },
    sensorCorrelation: {
      temperature: '32.1°C (Hypothermic nest due to mass larval mortality)',
      humidity: '72.5% RH (High microbial decay moisture)',
      status: 'Sharp sensor drop indicates dying colony core'
    },
    yieldForecast: {
      estimatedKg: '0.0 kg (Complete harvest loss)',
      harvestWindowDays: 'Colony Quarantined',
      confidence: 99.0
    },
    advisory: {
      en: 'STRICT QUARANTINE: Isolate this hive immediately to prevent spore transmission to neighboring apiaries. Do not transfer frames. Notify your regional NBHM apiculture extension officer.',
      hi: 'कड़ा क्वारंटाइन: अन्य छत्तों में संक्रमण फैलने से रोकने के लिए इस छत्ते को तुरंत अलग करें। कोई भी फ्रेम दूसरे बक्से में न बदलें। क्षेत्रीय सरकारी मधुमक्खी अधिकारी को सूचित करें।'
    }
  },
  {
    id: 'sample-chalkbrood',
    name: 'Chalkbrood Fungal Infection (Ascosphaera apis)',
    nameHi: 'चाकब्रूड फंगस संक्रमण (कवक रोग)',
    image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=800&q=80',
    modelArchitecture: 'EfficientNet-B0 + Anomaly Edge Detector',
    healthIndex: 68.0,
    status: 'warning',
    primaryDiagnosis: 'Moderate Chalkbrood Fungal Mummification',
    primaryDiagnosisHi: 'मध्यम चाकब्रूड फफूंद (कवक) संक्रमण',
    confidence: 93.6,
    features: {
      cappingUniformity: 'Hard, chalk-like white and grey mummies discarded at entrance',
      larvalAppearance: 'Hardened mummified larvae inside hexagonal cells',
      miteCountPer100Bees: '0.8 mites',
      combDensity: '71.5% Brood area'
    },
    sensorCorrelation: {
      temperature: '33.2°C (Sub-optimal incubation encourages fungal spore germination)',
      humidity: '74.2% RH (Excess dampness inside hive)',
      status: 'Excess humidity rule triggered on IoT dashboard'
    },
    yieldForecast: {
      estimatedKg: '11.0 - 13.5 kg (-25% impact)',
      harvestWindowDays: '20 - 24 days',
      confidence: 91.0
    },
    advisory: {
      en: 'Tilt hive box slightly forward to drain condensation. Elevate hive stand 12 inches above ground and clear surrounding vegetation to improve solar exposure and airflow.',
      hi: 'छत्ते के बक्से को थोड़ा आगे की ओर झुकाएं ताकि अंदर की नमी बाहर निकल सके। बक्से को जमीन से 12 इंच ऊपर रखें और धूप व हवा आने के लिए आसपास की घास साफ करें।'
    }
  }
];
