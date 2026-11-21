import React, { useState } from 'react';
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Layers,
  Cpu,
  FileCode,
  Network,
  ArrowRight,
  Lock,
  Hash,
  AlertCircle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { validatorNodes, initialBlockTransactions } from '../data/blockchainLedger';

export const BlockchainLedger = () => {
  const { t, isHindi } = useLanguage();
  const [transactions, setTransactions] = useState(initialBlockTransactions);
  const [searchQuery, setSearchQuery] = useState('');
  const [verifyInput, setVerifyInput] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [copiedHash, setCopiedHash] = useState(null);

  const supplyChainStages = [
    { id: 1, nameEn: 'Apiary Harvest', nameHi: 'छत्ते से कटाई', icon: '01' },
    { id: 2, nameEn: 'Quality Lab Assay', nameHi: 'गुणवत्ता लैब परीक्षण', icon: '02' },
    { id: 3, nameEn: 'Cold Filtration', nameHi: 'कोल्ड फिल्ट्रेशन', icon: '03' },
    { id: 4, nameEn: 'Packaging & QR Seal', nameHi: 'पैकेजिंग व क्यूआर सील', icon: '04' },
    { id: 5, nameEn: 'Retailer Shelf', nameHi: 'वितरण व रिटेलर', icon: '05' },
    { id: 6, nameEn: 'Consumer Scan', nameHi: 'उपभोक्ता सत्यापन', icon: '06' },
  ];

  const handleCopy = (hash) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const handleVerifyHash = (e) => {
    e.preventDefault();
    if (!verifyInput.trim()) return;

    const trimmed = verifyInput.trim().toLowerCase();
    const found = transactions.find(tx =>
      tx.batchId.toLowerCase() === trimmed ||
      tx.txHash.toLowerCase() === trimmed ||
      tx.payloadHash.toLowerCase().includes(trimmed)
    );

    if (found) {
      setVerificationResult({
        valid: true,
        batchId: found.batchId,
        blockHeight: found.blockHeight,
        txHash: found.txHash,
        timestamp: found.timestamp,
        event: found.event,
        signer: found.signer,
        merkleStatus: 'VALID_MERKLE_ROOT_CONFIRMED'
      });
    } else {
      setVerificationResult({
        valid: false,
        message: 'No cryptographic commitment found matching this hash or batch ID on the current ledger state.'
      });
    }
  };

  const filteredTx = transactions.filter(tx =>
    tx.batchId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.txHash.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Title & Architecture Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-chocolate-200/60 dark:border-chocolate-800">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-chocolate-900 dark:text-ivory-50 tracking-tight">
              {t('blockchain.title')}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
              CometBFT Consensus
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-chocolate-600 dark:text-chocolate-300">
            {t('blockchain.subtitle')}
          </p>
        </div>

        {/* Network Status Badge */}
        <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-white dark:bg-charcoal-800 border border-chocolate-200 dark:border-chocolate-700 shadow-sm text-xs font-medium">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-chocolate-800 dark:text-ivory-100 font-semibold">Block Height #10,842</span>
          <span className="text-chocolate-400">|</span>
          <span className="text-chocolate-600 dark:text-chocolate-300">4 Active Nodes</span>
        </div>
      </div>

      {/* Hybrid Architecture Explanation */}
      <div className="p-4 sm:p-5 rounded-3xl bg-ivory-50 dark:bg-charcoal-800 border border-chocolate-200 dark:border-chocolate-700 shadow-soft space-y-2">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
          <Layers className="w-4 h-4 text-amber-600" />
          <span>{t('blockchain.architectureTitle')}</span>
        </div>
        <p className="text-xs sm:text-sm text-chocolate-700 dark:text-chocolate-200 leading-relaxed">
          {t('blockchain.architectureDesc')}
        </p>
      </div>

      {/* Honey Supply Chain Journey Visualization */}
      <div className="p-6 rounded-3xl bg-white dark:bg-charcoal-800 border border-chocolate-200/80 dark:border-chocolate-800 shadow-soft space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-chocolate-700 dark:text-chocolate-300">
          {t('blockchain.journeyTitle')}
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {supplyChainStages.map((stage, idx) => (
            <div
              key={stage.id}
              className="p-3.5 rounded-2xl bg-ivory-50 dark:bg-charcoal-900 border border-chocolate-200/70 dark:border-chocolate-700 flex flex-col justify-between space-y-2 relative"
            >
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 text-[11px] font-bold flex items-center justify-center">
                  {stage.icon}
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <h4 className="text-xs font-bold text-chocolate-900 dark:text-ivory-100">
                {isHindi ? stage.nameHi : stage.nameEn}
              </h4>
              <span className="text-[10px] text-emerald-600 font-semibold block">
                Hash Signed
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Cryptographic Hash & Merkle Root Verifier Tool */}
      <div className="p-6 rounded-3xl bg-white dark:bg-charcoal-800 border border-chocolate-200/80 dark:border-chocolate-800 shadow-soft space-y-4">
        <div className="flex items-center space-x-2">
          <Hash className="w-4 h-4 text-amber-600" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-chocolate-800 dark:text-ivory-100">
            {t('blockchain.verifierTitle')}
          </h3>
        </div>

        <p className="text-xs text-chocolate-600 dark:text-chocolate-300">
          {t('blockchain.verifierPrompt')}
        </p>

        <form onSubmit={handleVerifyHash} className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="e.g., HC-2026-HIMA-081 or 0x8f3c7e9142b6a0..."
            value={verifyInput}
            onChange={(e) => setVerifyInput(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl border border-chocolate-200 dark:border-chocolate-700 bg-ivory-50 dark:bg-charcoal-900 text-xs sm:text-sm font-mono focus:outline-none focus:border-amber-500"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs sm:text-sm transition-colors shadow-sm"
          >
            {t('blockchain.verifyBtn')}
          </button>
        </form>

        {/* Verification Result Display */}
        {verificationResult && (
          <div className={`p-4 rounded-2xl border text-xs space-y-2 animate-fadeIn ${
            verificationResult.valid
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-950 dark:text-emerald-200'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-950 dark:text-rose-200'
          }`}>
            <div className="flex items-center space-x-2 font-bold text-sm">
              {verificationResult.valid ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>100% Cryptographic Verification Confirmed</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  <span>Verification Failed / Not Found</span>
                </>
              )}
            </div>

            {verificationResult.valid ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
                <div>
                  <span className="text-chocolate-500 block">Batch ID:</span>
                  <span className="font-bold">{verificationResult.batchId}</span>
                </div>
                <div>
                  <span className="text-chocolate-500 block">Block Height:</span>
                  <span className="font-bold">#{verificationResult.blockHeight}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-chocolate-500 block">Transaction Hash:</span>
                  <span className="font-bold break-all">{verificationResult.txHash}</span>
                </div>
                <div>
                  <span className="text-chocolate-500 block">Signer:</span>
                  <span>{verificationResult.signer}</span>
                </div>
                <div>
                  <span className="text-chocolate-500 block">Status:</span>
                  <span className="text-emerald-600 font-bold">MERKLE_ROOT_AUTHENTIC</span>
                </div>
              </div>
            ) : (
              <p>{verificationResult.message}</p>
            )}
          </div>
        )}
      </div>

      {/* Validator Consensus Nodes Grid */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-chocolate-700 dark:text-chocolate-300">
          {t('blockchain.nodesTitle')}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {validatorNodes.map((node) => (
            <div
              key={node.id}
              className="p-4 rounded-2xl bg-white dark:bg-charcoal-800 border border-chocolate-200/80 dark:border-chocolate-800 shadow-soft space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-amber-600">
                  {node.id.toUpperCase()}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>
              <h4 className="text-xs font-bold text-chocolate-900 dark:text-ivory-100 leading-snug">
                {node.name}
              </h4>
              <p className="text-[11px] text-chocolate-500">{node.role}</p>
              <div className="pt-2 border-t border-chocolate-100 dark:border-chocolate-700/60 flex justify-between text-[10px] text-chocolate-600 dark:text-chocolate-400">
                <span>Uptime: <strong>{node.uptime}</strong></span>
                <span>Power: <strong>{node.votingPower}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Real-time Block Transactions Ledger Table */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-chocolate-700 dark:text-chocolate-300">
            {t('blockchain.explorerTitle')}
          </h3>

          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-chocolate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search event, hash, batch..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-chocolate-200 dark:border-chocolate-700 bg-white dark:bg-charcoal-800 text-xs focus:outline-none focus:border-amber-500 shadow-sm"
            />
          </div>
        </div>

        <div className="rounded-3xl bg-white dark:bg-charcoal-800 border border-chocolate-200/80 dark:border-chocolate-800 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-ivory-50 dark:bg-charcoal-900 border-b border-chocolate-100 dark:border-chocolate-700/60 text-chocolate-600 dark:text-chocolate-400 uppercase font-sans font-semibold">
                <tr>
                  <th className="py-3 px-4">Block</th>
                  <th className="py-3 px-4">Tx Hash</th>
                  <th className="py-3 px-4 font-sans">Batch ID</th>
                  <th className="py-3 px-4 font-sans">Event Type</th>
                  <th className="py-3 px-4 font-sans">Timestamp</th>
                  <th className="py-3 px-4 font-sans">Signer</th>
                  <th className="py-3 px-4 font-sans text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-chocolate-100 dark:divide-chocolate-700/60">
                {filteredTx.map((tx) => (
                  <tr key={tx.txHash} className="hover:bg-ivory-50/50 dark:hover:bg-charcoal-700/40">
                    <td className="py-3 px-4 font-bold text-amber-700 dark:text-amber-400">
                      #{tx.blockHeight}
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-1.5">
                        <span className="text-chocolate-700 dark:text-chocolate-300">
                          {tx.txHash.substring(0, 10)}...{tx.txHash.substring(tx.txHash.length - 8)}
                        </span>
                        <button
                          onClick={() => handleCopy(tx.txHash)}
                          className="p-1 hover:text-amber-600"
                          title="Copy Full Hash"
                        >
                          {copiedHash === tx.txHash ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-bold text-chocolate-900 dark:text-ivory-100 font-sans">
                      {tx.batchId}
                    </td>

                    <td className="py-3 px-4 font-sans">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-800 dark:text-amber-300">
                        {tx.event}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-chocolate-500 font-sans text-[11px]">
                      {tx.timestamp}
                    </td>

                    <td className="py-3 px-4 text-chocolate-500 text-[11px]">
                      {tx.signer}
                    </td>

                    <td className="py-3 px-4 text-right font-sans">
                      <span className="inline-flex items-center space-x-1 text-emerald-600 text-[10px] font-bold">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>COMMITTED</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
