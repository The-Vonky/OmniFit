import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';

interface Exercise {
  exercise: string;
  sets: string;
}

interface WorkoutData {
  peito: Exercise[];
  ombro: Exercise[];
  triceps: Exercise[];
}

interface NutritionData {
  carbo: number;
  gordura: number;
  proteina: number;
}

interface WorkoutCardProps {
  title: string;
  exercises: Exercise[];
  iconName: keyof typeof Ionicons.glyphMap;
}

interface TabItem {
  id: string;
  label: string;
  iconName: keyof typeof Ionicons.glyphMap;
}

export default function FitnessApp() {
  const [activeTab, setActiveTab] = useState<string>('treino');

  const workoutData: WorkoutData = {
    peito: [
      { exercise: "Supino reto com barra", sets: "3x 8-12" },
      { exercise: "Supino inclinado com barra", sets: "3x 8-12" },
      { exercise: "Crucifixo máquina", sets: "3x 10-15" }
    ],
    ombro: [
      { exercise: "Desenvolvimento militar", sets: "4x 8-12" },
      { exercise: "Elevação lateral", sets: "3x 12-15" },
      { exercise: "Elevação frontal", sets: "3x 12-15" }
    ],
    triceps: [
      { exercise: "Tríceps testa com barra", sets: "3x 10-12" },
      { exercise: "Tríceps corda na polia", sets: "3x 12-15" },
      { exercise: "Mergulho em banco", sets: "3x até a falha" }
    ]
  };

  const nutritionData: NutritionData = {
    carbo: 60,
    gordura: 25,
    proteina: 15
  };

  const WorkoutCard: React.FC<WorkoutCardProps> = ({ title, exercises, iconName }) => (
    <View style={styles.workoutCard}>
      <View style={styles.workoutCardHeader}>
        <Text style={styles.workoutCardTitle}>{title.toUpperCase()}</Text>
        <View style={styles.workoutCardIconContainer}>
          <Ionicons name={iconName} size={24} color="#2563EB" />
        </View>
      </View>
      <View style={styles.exercisesContainer}>
        {exercises.map((exercise, index) => (
          <View key={index} style={styles.exerciseItem}>
            <Text style={styles.exerciseName}>{exercise.exercise}</Text>
            <View style={styles.setsContainer}>
              <Text style={styles.setsText}>{exercise.sets}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const NutritionChart: React.FC = () => {
    return (
      <View style={styles.nutritionCard}>
        <View style={styles.nutritionHeader}>
          <Ionicons name="target" size={24} color="#059669" />
          <Text style={styles.nutritionTitle}>Informação Nutricional</Text>
        </View>
        
        <View style={styles.chartContainer}>
          <View style={styles.chartWrapper}>
            <Svg width={128} height={128} viewBox="0 0 36 36" style={styles.chartSvg}>
              <Path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="3"
                strokeDasharray={`${nutritionData.carbo}, ${100 - nutritionData.carbo}`}
              />
              <Path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#10B981"
                strokeWidth="3"
                strokeDasharray={`${nutritionData.proteina}, ${100 - nutritionData.proteina}`}
                strokeDashoffset={`-${nutritionData.carbo}`}
              />
              <Path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="3"
                strokeDasharray={`${nutritionData.gordura}, ${100 - nutritionData.gordura}`}
                strokeDashoffset={`-${nutritionData.carbo + nutritionData.proteina}`}
              />
            </Svg>
            <View style={styles.chartCenter}>
              <Text style={styles.chartCenterValue}>4.000</Text>
              <Text style={styles.chartCenterLabel}>kcal</Text>
            </View>
          </View>
        </View>

        <View style={styles.nutritionGrid}>
          <View style={styles.nutritionItemBlue}>
            <View style={styles.nutritionDotBlue} />
            <Text style={styles.nutritionItemLabel}>Carbo</Text>
            <Text style={styles.nutritionItemValueBlue}>{nutritionData.carbo}%</Text>
          </View>
          <View style={styles.nutritionItemGreen}>
            <View style={styles.nutritionDotGreen} />
            <Text style={styles.nutritionItemLabel}>Proteína</Text>
            <Text style={styles.nutritionItemValueGreen}>{nutritionData.proteina}%</Text>
          </View>
          <View style={styles.nutritionItemYellow}>
            <View style={styles.nutritionDotYellow} />
            <Text style={styles.nutritionItemLabel}>Gordura</Text>
            <Text style={styles.nutritionItemValueYellow}>{nutritionData.gordura}%</Text>
          </View>
        </View>
      </View>
    );
  };

  const tabs: TabItem[] = [
    { id: 'treino', label: 'Treino', iconName: 'barbell' },
    { id: 'dieta', label: 'Dieta', iconName: 'cafe' },
    { id: 'progresso', label: 'Progresso', iconName: 'trending-up' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.userSection}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={24} color="#fff" />
              </View>
              <View>
                <Text style={styles.greeting}>Olá, João Barreiro</Text>
                <Text style={styles.subGreeting}>Bom dia, Magnata!</Text>
              </View>
            </View>
            <View style={styles.weatherSection}>
              <Text style={styles.temperature}>14°</Text>
              <Text style={styles.day}>Terça-feira</Text>
            </View>
          </View>
          
          <View style={styles.motivationCard}>
            <Text style={styles.motivationText}>
              Espero que tenha acordado cheio de energia hoje, porque seus objetivos não vão realizar sozinhos! 💪
            </Text>
          </View>

          <View style={styles.dateContainer}>
            <Ionicons name="calendar" size={16} color="#6B7280" />
            <Text style={styles.dateText}>19/08/2025 Terça-feira</Text>
          </View>
        </View>

        {/* Navigation Tabs */}
        <View style={styles.tabsContainer}>
          <View style={styles.tabsWrapper}>
            {tabs.map(({ id, label, iconName }) => (
              <TouchableOpacity
                key={id}
                onPress={() => setActiveTab(id)}
                style={[
                  styles.tab,
                  activeTab === id ? styles.activeTab : styles.inactiveTab
                ]}
              >
                <Ionicons 
                  name={iconName} 
                  size={16} 
                  color={activeTab === id ? '#fff' : '#6B7280'} 
                />
                <Text style={[
                  styles.tabText,
                  activeTab === id ? styles.activeTabText : styles.inactiveTabText
                ]}>
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {activeTab === 'treino' && (
            <View style={styles.workoutContent}>
              <View style={styles.workoutHeader}>
                <Text style={styles.workoutTitle}>Treino Peito - Tríceps - Ombro</Text>
                <View style={styles.workoutInfo}>
                  <View style={styles.workoutInfoItem}>
                    <Ionicons name="time-outline" size={16} color="#6B7280" />
                    <Text style={styles.workoutInfoText}>45-60 min</Text>
                  </View>
                  <View style={styles.workoutInfoItem}>
                    <Ionicons name="flash-outline" size={16} color="#6B7280" />
                    <Text style={styles.workoutInfoText}>Intermediário</Text>
                  </View>
                </View>
              </View>

              <WorkoutCard title="peito" exercises={workoutData.peito} iconName="barbell" />
              <WorkoutCard title="ombro" exercises={workoutData.ombro} iconName="target" />
              <WorkoutCard title="tríceps" exercises={workoutData.triceps} iconName="flash" />
            </View>
          )}

          {activeTab === 'dieta' && (
            <View style={styles.dietContent}>
              <View style={styles.mealCard}>
                <View style={styles.mealHeader}>
                  <View style={styles.mealTitle}>
                    <Ionicons name="cafe" size={24} color="#EA580C" />
                    <Text style={styles.mealTitleText}>Café da manhã</Text>
                  </View>
                  <Text style={styles.mealTime}>09:15</Text>
                </View>
                
                <View style={styles.mealProgress}>
                  <View style={styles.mealProgressHeader}>
                    <View>
                      <Text style={styles.mealProgressValue}>0 Kcal</Text>
                      <Text style={styles.mealProgressLabel}>Meta: 500</Text>
                    </View>
                    <View style={styles.mealProgressRight}>
                      <Text style={styles.mealProgressNumber}>0</Text>
                      <Text style={styles.mealProgressConsumed}>consumidas</Text>
                    </View>
                  </View>
                  
                  <View style={styles.progressBarContainer}>
                    <View style={styles.progressBarHeader}>
                      <Text style={styles.progressBarLabel}>Progresso</Text>
                      <Text style={styles.progressBarPercentage}>0%</Text>
                    </View>
                    <View style={styles.progressBarTrack}>
                      <View style={[styles.progressBarFill, { width: '0%' }]} />
                    </View>
                  </View>
                </View>
              </View>

              <NutritionChart />

              <View style={styles.targetCard}>
                <Text style={styles.targetTitle}>Intervalo da meta</Text>
                <View style={styles.targetContent}>
                  <Text style={styles.targetLabel}>Calorias diárias</Text>
                  <Text style={styles.targetValue}>2.685 - 2.975</Text>
                </View>
              </View>
            </View>
          )}

          {activeTab === 'progresso' && (
            <View style={styles.progressContent}>
              <View style={styles.progressCard}>
                <Ionicons name="trending-up" size={48} color="#059669" style={styles.progressIcon} />
                <Text style={styles.progressTitle}>Seus Progressos</Text>
                <Text style={styles.progressSubtitle}>Acompanhe sua evolução ao longo do tempo</Text>
                
                <View style={styles.progressStats}>
                  <View style={styles.progressStatBlue}>
                    <Text style={styles.progressStatValue}>23</Text>
                    <Text style={styles.progressStatLabel}>Treinos realizados</Text>
                  </View>
                  <View style={styles.progressStatGreen}>
                    <Text style={styles.progressStatValueGreen}>89%</Text>
                    <Text style={styles.progressStatLabel}>Consistência</Text>
                  </View>
                </View>
              </View>

              <View style={styles.mealsCard}>
                <Text style={styles.mealsTitle}>Refeições</Text>
                <View style={styles.mealsEmpty}>
                  <Ionicons name="cafe" size={48} color="#9CA3AF" />
                  <Text style={styles.mealsEmptyText}>Dados de refeições serão exibidos aqui</Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  subGreeting: {
    fontSize: 14,
    color: '#6B7280',
  },
  weatherSection: {
    alignItems: 'flex-end',
  },
  temperature: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  day: {
    fontSize: 12,
    color: '#6B7280',
  },
  motivationCard: {
    backgroundColor: '#2563EB',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
  },
  motivationText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    gap: 4,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  tabsContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  tabsWrapper: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 8,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
  },
  activeTab: {
    backgroundColor: '#2563EB',
    shadowColor: '#2563EB',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  inactiveTab: {
    backgroundColor: 'transparent',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
  },
  inactiveTabText: {
    color: '#6B7280',
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  workoutContent: {
    gap: 24,
  },
  workoutHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  workoutTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  workoutInfo: {
    flexDirection: 'row',
    gap: 16,
  },
  workoutInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  workoutInfoText: {
    fontSize: 14,
    color: '#6B7280',
  },
  workoutCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  workoutCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  workoutCardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  workoutCardIconContainer: {
    backgroundColor: '#EFF6FF',
    padding: 8,
    borderRadius: 12,
  },
  exercisesContainer: {
    gap: 12,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 12,
  },
  exerciseName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  setsContainer: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  setsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563EB',
  },
  dietContent: {
    gap: 24,
  },
  mealCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  mealHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  mealTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  mealTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  mealTime: {
    fontSize: 14,
    color: '#6B7280',
  },
  mealProgress: {
    backgroundColor: '#FEF3E2',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  mealProgressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mealProgressValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  mealProgressLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  mealProgressRight: {
    alignItems: 'flex-end',
  },
  mealProgressNumber: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#EA580C',
  },
  mealProgressConsumed: {
    fontSize: 14,
    color: '#6B7280',
  },
  progressBarContainer: {
    marginTop: 16,
  },
  progressBarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressBarLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  progressBarPercentage: {
    fontSize: 14,
    color: '#6B7280',
  },
  progressBarTrack: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
  },
  progressBarFill: {
    height: 8,
    backgroundColor: '#F59E0B',
    borderRadius: 4,
  },
  nutritionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  nutritionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 8,
  },
  nutritionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  chartWrapper: {
    position: 'relative',
    width: 128,
    height: 128,
  },
  chartSvg: {
    transform: [{ rotate: '-90deg' }],
  },
  chartCenter: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartCenterValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  chartCenterLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  nutritionItemBlue: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    minWidth: 120,
  },
  nutritionItemGreen: {
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    minWidth: 120,
  },
  nutritionItemYellow: {
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '100%',
  },
  nutritionDotBlue: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#3B82F6',
    marginBottom: 8,
  },
  nutritionDotGreen: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#10B981',
    marginBottom: 8,
  },
  nutritionDotYellow: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#F59E0B',
    marginBottom: 8,
  },
  nutritionItemLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  nutritionItemValueBlue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  nutritionItemValueGreen: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#059669',
  },
  nutritionItemValueYellow: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D97706',
  },
  targetCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  targetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  targetContent: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  targetLabel: {
    fontSize: 16,
    color: '#6B7280',
  },
  targetValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  progressContent: {
    gap: 24,
  },
  progressCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  progressIcon: {
    marginBottom: 16,
  },
  progressTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  progressSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  progressStats: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
  },
  progressStatBlue: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
  },
  progressStatGreen: {
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
  },
  progressStatValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  progressStatValueGreen: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#059669',
  },
  progressStatLabel: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  mealsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  mealsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  mealsEmpty: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  mealsEmptyText: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 16,
    textAlign: 'center',
  },
});