import React from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface WorkoutStartCardProps {
  duration: number;
  difficulty: string;
  exerciseCount: number;
  isInProgress: boolean;
  onStartWorkout: () => void;
  pulseAnim: Animated.Value;
}

const WorkoutStartCard: React.FC<WorkoutStartCardProps> = ({
  duration,
  difficulty,
  exerciseCount,
  isInProgress,
  onStartWorkout,
  pulseAnim,
}) => {
  return (
    <View style={styles.workoutCardContainer}>
      <TouchableOpacity 
        style={styles.workoutCard}
        onPress={onStartWorkout}
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
              <Text style={styles.workoutCardDuration}>{duration} min</Text>
              <Text style={styles.workoutCardDifficulty}>{difficulty}</Text>
              <Text style={styles.workoutCardExercises}>{exerciseCount} exercícios</Text>
            </View>
            
            <View style={styles.workoutCardRight}>
              <Animated.View style={[styles.workoutCardButton, { transform: [{ scale: pulseAnim }] }]}>
                <Ionicons 
                  name={isInProgress ? "pause" : "play"} 
                  size={28} 
                  color="#FFFFFF" 
                />
              </Animated.View>
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
};

const styles = StyleSheet.create({
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
});

export default WorkoutStartCard;