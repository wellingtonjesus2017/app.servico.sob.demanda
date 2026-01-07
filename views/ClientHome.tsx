
import React from 'react';
import { User, AppScreen } from '../types';
import { CATEGORIES, MOCK_PROVIDERS } from '../constants';

interface ClientHomeProps {
  user: User;
  onRequestNew: () => void;
  onNavigateHistory: () => void;
}

const ClientHome: React.FC<ClientHomeProps> = ({ user, onRequestNew, onNavigateHistory }) => {
  return (
    <div className="flex flex-col h-full relative">
      {/* Map Layer Simulation */}
      <div className="absolute inset-0 z-0 bg-blue-50 overflow-hidden">
        <img 
          src="https://picsum.photos/seed/map/800/1200" 
          alt="Mapa de fundo" 
          className="w-full h-full object-cover opacity-60 grayscale-[0.5]"
        />
        <div className="absolute top-[40%] left-[30%] w-6 h-6 bg-blue-600 rounded-full border-4 border-white animate-pulse shadow-lg"></div>
        <div className="absolute top-[20%] left-[60%] w-6 h-6 bg-slate-900 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
          <span className="material-symbols-outlined text-white text-[12px]">cleaning_services</span>
        </div>
        <div className="absolute top-[50%] left-[70%] w-6 h-6 bg-slate-900 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
          <span className="material-symbols-outlined text-white text-[12px]">plumbing</span>
        </div>
      </div>

      {/* Header Overlay */}
      <div className="relative z-10 px-4 pt-12 pb-4 bg-gradient-to-b from-white via-white/80 to-transparent">
        <div className="flex items-center gap-3 mb-6">
          <button className="size-12 rounded-full bg-white shadow-lg flex items-center justify-center border border-slate-100">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <div className="flex-1 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center px-4 gap-2">
            <span className="material-symbols-outlined text-blue-600">search</span>
            <input type="text" placeholder="O que você precisa?" className="border-none focus:ring-0 text-sm flex-1 p-0" />
            <span className="material-symbols-outlined text-gray-400">mic</span>
          </div>
          <div className="size-12 rounded-full border-2 border-white shadow-lg overflow-hidden">
            <img src={user.avatar} alt="Usuário" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {CATEGORIES.map(cat => (
            <button key={cat.id} className="h-10 px-5 bg-white border border-slate-100 rounded-full shadow-sm text-sm font-bold flex items-center gap-2 whitespace-nowrap hover:bg-blue-50 active:scale-95 transition-all">
              <span className="material-symbols-outlined text-lg text-blue-600">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Sheet */}
      <div className="mt-auto relative z-10">
        <div className="bg-white rounded-t-[40px] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-6">
          <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mb-6"></div>
          
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-extrabold">Prestadores Próximos</h2>
            <button className="text-sm font-bold text-blue-600">Ver Todos</button>
          </div>

          <div className="space-y-4 max-h-[350px] overflow-y-auto no-scrollbar pb-10">
            {MOCK_PROVIDERS.map(prov => (
              <div key={prov.id} className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm flex gap-4 active:bg-slate-50 transition-colors cursor-pointer">
                <div className="relative">
                  <img src={prov.avatar} alt={prov.name} className="size-14 rounded-full object-cover" />
                  {prov.verified && (
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm border border-slate-100">
                      <span className="material-symbols-outlined text-green-500 text-[14px]">verified</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex justify-between items-start mb-0.5">
                    <h3 className="font-bold">{prov.name}</h3>
                    <span className="font-bold text-blue-600">R$ {prov.price}<span className="text-[10px] text-gray-400 font-normal">/h</span></span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-bold text-gray-500">
                    <span className="text-yellow-500 flex items-center">{prov.rating} <span className="material-symbols-outlined text-[10px] fill-current">star</span></span>
                    <span>•</span>
                    <span>{prov.category}</span>
                    <span>•</span>
                    <span>{prov.distance}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={onRequestNew}
            className="w-full bg-blue-600 text-white h-14 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-blue-500/30 mb-2 active:scale-[0.98] transition-all"
          >
            <span className="material-symbols-outlined">add_circle</span>
            Solicitar Novo Serviço
          </button>
        </div>
      </div>

      {/* Nav Bar */}
      <div className="bg-white border-t border-slate-100 px-6 py-4 flex justify-between items-center relative z-20">
        <button className="flex flex-col items-center gap-1 text-blue-600">
          <span className="material-symbols-outlined fill-current">home</span>
          <span className="text-[10px] font-bold">Início</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400">
          <span className="material-symbols-outlined">search</span>
          <span className="text-[10px] font-medium">Buscar</span>
        </button>
        <button onClick={onNavigateHistory} className="flex flex-col items-center gap-1 text-gray-400">
          <span className="material-symbols-outlined">history</span>
          <span className="text-[10px] font-medium">Histórico</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-medium">Perfil</span>
        </button>
      </div>
    </div>
  );
};

export default ClientHome;
