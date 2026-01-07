
import React from 'react';

interface HistoryProps {
  onBack: () => void;
  onNavigateHome: () => void;
}

const History: React.FC<HistoryProps> = ({ onBack, onNavigateHome }) => {
  const historyItems = [
    { id: '1', title: 'Reparo Hidráulico', date: '12 de Maio', time: '10:00', amount: 150, provider: 'Mike R.', status: 'COMPLETED', rating: 5.0 },
    { id: '2', title: 'Limpeza Residencial', date: '05 de Maio', time: '09:00', amount: 120, provider: 'Sarah J.', status: 'COMPLETED' },
    { id: '3', title: 'Frete Aeroporto', date: '28 de Abr', time: '14:30', amount: 80, provider: 'Alex K.', status: 'CANCELLED' },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <header className="bg-white px-4 pt-12 pb-2 border-b border-slate-100 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-black">Histórico</h2>
          <button className="size-10 rounded-full bg-slate-50 flex items-center justify-center">
            <span className="material-symbols-outlined">filter_list</span>
          </button>
        </div>
        <div className="flex">
          <button className="flex-1 py-3 text-sm font-black border-b-[3px] border-blue-600 text-blue-600">Anteriores</button>
          <button className="flex-1 py-3 text-sm font-bold text-gray-400 border-b-[3px] border-transparent">Agendados</button>
          <button className="flex-1 py-3 text-sm font-bold text-gray-400 border-b-[3px] border-transparent">Cancelados</button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-6 pb-24">
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Recentes</h3>
          {historyItems.map(item => (
            <div key={item.id} className={`p-4 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-4 ${item.status === 'CANCELLED' ? 'opacity-60 grayscale' : ''}`}>
              <div className="flex gap-4">
                <div className="size-16 rounded-2xl bg-blue-50 shrink-0">
                  <img src={`https://picsum.photos/seed/${item.id}/200/200`} alt="Serviço" className="w-full h-full object-cover rounded-2xl" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <h4 className="font-black">{item.title}</h4>
                    <span className={`font-black ${item.status === 'CANCELLED' ? 'line-through text-gray-300' : ''}`}>R$ {item.amount.toFixed(2)}</span>
                  </div>
                  <p className="text-xs font-bold text-gray-400">{item.date} • {item.time}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1.5">
                      <div className="size-4 rounded-full bg-slate-200"></div>
                      <span className="text-[10px] font-bold text-gray-500">{item.provider}</span>
                    </div>
                    {item.rating && (
                      <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded-lg">
                        <span className="material-symbols-outlined text-yellow-500 text-[10px] fill-current">star</span>
                        <span className="text-[10px] font-black text-yellow-700">{item.rating.toFixed(1)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 pt-3 border-t border-slate-50">
                <button className="flex-1 h-9 rounded-xl bg-slate-50 text-slate-900 text-[10px] font-bold uppercase tracking-wider hover:bg-slate-100">Detalhes</button>
                <button className="flex-1 h-9 rounded-xl bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider hover:bg-blue-100">Pedir Novo</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border-t border-slate-100 px-6 py-4 flex justify-between items-center fixed bottom-0 left-0 w-full max-w-md mx-auto">
        <button onClick={onNavigateHome} className="flex flex-col items-center gap-1 text-gray-400">
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px] font-medium">Início</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400">
          <span className="material-symbols-outlined">search</span>
          <span className="text-[10px] font-medium">Buscar</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-blue-600">
          <span className="material-symbols-outlined fill-current">history</span>
          <span className="text-[10px] font-bold">Histórico</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-medium">Perfil</span>
        </button>
      </div>
    </div>
  );
};

export default History;
