
import React, { useState } from 'react';
import { UserRole, User } from '../types';

interface AuthProps {
  onAuthSuccess: (user: User) => void;
  onBack: () => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthSuccess, onBack }) => {
  const [role, setRole] = useState<UserRole>(UserRole.CLIENT);

  const handleLogin = () => {
    onAuthSuccess({
      id: 'u123',
      name: role === UserRole.CLIENT ? 'João Silva' : 'Prestador Especialista',
      email: 'usuario@exemplo.com.br',
      role: role,
      avatar: 'https://picsum.photos/seed/user/200/200'
    });
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 flex items-center">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
      </div>

      <div className="flex-1 p-6 flex flex-col items-center">
        <div className="size-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
          <span className="material-symbols-outlined text-4xl">hub</span>
        </div>
        
        <h2 className="text-3xl font-extrabold mb-2">Bem-vindo(a)</h2>
        <p className="text-gray-500 text-center mb-8">Conecte-se aos melhores serviços ou comece a lucrar hoje.</p>

        <div className="w-full bg-slate-100 p-1 rounded-2xl flex mb-8">
          <button 
            onClick={() => setRole(UserRole.CLIENT)}
            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${role === UserRole.CLIENT ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}
          >
            Preciso de um serviço
          </button>
          <button 
            onClick={() => setRole(UserRole.PROVIDER)}
            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${role === UserRole.PROVIDER ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}
          >
            Quero prestar serviços
          </button>
        </div>

        <form className="w-full space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 ml-1">E-mail ou Telefone</label>
            <input 
              type="text" 
              placeholder="exemplo@email.com.br" 
              className="w-full h-14 bg-slate-50 border-gray-200 rounded-xl focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 ml-1">Senha</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full h-14 bg-slate-50 border-gray-200 rounded-xl focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="text-right pt-1">
              <button className="text-sm text-blue-600 font-bold">Esqueceu a senha?</button>
            </div>
          </div>

          <button 
            onClick={handleLogin}
            className="w-full h-14 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
          >
            Entrar <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </form>

        <div className="w-full flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-slate-200"></div>
          <span className="text-xs font-bold text-gray-400">Ou continue com</span>
          <div className="flex-1 h-px bg-slate-200"></div>
        </div>

        <div className="w-full grid grid-cols-2 gap-4">
          <button className="h-12 border border-slate-200 rounded-xl flex items-center justify-center gap-2 font-bold hover:bg-slate-50">
            <span className="material-symbols-outlined text-gray-900">token</span> Apple
          </button>
          <button className="h-12 border border-slate-200 rounded-xl flex items-center justify-center gap-2 font-bold hover:bg-slate-50">
            <span className="material-symbols-outlined text-red-500">g_mobiledata</span> Google
          </button>
        </div>
      </div>

      <div className="p-8 text-center">
        <p className="text-sm text-gray-500">Não tem uma conta? <button className="text-blue-600 font-bold">Cadastre-se</button></p>
      </div>
    </div>
  );
};

export default Auth;
