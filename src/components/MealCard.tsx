import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MealCardProps {
  title: string;
  icon: string;
  time: string;
  foods: { name: string; kcal: number }[];
}

const MealCard: React.FC<MealCardProps> = ({ title, icon, time, foods }) => {
  const totalKcal = foods.reduce((sum, food) => sum + food.kcal, 0);

  return (
    <View style={[styles.card, styles.glowGreen]}>
      <View style={styles.topBorder} />
      <View style={styles.header}>
        <Text style={styles.title}>{icon} {title}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>

      <View style={styles.foodList}>
        {foods.map((food, index) => (
          <View key={index} style={styles.foodItem}>
            <Text style={styles.foodName}>{food.name}</Text>
            <Text style={styles.foodKcal}>{food.kcal} kcal</Text>
          </View>
        ))}
      </View>

      <Text style={styles.totalKcal}>Total: {totalKcal} kcal</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#18181B',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#4ADE8030',
    shadowColor: '#4ADE80',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
  },
  glowGreen: {
    borderColor: '#4ADE80',
  },
  topBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#4ADE80',
    opacity: 0.6,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    color: '#86EFAC',
    fontSize: 16,
    fontWeight: 'bold',
  },
  time: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  foodList: {
    marginBottom: 8,
  },
  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  foodName: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  foodKcal: {
    color: '#D1D5DB',
    fontSize: 14,
  },
  totalKcal: {
    textAlign: 'right',
    color: '#A7F3D0',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default MealCard;