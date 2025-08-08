import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MealCard from '../Diet/MealCard';

interface MealsCardProps {
  meals: {
    title: string;
    icon: string;
    time: string;
    foods: { name: string; kcal: number }[];
  }[];
}

const MealsCard: React.FC<MealsCardProps> = ({ meals }) => {
  return (
    <View style={[styles.card, styles.glowGreen]}>
      <View style={styles.topBorder} />
      <Text style={styles.title}>🍽️ Refeições</Text>
      <View>
        {meals.map((meal, index) => (
          <MealCard
            key={index}
            title={meal.title}
            icon={meal.icon}
            time={meal.time}
            foods={meal.foods}
          />
        ))}
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
  title: {
    color: '#86EFAC',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default MealsCard;