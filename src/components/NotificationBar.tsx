import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GlowingCard } from './GlowingCard';
import { styles } from './Styles';

interface NotificationBarProps {
  message: string;
  onPress: () => void;
}

export const NotificationBar: React.FC<NotificationBarProps> = ({ message, onPress }) => {
  return (
    <GlowingCard delay={350} glowColor="#EF4444">
      <TouchableOpacity onPress={onPress}>
        <View style={styles.notificationBar}>
          <View style={styles.notificationIcon}>
            <Text style={styles.notificationIconText}>📊</Text>
          </View>
          <Text style={styles.notificationText}>{message}</Text>
        </View>
      </TouchableOpacity>
    </GlowingCard>
  );
};