import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import WorkoutSummaryCard from '../components/WorkoutSummaryCard';

const { width } = Dimensions.get('window');

// Dados mockados para teste
const mockWorkoutData = {
  userName: 'Deywid',
  workoutName: 'TREINO A – PEITO & TRÍCEPS',
  duration: 45,
  difficulty: 'intermediário' as const,
  exerciseCount: 8,
  completedExercises: 3,
  weeklyPlan: ['A', 'B', 'C', 'REST', 'A', 'B', 'REST'],
  currentDay: 0,
};

const mockExercises = [
  { id: 1, name: 'Supino Reto Barra', sets: 4, reps: '10-12', weight: '60kg', completed: true, category: 'PEITO' },
  { id: 2, name: 'Supino Inclinado Halteres', sets: 3, reps: '12-15', weight: '24kg', completed: true, category: 'PEITO' },
  { id: 3, name: 'Crucifixo no Cabo', sets: 3, reps: '15', weight: '20kg', completed: true, category: 'PEITO' },
  { id: 4, name: 'Mergulho Paralelo', sets: 3, reps: '8-12', weight: 'Corporal', completed: false, category: 'PEITO' },
  { id: 5, name: 'Tríceps Pulley', sets: 4, reps: '12-15', weight: '25kg', completed: false, category: 'TRÍCEPS' },
  { id: 6, name: 'Tríceps Francês', sets: 3, reps: '10-12', weight: '18kg', completed: false, category: 'TRÍCEPS' },
  { id: 7, name: 'Tríceps Coice', sets: 3, reps: '15', weight: '8kg', completed: false, category: 'TRÍCEPS' },
  { id: 8, name: 'Flexão Diamante', sets: 2, reps: 'MAX', weight: 'Corporal', completed: false, category: 'TRÍCEPS' },
];

