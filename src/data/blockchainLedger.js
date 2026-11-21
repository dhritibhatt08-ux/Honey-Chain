export const validatorNodes = [
  { id: 'node-01', name: 'National Bee Board (NBB / NBHM) Authority Node', role: 'Regulatory Genesis Validator', location: 'New Delhi, IN', uptime: '99.98%', votingPower: '30%' },
  { id: 'node-02', name: 'FSSAI Central Quality Testing Node', role: 'Laboratory Compliance Validator', location: 'Ghaziabad, IN', uptime: '99.95%', votingPower: '25%' },
  { id: 'node-03', name: 'Himachal State Apiculture Federation Node', role: 'Producer Cooperative Validator', location: 'Shimla, IN', uptime: '99.91%', votingPower: '25%' },
  { id: 'node-04', name: 'HiveNova Network Gateway Consensus Node', role: 'Protocol & IoT Validator', location: 'Bangalore, IN', uptime: '99.99%', votingPower: '20%' },
];

export const initialBlockTransactions = [
  {
    txHash: '0x8f3c7e9142b6a089de415b3c882194f10738a5b299e1c3b4a28f8014529a9ce8',
    blockHeight: 10842,
    timestamp: '2026-10-24 14:32:00',
    batchId: 'HC-2026-HIMA-081',
    event: 'BATCH_PACKAGED_AND_SEALED',
    eventHi: 'बैच पैकेजिंग एवं सील प्रमाणन',
    signer: '0x44fa92...88c1 (HiveNova Bottling Unit)',
    gasUsed: '21,040 gwei',
    status: 'CONFIRMED_COMMITTED',
    payloadHash: 'sha256:77a1bc8942...f098'
  },
  {
    txHash: '0x9a4d81774b12c890f421b899a12849c0182419ef8914b100293481239aa81234',
    blockHeight: 10839,
    timestamp: '2026-10-21 11:00:00',
    batchId: 'HC-2026-HIMA-081',
    event: 'COLD_FILTRATION_COMPLETED',
    eventHi: 'कोल्ड फिल्ट्रेशन पूर्ण',
    signer: '0x8891ac...3321 (Solan Hub)',
    gasUsed: '21,040 gwei',
    status: 'CONFIRMED_COMMITTED',
    payloadHash: 'sha256:49c018...9ef8'
  },
  {
    txHash: '0x7e2b10290c418934fa88190248abce9912034981290384710293847190283471',
    blockHeight: 10835,
    timestamp: '2026-10-20 14:15:00',
    batchId: 'HC-2026-HIMA-081',
    event: 'FSSAI_LAB_CERTIFICATION_ISSUED',
    eventHi: 'FSSAI लैब जांच प्रमाण पत्र जारी',
    signer: '0x55bc12...49e0 (FSSAI Lab #ND-18)',
    gasUsed: '32,150 gwei',
    status: 'CONFIRMED_COMMITTED',
    payloadHash: 'sha256:120349...9812'
  },
  {
    txHash: '0x3c99a277fa091823901482930184910293840192834019283401928340192834',
    blockHeight: 10830,
    timestamp: '2026-10-18 09:30:00',
    batchId: 'HC-2026-HIMA-081',
    event: 'APIARY_HARVEST_LOGGED',
    eventHi: 'छत्ते से कटाई पंजीकृत',
    signer: '0x991024...811a (Parvati Cooperative)',
    gasUsed: '21,040 gwei',
    status: 'CONFIRMED_COMMITTED',
    payloadHash: 'sha256:840192...8340'
  },
  {
    txHash: '0x5a18c9f0293eb774a129038fc99a182740bcda6302917734ea01994bb2e89123',
    blockHeight: 10419,
    timestamp: '2026-09-30 10:14:00',
    batchId: 'HC-2026-KASH-114',
    event: 'BATCH_PACKAGED_AND_SEALED',
    eventHi: 'बैच पैकेजिंग एवं सील प्रमाणन',
    signer: '0x129038...bcda (Kashmir Hub)',
    gasUsed: '21,040 gwei',
    status: 'CONFIRMED_COMMITTED',
    payloadHash: 'sha256:bcda63...0291'
  },
  {
    txHash: '0x17d2bb9047ea610294fc89a7738291049281aabf892104928103947bca889214',
    blockHeight: 10594,
    timestamp: '2026-10-09 08:20:00',
    batchId: 'HC-2026-SUND-042',
    event: 'BATCH_PACKAGED_AND_SEALED',
    eventHi: 'बैच पैकेजिंग एवं सील प्रमाणन',
    signer: '0x492810...aabf (Sundarbans Hub)',
    gasUsed: '21,040 gwei',
    status: 'CONFIRMED_COMMITTED',
    payloadHash: 'sha256:aabf89...2104'
  }
];
