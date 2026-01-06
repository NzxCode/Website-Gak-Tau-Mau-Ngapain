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
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center animate-fade-in px-4 max-w-4xl mx-auto">
      <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium animate-slide-up border border-green-100">
        <CheckCircle2 className="w-4 h-4" />
        <span>Konteks aman. Tenang, lu gak pikun.</span>
      </div>

      <p className="text-gray-400 text-lg mb-4 font-medium uppercase tracking-widest text-sm">Terakhir lu lagi:</p>
      
      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight break-words max-w-full">
        {context.text}
      </h1>

      <p className="text-brand-600 font-medium text-lg mb-12 bg-brand-50 px-6 py-2 rounded-lg border border-brand-100">
        Disimpen {timeAgo}
      </p>

      <button
        onClick={onClear}
        className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-white border-2 border-gray-200 hover:border-red-200 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md"
      >
        <RotateCcw className="w-5 h-5 transition-transform group-hover:-rotate-180" />
        <span className="font-semibold text-lg">Udah inget? Reset</span>
      </button>
    </div>
  );
};