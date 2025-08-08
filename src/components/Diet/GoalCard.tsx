import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface GoalCardProps {
  currentCalories: number;
  targetCalories: number;
  macros: {
    proteins: { current: number; target: number };
    carbs: { current: number; target: number };
    fats: { current: number; target: number };
  };
  onEditGoals: () => void;
}

export function GoalCard({ currentCalories, targetCalories, macros, onEditGoals }: GoalCardProps) {
  const calorieProgress = Math.min((currentCalories / targetCalories) * 100, 100);
  
  const getMacroColor = (type: 'proteins' | 'carbs' | 'fats') => {
    switch (type) {
      case 'proteins': return '#7DFF65';
      case 'carbs': return '#0FF0FC';
      case 'fats': return '#FF61C3';
      default: return '#7DFF65';
    }
  };

  const ProgressBar = ({ value, height = 12, backgroundColor = '#2D2D44' }: { 
    value: number; 
    height?: number; 
    backgroundColor?: string; 
  }) => (
    <View style={[styles.progressBackground, { height, backgroundColor }]}>
      <View 
        style={[
          styles.progressFill, 
          { 
            width: `${value}%`, 
            height,
            backgroundColor: '#A259FF'
          }
        ]} 
      />
    </View>
  );

  const MacroProgressBar = ({ value, color, height = 8 }: { 
    value: number; 
    color: string; 
    height?: number; 
  }) => (
    <View style={[styles.progressBackground, { height, backgroundColor: '#2D2D44' }]}>
      <View 
        style={[
          styles.progressFill, 
          { 
            width: `${value}%`, 
            height,
            backgroundColor: color
          }
        ]} 
      />
    </View>
  );

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={styles.titleContainer}>
          <Ionicons name="target" size={20} color="#A259FF" />
          <Text style={styles.cardTitle}>Metas Nutricionais</Text>
        </View>
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={onEditGoals}
          activeOpacity={0.7}
        >
          <Ionicons name="settings" size={16} color="#A259FF" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.cardContent}>
        {/* Calorias */}
        <View style={styles.caloriesSection}>
          <View style={styles.caloriesHeader}>
            <Text style={styles.macroLabel}>Calorias</Text>
            <Text style={styles.caloriesValue}>
              {currentCalories} / {targetCalories} kcal
            </Text>
          </View>
          <ProgressBar value={calorieProgress} />
        </View>

        {/* Macronutrientes */}
        <View style={styles.macrosGrid}>
          {/* Proteínas */}
          <View style={styles.macroItem}>
            <View style={styles.macroHeader}>
              <Text style={styles.macroLabelSmall}>Proteínas</Text>
              <Text style={styles.macroValue}>{macros.proteins.current}g</Text>
            </View>
            <MacroProgressBar 
              value={Math.min((macros.proteins.current / macros.proteins.target) * 100, 100)}
              color={getMacroColor('proteins')}
            />
            <Text style={styles.macroTarget}>Meta: {macros.proteins.target}g</Text>
          </View>

          {/* Carboidratos */}
          <View style={styles.macroItem}>
            <View style={styles.macroHeader}>
              <Text style={styles.macroLabelSmall}>Carboidratos</Text>
              <Text style={styles.macroValue}>{macros.carbs.current}g</Text>
            </View>
            <MacroProgressBar 
              value={Math.min((macros.carbs.current / macros.carbs.target) * 100, 100)}
              color={getMacroColor('carbs')}
            />
            <Text style={styles.macroTarget}>Meta: {macros.carbs.target}g</Text>
          </View>

          {/* Gorduras */}
          <View style={styles.macroItem}>
            <View style={styles.macroHeader}>
              <Text style={styles.macroLabelSmall}>Gorduras</Text>
              <Text style={styles.macroValue}>{macros.fats.current}g</Text>
            </View>
            <MacroProgressBar 
              value={Math.min((macros.fats.current / macros.fats.target) * 100, 100)}
              color={getMacroColor('fats')}
            />
            <Text style={styles.macroTarget}>Meta: {macros.fats.target}g</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1A1A2E',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#A259FF',
    marginBottom: 24,
    shadowColor: '#A259FF',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  settingsButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(162, 89, 255, 0.1)',
  },
  cardContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 24,
  },
  caloriesSection: {
    gap: 8,
  },
  caloriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  macroLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  caloriesValue: {
    fontSize: 16,
    color: '#A259FF',
    fontWeight: '600',
  },
  progressBackground: {
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    borderRadius: 6,
  },
  macrosGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  macroItem: {
    flex: 1,
    gap: 8,
  },
  macroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  macroLabelSmall: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  macroValue: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  macroTarget: {
    fontSize: 12,
    color: '#999999',
  },
});

export default GoalCard;