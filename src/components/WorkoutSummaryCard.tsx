import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface WorkoutSummaryCardProps {
  duration: number; // em minutos
  difficulty: 'iniciante' | 'intermediário' | 'avançado';
  exerciseCount: number;
  isInProgress?: boolean;
  onPress: () => void;
}

const WorkoutSummaryCard: React.FC<WorkoutSummaryCardProps> = ({
  duration,
  difficulty,
  exerciseCount,
  isInProgress = false,
  onPress,
}) => {
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'iniciante':
        return '#10B981'; // Verde-esmeralda
      case 'intermediário':
        return '#F59E0B'; // Amarelo/laranja
      case 'avançado':
        return '#EF4444'; // Vermelho neon
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

  return (
    <View style={styles.container}>
      {/* Card principal com glow effect */}
      <View style={styles.cardWrapper}>
        <LinearGradient
          colors={['rgba(139, 92, 246, 0.1)', 'rgba(139, 92, 246, 0.05)']}
          style={styles.card}
        >
          {/* Header do card com informações */}
          <View style={styles.header}>
            {/* Duração */}
            <View style={styles.infoItem}>
              <Ionicons name="time-outline" size={18} color="#00FFF7" />
              <Text style={styles.infoValue}>{duration}min</Text>
              <Text style={styles.infoLabel}>Duração</Text>
            </View>

            {/* Dificuldade */}
            <View style={styles.infoItem}>
              <Ionicons 
                name={getDifficultyIcon(difficulty) as any} 
                size={18} 
                color={getDifficultyColor(difficulty)} 
              />
              <Text style={[styles.infoValue, { color: getDifficultyColor(difficulty) }]}>
                {difficulty}
              </Text>
              <Text style={styles.infoLabel}>Nível</Text>
            </View>

            {/* Meta de exercícios */}
            <View style={styles.infoItem}>
              <Ionicons name="barbell-outline" size={18} color="#00FFF7" />
              <Text style={styles.infoValue}>{exerciseCount}</Text>
              <Text style={styles.infoLabel}>Exercícios</Text>
            </View>
          </View>

          {/* Botão principal */}
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={onPress}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={isInProgress ? ['#00FFF7', '#0891B2'] : ['#8B5CF6', '#7C3AED']}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View style={styles.buttonContent}>
                <Ionicons 
                  name={isInProgress ? "play-circle" : "rocket"} 
                  size={24} 
                  color="#FFFFFF" 
                />
                <Text style={styles.buttonText}>
                  {isInProgress ? 'Continuar treino' : 'Iniciar treino'}
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>

        {/* Glow effect border */}
        <View style={styles.glowBorder} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 16,
  },
  cardWrapper: {
    position: 'relative',
  },
  card: {
    backgroundColor: 'rgba(20, 20, 20, 0.9)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  infoItem: {
    alignItems: 'center',
    flex: 1,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 4,
    fontFamily: 'System', // Você pode substituir por 'Orbitron' se tiver a fonte
  },
  infoLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  actionButton: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    letterSpacing: 0.5,
  },
});

export default WorkoutSummaryCard;