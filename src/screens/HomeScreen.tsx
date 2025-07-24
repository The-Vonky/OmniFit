import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, Animated, Dimensions, StatusBar, Platform } from 'react-native';
import { styles } from '../components/Styles';

// Importar todos os componentes
import AssistantButton from '../components/AssistantButton';
import BottomTabBar from '../components/BottomTabBar';
import CreatineReminder from '../components/CreatineReminder';
import DietCard from '../components/DietCard';
import GlowingCard from '../components/GlowingCard';
import Header from '../components/Header';
import MotivationCard from '../components/MotivationCard';
import NotificationBar from '../components/NotificationBar';
import ProgressCard from '../components/ProgressCard';
import TipCard from '../components/TipCard';
import Toast from '../components/Toast';
import WorkoutCard from '../components/WorkoutCard';

const { width, height } = Dimensions.get('window');

export default function Home() {
  const [creatineChecked, setCreatineChecked] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Verificar se as animações estão definidas antes de usar
    if (fadeAnim && slideAnim) {
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
    }

    // Welcome message com verificação
    const welcomeTimer = setTimeout(() => {
      if (typeof displayToast === 'function') {
        displayToast('🎯 Bem-vindo de volta! Vamos conquistar seus objetivos hoje!');
      }
    }, 1500);

    return () => {
      clearTimeout(welcomeTimer);
    };
  }, [fadeAnim, slideAnim]);

  const displayToast = (message) => {
    // Verificar se a mensagem é válida
    if (message && typeof message === 'string' && message.length > 0) {
      setToastMessage(message);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const toggleCreatine = () => {
    const newValue = !creatineChecked;
    setCreatineChecked(newValue);
    
    const message = newValue
      ? '✅ Creatina marcada como tomada!'
      : 'Creatina desmarcada';
    
    displayToast(message);
  };

  const startWorkout = () => {
    displayToast('🔥 Iniciando treino de Peito + Tríceps!');
  };

  const openAssistant = () => {
    displayToast('🤖 Assistente ativado! Como posso ajudar?');
  };

  const handleNotification = () => {
    setShowNotification(false);
    displayToast('📊 Redirecionando para avaliação física...');
  };

  return (
    <View style={styles.container}>
      {/* StatusBar configurado corretamente */}
      <StatusBar 
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />
      
      {/* Toast - verificar se existe antes de renderizar */}
      {showToast && toastMessage && (
        <Toast 
          message={toastMessage} 
          visible={showToast} 
        />
      )}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header - Greeting Card */}
        <Animated.View 
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          <GlowingCard style={styles.greetingCard} delay={100}>
            <Header />
          </GlowingCard>
        </Animated.View>

        {/* Motivation Card */}
        <GlowingCard delay={200} glowColor="#FF00D4">
          <MotivationCard />
        </GlowingCard>

        {/* Reminder Card */}
        <GlowingCard delay={300} glowColor="#10B981">
          <CreatineReminder 
            creatineChecked={creatineChecked}
            onToggleCreatine={toggleCreatine}
          />
        </GlowingCard>

        {/* Internal Notification Bar */}
        {showNotification && (
          <GlowingCard delay={350} glowColor="#EF4444">
            <NotificationBar onPress={handleNotification} />
          </GlowingCard>
        )}

        {/* Workout Preview Card */}
        <GlowingCard delay={400} glowColor="#F59E0B">
          <WorkoutCard onStartWorkout={startWorkout} />
        </GlowingCard>

        {/* Diet Preview Card */}
        <GlowingCard delay={500} glowColor="#7C3AED">
          <DietCard />
        </GlowingCard>

        {/* Progress Card */}
        <GlowingCard delay={600} glowColor="#00FFF7">
          <ProgressCard />
        </GlowingCard>

        {/* Tip Card */}
        <GlowingCard delay={700} glowColor="#F59E0B">
          <TipCard />
        </GlowingCard>
      </ScrollView>

      {/* Assistant Button */}
      <AssistantButton onPress={openAssistant} />
    </View>
  );
}