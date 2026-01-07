
import React, { useState } from 'react';
import { CATEGORIES } from '../constants';
import { getSmartServiceSuggestions } from '../services/geminiService';

interface ServiceRequestProps {
  onBack: () => void;
  onSubmit: (data: any) => void;
}

const ServiceRequest: React.FC<ServiceRequestProps> = ({ onBack, onSubmit }) => {
  const [selectedCat, setSelectedCat] = useState(CATEGORIES[0]);
  const [description, setDescription] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [price, setPrice] = useState('150,00');

  const handleSmartHelp = async () => {
    if (!description) return;
    setIsAiLoading(true);
    const suggestions = await getSmartServiceSuggestions(description);
    if (suggestions) {
      setDescription(suggestions.improvedDescription);
      setPrice(suggestions.suggestedPrice.toString().replace('.', ','));
    }
    setIsAiLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="sticky top-0 bg-white/80 backdrop-blur-md px-4 py-4 flex items-center justify-between border-b border-slate-100 z-10">
        <button onClick={onBack} className="size-10 rounded-full hover:bg-slate-100 flex items-center justify-center">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold">Nova Solicitação</h2>
        <button onClick={onBack} className="text-sm font-bold text-gray-400">Cancelar</button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div>
          <h3 className="text-2xl font-extrabold mb-4">Com o que precisa de ajuda?</h3>
          <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4">
            {CATEGORIES.map(cat => (
              <button 
                key={cat.id} 
                onClick={() => setSelectedCat(cat)}
                className={`flex-shrink-0 h-10 px-5 rounded-full text-sm font-bold flex items-center gap-2 transition-all ${selectedCat.id === cat.id ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-600'}`}
              >
                <span className="material-symbols-outlined text-lg">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold uppercase text-gray-400 tracking-wider">Descrição</h4>
            <button 
              onClick={handleSmartHelp}
              disabled={isAiLoading || !description}
              className="text-xs font-bold text-blue-600 flex items-center gap-1 disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-sm">{isAiLoading ? 'sync' : 'magic_button'}</span>
              Melhorar com IA
            </button>
          </div>
          <div className="relative">
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva detalhadamente o que você precisa..."
              className="w-full h-40 bg-white border-slate-100 rounded-2xl p-4 text-sm focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            />
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase text-gray-400 tracking-wider mb-3">Localização</h4>
          <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
            <div className="h-28 bg-blue-50">
              <img src="https://picsum.photos/seed/location/600/300" alt="Mapa" className="w-full h-full object-cover opacity-50" />
            </div>
            <div className="p-4 flex items-center gap-3">
              <span className="material-symbols-outlined text-blue-600">location_on</span>
              <div className="flex-1">
                <p className="text-sm font-bold">Av. Paulista, 1000 - Ap 42</p>
                <p className="text-xs text-gray-400">Bela Vista, São Paulo - SP</p>
              </div>
              <button className="text-blue-600 font-bold text-sm">Editar</button>
            </div>
          </div>
        </div>

        <div className="pb-24">
          <h4 className="text-sm font-bold uppercase text-gray-400 tracking-wider mb-3">Sua Oferta</h4>
          <div className="flex gap-4">
            <div className="flex-1 h-14 bg-white rounded-2xl border border-slate-100 px-4 flex items-center gap-2 shadow-sm">
              <span className="font-bold text-gray-400">R$</span>
              <input 
                type="text" 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="flex-1 border-none focus:ring-0 p-0 font-bold text-lg" 
              />
            </div>
            <div className="h-14 bg-white rounded-2xl border border-slate-100 px-4 flex items-center gap-2 shadow-sm font-bold text-sm">
              Fixo <span className="material-symbols-outlined text-gray-400">expand_more</span>
            </div>
          </div>
          <p className="text-[10px] text-gray-400 mt-2 ml-1">Sugerido para {selectedCat.name}: {selectedCat.suggestedRate}</p>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-md p-6 border-t border-slate-100 max-w-md mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Total Estimado</span>
            <span className="text-2xl font-extrabold">R$ {price}</span>
          </div>
          <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase">3 Pros Disponíveis</span>
        </div>
        <button 
          onClick={() => onSubmit({ category: selectedCat, description, price })}
          className="w-full bg-blue-600 text-white h-14 rounded-2xl font-bold shadow-xl shadow-blue-500/30 flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
        >
          Encontrar Profissional <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default ServiceRequest;
