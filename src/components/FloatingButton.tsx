import React from 'react';
import { TouchableOpacity, StyleSheet, Text, GestureResponderEvent } from 'react-native';

interface FABProps {
  onPress: (event: GestureResponderEvent) => void;
  icon: string;
  accessibilityLabel?: string;
}

const FloatingButton: React.FC<FABProps> = ({ onPress, icon, accessibilityLabel }) => {
  return (
    <TouchableOpacity
      style={styles.fab}
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}
      activeOpacity={0.7}
    >
      <Text style={styles.icon}>{icon}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 32,
    right: 20,
    width: 56,
    height: 56,
    backgroundColor: '#7C3AED',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  icon: {
    fontSize: 28,
    color: 'white',
  },
});

export default FloatingButton;