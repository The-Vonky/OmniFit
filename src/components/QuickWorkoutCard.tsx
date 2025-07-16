import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface QuickWorkoutCardProps {
  exercises: string[]; // máximo 3
  onStartQuickWorkout: () => void;
}

const QuickWorkoutCard: React.FC<QuickWorkoutCardProps> = ({
  exercises,
  onStartQuickWorkout,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

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
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
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
        <Ionicons name="barbell" size={24} color="#00FFF7" style={{ marginRight: 8 }} />
        <Text style={styles.title}>Treino Rápido do Dia</Text>
        <Ionicons name="timer" size={20} color="#00FFF7" style={{ marginLeft: 8 }} />
      </View>

      <View style={styles.listContainer}>
        {exercises.slice(0, 3).map((exercise, idx) => (
          <View key={idx} style={styles.listItem}>
            <View style={styles.bullet}>
              <Text style={styles.bulletText}>{idx + 1}</Text>
            </View>
            <Text style={styles.exerciseText} numberOfLines={2} ellipsizeMode="tail">
              {exercise}
            </Text>
          </View>
        ))}
      </View>

      <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={onStartQuickWorkout}
        >
          <Text style={styles.buttonText}>Começar Agora</Text>
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
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 7,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    color: '#EEEEEE',
    fontFamily: Platform.OS === 'ios' ? 'Orbitron-Bold' : 'Orbitron-Bold',
    letterSpacing: 0.8,
    flexShrink: 1,
  },
  listContainer: {
    marginBottom: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  bullet: {
    backgroundColor: '#00FFF7',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  bulletText: {
    color: '#111111',
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'Orbitron-Bold' : 'Orbitron-Bold',
  },
  exerciseText: {
    color: '#EEEEEE',
    fontSize: 16,
    flexShrink: 1,
    fontFamily: Platform.OS === 'ios' ? 'Orbitron-Regular' : 'Orbitron-Regular',
  },
  button: {
    backgroundColor: '#00FFF7',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#00FFF7',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonText: {
    color: '#111111',
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Orbitron-Bold' : 'Orbitron-Bold',
    letterSpacing: 0.7,
  },
});

export default QuickWorkoutCard;