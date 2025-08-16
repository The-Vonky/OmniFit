import React from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface CyberProgressProps {
  completedExercises: number;
  exerciseCount: number;
  glowAnim: Animated.Value;
}

const CyberProgress: React.FC<CyberProgressProps> = ({
  completedExercises,
  exerciseCount,
  glowAnim,
}) => {
  const progressPercentage = (completedExercises / exerciseCount) * 100;

  return (
    <View style={styles.progressContainer}>
      <LinearGradient
        colors={['rgba(0,255,247,0.05)', 'rgba(139,92,246,0.05)']}
        style={styles.progressCard}
      >
        <View style={styles.progressHeader}>
          <View>
            <Text style={styles.progressTitle}>STATUS DO SISTEMA</Text>
            <Text style={styles.progressSubtitle}>Análise de Padrão Neural</Text>
          </View>
          <View style={styles.progressPercentageContainer}>
            <Text style={styles.progressPercentage}>{Math.round(progressPercentage)}</Text>
            <Text style={styles.progressUnit}>%</Text>
          </View>
        </View>
        
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBg}>
            <Animated.View style={[
              styles.progressBarFill, 
              { 
                width: `${progressPercentage}%`,
                opacity: glowAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1]
                })
              }
            ]}>
              <LinearGradient
                colors={['#00FFF7', '#8B5CF6', '#EC4899']}
                style={styles.progressGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              />
            </Animated.View>
          </View>
          <View style={styles.progressGrid}>
            {[...Array(10)].map((_, i) => (
              <View key={i} style={styles.progressGridLine} />
            ))}
          </View>
        </View>
        
        <Text style={styles.progressDetails}>
          {completedExercises} / {exerciseCount} MÓDULOS EXECUTADOS
        </Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    marginHorizontal: 20,
    marginVertical: 16,
  },
  progressCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 247, 0.2)',
    backgroundColor: 'rgba(13, 13, 13, 0.8)',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  progressTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1,
  },
  progressSubtitle: {
    color: '#8B5CF6',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginTop: 2,
  },
  progressPercentageContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  progressPercentage: {
    color: '#00FFF7',
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -1,
  },
  progressUnit: {
    color: '#00FFF7',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 2,
  },
  progressBarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressGradient: {
    flex: 1,
  },
  progressGrid: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressGridLine: {
    width: 1,
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  progressDetails: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
  },
});

export default CyberProgress;