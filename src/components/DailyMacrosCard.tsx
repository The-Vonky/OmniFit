import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Platform,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface MacroData {
  current: number;
  goal: number;
}

interface DailyMacrosCardProps {
  calories: MacroData;
  protein: MacroData;
  carbs: MacroData;
  fat: MacroData;
}

const { width: screenWidth } = Dimensions.get('window');

const DailyMacrosCard: React.FC<DailyMacrosCardProps> = ({
  calories,
  protein,
  carbs,
  fat,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const glowPulse = useRef(new Animated.Value(0)).current;
  const scanLineAnim = useRef(new Animated.Value(-100)).current;
  const borderGlow = useRef(new Animated.Value(0)).current;
  const hologramFlicker = useRef(new Animated.Value(1)).current;
  const dataStreamAnim = useRef(new Animated.Value(0)).current;

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
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Pulso do glow principal
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowPulse, {
          toValue: 1,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(glowPulse, {
          toValue: 0,
          duration: 2500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Scan line que atravessa o card
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnim, {
          toValue: screenWidth,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.delay(2000),
        Animated.timing(scanLineAnim, {
          toValue: -100,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Glow da borda
    Animated.loop(
      Animated.sequence([
        Animated.timing(borderGlow, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(borderGlow, {
          toValue: 0.3,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Efeito de hologram flicker
    Animated.loop(
      Animated.sequence([
        Animated.timing(hologramFlicker, {
          toValue: 0.95,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(hologramFlicker, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.delay(Math.random() * 5000 + 2000),
      ])
    ).start();

    // Data stream animation
    Animated.loop(
      Animated.timing(dataStreamAnim, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const getPercentage = (current: number, goal: number) => {
    if (goal === 0) return 0;
    return Math.min((current / goal) * 100, 100);
  };

  const renderMacro = (
    label: string,
    data: MacroData,
    icon: string,
    unit: string = 'g',
    highlight?: boolean
  ) => {
    const percentage = getPercentage(data.current, data.goal);
    const progressAnim = useRef(new Animated.Value(0)).current;
    const glowAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.timing(progressAnim, {
        toValue: percentage,
        duration: 1500,
        useNativeDriver: false,
      }).start();

      // Glow animation for progress bar
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 0.3,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, [percentage]);

    return (
      <View style={styles.macroContainer}>
        <View style={styles.macroHeader}>
          <View style={styles.macroLabel}>
            <View style={styles.iconContainer}>
              <Ionicons 
                name={icon} 
                size={14} 
                color={highlight ? "#00FFFF" : "#FF0080"} 
                style={styles.macroIcon}
              />
              <View style={styles.iconGlow} />
            </View>
            <Text style={[styles.macroTitle, highlight && styles.highlightTitle]}>
              {label.toUpperCase()}
            </Text>
          </View>
          <View style={styles.macroValueContainer}>
            <Text style={[styles.macroValue, highlight && styles.highlightValue]}>
              {data.current}{unit}
            </Text>
            <Text style={styles.macroGoal}>
              / {data.goal}{unit}
            </Text>
          </View>
        </View>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBarBackground}>
            <Animated.View
              style={[
                styles.progressBarFill,
                highlight && styles.highlightProgress,
                {
                  width: progressAnim.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%'],
                  }),
                  opacity: glowAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1],
                  }),
                },
              ]}
            />
            <Animated.View
              style={[
                styles.progressGlow,
                highlight && styles.highlightProgressGlow,
                {
                  width: progressAnim.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%'],
                  }),
                  opacity: glowAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.2, 0.6],
                  }),
                },
              ]}
            />
          </View>
          <Text style={[styles.percentageText, highlight && styles.highlightPercentage]}>
            {percentage.toFixed(0)}%
          </Text>
        </View>
      </View>
    );
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
        {/* Glow effect background */}
        <Animated.View
          style={[
            styles.glowBackground,
            {
              opacity: glowPulse.interpolate({
                inputRange: [0, 1],
                outputRange: [0.1, 0.3],
              }),
            },
          ]}
        />

        {/* Border glow */}
        <Animated.View
          style={[
            styles.borderGlow,
            {
              opacity: borderGlow,
            },
          ]}
        />

        {/* Corner accents */}
        <View style={styles.cornerAccents}>
          <View style={[styles.cornerAccent, styles.topLeft]} />
          <View style={[styles.cornerAccent, styles.topRight]} />
          <View style={[styles.cornerAccent, styles.bottomLeft]} />
          <View style={[styles.cornerAccent, styles.bottomRight]} />
        </View>

        {/* Scan line */}
        <Animated.View
          style={[
            styles.scanLine,
            {
              transform: [{ translateX: scanLineAnim }],
            },
          ]}
        />

        {/* Data stream lines */}
        <View style={styles.dataStreamContainer}>
          <Animated.View
            style={[
              styles.dataStream,
              {
                opacity: dataStreamAnim.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0, 1, 0],
                }),
                transform: [
                  {
                    translateX: dataStreamAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-200, 200],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.statusContainer}>
            <View style={styles.statusIndicator} />
            <Text style={styles.statusText}>NUTRIÇÃO DIÁRIA</Text>
            <View style={styles.statusLine} />
          </View>
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>MACROS DO DIA</Text>
          <View style={styles.titleUnderline} />
        </View>

        {/* Macros */}
        <View style={styles.macrosContainer}>
          {renderMacro('Calorias', calories, 'flame', ' kcal', true)}
          {renderMacro('Proteínas', protein, 'fitness', 'g')}
          {renderMacro('Carboidratos', carbs, 'leaf', 'g')}
          {renderMacro('Gorduras', fat, 'water', 'g')}
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  card: {
    backgroundColor: '#0A0A0A',
    borderRadius: 2,
    padding: 24,
    borderWidth: 1,
    borderColor: '#00FFFF',
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#00FFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 15,
  },
  glowBackground: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    backgroundColor: '#00FFFF',
    borderRadius: 4,
    zIndex: -1,
  },
  borderGlow: {
    position: 'absolute',
    top: -1,
    left: -1,
    right: -1,
    bottom: -1,
    borderWidth: 1,
    borderColor: '#00FFFF',
    borderRadius: 3,
    shadowColor: '#00FFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  cornerAccents: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  cornerAccent: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: '#FF0080',
  },
  topLeft: {
    top: -1,
    left: -1,
    borderTopWidth: 2,
    borderLeftWidth: 2,
  },
  topRight: {
    top: -1,
    right: -1,
    borderTopWidth: 2,
    borderRightWidth: 2,
  },
  bottomLeft: {
    bottom: -1,
    left: -1,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
  },
  bottomRight: {
    bottom: -1,
    right: -1,
    borderBottomWidth: 2,
    borderRightWidth: 2,
  },
  scanLine: {
    position: 'absolute',
    top: 0,
    width: 2,
    height: '100%',
    backgroundColor: '#00FFFF',
    opacity: 0.8,
    shadowColor: '#00FFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  dataStreamContainer: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 1,
  },
  dataStream: {
    width: 100,
    height: 1,
    backgroundColor: '#FF0080',
    shadowColor: '#FF0080',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  header: {
    marginBottom: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    backgroundColor: '#00FF00',
    borderRadius: 4,
    marginRight: 8,
    shadowColor: '#00FF00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#00FFFF',
    letterSpacing: 2,
    fontFamily: 'Orbitron-Bold',
  },
  statusLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#00FFFF',
    marginLeft: 12,
    opacity: 0.5,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Orbitron-Bold',
    letterSpacing: 3,
    textShadowColor: '#00FFFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  titleUnderline: {
    width: 60,
    height: 2,
    backgroundColor: '#FF0080',
    marginTop: 8,
    shadowColor: '#FF0080',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  macrosContainer: {
    flex: 1,
  },
  macroContainer: {
    marginBottom: 20,
  },
  macroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  macroLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'relative',
    marginRight: 8,
  },
  macroIcon: {
    zIndex: 2,
  },
  iconGlow: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    backgroundColor: '#FF0080',
    opacity: 0.3,
    borderRadius: 10,
    zIndex: 1,
  },
  macroTitle: {
    fontSize: 13,
    color: '#888',
    fontFamily: 'Orbitron-Regular',
    letterSpacing: 1,
  },
  highlightTitle: {
    color: '#00FFFF',
    fontWeight: 'bold',
  },
  macroValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  macroValue: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Orbitron-Bold',
    letterSpacing: 1,
  },
  macroGoal: {
    fontSize: 14,
    color: '#888',
    fontFamily: 'Orbitron-Regular',
  },
  highlightValue: {
    color: '#00FFFF',
    textShadowColor: '#00FFFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarBackground: {
    flex: 1,
    height: 8,
    backgroundColor: '#1A1A1A',
    borderRadius: 0,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333',
    marginRight: 12,
    position: 'relative',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FF0080',
    borderRadius: 0,
    shadowColor: '#FF0080',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  progressGlow: {
    position: 'absolute',
    top: -1,
    height: 10,
    backgroundColor: '#FF0080',
    borderRadius: 0,
    shadowColor: '#FF0080',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  highlightProgress: {
    backgroundColor: '#00FFFF',
    shadowColor: '#00FFFF',
  },
  highlightProgressGlow: {
    backgroundColor: '#00FFFF',
    shadowColor: '#00FFFF',
  },
  percentageText: {
    fontSize: 12,
    color: '#888',
    fontFamily: 'Orbitron-Regular',
    letterSpacing: 1,
    minWidth: 35,
    textAlign: 'right',
  },
  highlightPercentage: {
    color: '#00FFFF',
    fontWeight: 'bold',
  },
});

export default DailyMacrosCard;