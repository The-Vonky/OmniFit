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
  const slideAnim = useRef(new Animated.Value(40)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const scanLineAnim = useRef(new Animated.Value(-200)).current;
  const dataStreamAnim = useRef(new Animated.Value(0)).current;
  const hologramFlicker = useRef(new Animated.Value(1)).current;
  const gridPulse = useRef(new Animated.Value(0)).current;
  const progressGlow = useRef(new Animated.Value(0)).current;
  const numberFlicker = useRef(new Animated.Value(1)).current;
  const systemPulse = useRef(new Animated.Value(0)).current;

  const adherencePercentage = monthlyGoal > 0
    ? Math.min((monthlyWorkouts / monthlyGoal) * 100, 100)
    : 0;

  const weeklyPercentage = weeklyGoal > 0
    ? Math.min((weeklyWorkouts / weeklyGoal) * 100, 100)
    : 0;

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
        tension: 70,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(progressAnim, {
        toValue: adherencePercentage,
        duration: 2000,
        useNativeDriver: false,
      }),
    ]).start();

    // Scan line
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnim, {
          toValue: SCREEN_WIDTH,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.delay(1500),
        Animated.timing(scanLineAnim, {
          toValue: -200,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Data stream
    Animated.loop(
      Animated.timing(dataStreamAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();

    // Hologram flicker
    Animated.loop(
      Animated.sequence([
        Animated.timing(hologramFlicker, {
          toValue: 0.98,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.timing(hologramFlicker, {
          toValue: 1,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.delay(Math.random() * 6000 + 4000),
      ])
    ).start();

    // Grid pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(gridPulse, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(gridPulse, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Progress glow
    Animated.loop(
      Animated.sequence([
        Animated.timing(progressGlow, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(progressGlow, {
          toValue: 0.3,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Number flicker
    Animated.loop(
      Animated.sequence([
        Animated.timing(numberFlicker, {
          toValue: 0.9,
          duration: 80,
          useNativeDriver: true,
        }),
        Animated.timing(numberFlicker, {
          toValue: 1,
          duration: 80,
          useNativeDriver: true,
        }),
        Animated.delay(Math.random() * 3000 + 2000),
      ])
    ).start();

    // System pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(systemPulse, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(systemPulse, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [adherencePercentage]);

  const animatedWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

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
        {/* Background grid */}
        <Animated.View
          style={[
            styles.backgroundGrid,
            {
              opacity: gridPulse.interpolate({
                inputRange: [0, 1],
                outputRange: [0.02, 0.08],
              }),
            },
          ]}
        />

        {/* Scan line */}
        <Animated.View
          style={[
            styles.scanLine,
            {
              transform: [{ translateX: scanLineAnim }],
            },
          ]}
        />

        {/* Data streams */}
        <View style={styles.dataStreams}>
          <Animated.View
            style={[
              styles.dataStream,
              {
                opacity: dataStreamAnim.interpolate({
                  inputRange: [0, 0.3, 0.7, 1],
                  outputRange: [0, 1, 1, 0],
                }),
                transform: [
                  {
                    translateX: dataStreamAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-100, 150],
                    }),
                  },
                ],
              },
            ]}
          />
          <Animated.View
            style={[
              styles.dataStream,
              styles.dataStream2,
              {
                opacity: dataStreamAnim.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0, 1, 0],
                }),
                transform: [
                  {
                    translateX: dataStreamAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [150, -100],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>

        {/* Corner terminals */}
        <View style={styles.cornerTerminals}>
          <View style={[styles.terminal, styles.topLeft]} />
          <View style={[styles.terminal, styles.topRight]} />
          <View style={[styles.terminal, styles.bottomLeft]} />
          <View style={[styles.terminal, styles.bottomRight]} />
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Animated.View
            style={[
              styles.systemIndicator,
              {
                opacity: systemPulse,
              },
            ]}
          />
          <Text style={styles.title}>ANÁLISE DE DESEMPENHO</Text>
          <View style={styles.headerLine} />
        </View>

        {/* Status indicators */}
        <View style={styles.statusBar}>
          <View style={styles.statusItem}>
            <View style={[styles.statusDot, { backgroundColor: '#00FF00' }]} />
            <Text style={styles.statusText}>SISTEMA ONLINE</Text>
          </View>
          <View style={styles.statusItem}>
            <View style={[styles.statusDot, { backgroundColor: '#00FFFF' }]} />
            <Text style={styles.statusText}>DADOS SINCRONIZADOS</Text>
          </View>
        </View>

        {/* Data rows */}
        <View style={styles.dataSection}>
          <View style={styles.dataRow}>
            <Text style={styles.label}>PROTOCOLOS SEMANAIS</Text>
            <View style={styles.dataValue}>
              <Animated.Text
                style={[
                  styles.highlight,
                  {
                    opacity: numberFlicker,
                  },
                ]}
              >
                {String(weeklyWorkouts).padStart(2, '0')}
              </Animated.Text>
              <Text style={styles.separator}>/</Text>
              <Text style={styles.value}>{String(weeklyGoal).padStart(2, '0')}</Text>
            </View>
          </View>

          <View style={styles.progressContainer}>
            <Text style={styles.progressLabel}>STATUS SEMANAL</Text>
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarBackground}>
                <Animated.View
                  style={[
                    styles.progressBarFill,
                    {
                      width: `${weeklyPercentage}%`,
                      shadowOpacity: progressGlow,
                    },
                  ]}
                />
              </View>
              <Text style={styles.progressText}>{Math.round(weeklyPercentage)}%</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.dataRow}>
            <Text style={styles.label}>PROTOCOLOS MENSAIS</Text>
            <View style={styles.dataValue}>
              <Animated.Text
                style={[
                  styles.highlight,
                  {
                    opacity: numberFlicker,
                  },
                ]}
              >
                {String(monthlyWorkouts).padStart(2, '0')}
              </Animated.Text>
              <Text style={styles.separator}>/</Text>
              <Text style={styles.value}>{String(monthlyGoal).padStart(2, '0')}</Text>
            </View>
          </View>

          <View style={styles.progressContainer}>
            <Text style={styles.progressLabel}>ADERÊNCIA TOTAL</Text>
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarBackground}>
                <Animated.View
                  style={[
                    styles.progressBarFill,
                    {
                      width: animatedWidth,
                      shadowOpacity: progressGlow,
                    },
                  ]}
                />
              </View>
              <Animated.Text
                style={[
                  styles.progressText,
                  {
                    opacity: numberFlicker,
                  },
                ]}
              >
                {Math.round(adherencePercentage)}%
              </Animated.Text>
            </View>
          </View>
        </View>

        {/* Bottom status */}
        <View style={styles.bottomStatus}>
          <View style={styles.statusLine} />
          <Text style={styles.systemStatus}>
            SISTEMA: OPERACIONAL | ÚLTIMA ATUALIZAÇÃO: {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 14,
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
    shadowRadius: 15,
    elevation: 10,
  },
  backgroundGrid: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#00FFFF',
    zIndex: -1,
  },
  scanLine: {
    position: 'absolute',
    top: 0,
    width: 2,
    height: '100%',
    backgroundColor: '#00FFFF',
    opacity: 0.6,
    shadowColor: '#00FFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  dataStreams: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  dataStream: {
    position: 'absolute',
    top: '25%',
    width: 60,
    height: 1,
    backgroundColor: '#FF0080',
    shadowColor: '#FF0080',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  dataStream2: {
    top: '75%',
    backgroundColor: '#00FF00',
    shadowColor: '#00FF00',
  },
  cornerTerminals: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  terminal: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderWidth: 2,
    borderColor: '#FF0080',
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  systemIndicator: {
    width: 8,
    height: 8,
    backgroundColor: '#00FF00',
    borderRadius: 4,
    marginRight: 12,
    shadowColor: '#00FF00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Orbitron-Bold',
    letterSpacing: 2,
    flex: 1,
    textShadowColor: '#00FFFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  headerLine: {
    width: 30,
    height: 1,
    backgroundColor: '#00FFFF',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginRight: 6,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  statusText: {
    fontSize: 8,
    color: '#888',
    fontFamily: 'Orbitron-Regular',
    letterSpacing: 1,
  },
  dataSection: {
    marginBottom: 20,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 10,
    color: '#AAAAAA',
    fontFamily: 'Orbitron-Regular',
    letterSpacing: 1,
  },
  dataValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  highlight: {
    color: '#00FFFF',
    fontSize: 16,
    fontFamily: 'Orbitron-Bold',
    letterSpacing: 1,
    textShadowColor: '#00FFFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3,
  },
  separator: {
    color: '#666',
    fontSize: 14,
    fontFamily: 'Orbitron-Regular',
    marginHorizontal: 8,
  },
  value: {
    fontSize: 14,
    color: '#CCCCCC',
    fontFamily: 'Orbitron-Regular',
    letterSpacing: 1,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressLabel: {
    fontSize: 8,
    color: '#888',
    fontFamily: 'Orbitron-Regular',
    letterSpacing: 1,
    marginBottom: 8,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#1F1F1F',
    borderWidth: 1,
    borderColor: '#333',
    flex: 1,
    marginRight: 12,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 8,
    backgroundColor: '#00FFFF',
    shadowColor: '#00FFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
  },
  progressText: {
    fontSize: 12,
    color: '#00FFFF',
    fontFamily: 'Orbitron-Bold',
    letterSpacing: 1,
    minWidth: 40,
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 16,
  },
  bottomStatus: {
    marginTop: 16,
  },
  statusLine: {
    height: 1,
    backgroundColor: '#333',
    marginBottom: 8,
  },
  systemStatus: {
    fontSize: 7,
    color: '#666',
    fontFamily: 'Orbitron-Regular',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
});

export default ProgressOverviewCard;