import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Modal,
  Animated,
  Dimensions,
  Alert,
  PanGestureHandler,
  State,
  Haptics,
  SafeAreaView,
  ImageBackground,
  Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

const { width, height } = Dimensions.get('window');

// Types
interface ExerciseHistory {
  date: string;
  sets: Array<{
    weight: number;
    reps: number;
    dropset?: {
      originalWeight: number;
      dropWeight: number;
      dropReps: number;
    };
  }>;
  notes?: string;
}

interface Exercise {
  id: string;
  name: string;
  sets: number;
  targetReps: string;
  currentWeight: number;
  completed: boolean;
  hasVideo: boolean;
  muscle: string;
  difficulty: 'easy' | 'medium' | 'hard';
  notes?: string;
  history: ExerciseHistory[];
  currentSets: Array<{
    completed: boolean;
    weight?: number;
    reps?: number;
    dropset?: boolean;
  }>;
}

interface WorkoutData {
  id: string;
  name: string;
  type: string;
  estimatedTime: number;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  exercises: Exercise[];
  lastPerformed?: string;
}

// Enhanced Mock Data with History
const mockWorkout: WorkoutData = {
  id: '1',
  name: 'Treino A – Peito e Tríceps',
  type: 'A',
  estimatedTime: 45,
  difficulty: 'Intermediário',
  lastPerformed: '2025-08-04',
  exercises: [
    {
      id: '1',
      name: 'Supino reto com barra',
      sets: 4,
      targetReps: '8-12',
      currentWeight: 70,
      completed: true,
      hasVideo: true,
      muscle: 'Peito',
      difficulty: 'hard',
      currentSets: [
        { completed: true, weight: 70, reps: 10 },
        { completed: true, weight: 70, reps: 8 },
        { completed: true, weight: 70, reps: 6 },
        { completed: true, weight: 65, reps: 8, dropset: true }
      ],
      history: [
        {
          date: '2025-08-04',
          sets: [
            { weight: 65, reps: 12 },
            { weight: 65, reps: 10 },
            { weight: 65, reps: 8 },
            { weight: 65, reps: 6, dropset: { originalWeight: 65, dropWeight: 50, dropReps: 8 } }
          ]
        }
      ]
    },
    {
      id: '2',
      name: 'Supino inclinado com halteres',
      sets: 3,
      targetReps: '10-15',
      currentWeight: 30,
      completed: true,
      hasVideo: true,
      muscle: 'Peito',
      difficulty: 'medium',
      currentSets: [
        { completed: true, weight: 30, reps: 12 },
        { completed: true, weight: 30, reps: 10 },
        { completed: true, weight: 30, reps: 8 }
      ],
      history: [
        {
          date: '2025-08-04',
          sets: [
            { weight: 28, reps: 15 },
            { weight: 28, reps: 12 },
            { weight: 28, reps: 10 }
          ]
        }
      ]
    },
    {
      id: '3',
      name: 'Crucifixo reto',
      sets: 3,
      targetReps: '12-15',
      currentWeight: 25,
      completed: false,
      hasVideo: true,
      muscle: 'Peito',
      difficulty: 'easy',
      currentSets: [
        { completed: false },
        { completed: false },
        { completed: false }
      ],
      history: [
        {
          date: '2025-08-04',
          sets: [
            { weight: 22, reps: 15 },
            { weight: 22, reps: 12 },
            { weight: 22, reps: 10, dropset: { originalWeight: 22, dropWeight: 18, dropReps: 6 } }
          ]
        }
      ]
    },
    {
      id: '4',
      name: 'Mergulho nas paralelas',
      sets: 3,
      targetReps: '8-12',
      currentWeight: 0,
      completed: false,
      hasVideo: true,
      muscle: 'Peito',
      difficulty: 'hard',
      currentSets: [
        { completed: false },
        { completed: false },
        { completed: false }
      ],
      history: [
        {
          date: '2025-08-04',
          sets: [
            { weight: 0, reps: 12 },
            { weight: 0, reps: 10 },
            { weight: 0, reps: 8 }
          ]
        }
      ]
    },
    {
      id: '5',
      name: 'Tríceps testa com barra W',
      sets: 4,
      targetReps: '10-12',
      currentWeight: 25,
      completed: false,
      hasVideo: false,
      muscle: 'Tríceps',
      difficulty: 'medium',
      currentSets: [
        { completed: false },
        { completed: false },
        { completed: false },
        { completed: false }
      ],
      history: [
        {
          date: '2025-08-04',
          sets: [
            { weight: 22, reps: 12 },
            { weight: 22, reps: 10 },
            { weight: 22, reps: 8 },
            { weight: 22, reps: 6 }
          ]
        }
      ]
    },
    {
      id: '6',
      name: 'Tríceps pulley',
      sets: 3,
      targetReps: '12-15',
      currentWeight: 40,
      completed: false,
      hasVideo: true,
      muscle: 'Tríceps',
      difficulty: 'easy',
      currentSets: [
        { completed: false },
        { completed: false },
        { completed: false }
      ],
      history: [
        {
          date: '2025-08-04',
          sets: [
            { weight: 35, reps: 15 },
            { weight: 35, reps: 12 },
            { weight: 35, reps: 10 }
          ]
        }
      ]
    }
  ],
};

