import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Animated, 
  Dimensions,
  ViewStyle,
  TextStyle 
} from 'react-native';

const { width } = Dimensions.get('window');

interface MealItem {
  name: string;
  quantity: string;
  calories: number;
}

interface MealCardProps {
  title: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  items?: MealItem[];
  time?: string;
  imageUrl?: string;
  isCompleted?: boolean;
  onToggleComplete?: () => void;
  onPress?: () => void;
  variant?: 'default' | 'compact' | 'detailed';
  theme?: 'dark' | 'light';
}

const MealCard: React.FC<MealCardProps> = ({
  title,
  calories,
  protein,
  carbs,
  fat,
  items = [],
  time,
  imageUrl,
  isCompleted = false,
  onToggleComplete,
  onPress,
  variant = 'default',
  theme = 'dark',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(1));
  const [fadeAnim] = useState(new Animated.Value(1));

  // Animações
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    Animated.timing(fadeAnim, {
      toValue: isExpanded ? 1 : 0.7,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  // Cálculo de porcentagens dos macronutrientes com validação
  const safeProtein = protein || 0;
  const safeCarbs = carbs || 0;
  const safeFat = fat || 0;
  const safeCalories = calories || 0;
  
  const totalMacros = safeProtein * 4 + safeCarbs * 4 + safeFat * 9;
  const proteinPercentage = totalMacros > 0 ? Math.round((safeProtein * 4 / totalMacros) * 100) : 0;
  const carbsPercentage = totalMacros > 0 ? Math.round((safeCarbs * 4 / totalMacros) * 100) : 0;
  const fatPercentage = totalMacros > 0 ? Math.round((safeFat * 9 / totalMacros) * 100) : 0;

  // Função para determinar o ícone da refeição
  const getMealIcon = (mealTitle: string | undefined): string => {
    if (!mealTitle || typeof mealTitle !== 'string') return '🍴';
    
    const meal = mealTitle.toLowerCase();
    if (meal.includes('café') || meal.includes('manhã')) return '☀️';
    if (meal.includes('almoço')) return '🍽️';
    if (meal.includes('lanche')) return '🥨';
    if (meal.includes('jantar') || meal.includes('janta')) return '🌙';
    return '🍴';
  };

  // Estilos dinâmicos baseados no tema
  const getThemeStyles = () => {
    if (theme === 'light') {
      return {
        cardBackground: '#ffffff',
        textPrimary: '#1a1a1a',
        textSecondary: '#666666',
        accent: '#007AFF',
        shadow: '#000000',
        border: '#e0e0e0',
      };
    }
    return {
      cardBackground: isCompleted ? '#1a2332' : '#1c1c2e',
      textPrimary: '#ffffff',
      textSecondary: '#cccccc',
      accent: '#00d4ff',
      shadow: '#00d4ff',
      border: '#333344',
    };
  };

  const themeColors = getThemeStyles();

  // Renderização compacta
  if (variant === 'compact') {
    return (
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.compactCard, { backgroundColor: themeColors.cardBackground }]}
      >
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <View style={styles.compactHeader}>
            <Text style={[styles.compactTitle, { color: themeColors.textPrimary }]}>
              {getMealIcon(title)} {title}
            </Text>
            <Text style={[styles.compactCalories, { color: themeColors.accent }]}>
              {safeCalories} kcal
            </Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress || toggleExpanded}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.9}
      style={[styles.cardContainer, { width: width - 32 }]}
    >
      <Animated.View 
        style={[
          styles.card,
          {
            backgroundColor: themeColors.cardBackground,
            borderColor: isCompleted ? themeColors.accent : themeColors.border,
            transform: [{ scale: scaleAnim }],
          },
          isCompleted && styles.completedCard,
          theme === 'light' && styles.lightCard,
        ]}
      >
        {/* Header da refeição */}
        <View style={styles.header}>
          <View style={styles.titleSection}>
            <Text style={[styles.mealIcon]}>{getMealIcon(title)}</Text>
            <View style={styles.titleInfo}>
              <Text style={[styles.title, { color: themeColors.textPrimary }]}>
                {title}
              </Text>
              {time && (
                <Text style={[styles.time, { color: themeColors.textSecondary }]}>
                  {time}
                </Text>
              )}
            </View>
          </View>
          
          {onToggleComplete && (
            <TouchableOpacity 
              onPress={onToggleComplete}
              style={[
                styles.checkButton,
                { borderColor: themeColors.accent },
                isCompleted && { backgroundColor: themeColors.accent }
              ]}
            >
              {isCompleted && <Text style={styles.checkMark}>✓</Text>}
            </TouchableOpacity>
          )}
        </View>

        {/* Calorias principais */}
        <View style={styles.caloriesSection}>
          <Text style={[styles.calories, { color: themeColors.accent }]}>
            {safeCalories.toLocaleString('pt-BR')} kcal
          </Text>
          {variant === 'detailed' && (
            <Text style={[styles.caloriesSubtitle, { color: themeColors.textSecondary }]}>
              Energia total
            </Text>
          )}
        </View>

        {/* Macronutrientes */}
        <View style={styles.macrosContainer}>
          <View style={styles.macrosGrid}>
            <View style={[styles.macroItem, styles.proteinMacro]}>
              <Text style={styles.macroLabel}>Proteína</Text>
              <Text style={[styles.macroValue, { color: '#ff6b6b' }]}>
                {safeProtein}g
              </Text>
              <Text style={styles.macroPercentage}>{proteinPercentage}%</Text>
            </View>
            
            <View style={[styles.macroItem, styles.carbsMacro]}>
              <Text style={styles.macroLabel}>Carboidratos</Text>
              <Text style={[styles.macroValue, { color: '#4ecdc4' }]}>
                {safeCarbs}g
              </Text>
              <Text style={styles.macroPercentage}>{carbsPercentage}%</Text>
            </View>
            
            <View style={[styles.macroItem, styles.fatMacro]}>
              <Text style={styles.macroLabel}>Gorduras</Text>
              <Text style={[styles.macroValue, { color: '#ffe66d' }]}>
                {safeFat}g
              </Text>
              <Text style={styles.macroPercentage}>{fatPercentage}%</Text>
            </View>
          </View>

          {/* Barra de progresso dos macros */}
          <View style={styles.macroProgressBar}>
            <View 
              style={[
                styles.macroProgress,
                styles.proteinProgress,
                { width: `${proteinPercentage}%` }
              ]} 
            />
            <View 
              style={[
                styles.macroProgress,
                styles.carbsProgress,
                { width: `${carbsPercentage}%` }
              ]} 
            />
            <View 
              style={[
                styles.macroProgress,
                styles.fatProgress,
                { width: `${fatPercentage}%` }
              ]} 
            />
          </View>
        </View>

        {/* Seção expandida com itens */}
        {(isExpanded || variant === 'detailed') && items.length > 0 && (
          <Animated.View 
            style={[
              styles.expandedSection,
              { opacity: fadeAnim }
            ]}
          >
            <Text style={[styles.itemsTitle, { color: themeColors.textSecondary }]}>
              Alimentos:
            </Text>
            {items.map((item, index) => (
              <View key={index} style={styles.foodItem}>
                <View style={styles.foodItemInfo}>
                  <Text style={[styles.foodName, { color: themeColors.textPrimary }]}>
                    {item.name}
                  </Text>
                  <Text style={[styles.foodQuantity, { color: themeColors.textSecondary }]}>
                    {item.quantity}
                  </Text>
                </View>
                <Text style={[styles.foodCalories, { color: themeColors.accent }]}>
                  {item.calories} kcal
                </Text>
              </View>
            ))}
          </Animated.View>
        )}

        {/* Indicador de expansão */}
        {items.length > 0 && variant !== 'detailed' && (
          <View style={styles.expandIndicator}>
            <Text style={[styles.expandText, { color: themeColors.textSecondary }]}>
              {isExpanded ? 'Ocultar detalhes' : `Ver ${items.length} itens`}
            </Text>
            <Text style={[styles.expandArrow, { color: themeColors.accent }]}>
              {isExpanded ? '▲' : '▼'}
            </Text>
          </View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 16,
    alignSelf: 'center',
  } as ViewStyle,

  card: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  } as ViewStyle,

  completedCard: {
    opacity: 0.8,
    borderWidth: 2,
  } as ViewStyle,

  lightCard: {
    shadowColor: '#000000',
  } as ViewStyle,

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  } as ViewStyle,

  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  } as ViewStyle,

  mealIcon: {
    fontSize: 28,
    marginRight: 12,
  } as TextStyle,

  titleInfo: {
    flex: 1,
  } as ViewStyle,

  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 2,
  } as TextStyle,

  time: {
    fontSize: 14,
    opacity: 0.8,
  } as TextStyle,

  checkButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,

  checkMark: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  } as TextStyle,

  caloriesSection: {
    alignItems: 'center',
    marginBottom: 20,
  } as ViewStyle,

  calories: {
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
  } as TextStyle,

  caloriesSubtitle: {
    fontSize: 12,
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  } as TextStyle,

  macrosContainer: {
    marginBottom: 12,
  } as ViewStyle,

  macrosGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  } as ViewStyle,

  macroItem: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 8,
  } as ViewStyle,

  macroLabel: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  } as TextStyle,

  macroValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  } as TextStyle,

  macroPercentage: {
    fontSize: 11,
    color: '#666666',
  } as TextStyle,

  macroProgressBar: {
    height: 6,
    backgroundColor: '#333333',
    borderRadius: 3,
    flexDirection: 'row',
    overflow: 'hidden',
  } as ViewStyle,

  macroProgress: {
    height: '100%',
  } as ViewStyle,

  proteinProgress: {
    backgroundColor: '#ff6b6b',
  } as ViewStyle,

  carbsProgress: {
    backgroundColor: '#4ecdc4',
  } as ViewStyle,

  fatProgress: {
    backgroundColor: '#ffe66d',
  } as ViewStyle,

  expandedSection: {
    borderTopWidth: 1,
    borderTopColor: '#333344',
    paddingTop: 16,
    marginTop: 8,
  } as ViewStyle,

  itemsTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  } as TextStyle,

  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a3e',
  } as ViewStyle,

  foodItemInfo: {
    flex: 1,
  } as ViewStyle,

  foodName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  } as TextStyle,

  foodQuantity: {
    fontSize: 13,
    opacity: 0.8,
  } as TextStyle,

  foodCalories: {
    fontSize: 14,
    fontWeight: '600',
  } as TextStyle,

  expandIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 12,
    marginTop: 8,
  } as ViewStyle,

  expandText: {
    fontSize: 13,
    marginRight: 8,
  } as TextStyle,

  expandArrow: {
    fontSize: 12,
  } as TextStyle,

  // Estilos para versão compacta
  compactCard: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  } as ViewStyle,

  compactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as ViewStyle,

  compactTitle: {
    fontSize: 16,
    fontWeight: '600',
  } as TextStyle,

  compactCalories: {
    fontSize: 14,
    fontWeight: '700',
  } as TextStyle,

  // Estilos específicos dos macros
  proteinMacro: {} as ViewStyle,
  carbsMacro: {} as ViewStyle,
  fatMacro: {} as ViewStyle,
});

