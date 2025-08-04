import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Importar os componentes
import { Header } from '../components/HeaderCard';
import { GoalCard } from '../components/GoalCard';
import { MealCard, Meal, Food } from '../components/MealCard';
import { EditGoalsModal } from '../components/EditGoalsModal';
import { AddFoodModal } from '../components/AddFoodModal';

export default function DietScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isEditGoalsOpen, setIsEditGoalsOpen] = useState(false);
  const [isAddFoodOpen, setIsAddFoodOpen] = useState(false);
  const [selectedMealId, setSelectedMealId] = useState<string | null>(null);

  const [goals, setGoals] = useState({
    calories: 2300,
    proteins: 150,
    carbs: 250,
    fats: 85,
    dietType: 'balanced'
  });

  const [meals, setMeals] = useState<Meal[]>([
    {
      id: '1',
      name: 'Café da manhã',
      emoji: '☕',
      time: '07:00',
      foods: [
        {
          id: '1',
          name: 'Aveia',
          quantity: 0.5,
          unit: 'xícara',
          calories: 195,
          proteins: 8.5,
          carbs: 33,
          fats: 3.5
        },
        {
          id: '2',
          name: 'Banana',
          quantity: 1,
          unit: 'unidade',
          calories: 89,
          proteins: 1.1,
          carbs: 23,
          fats: 0.3
        }
      ]
    },
    {
      id: '2',
      name: 'Almoço',
      emoji: '🍛',
      time: '12:30',
      foods: [
        {
          id: '3',
          name: 'Peito de frango',
          quantity: 150,
          unit: '150g',
          calories: 248,
          proteins: 46.5,
          carbs: 0,
          fats: 5.4
        },
        {
          id: '4',
          name: 'Arroz branco',
          quantity: 1,
          unit: 'xícara',
          calories: 130,
          proteins: 2.7,
          carbs: 28,
          fats: 0.3
        },
        {
          id: '5',
          name: 'Brócolis',
          quantity: 100,
          unit: '100g',
          calories: 34,
          proteins: 2.8,
          carbs: 7,
          fats: 0.4
        }
      ]
    },
    {
      id: '3',
      name: 'Jantar',
      emoji: '🍲',
      time: '19:00',
      foods: []
    },
    {
      id: '4',
      name: 'Lanches',
      emoji: '🍎',
      time: '15:30',
      foods: []
    }
  ]);

  // Calcular totais consumidos
  const currentCalories = meals.reduce((total, meal) => 
    total + meal.foods.reduce((mealTotal, food) => mealTotal + food.calories, 0), 0
  );

  const currentProteins = meals.reduce((total, meal) => 
    total + meal.foods.reduce((mealTotal, food) => mealTotal + food.proteins, 0), 0
  );

  const currentCarbs = meals.reduce((total, meal) => 
    total + meal.foods.reduce((mealTotal, food) => mealTotal + food.carbs, 0), 0
  );

  const currentFats = meals.reduce((total, meal) => 
    total + meal.foods.reduce((mealTotal, food) => mealTotal + food.fats, 0), 0
  );

  const handleAddFood = (mealId: string) => {
    setSelectedMealId(mealId);
    setIsAddFoodOpen(true);
  };

  const handleEditMeal = (meal: Meal) => {
    setSelectedMealId(meal.id);
    setIsAddFoodOpen(true);
  };

  const handleAddFoodToMeal = (food: Omit<Food, 'id'>) => {
    if (selectedMealId) {
      const newFood: Food = {
        ...food,
        id: Date.now().toString()
      };

      setMeals(meals.map(meal => 
        meal.id === selectedMealId 
          ? { ...meal, foods: [...meal.foods, newFood] }
          : meal
      ));
    }
  };

  const addNewMeal = () => {
    const newMeal: Meal = {
      id: Date.now().toString(),
      name: 'Nova Refeição',
      emoji: '🍽️',
      time: '18:00',
      foods: []
    };
    setMeals([...meals, newMeal]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D0D1F" />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Header 
            selectedDate={selectedDate} 
            onDateChange={setSelectedDate} 
          />
          
          <GoalCard
            currentCalories={currentCalories}
            targetCalories={goals.calories}
            macros={{
              proteins: { current: Math.round(currentProteins * 10) / 10, target: goals.proteins },
              carbs: { current: Math.round(currentCarbs * 10) / 10, target: goals.carbs },
              fats: { current: Math.round(currentFats * 10) / 10, target: goals.fats }
            }}
            onEditGoals={() => setIsEditGoalsOpen(true)}
          />

          <View style={styles.mealsContainer}>
            {meals.map((meal) => (
              <MealCard
                key={meal.id}
                meal={meal}
                onAddFood={handleAddFood}
                onEditMeal={handleEditMeal}
              />
            ))}
          </View>

          <TouchableOpacity
            onPress={addNewMeal}
            style={styles.addMealButton}
            activeOpacity={0.8}
          >
            <Ionicons name="add" size={20} color="#000000" style={styles.addIcon} />
            <Text style={styles.addMealText}>
              Adicionar nova refeição 🍽️
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modais */}
      <EditGoalsModal
        isOpen={isEditGoalsOpen}
        onClose={() => setIsEditGoalsOpen(false)}
        currentGoals={goals}
        onSave={setGoals}
      />

      <AddFoodModal
        isOpen={isAddFoodOpen}
        onClose={() => {
          setIsAddFoodOpen(false);
          setSelectedMealId(null);
        }}
        onAddFood={handleAddFoodToMeal}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D1F',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Espaço para o bottom tab bar
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  mealsContainer: {
    gap: 16,
    marginBottom: 24,
  },
  addMealButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0FF0FC',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#0FF0FC',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  addIcon: {
    marginRight: 8,
  },
  addMealText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
});

// Tipos que você precisará criar em arquivos separados
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