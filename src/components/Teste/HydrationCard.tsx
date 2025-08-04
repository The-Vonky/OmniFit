import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface HydrationCardProps {
  currentMl: number;
  goalMl: number;
  onAddWater: () => void;
}

const HydrationCard: React.FC<HydrationCardProps> = ({ currentMl, goalMl, onAddWater }) => {
  const progress = Math.min((currentMl / goalMl) * 100, 100).toFixed(0);

  return (
    <View style={[styles.card, styles.glowBlue]}>
      <View style={styles.topBorder} />
      <View style={styles.row}>
        <View>
          <Text style={styles.title}>💧 Hidratação</Text>
          <Text style={styles.subtitle}>
            {currentMl}ml / {goalMl}ml ({progress}%)
          </Text>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={onAddWater}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
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
    borderColor: '#3B82F630',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  glowBlue: {
    borderColor: '#3B82F6',
  },
  topBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#3B82F6',
    opacity: 0.6,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#60A5FA',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  addButton: {
    backgroundColor: '#3B82F6',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default HydrationCard;