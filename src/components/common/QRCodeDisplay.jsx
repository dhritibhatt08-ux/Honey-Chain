import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { Download, Check, Copy } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const QRCodeDisplay = ({ value, size = 180, title = 'Batch QR Code' }) => {
  const { isHindi } = useLanguage();
  const canvasRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (canvasRef.current && value) {
      QRCode.toCanvas(
        canvasRef.current,
        value,
        {
          width: size,
          margin: 2,
          color: {
            dark: '#24160C',
            light: '#FFFFFF',
          },
        },
        error => {
          if (error) console.error('QR code generation error:', error);
        }
      );
    }
  }, [value, size]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `HoneyChain-${value}.png`;
    a.click();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center p-4 rounded-xl bg-white dark:bg-charcoal-800 border border-chocolate-200 dark:border-chocolate-700 shadow-sm text-center">
      <div className="p-2 bg-white rounded-lg shadow-inner inline-block">
        <canvas ref={canvasRef} className="rounded" />
      </div>

      <div className="mt-3 text-xs font-mono font-bold text-chocolate-800 dark:text-ivory-100 px-2.5 py-1 rounded bg-amber-500/10 text-amber-800 dark:text-amber-300">
        {value}
      </div>

      <div className="mt-3 flex items-center space-x-2">
        <button
          onClick={handleCopy}
          className="inline-flex items-center space-x-1 px-2.5 py-1 text-xs rounded font-medium bg-ivory-200 dark:bg-charcoal-700 text-chocolate-800 dark:text-ivory-200 hover:bg-amber-100 dark:hover:bg-charcoal-600 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? (isHindi ? 'कॉपी हुआ' : 'Copied') : isHindi ? 'कॉपी' : 'Copy'}</span>
        </button>

        <button
          onClick={handleDownload}
          className="inline-flex items-center space-x-1 px-2.5 py-1 text-xs rounded font-medium bg-amber-600 text-white hover:bg-amber-700 transition-colors shadow-sm"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{isHindi ? 'डाउनलोड' : 'Download'}</span>
        </button>
      </div>
    </div>
  );
};
