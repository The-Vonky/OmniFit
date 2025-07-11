import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface StatItem {
  emoji: string;
  label: string;
}

interface QuickAccessItem {
  icon: string;
  text: string;
  color: string;
}

interface StatCard {
  value: string;
  label: string;
  sublabel?: string;
}

interface FutureItem {
  icon: string;
  text: string;
}

const LoginScreen: React.FC = () => {
  const workoutStats: StatItem[] = [
    { emoji: '💪', label: 'Força' },
    { emoji: '🔥', label: 'Intenso' },
    { emoji: '⚡', label: 'Energia' },
  ];

  const quickAccessItems: QuickAccessItem[] = [
    { icon: '📚', text: 'Exercícios', color: '#ff3366' },
    { icon: '⏰', text: 'Histórico', color: '#ff6b9d' },
    { icon: '📊', text: 'Progresso', color: '#9c27b0' },
    { icon: '⚙️', text: 'Config', color: '#673ab7' },
  ];

  const statsCards: StatCard[] = [
    { value: '12', label: 'Treinos', sublabel: 'este mês' },
    { value: '4.2', label: 'Semanas', sublabel: 'sequência' },
    { value: '1.2k', label: 'Calorias', sublabel: 'queimadas' },
  ];

  const futureItems: FutureItem[] = [
    { icon: '🎯', text: 'Metas' },
    { icon: '📱', text: 'Planos' },
    { icon: '🏆', text: 'Ranking' },
    { icon: '💰', text: 'Premium' },
  ];

  const handleStartWorkout = () => {
    console.log('Iniciando treino...');
  };

  const handleProfilePress = () => {
    console.log('Perfil pressionado');
  };

  const handleQuickAccessPress = (item: QuickAccessItem) => {
    console.log(`Acesso rápido: ${item.text}`);
  };

  const handleNavPress = (screen: string) => {
    console.log(`Navegando para: ${screen}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Bem-vindo de volta!</Text>
          <Text style={styles.userName}>Deywid Braga</Text>
        </View>
        <TouchableOpacity style={styles.profileButton} onPress={handleProfilePress}>
          <Text style={styles.profileIcon}>👤</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Today's Workout Card */}
        <LinearGradient
          colors={['#ff3366', '#ff1744', '#d50000']}
          style={styles.workoutCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>TREINO DO DIA: Segunda-Feira</Text>
            <Text style={styles.workoutEmoji}>💪</Text>
          </View>
          
          <Text style={styles.workoutName}>Treino A - Peito e Tríceps</Text>
          <Text style={styles.workoutDetails}>8 exercícios • 45-60 min</Text>
          
          <View style={styles.workoutStats}>
            {workoutStats.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <Text style={styles.statEmoji}>{stat.emoji}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
          
          <TouchableOpacity style={styles.startButton} onPress={handleStartWorkout}>
            <Text style={styles.startButtonText}>INICIAR TREINO</Text>
            <Text style={styles.startButtonIcon}>▶️</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Quick Access */}
        <View style={styles.quickAccess}>
          <Text style={styles.sectionTitle}>Acesso Rápido</Text>
          <View style={styles.quickAccessGrid}>
            {quickAccessItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickAccessItem}
                onPress={() => handleQuickAccessPress(item)}
              >
                <View style={[styles.quickAccessIcon, { backgroundColor: item.color }]}>
                  <Text style={styles.quickAccessIconText}>{item.icon}</Text>
                </View>
                <Text style={styles.quickAccessText}>{item.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Tip Card */}
        <View style={styles.tipCard}>
          <View style={styles.tipHeader}>
            <Text style={styles.tipIcon}>💡</Text>
            <Text style={styles.tipTitle}>DICA DO DIA</Text>
          </View>
          <Text style={styles.tipText}>
            Mantenha a postura correta no agachamento: peito para cima, core contraído e joelhos alinhados com os pés.
          </Text>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Seus Números</Text>
          <View style={styles.statsGrid}>
            {statsCards.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statCardLabel}>{stat.label}</Text>
                {stat.sublabel && (
                  <Text style={styles.statSubLabel}>{stat.sublabel}</Text>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Future Features */}
        <View style={styles.futureSection}>
          <Text style={styles.sectionTitle}>Em Breve</Text>
          <View style={styles.futureGrid}>
            {futureItems.map((item, index) => (
              <TouchableOpacity key={index} style={styles.futureItem}>
                <Text style={styles.futureIcon}>{item.icon}</Text>
                <Text style={styles.futureText}>{item.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={[styles.navItem, styles.navItemActive]}
          onPress={() => handleNavPress('home')}
        >
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={[styles.navText, styles.navTextActive]}>Início</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => handleNavPress('workout')}
        >
          <Text style={styles.navIcon}>💪</Text>
          <Text style={styles.navText}>Treinos</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => handleNavPress('progress')}
        >
          <Text style={styles.navIcon}>📊</Text>
          <Text style={styles.navText}>Progresso</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => handleNavPress('profile')}
        >
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 14,
    color: '#999',
    fontWeight: '400',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
    color: '#ff3366',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ff3366',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#ff3366',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  profileIcon: {
    color: 'white',
    fontSize: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  workoutCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 30,
    shadowColor: '#ff3366',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#ffffff',
  },
  workoutEmoji: {
    fontSize: 24,
  },
  workoutName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#ffffff',
  },
  workoutDetails: {
    fontSize: 14,
    color: '#ffccdd',
    marginBottom: 20,
  },
  workoutStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#ffccdd',
    fontWeight: '600',
  },
  startButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#ffffff',
  },
  startButtonIcon: {
    fontSize: 16,
  },
  quickAccess: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#ffffff',
  },
  quickAccessGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAccessItem: {
    alignItems: 'center',
    flex: 1,
  },
  quickAccessIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  quickAccessIconText: {
    fontSize: 24,
  },
  quickAccessText: {
    fontSize: 12,
    color: '#cccccc',
    fontWeight: '600',
  },
  tipCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    borderLeftWidth: 4,
    borderLeftColor: '#ff6b9d',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  tipTitle: {
    fontSize: 12,
    color: '#ff6b9d',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  tipText: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 20,
  },
  statsSection: {
    marginBottom: 30,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  statCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    color: '#ff3366',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statCardLabel: {
    fontSize: 12,
    color: '#cccccc',
    fontWeight: '600',
  },
  statSubLabel: {
    fontSize: 10,
    color: '#999',
    marginTop: 2,
  },
  futureSection: {
    marginBottom: 30,
  },
  futureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  futureItem: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#333',
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
  },
  futureIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  futureText: {
    fontSize: 12,
    color: '#cccccc',
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 100,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1a1a1a',
    borderTopWidth: 1,
    borderTopColor: '#333',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  navItem: {
    alignItems: 'center',
    padding: 8,
  },
  navItemActive: {
    // Active state styling
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  navText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#666',
  },
  navTextActive: {
    color: '#ff3366',
  },
});

export default LoginScreen;