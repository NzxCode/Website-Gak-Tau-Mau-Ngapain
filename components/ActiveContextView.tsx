import React, { useEffect, useState } from 'react';
import { ContextItem } from '../types';
import { formatTimeAgo } from '../utils';
import { RotateCcw, CheckCircle2 } from 'lucide-react';

interface ActiveContextViewProps {
  context: ContextItem;
  onClear: () => void;
}

export const ActiveContextView: React.FC<ActiveContextViewProps> = ({ context, onClear }) => {
  const [timeAgo, setTimeAgo] = useState(formatTimeAgo(context.timestamp));

  useEffect(() => {
    setTimeAgo(formatTimeAgo(context.timestamp));
    const interval = setInterval(() => {
      setTimeAgo(formatTimeAgo(context.timestamp));
    }, 10000);
    return () => clearInterval(interval);
  }, [context.timestamp]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto">
      <div className="success-badge mb-10 inline-flex items-center gap-2 px-5 py-3 bg-green-50 text-green-700 rounded-full text-sm font-semibold border-2 border-green-100 shadow-sm">
        <CheckCircle2 className="w-5 h-5" />
        <span>Konteks aman. Tenang, lu gak pikun.</span>
      </div>

      <p className="text-gray-400 text-sm mb-6 font-medium uppercase tracking-[0.2em]">
        Terakhir lu lagi:
      </p>
      
      <h1 className="context-reveal text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 leading-tight break-words max-w-full px-4">
        {context.text}
      </h1>

      <div className="mb-12 inline-flex items-center gap-2 px-6 py-3 bg-brand-50 rounded-xl border border-brand-100">
        <span className="text-brand-600 font-semibold text-lg">
          Disimpen {timeAgo}
        </span>
      </div>

      <button
        onClick={onClear}
        className="group relative flex items-center justify-center gap-3 px-10 py-5 bg-white border-2 border-gray-200 hover:border-red-200 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover-lift"
      >
        <RotateCcw className="w-5 h-5 transition-transform duration-500 group-hover:-rotate-180" />
        <span className="font-bold text-lg">Udah inget? Reset</span>
      </button>

      <p className="mt-8 text-gray-400 text-sm italic">
        Sekarang lu bisa lanjut kerja lagi. 💪
      </p>
    </div>
  );
};