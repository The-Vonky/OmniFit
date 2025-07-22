import React from 'react';
import { View, Text } from 'react-native';
import { GlowingCard } from './GlowingCard';
import { styles } from './Styles';
import { MacroItem } from './Types';

interface DietCardProps {
  calories: string;
  macros: MacroItem[];
}

export const DietCard: React.FC<DietCardProps> = ({ calories, macros }) => {
  return (
    <GlowingCard delay={500} glowColor="#7C3AED">
      <View style={styles.dietCard}>
        <View style={styles.dietHeader}>
          <Text style={styles.dietTitle}>Resumo Nutricional</Text>
          <Text style={styles.caloriesMain}>{calories}</Text>
        </View>

        <View style={styles.macroGrid}>
          {macros.map((macro, index) => (
            <View key={index} style={styles.macroItem}>
              <Text style={styles.macroValue}>{macro.value}</Text>
              <Text style={styles.macroLabel}>{macro.label}</Text>
            </View>
          ))}
        </View>
      </View>
    </GlowingCard>
  );
};