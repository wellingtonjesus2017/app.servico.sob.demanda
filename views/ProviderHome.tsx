
import React, { useState, useEffect, useRef } from 'react';
import { User } from '../types';

interface ProviderHomeProps {
  user: User;
}

const ProviderHome: React.FC<ProviderHomeProps> = ({ user }) => {
  const [isOnline, setIsOnline] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [hasNewRequest, setHasNewRequest] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Dados fictícios para o gráfico de barras (últimos 7 dias)
  const weeklyStats = [
    { day: 'Seg', amount: 120, height: '45%' },
    { day: 'Ter', amount: 180, height: '65%' },
    { day: 'Qua', amount: 150, height: '55%' },
    { day: 'Qui', amount: 220, height: '80%' },
    { day: 'Sex', amount: 190, height: '70%' },
    { day: 'Sáb', amount: 280, height: '95%' },
    { day: 'Dom', amount: 320, height: '100%', current: true },
  ];

  // Histórico de Retiradas
  const withdrawalHistory = [
    { id: 'w1', date: '15 Mai', amount: '850,00', status: 'Concluído', bank: 'Nubank • 4242' },
    { id: 'w2', date: '08 Mai', amount: '1.200,00', status: 'Concluído', bank: 'Itaú • 8812' },
  ];

  // Histórico detalhado de serviços concluídos
  const recentActivity = [
    {
      id: 'h1',
      title: 'Reparo Hidráulico',
      clientName: 'Mariana Oliveira',
      rating: 5.0,
      time: 'há 2 horas',
      location: 'Pinheiros, SP',
      grossAmount: '150,00',
      netAmount: '135,00',
      icon: 'plumbing',
      color: 'text-blue-600 bg-blue-50'
    },
    {
      id: 'h2',
      title: 'Limpeza Pesada',
      clientName: 'Carlos Eduardo',
      rating: 4.8,
      time: 'Ontem, 14:00',
      location: 'Jardins, SP',
      grossAmount: '200,00',
      netAmount: '180,00',
      icon: 'cleaning_services',
      color: 'text-purple-600 bg-purple-50'
    }
  ];

  const playNotificationSound = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch (e) {
      console.error("Erro ao reproduzir áudio:", e);
    }
  };

  useEffect(() => {
    if (isOnline && !hasNewRequest) {
      const timer = setTimeout(() => {
        setShowNotification(true);
        setHasNewRequest(true);
        playNotificationSound();
        setTimeout(() => setShowNotification(false), 5000);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, hasNewRequest]);

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-y-auto no-scrollbar relative">
      {/* Toast Notification */}
      {showNotification && (
        <div className="absolute top-4 left-4 right-4 z-[100] animate-bounce-in">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/20">
            <div className="size-10 bg-white/20 rounded-xl flex items-center justify-center animate-pulse">
              <span className="material-symbols-outlined">bolt</span>
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-black uppercase opacity-80 tracking-widest">Nova Oportunidade!</p>
              <p className="text-sm font-bold">Limpeza Residencial • R$ 110,00</p>
            </div>
            <button onClick={() => setShowNotification(false)} className="size-8 flex items-center justify-center">
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
        </div>
      )}

      <header className="p-4 bg-white sticky top-0 z-10 border-b border-slate-100 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img src={user.avatar} alt="Usuário" className="size-10 rounded-full object-cover" />
            <div className={`absolute bottom-0 right-0 size-3 rounded-full border-2 border-white ${isOnline ? 'bg-green-500' : 'bg-gray-300'}`}></div>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase">Pro Dashboard</p>
            <h2 className="text-lg font-black">{user.name}</h2>
          </div>
        </div>
        <button className={`size-10 rounded-full hover:bg-slate-100 flex items-center justify-center relative ${showNotification ? 'animate-wiggle' : ''}`}>
          <span className="material-symbols-outlined text-slate-700">notifications</span>
          <span className={`absolute top-2 right-2 size-2 bg-red-500 rounded-full border border-white ${showNotification ? 'animate-ping' : ''}`}></span>
        </button>
      </header>

      <main className="p-4 space-y-6 flex-1">
        {/* Toggle Online/Offline */}
        <section className="p-4 bg-white rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="font-black text-slate-900">{isOnline ? 'Você está Online' : 'Você está Offline'}</p>
            <p className="text-[11px] font-bold text-gray-400">{isOnline ? 'Visível para clientes próximos' : 'Ative para receber serviços'}</p>
          </div>
          <button 
            onClick={() => {
              setIsOnline(!isOnline);
              if (!isOnline) setHasNewRequest(false);
            }}
            className={`w-14 h-8 rounded-full p-1 transition-colors relative flex items-center ${isOnline ? 'bg-blue-600 justify-end' : 'bg-slate-200 justify-start'}`}
          >
            <div className="size-6 bg-white rounded-full shadow-md"></div>
          </button>
        </section>

        {/* Dash de Finanças Consolidado */}
        <section className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm">
          <div className="p-6 bg-slate-900 text-white space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Saldo Disponível</p>
              <span className="material-symbols-outlined text-blue-400">account_balance_wallet</span>
            </div>
            <div className="flex items-end gap-2">
              <h3 className="text-4xl font-black">R$ 540,50</h3>
              <button className="mb-1 text-[10px] font-bold bg-blue-600 px-3 py-1.5 rounded-full hover:bg-blue-700 active:scale-95 transition-all">Sacar agora</button>
            </div>
            <div className="pt-2 flex gap-4">
              <div className="flex-1 p-3 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-[9px] font-bold uppercase opacity-50 mb-1">A Receber</p>
                <p className="text-sm font-black text-orange-400">R$ 380,00</p>
              </div>
              <div className="flex-1 p-3 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-[9px] font-bold uppercase opacity-50 mb-1">Total Semana</p>
                <p className="text-sm font-black text-green-400">R$ 1.840,00</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <h4 className="text-sm font-black text-slate-900">Tendência de Ganhos</h4>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Últimos 7 dias</p>
              </div>
              <span className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[10px]">trending_up</span> +15%
              </span>
            </div>

            {/* Micro Gráfico de Barras */}
            <div className="h-28 flex items-end justify-between gap-2 px-1">
              {weeklyStats.map((item, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <div 
                    style={{ height: item.height }}
                    className={`w-full rounded-t-md transition-all duration-500 relative ${item.current ? 'bg-blue-600 shadow-lg shadow-blue-500/20' : 'bg-slate-100 group-hover:bg-slate-200'}`}
                  >
                  </div>
                  <span className={`text-[8px] font-bold ${item.current ? 'text-blue-600' : 'text-gray-400'}`}>
                    {item.day}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Histórico de Retiradas */}
        <section className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-lg font-black text-slate-900">Retiradas Recentes</h3>
            <button className="text-xs font-bold text-blue-600">Ver extrato</button>
          </div>
          <div className="space-y-3">
            {withdrawalHistory.map(w => (
              <div key={w.id} className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                    <span className="material-symbols-outlined text-lg">account_balance</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">R$ {w.amount}</p>
                    <p className="text-[10px] text-gray-400 font-medium">{w.bank}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-black text-green-600 bg-green-50 px-2 py-1 rounded-full uppercase tracking-tighter">{w.status}</span>
                  <p className="text-[9px] text-gray-400 font-bold mt-1">{w.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Chamadas de Serviço */}
        <section className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-lg font-black text-slate-900">Solicitações Ativas</h3>
            {hasNewRequest && (
              <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-full animate-pulse uppercase">Nova</span>
            )}
          </div>
          
          <div className={`bg-white rounded-[32px] overflow-hidden shadow-xl border transition-all duration-500 ${hasNewRequest ? 'border-blue-500 shadow-blue-500/10 ring-4 ring-blue-500/5' : 'border-slate-100 shadow-slate-200/50'}`}>
            <div className="h-1 bg-slate-100">
              <div className={`h-full bg-blue-600 transition-all duration-1000 ${hasNewRequest ? 'w-3/4' : 'w-0'}`}></div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className={`text-[10px] font-black uppercase tracking-widest ${hasNewRequest ? 'text-blue-600' : 'text-gray-300'}`}>
                    {hasNewRequest ? 'Expira em 24s' : 'Aguardando chamados...'}
                  </span>
                  <h4 className={`text-xl font-black ${hasNewRequest ? 'text-slate-900' : 'text-gray-300'}`}>
                    {hasNewRequest ? 'Limpeza Residencial' : 'Aguardando solicitações'}
                  </h4>
                </div>
                <div className={`size-12 rounded-2xl flex items-center justify-center ${hasNewRequest ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-200'}`}>
                  <span className="material-symbols-outlined">cleaning_services</span>
                </div>
              </div>

              {hasNewRequest ? (
                <>
                  <div className="aspect-video rounded-2xl overflow-hidden relative">
                    <img src="https://picsum.photos/seed/jobmap/600/400" alt="Mapa" className="w-full h-full object-cover opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-4">
                      <p className="text-white text-xs font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">location_on</span>
                        2.5km de distância • Pinheiros
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ganhos Est.</p>
                      <p className="text-2xl font-black">R$ 110,00</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Duração</p>
                      <p className="font-black">~2.5 horas</p>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button 
                      onClick={() => setHasNewRequest(false)}
                      className="flex-1 h-14 rounded-2xl border border-slate-100 font-bold text-gray-500 hover:bg-slate-50 transition-all"
                    >
                      Recusar
                    </button>
                    <button className="flex-1 h-14 rounded-2xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/30 active:scale-95 transition-all">
                      Aceitar
                    </button>
                  </div>
                </>
              ) : (
                <div className="py-8 flex flex-col items-center justify-center text-center space-y-4">
                   <div className="size-16 bg-slate-50 rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-slate-200 text-3xl animate-pulse">radar</span>
                   </div>
                   <p className="text-xs text-gray-400 font-medium max-w-[200px]">
                     Mantenha o app aberto e esteja online para receber novos chamados.
                   </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Histórico Recente Detalhado */}
        <section className="space-y-4 pb-24">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-lg font-black text-slate-900">Histórico de Serviços</h3>
            <button className="text-xs font-bold text-blue-600">Ver Tudo</button>
          </div>
          <div className="space-y-4">
            {recentActivity.map(item => (
              <div key={item.id} className="p-4 bg-white rounded-[24px] border border-slate-100 shadow-sm space-y-4 transition-all hover:border-blue-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`size-10 rounded-xl flex items-center justify-center ${item.color}`}>
                      <span className="material-symbols-outlined text-xl">{item.icon}</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900">{item.title}</h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{item.clientName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                    <span className="material-symbols-outlined text-[12px] text-yellow-500 fill-1 font-variation-settings-fill">star</span>
                    <span className="text-[11px] font-black text-yellow-700">{item.rating.toFixed(1)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 py-3 border-y border-slate-50">
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold">
                    <span className="material-symbols-outlined text-xs">schedule</span>
                    {item.time}
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold">
                    <span className="material-symbols-outlined text-xs">location_on</span>
                    {item.location}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex flex-col">
                    <span className="text-[8px] text-gray-400 font-black uppercase tracking-widest">Valor Bruto</span>
                    <span className="text-xs font-bold text-gray-300 line-through">R$ {item.grossAmount}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-blue-600 font-black uppercase tracking-widest block mb-0.5">Líquido Recebido</span>
                    <p className="text-xl font-black text-slate-900">R$ {item.netAmount}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Nav Bar */}
      <nav className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-slate-100 p-4 pb-8 flex justify-between items-center max-w-md mx-auto relative z-20 shrink-0 shadow-lg">
        <button className="flex flex-col items-center gap-1 text-blue-600">
          <span className="material-symbols-outlined fill-current">dashboard</span>
          <span className="text-[10px] font-bold">Painel</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400">
          <span className="material-symbols-outlined">calendar_month</span>
          <span className="text-[10px] font-medium">Agenda</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400">
          <span className="material-symbols-outlined">account_balance_wallet</span>
          <span className="text-[10px] font-medium">Carteira</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-medium">Perfil</span>
        </button>
      </nav>

      <style>{`
        @keyframes bounce-in {
          0% { transform: translateY(-100%) scale(0.9); opacity: 0; }
          70% { transform: translateY(10%) scale(1.02); opacity: 1; }
          100% { transform: