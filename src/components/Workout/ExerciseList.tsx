import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import CyberExerciseCard from '../Workout/CyberExerciseCard';

interface Exercise {
  id: number;
  name: string;
  sets: number;
  reps: string;
  weight: string;
  completed: boolean;
  category: string;
}

interface ExerciseListProps {
  exercises: Exercise[];
  glowAnim: Animated.Value;
}

const ExerciseList: React.FC<ExerciseListProps> = ({ exercises, glowAnim }) => {
  return (
    <View style={styles.exerciseList}>
      <Text style={styles.sectionTitle}>MÓDULOS DE TREINAMENTO</Text>
      <View style={styles.sectionUnderline} />
      {exercises.map((exercise, index) => (
        <CyberExerciseCard 
          key={exercise.id} 
          exercise={exercise} 
          index={index}
          glowAnim={glowAnim}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  exerciseList: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 2,
    marginBottom: 8,
  },
  sectionUnderline: {
    height: 2,
    width: 80,
    backgroundColor: '#8B5CF6',
    borderRadius: 1,
    marginBottom: 20,
  },
});

export default ExerciseList;