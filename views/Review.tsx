
import React, { useState } from 'react';

interface ReviewProps {
  onComplete: () => void;
}

const Review: React.FC<ReviewProps> = ({ onComplete }) => {
  const [rating, setRating] = useState(4);
  const [tip, setTip] = useState(10);

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="p-4 flex items-center justify-between">
        <div className="w-10"></div>
        <h2 className="text-lg font-bold">Avaliar Serviço</h2>
        <button onClick={onComplete} className="text-sm font-bold text-blue-600">Pular</button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-6 space-y-10 py-8">
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <img src="https://picsum.photos/seed/pro/300/300" alt="Profissional" className="size-24 rounded-full object-cover border-4 border-white shadow-xl" />
            <div className="absolute bottom-0 right-0 size-6 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <h2 className="text-2xl font-black">Ricardo Silva</h2>
          <p className="text-gray-400 text-sm font-bold">Limpeza Residencial • 2h 15m</p>
        </div>

        <div className="text-center space-y-6">
          <h3 className="text-xl font-extrabold">Como foi o serviço?</h3>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map(star => (
              <button 
                key={star} 
                onClick={() => setRating(star)}
                className="transition-transform active:scale-90"
              >
                <span className={`material-symbols-outlined text-[48px] ${star <= rating ? 'text-blue-600 fill-1 font-variation-settings-fill' : 'text-slate-200'}`}>
                  star
                </span>
              </button>
            ))}
          </div>
          <p className="text-blue-600 font-bold">Muito Bom</p>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">O que foi positivo?</p>
          <div className="flex flex-wrap gap-2">
            {['Pontual', 'Profissional', 'Bom Preço', 'Simpático', 'Eficiente'].map(tag => (
              <button key={tag} className="px-4 py-2.5 rounded-xl bg-white border border-slate-100 text-sm font-bold hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Adicionar gorjeta</p>
            <span className="text-[10px] font-bold text-gray-400 bg-slate-100 px-2 py-0.5 rounded">Opcional</span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[5, 10, 20].map(val => (
              <button 
                key={val}
                onClick={() => setTip(val)}
                className={`flex flex-col items-center justify-center h-16 rounded-2xl border transition-all ${tip === val ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-white border-slate-100'}`}
              >
                <span className="text-sm font-bold">R$ {val}</span>
                <span className={`text-[10px] font-medium ${tip === val ? 'text-blue-100' : 'text-gray-400'}`}>{(val/150*100).toFixed(0)}%</span>
              </button>
            ))}
            <button className="flex items-center justify-center h-16 rounded-2xl bg-white border border-slate-100 text-gray-400 font-bold text-sm">Outro</button>
          </div>
        </div>
      </div>

      <div className="p-6 bg-white/80 backdrop-blur-md border-t border-slate-100 max-w-md mx-auto w-full">
        <button 
          onClick={onComplete}
          className="w-full bg-blue-600 text-white h-16 rounded-2xl font-bold shadow-xl shadow-blue-500/30 active:scale-[0.98] transition-all"
        >
          Enviar Avaliação
        </button>
      </div>
    </div>
  );
};

export default Review;
