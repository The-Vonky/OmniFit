import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  StatusBar,
} from 'react-native';

interface ModernHeaderProps {
  username: string;
  onProfilePress?: () => void;
  onNotificationPress?: () => void;
}

const ModernHeader: React.FC<ModernHeaderProps> = ({ 
  username, 
  onProfilePress,
  onNotificationPress 
}) => {
  // Função para gerar saudação com emoji baseada no horário
  const getGreeting = (): { text: string; emoji: string } => {
    const currentHour = new Date().getHours();
    
    if (currentHour < 6) {
      return { text: `Boa madrugada, ${username}`, emoji: '🌙' };
    } else if (currentHour < 12) {
      return { text: `Bom dia, ${username}`, emoji: '☀️' };
    } else if (currentHour < 18) {
      return { text: `Boa tarde, ${username}`, emoji: '🌤️' };
    } else {
      return { text: `Boa noite, ${username}`, emoji: '🌆' };
    }
  };

  // Função para formatar a data com mais detalhes
  const getFormattedDate = (): string => {
    const now = new Date();
    const dayNames = [
      'Domingo', 'Segunda', 'Terça', 'Quarta',
      'Quinta', 'Sexta', 'Sábado'
    ];
    const monthNames = [
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];

    const dayName = dayNames[now.getDay()];
    const day = now.getDate().toString().padStart(2, '0');
    const monthName = monthNames[now.getMonth()];
    const year = now.getFullYear();

    return `${dayName}, ${day} ${monthName} ${year}`;
  };

  const greeting = getGreeting();

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0A" />
      <View style={styles.container}>
        <View style={styles.backgroundGradient} />
        
        <View style={styles.header}>
          <View style={styles.leftSection}>
            <View style={styles.greetingContainer}>
              <Text style={styles.emoji}>{greeting.emoji}</Text>
              <View style={styles.textContainer}>
                <Text style={styles.greeting}>{greeting.text}</Text>
                <Text style={styles.subtitle}>{getFormattedDate()}</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.rightSection}>
            <TouchableOpacity 
              style={styles.notificationButton}
              activeOpacity={0.7}
              onPress={onNotificationPress}
            >
              <Text style={styles.notificationIcon}>🔔</Text>
              <View style={styles.notificationBadge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.profileButton}
              activeOpacity={0.8}
              onPress={onProfilePress}
            >
              <View style={styles.profileImagePlaceholder}>
                <Text style={styles.profileInitial}>
                  {username.charAt(0).toUpperCase()}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.bottomAccent} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0A0A0A',
    paddingTop: StatusBar.currentHeight || 50,
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#0A0A0A',
    opacity: 0.95,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    paddingBottom: 16,
  },
  leftSection: {
    flex: 1,
  },
  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 28,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '700',
    marginBottom: 2,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    color: '#888888',
    fontWeight: '500',
    opacity: 0.8,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  notificationIcon: {
    fontSize: 20,
  },
  notificationBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#0A0A0A',
  },
  badgeText: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  profileButton: {
    padding: 3,
    backgroundColor: 'linear-gradient(45deg, #00FFF7, #0099FF)',
    borderRadius: 24,
    shadowColor: '#00FFF7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  profileImagePlaceholder: {
    width: 42,
    height: 42,
    backgroundColor: '#00FFF7',
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileInitial: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold',
  },
  bottomAccent: {
    height: 1,
    backgroundColor: 'rgba(0, 255, 247, 0.2)',
    marginHorizontal: 24,
  },
});

export default ModernHeader;