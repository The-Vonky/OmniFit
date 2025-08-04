import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface Food {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
}

export interface Meal {
  id: string;
  name: string;
  emoji: string;
  time: string;
  foods: Food[];
}

interface MealCardProps {
  meal: Meal;
  onAddFood: (mealId: string) => void;
  onEditMeal: (meal: Meal) => void;
}

export function MealCard({ meal, onAddFood, onEditMeal }: MealCardProps) {
  const totalCalories = meal.foods.reduce((total, food) => total + food.calories, 0);
  const totalProteins = meal.foods.reduce((total, food) => total + food.proteins, 0);
  const totalCarbs = meal.foods.reduce((total, food) => total + food.carbs, 0);
  const totalFats = meal.foods.reduce((total, food) => total + food.fats, 0);

  return (
    <View style={styles.card}>
      {/* Header da refeição */}
      <View style={styles.mealHeader}>
        <View style={styles.mealInfo}>
          <Text style={styles.mealEmoji}>{meal.emoji}</Text>
          <View style={styles.mealDetails}>
            <Text style={styles.mealName}>{meal.name}</Text>
            <Text style={styles.mealTime}>{meal.time}</Text>
          </View>
        </View>
        
        <View style={styles.headerActions}>
          <Text style={styles.totalCalories}>
            {Math.round(totalCalories)} kcal
          </Text>
          <TouchableOpacity
            onPress={() => onEditMeal(meal)}
            style={styles.editButton}
            activeOpacity={0.7}
          >
            <Ionicons name="create-outline" size={16} color="#A259FF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Lista de alimentos */}
      {meal.foods.length > 0 && (
        <View style={styles.foodsList}>
          {meal.foods.map((food, index) => (
            <View key={food.id} style={styles.foodItem}>
              <View style={styles.foodInfo}>
                <Text style={styles.foodName}>{food.name}</Text>
                <Text style={styles.foodQuantity}>
                  {food.quantity} {food.unit}
                </Text>
              </View>
              <Text style={styles.foodCalories}>
                {Math.round(food.calories)} kcal
              </Text>
            </View>
          ))}
          
          {/* Resumo dos macros */}
          <View style={styles.macrosSummary}>
            <View style={styles.macroItem}>
              <Text style={styles.macroLabel}>P</Text>
              <Text style={styles.macroValue}>{Math.round(totalProteins * 10) / 10}g</Text>
            </View>
            <View style={styles.macroItem}>
              <Text style={styles.macroLabel}>C</Text>
              <Text style={styles.macroValue}>{Math.round(totalCarbs * 10) / 10}g</Text>
            </View>
            <View style={styles.macroItem}>
              <Text style={styles.macroLabel}>G</Text>
              <Text style={styles.macroValue}>{Math.round(totalFats * 10) / 10}g</Text>
            </View>
          </View>
        </View>
      )}

      {/* Botão adicionar alimento */}
      <TouchableOpacity
        onPress={() => onAddFood(meal.id)}
        style={styles.addFoodButton}
        activeOpacity={0.7}
      >
        <Ionicons name="add" size={16} color="#A259FF" />
        <Text style={styles.addFoodText}>
          {meal.foods.length === 0 ? 'Adicionar alimentos' : 'Adicionar mais'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1A1A2E',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2D2D44',
    overflow: 'hidden',
  },
  mealHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2D2D44',
  },
  mealInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  mealEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  mealDetails: {
    flex: 1,
  },
  mealName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  mealTime: {
    fontSize: 14,
    color: '#999999',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  totalCalories: {
    fontSize: 16,
    fontWeight: '600',
    color: '#A259FF',
  },
  editButton: {
    padding: 4,
  },
  foodsList: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
    marginBottom: 2,
  },
  foodQuantity: {
    fontSize: 14,
    color: '#999999',
  },
  foodCalories: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  macrosSummary: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#2D2D44',
  },
  macroItem: {
    alignItems: 'center',
  },
  macroLabel: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 4,
  },
  macroValue: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  addFoodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(162, 89, 255, 0.1)',
    borderTopWidth: 1,
    borderTopColor: '#2D2D44',
  },
  addFoodText: {
    fontSize: 16,
    color: '#A259FF',
    fontWeight: '500',
    marginLeft: 8,
  },
});

export default MealCard;