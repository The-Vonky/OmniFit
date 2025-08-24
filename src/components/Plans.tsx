import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import {
  User,
  Calendar,
  Clock,
  Target,
  Utensils,
  Dumbbell,
  TrendingUp,
  CheckCircle,
  Download,
  Share2,
} from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

interface UserAnswers {
  goal: string[];
  experience: string[];
  frequency: string[];
  time: string[];
  equipment: string[];
  diet_goal: string[];
  restrictions: string[];
  meals: string[];
  cooking: string[];
  motivation: string[];
}

const mockAnswers: UserAnswers = {
  goal: ['Ganhar massa muscular'],
  experience: ['Intermediário (6 meses - 2 anos)'],
  frequency: ['4-5 dias'],
  time: ['60-90 minutos'],
  equipment: ['Academia completa', 'Halteres em casa'],
  diet_goal: ['Ganhar massa'],
  restrictions: ['Nenhuma restrição'],
  meals: ['4-5 refeições'],
  cooking: ['Intermediário (pratos simples)'],
  motivation: ['8'],
};

export default function FitnessPlanResults() {
  const [currentTab, setCurrentTab] = useState<'treino' | 'dieta'>('treino');
  const [isGenerating, setIsGenerating] = useState(true);
  const [showPlan, setShowPlan] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [spinValue] = useState(new Animated.Value(0));

  useEffect(() => {
    // Animação de loading
    const spin = () => {
      spinValue.setValue(0);
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start(() => spin());
    };
    spin();

    // Simula geração do plano
    setTimeout(() => {
      setIsGenerating(false);
      setTimeout(() => {
        setShowPlan(true);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, 300);
    }, 3000);
  }, []);

  const workoutPlan = {
    title: 'Plano de Hipertrofia Intermediário',
    frequency: '4x por semana',
    duration: '60-75 minutos',
    weeks: [
      {
        day: 'Segunda-feira',
        focus: 'Peito + Tríceps',
        exercises: [
          { name: 'Supino Reto', sets: '4x8-10', rest: '90s' },
          { name: 'Supino Inclinado', sets: '3x8-12', rest: '90s' },
          { name: 'Crucifixo', sets: '3x10-12', rest: '60s' },
          { name: 'Tríceps Testa', sets: '4x10-12', rest: '60s' },
          { name: 'Tríceps Corda', sets: '3x12-15', rest: '45s' },
        ],
      },
      {
        day: 'Terça-feira',
        focus: 'Costas + Bíceps',
        exercises: [
          { name: 'Puxada Frente', sets: '4x8-10', rest: '90s' },
          { name: 'Remada Curvada', sets: '4x8-10', rest: '90s' },
          { name: 'Pullover', sets: '3x10-12', rest: '60s' },
          { name: 'Rosca Direta', sets: '4x10-12', rest: '60s' },
          { name: 'Rosca Martelo', sets: '3x12-15', rest: '45s' },
        ],
      },
      {
        day: 'Quinta-feira',
        focus: 'Pernas Completo',
        exercises: [
          { name: 'Agachamento', sets: '4x8-10', rest: '120s' },
          { name: 'Leg Press', sets: '4x12-15', rest: '90s' },
          { name: 'Extensora', sets: '3x12-15', rest: '60s' },
          { name: 'Flexora', sets: '3x12-15', rest: '60s' },
          { name: 'Panturrilha', sets: '4x15-20', rest: '45s' },
        ],
      },
      {
        day: 'Sexta-feira',
        focus: 'Ombros + Abdômen',
        exercises: [
          { name: 'Desenvolvimento', sets: '4x8-10', rest: '90s' },
          { name: 'Elevação Lateral', sets: '4x10-12', rest: '60s' },
          { name: 'Elevação Posterior', sets: '3x12-15', rest: '60s' },
          { name: 'Encolhimento', sets: '3x12-15', rest: '60s' },
          { name: 'Prancha', sets: '3x45s', rest: '60s' },
        ],
      },
    ],
  };

  const dietPlan = {
    title: 'Dieta para Ganho de Massa',
    calories: '2800-3200 kcal/dia',
    protein: '140-160g',
    meals: [
      {
        meal: 'Café da Manhã',
        time: '7:00',
        foods: ['3 ovos mexidos', '2 fatias de pão integral', '1 banana', '200ml leite'],
        calories: '520 kcal',
      },
      {
        meal: 'Lanche da Manhã',
        time: '10:00',
        foods: ['Whey protein 30g', '1 maçã', '10 castanhas'],
        calories: '350 kcal',
      },
      {
        meal: 'Almoço',
        time: '12:30',
        foods: ['150g frango grelhado', '100g arroz integral', 'Salada verde', '1 colher azeite'],
        calories: '680 kcal',
      },
      {
        meal: 'Lanche Pré-treino',
        time: '15:30',
        foods: ['1 banana', '30g aveia', '1 colher mel'],
        calories: '280 kcal',
      },
      {
        meal: 'Jantar',
        time: '19:00',
        foods: ['150g carne vermelha', '200g batata doce', 'Brócolis refogado'],
        calories: '720 kcal',
      },
      {
        meal: 'Ceia',
        time: '22:00',
        foods: ['200g iogurte grego', '1 colher pasta amendoim', 'Granola'],
        calories: '380 kcal',
      },
    ],
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  if (isGenerating) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
        <LinearGradient colors={['#0f172a', '#1e3a8a', '#0f172a']} style={styles.loadingContainer}>
          <View style={styles.loadingContent}>
            <View style={styles.spinnerContainer}>
              <View style={styles.spinnerBorder} />
              <Animated.View style={[styles.spinner, { transform: [{ rotate: spin }] }]} />
              <View style={styles.spinnerCenter}>
                <Dumbbell size={32} color="#10b981" />
              </View>
            </View>
            <Text style={styles.loadingTitle}>Gerando seu plano personalizado...</Text>
            <Text style={styles.loadingSubtitle}>
              Analisando suas respostas e criando o melhor programa para você
            </Text>
            <View style={styles.dots}>
              <View style={[styles.dot, { animationDelay: 0 }]} />
              <View style={[styles.dot, { animationDelay: 100 }]} />
              <View style={[styles.dot, { animationDelay: 200 }]} />
            </View>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      <Animated.View style={[styles.container, { opacity: showPlan ? fadeAnim : 0 }]}>
        <LinearGradient colors={['#0f172a', '#1e3a8a', '#0f172a']} style={styles.container}>
          {/* Header */}
          <BlurView intensity={50} style={styles.header}>
            <View style={styles.headerContent}>
              <View style={styles.headerTop}>
                <View>
                  <Text style={styles.title}>Seu Plano Personalizado</Text>
                  <Text style={styles.subtitle}>Criado especialmente para você</Text>
                </View>
                <View style={styles.headerActions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Share2 size={20} color="#cbd5e1" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.primaryButton}>
                    <Download size={20} color="#ffffff" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* User Summary Cards */}
              <View style={styles.summaryGrid}>
                <BlurView intensity={30} style={styles.summaryCard}>
                  <Target size={24} color="#10b981" />
                  <Text style={styles.cardLabel}>Objetivo</Text>
                  <Text style={styles.cardValue}>{mockAnswers.goal[0]}</Text>
                </BlurView>
                <BlurView intensity={30} style={styles.summaryCard}>
                  <Calendar size={24} color="#3b82f6" />
                  <Text style={styles.cardLabel}>Frequência</Text>
                  <Text style={styles.cardValue}>{mockAnswers.frequency[0]}</Text>
                </BlurView>
                <BlurView intensity={30} style={styles.summaryCard}>
                  <Clock size={24} color="#8b5cf6" />
                  <Text style={styles.cardLabel}>Tempo</Text>
                  <Text style={styles.cardValue}>{mockAnswers.time[0]}</Text>
                </BlurView>
                <BlurView intensity={30} style={styles.summaryCard}>
                  <TrendingUp size={24} color="#f97316" />
                  <Text style={styles.cardLabel}>Motivação</Text>
                  <Text style={styles.cardValue}>{mockAnswers.motivation[0]}/10</Text>
                </BlurView>
              </View>

              {/* Tab Navigation */}
              <BlurView intensity={30} style={styles.tabContainer}>
                <TouchableOpacity
                  onPress={() => setCurrentTab('treino')}
                  style={[styles.tab, currentTab === 'treino' && styles.activeTab]}
                >
                  <Dumbbell size={20} color={currentTab === 'treino' ? '#ffffff' : '#94a3b8'} />
                  <Text style={[styles.tabText, currentTab === 'treino' && styles.activeTabText]}>
                    Treino
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setCurrentTab('dieta')}
                  style={[styles.tab, currentTab === 'dieta' && styles.activeTab]}
                >
                  <Utensils size={20} color={currentTab === 'dieta' ? '#ffffff' : '#94a3b8'} />
                  <Text style={[styles.tabText, currentTab === 'dieta' && styles.activeTabText]}>
                    Dieta
                  </Text>
                </TouchableOpacity>
              </BlurView>
            </View>
          </BlurView>

          {/* Content */}
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {currentTab === 'treino' ? (
              <View style={styles.planContainer}>
                {/* Workout Plan Header */}
                <BlurView intensity={50} style={styles.planHeader}>
                  <Text style={styles.planTitle}>{workoutPlan.title}</Text>
                  <View style={styles.planInfo}>
                    <View style={styles.infoItem}>
                      <Calendar size={16} color="#10b981" />
                      <Text style={styles.infoText}>{workoutPlan.frequency}</Text>
                    </View>
                    <View style={styles.infoItem}>
                      <Clock size={16} color="#3b82f6" />
                      <Text style={styles.infoText}>{workoutPlan.duration}</Text>
                    </View>
                  </View>
                </BlurView>

                {/* Workout Days */}
                {workoutPlan.weeks.map((day, index) => (
                  <BlurView key={index} intensity={50} style={styles.dayContainer}>
                    <View style={styles.dayHeader}>
                      <View style={styles.dayNumber}>
                        <Text style={styles.dayNumberText}>{index + 1}</Text>
                      </View>
                      <View>
                        <Text style={styles.dayTitle}>{day.day}</Text>
                        <Text style={styles.dayFocus}>{day.focus}</Text>
                      </View>
                    </View>

                    {day.exercises.map((exercise, exerciseIndex) => (
                      <BlurView key={exerciseIndex} intensity={30} style={styles.exerciseItem}>
                        <View style={styles.exerciseLeft}>
                          <CheckCircle size={20} color="#94a3b8" />
                          <Text style={styles.exerciseName}>{exercise.name}</Text>
                        </View>
                        <View style={styles.exerciseRight}>
                          <Text style={styles.exerciseInfo}>{exercise.sets}</Text>
                          <Text style={styles.exerciseInfo}>{exercise.rest}</Text>
                        </View>
                      </BlurView>
                    ))}
                  </BlurView>
                ))}
              </View>
            ) : (
              <View style={styles.planContainer}>
                {/* Diet Plan Header */}
                <BlurView intensity={50} style={styles.planHeader}>
                  <Text style={styles.planTitle}>{dietPlan.title}</Text>
                  <View style={styles.planInfo}>
                    <View style={styles.infoItem}>
                      <Target size={16} color="#10b981" />
                      <Text style={styles.infoText}>{dietPlan.calories}</Text>
                    </View>
                    <View style={styles.infoItem}>
                      <TrendingUp size={16} color="#3b82f6" />
                      <Text style={styles.infoText}>Proteína: {dietPlan.protein}</Text>
                    </View>
                  </View>
                </BlurView>

                {/* Meals */}
                {dietPlan.meals.map((meal, index) => (
                  <BlurView key={index} intensity={50} style={styles.mealContainer}>
                    <View style={styles.mealHeader}>
                      <View>
                        <Text style={styles.mealTitle}>{meal.meal}</Text>
                        <Text style={styles.mealTime}>{meal.time}</Text>
                      </View>
                      <Text style={styles.mealCalories}>{meal.calories}</Text>
                    </View>

                    <View style={styles.foodGrid}>
                      {meal.foods.map((food, foodIndex) => (
                        <BlurView key={foodIndex} intensity={30} style={styles.foodItem}>
                          <View style={styles.foodBullet} />
                          <Text style={styles.foodText}>{food}</Text>
                        </BlurView>
                      ))}
                    </View>
                  </BlurView>
                ))}
              </View>
            )}
          </ScrollView>

          {/* Bottom Action */}
          <BlurView intensity={50} style={styles.bottomAction}>
            <TouchableOpacity style={styles.startButton}>
              <LinearGradient
                colors={['#10b981', '#14b8a6']}
                style={styles.startButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.startButtonText}>🚀 Começar Agora</Text>
              </LinearGradient>
            </TouchableOpacity>
          </BlurView>
        </LinearGradient>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  loadingContent: {
    alignItems: 'center',
  },
  spinnerContainer: {
    width: 128,
    height: 128,
    position: 'relative',
    marginBottom: 32,
  },
  spinnerBorder: {
    position: 'absolute',
    inset: 0,
    borderWidth: 4,
    borderColor: 'rgba(16, 185, 129, 0.3)',
    borderRadius: 64,
  },
  spinner: {
    position: 'absolute',
    inset: 0,
    borderWidth: 4,
    borderColor: '#10b981',
    borderTopColor: 'transparent',
    borderRadius: 64,
  },
  spinnerCenter: {
    position: 'absolute',
    inset: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
    textAlign: 'center',
  },
  loadingSubtitle: {
    fontSize: 16,
    color: '#94a3b8',
    marginBottom: 24,
    textAlign: 'center',
  },
  dots: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: '#10b981',
    borderRadius: 4,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(71, 85, 105, 0.5)',
  },
  headerContent: {
    padding: 24,
    paddingTop: 48,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    backgroundColor: 'rgba(71, 85, 105, 0.5)',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(71, 85, 105, 0.5)',
  },
  primaryButton: {
    backgroundColor: '#10b981',
    padding: 12,
    borderRadius: 12,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
  },
  summaryCard: {
    backgroundColor: 'rgba(71, 85, 105, 0.3)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(71, 85, 105, 0.3)',
    width: (width - 80) / 2,
  },
  cardLabel: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 8,
  },
  cardValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginTop: 4,
  },
  tabContainer: {
    backgroundColor: 'rgba(71, 85, 105, 0.3)',
    borderRadius: 16,
    padding: 4,
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: '#10b981',
    shadowColor: '#10b981',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#94a3b8',
  },
  activeTabText: {
    color: '#ffffff',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  planContainer: {
    gap: 24,
  },
  planHeader: {
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(71, 85, 105, 0.5)',
    borderRadius: 24,
    padding: 24,
  },
  planTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  planInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#cbd5e1',
  },
  dayContainer: {
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(71, 85, 105, 0.5)',
    borderRadius: 24,
    padding: 24,
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  dayNumber: {
    width: 40,
    height: 40,
    backgroundColor: '#10b981',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayNumberText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  dayTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  dayFocus: {
    fontSize: 16,
    color: '#94a3b8',
  },
  exerciseItem: {
    backgroundColor: 'rgba(71, 85, 105, 0.3)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(71, 85, 105, 0.3)',
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exerciseLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
  },
  exerciseRight: {
    flexDirection: 'row',
    gap: 16,
  },
  exerciseInfo: {
    fontSize: 14,
    color: '#94a3b8',
  },
  mealContainer: {
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(71, 85, 105, 0.5)',
    borderRadius: 24,
    padding: 24,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  mealTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  mealTime: {
    fontSize: 16,
    color: '#94a3b8',
    marginTop: 4,
  },
  mealCalories: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10b981',
  },
  foodGrid: {
    gap: 12,
  },
  foodItem: {
    backgroundColor: 'rgba(71, 85, 105, 0.3)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(71, 85, 105, 0.3)',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  foodBullet: {
    width: 8,
    height: 8,
    backgroundColor: '#10b981',
    borderRadius: 4,
  },
  foodText: {
    fontSize: 16,
    color: '#e2e8f0',
  },
  bottomAction: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(71, 85, 105, 0.5)',
  },
  startButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  startButtonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});