import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GlowingCard } from './GlowingCard';
import { styles } from './Styles';

interface CreatineReminderProps {
  creatineChecked: boolean;
  onToggleCreatine: () => void;
}

export const CreatineReminder: React.FC<CreatineReminderProps> = ({ 
  creatineChecked, 
  onToggleCreatine 
}) => {
  return (
    <GlowingCard delay={300} glowColor="#10B981">
      <View style={styles.reminderCard}>
        <View style={styles.reminderInfo}>
          <Text style={styles.reminderTitle}>Lembrete de Creatina</Text>
          <Text style={styles.reminderSubtitle}>Você já tomou sua creatina hoje?</Text>
        </View>
        <TouchableOpacity
          style={[styles.checkButton, creatineChecked && styles.checkButtonChecked]}
          onPress={onToggleCreatine}
        >
          {creatineChecked && <Text style={styles.checkMark}>✓</Text>}
        </TouchableOpacity>
      </View>
    </GlowingCard>
  );
};

export default CreatineReminder;