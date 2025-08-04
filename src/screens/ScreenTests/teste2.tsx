import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

interface QuickActionProps {
  icon: string;
  title: string;
  subtitle: string;
  onPress: () => void;
  color?: string;
}

interface StatCardProps {
  title: string;
  value: string;
  unit: string;
  icon: string;
  color?: string;
}

// Componente de Ação Rápida
const QuickAction: React.FC<QuickActionProps> = ({ 
  icon, 
  title, 
  subtitle, 
  onPress, 
  color = '#00FFF7' 
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.8}
    >
      <Animated.View style={[styles.quickAction, { transform: [{ scale: scaleAnim }] }]}>
        <View style={[styles.quickActionIcon, { backgroundColor: color + '20' }]}>
          <Ionicons name={icon} size={24} color={color} />
        </View>
        <Text style={styles.quickActionTitle}>{title}</Text>
        <Text style={styles.quickActionSubtitle}>{subtitle}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

// Componente de Card de Estatística
const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  unit, 
  icon, 
  color = '#00FFF7' 
}) => {
  const glowAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
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
  }, []);

  return (
    <View style={styles.statCard}>
      <Animated.View 
        style={[
          styles.statCardGlow, 
          { 
            backgroundColor: color,
            opacity: glowAnim,
          }
        ]} 
      />
      <View style={styles.statCardContent}>
        <Ionicons name={icon} size={20} color={color} />
        <Text style={styles.statTitle}>{title}</Text>
        <View style={styles.statValueContainer}>
          <Text style={[styles.statValue, { color }]}>{value}</Text>
          <Text style={styles.statUnit}>{unit}</Text>
        </View>
      </View>
    </View>
  );
};

// Componente Principal da HomeScreen
const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
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

  const quickActions = [
    {
      icon: 'barbell',
      title: 'Treino',
      subtitle: 'Iniciar sessão',
      onPress: () => console.log('Treino pressed'),
      color: '#00FFF7',
    },
    {
      icon: 'nutrition',
      title: 'Dieta',
      subtitle: 'Ver plano',
      onPress: () => console.log('Dieta pressed'),
      color: '#FF00D4',
    },
    {
      icon: 'analytics',
      title: 'Progresso',
      subtitle: 'Acompanhar',
      onPress: () => console.log('Progresso pressed'),
      color: '#7C3AED',
    },
    {
      icon: 'timer',
      title: 'Timer',
      subtitle: 'Cronômetro',
      onPress: () => console.log('Timer pressed'),
      color: '#F59E0B',
    },
  ];

  const stats = [
    { title: 'Peso', value: '75.2', unit: 'kg', icon: 'scale', color: '#00FFF7' },
    { title: 'Treinos', value: '12', unit: 'semana', icon: 'barbell', color: '#FF00D4' },
    { title: 'Calorias', value: '2.1k', unit: 'kcal', icon: 'flame', color: '#F59E0B' },
    { title: 'Água', value: '1.8', unit: 'L', icon: 'water', color: '#10B981' },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <Animated.View 
        style={[
          styles.header,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }
        ]}
      >
        <View>
          <Text style={styles.greeting}>Olá, Deywid Braga!</Text>
          <Text style={styles.subtitle}>Vamos treinar hoje?</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person-circle" size={40} color="#00FFF7" />
        </TouchableOpacity>
      </Animated.View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Próximo Treino */}
        <Animated.View 
          style={[
            styles.nextWorkoutCard,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          <View style={styles.nextWorkoutHeader}>
            <Text style={styles.nextWorkoutTitle}>Próximo Treino</Text>
            <Ionicons name="chevron-forward" size={20} color="#00FFF7" />
          </View>
          <Text style={styles.nextWorkoutName}>Treino A - Peito e Tríceps</Text>
          <Text style={styles.nextWorkoutTime}>Hoje às 18:00</Text>
          <View style={styles.nextWorkoutProgress}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '65%' }]} />
            </View>
            <Text style={styles.progressText}>65% concluído</Text>
          </View>
        </Animated.View>

        {/* Estatísticas */}
        <Animated.View 
          style={[
            styles.sectionContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          <Text style={styles.sectionTitle}>Estatísticas</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </View>
        </Animated.View>

        {/* Ações Rápidas */}
        <Animated.View 
          style={[
            styles.sectionContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          <Text style={styles.sectionTitle}>Ações Rápidas</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <QuickAction key={index} {...action} />
            ))}
          </View>
        </Animated.View>

        {/* Motivação */}
        <Animated.View 
          style={[
            styles.motivationCard,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          <Ionicons name="flash" size={24} color="#F59E0B" />
          <Text style={styles.motivationText}>
            "O sucesso é a soma de pequenos esforços repetidos dia após dia."
          </Text>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'Orbitron' : 'Orbitron-Bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
    fontFamily: Platform.OS === 'ios' ? 'Orbitron' : 'Orbitron-Regular',
  },
  profileButton: {
    padding: 5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Espaço para a bottom tab bar
  },
  nextWorkoutCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#00FFF7',
    shadowColor: '#00FFF7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  nextWorkoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  nextWorkoutTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00FFF7',
    fontFamily: Platform.OS === 'ios' ? 'Orbitron' : 'Orbitron-Bold',
  },
  nextWorkoutName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  nextWorkoutTime: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 15,
  },
  nextWorkoutProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#333333',
    borderRadius: 3,
    marginRight: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00FFF7',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#00FFF7',
    fontWeight: '600',
  },
  sectionContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
    fontFamily: Platform.OS === 'ios' ? 'Orbitron' : 'Orbitron-Bold',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: (width - 50) / 2,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  statCardGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
  },
  statCardContent: {
    alignItems: 'center',
  },
  statTitle: {
    fontSize: 12,
    color: '#666666',
    marginTop: 8,
    marginBottom: 5,
    textAlign: 'center',
  },
  statValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Orbitron' : 'Orbitron-Bold',
  },
  statUnit: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 2,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickAction: {
    width: (width - 50) / 2,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  quickActionSubtitle: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
  motivationCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  motivationText: {
    fontSize: 14,
    color: '#CCCCCC',
    fontStyle: 'italic',
    marginLeft: 15,
    flex: 1,
    lineHeight: 20,
  },
});

export default HomeScreen;