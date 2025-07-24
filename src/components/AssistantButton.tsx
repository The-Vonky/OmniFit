import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from './Styles';

interface AssistantButtonProps {
  onPress: () => void;
}

export default function AssistantButton({ onPress }: AssistantButtonProps) {
  return (
    <TouchableOpacity style={styles.assistantBtn} onPress={onPress}>
      <View style={styles.assistantBtnGradient}>
        <Text style={styles.assistantIcon}>🤖</Text>
      </View>
    </TouchableOpacity>
  );
}