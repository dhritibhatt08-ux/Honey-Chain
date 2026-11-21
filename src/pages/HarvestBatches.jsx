import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  QrCode,
  ShieldCheck,
  Search,
  Filter,
  Download,
  ExternalLink,
  Droplet,
  FileText,
  CheckCircle2,
  AlertTriangle,
  X,
  Layers
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { sampleBatches } from '../data/sampleBatches';
import { QRCodeDisplay } from '../components/common/QRCodeDisplay';

export const HarvestBatches = () => {
  const { t, isHindi } = useLanguage();
  const [batches, setBatches] = useState(sampleBatches);
  const [searchQuery, setSearchQuery] = useState('');
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [selectedBatchForQR, setSelectedBatchForQR] = useState(null);

  // New Batch Form State
  const [formData, setFormData] = useState({
    batchId: `HC-2026-B${Math.floor(1000 + Math.random() * 9000)}`,
    harvestDate: new Date().toISOString().split('T')[0],
    beekeeperName: 'Sohan Lal Verma',
    apiaryLocation: 'Kullu Valley, Himachal Pradesh',
    sourceHives: 'HIVE-01, HIVE-03',
    floraType: 'Wild Himalayan Multifloral',
    quantityKg: 65.0,
    moisture: 17.5,
    hmf: 12.0,
    c4Test: 'NEGATIVE (0.0% foreign sugar)',
    pollenCount: 82000,
    notes: 'Centrifugally extracted below 36°C'
  });

  const filteredBatches = batches.filter(b =>
    b.batchId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.beekeeper.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRegisterBatch = (e) => {
    e.preventDefault();

    const newBatch = {
      batchId: formData.batchId,
      productName: `${formData.floraType} Honey`,
      productNameHi: `${formData.floraType} शहद`,
      netWeight: `${formData.quantityKg} kg bulk`,
      status: 'verified',
      harvestDate: formData.harvestDate,
      processingDate: formData.harvestDate,
      packagingDate: formData.harvestDate,
      beekeeper: {
        name: formData.beekeeperName,
        nameHi: formData.beekeeperName,
        id: `NBHM-HP-${Math.floor(1000 + Math.random() * 9000)}`,
        cooperative: 'District Apiculture Cooperative',
        cooperativeHi: 'जिला मधुमक्खी पालन सहकारी समिति',
        village: formData.apiaryLocation,
        state: 'Himachal Pradesh',
        latitude: '31.9579° N',
        longitude: '77.1095° E',
        experienceYears: 10,
        hivesCount: 20
      },
      floraSource: formData.floraType,
      floraSourceHi: formData.floraType,
      hives: formData.sourceHives.split(',').map(s => s.trim()),
      quantityHarvested: +formData.quantityKg,
      labTests: {
        certifiedBy: 'FSSAI Regional Food Testing Lab',
        certifiedByHi: 'FSSAI क्षेत्रीय खाद्य परीक्षण प्रयोगशाला',
        testReportId: `FSSAI-LAB-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        moistureContent: +formData.moisture,
        moistureStatus: 'PASS (Standard: ≤20%)',
        hmfLevel: +formData.hmf,
        hmfStatus: 'PASS (Standard: ≤80 mg/kg)',
        sucrosePercent: 2.1,
        sucroseStatus: 'PASS (Standard: ≤5.0%)',
        c4SugarSyrupTest: formData.c4Test,
        c4Status: 'PASS (Authentic)',
        pollenCountPerGram: +formData.pollenCount,
        pollenStatus: 'PASS (Pure Flora)',
        diastaseActivity: 18.0,
        diastaseStatus: 'PASS'
      },
      blockchain: {
        network: 'HoneyChain Private Ledger (Cosmos SDK / CometBFT)',
        blockHeight: 10842 + batches.length,
        txHash: `0x${Math.random().toString(16).substring(2, 34)}${Math.random().toString(16).substring(2, 34)}`,
        merkleRoot: '0x3a9f02...11cd',
        consensusNodes: 4,
        timestamp: new Date().toISOString(),
        smartContract: '0xHoneyChainBatchRegistryV2'
      },
      supplyChainJourney: [
        {
          step: 'Apiary Harvest Logged',
          stepHi: 'छत्ते से कटाई पंजीकृत',
          date: `${formData.harvestDate} 08:30 AM`,
          location: formData.apiaryLocation,
          operator: formData.beekeeperName,
          txHash: '0xminted...hash',
          verified: true,
          details: 'Initial harvest batch created and submitted to CometBFT ledger'
        }
      ]
    };

    setBatches([newBatch, ...batches]);
    setShowRegisterModal(false);
    // Show QR modal for newly registered batch
    setSelectedBatchForQR(newBatch.batchId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Title & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-chocolate-200/60 dark:border-chocolate-800">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-chocolate-900 dark:text-ivory-50 tracking-tight">
              {t('harvest.title')}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/30">
              Batch Registry
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-chocolate-600 dark:text-chocolate-300">
            {t('harvest.subtitle')}
          </p>
        </div>

        <button
          onClick={() => {
            setFormData(prev => ({
              ...prev,
              batchId: `HC-2026-B${Math.floor(1000 + Math.random() * 9000)}`
            }));
            setShowRegisterModal(true);
          }}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs sm:text-sm shadow-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>{t('harvest.newBatchBtn')}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-chocolate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={isHindi ? 'बैच संख्या, पालक या उत्पाद खोजें...' : 'Search batch ID, beekeeper, product...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-chocolate-200 dark:border-chocolate-700 bg-white dark:bg-charcoal-800 text-xs sm:text-sm focus:outline-none focus:border-amber-500 shadow-sm"
          />
        </div>

        <div className="text-xs text-chocolate-500">
          Showing <strong>{filteredBatches.length}</strong> registered batches
        </div>
      </div>

      {/* Batches Table & Cards */}
      <div className="rounded-3xl bg-white dark:bg-charcoal-800 border border-chocolate-200/80 dark:border-chocolate-800 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-ivory-50 dark:bg-charcoal-900 border-b border-chocolate-100 dark:border-chocolate-700/60 text-chocolate-600 dark:text-chocolate-400 uppercase font-semibold">
              <tr>
                <th className="py-3.5 px-4">{t('harvest.table.batchId')}</th>
                <th className="py-3.5 px-4">{t('harvest.table.date')}</th>
                <th className="py-3.5 px-4">{t('harvest.table.beekeeper')}</th>
                <th className="py-3.5 px-4">{t('harvest.table.flora')}</th>
                <th className="py-3.5 px-4">{t('harvest.table.quantity')}</th>
                <th className="py-3.5 px-4">{t('harvest.table.labStatus')}</th>
                <th className="py-3.5 px-4">{t('harvest.table.blockchainStatus')}</th>
                <th className="py-3.5 px-4 text-right">{t('harvest.table.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-chocolate-100 dark:divide-chocolate-700/60">
              {filteredBatches.map((batch) => {
                const isFlagged = batch.status === 'flagged_counterfeit';
                return (
                  <tr
                    key={batch.batchId}
                    className="hover:bg-ivory-50/50 dark:hover:bg-charcoal-700/40 transition-colors"
                  >
                    <td className="py-4 px-4 font-mono font-bold text-chocolate-900 dark:text-ivory-100">
                      {batch.batchId}
                    </td>

                    <td className="py-4 px-4 text-chocolate-600 dark:text-chocolate-300">
                      {batch.harvestDate}
                    </td>

                    <td className="py-4 px-4">
                      <div className="font-semibold text-chocolate-900 dark:text-ivory-100">
                        {isHindi ? batch.beekeeper.nameHi : batch.beekeeper.name}
                      </div>
                      <div className="text-[10px] text-chocolate-500">{batch.beekeeper.village}</div>
                    </td>

                    <td className="py-4 px-4 text-chocolate-700 dark:text-chocolate-200">
                      {isHindi ? batch.floraSourceHi : batch.floraSource}
                    </td>

                    <td className="py-4 px-4 font-semibold text-amber-700 dark:text-amber-400">
                      {batch.quantityHarvested} kg
                    </td>

                    <td className="py-4 px-4">
                      {isFlagged ? (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300">
                          <AlertTriangle className="w-3 h-3" />
                          <span>FAILED (C4 ALERT)</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>FSSAI PASSED</span>
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-4 font-mono text-[11px] text-chocolate-500">
                      {isFlagged ? (
                        <span className="text-rose-600 font-semibold">REVOKED ON-CHAIN</span>
                      ) : (
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                          Block #{batch.blockchain.blockHeight}
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedBatchForQR(batch.batchId)}
                        className="inline-flex items-center space-x-1 px-2.5 py-1 text-xs rounded-lg border border-chocolate-200 dark:border-chocolate-700 hover:border-amber-500 text-chocolate-800 dark:text-ivory-200 font-medium transition-colors"
                        title="Generate QR Badge"
                      >
                        <QrCode className="w-3.5 h-3.5 text-amber-600" />
                        <span>QR</span>
                      </button>

                      <Link
                        to={`/verify?batch=${batch.batchId}`}
                        className="inline-flex items-center space-x-1 px-2.5 py-1 text-xs rounded-lg bg-amber-500/15 text-amber-800 dark:text-amber-300 hover:bg-amber-500/25 font-semibold transition-colors"
                      >
                        <span>{t('common.details')}</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Register New Batch Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-chocolate-950/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
          <div className="bg-white dark:bg-charcoal-800 rounded-3xl border border-chocolate-200 dark:border-chocolate-700 p-6 max-w-xl w-full shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-chocolate-100 dark:border-chocolate-700">
              <h3 className="text-lg font-bold text-chocolate-900 dark:text-ivory-100">
                {t('harvest.form.submitBatch')}
              </h3>
              <button
                onClick={() => setShowRegisterModal(false)}
                className="p-1 rounded-lg text-chocolate-500 hover:bg-ivory-100 dark:hover:bg-charcoal-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRegisterBatch} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-chocolate-700 dark:text-chocolate-300 block mb-1">
                    {t('harvest.form.batchId')}
                  </label>
                  <input
                    type="text"
                    disabled
                    value={formData.batchId}
                    className="w-full px-3 py-2 rounded-xl border border-chocolate-200 dark:border-chocolate-700 bg-ivory-100 dark:bg-charcoal-900 font-mono font-bold text-amber-700 dark:text-amber-400"
                  />
                </div>

                <div>
                  <label className="font-semibold text-chocolate-700 dark:text-chocolate-300 block mb-1">
                    {t('harvest.form.harvestDate')}
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.harvestDate}
                    onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-chocolate-200 dark:border-chocolate-700 bg-ivory-50 dark:bg-charcoal-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-chocolate-700 dark:text-chocolate-300 block mb-1">
                    {t('harvest.form.beekeeperName')}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.beekeeperName}
                    onChange={(e) => setFormData({ ...formData, beekeeperName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-chocolate-200 dark:border-chocolate-700 bg-ivory-50 dark:bg-charcoal-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-chocolate-700 dark:text-chocolate-300 block mb-1">
                    {t('harvest.form.apiaryLocation')}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.apiaryLocation}
                    onChange={(e) => setFormData({ ...formData, apiaryLocation: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-chocolate-200 dark:border-chocolate-700 bg-ivory-50 dark:bg-charcoal-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-chocolate-700 dark:text-chocolate-300 block mb-1">
                    {t('harvest.form.floraType')}
                  </label>
                  <select
                    value={formData.floraType}
                    onChange={(e) => setFormData({ ...formData, floraType: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-chocolate-200 dark:border-chocolate-700 bg-ivory-50 dark:bg-charcoal-900 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Wild Himalayan Multifloral">Wild Himalayan Multifloral (हिमालयी बहुपुष्पीय)</option>
                    <option value="Kashmir White Acacia">Kashmir White Acacia (कश्मीर सफेद बबूल)</option>
                    <option value="Sundarbans Wild Mangrove">Sundarbans Wild Mangrove (सुंदरबन मैंग्रोव)</option>
                    <option value="Mustard / Brassica">Mustard / Brassica (सरसों)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-chocolate-700 dark:text-chocolate-300 block mb-1">
                    {t('harvest.form.quantityKg')}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formData.quantityKg}
                    onChange={(e) => setFormData({ ...formData, quantityKg: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-chocolate-200 dark:border-chocolate-700 bg-ivory-50 dark:bg-charcoal-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-chocolate-700 dark:text-chocolate-300 block mb-1">
                    {t('harvest.form.moisture')}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formData.moisture}
                    onChange={(e) => setFormData({ ...formData, moisture: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-chocolate-200 dark:border-chocolate-700 bg-ivory-50 dark:bg-charcoal-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-chocolate-700 dark:text-chocolate-300 block mb-1">
                    {t('harvest.form.hmf')}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formData.hmf}
                    onChange={(e) => setFormData({ ...formData, hmf: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-chocolate-200 dark:border-chocolate-700 bg-ivory-50 dark:bg-charcoal-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end space-x-2 border-t border-chocolate-100 dark:border-chocolate-700">
                <button
                  type="button"
                  onClick={() => setShowRegisterModal(false)}
                  className="px-4 py-2 rounded-xl border border-chocolate-300 dark:border-chocolate-700 font-semibold text-chocolate-700 dark:text-chocolate-300"
                >
                  {t('common.cancel')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-md"
                >
                  {t('harvest.form.submitBatch')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QR Code Inspection Modal */}
      {selectedBatchForQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-chocolate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-charcoal-800 rounded-3xl border border-chocolate-200 dark:border-chocolate-700 p-6 max-w-sm w-full shadow-2xl space-y-4 text-center">
            <div className="flex justify-between items-center pb-2 border-b border-chocolate-100 dark:border-chocolate-700">
              <h4 className="text-sm font-bold text-chocolate-900 dark:text-ivory-100">
                {isHindi ? 'बैच QR कोड सुरक्षा बैज' : 'Batch QR Security Stamp'}
              </h4>
              <button
                onClick={() => setSelectedBatchForQR(null)}
                className="p-1 rounded-lg text-chocolate-500 hover:bg-ivory-100 dark:hover:bg-charcoal-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <QRCodeDisplay value={selectedBatchForQR} size={200} />

            <div className="pt-2">
              <Link
                to={`/verify?batch=${selectedBatchForQR}`}
                onClick={() => setSelectedBatchForQR(null)}
                className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-colors"
              >
                <QrCode className="w-4 h-4" />
                <span>{isHindi ? 'उपभोक्ता पोर्टल में टेस्ट करें' : 'Test in Consumer Portal'}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
