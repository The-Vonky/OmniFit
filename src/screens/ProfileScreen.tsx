import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import HomeHeader from '../components/TEC/HomeHeader';
import DaySummaryCard from '../components/TEC/DaySummaryCard';
import ProgressOverviewCard from '../components/TEC/ProgressOverviewCard';
import DailyMacrosCard from '../components/TEC/DailyMacrosCard';
import WaterTrackerCard from '../components/TEC/WaterTrackerCard';
import QuickWorkoutCard from '../components/TEC/QuickWorkoutCard';
import WorkoutHistoryList from '../components/TEC/WorkoutHistoryList';

const historyData = [
  { id: '1', date: '2025-07-15', workoutType: 'Treino de Pernas', status: 'Completo' },
  { id: '2', date: '2025-07-14', workoutType: 'Treino de Peito e Tríceps', status: 'Pendente' },
  { id: '3', date: '2025-07-13', workoutType: 'Treino de Costas', status: 'Completo' },
];

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <HomeHeader
        username="Deywid Braga"
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <DaySummaryCard
          workoutType="Treino A - Peito e Tríceps"
          status="Próximo Treino"
          motivationalPhrase="Hoje é o dia de superar seus limites! Cada repetição te aproxima dos seus objetivos. Lembre-se: a força não vem da capacidade física, mas da vontade indomável."
          onStartPress={() => {
            console.log('Iniciar treino pressionado!');
          }}
        />


        <DailyMacrosCard
          calories={{ current: 1800, goal: 2200 }}
          protein={{ current: 110, goal: 150 }}
          carbs={{ current: 200, goal: 250 }}
          fat={{ current: 60, goal: 80 }}
        />

        <ProgressOverviewCard
          weight={75}
          bodyFat={15}
          muscleMass={65}
          progressImage="https://example.com/progress.jpg"
        />

        <WaterTrackerCard
          cupsDrank={6}
          dailyGoal={8}
          onAddCup={() => console.log('Mais um copo!')}
        />

        <QuickWorkoutCard
          exercises={[
            'Agachamento x15',
            'Flexão x10',
            'Prancha 30s',
          ]}
          onStartQuickWorkout={() => console.log('Treino rápido iniciado!')}
        />

        <WorkoutHistoryList history={historyData} />

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  content: {
    flex: 1,
    paddingTop: 10,
  },
});

export default ProfileScreen;