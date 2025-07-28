import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

import HeaderCard from '../components/HeaderCard';
import MacroProgressCard from '../components/MacroProgressCard';
import HydrationCard from '../components/HydrationCard';
import MealsCard from '../components/MealsCard';
import SupplementsCard from '../components/SupplementsCard';
import TipCard from '../components/TipCard';
import SummaryCard from '../components/SummaryCard';
import Toast from '../components/Toast';
import FloatingActionButton from '../components/FloatingButton';
import HomeHeader from '../components/HomeHeader';

const DietScreen: React.FC = () => {
  const [waterIntake, setWaterIntake] = useState(6);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [supplements, setSupplements] = useState([
    { name: 'Whey Protein', time: '10:00', taken: true },
    { name: 'Creatina', time: '14:00', taken: true },
    { name: 'Ômega 3', time: '19:00', taken: false },
    { name: 'Vitamina D', time: '08:00', taken: false },
  ]);

  const macroProgress = [
    { name: 'Proteína', current: 95, target: 160, unit: 'g', color: '#00FFF7', percentage: 59 },
    { name: 'Carboidrato', current: 72, target: 200, unit: 'g', color: '#F59E0B', percentage: 36 },
    { name: 'Gordura', current: 28, target: 60, unit: 'g', color: '#EF4444', percentage: 47 },
  ];

  const meals = [
    {
      id: 1,
      name: 'Café da Manhã',
      time: '07:30',
      calories: '420 kcal',
      status: 'completed',
      foods: ['Aveia com banana', 'Ovos mexidos', 'Café preto'],
      macros: { protein: '25g', carbs: '45g', fat: '12g' },
    },
    {
      id: 2,
      name: 'Lanche da Manhã',
      time: '10:00',
      calories: '180 kcal',
      status: 'completed',
      foods: ['Whey protein', 'Banana'],
      macros: { protein: '30g', carbs: '15g', fat: '2g' },
    },
    {
      id: 3,
      name: 'Almoço',
      time: '12:30',
      calories: '650 kcal',
      status: 'pending',
      foods: ['Frango grelhado', 'Arroz integral', 'Brócolis', 'Salada'],
      macros: { protein: '45g', carbs: '60g', fat: '18g' },
    },
    {
      id: 4,
      name: 'Lanche da Tarde',
      time: '15:30',
      calories: '220 kcal',
      status: 'pending',
      foods: ['Iogurte grego', 'Castanhas', 'Mel'],
      macros: { protein: '20g', carbs: '12g', fat: '14g' },
    },
    {
      id: 5,
      name: 'Jantar',
      time: '19:00',
      calories: '520 kcal',
      status: 'pending',
      foods: ['Salmão grelhado', 'Batata doce', 'Aspargos'],
      macros: { protein: '40g', carbs: '35g', fat: '22g' },
    },
  ];

  const displayToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const addWater = () => {
    setWaterIntake((prev) => Math.min(prev + 1, 8)); // Limita a 8 copos
    displayToast('💧 Mais um copo de água registrado!');
  };

  const toggleSupplement = (name: string) => {
    setSupplements((prev) =>
      prev.map((supp) =>
        supp.name === name ? { ...supp, taken: !supp.taken } : supp
      )
    );
    displayToast(`💊 ${name} marcado/desmarcado!`);
  };

  const toggleMeal = (id: number) => {
    // Aqui você poderia atualizar o status da refeição (pendente/completada)
    displayToast(`🍽️ Refeição ${id} marcada/desmarcada!`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Toast message={toastMessage} visible={showToast} />
      <HomeHeader
        username="Deywid Braga"
      />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <HeaderCard totalCalories={1990} />
        <MacroProgressCard macros={macroProgress} />
        <HydrationCard
          currentGlasses={waterIntake}
          goalGlasses={8}
          onAddWater={addWater}
        />
        <MealsCard meals={meals} onToggleMeal={toggleMeal} />
        <SupplementsCard supplements={supplements} onToggle={toggleSupplement} />
        <TipCard tip="Consuma proteína em todas as refeições para manter a síntese proteica ativa ao longo do dia e otimizar a recuperação muscular." />
        <SummaryCard
          calories={1990}
          mealsCompleted={meals.filter((m) => m.status === 'completed').length}
          mealsTotal={meals.length}
          dailyGoalPercent={75}
        />
      </ScrollView>
      <FloatingActionButton
        icon="📝"
        onPress={() => displayToast('📝 Botão pressionado!')}
        accessibilityLabel="Botão para adicionar anotação"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#09090B',
  },
  container: {
    padding: 20,
    paddingBottom: 80,
  },
});

export default DietScreen;