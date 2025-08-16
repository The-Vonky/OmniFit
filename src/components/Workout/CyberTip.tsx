import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const CyberTip: React.FC = () => {
  return (
    <View style={styles.tipContainer}>
      <LinearGradient
        colors={['rgba(245,158,11,0.1)', 'rgba(245,158,11,0.05)']}
        style={styles.tipCard}
      >
        <View style={styles.tipIcon}>
          <Ionicons name="flash" size={18} color="#F59E0B" />
        </View>
        <View style={styles.tipContent}>
          <Text style={styles.tipTitle}>DICA NEURAL</Text>
          <Text style={styles.tipText}>
            Otimize o protocolo de recuperação com sequência de alongamento pós-treino
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  tipContainer: {
    paddingHorizontal: 20,
    marginVertical: 12,
  },
  tipCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
    alignItems: 'center',
  },
  tipIcon: {
    marginRight: 12,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    color: '#F59E0B',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 4,
  },
  tipText: {
    color: 'rgba(245, 158, 11, 0.9)',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18,
  },
});

export default CyberTip;