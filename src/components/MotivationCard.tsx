import React from 'react';
import { View, Text } from 'react-native';
import { GlowingCard } from './GlowingCard';
import { styles } from './Styles';

interface MotivationCardProps {
  message: string;
}

export const MotivationCard: React.FC<MotivationCardProps> = ({ message }) => {
  return (
    <GlowingCard delay={200} glowColor="#FF00D4">
      <View style={styles.motivationCard}>
        <Text style={styles.motivationTitle}>💡 MOTIVAÇÃO DO DIA</Text>
        <Text style={styles.motivationText}>{message}</Text>
      </View>
    </GlowingCard>
  );
};

export default MotivationCard;