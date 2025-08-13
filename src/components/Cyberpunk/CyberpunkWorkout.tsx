import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface CyberpunkWorkoutProps {}

const CyberpunkWorkout: React.FC<CyberpunkWorkoutProps> = () => {
  const [currentSet, setCurrentSet] = useState<number>(1);
  const [reps, setReps] = useState<number>(12);
  const [weight, setWeight] = useState<number>(80);
  const [restTimer, setRestTimer] = useState<number>(0);
  const [isResting, setIsResting] = useState<boolean>(false);
  const [completedSets, setCompletedSets] = useState<number[]>([]);
  const [pulseActive, setPulseActive] = useState<boolean>(false);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isResting && restTimer > 0) {
      interval = setInterval(() => {
        setRestTimer(prev => prev - 1);
      }, 1000);
    } else if (restTimer === 0 && isResting) {
      setIsResting(false);
      setPulseActive(true);
      setTimeout(() => setPulseActive(false), 2000);
    }
    return () => clearInterval(interval);
  }, [isResting, restTimer]);

  const completeSet = (): void => {
    if (!completedSets.includes(currentSet)) {
      setCompletedSets([...completedSets, currentSet]);
      if (currentSet < 4) {
        setIsResting(true);
        setRestTimer(90);
        setCurrentSet(currentSet + 1);
      }
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const adjustWeight = (increment: boolean): void => {
    if (increment) {
      setWeight(weight + 2.5);
    } else {
      setWeight(Math.max(5, weight - 2.5));
    }
  };

  const adjustReps = (increment: boolean): void => {
    if (increment) {
      setReps(reps + 1);
    } else {
      setReps(Math.max(1, reps - 1));
    }
  };

  const getSetBoxStyle = (set: number) => {
    if (completedSets.includes(set)) {
      return [styles.setBox, styles.setBoxCompleted];
    } else if (currentSet === set) {
      return [styles.setBox, styles.setBoxActive];
    } else {
      return [styles.setBox, styles.setBoxInactive];
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#111827" />
      
      {/* Background Gradient */}
      <LinearGradient
        colors={['#111827', '#1f2937', '#111827']}
        style={styles.backgroundGradient}
      />

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.headerTop}>
              <Text style={styles.headerTitle}>PROTOCOLO ATIVO</Text>
              <View style={styles.onlineStatus}>
                <View style={styles.onlineDot} />
                <Text style={styles.onlineText}>ONLINE</Text>
              </View>
            </View>
            <Text style={styles.moduleText}>MÓDULO: PEITORAL_SUPERIOR.exe</Text>
          </View>
        </View>

        {/* Exercise Info */}
        <View style={styles.exerciseInfo}>
          <Text style={styles.exerciseTitle}>&gt; SUPINO INCLINADO HALTERES</Text>
          <View style={styles.exerciseStats}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>TARGET:</Text>
              <Text style={styles.statValue}>PEITORAL SUP</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>DIFICULDADE:</Text>
              <Text style={styles.statValueYellow}>████▒▒ 67%</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>EXP GANHO:</Text>
              <Text style={styles.statValueGreen}>+125 XP</Text>
            </View>
          </View>
        </View>

        {/* Current Set Display */}
        <View style={styles.currentSetContainer}>
          <View style={styles.currentSetHeader}>
            <Text style={styles.currentSetLabel}>SEQUÊNCIA ATUAL</Text>
            <View style={styles.setNumberContainer}>
              <Text style={styles.setNumber}>{currentSet}</Text>
              <Text style={styles.setTotal}>/4</Text>
            </View>
          </View>

          {/* Sets Progress */}
          <View style={styles.setsProgress}>
            {[1, 2, 3, 4].map((set) => (
              <View key={set} style={getSetBoxStyle(set)}>
                <Text style={styles.setBoxText}>
                  {completedSets.includes(set) ? '✓' : set}
                </Text>
              </View>
            ))}
          </View>

          {/* Weight and Reps */}
          <View style={styles.weightRepsContainer}>
            <View style={styles.weightContainer}>
              <Text style={styles.controlLabel}>CARGA (KG)</Text>
              <View style={styles.controlRow}>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={() => adjustWeight(false)}
                >
                  <Text style={styles.controlButtonTextOrange}>-</Text>
                </TouchableOpacity>
                <Text style={styles.weightValue}>{weight}</Text>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={() => adjustWeight(true)}
                >
                  <Text style={styles.controlButtonTextOrange}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.repsContainer}>
              <Text style={styles.controlLabel}>REPETIÇÕES</Text>
              <View style={styles.controlRow}>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={() => adjustReps(false)}
                >
                  <Text style={styles.controlButtonTextBlue}>-</Text>
                </TouchableOpacity>
                <Text style={styles.repsValue}>{reps}</Text>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={() => adjustReps(true)}
                >
                  <Text style={styles.controlButtonTextBlue}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Rest Timer */}
        {isResting && (
          <View style={styles.restTimerContainer}>
            <Text style={styles.restTimerLabel}>COOLDOWN DO SISTEMA</Text>
            <Text style={styles.restTimerValue}>{formatTime(restTimer)}</Text>
            <Text style={styles.restTimerSubtext}>
              Aguardando recuperação muscular...
            </Text>
          </View>
        )}

        {/* Action Button */}
        <TouchableOpacity
          onPress={completeSet}
          disabled={completedSets.includes(currentSet) || isResting}
          style={[
            styles.actionButton,
            (completedSets.includes(currentSet) || isResting)
              ? styles.actionButtonDisabled
              : pulseActive
              ? styles.actionButtonActive
              : styles.actionButtonEnabled
          ]}
        >
          <Text style={[
            styles.actionButtonText,
            (completedSets.includes(currentSet) || isResting)
              ? styles.actionButtonTextDisabled
              : styles.actionButtonTextEnabled
          ]}>
            {completedSets.includes(currentSet)
              ? '✓ SEQUÊNCIA EXECUTADA'
              : isResting
              ? 'SISTEMA EM COOLDOWN...'
              : 'EXECUTAR SEQUÊNCIA'}
          </Text>
        </TouchableOpacity>

        {/* Stats Footer */}
        <View style={styles.statsFooter}>
          <View style={styles.statFooterItem}>
            <Text style={styles.statFooterLabel}>VOLUME TOTAL</Text>
            <Text style={styles.statFooterValueGreen}>
              {(completedSets.length * reps * weight).toLocaleString()} KG
            </Text>
          </View>
          <View style={styles.statFooterItem}>
            <Text style={styles.statFooterLabel}>SETS COMPLETOS</Text>
            <Text style={styles.statFooterValueCyan}>
              {completedSets.length}/4
            </Text>
          </View>
          <View style={styles.statFooterItem}>
            <Text style={styles.statFooterLabel}>PRÓXIMO PR</Text>
            <Text style={styles.statFooterValuePurple}>85.0 KG</Text>
          </View>
        </View>

        {/* Terminal Log */}
        <View style={styles.terminalLog}>
          <Text style={styles.terminalLogHeader}>&gt; SISTEMA_LOG:</Text>
          {completedSets.map((set, index) => (
            <Text key={index} style={styles.terminalLogEntry}>
              [{new Date().toLocaleTimeString()}] SET_{set} EXECUTADO: {reps}x{weight}kg ✓
            </Text>
          ))}
          {isResting && (
            <Text style={styles.terminalLogEntryYellow}>
              [{new Date().toLocaleTimeString()}] INICIANDO_COOLDOWN: {restTimer}s restantes...
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollContainer: {
    flex: 1,
    padding: 20,
  },
  
  // Header Styles
  header: {
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.3)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
    marginBottom: 24,
  },
  headerContent: {
    // Style for header content
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    color: '#22c55e',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  onlineStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineDot: {
    width: 8,
    height: 8,
    backgroundColor: '#22c55e',
    borderRadius: 4,
    marginRight: 8,
  },
  onlineText: {
    color: '#86efac',
    fontSize: 14,
    fontFamily: 'monospace',
  },
  moduleText: {
    color: '#9ca3af',
    fontSize: 14,
    fontFamily: 'monospace',
  },

  // Exercise Info Styles
  exerciseInfo: {
    borderWidth: 1,
    borderColor: 'rgba(34, 211, 238, 0.3)',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 16,
    marginBottom: 24,
  },
  exerciseTitle: {
    color: '#22d3ee',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    fontFamily: 'monospace',
  },
  exerciseStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    color: '#6b7280',
    fontSize: 12,
    fontFamily: 'monospace',
  },
  statValue: {
    color: '#67e8f9',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  statValueYellow: {
    color: '#fbbf24',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  statValueGreen: {
    color: '#22c55e',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },

  // Current Set Styles
  currentSetContainer: {
    borderWidth: 1,
    borderColor: 'rgba(168, 85, 247, 0.3)',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 24,
    marginBottom: 24,
  },
  currentSetHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  currentSetLabel: {
    color: '#a855f7',
    fontSize: 14,
    marginBottom: 8,
    fontFamily: 'monospace',
  },
  setNumberContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  setNumber: {
    color: '#ffffff',
    fontSize: 64,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  setTotal: {
    color: '#6b7280',
    fontSize: 24,
    fontFamily: 'monospace',
  },

  // Sets Progress
  setsProgress: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 24,
  },
  setBox: {
    width: 48,
    height: 48,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  setBoxCompleted: {
    borderColor: '#22c55e',
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
  },
  setBoxActive: {
    borderColor: '#a855f7',
    backgroundColor: 'rgba(168, 85, 247, 0.2)',
  },
  setBoxInactive: {
    borderColor: '#4b5563',
    backgroundColor: 'transparent',
  },
  setBoxText: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },

  // Weight and Reps Controls
  weightRepsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  weightContainer: {
    flex: 1,
    alignItems: 'center',
  },
  repsContainer: {
    flex: 1,
    alignItems: 'center',
  },
  controlLabel: {
    color: '#6b7280',
    fontSize: 12,
    marginBottom: 8,
    fontFamily: 'monospace',
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  controlButton: {
    width: 32,
    height: 32,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButtonTextOrange: {
    color: '#fb923c',
    fontSize: 18,
    fontWeight: 'bold',
  },
  controlButtonTextBlue: {
    color: '#60a5fa',
    fontSize: 18,
    fontWeight: 'bold',
  },
  weightValue: {
    color: '#fb923c',
    fontSize: 24,
    fontWeight: 'bold',
    width: 64,
    textAlign: 'center',
    fontFamily: 'monospace',
  },
  repsValue: {
    color: '#60a5fa',
    fontSize: 24,
    fontWeight: 'bold',
    width: 64,
    textAlign: 'center',
    fontFamily: 'monospace',
  },

  // Rest Timer
  restTimerContainer: {
    borderWidth: 1,
    borderColor: 'rgba(248, 113, 113, 0.5)',
    backgroundColor: 'rgba(127, 29, 29, 0.2)',
    padding: 16,
    marginBottom: 24,
    alignItems: 'center',
  },
  restTimerLabel: {
    color: '#f87171',
    fontSize: 14,
    marginBottom: 8,
    fontFamily: 'monospace',
  },
  restTimerValue: {
    color: '#f87171',
    fontSize: 48,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  restTimerSubtext: {
    color: '#fca5a5',
    fontSize: 12,
    marginTop: 8,
    fontFamily: 'monospace',
  },

  // Action Button
  actionButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 2,
    marginBottom: 24,
    alignItems: 'center',
  },
  actionButtonEnabled: {
    borderColor: '#22c55e',
    backgroundColor: 'transparent',
  },
  actionButtonActive: {
    borderColor: '#22c55e',
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
  },
  actionButtonDisabled: {
    borderColor: '#4b5563',
    backgroundColor: 'rgba(17, 24, 39, 0.5)',
  },
  actionButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  actionButtonTextEnabled: {
    color: '#22c55e',
  },
  actionButtonTextDisabled: {
    color: '#4b5563',
  },

  // Stats Footer
  statsFooter: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 16,
  },
  statFooterItem: {
    flex: 1,
    alignItems: 'center',
  },
  statFooterLabel: {
    color: '#6b7280',
    fontSize: 12,
    marginBottom: 4,
    fontFamily: 'monospace',
  },
  statFooterValueGreen: {
    color: '#22c55e',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  statFooterValueCyan: {
    color: '#22d3ee',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  statFooterValuePurple: {
    color: '#a855f7',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },

  // Terminal Log
  terminalLog: {
    borderWidth: 1,
    borderColor: '#374151',
    backgroundColor: '#000000',
    padding: 12,
    marginBottom: 20,
  },
  terminalLogHeader: {
    color: '#6b7280',
    fontSize: 12,
    marginBottom: 4,
    fontFamily: 'monospace',
  },
  terminalLogEntry: {
    color: '#22c55e',
    fontSize: 12,
    fontFamily: 'monospace',
    marginVertical: 1,
  },
  terminalLogEntryYellow: {
    color: '#fbbf24',
    fontSize: 12,
    fontFamily: 'monospace',
    marginVertical: 1,
  },
});

export default CyberpunkWorkout;