// Exemplo de uso
const ExampleUsage: React.FC = () => {
  const [completedMeals, setCompletedMeals] = useState<string[]>([]);

  const toggleMealComplete = (mealTitle: string) => {
    setCompletedMeals(prev => 
      prev.includes(mealTitle)
        ? prev.filter(title => title !== mealTitle)
        : [...prev, mealTitle]
    );
  };

  const breakfastItems: MealItem[] = [
    { name: "Aveia com banana", quantity: "1 xícara", calories: 150 },
    { name: "Leite desnatado", quantity: "200ml", calories: 80 },
  ];

  const lunchItems: MealItem[] = [
    { name: "Peito de frango grelhado", quantity: "150g", calories: 220 },
    { name: "Arroz integral", quantity: "1 xícara", calories: 220 },
    { name: "Feijão carioca", quantity: "1/2 xícara", calories: 120 },
    { name: "Salada verde", quantity: "1 prato", calories: 60 },
  ];

  return (
    <View style={{ padding: 16, backgroundColor: '#0a0a0f' }}>
      <MealCard
        title="Café da Manhã"
        calories={230}
        protein={10}
        carbs={30}
        fat={8}
        time="08:00"
        items={breakfastItems}
        isCompleted={completedMeals.includes("Café da Manhã")}
        onToggleComplete={() => toggleMealComplete("Café da Manhã")}
        variant="detailed"
      />

      <MealCard
        title="Almoço"
        calories={620}
        protein={35}
        carbs={60}
        fat={22}
        time="12:30"
        items={lunchItems}
        isCompleted={completedMeals.includes("Almoço")}
        onToggleComplete={() => toggleMealComplete("Almoço")}
      />

      <MealCard
        title="Lanche da Tarde"
        calories={180}
        protein={8}
        carbs={15}
        fat={12}
        time="15:30"
        variant="compact"
      />
    </View>
  );
};

export default MealCard;