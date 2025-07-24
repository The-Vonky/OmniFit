import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GlowingCard } from './GlowingCard';
import { styles } from './Styles';
import { WorkoutDetail } from './Types';

interface WorkoutCardProps {
  title: string;
  time: string;
  type: string;
  details: WorkoutDetail[];
  onStartWorkout: () => void;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ 
  title, 
  time, 
  type, 
  details, 
  onStartWorkout 
}) => {
  return (
    <GlowingCard delay={400} glowColor="#F59E0B">
      <View style={styles.workoutCard}>
        <View style={styles.workoutHeader}>
          <View>
            <Text style={styles.workoutTitle}>{title}</Text>
            <Text style={styles.workoutTime}>{time}</Text>
          </View>
          <View style={styles.workoutType}>
            <Text style={styles.workoutTypeText}>{type}</Text>
          </View>
        </View>

        <View style={styles.workoutDetails}>
          {details.map((detail, index) => (
            <View key={index} style={styles.workoutDetail}>
              <Text style={styles.workoutDetailIcon}>{detail.icon}</Text>
              <Text style={styles.workoutDetailText}>{detail.text}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity onPress={onStartWorkout} style={styles.startWorkoutBtn}>
          <Text style={styles.startWorkoutText}>INICIAR TREINO</Text>
        </TouchableOpacity>
      </View>
    </GlowingCard>
  );
};

export default WorkoutCard;