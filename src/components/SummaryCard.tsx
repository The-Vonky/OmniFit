import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface SummaryCardProps {
  calories: number;
  mealsCompleted: number;
  mealsTotal: number;
  dailyGoalPercent: number;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  calories,
  mealsCompleted,
  mealsTotal,
  dailyGoalPercent,
}) => {
  return (
    <View style={[styles.card, styles.glowCyan]}>
      <View style={styles.topBorder} />
      <Text style={styles.title}>📈 Resumo do Dia</Text>
      <View style={styles.grid}>
        <View style={styles.gridItem}>
          <Text style={[styles.number, styles.cyan]}>{calories}</Text>
          <Text style={styles.label}>Calorias</Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={[styles.number, styles.emerald]}>
            {mealsCompleted}/{mealsTotal}
          </Text>
          <Text style={styles.label}>Refeições</Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={[styles.number, styles.orange]}>{dailyGoalPercent}%</Text>
          <Text style={styles.label}>Meta diária</Text>
        </View>
      </View>
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
    borderColor: '#06B6D4',
    shadowColor: '#06B6D4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  glowCyan: {
    borderColor: '#06B6D4',
  },
  topBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#06B6D4',
    opacity: 0.6,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  title: {
    color: '#22D3EE',
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gridItem: {
    alignItems: 'center',
    flex: 1,
  },
  number: {
    fontSize: 24,
    fontWeight: '700',
  },
  label: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  cyan: {
    color: '#22D3EE',
  },
  emerald: {
    color: '#34D399',
  },
  orange: {
    color: '#FBBF24',
  },
});

export default SummaryCard;