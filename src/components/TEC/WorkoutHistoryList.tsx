import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated,
  Platform,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface WorkoutHistoryItem {
  id: string | number;
  date: string; // ex: "2025-07-15"
  workoutType: string;
  status: string; // ex: "Completo" | "Pendente"
}

interface WorkoutHistoryListProps {
  history: WorkoutHistoryItem[];
}

// Função para formatar data "2025-07-15" => "15 de julho de 2025"
const formatDate = (dateStr: string): string => {
  const months = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
  ];
  const date = new Date(dateStr);
  const day = date.getDate();
  const monthName = months[date.getMonth()] || '';
  const year = date.getFullYear();
  return `${day} de ${monthName} de ${year}`;
};

const WorkoutHistoryList: React.FC<WorkoutHistoryListProps> = ({ history }) => {
  // Animated item fade-in
  const animatedValues = useRef<Animated.Value[]>([]);

  if (animatedValues.current.length !== history.length) {
    animatedValues.current = history.map(() => new Animated.Value(0));
  }

  useEffect(() => {
    const animations = animatedValues.current.map((anim, index) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 400,
        delay: index * 150,
        useNativeDriver: true,
      })
    );
    Animated.stagger(100, animations).start();
  }, [history]);

  const renderItem = ({ item, index }: { item: WorkoutHistoryItem; index: number }) => {
    // Status colors neon
    const statusColor =
      item.status.toLowerCase() === 'completo'
        ? '#00FF77' // verde neon
        : '#CCCC66'; // amarelo esmaecido (pode ajustar)

    return (
      <Animated.View
        style={[
          styles.itemContainer,
          { opacity: animatedValues.current[index] },
        ]}
      >
        <Ionicons
          name="fitness"
          size={28}
          color="#00FFF7"
          style={styles.itemIcon}
        />
        <View style={styles.textContainer}>
          <Text style={styles.dateText}>{formatDate(item.date)}</Text>
          <Text style={styles.workoutTypeText} numberOfLines={1} ellipsizeMode="tail">
            {item.workoutType}
          </Text>
        </View>
        <Text style={[styles.statusText, { color: statusColor }]}>{item.status}</Text>
      </Animated.View>
    );
  };

  return (
    <View style={styles.listWrapper}>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  listWrapper: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 12,
    backgroundColor: '#111111',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: '#00FFF7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  listContent: {
    paddingBottom: 12,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#222222',
  },
  itemIcon: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  dateText: {
    fontSize: 12,
    color: '#999999',
    fontFamily: Platform.OS === 'ios' ? 'Orbitron-Regular' : 'Orbitron-Regular',
    marginBottom: 2,
  },
  workoutTypeText: {
    fontSize: 16,
    color: '#EEEEEE',
    fontFamily: Platform.OS === 'ios' ? 'Orbitron-Bold' : 'Orbitron-Bold',
    maxWidth: screenWidth * 0.5,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'Orbitron-Bold' : 'Orbitron-Bold',
    minWidth: 70,
    textAlign: 'right',
  },
});

export default WorkoutHistoryList;