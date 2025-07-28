import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TipCardProps {
  tip: string;
}

const TipCard: React.FC<TipCardProps> = ({ tip }) => {
  return (
    <View style={[styles.card, styles.glowPink]}>
      <View style={styles.topBorder} />
      <View style={styles.content}>
        <Text style={styles.label}>💡 DICA NUTRICIONAL</Text>
        <Text style={styles.tip}>{tip}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#18181B',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EC489950',
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  glowPink: {
    borderColor: '#EC4899',
  },
  topBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#EC4899',
    opacity: 0.6,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  content: {
    alignItems: 'center',
  },
  label: {
    color: '#F9A8D4',
    fontWeight: '700',
    fontSize: 12,
    marginBottom: 8,
    letterSpacing: 1.5,
  },
  tip: {
    color: '#D1D5DB',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
});

export default TipCard;