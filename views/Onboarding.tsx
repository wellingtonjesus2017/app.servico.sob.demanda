
import React from 'react';

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="absolute top-12 right-6 z-20">
        <button onClick={onComplete} className="text-sm font-semibold text-gray-400 hover:text-blue-600">Pular</button>
      </div>
      
      <div className="flex-1 relative overflow-hidden bg-white rounded-b-[40px] shadow-sm flex items-end justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white/0"></div>
        <div className="w-full px-6 pt-20 pb-10">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative">
            <img 
              src="https://picsum.photos/seed/service/800/1000" 
              alt="Ajuda profissional" 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl flex items-center gap-2 border border-white/20 shadow-lg">
              <span className="material-symbols-outlined text-blue-600 text-lg">verified_user</span>
              <span className="text-[10px] font-extrabold uppercase text-gray-700">Pros Verificados</span>
            </div>
            <div className="absolute bottom-6 left-4 bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl flex items-center gap-2 border border-white/20 shadow-lg animate-bounce">
              <span className="material-symbols-outlined text-yellow-500 text-lg">bolt</span>
              <span className="text-[10px] font-extrabold uppercase text-gray-700">Serviço Rápido</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 flex flex-col gap-8 bg-slate-50">
        <div className="flex justify-center gap-1.5">
          <div className="h-1.5 w-6 rounded-full bg-blue-600"></div>
          <div className="h-1.5 w-1.5 rounded-full bg-gray-300"></div>
          <div className="h-1.5 w-1.5 rounded-full bg-gray-300"></div>
        </div>

        <div className="text-center space-y-3">
          <h1 className="text-3xl font-extrabold tracking-tight">Ajuda Especialista, <br/><span className="text-blue-600">Sob Demanda</span></h1>
          <p className="text-gray-500 text-sm leading-relaxed max-w-[280px] mx-auto">
            Encontre profissionais locais de confiança para qualquer tarefa. Pagamento seguro e satisfação garantida.
          </p>
        </div>

        <div className="space-y-3">
          <button 
            onClick={onComplete}
            className="w-full bg-blue-600 text-white h-14 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-blue-500/30 active:scale-[0.98] transition-all"
          >
            Começar Agora <span className="material-symbols-outlined">arrow_forward</span>
          </button>
          <button onClick={onComplete} className="w-full h-12 text-blue-600 font-bold hover:bg-blue-50 rounded-2xl transition-colors">Entrar</button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
