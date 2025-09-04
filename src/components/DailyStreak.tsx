import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';

const { width } = Dimensions.get('window');

interface DayStatus {
  date: string;
  completed: boolean;
  isToday: boolean;
  dayOfWeek: string;
  dayNumber: number;
}

interface DailyStreakProps {
  onDayPress?: (date: string) => void;
  streakCount?: number;
  completedDates?: string[]; // Array de datas no formato 'YYYY-MM-DD'
}

const DailyStreak: React.FC<DailyStreakProps> = ({
  onDayPress,
  streakCount = 0,
  completedDates = []
}) => {
  const [days, setDays] = useState<DayStatus[]>([]);
  const [animatedValue] = useState(new Animated.Value(0));

  // Gera os últimos 7 dias
  const generateWeekDays = (): DayStatus[] => {
    const today = new Date();
    const weekDays: DayStatus[] = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      
      const dateString = date.toISOString().split('T')[0];
      const isToday = i === 0;
      const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
      
      weekDays.push({
        date: dateString,
        completed: completedDates.includes(dateString),
        isToday,
        dayOfWeek: dayNames[date.getDay()],
        dayNumber: date.getDate(),
      });
    }
    
    return weekDays;
  };

  useEffect(() => {
    setDays(generateWeekDays());
  }, [completedDates]);

  useEffect(() => {
    // Animação de entrada
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleDayPress = (day: DayStatus) => {
    if (day.isToday && onDayPress) {
      onDayPress(day.date);
    }
  };

  const getStreakColor = (completed: boolean, isToday: boolean) => {
    if (completed) return '#4CAF50'; // Verde para completo
    if (isToday) return '#FF9800'; // Laranja para hoje
    return '#E0E0E0'; // Cinza para não completo
  };

  const renderFireIcon = () => (
    <Text style={styles.fireIcon}>🔥</Text>
  );

  return (
    <Animated.View 
      style={[
        styles.container,
        {
          opacity: animatedValue,
          transform: [{
            translateY: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [20, 0],
            }),
          }],
        },
      ]}
    >
      {/* Header com streak count */}
      <View style={styles.header}>
        <View style={styles.streakContainer}>
          {renderFireIcon()}
          <Text style={styles.streakCount}>{streakCount}</Text>
          <Text style={styles.streakLabel}>dia{streakCount !== 1 ? 's' : ''} seguido{streakCount !== 1 ? 's' : ''}</Text>
        </View>
      </View>

      {/* Calendário semanal */}
      <View style={styles.weekContainer}>
        {days.map((day, index) => (
          <TouchableOpacity
            key={day.date}
            style={[
              styles.dayContainer,
              day.isToday && styles.todayContainer,
            ]}
            onPress={() => handleDayPress(day)}
            activeOpacity={day.isToday ? 0.7 : 1}
            disabled={!day.isToday}
          >
            <Text style={[
              styles.dayOfWeek,
              day.isToday && styles.todayText,
              day.completed && styles.completedText,
            ]}>
              {day.dayOfWeek}
            </Text>
            
            <View style={[
              styles.dayCircle,
              {
                backgroundColor: getStreakColor(day.completed, day.isToday),
                borderWidth: day.isToday ? 3 : 0,
                borderColor: '#FF9800',
              },
            ]}>
              {day.completed ? (
                <Text style={styles.checkMark}>✓</Text>
              ) : (
                <Text style={[
                  styles.dayNumber,
                  day.isToday && styles.todayDayNumber,
                ]}>
                  {day.dayNumber}
                </Text>
              )}
            </View>
            
            {day.isToday && (
              <Text style={styles.todayLabel}>Hoje</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Motivational message */}
      <View style={styles.messageContainer}>
        {streakCount > 0 ? (
          <Text style={styles.motivationText}>
            Continue assim! Você está em uma sequência incrível! 🎉
          </Text>
        ) : (
          <Text style={styles.motivationText}>
            Comece sua jornada hoje! Toque no dia de hoje para marcar como concluído.
          </Text>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  fireIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  streakCount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginRight: 8,
  },
  streakLabel: {
    fontSize: 16,
    color: '#FF6B35',
    fontWeight: '600',
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dayContainer: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 8,
  },
  todayContainer: {
    backgroundColor: '#FFF8E1',
    borderRadius: 12,
    marginHorizontal: 2,
  },
  dayOfWeek: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  todayText: {
    color: '#FF9800',
    fontWeight: 'bold',
  },
  completedText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#999',
  },
  todayDayNumber: {
    color: '#FFFFFF',
  },
  checkMark: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  todayLabel: {
    fontSize: 10,
    color: '#FF9800',
    fontWeight: 'bold',
    marginTop: 2,
  },
  messageContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  motivationText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    lineHeight: 20,
  },
});

// Exemplo de uso do componente
const ExampleUsage: React.FC = () => {
  const [completedDates, setCompletedDates] = useState<string[]>([
    '2025-09-01', // Ontem
    '2025-08-31', // Anteontem
    '2025-08-30', // Há 3 dias
  ]);
  const [currentStreak, setCurrentStreak] = useState(3);

  const handleDayComplete = (date: string) => {
    if (!completedDates.includes(date)) {
      setCompletedDates([...completedDates, date]);
      setCurrentStreak(prev => prev + 1);
    }
  };

  return (
    <View style={exampleStyles.container}>
      <Text style={exampleStyles.title}>Minha Progressão Diária</Text>
      
      <DailyStreak
        streakCount={currentStreak}
        completedDates={completedDates}
        onDayPress={handleDayComplete}
      />
      
      {/* Estatísticas adicionais */}
      <View style={exampleStyles.statsContainer}>
        <View style={exampleStyles.statItem}>
          <Text style={exampleStyles.statNumber}>{completedDates.length}</Text>
          <Text style={exampleStyles.statLabel}>Total de dias</Text>
        </View>
        <View style={exampleStyles.statItem}>
          <Text style={exampleStyles.statNumber}>{currentStreak}</Text>
          <Text style={exampleStyles.statLabel}>Sequência atual</Text>
        </View>
        <View style={exampleStyles.statItem}>
          <Text style={exampleStyles.statNumber}>
            {Math.round((completedDates.length / 30) * 100)}%
          </Text>
          <Text style={exampleStyles.statLabel}>Este mês</Text>
        </View>
      </View>
    </View>
  );
};

const exampleStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

export default DailyStreak;