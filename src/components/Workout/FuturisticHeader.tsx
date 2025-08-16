import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface FuturisticHeaderProps {
  userName: string;
  workoutName: string;
  weeklyPlan: string[];
  currentDay: number;
}

const FuturisticHeader: React.FC<FuturisticHeaderProps> = ({
  userName,
  workoutName,
  weeklyPlan,
  currentDay,
}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Olá, {userName}! 👋</Text>
          <Text style={styles.workoutTitle}>{workoutName}</Text>
          
          <View style={styles.weeklyPlanContainer}>
            <View style={styles.weeklyPlan}>
              {weeklyPlan.map((day, index) => (
                <View
                  key={index}
                  style={[
                    styles.dayButton,
                    index === currentDay && styles.currentDay,
                  ]}
                >
                  <Text
                    style={[
                      styles.dayText,
                      index === currentDay && styles.currentDayText,
                    ]}
                  >
                    {day}
                  </Text>
                </View>
              ))}
            </View>
            <Text style={styles.weekLabel}>Semana atual</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  header: {
    // Container principal
  },
  headerContent: {
    // Conteúdo do header
  },
  greeting: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 8,
  },
  workoutTitle: {
    fontSize: 20,
    color: '#00FFF7',
    fontWeight: '700',
    marginBottom: 24,
    letterSpacing: 0.5,
  },
  weeklyPlanContainer: {
    alignItems: 'center',
  },
  weekLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '500',
    marginTop: 12,
  },
  weeklyPlan: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  currentDay: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  dayText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 11,
    fontWeight: '600',
  },
  currentDayText: {
    color: '#FFFFFF',
  },
});

export default FuturisticHeader;