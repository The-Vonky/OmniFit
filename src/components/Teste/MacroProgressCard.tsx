import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MacroItem {
  name: string;
  current: number;
  target: number;
  unit: string;
  color: string;
  percentage: number;
}

interface MacroProgressCardProps {
  macros: MacroItem[];
}

const MacroProgressCard: React.FC<MacroProgressCardProps> = ({ macros }) => {
  return (
    <View style={[styles.card, styles.glowPurple]}>
      <View style={styles.topBorder} />
      <Text style={styles.title}>📊 Progresso dos Macros</Text>
      {macros.map((macro, index) => (
        <View key={index} style={styles.macroItem}>
          <View style={styles.macroHeader}>
            <Text style={styles.macroName}>{macro.name}</Text>
            <Text style={styles.macroStats}>
              {macro.current}{macro.unit} / {macro.target}{macro.unit}
            </Text>
          </View>
          <View style={styles.progressBarBackground}>
            <View
              style={[
                styles.progressBarFill,
                {
                  width: `${Math.min((macro.current / macro.target) * 100, 100)}%`,
                  backgroundColor: macro.color,
                },
              ]}
            />
          </View>
          <Text style={[styles.percentage, { color: macro.color }]}>
            {macro.percentage}%
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#18181B',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#7C3AED30',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  glowPurple: {
    borderColor: '#7C3AED',
  },
  topBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#7C3AED',
    opacity: 0.6,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  title: {
    color: '#C084FC',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  macroItem: {
    marginBottom: 12,
  },
  macroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  macroName: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  macroStats: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  progressBarBackground: {
    backgroundColor: '#27272A',
    height: 6,
    borderRadius: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 8,
  },
  percentage: {
    fontSize: 11,
    textAlign: 'right',
    marginTop: 2,
  },
});

export default MacroProgressCard;