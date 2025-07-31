import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MealCardProps {
  title: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const MealCard: React.FC<MealCardProps> = ({
  title,
  calories,
  protein,
  carbs,
  fat,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}Café da Manhã</Text>
      <Text style={styles.calories}>{calories}230 kcal</Text>
      <View style={styles.macros}>
        <Text style={styles.macro}>P: 10{protein}g</Text>
        <Text style={styles.macro}>C: 200{carbs}g</Text>
        <Text style={styles.macro}>F: 20{fat}g</Text>
      </View>
    </View>
  );
};
<MealCard
  title="Almoço"
  calories={620}
  protein={35}
  carbs={60}
  fat={22}
/>

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1c1c2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#0ff',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 4,
    fontWeight: 'bold',
  },
  calories: {
    fontSize: 16,
    color: '#0ff',
    marginBottom: 8,
  },
  macros: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  macro: {
    color: '#ccc',
    fontSize: 14,
  },
});

export default MealCard;