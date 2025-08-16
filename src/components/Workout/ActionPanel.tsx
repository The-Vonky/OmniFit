import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const ActionPanel: React.FC = () => {
  return (
    <View style={styles.actionPanel}>
      <TouchableOpacity style={styles.actionButton}>
        <LinearGradient
          colors={['rgba(0,255,247,0.2)', 'rgba(0,255,247,0.1)']}
          style={styles.actionButtonGradient}
        >
          <Ionicons name="musical-notes" size={18} color="#00FFF7" />
        </LinearGradient>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.actionButton}>
        <LinearGradient
          colors={['rgba(139,92,246,0.2)', 'rgba(139,92,246,0.1)']}
          style={styles.actionButtonGradient}
        >
          <Ionicons name="help-circle" size={18} color="#8B5CF6" />
        </LinearGradient>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.actionButton}>
        <LinearGradient
          colors={['rgba(236,72,153,0.2)', 'rgba(236,72,153,0.1)']}
          style={styles.actionButtonGradient}
        >
          <Ionicons name="settings" size={18} color="#EC4899" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  actionPanel: {
    position: 'absolute',
    right: 20,
    top: '50%',
    transform: [{ translateY: -60 }],
    zIndex: 1000,
  },
  actionButton: {
    marginVertical: 8,
    borderRadius: 20,
    overflow: 'hidden',
  },
  actionButtonGradient: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
});

export default ActionPanel;