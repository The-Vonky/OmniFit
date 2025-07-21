import React from 'react';
import { View, Text, Animated } from 'react-native';
import { styles } from './Styles';

interface ToastProps {
  message: string;
  show: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, show }) => {
  if (!show) return null;

  return (
    <Animated.View style={[styles.toast, { opacity: show ? 1 : 0 }]}>
      <View style={styles.toastContent}>
        <Text style={styles.toastText}>{message}</Text>
      </View>
    </Animated.View>
  );
};