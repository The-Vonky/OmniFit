import React from 'react';
import { View, Text, Animated } from 'react-native';
import { GlowingCard } from './GlowingCard';
import { styles } from './Styles';

interface HeaderProps {
  userName: string;
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
}

export const Header: React.FC<HeaderProps> = ({ userName, fadeAnim, slideAnim }) => {
  return (
    <Animated.View 
      style={[
        styles.header,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }
      ]}
    >
      <GlowingCard style={styles.greetingCard} delay={100}>
        <View style={styles.greetingContent}>
          <View style={styles.greetingInfo}>
            <Text style={styles.greetingTitle}>Bom dia, {userName}! 👋</Text>
            <Text style={styles.greetingSubtitle}>Pronto para mais um dia incrível?</Text>
          </View>
          <View style={styles.profileAvatar}>
            <Text style={styles.avatarText}>{userName.charAt(0).toUpperCase()}</Text>
          </View>
        </View>
      </GlowingCard>
    </Animated.View>
  );
};

export default Header;