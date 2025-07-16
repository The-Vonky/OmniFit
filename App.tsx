// App.tsx - SÓ navegação e configuração global
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import { View, Text, StyleSheet } from 'react-native';

import BottomTabBar from './src/components/BottomTabBar';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const PlaceholderScreen = ({ label }: { label: string }) => (
  <View style={styles.screen}>
    <Text style={styles.screenText}>{label}</Text>
  </View>
);

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

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
          <Text style={styles.loadingText}>Carregando DreyonFit...</Text>
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" backgroundColor="#0D0D0D" />
        <Tab.Navigator
          tabBar={(props) => <BottomTabBar {...props} />}
          screenOptions={{ headerShown: false }}
        >
          <Tab.Screen name="home" component={HomeScreen} />
          <Tab.Screen name="workout" component={() => <PlaceholderScreen label="Treino Screen" />} />
          <Tab.Screen name="diet" component={() => <PlaceholderScreen label="Dieta Screen" />} />
          <Tab.Screen name="progress" component={() => <PlaceholderScreen label="Progresso Screen" />} />
          <Tab.Screen name="profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
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