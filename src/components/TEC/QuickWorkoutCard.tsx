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
  const slideAnim = useRef(new Animated.Value(30)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const headerGlow = useRef(new Animated.Value(0)).current;
  const dataFlow = useRef(new Animated.Value(0)).current;
  const hologramFlicker = useRef(new Animated.Value(1)).current;
  const exerciseHighlight = useRef(new Animated.Value(0)).current;
  const scanPulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animação de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 80,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Glow do header
    Animated.loop(
      Animated.sequence([
        Animated.timing(headerGlow, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(headerGlow, {
          toValue: 0.2,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Data flow animation
    Animated.loop(
      Animated.timing(dataFlow, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();

    // Hologram flicker
    Animated.loop(
      Animated.sequence([
        Animated.timing(hologramFlicker, {
          toValue: 0.97,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(hologramFlicker, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.delay(Math.random() * 4000 + 3000),
      ])
    ).start();

    // Exercise highlight
    Animated.loop(
      Animated.sequence([
        Animated.timing(exerciseHighlight, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(exerciseHighlight, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Scan pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanPulse, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(scanPulse, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.delay(2000),
      ])
    ).start();
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
      tension: 300,
      friction: 10,
      useNativeDriver: true,
    }).start();
  };

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
      <Animated.View
        style={[
          styles.card,
          {
            opacity: hologramFlicker,
            transform: [{ scale: hologramFlicker }],
          },
        ]}
      >
        {/* Background glow */}
        <Animated.View
          style={[
            styles.backgroundGlow,
            {
              opacity: headerGlow.interpolate({
                inputRange: [0, 1],
                outputRange: [0.05, 0.15],
              }),
            },
          ]}
        />

        {/* Corner brackets */}
        <View style={styles.cornerBrackets}>
          <View style={[styles.bracket, styles.topLeft]} />
          <View style={[styles.bracket, styles.topRight]} />
          <View style={[styles.bracket, styles.bottomLeft]} />
          <View style={[styles.bracket, styles.bottomRight]} />
        </View>

        {/* Data flow lines */}
        <Animated.View
          style={[
            styles.dataFlowLine,
            {
              opacity: dataFlow.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0, 1, 0],
              }),
              transform: [
                {
                  translateX: dataFlow.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-100, 100],
                  }),
                },
              ],
            },
          ]}
        />

        {/* Header section */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Animated.View
              style={[
                styles.iconContainer,
                {
                  shadowOpacity: headerGlow,
                },
              ]}
            >
              <Ionicons name="flash" size={20} color="#00FFFF" />
            </Animated.View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>QUICK PROTOCOL</Text>
              <View style={styles.titleUnderline} />
            </View>
            <Animated.View
              style={[
                styles.statusIndicator,
                {
                  opacity: scanPulse,
                },
              ]}
            />
          </View>
          <View style={styles.headerLine} />
        </View>

        {/* Exercise list */}
        <View style={styles.listContainer}>
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>SEQUÊNCIA DE EXECUÇÃO</Text>
          </View>
          
          {exercises.slice(0, 3).map((exercise, idx) => (
            <Animated.View
              key={idx}
              style={[
                styles.listItem,
                {
                  opacity: exerciseHighlight.interpolate({
                    inputRange: [0, 0.3, 0.7, 1],
                    outputRange: [0.7, idx === 0 ? 1 : 0.7, idx === 1 ? 1 : 0.7, idx === 2 ? 1 : 0.7],
                  }),
                },
              ]}
            >
              <View style={styles.exerciseNumber}>
                <Text style={styles.exerciseNumberText}>{String(idx + 1).padStart(2, '0')}</Text>
              </View>
              <View style={styles.exerciseContent}>
                <Text style={styles.exerciseText} numberOfLines={2} ellipsizeMode="tail">
                  {exercise.toUpperCase()}
                </Text>
                <View style={styles.exerciseLine} />
              </View>
              <View style={styles.exerciseStatus}>
                <View style={[styles.statusDot, { backgroundColor: '#00FF00' }]} />
              </View>
            </Animated.View>
          ))}
        </View>

        {/* Action button */}
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={1}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={onStartQuickWorkout}
          >
            <View style={styles.buttonGlow} />
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>EXECUTAR AGORA</Text>
              <View style={styles.buttonIndicator}>
                <Ionicons name="play" size={14} color="#0A0A0A" />
              </View>
            </View>
            <View style={styles.buttonBorder} />
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#0A0A0A',
    borderWidth: 1,
    borderColor: '#00FFFF',
    borderRadius: 0,
    padding: 20,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#00FFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  backgroundGlow: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    backgroundColor: '#00FFFF',
    borderRadius: 2,
    zIndex: -1,
  },
  cornerBrackets: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  bracket: {
    position: 'absolute',
    width: 15,
    height: 15,
    borderColor: '#FF0080',
    borderWidth: 2,
  },
  topLeft: {
    top: -1,
    left: -1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: -1,
    right: -1,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: -1,
    left: -1,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: -1,
    right: -1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  dataFlowLine: {
    position: 'absolute',
    top: '30%',
    left: 0,
    width: 50,
    height: 1,
    backgroundColor: '#FF0080',
    shadowColor: '#FF0080',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  header: {
    marginBottom: 24,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderColor: '#00FFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    shadowColor: '#00FFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Orbitron-Bold',
    letterSpacing: 2,
    textShadowColor: '#00FFFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  titleUnderline: {
    width: 40,
    height: 1,
    backgroundColor: '#00FFFF',
    marginTop: 4,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    backgroundColor: '#00FF00',
    borderRadius: 4,
    shadowColor: '#00FF00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  headerLine: {
    height: 1,
    backgroundColor: '#333',
    marginTop: 8,
  },
  listContainer: {
    marginBottom: 24,
  },
  listHeader: {
    marginBottom: 16,
  },
  listTitle: {
    fontSize: 10,
    color: '#888',
    fontFamily: 'Orbitron-Regular',
    letterSpacing: 1,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
  },
  exerciseNumber: {
    width: 30,
    height: 20,
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#00FFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  exerciseNumberText: {
    color: '#00FFFF',
    fontSize: 10,
    fontFamily: 'Orbitron-Bold',
    letterSpacing: 1,
  },
  exerciseContent: {
    flex: 1,
  },
  exerciseText: {
    color: '#CCCCCC',
    fontSize: 12,
    fontFamily: 'Orbitron-Regular',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  exerciseLine: {
    height: 1,
    backgroundColor: '#333',
    width: '80%',
  },
  exerciseStatus: {
    marginLeft: 12,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    shadowColor: '#00FF00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  button: {
    backgroundColor: '#0A0A0A',
    borderWidth: 2,
    borderColor: '#00FFFF',
    borderRadius: 0,
    paddingVertical: 14,
    paddingHorizontal: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  buttonGlow: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    backgroundColor: '#00FFFF',
    opacity: 0.1,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#00FFFF',
    fontSize: 12,
    fontFamily: 'Orbitron-Bold',
    letterSpacing: 2,
    marginRight: 8,
    textShadowColor: '#00FFFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3,
  },
  buttonIndicator: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#00FFFF',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00FFFF',
  },
  buttonBorder: {
    position: 'absolute',
    top: -1,
    left: -1,
    right: -1,
    bottom: -1,
    borderWidth: 1,
    borderColor: '#00FFFF',
    opacity: 0.5,
  },
});

export default QuickWorkoutCard;