const weekDays = [
  { day: 'A', active: true, completed: false },
  { day: 'B', active: false, completed: true },
  { day: 'C', active: false, completed: false },
  { day: 'Des', active: false, completed: true },
  { day: 'A', active: false, completed: false },
  { day: 'B', active: false, completed: false },
  { day: 'C', active: false, completed: false },
];

const workoutTips = [
  "Não esqueça do alongamento pós-treino! 🧘‍♂️",
  "Hidrate-se durante o treino! 💧",
  "Foque na execução, não no peso! 🎯",
  "Descanse 90-120s entre as séries! ⏱️",
  "Respire corretamente durante o exercício! 🫁",
  "Dropsets quebram platôs! 🔥",
  "Progressão constante é a chave! 📈",
];

const WorkoutScreen: React.FC = () => {
  const [workout, setWorkout] = useState<WorkoutData>(mockWorkout);
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [currentTip] = useState(workoutTips[Math.floor(Math.random() * workoutTips.length)]);
  const [restTimer, setRestTimer] = useState(0);
  const [isResting, setIsResting] = useState(false);
  
  // Animations
  const progressAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const particleAnims = useRef(Array.from({ length: 6 }, () => new Animated.Value(0))).current;

  // Rest timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isResting && restTimer > 0) {
      interval = setInterval(() => {
        setRestTimer(prev => {
          if (prev <= 1) {
            setIsResting(false);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            Alert.alert("Descanso terminado! 🔥", "Bora para a próxima série!");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isResting, restTimer]);

  // Animations setup
  useEffect(() => {
    const completedCount = workout.exercises.filter(ex => ex.completed).length;
    const progress = completedCount / workout.exercises.length;
    
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 800,
      useNativeDriver: false,
    }).start();

    // Continuous glow animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 0, duration: 2000, useNativeDriver: true }),
      ])
    ).start();

    // Floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: 1, duration: 3000, useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue: 0, duration: 3000, useNativeDriver: true }),
      ])
    ).start();
  }, [workout]);

  // Particle explosion animation
  const triggerParticleAnimation = useCallback(() => {
    particleAnims.forEach((anim, index) => {
      anim.setValue(0);
      Animated.timing(anim, {
        toValue: 1,
        duration: 1000,
        delay: index * 100,
        useNativeDriver: true,
      }).start();
    });
  }, []);

  // Memoized calculations
  const progressPercentage = useMemo(() => {
    const completed = workout.exercises.filter(ex => ex.completed).length;
    return Math.round((completed / workout.exercises.length) * 100);
  }, [workout.exercises]);

  const remainingTime = useMemo(() => {
    const completed = workout.exercises.filter(ex => ex.completed).length;
    const remaining = workout.exercises.length - completed;
    const timePerExercise = workout.estimatedTime / workout.exercises.length;
    return Math.round(remaining * timePerExercise);
  }, [workout]);

  const toggleExerciseComplete = useCallback((exerciseId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    setWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.map(ex => {
        if (ex.id === exerciseId) {
          const wasCompleted = ex.completed;
          if (!wasCompleted) {
            triggerParticleAnimation();
            // Start rest timer for completed exercise
            setRestTimer(90); // 90 seconds
            setIsResting(true);
          }
          return { ...ex, completed: !ex.completed };
        }
        return ex;
      })
    }));
  }, [triggerParticleAnimation]);

  const handleStartWorkout = useCallback(() => {
    setWorkoutStarted(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert("Bora treinar! 💪", "Treino iniciado! Dê o seu melhor hoje!");
  }, []);

  const handleCompleteWorkout = useCallback(() => {
    const allCompleted = workout.exercises.every(ex => ex.completed);
    if (allCompleted) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert(
        "Treino concluído! 🎉",
        "Mandou muito bem! Mais um treino completo no histórico 👏",
        [{ text: "Finalizar", style: "default" }]
      );
    } else {
      Alert.alert(
        "Ainda não terminou! 💪",
        "Faltam alguns exercícios. Bora finalizar com tudo!"
      );
    }
  }, [workout.exercises]);

  // Format last performance data
  const getLastPerformanceText = useCallback((exercise: Exercise) => {
    const lastHistory = exercise.history[0];
    if (!lastHistory) return null;
    
    const hasDropset = lastHistory.sets.some(set => set.dropset);
    const avgWeight = lastHistory.sets.reduce((acc, set) => acc + set.weight, 0) / lastHistory.sets.length;
    
    if (hasDropset) {
      const dropsetInfo = lastHistory.sets.find(set => set.dropset)?.dropset;
      return `Último: ${avgWeight}kg • Dropset ${dropsetInfo?.originalWeight}kg → ${dropsetInfo?.dropWeight}kg`;
    } else {
      return `Último: ${avgWeight}kg • Sem dropset`;
    }
  }, []);

  // Components
  const WorkoutHeader = React.memo(() => (
    <LinearGradient
      colors={['rgba(139, 92, 246, 0.1)', 'transparent']}
      style={styles.headerContainer}
    >
      <Animated.View style={[
        styles.headerContent,
        {
          transform: [{
            translateY: floatAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -5],
            })
          }]
        }
      ]}>
        <Text style={styles.greeting}>Bora treinar hoje, Deywid? 💪</Text>
        <Text style={styles.workoutName}>{workout.name}</Text>
        
        {workout.lastPerformed && (
          <Text style={styles.lastPerformed}>
            Último treino: {new Date(workout.lastPerformed).toLocaleDateString('pt-BR')}
          </Text>
        )}
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.weekContainer}>
          {weekDays.map((item, index) => (
            <Pressable key={index} style={[
              styles.dayChip,
              item.active && styles.dayChipActive,
              item.completed && styles.dayChipCompleted
            ]}>
              <Text style={[
                styles.dayText,
                item.active && styles.dayTextActive,
                item.completed && styles.dayTextCompleted
              ]}>{item.day}</Text>
              {item.completed && (
                <Ionicons name="checkmark-circle" size={12} color="#10B981" style={styles.dayCheckmark} />
              )}
            </Pressable>
          ))}
        </ScrollView>
        
        <TouchableOpacity style={styles.viewPlanButton}>
          <Text style={styles.viewPlanText}>Ver plano completo</Text>
          <Ionicons name="chevron-forward" size={14} color="#00FFF7" />
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  ));

  const WorkoutSummaryCard = React.memo(() => (
    <View style={styles.summaryContainer}>
      <BlurView intensity={20} tint="dark" style={styles.summaryCard}>
        <LinearGradient
          colors={['rgba(139, 92, 246, 0.2)', 'rgba(139, 92, 246, 0.05)']}
          style={styles.summaryGradient}
        >
          <View style={styles.summaryHeader}>
            <View style={styles.summaryItem}>
              <View style={styles.summaryIconContainer}>
                <Ionicons name="time-outline" size={18} color="#00FFF7" />
              </View>
              <Text style={styles.summaryLabel}>{workout.estimatedTime}min</Text>
            </View>
            <View style={styles.summaryItem}>
              <View style={styles.summaryIconContainer}>
                <Ionicons name="trending-up-outline" size={18} color="#10B981" />
              </View>
              <Text style={styles.summaryLabel}>{workout.difficulty}</Text>
            </View>
            <View style={styles.summaryItem}>
              <View style={styles.summaryIconContainer}>
                <Ionicons name="fitness-outline" size={18} color="#8B5CF6" />
              </View>
              <Text style={styles.summaryLabel}>{workout.exercises.length} exercícios</Text>
            </View>
          </View>
          
          <TouchableOpacity
            style={[styles.startButton]}
            onPress={workoutStarted ? handleCompleteWorkout : handleStartWorkout}
          >
            <LinearGradient
              colors={workoutStarted ? ['#10B981', '#059669'] : ['#8B5CF6', '#7C3AED']}
              style={styles.startButtonGradient}
            >
              <Text style={styles.startButtonText}>
                {workoutStarted ? 'Finalizar treino' : 'Iniciar treino'}
              </Text>
              <Ionicons 
                name={workoutStarted ? "checkmark-circle" : "play-circle"} 
                size={20} 
                color="#FFFFFF" 
                style={styles.startButtonIcon} 
              />
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </BlurView>
    </View>
  ));

  const RestTimer = React.memo(() => {
    if (!isResting) return null;
    
    return (
      <BlurView intensity={40} tint="dark" style={styles.restTimerContainer}>
        <LinearGradient
          colors={['rgba(239, 68, 68, 0.3)', 'rgba(239, 68, 68, 0.1)']}
          style={styles.restTimer}
        >
          <Ionicons name="timer-outline" size={24} color="#EF4444" />
          <Text style={styles.restTimerText}>Descanso: {restTimer}s</Text>
          <TouchableOpacity 
            style={styles.skipRestButton}
            onPress={() => setIsResting(false)}
          >
            <Text style={styles.skipRestText}>Pular</Text>
          </TouchableOpacity>
        </LinearGradient>
      </BlurView>
    );
  });

  const WorkoutProgress = React.memo(() => (
    <View style={styles.progressContainer}>
      <View style={styles.progressHeader}>
        <Text style={styles.progressTitle}>Progresso do treino</Text>
        <Animated.Text style={[
          styles.progressPercentage,
          {
            transform: [{
              scale: glowAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.1],
              })
            }]
          }
        ]}>
          {progressPercentage}%
        </Animated.Text>
      </View>
      
      <View style={styles.progressBarContainer}>
        <Animated.View style={[
          styles.progressBar,
          {
            width: progressAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            })
          }
        ]} />
        <View style={styles.progressGlow} />
      </View>
      
      {workoutStarted && (
        <View style={styles.progressStats}>
          <Text style={styles.remainingTime}>
            ⏱️ Restam {remainingTime}min estimados
          </Text>
          <Text style={styles.completedExercises}>
            ✅ {workout.exercises.filter(ex => ex.completed).length}/{workout.exercises.length} exercícios
          </Text>
        </View>
      )}
    </View>
  ));

  const ExerciseCard = React.memo(({ exercise, index }: { exercise: Exercise; index: number }) => {
    const lastPerformance = getLastPerformanceText(exercise);
    const completedSets = exercise.currentSets.filter(set => set.completed).length;
    
    return (
      <TouchableOpacity 
        style={[
          styles.exerciseCard, 
          exercise.completed && styles.exerciseCardCompleted,
          { opacity: exercise.completed ? 0.8 : 1 }
        ]}
        onPress={() => {
          setSelectedExercise(exercise);
          setShowExerciseModal(true);
        }}
        onLongPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          toggleExerciseComplete(exercise.id);
        }}
      >
        <BlurView intensity={10} tint="dark" style={styles.exerciseCardBlur}>
          <LinearGradient
            colors={exercise.completed 
              ? ['rgba(16, 185, 129, 0.2)', 'rgba(16, 185, 129, 0.05)']
              : ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.02)']
            }
            style={styles.exerciseCardGradient}
          >
            <View style={styles.exerciseHeader}>
              <View style={styles.exerciseInfo}>
                <View style={styles.exerciseNameRow}>
                  <Text style={[
                    styles.exerciseName, 
                    exercise.completed && styles.exerciseNameCompleted
                  ]}>
                    {exercise.name}
                  </Text>
                  <View style={[styles.difficultyBadge, styles[`difficulty${exercise.difficulty}`]]}>
                    <Text style={styles.difficultyText}>{exercise.muscle}</Text>
                  </View>
                </View>
                
                <Text style={styles.exerciseDetails}>
                  {exercise.sets} séries • {exercise.targetReps} reps • {exercise.currentWeight}kg
                </Text>
                
                {lastPerformance && (
                  <Text style={styles.lastPerformance}>
                    {lastPerformance}
                  </Text>
                )}
                
                <View style={styles.setsProgress}>
                  {exercise.currentSets.map((set, setIndex) => (
                    <View 
                      key={setIndex}
                      style={[
                        styles.setDot,
                        set.completed && styles.setDotCompleted,
                        set.dropset && styles.setDotDropset
                      ]}
                    />
                  ))}
                </View>
              </View>
              
              <View style={styles.exerciseActions}>
                {exercise.hasVideo && (
                  <TouchableOpacity style={styles.videoButton}>
                    <Ionicons name="play-circle-outline" size={24} color="#00FFF7" />
                  </TouchableOpacity>
                )}
                
                <TouchableOpacity 
                  style={[styles.checkButton, exercise.completed && styles.checkButtonCompleted]}
                  onPress={() => toggleExerciseComplete(exercise.id)}
                >
                  <Ionicons 
                    name={exercise.completed ? "checkmark-circle" : "ellipse-outline"} 
                    size={24} 
                    color={exercise.completed ? "#10B981" : "#666"} 
                  />
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </BlurView>
        
        {/* Particle effects */}
        {exercise.completed && particleAnims.map((anim, particleIndex) => (
          <Animated.View
            key={particleIndex}
            style={[
              styles.particle,
              {
                opacity: anim,
                transform: [
                  {
                    translateX: anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, (particleIndex % 2 === 0 ? 1 : -1) * 50],
                    })
                  },
                  {
                    translateY: anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -80],
                    })
                  },
                  {
                    scale: anim.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [0, 1, 0],
                    })
                  }
                ]
              }
            ]}
          />
        ))}
      </TouchableOpacity>
    );
  });

  const WorkoutTip = React.memo(() => (
    <View style={styles.tipContainer}>
      <BlurView intensity={15} tint="dark" style={styles.tipCard}>
        <LinearGradient
          colors={['rgba(16, 185, 129, 0.2)', 'rgba(16, 185, 129, 0.05)']}
          style={styles.tipGradient}
        >
          <View style={styles.tipIconContainer}>
            <Ionicons name="bulb-outline" size={24} color="#10B981" />
          </View>
          <Text style={styles.tipText}>{currentTip}</Text>
        </LinearGradient>
      </BlurView>
    </View>
  ));

  const FloatingActionButton = React.memo(() => (
    <Animated.View style={[
      styles.fab,
      {
        transform: [{
          translateY: floatAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -10],
          })
        }]
      }
    ]}>
      <TouchableOpacity>
        <Animated.View style={[
          styles.fabGlow,
          {
            opacity: glowAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.3, 0.7],
            }),
            transform: [{
              scale: glowAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.3],
              })
            }]
          }
        ]} />
        <LinearGradient
          colors={['#8B5CF6', '#7C3AED']}
          style={styles.fabGradient}
        >
          <Ionicons name="add" size={28} color="#FFFFFF" />
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  ));

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D0D0D" />
      
      <ImageBackground
        source={{ uri: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDIpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=' }}
        style={styles.backgroundPattern}
        imageStyle={{ opacity: 0.03 }}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <WorkoutHeader />
          <WorkoutSummaryCard />
          <WorkoutProgress />
          
          <View style={styles.exerciseSection}>
            <Text style={styles.sectionTitle}>Exercícios de hoje 🔥</Text>
            {workout.exercises.map((exercise, index) => (
              <ExerciseCard key={exercise.id} exercise={exercise} index={index} />
            ))}
          </View>
          
          <WorkoutTip />
          
          <View style={{ height: 120 }} />
        </ScrollView>
        
        <RestTimer />
        <FloatingActionButton />
      </ImageBackground>

      {/* Enhanced Exercise Modal */}
      <Modal
        visible={showExerciseModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowExerciseModal(false)}
      >
        <BlurView intensity={50} tint="dark" style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <LinearGradient
              colors={['#1F1F1F', '#151515']}
              style={styles.modalGradient}
            >
              {selectedExercise && (
                <>
                  <View style={styles.modalHeader}>
                    <View>
                      <Text style={styles.modalTitle}>{selectedExercise.name}</Text>
                      <Text style={styles.modalSubtitle}>
                        {selectedExercise.sets} séries • {selectedExercise.targetReps} reps • {selectedExercise.currentWeight}kg
                      </Text>
                    </View>
                    <TouchableOpacity 
                      style={styles.modalCloseButton}
                      onPress={() => setShowExerciseModal(false)}
                    >
                      <Ionicons name="close" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                  
                  <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
                    {/* Current Sets */}
                    <View style={styles.modalSection}>
                      <Text style={styles.modalSectionTitle}>Séries de hoje</Text>
                      {selectedExercise.currentSets.map((set, index) => (
                        <View key={index} style={styles.setRow}>
                          <Text style={styles.setNumber}>Série {index + 1}</Text>
                          <View style={styles.setInputs}>
                            <Text style={styles.setInput}>{set.weight || '—'}kg</Text>
                            <Text style={styles.setInput}>{set.reps || '—'} reps</Text>
                            {set.dropset && (
                              <View style={styles.dropsetBadge}>
                                <Text style={styles.dropsetText}>Drop</Text>
                              </View>
                            )}
                          </View>
                          <TouchableOpacity 
                            style={[styles.setCheckbox, set.completed && styles.setCheckboxCompleted]}
                            onPress={() => {
                              // Toggle set completion logic here
                              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                            }}
                          >
                            <Ionicons 
                              name={set.completed ? "checkmark" : "ellipse-outline"} 
                              size={20} 
                              color={set.completed ? "#10B981" : "#666"} 
                            />
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>
                    
                    {/* Last Performance */}
                    {selectedExercise.history.length > 0 && (
                      <View style={styles.modalSection}>
                        <Text style={styles.modalSectionTitle}>Última performance</Text>
                        <View style={styles.historyCard}>
                          <Text style={styles.historyDate}>
                            {new Date(selectedExercise.history[0].date).toLocaleDateString('pt-BR')}
                          </Text>
                          {selectedExercise.history[0].sets.map((set, index) => (
                            <View key={index} style={styles.historySetRow}>
                              <Text style={styles.historySetText}>
                                Série {index + 1}: {set.weight}kg × {set.reps} reps
                                {set.dropset && ` → ${set.dropset.dropWeight}kg × ${set.dropset.dropReps} reps`}
                              </Text>
                              {set.dropset && <Ionicons name="trending-down" size={14} color="#F59E0B" />}
                            </View>
                          ))}
                        </View>
                      </View>
                    )}
                    
                    {/* Exercise Tips */}
                    <View style={styles.modalSection}>
                      <Text style={styles.modalSectionTitle}>Dicas de execução</Text>
                      <View style={styles.tipsList}>
                        <Text style={styles.tipItem}>• Mantenha controle total do movimento</Text>
                        <Text style={styles.tipItem}>• Foque na contração muscular</Text>
                        <Text style={styles.tipItem}>• Respire corretamente durante o exercício</Text>
                        <Text style={styles.tipItem}>• Não sacrifique a forma pelo peso</Text>
                      </View>
                    </View>
                    
                    <View style={{ height: 100 }} />
                  </ScrollView>
                  
                  {selectedExercise.hasVideo && (
                    <TouchableOpacity style={styles.modalVideoButton}>
                      <LinearGradient
                        colors={['#00FFF7', '#00E5D8']}
                        style={styles.modalVideoGradient}
                      >
                        <Ionicons name="play" size={20} color="#000000" />
                        <Text style={styles.modalVideoText}>Ver demonstração</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  )}
                </>
              )}
            </LinearGradient>
          </View>
        </BlurView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  backgroundPattern: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  headerContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  headerContent: {
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  workoutName: {
    fontSize: 18,
    color: '#B3B3B3',
    marginBottom: 8,
  },
  lastPerformed: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  weekContainer: {
    marginBottom: 16,
  },
  dayChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginRight: 8,
    minWidth: 40,
    alignItems: 'center',
    flexDirection: 'row',
  },
  dayChipActive: {
    backgroundColor: 'rgba(139, 92, 246, 0.3)',
    borderWidth: 1,
    borderColor: '#8B5CF6',
  },
  dayChipCompleted: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    borderWidth: 1,
    borderColor: '#10B981',
  },
  dayText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#B3B3B3',
  },
  dayTextActive: {
    color: '#8B5CF6',
  },
  dayTextCompleted: {
    color: '#10B981',
  },
  dayCheckmark: {
    marginLeft: 4,
  },
  viewPlanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  viewPlanText: {
    fontSize: 14,
    color: '#00FFF7',
    marginRight: 4,
  },
  summaryContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  summaryCard: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  summaryGradient: {
    padding: 20,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#B3B3B3',
    fontWeight: '500',
  },
  startButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  startButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginRight: 8,
  },
  startButtonIcon: {
    marginLeft: 4,
  },
  restTimerContainer: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    borderRadius: 16,
    overflow: 'hidden',
    zIndex: 1000,
  },
  restTimer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  restTimerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
    flex: 1,
    marginLeft: 12,
  },
  skipRestButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  skipRestText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  progressContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  progressPercentage: {
    fontSize: 24,
    fontWeight: '800',
    color: '#8B5CF6',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 16,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#8B5CF6',
    borderRadius: 4,
  },
  progressGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(139, 92, 246, 0.3)',
    borderRadius: 4,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  remainingTime: {
    fontSize: 12,
    color: '#B3B3B3',
  },
  completedExercises: {
    fontSize: 12,
    color: '#10B981',
  },
  exerciseSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  exerciseCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  exerciseCardCompleted: {
    transform: [{ scale: 0.98 }],
  },
  exerciseCardBlur: {
    borderRadius: 16,
  },
  exerciseCardGradient: {
    padding: 20,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  exerciseInfo: {
    flex: 1,
    marginRight: 16,
  },
  exerciseNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    flex: 1,
    marginRight: 8,
  },
  exerciseNameCompleted: {
    color: '#10B981',
    textDecorationLine: 'line-through',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyeasy: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
  },
  difficultymedium: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
  },
  difficultyhard: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  exerciseDetails: {
    fontSize: 14,
    color: '#B3B3B3',
    marginBottom: 8,
  },
  lastPerformance: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
  },
  setsProgress: {
    flexDirection: 'row',
    gap: 6,
  },
  setDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  setDotCompleted: {
    backgroundColor: '#10B981',
  },
  setDotDropset: {
    backgroundColor: '#F59E0B',
  },
  exerciseActions: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  videoButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 255, 247, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkButtonCompleted: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
  },
  particle: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  tipContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  tipCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  tipGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  tipIconContainer: {
    marginRight: 12,
  },
  tipText: {
    fontSize: 14,
    color: '#FFFFFF',
    flex: 1,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  fabGlow: {
    position: 'absolute',
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    backgroundColor: '#8B5CF6',
    borderRadius: 32,
  },
  fabGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    maxHeight: height * 0.8,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  modalGradient: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
    paddingBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#B3B3B3',
  },
  modalCloseButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  modalSection: {
    marginBottom: 24,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  setRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    marginBottom: 8,
  },
  setNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    minWidth: 60,
  },
  setInputs: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-around',
  },
  setInput: {
    fontSize: 14,
    color: '#B3B3B3',
    minWidth: 50,
    textAlign: 'center',
  },
  dropsetBadge: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  dropsetText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#F59E0B',
  },
  setCheckbox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  setCheckboxCompleted: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
  },
  historyCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
  },
  historyDate: {
    fontSize: 12,
    color: '#8B5CF6',
    fontWeight: '600',
    marginBottom: 8,
  },
  historySetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  historySetText: {
    fontSize: 12,
    color: '#B3B3B3',
    flex: 1,
  },
  tipsList: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
  },
  tipItem: {
    fontSize: 12,
    color: '#B3B3B3',
    marginBottom: 4,
    lineHeight: 16,
  },
  modalVideoButton: {
    margin: 20,
    marginTop: 0,
    borderRadius: 16,
    overflow: 'hidden',
  },
  modalVideoGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  modalVideoText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginLeft: 8,
  },
});

export default WorkoutScreen;