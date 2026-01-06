import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Zap, Coffee, Monitor } from 'lucide-react';

interface LandingViewProps {
  onSave: (text: string) => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onSave }) => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input on mount
    const timer = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K to focus
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSave(input.trim());
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12 animate-fade-in flex flex-col items-center">
      {/* Hero Section */}
      <div className="text-center mb-12 mt-8 md:mt-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
          Lagi Lupa Ngapain? <br/>
          <span className="text-brand-600">Buka Ini.</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Website kecil buat nyimpen konteks terakhir sebelum otak ke-reset.
        </p>
      </div>

      {/* Input Section */}
      <div className="w-full max-w-xl mb-24 relative z-10">
        <form onSubmit={handleSubmit} className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-brand-300 to-purple-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tadi lagi ngapain?"
              className="block w-full px-6 py-5 text-xl text-gray-900 placeholder-gray-400 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-brand-100 focus:border-brand-400 outline-none shadow-xl shadow-brand-500/5 transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="absolute right-3 top-3 bottom-3 px-6 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all flex items-center gap-2"
            >
              Simpan
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-4 text-center">
             <p className="text-xs text-gray-400 font-medium tracking-wide uppercase">
               Enter to save &bull; Cmd+K to focus
             </p>
          </div>
        </form>
      </div>

      {/* Why Section */}
      <div className="grid md:grid-cols-3 gap-6 w-full mb-12">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-4 text-orange-600">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg mb-2">Lagi kerja terus ke-distract</h3>
          <p className="text-gray-500 text-sm leading-relaxed">Notif masuk, bales bentar, eh lupa tadi lagi nulis kode baris keberapa.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600">
            <Coffee className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg mb-2">Balik ke meja tapi blank</h3>
          <p className="text-gray-500 text-sm leading-relaxed">Abis ambil minum, duduk lagi malah bengong "tadi mau ngapain ya?".</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4 text-purple-600">
            <Monitor className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg mb-2">Buka laptop lupa tujuan</h3>
          <p className="text-gray-500 text-sm leading-relaxed">Niat mau ngerjain tugas, malah reflek buka YouTube atau sosmed.</p>
        </div>
      </div>
    </div>
  );
};