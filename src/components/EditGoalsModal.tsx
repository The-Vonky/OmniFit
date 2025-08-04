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

interface Goals {
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
  dietType: string;
}

interface EditGoalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentGoals: Goals;
  onSave: (goals: Goals) => void;
}

const dietTypes = [
  { value: 'balanced', label: 'Balanceada' },
  { value: 'lowcarb', label: 'Low Carb' },
  { value: 'keto', label: 'Cetogênica' },
  { value: 'bulking', label: 'Bulking' },
  { value: 'cutting', label: 'Cutting' },
];

const { height } = Dimensions.get('window');

export function EditGoalsModal({ isOpen, onClose, currentGoals, onSave }: EditGoalsModalProps) {
  const [goals, setGoals] = useState<Goals>(currentGoals);
  const [showDietTypePicker, setShowDietTypePicker] = useState(false);

  const handleSave = () => {
    onSave(goals);
    onClose();
  };

  const handleClose = () => {
    setGoals(currentGoals); // Reset to original values
    setShowDietTypePicker(false);
    onClose();
  };

  const selectedDietType = dietTypes.find(type => type.value === goals.dietType);

  const DietTypePicker = () => (
    <Modal
      visible={showDietTypePicker}
      transparent
      animationType="fade"
      onRequestClose={() => setShowDietTypePicker(false)}
    >
      <View style={styles.pickerOverlay}>
        <View style={styles.pickerContainer}>
          <View style={styles.pickerHeader}>
            <Text style={styles.pickerTitle}>Tipo de Dieta</Text>
            <TouchableOpacity
              onPress={() => setShowDietTypePicker(false)}
              style={styles.pickerCloseButton}
            >
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.pickerList}>
            {dietTypes.map((type) => (
              <TouchableOpacity
                key={type.value}
                onPress={() => {
                  setGoals({ ...goals, dietType: type.value });
                  setShowDietTypePicker(false);
                }}
                style={[
                  styles.pickerItem,
                  goals.dietType === type.value && styles.pickerItemSelected
                ]}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.pickerItemText,
                  goals.dietType === type.value && styles.pickerItemTextSelected
                ]}>
                  {type.label}
                </Text>
                {goals.dietType === type.value && (
                  <Ionicons name="checkmark" size={20} color="#A259FF" />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  return (
    <>
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
                  <Text style={styles.title}>Editar Metas Nutricionais</Text>
                  <Text style={styles.description}>
                    Ajuste suas metas diárias de acordo com seus objetivos.
                  </Text>
                </View>
                <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                  <Ionicons name="close" size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </View>

              {/* Form Content */}
              <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Calorias */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Meta de Calorias (kcal)</Text>
                  <TextInput
                    style={styles.input}
                    value={goals.calories.toString()}
                    onChangeText={(text) => setGoals({ ...goals, calories: Number(text) || 0 })}
                    keyboardType="numeric"
                    placeholder="2300"
                    placeholderTextColor="#999999"
                  />
                </View>

                {/* Proteínas */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Proteínas (g)</Text>
                  <TextInput
                    style={styles.input}
                    value={goals.proteins.toString()}
                    onChangeText={(text) => setGoals({ ...goals, proteins: Number(text) || 0 })}
                    keyboardType="numeric"
                    placeholder="150"
                    placeholderTextColor="#999999"
                  />
                </View>

                {/* Carboidratos */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Carboidratos (g)</Text>
                  <TextInput
                    style={styles.input}
                    value={goals.carbs.toString()}
                    onChangeText={(text) => setGoals({ ...goals, carbs: Number(text) || 0 })}
                    keyboardType="numeric"
                    placeholder="250"
                    placeholderTextColor="#999999"
                  />
                </View>

                {/* Gorduras */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Gorduras (g)</Text>
                  <TextInput
                    style={styles.input}
                    value={goals.fats.toString()}
                    onChangeText={(text) => setGoals({ ...goals, fats: Number(text) || 0 })}
                    keyboardType="numeric"
                    placeholder="85"
                    placeholderTextColor="#999999"
                  />
                </View>

                {/* Tipo de Dieta */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Tipo de Dieta</Text>
                  <TouchableOpacity
                    onPress={() => setShowDietTypePicker(true)}
                    style={styles.selectButton}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.selectButtonText}>
                      {selectedDietType?.label || 'Selecione o tipo de dieta'}
                    </Text>
                    <Ionicons name="chevron-down" size={20} color="#999999" />
                  </TouchableOpacity>
                </View>
              </ScrollView>

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
                  onPress={handleSave}
                  style={styles.saveButton}
                  activeOpacity={0.7}
                >
                  <Text style={styles.saveButtonText}>Salvar Metas</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>

      <DietTypePicker />
    </>
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
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
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
    color: '#A259FF',
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
  content: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    maxHeight: height * 0.5,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#2D2D44',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3D3D54',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#FFFFFF',
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2D2D44',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3D3D54',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  selectButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
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
  saveButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#A259FF',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  // Diet Type Picker Styles
  pickerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerContainer: {
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2D2D44',
    marginHorizontal: 20,
    maxHeight: height * 0.6,
    minWidth: 280,
  },
  pickerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2D2D44',
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#A259FF',
  },
  pickerCloseButton: {
    padding: 4,
  },
  pickerList: {
    maxHeight: height * 0.4,
  },
  pickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2D2D44',
  },
  pickerItemSelected: {
    backgroundColor: 'rgba(162, 89, 255, 0.1)',
  },
  pickerItemText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  pickerItemTextSelected: {
    color: '#A259FF',
    fontWeight: '600',
  },
});

export default EditGoalsModal;