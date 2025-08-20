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

interface Exercise {
  id: string;
  name: string;
  emoji: string;
  series: number;
  reps: string;
  weight: string;
  completed: boolean;
}

interface WorkoutData {
  title: string;
  subtitle: string;
  duration: string;
  date: string;
  weight: string;
  isCompleted: boolean;
  exercises: Exercise[];
}

export default function WorkoutScreen() {
  const [workoutData] = useState<WorkoutData>({
    title: "Treino Quarta-feira",
    subtitle: "Perna + Glúteo + Panturrilha",
    duration: "1h 25min 32seg",
    date: "20/08/25",
    weight: "72.50kg",
    isCompleted: true,
    exercises: [
      {
        id: '1',
        name: 'Agachamento Goblet',
        emoji: '🏋️‍♂️',
        series: 4,
        reps: '8-10',
        weight: '20kg',
        completed: true
      },
      {
        id: '2',
        name: 'Leg Press',
        emoji: '🦵',
        series: 4,
        reps: '8-10',
        weight: '100kg',
        completed: true
      },
      {
        id: '3',
        name: 'Mesa Flexora',
        emoji: '💪',
        series: 3,
        reps: '10-12',
        weight: '35kg',
        completed: true
      },
      {
        id: '4',
        name: 'Cadeira Extensora',
        emoji: '🔥',
        series: 4,
        reps: '10-12',
        weight: '40kg',
        completed: true
      },
      {
        id: '5',
        name: 'Banco Adutor',
        emoji: '⚡',
        series: 3,
        reps: '12-15',
        weight: '35kg',
        completed: true
      },
      {
        id: '6',
        name: 'Banco Abdutor',
        emoji: '🎯',
        series: 3,
        reps: '12-15',
        weight: '25kg',
        completed: true
      },
      {
        id: '7',
        name: 'Panturrilha Leg Press',
        emoji: '🚀',
        series: 4,
        reps: '12-15',
        weight: '40kg',
        completed: true
      }
    ]
  });

  const totalSeries = workoutData.exercises.reduce((sum, ex) => sum + ex.series, 0);
  const totalWeight = workoutData.exercises.reduce((sum, ex) => sum + parseFloat(ex.weight.replace('kg', '')), 0);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D0D1F" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.userInfo}>
              <View style={styles.avatar}>
                <Ionicons name="trophy" size={20} color="#000" />
              </View>
              <View>
                <Text style={styles.userName}>Deywid Braga</Text>
                <Text style={styles.userStatus}>Treino concluído! 🎉</Text>
              </View>
            </View>
            {workoutData.isCompleted && (
              <View style={styles.completedBadge}>
                <Ionicons name="checkmark-circle" size={14} color="#fff" />
                <Text style={styles.completedText}>Finalizado</Text>
              </View>
            )}
          </View>
        </View>

        {/* Workout Header Card */}
        <View style={styles.workoutCard}>
          <View style={styles.workoutCardContent}>
            <View style={styles.workoutTitle}>
              <Text style={styles.workoutTitleText}>{workoutData.title}</Text>
              <Text style={styles.workoutSubtitle}>{workoutData.subtitle}</Text>
            </View>
            
            {/* Stats Grid */}
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Ionicons name="timer-outline" size={24} color="#0FF0FC" style={styles.statIcon} />
                <Text style={styles.statValue}>
                  {workoutData.duration.split(' ')[0]} {workoutData.duration.split(' ')[1]}
                </Text>
                <Text style={styles.statLabel}>DURAÇÃO</Text>
              </View>
              <View style={styles.statCard}>
                <Ionicons name="calendar-outline" size={24} color="#0FF0FC" style={styles.statIcon} />
                <Text style={styles.statValue}>{workoutData.date}</Text>
                <Text style={styles.statLabel}>DATA</Text>
              </View>
              <View style={styles.statCard}>
                <Ionicons name="barbell-outline" size={24} color="#0FF0FC" style={styles.statIcon} />
                <Text style={styles.statValue}>{workoutData.weight}</Text>
                <Text style={styles.statLabel}>PESO</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Summary Stats */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryContent}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{workoutData.exercises.length}</Text>
              <Text style={styles.summaryLabel}>Exercícios</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{totalSeries}</Text>
              <Text style={styles.summaryLabel}>Séries Total</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{totalWeight}kg</Text>
              <Text style={styles.summaryLabel}>Carga Total</Text>
            </View>
          </View>
        </View>

        {/* Exercises List */}
        <View style={styles.exercisesSection}>
          <Text style={styles.exercisesTitle}>Exercícios Realizados</Text>
          <View style={styles.exercisesList}>
            {workoutData.exercises.map((exercise, index) => (
              <View key={exercise.id} style={styles.exerciseCard}>
                <View style={styles.exerciseHeader}>
                  <View style={styles.exerciseInfo}>
                    <View style={styles.exerciseEmoji}>
                      <Text style={styles.emojiText}>{exercise.emoji}</Text>
                    </View>
                    <View>
                      <Text style={styles.exerciseName}>{exercise.name}</Text>
                      <View style={styles.completedIndicator}>
                        <View style={styles.completedDot} />
                        <Text style={styles.completedLabel}>Concluído</Text>
                      </View>
                    </View>
                  </View>
                  <Ionicons name="checkmark-circle" size={24} color="#22C55E" />
                </View>
                
                <View style={styles.exerciseStats}>
                  <View style={styles.exerciseStatCard}>
                    <Text style={styles.exerciseStatLabel}>SÉRIES</Text>
                    <Text style={styles.exerciseStatValue}>{exercise.series}</Text>
                  </View>
                  <View style={styles.exerciseStatCard}>
                    <Text style={styles.exerciseStatLabel}>REPS</Text>
                    <Text style={styles.exerciseStatValue}>{exercise.reps}</Text>
                  </View>
                  <View style={styles.exerciseStatCard}>
                    <Text style={styles.exerciseStatLabel}>PESO</Text>
                    <Text style={styles.exerciseStatValue}>{exercise.weight}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.primaryButton}>
              <Ionicons name="play" size={20} color="#000" />
              <Text style={styles.primaryButtonText}>Repetir Treino</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.secondaryButton}>
              <Ionicons name="trophy-outline" size={20} color="#fff" />
              <Text style={styles.secondaryButtonText}>Ver Histórico</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D1F',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 24,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0FF0FC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  userStatus: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  completedBadge: {
    backgroundColor: '#22C55E',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  completedText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  workoutCard: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  workoutCardContent: {
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#374151',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  workoutTitle: {
    alignItems: 'center',
    marginBottom: 24,
  },
  workoutTitleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0FF0FC',
    marginBottom: 8,
  },
  workoutSubtitle: {
    fontSize: 18,
    color: '#D1D5DB',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(107, 114, 128, 0.5)',
  },
  statIcon: {
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0FF0FC',
  },
  statLabel: {
    fontSize: 10,
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  summaryCard: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  summaryContent: {
    backgroundColor: 'rgba(15, 240, 252, 0.1)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(15, 240, 252, 0.2)',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0FF0FC',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  exercisesSection: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  exercisesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  exercisesList: {
    gap: 16,
  },
  exerciseCard: {
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#374151',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  exerciseInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  exerciseEmoji: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#0FF0FC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiText: {
    fontSize: 20,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  completedIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  completedDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22C55E',
  },
  completedLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#22C55E',
  },
  exerciseStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  exerciseStatCard: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(107, 114, 128, 0.3)',
  },
  exerciseStatLabel: {
    fontSize: 10,
    color: '#0FF0FC',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  exerciseStatValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  actionButtons: {
    marginTop: 32,
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#0FF0FC',
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#0FF0FC',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  primaryButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#1A1A2E',
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#374151',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});