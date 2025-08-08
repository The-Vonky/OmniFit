import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Food } from './MealCard';

interface AddFoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFood: (food: Omit<Food, 'id'>) => void;
}

const foodDatabase = [
  { name: "Banana", calories: 89, proteins: 1.1, carbs: 23, fats: 0.3, unit: "unidade" },
  { name: "Arroz branco", calories: 130, proteins: 2.7, carbs: 28, fats: 0.3, unit: "xícara" },
  { name: "Peito de frango", calories: 165, proteins: 31, carbs: 0, fats: 3.6, unit: "100g" },
  { name: "Ovos", calories: 155, proteins: 13, carbs: 1.1, fats: 11, unit: "2 unidades" },
  { name: "Aveia", calories: 389, proteins: 16.9, carbs: 66, fats: 6.9, unit: "100g" },
  { name: "Batata doce", calories: 86, proteins: 1.6, carbs: 20, fats: 0.1, unit: "100g" },
  { name: "Salmão", calories: 208, proteins: 22, carbs: 0, fats: 13, unit: "100g" },
  { name: "Brócolis", calories: 34, proteins: 2.8, carbs: 7, fats: 0.4, unit: "100g" },
];

const { height } = Dimensions.get('window');

export function AddFoodModal({ isOpen, onClose, onAddFood }: AddFoodModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFood, setSelectedFood] = useState<typeof foodDatabase[0] | null>(null);
  const [quantity, setQuantity] = useState("1");

  const filteredFoods = foodDatabase.filter(food =>
    food.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddFood = () => {
    if (selectedFood && quantity) {
      const numQuantity = parseFloat(quantity);
      onAddFood({
        name: selectedFood.name,
        quantity: numQuantity,
        unit: selectedFood.unit,
        calories: Math.round(selectedFood.calories * numQuantity),
        proteins: Math.round(selectedFood.proteins * numQuantity * 10) / 10,
        carbs: Math.round(selectedFood.carbs * numQuantity * 10) / 10,
        fats: Math.round(selectedFood.fats * numQuantity * 10) / 10,
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setSelectedFood(null);
    setQuantity("1");
    setSearchQuery("");
    onClose();
  };

  const numQuantity = parseFloat(quantity) || 0;

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <View style={styles.modalContainer}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerContent}>
                <Text style={styles.title}>Adicionar Alimento</Text>
                <Text style={styles.description}>
                  Busque e adicione alimentos à sua refeição.
                </Text>
              </View>
              <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* Search Input */}
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color="#999999" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar alimento..."
                placeholderTextColor="#999999"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            {/* Food List */}
            <ScrollView style={styles.foodList} showsVerticalScrollIndicator={false}>
              {filteredFoods.map((food, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedFood(food)}
                  style={[
                    styles.foodItem,
                    selectedFood?.name === food.name && styles.selectedFoodItem
                  ]}
                  activeOpacity={0.7}
                >
                  <View style={styles.foodInfo}>
                    <Text style={styles.foodName}>{food.name}</Text>
                    <Text style={styles.foodUnit}>por {food.unit}</Text>
                  </View>
                  <View style={styles.foodNutrition}>
                    <Text style={styles.foodCalories}>{food.calories} kcal</Text>
                    <Text style={styles.foodProtein}>P: {food.proteins}g</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Quantity Input */}
            {selectedFood && (
              <View style={styles.quantitySection}>
                <Text style={styles.quantityLabel}>Quantidade</Text>
                <TextInput
                  style={styles.quantityInput}
                  value={quantity}
                  onChangeText={setQuantity}
                  keyboardType="numeric"
                  placeholder="1"
                  placeholderTextColor="#999999"
                />
                <Text style={styles.totalCalories}>
                  Total: {Math.round(selectedFood.calories * numQuantity)} kcal
                </Text>
              </View>
            )}

            {/* Footer Buttons */}
            <View style={styles.footer}>
              <TouchableOpacity
                onPress={handleClose}
                style={styles.cancelButton}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleAddFood}
                disabled={!selectedFood || !quantity}
                style={[
                  styles.addButton,
                  (!selectedFood || !quantity) && styles.addButtonDisabled
                ]}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.addButtonText,
                  (!selectedFood || !quantity) && styles.addButtonTextDisabled
                ]}>
                  Adicionar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#1A1A2E',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderColor: '#2D2D44',
    maxHeight: height * 0.85,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20, // Safe area bottom
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2D2D44',
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#7DFF65',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#999999',
  },
  closeButton: {
    padding: 4,
    marginLeft: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2D2D44',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3D3D54',
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#FFFFFF',
  },
  foodList: {
    maxHeight: height * 0.4,
    paddingHorizontal: 20,
  },
  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#2D2D44',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
    marginBottom: 8,
  },
  selectedFoodItem: {
    backgroundColor: 'rgba(125, 255, 101, 0.2)',
    borderColor: '#7DFF65',
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  foodUnit: {
    fontSize: 14,
    color: '#999999',
  },
  foodNutrition: {
    alignItems: 'flex-end',
  },
  foodCalories: {
    fontSize: 16,
    fontWeight: '600',
    color: '#A259FF',
    marginBottom: 2,
  },
  foodProtein: {
    fontSize: 12,
    color: '#999999',
  },
  quantitySection: {
    paddingHorizontal: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#2D2D44',
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  quantityInput: {
    backgroundColor: '#2D2D44',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3D3D54',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  totalCalories: {
    fontSize: 14,
    color: '#999999',
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3D3D54',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  addButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#7DFF65',
    alignItems: 'center',
  },
  addButtonDisabled: {
    backgroundColor: '#2D2D44',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  addButtonTextDisabled: {
    color: '#666666',
  },
});

export default AddFoodModal;