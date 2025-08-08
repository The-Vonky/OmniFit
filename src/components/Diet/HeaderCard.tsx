import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface HeaderCardProps {
  totalCalories: number;
}

const HeaderCard: React.FC<HeaderCardProps> = ({ totalCalories }) => {
  return (
    <View style={[styles.card, styles.glowCyan]}>
      <View style={styles.topBorder} />
      <View style={styles.row}>
        <View>
          <Text style={styles.title}>Minha Dieta 🥗</Text>
          <Text style={styles.subtitle}>Acompanhe sua nutrição diária</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.kcal}>{totalCalories}</Text>
          <Text style={styles.kcalLabel}>kcal consumidas</Text>
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
    borderColor: '#00FFF730',
    shadowColor: '#00FFF7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  glowCyan: {
    borderColor: '#00FFF7',
  },
  topBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#00FFF7',
    opacity: 0.6,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: '#22D3EE',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  kcal: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  kcalLabel: {
    color: '#9CA3AF',
    fontSize: 10,
  },
});

export default HeaderCard;