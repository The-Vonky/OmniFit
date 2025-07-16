import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';

interface ProgressOverviewCardProps {
  weeklyWorkouts: number;   // Ex: 3
  weeklyGoal: number;       // Ex: 5
  monthlyWorkouts: number;  // Ex: 12
  monthlyGoal: number;      // Ex: 20
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ProgressOverviewCard: React.FC<ProgressOverviewCardProps> = ({
  weeklyWorkouts,
  weeklyGoal,
  monthlyWorkouts,
  monthlyGoal,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  const adherencePercentage = monthlyGoal > 0
    ? Math.min((monthlyWorkouts / monthlyGoal) * 100, 100)
    : 0;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(progressAnim, {
        toValue: adherencePercentage,
        duration: 1000,
        useNativeDriver: false,
      }),
    ]).start();
  }, [adherencePercentage]);

  const animatedWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <Animated.View
      style={[
        styles.card,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <Text style={styles.title}>Seu Progresso</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Treinos na semana:</Text>
        <Text style={styles.value}>
          <Text style={styles.highlight}>{weeklyWorkouts}</Text>
          <Text style={styles.value}> / {weeklyGoal}</Text>
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Treinos no mês:</Text>
        <Text style={styles.value}>
          <Text style={styles.highlight}>{monthlyWorkouts}</Text>
          <Text style={styles.value}> / {monthlyGoal}</Text>
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Aderência ao plano:</Text>
        <Text style={styles.highlight}>{Math.round(adherencePercentage)}%</Text>
      </View>

      <View style={styles.progressBarBackground}>
        <Animated.View
          style={[
            styles.progressBarFill,
            {
              width: animatedWidth,
            },
          ]}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#111111',
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 20,
    marginVertical: 14,
    shadowColor: '#00FFF7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  title: {
    fontSize: 20,
    color: '#EEEEEE',
    fontFamily: Platform.OS === 'ios' ? 'Orbitron-Bold' : 'Orbitron-Bold',
    marginBottom: 16,
    letterSpacing: 0.8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#AAAAAA',
    fontFamily: Platform.OS === 'ios' ? 'Orbitron-Regular' : 'Orbitron-Regular',
  },
  value: {
    fontSize: 14,
    color: '#EEEEEE',
    fontFamily: Platform.OS === 'ios' ? 'Orbitron-Regular' : 'Orbitron-Regular',
  },
  highlight: {
    color: '#00FFF7',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Orbitron-Bold' : 'Orbitron-Bold',
  },
  progressBarBackground: {
    height: 12,
    borderRadius: 8,
    backgroundColor: '#1F1F1F',
    overflow: 'hidden',
    marginTop: 12,
  },
  progressBarFill: {
    height: 12,
    backgroundColor: '#00FFF7',
    borderRadius: 8,
  },
});

export default ProgressOverviewCard;