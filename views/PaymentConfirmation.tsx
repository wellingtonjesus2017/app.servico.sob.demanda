
import React from 'react';

interface PaymentConfirmationProps {
  data: any;
  onBack: () => void;
  onConfirm: () => void;
}

const PaymentConfirmation: React.FC<PaymentConfirmationProps> = ({ data, onBack, onConfirm }) => {
  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="p-4 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 border-b border-slate-100 z-10">
        <button onClick={onBack} className="size-10 rounded-full hover:bg-slate-100 flex items-center justify-center">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold">Confirmar Pagamento</h2>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 p-6 space-y-8">
        <div className="text-center space-y-1">
          <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">Valor Total</p>
          <h1 className="text-5xl font-black">R$ {data?.price || '150,00'}</h1>
        </div>

        <section className="space-y-3">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Detalhes do Serviço</h3>
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex gap-4">
            <div className="size-20 rounded-2xl overflow-hidden bg-blue-50">
              <img src="https://picsum.photos/seed/service/400/400" alt="Serviço" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <h4 className="font-bold text-lg">{data?.category?.name || 'Serviço Residencial'}</h4>
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                <span className="material-symbols-outlined text-sm">schedule</span>
                Hoje, 14:00
              </div>
              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-50">
                <div className="size-5 rounded-full bg-slate-200"></div>
                <span className="text-[10px] font-bold text-gray-600">Ricardo Silva • 4.9 ★</span>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Forma de Pagamento</h3>
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 bg-blue-900 rounded-md flex items-center justify-center text-[10px] text-white font-black italic">VISA</div>
              <div>
                <p className="text-sm font-bold">Visa final 4242</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Expira 12/28</p>
              </div>
            </div>
            <button className="text-blue-600 font-bold text-sm">Trocar</button>
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Resumo</h3>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-3">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Subtotal</span>
              <span className="font-bold text-slate-900">R$ {parseFloat((data?.price || '150').replace(',', '.')) - 10}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Taxa de Serviço</span>
              <span className="font-bold text-slate-900">R$ 6,00</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Encargos</span>
              <span className="font-bold text-slate-900">R$ 4,00</span>
            </div>
            <div className="h-px bg-slate-100 my-2"></div>
            <div className="flex justify-between text-lg font-black">
              <span>Total</span>
              <span>R$ {data?.price || '150,00'}</span>
            </div>
          </div>
        </section>
      </div>

      <div className="p-6 bg-white/80 backdrop-blur-md border-t border-slate-100 max-w-md mx-auto w-full space-y-4">
        <div className="flex items-center justify-center gap-2 text-gray-400">
          <span className="material-symbols-outlined text-sm">lock</span>
          <span className="text-[10px] font-bold uppercase tracking-widest">Pagamentos seguros via Stripe</span>
        </div>
        <button 
          onClick={onConfirm}
          className="w-full bg-blue-600 text-white h-16 rounded-2xl font-bold shadow-xl shadow-blue-500/30 flex items-center justify-center gap-2 relative overflow-hidden active:scale-[0.98] transition-all"
        >
          Pagar R$ {data?.price || '150,00'} <span className="material-symbols-outlined">arrow_forward</span>
          <div className="absolute inset-0 bg-white/10 -translate-x-full animate-shimmer"></div>
        </button>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
