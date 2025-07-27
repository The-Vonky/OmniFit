import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

interface WorkoutDetail {
  icon: string;
  text: string;
}

interface MacroItem {
  value: string;
  label: string;
}

interface ProgressStat {
  value: string;
  label: string;
}

export default function FitFlowHybrid() {
  const [creatineChecked, setCreatineChecked] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  const workoutDetails: WorkoutDetail[] = [
    { icon: '💪', text: '8 exercícios' },
    { icon: '⏱️', text: '~60 min' },
    { icon: '🔥', text: 'Alta intensidade' },
  ];

  const macros: MacroItem[] = [
    { value: '160g', label: 'Proteína' },
    { value: '200g', label: 'Carboidrato' },
    { value: '60g', label: 'Gordura' },
  ];

  const progressStats: ProgressStat[] = [
    { value: '6', label: 'Treinos' },
    { value: '14,2k', label: 'Passos' },
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

    // Welcome message
    setTimeout(() => {
      displayToast('🎯 Bem-vindo de volta! Vamos conquistar seus objetivos hoje!');
    }, 1500);
  }, []);

  const displayToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const toggleCreatine = () => {
    setCreatineChecked(!creatineChecked);
    displayToast(
      creatineChecked
        ? 'Creatina desmarcada'
        : '✅ Creatina marcada como tomada!'
    );
  };

  const startWorkout = () => {
    displayToast('🔥 Iniciando treino de Peito + Tríceps!');
  };

  const openAssistant = () => {
    displayToast('🤖 Assistente ativado! Como posso ajudar?');
  };

  const handleNotification = () => {
    setShowNotification(false);
    displayToast('📊 Redirecionando para avaliação física...');
  };

  const GlowingCard = ({ children, style, delay = 0, glowColor = '#00FFF7' }: {
    children: React.ReactNode;
    style?: any;
    delay?: number;
    glowColor?: string;
  }) => {
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
        {/* Header - Greeting Card */}
        <Animated.View 
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          <GlowingCard style={styles.greetingCard} delay={100}>
            <View style={styles.greetingContent}>
              <View style={styles.greetingInfo}>
                <Text style={styles.greetingTitle}>Bom dia, Deywid! 👋</Text>
                <Text style={styles.greetingSubtitle}>Pronto para mais um dia incrível?</Text>
              </View>
              <View style={styles.profileAvatar}>
                <Text style={styles.avatarText}>D</Text>
              </View>
            </View>
          </GlowingCard>
        </Animated.View>

        {/* Motivation Card */}
        <GlowingCard delay={200} glowColor="#FF00D4">
          <View style={styles.motivationCard}>
            <Text style={styles.motivationTitle}>💡 MOTIVAÇÃO DO DIA</Text>
            <Text style={styles.motivationText}>
              "Você está a um treino de distância da sua melhor versão."
            </Text>
          </View>
        </GlowingCard>

        {/* Reminder Card */}
        <GlowingCard delay={300} glowColor="#10B981">
          <View style={styles.reminderCard}>
            <View style={styles.reminderInfo}>
              <Text style={styles.reminderTitle}>Lembrete de Creatina</Text>
              <Text style={styles.reminderSubtitle}>Você já tomou sua creatina hoje?</Text>
            </View>
            <TouchableOpacity
              style={[styles.checkButton, creatineChecked && styles.checkButtonChecked]}
              onPress={toggleCreatine}
            >
              {creatineChecked && <Text style={styles.checkMark}>✓</Text>}
            </TouchableOpacity>
          </View>
        </GlowingCard>

        {/* Internal Notification Bar */}
        {showNotification && (
          <GlowingCard delay={350} glowColor="#EF4444">
            <TouchableOpacity onPress={handleNotification}>
              <View style={styles.notificationBar}>
                <View style={styles.notificationIcon}>
                  <Text style={styles.notificationIconText}>📊</Text>
                </View>
                <Text style={styles.notificationText}>
                  Hoje é dia de avaliação física. Clique aqui para atualizar seus dados.
                </Text>
              </View>
            </TouchableOpacity>
          </GlowingCard>
        )}

        {/* Workout Preview Card */}
        <GlowingCard delay={400} glowColor="#F59E0B">
          <View style={styles.workoutCard}>
            <View style={styles.workoutHeader}>
              <View>
                <Text style={styles.workoutTitle}>Peito + Tríceps</Text>
                <Text style={styles.workoutTime}>Hoje • 17:00</Text>
              </View>
              <View style={styles.workoutType}>
                <Text style={styles.workoutTypeText}>PUSH</Text>
              </View>
            </View>

            <View style={styles.workoutDetails}>
              {workoutDetails.map((detail, index) => (
                <View key={index} style={styles.workoutDetail}>
                  <Text style={styles.workoutDetailIcon}>{detail.icon}</Text>
                  <Text style={styles.workoutDetailText}>{detail.text}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity onPress={startWorkout} style={styles.startWorkoutBtn}>
              <Text style={styles.startWorkoutText}>INICIAR TREINO</Text>
            </TouchableOpacity>
          </View>
        </GlowingCard>

        {/* Diet Preview Card */}
        <GlowingCard delay={500} glowColor="#7C3AED">
          <View style={styles.dietCard}>
            <View style={styles.dietHeader}>
              <Text style={styles.dietTitle}>Resumo Nutricional</Text>
              <Text style={styles.caloriesMain}>1.870 kcal</Text>
            </View>

            <View style={styles.macroGrid}>
              {macros.map((macro, index) => (
                <View key={index} style={styles.macroItem}>
                  <Text style={styles.macroValue}>{macro.value}</Text>
                  <Text style={styles.macroLabel}>{macro.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </GlowingCard>

        {/* Progress Card */}
        <GlowingCard delay={600} glowColor="#00FFF7">
          <View style={styles.progressCard}>
            <View style={styles.progressInfo}>
              <Text style={styles.progressTitle}>Progresso Semanal</Text>
              <View style={styles.progressStats}>
                {progressStats.map((stat, index) => (
                  <View key={index} style={styles.progressStat}>
                    <Text style={styles.progressValue}>{stat.value}</Text>
                    <Text style={styles.progressLabel}>{stat.label}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.progressRing}>
              <Text style={styles.progressPercentage}>80%</Text>
            </View>
          </View>
        </GlowingCard>

        {/* Tip Card */}
        <GlowingCard delay={700} glowColor="#F59E0B">
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>💡 DICA DO DIA</Text>
            <Text style={styles.tipText}>
              Beba pelo menos 35ml de água por quilo de peso corporal diariamente para manter a hidratação ideal.
            </Text>
          </View>
        </GlowingCard>
      </ScrollView>

      {/* Assistant Button */}
      <TouchableOpacity style={styles.assistantBtn} onPress={openAssistant}>
        <View style={styles.assistantBtnGradient}>
          <Text style={styles.assistantIcon}>🤖</Text>
        </View>
      </TouchableOpacity>
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
  greetingCard: {
    marginBottom: 0,
  },
  greetingContent: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
  },
  greetingInfo: {
    flex: 1,
  },
  greetingTitle: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: '#00FFF7',
    marginBottom: 4,
    fontFamily: 'Orbitron-Bold',
  },
  greetingSubtitle: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Orbitron-Regular',
  },
  profileAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#00FFF7',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    color: '#000',
  },

  // Motivation Card
  motivationCard: {
    alignItems: 'center' as const,
  },
  motivationTitle: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#FF00D4',
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  motivationText: {
    fontSize: 16,
    fontWeight: '500' as const,
    lineHeight: 22,
    textAlign: 'center' as const,
    fontStyle: 'italic' as const,
    color: '#FFFFFF',
  },

  // Reminder Card
  reminderCard: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
  },
  reminderInfo: {
    flex: 1,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#10B981',
    marginBottom: 4,
  },
  reminderSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
  checkButton: {
    width: 28,
    height: 28,
    borderWidth: 2,
    borderColor: '#10B981',
    borderRadius: 8,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  checkButtonChecked: {
    backgroundColor: '#10B981',
  },
  checkMark: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold' as const,
  },

  // Notification Bar
  notificationBar: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  notificationIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#EF4444',
    borderRadius: 16,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginRight: 12,
  },
  notificationIconText: {
    fontSize: 16,
  },
  notificationText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500' as const,
    color: '#EF4444',
  },

  // Workout Card
  workoutCard: {},
  workoutHeader: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'flex-start' as const,
    marginBottom: 16,
  },
  workoutTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: '#F59E0B',
    marginBottom: 4,
    fontFamily: 'Orbitron-Bold',
  },
  workoutTime: {
    fontSize: 12,
    color: '#666666',
  },
  workoutType: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    borderRadius: 12,
  },
  workoutTypeText: {
    fontSize: 12,
    fontWeight: '600' as const,
    textTransform: 'uppercase' as const,
    color: '#F59E0B',
  },
  workoutDetails: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    marginBottom: 20,
  },
  workoutDetail: {
    alignItems: 'center' as const,
    gap: 6,
  },
  workoutDetailIcon: {
    fontSize: 16,
  },
  workoutDetailText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center' as const,
  },
  startWorkoutBtn: {
    padding: 14,
    borderRadius: 12,
    alignItems: 'center' as const,
    backgroundColor: '#F59E0B',
  },
  startWorkoutText: {
    color: '#000',
    fontWeight: '700' as const,
    fontSize: 16,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
  },

  // Diet Card
  dietCard: {},
  dietHeader: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: 16,
  },
  dietTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#7C3AED',
    fontFamily: 'Orbitron-Bold',
  },
  caloriesMain: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: '#7C3AED',
  },
  macroGrid: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    gap: 12,
  },
  macroItem: {
    flex: 1,
    alignItems: 'center' as const,
    padding: 12,
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
    borderRadius: 12,
  },
  macroValue: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#7C3AED',
  },
  macroLabel: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },

  // Progress Card
  progressCard: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
  },
  progressInfo: {
    flex: 1,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#00FFF7',
    marginBottom: 8,
    fontFamily: 'Orbitron-Bold',
  },
  progressStats: {
    flexDirection: 'row' as const,
    gap: 16,
  },
  progressStat: {
    alignItems: 'flex-start' as const,
  },
  progressValue: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: '#00FFF7',
  },
  progressLabel: {
    fontSize: 12,
    color: '#666666',
  },
  progressRing: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(0, 255, 247, 0.2)',
    borderWidth: 8,
    borderColor: '#00FFF7',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  progressPercentage: {
    fontSize: 12,
    fontWeight: '700' as const,
    color: '#00FFF7',
  },

  // Tip Card
  tipCard: {},
  tipTitle: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#F59E0B',
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  tipText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#CCCCCC',
  },

  // Assistant Button
  assistantBtn: {
    position: 'absolute' as const,
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    elevation: 8,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  assistantBtnGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    backgroundColor: '#7C3AED',
  },
  assistantIcon: {
    fontSize: 24,
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