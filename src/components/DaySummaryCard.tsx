import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

interface DaySummaryCardProps {
  workoutType: string;
  status: string;
  motivationalPhrase: string;
  onStartPress: () => void;
}

const DaySummaryCard: React.FC<DaySummaryCardProps> = ({
  workoutType,
  status,
  motivationalPhrase,
  onStartPress,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const accentPulse = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(accentPulse, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(accentPulse, {
          toValue: 0.6,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.card}>
        <Animated.View
          style={[
            styles.accentLine,
            { opacity: accentPulse, transform: [{ scaleX: accentPulse }] },
          ]}
        />

        <View style={styles.header}>
          <Text style={styles.statusText}>{status.toUpperCase()}</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.workoutTitle}>{workoutType}</Text>

          <View style={styles.motivationalBox}>
            <Text style={styles.motivationalText}>
              “{motivationalPhrase}”
            </Text>
          </View>
        </View>

        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity
            onPressIn={() => buttonScale.setValue(0.95)}
            onPressOut={() =>
              Animated.spring(buttonScale, {
                toValue: 1,
                useNativeDriver: true,
              }).start()
            }
            onPress={onStartPress}
            style={styles.button}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonText}>Começar Treino</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  card: {
    backgroundColor: '#121212',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#2D2D2D',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
    position: 'relative',
  },
  accentLine: {
    position: 'absolute',
    top: 0,
    left: 24,
    right: 24,
    height: 2,
    backgroundColor: '#00FFF7',
    borderRadius: 1,
  },
  header: {
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#00FFF7',
    backgroundColor: '#1F1F1F',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    fontFamily: 'Orbitron-Regular',
    overflow: 'hidden',
  },
  content: {
    marginBottom: 28,
  },
  workoutTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
    fontFamily: 'Orbitron-Bold',
    marginBottom: 20,
    letterSpacing: 1,
  },
  motivationalBox: {
    backgroundColor: '#1C1C1C',
    borderLeftColor: '#00FFF7',
    borderLeftWidth: 4,
    borderRadius: 14,
    padding: 16,
  },
  motivationalText: {
    color: '#CCCCCC',
    fontSize: 15,
    fontStyle: 'italic',
    lineHeight: 22,
    textAlign: 'center',
    fontFamily: 'Orbitron-Regular',
  },
  button: {
    backgroundColor: '#00FFF7',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#00FFF7',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  buttonText: {
    color: '#0A0A0A',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Orbitron-Bold',
    letterSpacing: 1,
  },
});

export default DaySummaryCard;