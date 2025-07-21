import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type TabParamList = {
  home: undefined;
  workout: undefined;
  diet: undefined;
  progress: undefined;
  profile: undefined;
};

interface HomeHeaderProps {
  username: string;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ username }) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<BottomTabNavigationProp<TabParamList>>();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Função para gerar saudação baseada no horário
  const getGreeting = (): string => {
    const currentHour = new Date().getHours();
    
    if (currentHour < 12) {
      return `Bom dia, ${username}!`;
    } else if (currentHour < 18) {
      return `Boa tarde, ${username}!`;
    } else {
      return `Boa noite, ${username}!`;
    }
  };

  // Função para formatar a data atual
  const getFormattedDate = (): string => {
    const now = new Date();
    const dayNames = [
      'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira',
      'Quinta-feira', 'Sexta-feira', 'Sábado'
    ];
    const monthNames = [
      'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
      'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];

    const dayName = dayNames[now.getDay()];
    const day = now.getDate();
    const monthName = monthNames[now.getMonth()];

    return `${dayName}, ${day} de ${monthName}`;
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Animated.View 
        style={[
          styles.header,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }
        ]}
      >
        <View style={styles.textContainer}>
          <Text style={styles.greeting}>{getGreeting()}</Text>
          <Text style={styles.subtitle}>{getFormattedDate()}</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => navigation.navigate('home')}
          activeOpacity={0.7}
        >
          <Ionicons name="person-circle" size={40} color="#00FFF7" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0D0D0D',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  textContainer: {
    flex: 1,
    marginRight: 15,
  },
  greeting: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'Orbitron-Bold' : 'Orbitron-Bold',
    marginBottom: 4,
    flexShrink: 1,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    fontFamily: Platform.OS === 'ios' ? 'Orbitron-Regular' : 'Orbitron-Regular',
  },
  profileButton: {
    padding: 5,
  },
});

export default HomeHeader;