import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import WorkoutSummaryCard from '../components/WorkoutSummaryCard'; // Ajuste o caminho conforme necessário

// Dados mockados para teste
const mockWorkoutData = {
  userName: 'Deywid',
  workoutName: 'Treino A – Peito e Tríceps',
  duration: 45,
  difficulty: 'intermediário' as const,
  exerciseCount: 8,
  completedExercises: 3,
  weeklyPlan: ['A', 'B', 'C', 'Descanso', 'A', 'B', 'Descanso'],
  currentDay: 0,
};

const mockExercises = [
  { id: 1, name: 'Supino reto com barra', sets: 4, reps: '10-12', weight: '60kg', completed: true },
  { id: 2, name: 'Supino inclinado halteres', sets: 3, reps: '12-15', weight: '24kg', completed: true },
  { id: 3, name: 'Crucifixo no cabo', sets: 3, reps: '15', weight: '20kg', completed: true },
  { id: 4, name: 'Mergulho no paralelo', sets: 3, reps: '8-12', weight: 'Corporal', completed: false },
  { id: 5, name: 'Tríceps pulley', sets: 4, reps: '12-15', weight: '25kg', completed: false },
  { id: 6, name: 'Tríceps francês', sets: 3, reps: '10-12', weight: '18kg', completed: false },
  { id: 7, name: 'Tríceps coice', sets: 3, reps: '15', weight: '8kg', completed: false },
  { id: 8, name: 'Flexão diamante', sets: 2, reps: 'Máximo', weight: 'Corporal', completed: false },
];

const WorkoutScreen: React.FC = () => {
  const [isInProgress, setIsInProgress] = useState(false);

  const handleStartWorkout = () => {
    setIsInProgress(true);
    console.log('Treino iniciado!');
  };

  const progressPercentage = (mockWorkoutData.completedExercises / mockWorkoutData.exerciseCount) * 100;

  // Mock dos outros componentes
  const WorkoutHeader = () => (
    <View style={styles.header}>
      <Text style={styles.greeting}>
        Bora treinar hoje, {mockWorkoutData.userName}? 💪
      </Text>
      <Text style={styles.workoutTitle}>{mockWorkoutData.workoutName}</Text>
      
      {/* Divisão semanal */}
      <View style={styles.weeklyPlan}>
        {mockWorkoutData.weeklyPlan.map((day, index) => (
          <View
            key={index}
            style={[
              styles.dayButton,
              index === mockWorkoutData.currentDay && styles.currentDay,
            ]}
          >
            <Text
              style={[
                styles.dayText,
                index === mockWorkoutData.currentDay && styles.currentDayText,
              ]}
            >
              {day}
            </Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.viewPlanButton}>
        <Text style={styles.viewPlanText}>Ver plano completo</Text>
      </TouchableOpacity>
    </View>
  );

  const WorkoutProgress = () => (
    <View style={styles.progressContainer}>
      <View style={styles.progressHeader}>
        <Text style={styles.progressTitle}>Progresso do treino</Text>
        <Text style={styles.progressPercentage}>{Math.round(progressPercentage)}%</Text>
      </View>
      
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarBg}>
          <LinearGradient
            colors={['#00FFF7', '#0891B2']}
            style={[styles.progressBarFill, { width: `${progressPercentage}%` }]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        </View>
      </View>
      
      <Text style={styles.progressSubtitle}>
        {mockWorkoutData.completedExercises} de {mockWorkoutData.exerciseCount} exercícios concluídos
      </Text>
    </View>
  );

  const ExerciseCard = ({ exercise }: { exercise: any }) => (
    <View style={styles.exerciseCard}>
      <View style={styles.exerciseHeader}>
        <View style={styles.exerciseInfo}>
          <Text style={styles.exerciseName}>{exercise.name}</Text>
          <Text style={styles.exerciseDetails}>
            {exercise.sets}x{exercise.reps} • {exercise.weight}
          </Text>
        </View>
        
        <View style={styles.exerciseActions}>
          {exercise.completed ? (
            <View style={styles.completedBadge}>
              <Ionicons name="checkmark-circle" size={24} color="#10B981" />
            </View>
          ) : (
            <TouchableOpacity style={styles.playButton}>
              <Ionicons name="play-circle-outline" size={24} color="#8B5CF6" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );

  const WorkoutTip = () => (
    <View style={styles.tipContainer}>
      <View style={styles.tipCard}>
        <Ionicons name="bulb-outline" size={20} color="#F59E0B" />
        <Text style={styles.tipText}>
          Não esqueça do alongamento pós-treino!
        </Text>
      </View>
    </View>
  );

  const RightSideActionDots = () => (
    <View style={styles.actionDots}>
      <TouchableOpacity style={styles.actionDot}>
        <Ionicons name="musical-note" size={20} color="#00FFF7" />
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.actionDot}>
        <Ionicons name="help-circle-outline" size={20} color="#00FFF7" />
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.actionDot}>
        <Ionicons name="create-outline" size={20} color="#00FFF7" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D0D0D" />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <WorkoutHeader />
        
        <WorkoutSummaryCard
          duration={mockWorkoutData.duration}
          difficulty={mockWorkoutData.difficulty}
          exerciseCount={mockWorkoutData.exerciseCount}
          isInProgress={isInProgress}
          onPress={handleStartWorkout}
        />

        <WorkoutProgress />

        <WorkoutTip />

        {/* Lista de exercícios */}
        <View style={styles.exerciseList}>
          <Text style={styles.sectionTitle}>Exercícios de hoje</Text>
          {mockExercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </View>

        {/* Espaço extra no final */}
        <View style={{ height: 100 }} />
      </ScrollView>

      <RightSideActionDots />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  
  // Header styles
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  greeting: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
    marginBottom: 8,
  },
  workoutTitle: {
    fontSize: 24,
    color: '#00FFF7',
    fontWeight: '700',
    marginBottom: 16,
  },
  weeklyPlan: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dayButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  currentDay: {
    backgroundColor: 'rgba(139, 92, 246, 0.3)',
    borderColor: '#8B5CF6',
  },
  dayText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    fontWeight: '600',
  },
  currentDayText: {
    color: '#8B5CF6',
  },
  viewPlanButton: {
    alignSelf: 'flex-end',
  },
  viewPlanText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    textDecorationLine: 'underline',
  },

  // Progress styles
  progressContainer: {
    marginHorizontal: 20,
    marginVertical: 16,
    padding: 16,
    backgroundColor: 'rgba(20, 20, 20, 0.8)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 247, 0.2)',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  progressPercentage: {
    color: '#00FFF7',
    fontSize: 18,
    fontWeight: '700',
  },
  progressBarContainer: {
    marginBottom: 8,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressSubtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
  },

  // Exercise list styles
  exerciseList: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  exerciseCard: {
    backgroundColor: 'rgba(20, 20, 20, 0.8)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  exerciseDetails: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },
  exerciseActions: {
    marginLeft: 12,
  },
  completedBadge: {
    padding: 4,
  },
  playButton: {
    padding: 4,
  },

  // Tip styles
  tipContainer: {
    paddingHorizontal: 20,
    marginVertical: 8,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  tipText: {
    color: '#F59E0B',
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },

  // Action dots styles
  actionDots: {
    position: 'absolute',
    right: 20,
    top: '50%',
    transform: [{ translateY: -60 }],
    alignItems: 'center',
  },
  actionDot: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 255, 247, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 247, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
});

export default WorkoutScreen;