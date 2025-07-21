import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { styles } from './Styles';

interface GlowingCardProps {
  children: React.ReactNode;
  style?: any;
  delay?: number;
  glowColor?: string;
}

export const GlowingCard: React.FC<GlowingCardProps> = ({ 
  children, 
  style, 
  delay = 0, 
  glowColor = '#00FFF7' 
}) => {
  const cardAnimation = useRef(new Animated.Value(0)).current;
  const glowAnimation = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.timing(cardAnimation, {
      toValue: 1,
      duration: 600,
      delay: delay,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnimation, {
          toValue: 0.3,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        {
          opacity: cardAnimation,
          transform: [
            {
              translateY: cardAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [30, 0],
              }),
            },
          ],
        },
        style,
      ]}
    >
      <View style={[styles.card, { 
        borderColor: glowColor,
        shadowColor: glowColor,
      }]}>
        <Animated.View 
          style={[
            styles.cardGlow, 
            { 
              backgroundColor: glowColor,
              opacity: glowAnimation,
            }
          ]} 
        />
        {children}
      </View>
    </Animated.View>
  );
};