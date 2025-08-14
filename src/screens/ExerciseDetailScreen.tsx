import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface ExerciseDetailScreenProps {
  exerciseName: string;
  targetMuscles: string[];
  sets: number;
  reps: string;
  restTime: number;
  difficulty: 'iniciante' | 'intermediário' | 'avançado';
  tips: string[];
  onBack: () => void;
  onStartExercise: () => void;
}

const { width } = Dimensions.get('window');

const ExerciseDetailScreen: React.FC<ExerciseDetailScreenProps> = ({
  exerciseName = "Supino Reto com Barra",
  targetMuscles = ["Peitoral", "Tríceps", "Deltoides"],
  sets = 4,
  reps = "8-12",
  restTime = 90,
  difficulty = "intermediário",
  tips = [
    "Mantenha os ombros contraídos e estáveis",
    "Controle o movimento na descida",
    "Empurre com força explosiva na subida",
    "Não deixe a barra tocar o peito com força"
  ],
  onBack,
  onStartExercise,
}) => {
  const [currentTip, setCurrentTip] = useState(0);

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'iniciante':
        return '#10B981';
      case 'intermediário':
        return '#F59E0B';
      case 'avançado':
        return '#EF4444';
      default:
        return '#10B981';
    }
  };

  const getDifficultyIcon = (level: string) => {
    switch (level) {
      case 'iniciante':
        return 'fitness-outline';
      case 'intermediário':
        return 'flame-outline';
      case 'avançado':
        return 'flash-outline';
      default:
        return 'fitness-outline';
    }
  };

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % tips.length);
  };

  const previousTip = () => {
    setCurrentTip((prev) => (prev - 1 + tips.length) % tips.length);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header com botão de voltar */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="arrow-back" size={24} color="#00FFF7" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Exercício</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Card principal do exercício */}
        <View style={styles.exerciseCardWrapper}>
          <LinearGradient
            colors={['rgba(139, 92, 246, 0.1)', 'rgba(139, 92, 246, 0.05)']}
            style={styles.exerciseCard}
          >
            {/* Nome do exercício */}
            <View style={styles.exerciseHeader}>
              <Text style={styles.exerciseName}>{exerciseName}</Text>
              <View style={styles.difficultyBadge}>
                <Ionicons
                  name={getDifficultyIcon(difficulty) as any}
                  size={16}
                  color={getDifficultyColor(difficulty)}
                />
                <Text style={[styles.difficultyText, { color: getDifficultyColor(difficulty) }]}>
                  {difficulty}
                </Text>
              </View>
            </View>

            {/* Músculos trabalhados */}
            <View style={styles.musclesSection}>
              <Text style={styles.sectionTitle}>Músculos Trabalhados</Text>
              <View style={styles.musclesContainer}>
                {targetMuscles.map((muscle, index) => (
                  <View key={index} style={styles.muscleTag}>
                    <Text style={styles.muscleText}>{muscle}</Text>
                  </View>
                ))}
              </View>
            </View>
          </LinearGradient>
          <View style={styles.glowBorder} />
        </View>

        {/* Estatísticas do exercício */}
        <View style={styles.statsCardWrapper}>
          <LinearGradient
            colors={['rgba(0, 255, 247, 0.05)', 'rgba(0, 255, 247, 0.02)']}
            style={styles.statsCard}
          >
            <View style={styles.statsHeader}>
              <Ionicons name="stats-chart" size={20} color="#00FFF7" />
              <Text style={styles.statsTitle}>Parâmetros</Text>
            </View>
            
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Ionicons name="layers-outline" size={18} color="#00FFF7" />
                <Text style={styles.statValue}>{sets}</Text>
                <Text style={styles.statLabel}>Séries</Text>
              </View>

              <View style={styles.statItem}>
                <Ionicons name="repeat-outline" size={18} color="#00FFF7" />
                <Text style={styles.statValue}>{reps}</Text>
                <Text style={styles.statLabel}>Repetições</Text>
              </View>

              <View style={styles.statItem}>
                <Ionicons name="timer-outline" size={18} color="#00FFF7" />
                <Text style={styles.statValue}>{restTime}s</Text>
                <Text style={styles.statLabel}>Descanso</Text>
              </View>
            </View>
          </LinearGradient>
          <View style={[styles.glowBorder, { borderColor: 'rgba(0, 255, 247, 0.2)', shadowColor: '#00FFF7' }]} />
        </View>

        {/* Dicas do exercício */}
        <View style={styles.tipsCardWrapper}>
          <LinearGradient
            colors={['rgba(34, 197, 94, 0.05)', 'rgba(34, 197, 94, 0.02)']}
            style={styles.tipsCard}
          >
            <View style={styles.tipsHeader}>
              <Ionicons name="bulb" size={20} color="#22C55E" />
              <Text style={styles.tipsTitle}>Dicas de Execução</Text>
              <Text style={styles.tipCounter}>{currentTip + 1}/{tips.length}</Text>
            </View>

            <View style={styles.tipContainer}>
              <Text style={styles.tipText}>{tips[currentTip]}</Text>
            </View>

            <View style={styles.tipNavigation}>
              <TouchableOpacity 
                style={styles.tipNavButton} 
                onPress={previousTip}
                disabled={tips.length <= 1}
              >
                <Ionicons name="chevron-back" size={20} color="#22C55E" />
              </TouchableOpacity>

              <View style={styles.tipDots}>
                {tips.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.tipDot,
                      index === currentTip && styles.tipDotActive
                    ]}
                  />
                ))}
              </View>

              <TouchableOpacity 
                style={styles.tipNavButton} 
                onPress={nextTip}
                disabled={tips.length <= 1}
              >
                <Ionicons name="chevron-forward" size={20} color="#22C55E" />
              </TouchableOpacity>
            </View>
          </LinearGradient>
          <View style={[styles.glowBorder, { borderColor: 'rgba(34, 197, 94, 0.2)', shadowColor: '#22C55E' }]} />
        </View>

        {/* Botão de ação principal */}
        <View style={styles.actionButtonWrapper}>
          <TouchableOpacity 
            style={styles.startButton} 
            onPress={onStartExercise}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#8B5CF6', '#7C3AED']}
              style={styles.startButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View style={styles.startButtonContent}>
                <Ionicons name="play" size={24} color="#FFFFFF" />
                <Text style={styles.startButtonText}>Começar Exercício</Text>
                <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginTop: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 255, 247, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 247, 0.3)',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  headerSpacer: {
    width: 40,
  },
  exerciseCardWrapper: {
    position: 'relative',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  exerciseCard: {
    backgroundColor: 'rgba(20, 20, 20, 0.9)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  exerciseHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  exerciseName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  difficultyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  difficultyText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
    textTransform: 'capitalize',
  },
  musclesSection: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  musclesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  muscleTag: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.4)',
  },
  muscleText: {
    fontSize: 12,
    color: '#8B5CF6',
    fontWeight: '500',
  },
  statsCardWrapper: {
    position: 'relative',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  statsCard: {
    backgroundColor: 'rgba(20, 20, 20, 0.9)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 247, 0.3)',
  },
  statsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
    letterSpacing: 0.5,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tipsCardWrapper: {
    position: 'relative',
    marginHorizontal: 20,
    marginBottom: 30,
  },
  tipsCard: {
    backgroundColor: 'rgba(20, 20, 20, 0.9)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.3)',
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
    letterSpacing: 0.5,
    flex: 1,
  },
  tipCounter: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tipContainer: {
    minHeight: 60,
    justifyContent: 'center',
    marginBottom: 16,
  },
  tipText: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
    textAlign: 'center',
  },
  tipNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tipNavButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.3)',
  },
  tipDots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tipDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  tipDotActive: {
    backgroundColor: '#22C55E',
    width: 20,
    borderRadius: 3,
  },
  actionButtonWrapper: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  startButton: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  startButtonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 24,
  },
  startButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 12,
    letterSpacing: 0.5,
  },
  glowBorder: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 18,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: -1,
  },
});

export default ExerciseDetailScreen;