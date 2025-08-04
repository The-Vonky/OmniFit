import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';

interface HomeHeaderProps {
  username: string;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ username }) => {
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
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.textContainer}>
          <Text style={styles.greeting}>{getGreeting()}</Text>
          <Text style={styles.subtitle}>{getFormattedDate()}</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.profileButton}
          activeOpacity={0.7}
        >
          <Text style={styles.profileIcon}>👤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0D0D0D',
    paddingTop: 50, // Substitui o SafeArea temporariamente
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 0,
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
    fontWeight: 'bold',
    marginBottom: 4,
    flexShrink: 1,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
  },
  profileButton: {
    padding: 5,
    backgroundColor: '#00FFF7',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    fontSize: 24,
    color: '#000',
  },
});

export default HomeHeader;