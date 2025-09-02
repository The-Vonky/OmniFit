import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type AuthChoiceScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AuthChoice'>;

interface Props {
  navigation: AuthChoiceScreenNavigationProp;
}

export default function AuthChoiceScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Como deseja continuar?</Text>
      
      <TouchableOpacity 
        style={styles.primaryButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Fazer Login</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.buttonText}>Criar Conta</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.tertiaryButton}
        onPress={() => navigation.navigate('GuestWarning')}
      >
        <Text style={styles.tertiaryButtonText}>Testar sem Conta</Text>
      </TouchableOpacity>
    </View>
  );
}