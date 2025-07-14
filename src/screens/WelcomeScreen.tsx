import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

import type { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Welcome: undefined;
  Profile: undefined;
};

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

interface WelcomeScreenProps {
  navigation: WelcomeScreenNavigationProp;
}

const WelcomeScreen = ({ navigation }: WelcomeScreenProps) => {
  const handleGetStarted = () => {
    // Navegar para a próxima tela (exemplo: Profile)
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Imagem de fundo */}
        <ImageBackground
          source={{
            uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4vGglYNR5tzsgpVmCMyWyTfFHf28K6cavKfBUbFsNcg69M-loYUfI4NTXiIz-38VWbblsgBP-KJ2MD8lU4FvL2izGdFq4smM6uKecRpla22PSZJgKF1_5CWhZGm6H3lOBlxmInzfwYCcLdvp_nApJ-P7e1u8ScOwSi2lxpAUlmkdMPbPGlyI5ch52fCjh2BpLk3cd0-sK6ShPOwIIXrLAtd6lH8zq68mYzIAY1RxYDAiNf1tFiIj9Masc911sTYNcKrg-D7WHHRz_'
          }}
          style={styles.backgroundImage}
        />
        
        {/* Título */}
        <Text style={styles.title}>
          Bem-vindo ao seu novo estilo de vida
        </Text>
        
        {/* Descrição */}
        <Text style={styles.description}>
          Descubra um mundo de fitness personalizado, aulas envolventes e resultados incríveis. 
          Vamos começar sua jornada de transformação hoje mesmo!
        </Text>
      </View>
      
      {/* Botão */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleGetStarted}
        >
          <Text style={styles.buttonText}>Começar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  backgroundImage: {
    width: '100%',
    height: 320,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
    marginTop: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0e141b',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 38,
  },
  description: {
    fontSize: 16,
    color: '#0e141b',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 32,
  },
  button: {
    backgroundColor: '#1978e5',
    borderRadius: 12,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;