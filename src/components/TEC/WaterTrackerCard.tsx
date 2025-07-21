import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface WaterTrackerCardProps {
  cupsDrank: number;
  dailyGoal: number;
  onAddCup: () => void;
}

const WaterTrackerCard: React.FC<WaterTrackerCardProps> = ({
  cupsDrank,
  dailyGoal,
  onAddCup,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  const progressPercentage =
    dailyGoal > 0 ? Math.min((cupsDrank / dailyGoal) * 100, 100) : 0;

  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Entrada do card
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
    ]).start();

    // Animação da barrinha de progresso
    Animated.timing(animatedWidth, {
      toValue: progressPercentage,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [progressPercentage]);

  const interpolatedWidth = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.92,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

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
      <View style={styles.header}>
        <Ionicons name="water" size={24} color="#00FFF7" style={{ marginRight: 8 }} />
        <Text style={styles.title}>Hidratação de Hoje</Text>
      </View>

      <View style={styles.progressInfo}>
        <Text style={styles.progressText}>
          {cupsDrank} de {dailyGoal} copos
        </Text>
      </View>

      <View style={styles.progressBarBackground}>
        <Animated.View
          style={[styles.progressBarFill, { width: interpolatedWidth }]}
        />
      </View>

      <Animated.View style={[styles.addButtonWrapper, { transform: [{ scale: buttonScale }] }]}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={onAddCup}
          style={styles.addButton}
        >
          <Ionicons name="add-circle" size={36} color="#00FFF7" />
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#111111',
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#00FFF7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  title: {
    fontSize: 18,
    color: '#EEEEEE',
    fontFamily: Platform.OS === 'ios' ? 'Orbitron-Bold' : 'Orbitron-Bold',
  },
  progressInfo: {
    marginBottom: 10,
  },
  progressText: {
    fontSize: 14,
    color: '#CCCCCC',
    fontFamily: Platform.OS === 'ios' ? 'Orbitron-Regular' : 'Orbitron-Regular',
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: '#1F1F1F',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressBarFill: {
    height: 10,
    backgroundColor: '#00FFF7',
    borderRadius: 8,
  },
  addButtonWrapper: {
    alignItems: 'center',
  },
  addButton: {
    padding: 6,
  },
});

export default WaterTrackerCard;