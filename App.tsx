
import React, { useState, useEffect } from 'react';
import { UserRole, AppScreen, User } from './types';
import Onboarding from './views/Onboarding';
import Auth from './views/Auth';
import ClientHome from './views/ClientHome';
import ProviderHome from './views/ProviderHome';
import ServiceRequest from './views/ServiceRequest';
import PaymentConfirmation from './views/PaymentConfirmation';
import Review from './views/Review';
import History from './views/History';

const App: React.FC = () => {
  const [screen, setScreen] = useState<AppScreen>(AppScreen.ONBOARDING);
  const [user, setUser] = useState<User | null>(null);
  const [tempRequestData, setTempRequestData] = useState<any>(null);

  const navigateTo = (newScreen: AppScreen) => setScreen(newScreen);

  const handleAuthSuccess = (userData: User) => {
    setUser(userData);
    navigateTo(AppScreen.HOME);
  };

  const handleRequestCreated = (data: any) => {
    setTempRequestData(data);
    navigateTo(AppScreen.PAYMENT);
  };

  const renderScreen = () => {
    switch (screen) {
      case AppScreen.ONBOARDING:
        return <Onboarding onComplete={() => navigateTo(AppScreen.AUTH)} />;
      case AppScreen.AUTH:
        return <Auth onAuthSuccess={handleAuthSuccess} onBack={() => navigateTo(AppScreen.ONBOARDING)} />;
      case AppScreen.HOME:
        return user?.role === UserRole.CLIENT ? (
          <ClientHome 
            user={user} 
            onRequestNew={() => navigateTo(AppScreen.SERVICE_REQUEST)} 
            onNavigateHistory={() => navigateTo(AppScreen.HISTORY)}
          />
        ) : (
          <ProviderHome user={user} />
        );
      case AppScreen.SERVICE_REQUEST:
        return <ServiceRequest 
          onBack={() => navigateTo(AppScreen.HOME)} 
          onSubmit={handleRequestCreated} 
        />;
      case AppScreen.PAYMENT:
        return <PaymentConfirmation 
          data={tempRequestData} 
          onBack={() => navigateTo(AppScreen.SERVICE_REQUEST)} 
          onConfirm={() => navigateTo(AppScreen.REVIEW)}
        />;
      case AppScreen.REVIEW:
        return <Review onComplete={() => navigateTo(AppScreen.HISTORY)} />;
      case AppScreen.HISTORY:
        return <History 
          onBack={() => navigateTo(AppScreen.HOME)} 
          onNavigateHome={() => navigateTo(AppScreen.HOME)}
        />;
      default:
        return <Onboarding onComplete={() => navigateTo(AppScreen.AUTH)} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-0 md:p-4">
      {/* Mobile Frame Container */}
      <div className="w-full h-full md:w-[390px] md:h-[844px] bg-white md:rounded-[40px] shadow-2xl overflow-hidden relative border-8 border-slate-900 md:border-slate-800">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 md:rounded-b-2xl z-50 hidden md:block"></div>
        <div className="w-full h-full overflow-hidden flex flex-col bg-slate-50">
          {renderScreen()}
        </div>
      </div>
    </div>
  );
};

export default App;
