import React from 'react';
import { View, Text } from 'react-native';
import { GlowingCard } from './GlowingCard';
import { styles } from './Styles';
import { ProgressStat } from './Types';

interface ProgressCardProps {
  stats: ProgressStat[];
  percentage: string;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({ stats, percentage }) => {
  return (
    <GlowingCard delay={600} glowColor="#00FFF7">
      <View style={styles.progressCard}>
        <View style={styles.progressInfo}>
          <Text style={styles.progressTitle}>Progresso Semanal</Text>
          <View style={styles.progressStats}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.progressStat}>
                <Text style={styles.progressValue}>{stat.value}</Text>
                <Text style={styles.progressLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.progressRing}>
          <Text style={styles.progressPercentage}>{percentage}</Text>
        </View>
      </View>
    </GlowingCard>
  );
};

export default ProgressCard;