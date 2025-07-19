import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Animated,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');

interface TabItem {
  icon: string;
  label: string;
  active?: boolean;
}

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

export default function FitFlowApp() {
  const [creatineChecked, setCreatineChecked] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [showNotification, setShowNotification] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const animatedValue = new Animated.Value(0);

  const tabs: TabItem[] = [
    { icon: '🏠', label: 'Home' },
    { icon: '💪', label: 'Treino' },
    { icon: '🥗', label: 'Dieta' },
    { icon: '📊', label: 'Progresso' },
    { icon: '⚙️', label: 'Config' },
  ];

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
    Animated.stagger(100, [
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 600,
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

  const handleTabPress = (index: number) => {
    setActiveTab(index);
    if (index !== 0) {
      displayToast(`Navegando para ${tabs[index].label}...`);
    }
  };

  const Card = ({ children, style, delay = 0 }: { 
    children: React.ReactNode; 
    style?: any; 
    delay?: number;
  }) => {
    const cardAnimation = new Animated.Value(0);

    useEffect(() => {
      Animated.timing(cardAnimation, {
        toValue: 1,
        duration: 600,
        delay: delay,
        useNativeDriver: true,
      }).start();
    }, []);

    return (
      <Animated.View
        style={[
          styles.card,
          style,
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
        ]}
      >
        <BlurView intensity={20} style={styles.cardBlur}>
          {children}
        </BlurView>
      </Animated.View>
    );
  };

  return (
    <LinearGradient
      colors={['#0d1117', '#161b22', '#21262d']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      
      {/* Toast */}
      {showToast && (
        <Animated.View style={[styles.toast, { opacity: showToast ? 1 : 0 }]}>
          <BlurView intensity={20} style={styles.toastBlur}>
            <Text style={styles.toastText}>{toastMessage}</Text>
          </BlurView>
        </Animated.View>
      )}

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting Card */}
        <Card style={styles.greetingCard} delay={100}>
          <LinearGradient
            colors={['rgba(255, 20, 147, 0.15)', 'rgba(138, 43, 226, 0.1)']}
            style={styles.greetingGradient}
          >
            <View style={styles.greetingInfo}>
              <Text style={styles.greetingTitle}>Bom dia, Deywid! 👋</Text>
              <Text style={styles.greetingSubtitle}>Pronto para mais um dia incrível?</Text>
            </View>
            <LinearGradient
              colors={['#ff1493', '#8a2be2']}
              style={styles.profileAvatar}
            >
              <Text style={styles.avatarText}>D</Text>
            </LinearGradient>
          </LinearGradient>
        </Card>

        {/* Motivation Card */}
        <Card delay={200}>
          <LinearGradient
            colors={['rgba(30, 144, 255, 0.15)', 'rgba(0, 191, 255, 0.1)']}
            style={styles.motivationCard}
          >
            <Text style={styles.motivationTitle}>MOTIVAÇÃO DO DIA</Text>
            <Text style={styles.motivationText}>
              "Você está a um treino de distância da sua melhor versão."
            </Text>
          </LinearGradient>
        </Card>

        {/* Reminder Card */}
        <Card delay={300}>
          <LinearGradient
            colors={['rgba(34, 197, 94, 0.15)', 'rgba(16, 185, 129, 0.1)']}
            style={styles.reminderCard}
          >
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
          </LinearGradient>
        </Card>

        {/* Internal Notification Bar */}
        {showNotification && (
          <Card delay={350}>
            <TouchableOpacity onPress={handleNotification}>
              <LinearGradient
                colors={['rgba(239, 68, 68, 0.15)', 'rgba(220, 38, 38, 0.1)']}
                style={styles.notificationBar}
              >
                <View style={styles.notificationIcon}>
                  <Text style={styles.notificationIconText}>📊</Text>
                </View>
                <Text style={styles.notificationText}>
                  Hoje é dia de avaliação física. Clique aqui para atualizar seus dados.
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </Card>
        )}

        {/* Workout Preview Card */}
        <Card delay={400}>
          <LinearGradient
            colors={['rgba(249, 115, 22, 0.15)', 'rgba(251, 146, 60, 0.1)']}
            style={styles.workoutCard}
          >
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

            <TouchableOpacity onPress={startWorkout}>
              <LinearGradient
                colors={['#f97316', '#fb923c']}
                style={styles.startWorkoutBtn}
              >
                <Text style={styles.startWorkoutText}>INICIAR TREINO</Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </Card>

        {/* Diet Preview Card */}
        <Card delay={500}>
          <LinearGradient
            colors={['rgba(168, 85, 247, 0.15)', 'rgba(147, 51, 234, 0.1)']}
            style={styles.dietCard}
          >
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
          </LinearGradient>
        </Card>

        {/* Progress Card */}
        <Card delay={600}>
          <LinearGradient
            colors={['rgba(6, 182, 212, 0.15)', 'rgba(14, 165, 233, 0.1)']}
            style={styles.progressCard}
          >
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
          </LinearGradient>
        </Card>

        {/* Tip Card */}
        <Card delay={700}>
          <LinearGradient
            colors={['rgba(245, 158, 11, 0.15)', 'rgba(251, 191, 36, 0.1)']}
            style={styles.tipCard}
          >
            <Text style={styles.tipTitle}>💡 DICA DO DIA</Text>
            <Text style={styles.tipText}>
              Beba pelo menos 35ml de água por quilo de peso corporal diariamente para manter a hidratação ideal.
            </Text>
          </LinearGradient>
        </Card>
      </ScrollView>

      {/* Assistant Button */}
      <TouchableOpacity style={styles.assistantBtn} onPress={openAssistant}>
        <LinearGradient
          colors={['#8b5cf6', '#a855f7']}
          style={styles.assistantBtnGradient}
        >
          <Text style={styles.assistantIcon}>🤖</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Bottom Tab Bar */}
      <BlurView intensity={20} style={styles.bottomTabBar}>
        <LinearGradient
          colors={['rgba(13, 17, 23, 0.95)', 'rgba(13, 17, 23, 0.8)']}
          style={styles.tabBarGradient}
        >
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.tabItem, activeTab === index && styles.tabItemActive]}
              onPress={() => handleTabPress(index)}
            >
              <Text style={styles.tabIcon}>{tab.icon}</Text>
              <Text style={[styles.tabLabel, activeTab === index && styles.tabLabelActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </LinearGradient>
      </BlurView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1117',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 120,
  },
  card: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardBlur: {
    backgroundColor: 'rgba(33, 38, 45, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(240, 246, 252, 0.1)',
    borderRadius: 16,
  },
  
  // Greeting Card
  greetingCard: {
    borderRadius: 20,
  },
  greetingGradient: {
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#ff1493',
  },
  greetingInfo: {
    flex: 1,
  },
  greetingTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ff1493',
    marginBottom: 4,
  },
  greetingSubtitle: {
    fontSize: 16,
    color: 'rgba(240, 246, 252, 0.8)',
    fontWeight: '400',
  },
  profileAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },

  // Motivation Card
  motivationCard: {
    padding: 28,
    alignItems: 'center',
    borderRadius: 18,
  },
  motivationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e90ff',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  motivationText: {
    fontSize: 17,
    fontWeight: '500',
    lineHeight: 24,
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#f0f6fc',
  },

  // Reminder Card
  reminderCard: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 14,
    borderLeftWidth: 3,
    borderLeftColor: '#22c55e',
  },
  reminderInfo: {
    flex: 1,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#22c55e',
    marginBottom: 4,
  },
  reminderSubtitle: {
    fontSize: 14,
    color: 'rgba(240, 246, 252, 0.8)',
  },
  checkButton: {
    width: 28,
    height: 28,
    borderWidth: 2,
    borderColor: '#22c55e',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkButtonChecked: {
    backgroundColor: '#22c55e',
  },
  checkMark: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Notification Bar
  notificationBar: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  notificationIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#ef4444',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notificationIconText: {
    fontSize: 16,
  },
  notificationText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#ef4444',
  },

  // Workout Card
  workoutCard: {
    padding: 24,
    borderRadius: 18,
    borderLeftWidth: 3,
    borderLeftColor: '#f97316',
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  workoutTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#f97316',
    marginBottom: 4,
  },
  workoutTime: {
    fontSize: 12,
    color: 'rgba(240, 246, 252, 0.7)',
  },
  workoutType: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'rgba(249, 115, 22, 0.2)',
    borderRadius: 12,
  },
  workoutTypeText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    color: '#f97316',
  },
  workoutDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  workoutDetail: {
    alignItems: 'center',
    gap: 6,
  },
  workoutDetailIcon: {
    fontSize: 16,
  },
  workoutDetailText: {
    fontSize: 14,
    color: 'rgba(240, 246, 252, 0.8)',
  },
  startWorkoutBtn: {
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  startWorkoutText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // Diet Card
  dietCard: {
    padding: 24,
    borderRadius: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#a855f7',
  },
  dietHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  dietTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#a855f7',
  },
  caloriesMain: {
    fontSize: 18,
    fontWeight: '700',
    color: '#a855f7',
  },
  macroGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  macroItem: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(168, 85, 247, 0.1)',
    borderRadius: 12,
  },
  macroValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#a855f7',
  },
  macroLabel: {
    fontSize: 12,
    color: 'rgba(240, 246, 252, 0.7)',
    marginTop: 2,
  },

  // Progress Card
  progressCard: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#06b6d4',
  },
  progressInfo: {
    flex: 1,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#06b6d4',
    marginBottom: 8,
  },
  progressStats: {
    flexDirection: 'row',
    gap: 16,
  },
  progressStat: {
    alignItems: 'flex-start',
  },
  progressValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#06b6d4',
  },
  progressLabel: {
    fontSize: 12,
    color: 'rgba(240, 246, 252, 0.7)',
  },
  progressRing: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(6, 182, 212, 0.2)',
    borderWidth: 8,
    borderColor: '#06b6d4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressPercentage: {
    fontSize: 12,
    fontWeight: '700',
    color: '#06b6d4',
  },

  // Tip Card
  tipCard: {
    padding: 20,
    borderRadius: 14,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f59e0b',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  tipText: {
    fontSize: 15,
    lineHeight: 22,
    color: 'rgba(240, 246, 252, 0.9)',
  },

  // Assistant Button
  assistantBtn: {
    position: 'absolute',
    bottom: 110,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    elevation: 8,
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  assistantBtnGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  assistantIcon: {
    fontSize: 24,
  },

  // Bottom Tab Bar
  bottomTabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    borderTopWidth: 1,
    borderTopColor: 'rgba(240, 246, 252, 0.1)',
  },
  tabBarGradient: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 34 : 12,
  },
  tabItem: {
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    minWidth: 60,
  },
  tabItemActive: {
    backgroundColor: 'rgba(255, 20, 147, 0.1)',
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 2,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(240, 246, 252, 0.6)',
  },
  tabLabelActive: {
    color: '#ff1493',
  },

  // Toast
  toast: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 80 : 60,
    left: 20,
    right: 20,
    zIndex: 1001,
    borderRadius: 25,
    overflow: 'hidden',
  },
  toastBlur: {
    backgroundColor: 'rgba(13, 17, 23, 0.95)',
    borderWidth: 1,
    borderColor: 'rgba(240, 246, 252, 0.2)',
    borderRadius: 25,
    padding: 12,
    alignItems: 'center',
  },
  toastText: {
    color: '#f0f6fc',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});