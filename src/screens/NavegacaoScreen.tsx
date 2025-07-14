import React, { useState } from 'react';
import { Home, Dumbbell, Plus, TrendingUp, User, Target, Award, Zap } from 'lucide-react';

interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface BottomNavigationProps {
  onTabChange?: (tabId: string) => void;
  activeTab?: string;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  onTabChange, 
  activeTab: controlledActiveTab 
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState<string>('home');
  
  const activeTab = controlledActiveTab || internalActiveTab;

  const tabs: TabItem[] = [
    {
      id: 'home',
      label: 'Início',
      icon: <Home size={24} />
    },
    {
      id: 'workouts',
      label: 'Treinos',
      icon: <Dumbbell size={24} />
    },
    {
      id: 'add',
      label: 'Treino',
      icon: <Plus size={28} />
    },
    {
      id: 'progress',
      label: 'Progresso',
      icon: <TrendingUp size={24} />
    },
    {
      id: 'profile',
      label: 'Perfil',
      icon: <User size={24} />
    }
  ];

  const handleTabClick = (tabId: string) => {
    if (!controlledActiveTab) {
      setInternalActiveTab(tabId);
    }
    onTabChange?.(tabId);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-gray-800 border-t border-gray-700 px-2 py-2 z-50 backdrop-blur-sm">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const isAddButton = tab.id === 'add';
          
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`
                flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-300
                ${isAddButton 
                  ? 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white min-w-[56px] h-[56px] rounded-full mb-2 shadow-lg transform hover:scale-105 active:scale-95' 
                  : isActive 
                    ? 'text-red-400 bg-red-500/10 transform scale-105' 
                    : 'text-gray-400 hover:text-gray-300 hover:bg-gray-700/30'
                }
              `}
            >
              <div className={`
                ${isAddButton ? 'mb-0' : 'mb-1'}
                ${isActive && !isAddButton ? 'transform scale-110' : ''}
                transition-all duration-300
              `}>
                {tab.icon}
              </div>
              {!isAddButton && (
                <span className={`text-xs font-medium transition-all duration-300 ${
                  isActive ? 'text-red-400' : 'text-gray-400'
                }`}>
                  {tab.label}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Componente de exemplo para demonstrar o uso
const FitnessApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Bem-vindo ao FitApp!</h2>
            <p className="text-gray-600">Sua jornada fitness começa aqui</p>
          </div>
        );
      case 'workouts':
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Seus Treinos</h2>
            <div className="space-y-3">
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-semibold">Treino A - Peito e Tríceps</h3>
                <p className="text-sm text-gray-600">45 minutos • 8 exercícios</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-semibold">Treino B - Costas e Bíceps</h3>
                <p className="text-sm text-gray-600">50 minutos • 9 exercícios</p>
              </div>
            </div>
          </div>
        );
      case 'add':
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Iniciar Treino</h2>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-red-600 to-red-500 text-white p-6 rounded-xl shadow-lg">
                <Dumbbell className="mx-auto mb-3" size={32} />
                <h3 className="font-bold text-lg mb-2">Treino Rápido</h3>
                <p className="text-sm opacity-90">Começar treino agora</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 px-3 rounded-lg transition-colors">
                  <Target className="mx-auto mb-2" size={24} />
                  <span className="text-sm font-medium">Personalizado</span>
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 px-3 rounded-lg transition-colors">
                  <Award className="mx-auto mb-2" size={24} />
                  <span className="text-sm font-medium">Desafio</span>
                </button>
              </div>
            </div>
          </div>
        );
      case 'progress':
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Seu Progresso</h2>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-red-800">Esta Semana</h3>
                  <Target className="text-red-600" size={20} />
                </div>
                <p className="text-sm text-red-600">4/5 treinos concluídos</p>
                <div className="w-full bg-red-200 rounded-full h-2 mt-2">
                  <div className="bg-red-600 h-2 rounded-full" style={{width: '80%'}}></div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-green-800">Força Ganhos</h3>
                  <Award className="text-green-600" size={20} />
                </div>
                <p className="text-sm text-green-600">+15kg no supino este mês</p>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-blue-800">Energia</h3>
                  <Zap className="text-blue-600" size={20} />
                </div>
                <p className="text-sm text-blue-600">Nível de energia: Alto</p>
              </div>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Meu Perfil</h2>
            <div className="bg-gray-100 p-6 rounded-lg">
              <div className="w-20 h-20 bg-red-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <User size={32} className="text-white" />
              </div>
              <h3 className="font-semibold text-lg">João Silva</h3>
              <p className="text-gray-600 text-sm mb-4">Membro desde Janeiro 2024</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold">Treinos</p>
                  <p className="text-gray-600">24 este mês</p>
                </div>
                <div>
                  <p className="font-semibold">Calorias</p>
                  <p className="text-gray-600">1.250 kcal</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Conteúdo principal */}
      <div className="pb-20 pt-8 px-4 max-w-md mx-auto">
        {renderContent()}
      </div>

      {/* Navegação inferior */}
      <BottomNavigation 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
};

export default FitnessApp;