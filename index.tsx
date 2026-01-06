import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { AppState, ContextItem } from './types';
import { generateId } from './utils';
import { HistoryDrawer } from './components/HistoryDrawer';
import { ActiveContextView } from './components/ActiveContextView';
import { LandingView } from './components/LandingView';
import { Clock } from 'lucide-react';

const STORAGE_KEY = 'tadi-ngapain-v1';

const App = () => {
  const [state, setState] = useState<AppState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : { currentContext: null, history: [] };
    } catch (e) {
      console.error("Failed to load state", e);
      return { currentContext: null, history: [] };
    }
  });

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const handleSaveContext = (text: string) => {
    const newItem: ContextItem = {
      id: generateId(),
      text,
      timestamp: Date.now(),
    };

    setState(prev => ({
      currentContext: newItem,
      history: prev.currentContext 
        ? [prev.currentContext, ...prev.history].slice(0, 50) 
        : prev.history
    }));
  };

  const handleClearContext = () => {
    if (state.currentContext) {
      setState(prev => ({
        currentContext: null,
        history: [state.currentContext!, ...prev.history].slice(0, 50)
      }));
    }
  };

  const handleClearHistory = () => {
    setState(prev => ({ ...prev, history: [] }));
    setIsHistoryOpen(false);
  };

  const handleRestoreFromHistory = (item: ContextItem) => {
    const newItem = { ...item, timestamp: Date.now() }; 
    setState(prev => ({
      currentContext: newItem,
      history: prev.currentContext 
        ? [prev.currentContext, ...prev.history] 
        : prev.history
    }));
    setIsHistoryOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 p-4 md:p-6 flex justify-end items-center z-40 pointer-events-none">
        <button 
          onClick={() => setIsHistoryOpen(true)}
          className="pointer-events-auto p-3 bg-white/80 backdrop-blur-md hover:bg-white text-gray-500 hover:text-brand-600 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-200/50 group"
          aria-label="Riwayat"
          title="Riwayat Konteks"
        >
          <Clock className="w-5 h-5 transition-transform group-hover:rotate-12" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative pt-16">
        {state.currentContext ? (
          <ActiveContextView 
            context={state.currentContext} 
            onClear={handleClearContext} 
          />
        ) : (
          <LandingView onSave={handleSaveContext} />
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-400 text-sm">
        <p>Tadi Ngapain Aja? &mdash; Asisten pengingat konteks.</p>
      </footer>

      {/* History Drawer */}
      <HistoryDrawer 
        history={state.history}
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        onClearHistory={handleClearHistory}
        onRestore={handleRestoreFromHistory}
      />
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);