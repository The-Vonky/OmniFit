import React from 'react';
import { View, Text } from 'react-native';
import { GlowingCard } from './GlowingCard';
import { styles } from './Styles';

interface TipCardProps {
  tip: string;
}

export const TipCard: React.FC<TipCardProps> = ({ tip }) => {
  return (
    <GlowingCard delay={700} glowColor="#F59E0B">
      <View style={styles.tipCard}>
        <Text style={styles.tipTitle}>💡 DICA DO DIA</Text>
        <Text style={styles.tipText}>{tip}</Text>
      </View>
    </GlowingCard>
  );
};