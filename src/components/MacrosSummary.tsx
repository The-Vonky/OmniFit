import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

interface MacroItemProps {
  name: string;
  current: number;
  target: number;
  unit: string;
  color: string;
  icon: string;
}

interface MacrosSummaryProps {
  style?: any;
}

// Componente individual para cada macro
const MacroItem: React.FC<MacroItemProps> = ({ 
  name, 
  current, 
  target, 
  unit, 
  color, 
  icon 
}) => {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0.3)).current;
  
  const percentage = Math.min((current / target) * 100, 100);
  const isComplete = current >= target;

  useEffect(() => {
    // Animação da barra de progresso
    Animated.timing(progressAnim, {
      toValue: percentage,
      duration: 1500,
      useNativeDriver: false,
    }).start();

    // Animação de brilho sutil
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: isComplete ? 0.8 : 0.5,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.3,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [current, target]);

  return (
    <View style={styles.macroItem}>
      <View style={styles.macroHeader}>
        <View style={styles.macroIconContainer}>
          <Animated.View 
            style={[
              styles.macroIconGlow,
              { 
                backgroundColor: color,
                opacity: glowAnim,
              }
            ]}
          />
          <Ionicons name={icon} size={16} color={color} />
        </View>
        <Text style={styles.macroName}>{name}</Text>
        <Text style={[styles.macroPercentage, { color: isComplete ? '#10B981' : color }]}>
          {Math.round(percentage)}%
        </Text>
      </View>
      
      <View style={styles.macroValues}>
        <Text style={[styles.macroCurrentValue, { color }]}>
          {current}<Text style={styles.macroUnit}>{unit}</Text>
        </Text>
        <Text style={styles.macroTargetValue}>
          / {target}{unit}
        </Text>
      </View>

      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarBackground}>
          <Animated.View
            style={[
              styles.progressBarFill,
              {
                backgroundColor: isComplete ? '#10B981' : color,
                width: progressAnim.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%'],
                  extrapolate: 'clamp',
                }),
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

// Componente principal do resumo de macros
const MacrosSummary: React.FC<MacrosSummaryProps> = ({ style }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Dados dos macros (você pode tornar isso dinâmico através de props)
  const macrosData = [
    {
      name: 'Proteínas',
      current: 85,
      target: 120,
      unit: 'g',
      color: '#00FFF7',
      icon: 'fitness',
    },
    {
      name: 'Carboidratos',
      current: 180,
      target: 250,
      unit: 'g',
      color: '#F59E0B',
      icon: 'leaf',
    },
    {
      name: 'Gorduras',
      current: 45,
      target: 70,
      unit: 'g',
      color: '#EF4444',
      icon: 'water',
    },
    {
      name: 'Fibras',
      current: 18,
      target: 25,
      unit: 'g',
      color: '#10B981',
      icon: 'flower',
    },
  ];

  const totalCalories = 1850;
  const targetCalories = 2100;
  const caloriesPercentage = Math.round((totalCalories / targetCalories) * 100);

  return (
    <Animated.View 
      style={[
        styles.container,
        style,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }
      ]}
    >
      {/* Header com total de calorias */}
      <View style={styles.header}>
        <View style={styles.caloriesContainer}>
          <Ionicons name="flame" size={20} color="#FF6B35" />
          <Text style={styles.caloriesTitle}>Calorias Totais</Text>
        </View>
        <View style={styles.caloriesValues}>
          <Text style={styles.caloriesCount}>
            {totalCalories} <Text style={styles.caloriesUnit}>kcal</Text>
          </Text>
          <Text style={styles.caloriesTarget}>/ {targetCalories} kcal</Text>
        </View>
        <View style={styles.caloriesProgressContainer}>
          <View style={styles.caloriesProgressBar}>
            <Animated.View
              style={[
                styles.caloriesProgressFill,
                {
                  width: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', `${caloriesPercentage}%`],
                    extrapolate: 'clamp',
                  }),
                },
              ]}
            />
          </View>
          <Text style={[styles.caloriesPercentage, { color: caloriesPercentage >= 90 ? '#10B981' : '#FF6B35' }]}>
            {caloriesPercentage}%
          </Text>
        </View>
      </View>

      {/* Lista de macros */}
      <View style={styles.macrosGrid}>
        {macrosData.map((macro, index) => (
          <MacroItem key={index} {...macro} />
        ))}
      </View>

      {/* Footer com resumo */}
      <View style={styles.footer}>
        <View style={styles.summaryItem}>
          <Ionicons name="checkmark-circle" size={16} color="#10B981" />
          <Text style={styles.summaryText}>2 macros atingidos</Text>
        </View>
        <View style={styles.summaryItem}>
          <Ionicons name="time" size={16} color="#F59E0B" />
          <Text style={styles.summaryText}>Restam {targetCalories - totalCalories} kcal</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1A1A1A',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#333333',
  },
  header: {
    marginBottom: 20,
  },
  caloriesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  caloriesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B35',
    marginLeft: 8,
    fontFamily: Platform.OS === 'ios' ? 'Orbitron' : 'Orbitron-Bold',
  },
  caloriesValues: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  caloriesCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'Orbitron' : 'Orbitron-Bold',
  },
  caloriesUnit: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#666666',
  },
  caloriesTarget: {
    fontSize: 16,
    color: '#666666',
    marginLeft: 8,
  },
  caloriesProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  caloriesProgressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#333333',
    borderRadius: 4,
    marginRight: 12,
  },
  caloriesProgressFill: {
    height: '100%',
    backgroundColor: '#FF6B35',
    borderRadius: 4,
  },
  caloriesPercentage: {
    fontSize: 14,
    fontWeight: '600',
    minWidth: 35,
    textAlign: 'right',
  },
  macrosGrid: {
    marginBottom: 15,
  },
  macroItem: {
    marginBottom: 15,
  },
  macroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  macroIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    position: 'relative',
  },
  macroIconGlow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  macroName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    flex: 1,
  },
  macroPercentage: {
    fontSize: 12,
    fontWeight: '600',
  },
  macroValues: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  macroCurrentValue: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Orbitron' : 'Orbitron-Bold',
  },
  macroUnit: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#666666',
  },
  macroTargetValue: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 4,
  },
  progressBarContainer: {
    height: 4,
  },
  progressBarBackground: {
    flex: 1,
    height: '100%',
    backgroundColor: '#333333',
    borderRadius: 2,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryText: {
    fontSize: 12,
    color: '#CCCCCC',
    marginLeft: 6,
  },
});

export default MacrosSummary;