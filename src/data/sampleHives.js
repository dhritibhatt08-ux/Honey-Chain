export const sampleApiaries = [
  { id: 'apiary-1', name: 'Valley Apiary #1 - Kullu, Himachal Pradesh', state: 'Himachal Pradesh', totalHives: 12, elevation: '1,220m' },
  { id: 'apiary-2', name: 'Orchard Apiary #2 - Anantnag, Kashmir', state: 'Jammu & Kashmir', totalHives: 8, elevation: '1,590m' },
  { id: 'apiary-3', name: 'Forest Apiary #3 - Tehri, Uttarakhand', state: 'Uttarakhand', totalHives: 10, elevation: '1,450m' },
];

export const sampleHives = [
  {
    id: 'HIVE-01',
    apiaryId: 'apiary-1',
    name: 'Cedar Hive #01',
    status: 'healthy',
    temperature: 34.6,
    humidity: 58.2,
    weight: 38.4,
    battery: 96,
    signal: -62,
    queenStatus: 'Active & Laying',
    lastSync: '2 minutes ago',
    alertMessage: null,
    history: [
      { time: '00:00', temp: 34.1, humidity: 60.5, weight: 37.8 },
      { time: '04:00', temp: 33.9, humidity: 62.1, weight: 37.8 },
      { time: '08:00', temp: 34.4, humidity: 59.0, weight: 37.9 },
      { time: '12:00', temp: 35.1, humidity: 56.4, weight: 38.1 },
      { time: '16:00', temp: 34.9, humidity: 57.8, weight: 38.3 },
      { time: '20:00', temp: 34.6, humidity: 58.2, weight: 38.4 }
    ]
  },
  {
    id: 'HIVE-02',
    apiaryId: 'apiary-1',
    name: 'Pine Hive #02',
    status: 'warning',
    temperature: 35.8,
    humidity: 64.0,
    weight: 32.1, // sudden drop from 34kg
    battery: 91,
    signal: -68,
    queenStatus: 'Swarm Activity Suspected',
    lastSync: '5 minutes ago',
    alertMessage: 'Sudden weight loss detected (-1.8 kg). Swarming or honey theft event alert.',
    history: [
      { time: '00:00', temp: 34.2, humidity: 59.2, weight: 33.9 },
      { time: '04:00', temp: 34.1, humidity: 60.1, weight: 33.9 },
      { time: '08:00', temp: 34.5, humidity: 58.0, weight: 34.0 },
      { time: '12:00', temp: 35.4, humidity: 61.2, weight: 33.8 },
      { time: '16:00', temp: 36.2, humidity: 65.0, weight: 32.1 },
      { time: '20:00', temp: 35.8, humidity: 64.0, weight: 32.1 }
    ]
  },
  {
    id: 'HIVE-03',
    apiaryId: 'apiary-1',
    name: 'Oak Hive #03',
    status: 'healthy',
    temperature: 34.8,
    humidity: 55.4,
    weight: 42.6,
    battery: 98,
    signal: -58,
    queenStatus: 'Active & Healthy',
    lastSync: 'Just now',
    alertMessage: null,
    history: [
      { time: '00:00', temp: 34.2, humidity: 57.0, weight: 41.8 },
      { time: '04:00', temp: 34.0, humidity: 58.2, weight: 41.9 },
      { time: '08:00', temp: 34.5, humidity: 56.1, weight: 42.1 },
      { time: '12:00', temp: 35.0, humidity: 54.3, weight: 42.3 },
      { time: '16:00', temp: 34.9, humidity: 55.0, weight: 42.5 },
      { time: '20:00', temp: 34.8, humidity: 55.4, weight: 42.6 }
    ]
  },
  {
    id: 'HIVE-04',
    apiaryId: 'apiary-1',
    name: 'Walnut Hive #04',
    status: 'attention',
    temperature: 36.7, // elevated
    humidity: 51.1,
    weight: 36.2,
    battery: 84,
    signal: -74,
    queenStatus: 'Heat Stress Risk',
    lastSync: '8 minutes ago',
    alertMessage: 'Internal temperature elevated (>36.5°C). Ensure hive shade and entrance aeration.',
    history: [
      { time: '00:00', temp: 34.8, humidity: 54.0, weight: 35.8 },
      { time: '04:00', temp: 34.5, humidity: 55.1, weight: 35.8 },
      { time: '08:00', temp: 35.2, humidity: 53.0, weight: 35.9 },
      { time: '12:00', temp: 36.4, humidity: 50.8, weight: 36.0 },
      { time: '16:00', temp: 36.9, humidity: 49.5, weight: 36.1 },
      { time: '20:00', temp: 36.7, humidity: 51.1, weight: 36.2 }
    ]
  }
];
