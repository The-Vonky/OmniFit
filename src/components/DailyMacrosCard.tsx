import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Platform,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface MacroData {
  current: number;
  goal: number;
}

interface DailyMacrosCardProps {
  calories: MacroData;
  protein: MacroData;
  carbs: MacroData;
  fat: MacroData;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const DailyMacrosCard: React.FC<DailyMacrosCardProps> = ({
  calories,
  protein,
  carbs,
  fat,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const getPercentage = (current: number, goal: number) => {
    if (goal === 0) return 0;
    return Math.min((current / goal) * 100, 100);
  };

  const renderMacro = (
    label: string,
    data: MacroData,
    icon: string,
    unit: string = 'g',
    highlight?: boolean
  ) => {
    const percentage = getPercentage(data.current, data.goal);
    const widthInterpolated = new Animated.Value(percentage).interpolate({
      inputRange: [0, 100],
      outputRange: ['0%', '100%'],
    });

    return (
      <View style={styles.macroContainer}>
        <View style={styles.macroHeader}>
          <View style={styles.macroLabel}>
            <Ionicons name={icon} size={16} color="#00FFF7" style={{ marginRight: 6 }} />
            <Text style={[styles.macroTitle, highlight && styles.highlightTitle]}>
              {label}
            </Text>
          </View>
          <Text style={[styles.macroValue, highlight && styles.highlightValue]}>
            {data.current}{unit} / {data.goal}{unit}
          </Text>
        </View>
        <View style={styles.progressBarBackground}>
          <Animated.View
            style={[
              styles.progressBarFill,
              {
                width: widthInterpolated,
              },
            ]}
          />
        </View>
      </View>
    );
  };

  return (
    <Animated.View
      style={[
        styles.card,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <Text style={styles.title}>Seus Macros de Hoje</Text>

      {renderMacro('Calorias', calories, 'flame', ' kcal', true)}
      {renderMacro('Proteínas', protein, 'fitness', 'g')}
      {renderMacro('Carboidratos', carbs, 'leaf', 'g')}
      {renderMacro('Gorduras', fat, 'water', 'g')}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#111111',
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#00FFF7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  title: {
    fontSize: 20,
    color: '#EEEEEE',
    fontFamily: Platform.OS === 'ios' ? 'Orbitron-Bold' : 'Orbitron-Bold',
    marginBottom: 18,
    letterSpacing: 0.8,
  },
  macroContainer: {
    marginBottom: 16,
  },
  macroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  macroLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  macroTitle: {
    fontSize: 14,
    color: '#AAAAAA',
    fontFamily: Platform.OS === 'ios' ? 'Orbitron-Regular' : 'Orbitron-Regular',
  },
  macroValue: {
    fontSize: 14,
    color: '#EEEEEE',
    fontFamily: Platform.OS === 'ios' ? 'Orbitron-Regular' : 'Orbitron-Regular',
  },
  highlightTitle: {
    color: '#00FFF7',
    fontSize: 15,
    fontFamily: 'Orbitron-Bold',
  },
  highlightValue: {
    color: '#00FFF7',
    fontSize: 15,
    fontFamily: 'Orbitron-Bold',
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: '#1F1F1F',
    borderRadius: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 10,
    backgroundColor: '#00FFF7',
    borderRadius: 8,
  },
});

export default DailyMacrosCard;