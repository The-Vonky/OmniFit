// src/screens/WorkoutScreen.tsx (ARQUIVO PRINCIPAL)
import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Importação dos componentes
import FuturisticHeader from '../components/Workout/FuturisticHeader';
import WorkoutStartCard from '../components/Workout/WorkoutStartCard';
import CyberProgress from '../components/Workout/CyberProgress';
import CyberTip from '../components/Workout/CyberTip';
import ExerciseList from '../components/Workout/ExerciseList';
import ActionPanel from '../components/Workout/ActionPanel';

// Dados mockados para teste
const mockWorkoutData = {
  userName: 'Deywid',
  workoutName: 'Peito + Ombro + Tríceps',
  duration: 69,
  difficulty: 'Pesado' as const,
  exerciseCount: 7,
  completedExercises: 3,
  weeklyPlan: ['A', 'B', 'C', 'DESC', 'A', 'B', 'DESC'],
  currentDay: 0,
};

const mockExercises = [
  { id: 1, name: 'Supino Reto Barra', sets: 4, reps: '10-12', weight: '60kg', completed: true, category: 'PEITO' },
  { id: 2, name: 'Supino Inclinado Halteres', sets: 3, reps: '12-15', weight: '24kg', completed: true, category: 'PEITO' },
  { id: 3, name: 'Crucifixo no Voador', sets: 3, reps: '15', weight: '20kg', completed: true, category: 'PEITO' },
  { id: 4, name: 'Desenvolvimento Militar Halteres', sets: 3, reps: '8-12', weight: 'Corporal', completed: false, category: 'PEITO' },
  { id: 5, name: 'Elevação Lateral', sets: 4, reps: '12-15', weight: '25kg', completed: false, category: 'TRÍCEPS' },
  { id: 6, name: 'Tríceps Testa Barra/Halt.', sets: 3, reps: '10-12', weight: '18kg', completed: false, category: 'TRÍCEPS' },
  { id: 7, name: 'Tríceps Corda Cross', sets: 3, reps: '15', weight: '8kg', completed: false, category: 'TRÍCEPS' },
];

const WorkoutScreen: React.FC = () => {
  const [isInProgress, setIsInProgress] = useState(false);

  const handleStartWorkout = () => {
    setIsInProgress(!isInProgress);
    console.log(isInProgress ? 'Treino pausado!' : 'Treino iniciado!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D0D0D" />
      
      <LinearGradient
        colors={['#0D0D0D', '#1A1A1A', '#0D0D0D']}
        style={styles.background}
      >
        {/* Painel de Ações Flutuante */}
        <ActionPanel />
        
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Header Principal */}
          <FuturisticHeader
            userName={mockWorkoutData.userName}
            workoutName={mockWorkoutData.workoutName}
            weeklyPlan={mockWorkoutData.weeklyPlan}
            currentDay={mockWorkoutData.currentDay}
          />

          {/* Card de Início do Treino */}
          <WorkoutStartCard
            duration={mockWorkoutData.duration}
            difficulty={mockWorkoutData.difficulty}
            exerciseCount={mockWorkoutData.exerciseCount}
            isInProgress={isInProgress}
            onStartWorkout={handleStartWorkout}
            pulseAnim={new Animated.Value(1)}
          />

          {/* Progresso Cyber */}
          <CyberProgress
            completedExercises={mockWorkoutData.completedExercises}
            exerciseCount={mockWorkoutData.exerciseCount}
            glowAnim={new Animated.Value(1)}
          />

          {/* Dica Neural */}
          <CyberTip />

          {/* Lista de Exercícios */}
          <ExerciseList 
            exercises={mockExercises}
            glowAnim={new Animated.Value(1)}
          />

          {/* Espaçamento inferior para scroll */}
          <View style={styles.bottomSpacer} />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  background: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  bottomSpacer: {
    height: 40,
  },
});

export default WorkoutScreen;