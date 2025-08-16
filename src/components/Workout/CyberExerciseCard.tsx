import React from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface Exercise {
  id: number;
  name: string;
  sets: number;
  reps: string;
  weight: string;
  completed: boolean;
  category: string;
}

interface CyberExerciseCardProps {
  exercise: Exercise;
  index: number;
  glowAnim: Animated.Value;
}

const CyberExerciseCard: React.FC<CyberExerciseCardProps> = ({ exercise, index, glowAnim }) => {
  return (
    <View style={[styles.exerciseCard, { marginTop: index === 0 ? 0 : 12 }]}>
      <LinearGradient
        colors={exercise.completed 
          ? ['rgba(16,185,129,0.1)', 'rgba(16,185,129,0.05)'] 
          : ['rgba(139,92,246,0.1)', 'rgba(0,255,247,0.05)']}
        style={styles.exerciseGradient}
      >
        <View style={styles.exerciseContent}>
          <View style={styles.exerciseLeft}>
            <View style={styles.exerciseCategory}>
              <Text style={styles.categoryText}>{exercise.category}</Text>
            </View>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            <View style={styles.exerciseStats}>
              <View style={styles.statItem}>
                <Ionicons name="repeat" size={14} color="#00FFF7" />
                <Text style={styles.statText}>{exercise.sets}</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="fitness" size={14} color="#8B5CF6" />
                <Text style={styles.statText}>{exercise.reps}</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="barbell" size={14} color="#EC4899" />
                <Text style={styles.statText}>{exercise.weight}</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.exerciseRight}>
            {exercise.completed ? (
              <View style={styles.completedContainer}>
                <LinearGradient
                  colors={['#10B981', '#059669']}
                  style={styles.completedBadge}
                >
                  <Ionicons name="checkmark" size={20} color="#FFF" />
                </LinearGradient>
                <Text style={styles.completedText}>FEITO</Text>
              </View>
            ) : (
              <TouchableOpacity style={styles.playContainer}>
                <LinearGradient
                  colors={['#8B5CF6', '#EC4899']}
                  style={styles.playButton}
                >
                  <Ionicons name="play" size={16} color="#FFF" />
                </LinearGradient>
                <Text style={styles.playText}>INICIAR</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        
        {!exercise.completed && (
          <Animated.View 
            style={[
              styles.scanLine,
              {
                opacity: glowAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.3, 0.8]
                })
              }
            ]} 
          />
        )}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  exerciseCard: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  exerciseGradient: {
    padding: 16,
    position: 'relative',
  },
  exerciseContent: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  exerciseLeft: {
    flex: 1,
  },
  exerciseCategory: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    borderRadius: 4,
    marginBottom: 8,
  },
  categoryText: {
    color: '#8B5CF6',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  exerciseName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  exerciseStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  exerciseRight: {
    alignItems: 'center',
  },
  completedContainer: {
    alignItems: 'center',
  },
  completedBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  completedText: {
    color: '#10B981',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  playContainer: {
    alignItems: 'center',
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  playText: {
    color: '#8B5CF6',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  scanLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#00FFF7',
  },
});

export default CyberExerciseCard;