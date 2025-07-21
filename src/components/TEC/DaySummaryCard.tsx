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
  const slideAnim = useRef(new Animated.Value(50)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
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

        {/* Header section */}
        <View style={styles.header}>
          <View style={styles.statusContainer}>
            <View style={styles.statusIndicator} />
            <Text style={styles.statusText}>{status.toUpperCase()}</Text>
            <View style={styles.statusLine} />
          </View>
        </View>

        {/* Main content */}
        <View style={styles.content}>
          <View style={styles.workoutTitleContainer}>
            <Text style={styles.workoutTitle}>{workoutType}</Text>
            <View style={styles.titleUnderline} />
          </View>

          <View style={styles.motivationalContainer}>
            <View style={styles.motivationalHeader}>
              <View style={styles.motivationalIndicator} />
              <Text style={styles.motivationalLabel}>MOTIVAÇÃO</Text>
            </View>
            <View style={styles.motivationalBox}>
              <Text style={styles.motivationalText}>
                "{motivationalPhrase}"
              </Text>
            </View>
          </View>
        </View>

        {/* Action button */}
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={onStartPress}
            style={styles.button}
            activeOpacity={1}
          >
            <View style={styles.buttonGlow} />
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>INICIAR PROTOCOLO</Text>
              <View style={styles.buttonArrow}>
                <Text style={styles.buttonArrowText}>-></Text>
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>
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
    marginBottom: 20,
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
  content: {
    marginBottom: 32,
  },
  workoutTitleContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  workoutTitle: {
    fontSize: 26,
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
  motivationalContainer: {
    marginTop: 16,
  },
  motivationalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  motivationalIndicator: {
    width: 4,
    height: 4,
    backgroundColor: '#FF0080',
    borderRadius: 2,
    marginRight: 8,
  },
  motivationalLabel: {
    fontSize: 10,
    color: '#888',
    fontFamily: 'Orbitron-Regular',
    letterSpacing: 1,
  },
  motivationalBox: {
    backgroundColor: '#111111',
    borderLeftColor: '#00FFFF',
    borderLeftWidth: 3,
    borderRadius: 0,
    padding: 16,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: '#333',
    borderRightColor: '#333',
    borderBottomColor: '#333',
  },
  motivationalText: {
    color: '#CCCCCC',
    fontSize: 14,
    fontStyle: 'italic',
    lineHeight: 20,
    textAlign: 'center',
    fontFamily: 'Orbitron-Regular',
    letterSpacing: 0.5,
  },
  button: {
    backgroundColor: '#0A0A0A',
    borderWidth: 2,
    borderColor: '#00FFFF',
    borderRadius: 0,
    paddingVertical: 16,
    paddingHorizontal: 24,
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
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Orbitron-Bold',
    letterSpacing: 2,
    textShadowColor: '#00FFFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  buttonArrow: {
    marginLeft: 12,
    borderWidth: 1,
    borderColor: '#00FFFF',
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonArrowText: {
    color: '#00FFFF',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Orbitron-Bold',
  },
});

export default DaySummaryCard;