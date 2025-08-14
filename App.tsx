import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import { View, Text, StyleSheet } from 'react-native';

import { BottomTabBar, TabType } from './src/components/BottomTabBar';
import HomeScreen from './src/screens/HomeScreen';
import DietScreen from './src/screens/DietScreen';
import WorkoutScreen from './src/screens/WorkoutScreen';
import CyberpunkWorkout from './src/components/Cyberpunk/CyberpunkWorkout';
import ExerciseDetailScreen from './src/screens/ExerciseDetailScreen';

const PlaceholderScreen = ({ label }: { label: string }) => (
  <View style={styles.screen}>
    <Text style={styles.screenText}>{label}</Text>
  </View>
);

// Componentes separados para evitar funções inline
const ProgressScreen = () => <PlaceholderScreen label="Progress Screen" />;
const OthersScreen = () => <PlaceholderScreen label="Others Screen" />;

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('home');

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          'Orbitron-Regular': require('./assets/fonts/Orbitron-Regular.ttf'),
          'Orbitron-Bold': require('./assets/fonts/Orbitron-Bold.ttf'),
        });
        setFontLoaded(true);
      } catch (error) {
        console.log('Erro ao carregar fontes:', error);
        setFontLoaded(true);
      }
    }
    loadFonts();
  }, []);

  if (!fontLoaded) {
    return (
      <SafeAreaProvider>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando OmniFit...</Text>
        </View>
      </SafeAreaProvider>
    );
  }

  // Função para renderizar a tela atual
  const renderCurrentScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'workout':
        return <WorkoutScreen />;
      case 'diet':
        return <DietScreen />;
      case 'progress':
        return <CyberpunkWorkout />;
      case 'others':
        return <ExerciseDetailScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#0D0D0D" />
      <View style={styles.container}>
        {/* Conteúdo da tela atual */}
        <View style={styles.screenContainer}>
          {renderCurrentScreen()}
        </View>
        
        {/* Bottom Tab Bar customizado */}
        <BottomTabBar 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  screenContainer: {
    flex: 1,
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0D0D0D',
  },
  screenText: {
    fontSize: 24,
    color: '#00FFF7',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0D0D0D',
  },
  loadingText: {
    fontSize: 18,
    color: '#00FFF7',
    fontFamily: 'Orbitron-Regular',
  },
});