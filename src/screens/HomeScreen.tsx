import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  ScrollView, 
  Animated, 
  Dimensions, 
  StatusBar, 
  Platform 
} from 'react-native';
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

export default function Home(): JSX.Element {
  const [creatineChecked, setCreatineChecked] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);

  const fadeAnim = useRef<Animated.Value>(new Animated.Value(0)).current;
  const slideAnim = useRef<Animated.Value>(new Animated.Value(50)).current;

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

    // Welcome message
    const welcomeTimer = setTimeout(() => {
      displayToast('🎯 Bem-vindo de volta! Vamos conquistar seus objetivos hoje!');
    }, 1500);

    return () => {
      clearTimeout(welcomeTimer);
    };
  }, []);

  const displayToast = (message: string): void => {
    // Validação mais robusta para evitar o erro charAt
    if (message && typeof message === 'string' && message.trim().length > 0) {
      setToastMessage(message.trim());
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const toggleCreatine = (): void => {
    const newValue = !creatineChecked;
    setCreatineChecked(newValue);
    
    const message = newValue
      ? '✅ Creatina marcada como tomada!'
      : 'Creatina desmarcada';
    
    displayToast(message);
  };

  const startWorkout = (): void => {
    displayToast('🔥 Iniciando treino de Peito + Tríceps!');
  };

  const openAssistant = (): void => {
    displayToast('🤖 Assistente ativado! Como posso ajudar?');
  };

  const handleNotification = (): void => {
    setShowNotification(false);
    displayToast('📊 Redirecionando para avaliação física...');
  };

  return (
    <View style={styles.container}>
      {/* StatusBar melhorado para evitar warnings */}
      <StatusBar 
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
        hidden={false}
      />
      
      {/* View para dar background à StatusBar se necessário */}
      {Platform.OS === 'android' && (
        <View style={{
          height: StatusBar.currentHeight,
          backgroundColor: 'transparent',
        }} />
      )}
      
      {/* Toast com validação aprimorada */}
      {showToast && toastMessage && toastMessage.length > 0 && (
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