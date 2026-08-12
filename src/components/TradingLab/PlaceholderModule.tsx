import React from 'react';

export function PlaceholderModule({ name, onComplete }: { name: string, onComplete: () => void }) {
  return (
    <div className="max-w-2xl mx-auto bg-brand-black border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl text-center">
      <h3 className="text-2xl font-bold text-white mb-4">{name}</h3>
      <p className="text-slate-400 mb-8">This educational module is currently under construction. Check back soon!</p>
      <button 
        onClick={onComplete}
        className="px-6 py-3 bg-gold-500 text-brand-black font-bold rounded-xl"
      >
        Go Back
      </button>
    </div>
  );
}
