import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  weight: string;
  restTime: number;
  type: 'compound' | 'isolation';
  muscle: string;
  tips: string;
}

interface GlowingCardProps {
  children: React.ReactNode;
  style?: any;
  delay?: number;
  glowColor?: string;
}

export default function WorkoutScreen() {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [isRestTime, setIsRestTime] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [completedSets, setCompletedSets] = useState<number[]>([]);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  const exercises: Exercise[] = [
    {
      name: 'Supino Reto',
      sets: 4,
      reps: '8-10',
      weight: '80kg',
      restTime: 120,
      type: 'compound',
      muscle: 'Peitoral',
      tips: 'Mantenha os ombros retraídos e desça a barra até o peito'
    },
    {
      name: 'Supino Inclinado',
      sets: 3,
      reps: '10-12',
      weight: '70kg',
      restTime: 90,
      type: 'compound',
      muscle: 'Peitoral Superior',
      tips: 'Foque na contração do peitoral superior'
    },
    {
      name: 'Crucifixo',
      sets: 3,
      reps: '12-15',
      weight: '25kg',
      restTime: 60,
      type: 'isolation',
      muscle: 'Peitoral',
      tips: 'Movimento controlado, sinta o alongamento'
    },
    {
      name: 'Tríceps Pulley',
      sets: 4,
      reps: '12-15',
      weight: '40kg',
      restTime: 45,
      type: 'isolation',
      muscle: 'Tríceps',
      tips: 'Mantenha os cotovelos fixos ao lado do corpo'
    },
    {
      name: 'Tríceps Testa',
      sets: 3,
      reps: '10-12',
      weight: '30kg',
      restTime: 60,
      type: 'isolation',
      muscle: 'Tríceps',
      tips: 'Movimento apenas do antebraço'
    }
  ];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    displayToast('🔥 Treino iniciado! Vamos arrasar!');
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer => timer - 1);
      }, 1000);
    } else if (timer === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      if (isRestTime) {
        displayToast('⏰ Tempo de descanso acabou! Próxima série!');
        setIsRestTime(false);
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer, isRestTime]);

  const displayToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const startRestTimer = () => {
    const restTime = exercises[currentExercise].restTime;
    setTimer(restTime);
    setIsRestTime(true);
    setIsTimerRunning(true);
    displayToast(`⏱️ Descanso de ${restTime}s iniciado`);
  };

  const completeSet = (setIndex: number) => {
    const setKey = currentExercise * 10 + setIndex;
    if (!completedSets.includes(setKey)) {
      setCompletedSets([...completedSets, setKey]);
      displayToast(`✅ Série ${setIndex + 1} concluída!`);
      
      if (setIndex < exercises[currentExercise].sets - 1) {
        setTimeout(() => startRestTimer(), 500);
      }
    }
  };

  const nextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setTimer(0);
      setIsTimerRunning(false);
      setIsRestTime(false);
      displayToast(`🎯 Próximo: ${exercises[currentExercise + 1].name}`);
    } else {
      displayToast('🎉 Treino concluído! Parabéns!');
    }
  };

  const prevExercise = () => {
    if (currentExercise > 0) {
      setCurrentExercise(currentExercise - 1);
      setTimer(0);
      setIsTimerRunning(false);
      setIsRestTime(false);
    }
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = () => {
    setTimer(0);
    setIsTimerRunning(false);
    setIsRestTime(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const GlowingCard = ({ children, style, delay = 0, glowColor = '#00FFF7' }: GlowingCardProps) => {
    const cardAnimation = useRef(new Animated.Value(0)).current;
    const glowAnimation = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
      Animated.timing(cardAnimation, {
        toValue: 1,
        duration: 600,
        delay: delay,
        useNativeDriver: true,
      }).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnimation, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnimation, {
            toValue: 0.3,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, []);

    return (
      <Animated.View
        style={[
          {
            opacity: cardAnimation,
            transform: [
              {
                translateY: cardAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [30, 0],
                }),
              },
            ],
          },
          style,
        ]}
      >
        <View style={[styles.card, { 
          borderColor: glowColor,
          shadowColor: glowColor,
        }]}>
          <Animated.View 
            style={[
              styles.cardGlow, 
              { 
                backgroundColor: glowColor,
                opacity: glowAnimation,
              }
            ]} 
          />
          {children}
        </View>
      </Animated.View>
    );
  };

  const current = exercises[currentExercise];
  const progress = ((currentExercise + 1) / exercises.length) * 100;

  return (
    <View style={styles.container}>
      {/* Toast */}
      {showToast && (
        <Animated.View style={[styles.toast, { opacity: showToast ? 1 : 0 }]}>
          <View style={styles.toastContent}>
            <Text style={styles.toastText}>{toastMessage}</Text>
          </View>
        </Animated.View>
      )}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View 
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          <GlowingCard style={styles.headerCard} delay={100}>
            <View style={styles.headerContent}>
              <TouchableOpacity style={styles.backButton}>
                <Text style={styles.backButtonText}>←</Text>
              </TouchableOpacity>
              
              <View style={styles.headerInfo}>
                <Text style={styles.workoutMainTitle}>PEITO + TRÍCEPS</Text>
                <Text style={styles.exerciseCounter}>Exercício {currentExercise + 1} de {exercises.length}</Text>
              </View>

              <View style={styles.profileAvatar}>
                <Text style={styles.avatarText}>D</Text>
              </View>
            </View>
          </GlowingCard>
        </Animated.View>

        {/* Progress Bar */}
        <GlowingCard delay={200} glowColor="#7C3AED">
          <View style={styles.progressSection}>
            <Text style={styles.progressTitle}>Progresso do Treino</Text>
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
              </View>
              <Text style={styles.progressText}>{Math.round(progress)}% concluído</Text>
            </View>
          </View>
        </GlowingCard>

        {/* Current Exercise Card */}
        <GlowingCard delay={300} glowColor="#F59E0B">
          <View style={styles.exerciseCard}>
            <View style={styles.exerciseHeader}>
              <View>
                <Text style={styles.exerciseName}>{current.name}</Text>
                <View style={styles.exerciseMeta}>
                  <Text style={styles.exerciseMetaText}>🎯 {current.muscle}</Text>
                  <Text style={styles.exerciseMetaText}>⚡ {current.type}</Text>
                </View>
              </View>
            </View>

            {/* Exercise Details Grid */}
            <View style={styles.exerciseDetailsGrid}>
              <View style={styles.exerciseDetailItem}>
                <Text style={styles.exerciseDetailValue}>{current.sets}</Text>
                <Text style={styles.exerciseDetailLabel}>Séries</Text>
              </View>
              <View style={styles.exerciseDetailItem}>
                <Text style={styles.exerciseDetailValue}>{current.reps}</Text>
                <Text style={styles.exerciseDetailLabel}>Repetições</Text>
              </View>
              <View style={styles.exerciseDetailItem}>
                <Text style={styles.exerciseDetailValue}>{current.weight}</Text>
                <Text style={styles.exerciseDetailLabel}>Peso</Text>
              </View>
            </View>

            {/* Tips */}
            <View style={styles.tipsContainer}>
              <Text style={styles.tipsTitle}>💡 DICA TÉCNICA</Text>
              <Text style={styles.tipsText}>{current.tips}</Text>
            </View>
          </View>
        </GlowingCard>

        {/* Sets Tracking */}
        <GlowingCard delay={400} glowColor="#00FFF7">
          <View style={styles.setsCard}>
            <Text style={styles.setsTitle}>🏆 SÉRIES</Text>
            <View style={styles.setsGrid}>
              {Array.from({ length: current.sets }, (_, i) => {
                const setKey = currentExercise * 10 + i;
                const isCompleted = completedSets.includes(setKey);
                
                return (
                  <TouchableOpacity
                    key={i}
                    onPress={() => completeSet(i)}
                    style={[
                      styles.setButton,
                      isCompleted ? styles.setButtonCompleted : styles.setButtonIncomplete
                    ]}
                  >
                    <Text style={[
                      styles.setButtonTitle,
                      { color: isCompleted ? '#00FFF7' : '#666666' }
                    ]}>
                      Série {i + 1}
                    </Text>
                    <Text style={[
                      styles.setButtonReps,
                      { color: isCompleted ? '#00FFF7' : '#666666' }
                    ]}>
                      {current.reps} reps
                    </Text>
                    {isCompleted && <Text style={styles.checkMark}>✓</Text>}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </GlowingCard>

        {/* Rest Timer */}
        <GlowingCard delay={500} glowColor="#10B981">
          <View style={styles.timerCard}>
            <Text style={styles.timerTitle}>⏱️ DESCANSO</Text>
            
            <Text style={styles.timerDisplay}>{formatTime(timer)}</Text>
            
            <View style={styles.timerControls}>
              <TouchableOpacity
                onPress={toggleTimer}
                style={styles.timerButton}
              >
                <Text style={styles.timerButtonText}>{isTimerRunning ? '⏸️' : '▶️'}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={resetTimer}
                style={styles.timerResetButton}
              >
                <Text style={styles.timerResetButtonText}>🔄</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.timerRecommendation}>
              Descanso recomendado: {current.restTime}s
            </Text>
          </View>
        </GlowingCard>

        {/* Navigation */}
        <View style={styles.navigationContainer}>
          <TouchableOpacity
            onPress={prevExercise}
            disabled={currentExercise === 0}
            style={[
              styles.navButton,
              styles.navButtonSecondary,
              currentExercise === 0 && styles.navButtonDisabled
            ]}
          >
            <Text style={[
              styles.navButtonText,
              styles.navButtonSecondaryText,
              currentExercise === 0 && styles.navButtonDisabledText
            ]}>
              Anterior
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={nextExercise}
            style={[styles.navButton, styles.navButtonPrimary]}
          >
            <Text style={[styles.navButtonText, styles.navButtonPrimaryText]}>
              {currentExercise === exercises.length - 1 ? 'Finalizar' : 'Próximo'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  
  // Card base
  card: {
    backgroundColor: '#1A1A1A',
    borderRadius: 15,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    position: 'relative' as const,
    overflow: 'hidden' as const,
  },
  cardGlow: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    height: 2,
  },

  // Header
  header: {
    marginBottom: 10,
  },
  headerCard: {
    marginBottom: 0,
  },
  headerContent: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#00FFF7',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  backButtonText: {
    color: '#00FFF7',
    fontSize: 20,
    fontWeight: 'bold' as const,
  },
  headerInfo: {
    flex: 1,
    alignItems: 'center' as const,
    marginHorizontal: 15,
  },
  workoutMainTitle: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    color: '#00FFF7',
    textAlign: 'center' as const,
    fontFamily: 'Orbitron-Bold',
  },
  exerciseCounter: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00FFF7',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: '#000',
  },

  // Progress Section
  progressSection: {},
  progressTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#7C3AED',
    marginBottom: 12,
    textAlign: 'center' as const,
  },
  progressBarContainer: {
    alignItems: 'center' as const,
  },
  progressBarBg: {
    width: '100%',
    height: 8,
    backgroundColor: '#333333',
    borderRadius: 4,
    overflow: 'hidden' as const,
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#7C3AED',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#666666',
  },

  // Exercise Card
  exerciseCard: {},
  exerciseHeader: {
    marginBottom: 16,
  },
  exerciseName: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: '#F59E0B',
    marginBottom: 8,
    textAlign: 'center' as const,
    fontFamily: 'Orbitron-Bold',
  },
  exerciseMeta: {
    flexDirection: 'row' as const,
    justifyContent: 'center' as const,
    gap: 16,
  },
  exerciseMetaText: {
    fontSize: 14,
    color: '#666666',
  },
  exerciseDetailsGrid: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    marginBottom: 20,
  },
  exerciseDetailItem: {
    flex: 1,
    alignItems: 'center' as const,
    padding: 12,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderRadius: 12,
    marginHorizontal: 4,
  },
  exerciseDetailValue: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: '#F59E0B',
    marginBottom: 4,
  },
  exerciseDetailLabel: {
    fontSize: 12,
    color: '#666666',
  },
  tipsContainer: {
    backgroundColor: 'rgba(34, 34, 34, 0.8)',
    borderRadius: 12,
    padding: 16,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#F59E0B',
    marginBottom: 8,
  },
  tipsText: {
    fontSize: 14,
    color: '#CCCCCC',
    lineHeight: 20,
  },

  // Sets Card
  setsCard: {},
  setsTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#00FFF7',
    marginBottom: 16,
    textAlign: 'center' as const,
  },
  setsGrid: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    gap: 12,
    justifyContent: 'space-between' as const,
  },
  setButton: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center' as const,
    minHeight: 80,
    justifyContent: 'center' as const,
  },
  setButtonCompleted: {
    backgroundColor: 'rgba(0, 255, 247, 0.2)',
    borderColor: '#00FFF7',
  },
  setButtonIncomplete: {
    backgroundColor: '#222222',
    borderColor: '#444444',
  },
  setButtonTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    marginBottom: 4,
  },
  setButtonReps: {
    fontSize: 12,
    marginBottom: 4,
  },
  checkMark: {
    fontSize: 20,
    color: '#00FFF7',
  },

  // Timer Card
  timerCard: {
    alignItems: 'center' as const,
  },
  timerTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#10B981',
    marginBottom: 16,
  },
  timerDisplay: {
    fontSize: 48,
    fontWeight: 'bold' as const,
    color: '#10B981',
    marginBottom: 20,
    fontFamily: 'monospace',
  },
  timerControls: {
    flexDirection: 'row' as const,
    gap: 16,
    marginBottom: 12,
  },
  timerButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    borderWidth: 2,
    borderColor: '#10B981',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  timerButtonText: {
    fontSize: 24,
  },
  timerResetButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#333333',
    borderWidth: 2,
    borderColor: '#666666',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  timerResetButtonText: {
    fontSize: 20,
  },
  timerRecommendation: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center' as const,
  },

  // Navigation
  navigationContainer: {
    flexDirection: 'row' as const,
    gap: 12,
    marginTop: 20,
  },
  navButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  navButtonPrimary: {
    backgroundColor: '#00FFF7',
  },
  navButtonSecondary: {
    backgroundColor: '#333333',
    borderWidth: 1,
    borderColor: '#666666',
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
  navButtonPrimaryText: {
    color: '#000000',
  },
  navButtonSecondaryText: {
    color: '#CCCCCC',
  },
  navButtonDisabledText: {
    color: '#666666',
  },

  // Toast
  toast: {
    position: 'absolute' as const,
    top: 80,
    left: 20,
    right: 20,
    zIndex: 1001,
    borderRadius: 25,
    overflow: 'hidden' as const,
  },
  toastContent: {
    backgroundColor: 'rgba(13, 13, 13, 0.95)',
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 247, 0.3)',
    borderRadius: 25,
    padding: 12,
    alignItems: 'center' as const,
  },
  toastText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500' as const,
    textAlign: 'center' as const,
  },
};