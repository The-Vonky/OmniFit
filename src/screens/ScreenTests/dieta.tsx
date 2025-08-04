import React, { useState, useEffect, useRef } from 'react';

const DietScreen = () => {
  const [waterIntake, setWaterIntake] = useState(6);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  const fadeAnim = useRef(0);
  const slideAnim = useRef(50);

  const meals = [
    {
      id: 1,
      name: 'Café da Manhã',
      time: '07:30',
      calories: '420 kcal',
      status: 'completed',
      foods: ['Aveia com banana', 'Ovos mexidos', 'Café preto'],
      macros: { protein: '25g', carbs: '45g', fat: '12g' }
    },
    {
      id: 2,
      name: 'Lanche da Manhã',
      time: '10:00',
      calories: '180 kcal',
      status: 'completed',
      foods: ['Whey protein', 'Banana'],
      macros: { protein: '30g', carbs: '15g', fat: '2g' }
    },
    {
      id: 3,
      name: 'Almoço',
      time: '12:30',
      calories: '650 kcal',
      status: 'pending',
      foods: ['Frango grelhado', 'Arroz integral', 'Brócolis', 'Salada'],
      macros: { protein: '45g', carbs: '60g', fat: '18g' }
    },
    {
      id: 4,
      name: 'Lanche da Tarde',
      time: '15:30',
      calories: '220 kcal',
      status: 'pending',
      foods: ['Iogurte grego', 'Castanhas', 'Mel'],
      macros: { protein: '20g', carbs: '12g', fat: '14g' }
    },
    {
      id: 5,
      name: 'Jantar',
      time: '19:00',
      calories: '520 kcal',
      status: 'pending',
      foods: ['Salmão grelhado', 'Batata doce', 'Aspargos'],
      macros: { protein: '40g', carbs: '35g', fat: '22g' }
    }
  ];

  const macroProgress = [
    { name: 'Proteína', current: 95, target: 160, unit: 'g', color: '#00FFF7', percentage: 59 },
    { name: 'Carboidrato', current: 72, target: 200, unit: 'g', color: '#F59E0B', percentage: 36 },
    { name: 'Gordura', current: 28, target: 60, unit: 'g', color: '#EF4444', percentage: 47 }
  ];

  const supplements = [
    { name: 'Whey Protein', time: '10:00', taken: true },
    { name: 'Creatina', time: '14:00', taken: true },
    { name: 'Ômega 3', time: '19:00', taken: false },
    { name: 'Vitamina D', time: '08:00', taken: false }
  ];

  useEffect(() => {
    // Simulate animations
    setTimeout(() => {
      displayToast('🥗 Bem-vindo à sua dieta personalizada!');
    }, 1000);
  }, []);

  const displayToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const addWater = () => {
    setWaterIntake(prev => prev + 1);
    displayToast('💧 Mais um copo de água registrado!');
  };

  const toggleMeal = (mealId) => {
    displayToast(`🍽️ Refeição ${mealId === 1 ? 'desmarcada' : 'marcada'} como consumida!`);
  };

  const toggleSupplement = (suppName) => {
    displayToast(`💊 ${suppName} ${suppName === 'Whey Protein' ? 'desmarcado' : 'marcado'}!`);
  };

  const GlowingCard = ({ children, style, delay = 0, glowColor = '#00FFF7' }) => {
    return (
      <div
        className="relative bg-zinc-900 rounded-2xl p-5 mb-4 border border-opacity-30 shadow-lg overflow-hidden"
        style={{ 
          borderColor: glowColor,
          boxShadow: `0 0 20px ${glowColor}30`
        }}
      >
        <div 
          className="absolute top-0 left-0 right-0 h-0.5 opacity-60"
          style={{ backgroundColor: glowColor }}
        />
        {children}
      </div>
    );
  };

  const ProgressBar = ({ current, target, color }) => {
    const percentage = Math.min((current / target) * 100, 100);
    return (
      <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
        <div 
          className="h-full transition-all duration-500 rounded-full"
          style={{ 
            width: `${percentage}%`,
            backgroundColor: color 
          }}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Toast */}
      {showToast && (
        <div className="fixed top-20 left-5 right-5 z-50 bg-zinc-900 bg-opacity-95 border border-cyan-400 border-opacity-30 rounded-3xl p-3">
          <p className="text-center text-sm font-medium">{toastMessage}</p>
        </div>
      )}

      <div className="p-5 pt-16 pb-20 max-w-md mx-auto">
        {/* Header */}
        <GlowingCard delay={100}>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-cyan-400 mb-1">Minha Dieta 🥗</h1>
              <p className="text-gray-400 text-sm">Acompanhe sua nutrição diária</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-white">1.990</p>
              <p className="text-xs text-gray-400">kcal consumidas</p>
            </div>
          </div>
        </GlowingCard>

        {/* Progresso de Macros */}
        <GlowingCard delay={200} glowColor="#7C3AED">
          <h2 className="text-lg font-semibold text-purple-400 mb-4">📊 Progresso dos Macros</h2>
          <div className="space-y-4">
            {macroProgress.map((macro, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium">{macro.name}</span>
                  <span className="text-sm text-gray-400">
                    {macro.current}{macro.unit} / {macro.target}{macro.unit}
                  </span>
                </div>
                <ProgressBar current={macro.current} target={macro.target} color={macro.color} />
                <div className="text-right mt-1">
                  <span className="text-xs" style={{ color: macro.color }}>
                    {macro.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </GlowingCard>

        {/* Hidratação */}
        <GlowingCard delay={300} glowColor="#10B981">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-emerald-400 mb-1">💧 Hidratação</h3>
              <p className="text-sm text-gray-400">{waterIntake} copos de 250ml</p>
              <p className="text-xs text-gray-500">Meta: 8 copos/dia</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex space-x-1">
                {[...Array(8)].map((_, i) => (
                  <div 
                    key={i}
                    className={`w-3 h-6 rounded-full ${
                      i < waterIntake ? 'bg-emerald-400' : 'bg-zinc-700'
                    }`}
                  />
                ))}
              </div>
              <button 
                onClick={addWater}
                className="bg-emerald-500 text-black px-3 py-2 rounded-lg font-bold text-sm hover:bg-emerald-400 transition-colors"
              >
                +
              </button>
            </div>
          </div>
        </GlowingCard>

        {/* Refeições do Dia */}
        <GlowingCard delay={400} glowColor="#F59E0B">
          <h2 className="text-lg font-semibold text-orange-400 mb-4">🍽️ Refeições de Hoje</h2>
          <div className="space-y-3">
            {meals.map((meal) => (
              <div 
                key={meal.id}
                className={`p-3 rounded-xl border ${
                  meal.status === 'completed' 
                    ? 'bg-emerald-900 bg-opacity-30 border-emerald-500 border-opacity-50' 
                    : 'bg-zinc-800 border-zinc-700'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-white">{meal.name}</h4>
                    <p className="text-xs text-gray-400">{meal.time} • {meal.calories}</p>
                  </div>
                  <button 
                    onClick={() => toggleMeal(meal.id)}
                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center ${
                      meal.status === 'completed'
                        ? 'bg-emerald-500 border-emerald-500 text-black'
                        : 'border-gray-500'
                    }`}
                  >
                    {meal.status === 'completed' && '✓'}
                  </button>
                </div>
                <div className="text-xs text-gray-400 mb-2">
                  {meal.foods.join(' • ')}
                </div>
                <div className="flex space-x-4 text-xs">
                  <span className="text-cyan-400">P: {meal.macros.protein}</span>
                  <span className="text-orange-400">C: {meal.macros.carbs}</span>
                  <span className="text-red-400">G: {meal.macros.fat}</span>
                </div>
              </div>
            ))}
          </div>
        </GlowingCard>

        {/* Suplementos */}
        <GlowingCard delay={500} glowColor="#EF4444">
          <h2 className="text-lg font-semibold text-red-400 mb-4">💊 Suplementos</h2>
          <div className="grid grid-cols-2 gap-3">
            {supplements.map((supp, index) => (
              <div 
                key={index}
                className={`p-3 rounded-xl border ${
                  supp.taken 
                    ? 'bg-emerald-900 bg-opacity-30 border-emerald-500 border-opacity-50' 
                    : 'bg-zinc-800 border-zinc-700'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-sm text-white">{supp.name}</p>
                    <p className="text-xs text-gray-400">{supp.time}</p>
                  </div>
                  <button 
                    onClick={() => toggleSupplement(supp.name)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center text-xs ${
                      supp.taken
                        ? 'bg-emerald-500 border-emerald-500 text-black'
                        : 'border-gray-500'
                    }`}
                  >
                    {supp.taken && '✓'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </GlowingCard>

        {/* Dica Nutricional */}
        <GlowingCard delay={600} glowColor="#FF00D4">
          <div className="text-center">
            <h3 className="text-sm font-semibold text-pink-400 uppercase tracking-wide mb-3">
              💡 DICA NUTRICIONAL
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Consuma proteína em todas as refeições para manter a síntese proteica ativa ao longo do dia e otimizar a recuperação muscular.
            </p>
          </div>
        </GlowingCard>

        {/* Resumo do Dia */}
        <GlowingCard delay={700} glowColor="#00FFF7">
          <h2 className="text-lg font-semibold text-cyan-400 mb-4">📈 Resumo do Dia</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-cyan-400">1.990</p>
              <p className="text-xs text-gray-400">Calorias</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-400">3/5</p>
              <p className="text-xs text-gray-400">Refeições</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-400">75%</p>
              <p className="text-xs text-gray-400">Meta diária</p>
            </div>
          </div>
        </GlowingCard>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-8 right-5 w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center shadow-lg hover:bg-purple-500 transition-colors">
        <span className="text-2xl">📝</span>
      </button>
    </div>
  );
};

export default DietScreen;