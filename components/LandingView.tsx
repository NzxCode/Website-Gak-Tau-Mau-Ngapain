import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Zap, Coffee, Monitor, Sparkles, Brain, Target } from 'lucide-react';

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
    <div className="w-full max-w-5xl mx-auto px-4 py-8 md:py-12 animate-fade-in flex flex-col items-center">
      {/* Hero Section */}
      <div className="text-center mb-12 mt-4 md:mt-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-600 rounded-full text-sm font-medium mb-6 animate-slide-down border border-brand-100">
          <Sparkles className="w-4 h-4" />
          <span>Asisten pengingat konteks pribadi</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
          Lagi Lupa Ngapain?{' '}
          <br className="hidden md:block" />
          <span className="gradient-text-purple">Buka Ini.</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Website kecil buat nyimpen konteks terakhir sebelum otak ke-reset.
        </p>
      </div>

      {/* Input Section */}
      <div className="w-full max-w-2xl mb-16 relative z-10 input-glow-container">
        <form onSubmit={handleSubmit} className="relative group">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tadi lagi ngapain?"
              className="block w-full px-6 md:px-8 py-6 md:py-7 text-xl md:text-2xl text-gray-900 placeholder-gray-400 bg-white border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-brand-100 focus:border-brand-400 outline-none shadow-xl shadow-brand-500/10 transition-all hover:border-brand-300"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="absolute right-3 md:right-4 top-3 md:top-4 bottom-3 md:bottom-4 px-6 md:px-8 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all flex items-center gap-2 hover-lift btn-ripple shadow-lg hover:shadow-xl"
            >
              <span className="hidden md:inline">Simpan Konteks</span>
              <span className="md:hidden">Simpan</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-5 text-center">
            <p className="text-xs text-gray-400 font-medium tracking-wide uppercase">
              Tekan Enter untuk simpan &bull; Cmd/Ctrl+K untuk fokus
            </p>
          </div>
        </form>
      </div>

      {/* Why This Exists Section */}
      <div className="w-full max-w-3xl mb-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Kenapa ini ada?
        </h2>
        <div className="bg-gradient-to-br from-brand-50 to-purple-50 rounded-2xl p-8 md:p-10 border border-brand-100 shadow-sm">
          <div className="space-y-4 text-left">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center text-brand-600 mt-1">
                <Brain className="w-5 h-5" />
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                <strong className="text-gray-900">Otak emang suka lompat-lompat.</strong> Ini bukan berarti lu pikun, ini wajar banget.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center text-brand-600 mt-1">
                <Target className="w-5 h-5" />
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                <strong className="text-gray-900">Distraksi itu mudah, fokus itu susah.</strong> Cukup satu notif buat bikin lu lupa lagi ngapain.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center text-brand-600 mt-1">
                <Sparkles className="w-5 h-5" />
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                <strong className="text-gray-900">Simpan konteks = balik ke jalur lebih cepet.</strong> Gak perlu 5 menit buat ngingat-ingat lagi.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Use Case Cards */}
      <div className="w-full mb-8">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center">
          Kapan harus pake ini?
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card-gradient-border p-6 md:p-8 hover-lift group">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl flex items-center justify-center mb-5 text-orange-600 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 text-xl mb-3">Lagi kerja terus ke-distract</h3>
            <p className="text-gray-600 leading-relaxed">
              Notif masuk, bales bentar, eh lupa tadi lagi nulis kode baris keberapa.
            </p>
          </div>

          <div className="card-gradient-border p-6 md:p-8 hover-lift group">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center mb-5 text-blue-600 group-hover:scale-110 transition-transform">
              <Coffee className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 text-xl mb-3">Balik ke meja tapi blank</h3>
            <p className="text-gray-600 leading-relaxed">
              Abis ambil minum atau ke kamar mandi, duduk lagi malah bengong "tadi mau ngapain ya?".
            </p>
          </div>

          <div className="card-gradient-border p-6 md:p-8 hover-lift group">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl flex items-center justify-center mb-5 text-purple-600 group-hover:scale-110 transition-transform">
              <Monitor className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 text-xl mb-3">Buka laptop lupa tujuan</h3>
            <p className="text-gray-600 leading-relaxed">
              Niat mau ngerjain tugas, malah reflek buka YouTube, Twitter, atau sosmed lainnya.
            </p>
          </div>
        </div>
      </div>

      {/* Empathetic Footer Note */}
      <div className="mt-8 text-center">
        <p className="text-gray-400 text-sm italic">
          Tenang, lu gak sendiri. Semua orang pernah ngalamin ini. 🧠✨
        </p>
      </div>
    </div>
  );
};