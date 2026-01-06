import React from 'react';
import { ContextItem } from '../types';
import { formatTimeAgo } from '../utils';
import { Clock, Trash2, X, RotateCw } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex justify-end animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div 
        className="relative w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col border-l border-gray-100"
        style={{ animation: 'slideInRight 0.3s ease-out' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-brand-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Riwayat Konteks</h3>
              <p className="text-xs text-gray-500">
                {history.length} {history.length === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl text-gray-500 hover:text-gray-700 transition-all hover-scale"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {history.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Clock className="w-10 h-10 text-gray-300" />
            </div>
            <p className="text-lg font-medium text-gray-500 mb-2">Belum ada riwayat.</p>
            <p className="text-sm text-gray-400">Mulai simpan konteks sekarang!</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {history.map((item, index) => (
              <div 
                key={item.id} 
                onClick={() => onRestore(item)}
                className="p-5 rounded-xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 hover:from-brand-50 hover:to-purple-50 hover:border-brand-300 transition-all cursor-pointer group hover-lift"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <p className="font-semibold text-gray-800 group-hover:text-brand-700 transition-colors flex-1 leading-snug">
                    {item.text}
                  </p>
                  <RotateCw className="w-4 h-4 text-gray-400 group-hover:text-brand-500 opacity-0 group-hover:opacity-100 transition-all flex-shrink-0 mt-1" />
                </div>
                <p className="text-xs text-gray-500 font-medium">
                  {formatTimeAgo(item.timestamp)}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        {history.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <button 
              onClick={onClearHistory}
              className="w-full py-4 flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 rounded-xl transition-all text-sm font-semibold border-2 border-transparent hover:border-red-100 hover-lift"
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