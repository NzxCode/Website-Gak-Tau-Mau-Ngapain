import React from 'react';
import { ContextItem } from '../types';
import { formatTimeAgo } from '../utils';
import { Clock, Trash2, X } from 'lucide-react';

interface HistoryDrawerProps {
  history: ContextItem[];
  isOpen: boolean;
  onClose: () => void;
  onClearHistory: () => void;
  onRestore: (item: ContextItem) => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({ 
  history, 
  isOpen, 
  onClose, 
  onClearHistory,
  onRestore
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col animate-slide-in-right border-l border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Clock className="w-5 h-5 text-brand-600" />
            Riwayat Konteks
          </h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {history.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 text-center">
            <p className="mb-2">Belum ada riwayat.</p>
            <p className="text-sm">Mulai simpan sesuatu!</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto space-y-4">
            {history.map((item) => (
              <div 
                key={item.id} 
                onClick={() => onRestore(item)}
                className="p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-brand-50 hover:border-brand-200 transition-all cursor-pointer group"
              >
                <p className="font-medium text-gray-800 mb-2 group-hover:text-brand-700">{item.text}</p>
                <p className="text-xs text-gray-400">{formatTimeAgo(item.timestamp)}</p>
              </div>
            ))}
          </div>
        )}

        {history.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <button 
              onClick={onClearHistory}
              className="w-full py-3 flex items-center justify-center gap-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
            >
              <Trash2 className="w-4 h-4" />
              Hapus Semua Riwayat
            </button>
          </div>
        )}
      </div>
    </div>
  );
};