const WorkoutScreen: React.FC = () => {
  const [isInProgress, setIsInProgress] = useState(false);
  const [pulseAnim] = useState(new Animated.Value(1));
  const [glowAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Animação de pulso contínua para elementos ativos
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Animação de brilho
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const handleStartWorkout = () => {
    setIsInProgress(true);
    console.log('Treino iniciado!');
  };

  const progressPercentage = (mockWorkoutData.completedExercises / mockWorkoutData.exerciseCount) * 100;

  // Header redesenhado - mais limpo e elegante
  const FuturisticHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Olá, {mockWorkoutData.userName}! 👋</Text>
          <Text style={styles.workoutTitle}>{mockWorkoutData.workoutName}</Text>
          
          {/* Plano semanal minimalista */}
          <View style={styles.weeklyPlanContainer}>
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
            <Text style={styles.weekLabel}>Semana atual</Text>
          </View>
        </View>
      </View>
    </View>
  );

  // Progress com visual cyberpunk
  const CyberProgress = () => (
    <View style={styles.progressContainer}>
      <LinearGradient
        colors={['rgba(0,255,247,0.05)', 'rgba(139,92,246,0.05)']}
        style={styles.progressCard}
      >
        <View style={styles.progressHeader}>
          <View>
            <Text style={styles.progressTitle}>SYSTEM STATUS</Text>
            <Text style={styles.progressSubtitle}>Neural Pattern Analysis</Text>
          </View>
          <View style={styles.progressPercentageContainer}>
            <Text style={styles.progressPercentage}>{Math.round(progressPercentage)}</Text>
            <Text style={styles.progressUnit}>%</Text>
          </View>
        </View>
        
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBg}>
            <Animated.View style={[
              styles.progressBarFill, 
              { 
                width: `${progressPercentage}%`,
                opacity: glowAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1]
                })
              }
            ]}>
              <LinearGradient
                colors={['#00FFF7', '#8B5CF6', '#EC4899']}
                style={styles.progressGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              />
            </Animated.View>
          </View>
          <View style={styles.progressGrid}>
            {[...Array(10)].map((_, i) => (
              <View key={i} style={styles.progressGridLine} />
            ))}
          </View>
        </View>
        
        <Text style={styles.progressDetails}>
          {mockWorkoutData.completedExercises} / {mockWorkoutData.exerciseCount} MODULES EXECUTED
        </Text>
      </LinearGradient>
    </View>
  );

  // Card de exercício futurista
  const CyberExerciseCard = ({ exercise, index }: { exercise: any; index: number }) => (
    <View style={[styles.exerciseCard, { marginTop: index === 0 ? 0 : 12 }]}>
      <LinearGradient
        colors={exercise.completed 
          ? ['rgba(16,185,129,0.1)', 'rgba(16,185,129,0.05)'] 
          : ['rgba(139,92,246,0.1)', 'rgba(0,255,247,0.05)']}
        style={styles.exerciseGradient}
      >
        <View style={styles.exerciseContent}>
          <View style={styles.exerciseLeft}>
            <View style={styles.exerciseCategory}>
              <Text style={styles.categoryText}>{exercise.category}</Text>
            </View>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            <View style={styles.exerciseStats}>
              <View style={styles.statItem}>
                <Ionicons name="repeat" size={14} color="#00FFF7" />
                <Text style={styles.statText}>{exercise.sets}</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="fitness" size={14} color="#8B5CF6" />
                <Text style={styles.statText}>{exercise.reps}</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="barbell" size={14} color="#EC4899" />
                <Text style={styles.statText}>{exercise.weight}</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.exerciseRight}>
            {exercise.completed ? (
              <View style={styles.completedContainer}>
                <LinearGradient
                  colors={['#10B981', '#059669']}
                  style={styles.completedBadge}
                >
                  <Ionicons name="checkmark" size={20} color="#FFF" />
                </LinearGradient>
                <Text style={styles.completedText}>DONE</Text>
              </View>
            ) : (
              <TouchableOpacity style={styles.playContainer}>
                <LinearGradient
                  colors={['#8B5CF6', '#EC4899']}
                  style={styles.playButton}
                >
                  <Ionicons name="play" size={16} color="#FFF" />
                </LinearGradient>
                <Text style={styles.playText}>START</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        
        {/* Efeito de scan line */}
        {!exercise.completed && (
          <Animated.View 
            style={[
              styles.scanLine,
              {
                opacity: glowAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.3, 0.8]
                })
              }
            ]} 
          />
        )}
      </LinearGradient>
    </View>
  );

  // Tip futurista
  const CyberTip = () => (
    <View style={styles.tipContainer}>
      <LinearGradient
        colors={['rgba(245,158,11,0.1)', 'rgba(245,158,11,0.05)']}
        style={styles.tipCard}
      >
        <View style={styles.tipIcon}>
          <Ionicons name="flash" size={18} color="#F59E0B" />
        </View>
        <View style={styles.tipContent}>
          <Text style={styles.tipTitle}>NEURAL TIP</Text>
          <Text style={styles.tipText}>
            Optimize recovery protocol with post-workout stretching sequence
          </Text>
        </View>
      </LinearGradient>
    </View>
  );

  // Action panel lateral
  const ActionPanel = () => (
    <View style={styles.actionPanel}>
      <TouchableOpacity style={styles.actionButton}>
        <LinearGradient
          colors={['rgba(0,255,247,0.2)', 'rgba(0,255,247,0.1)']}
          style={styles.actionButtonGradient}
        >
          <Ionicons name="musical-notes" size={18} color="#00FFF7" />
        </LinearGradient>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.actionButton}>
        <LinearGradient
          colors={['rgba(139,92,246,0.2)', 'rgba(139,92,246,0.1)']}
          style={styles.actionButtonGradient}
        >
          <Ionicons name="help-circle" size={18} color="#8B5CF6" />
        </LinearGradient>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.actionButton}>
        <LinearGradient
          colors={['rgba(236,72,153,0.2)', 'rgba(236,72,153,0.1)']}
          style={styles.actionButtonGradient}
        >
          <Ionicons name="settings" size={18} color="#EC4899" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Background com efeito matrix */}
      <View style={styles.backgroundPattern} />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <FuturisticHeader />
        
  // Card de iniciar treino redesenhado
  const WorkoutStartCard = () => (
    <View style={styles.workoutCardContainer}>
      <TouchableOpacity 
        style={styles.workoutCard}
        onPress={handleStartWorkout}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={isInProgress 
            ? ['#10B981', '#059669'] 
            : ['#8B5CF6', '#EC4899']
          }
          style={styles.workoutCardGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.workoutCardContent}>
            <View style={styles.workoutCardLeft}>
              <Text style={styles.workoutCardDuration}>{mockWorkoutData.duration} min</Text>
              <Text style={styles.workoutCardDifficulty}>{mockWorkoutData.difficulty}</Text>
              <Text style={styles.workoutCardExercises}>{mockWorkoutData.exerciseCount} exercícios</Text>
            </View>
            
            <View style={styles.workoutCardRight}>
              <View style={styles.workoutCardButton}>
                <Ionicons 
                  name={isInProgress ? "pause" : "play"} 
                  size={28} 
                  color="#FFFFFF" 
                />
              </View>
            </View>
          </View>
          
          {isInProgress && (
            <View style={styles.workoutCardProgress}>
              <Text style={styles.workoutCardProgressText}>Treino em andamento...</Text>
            </View>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

        <CyberProgress />

        <CyberTip />

        {/* Lista de exercícios */}
        <View style={styles.exerciseList}>
          <Text style={styles.sectionTitle}>TRAINING MODULES</Text>
          <View style={styles.sectionUnderline} />
          {mockExercises.map((exercise, index) => (
            <CyberExerciseCard key={exercise.id} exercise={exercise} index={index} />
          ))}
        </View>

        {/* Espaço extra no final */}
        <View style={{ height: 120 }} />
      </ScrollView>

      <ActionPanel />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  
  // Header redesenhado - mais limpo
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  header: {
    // Container principal
  },
  headerContent: {
    // Conteúdo do header
  },
  greeting: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 8,
  },
  workoutTitle: {
    fontSize: 20,
    color: '#00FFF7',
    fontWeight: '700',
    marginBottom: 24,
    letterSpacing: 0.5,
  },
  weeklyPlanContainer: {
    alignItems: 'center',
  },
  weekLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '500',
    marginTop: 12,
  },
  weeklyPlan: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  currentDay: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  dayText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 11,
    fontWeight: '600',
  },
  currentDayText: {
    color: '#FFFFFF',
  },

  // Card de treino redesenhado
  workoutCardContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  workoutCard: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  workoutCardGradient: {
    padding: 20,
  },
  workoutCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  workoutCardLeft: {
    flex: 1,
  },
  workoutCardDuration: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: '900',
    marginBottom: 4,
  },
  workoutCardDifficulty: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
    textTransform: 'capitalize',
    marginBottom: 2,
  },
  workoutCardExercises: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
  },
  workoutCardRight: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  workoutCardButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  workoutCardProgress: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  workoutCardProgressText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },

  // Progress cyberpunk
  progressContainer: {
    marginHorizontal: 20,
    marginVertical: 16,
  },
  progressCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 247, 0.2)',
    backgroundColor: 'rgba(13, 13, 13, 0.8)',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  progressTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1,
  },
  progressSubtitle: {
    color: '#8B5CF6',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginTop: 2,
  },
  progressPercentageContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  progressPercentage: {
    color: '#00FFF7',
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -1,
  },
  progressUnit: {
    color: '#00FFF7',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 2,
  },
  progressBarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressGradient: {
    flex: 1,
  },
  progressGrid: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressGridLine: {
    width: 1,
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  progressDetails: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
  },

  // Exercise cards futuristas
  exerciseList: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 2,
    marginBottom: 8,
  },
  sectionUnderline: {
    height: 2,
    width: 80,
    backgroundColor: '#8B5CF6',
    borderRadius: 1,
    marginBottom: 20,
  },
  exerciseCard: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  exerciseGradient: {
    padding: 16,
    position: 'relative',
  },
  exerciseContent: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  exerciseLeft: {
    flex: 1,
  },
  exerciseCategory: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    borderRadius: 4,
    marginBottom: 8,
  },
  categoryText: {
    color: '#8B5CF6',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  exerciseName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  exerciseStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  exerciseRight: {
    alignItems: 'center',
  },
  completedContainer: {
    alignItems: 'center',
  },
  completedBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  completedText: {
    color: '#10B981',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  playContainer: {
    alignItems: 'center',
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  playText: {
    color: '#8B5CF6',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  scanLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#00FFF7',
  },

  // Tip futurista
  tipContainer: {
    paddingHorizontal: 20,
    marginVertical: 12,
  },
  tipCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
    alignItems: 'center',
  },
  tipIcon: {
    marginRight: 12,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    color: '#F59E0B',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 4,
  },
  tipText: {
    color: 'rgba(245, 158, 11, 0.9)',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18,
  },
});

export default WorkoutScreen;