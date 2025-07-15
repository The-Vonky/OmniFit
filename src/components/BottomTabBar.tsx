// Versão corrigida do CustomBottomTabBar.tsx

import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Platform,
  Vibration,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const getTabIcon = ({ routeName, focused, color, size }) => {
  const icons = {
    home: ['home-outline', 'home'],
    workout: ['barbell-outline', 'barbell'],
    diet: ['restaurant-outline', 'restaurant'],
    progress: ['analytics-outline', 'analytics'],
    profile: ['person-outline', 'person'],
  };
  const [outline, filled] = icons[routeName] || ['ellipse-outline', 'ellipse'];
  return <Ionicons name={focused ? filled : outline} size={size} color={color} />;
};

const getTabLabel = (name) => {
  const labels = {
    home: 'HOME',
    workout: 'TREINO',
    diet: 'DIETA',
    progress: 'PROGRESSO',
    profile: 'PERFIL',
  };
  return labels[name] || name.toUpperCase();
};

const AnimatedTab = ({ route, index, focused, onPress, onLongPress }) => {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(focused ? 1 : 0)).current;
  const glow = useRef(new Animated.Value(focused ? 1 : 0)).current;

  useEffect(() => {
    if (focused) {
      Animated.parallel([
        Animated.spring(scale, { toValue: 1.15, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(glow, { toValue: 1, duration: 400, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }),
        Animated.timing(glow, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]).start();
    }
  }, [focused]);

  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress} style={styles.tabButton}>
      <Animated.View
        style={{
          transform: [{ scale }],
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Animated.View style={[styles.glow, { opacity: glow }]} />
        {getTabIcon({ routeName: route.name, focused, color: '#00FFF7', size: 26 })}
        <Animated.Text style={[styles.label, { opacity }]}>
          {getTabLabel(route.name)}
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const CustomBottomTabBar = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();
  const translateY = useRef(new Animated.Value(50)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.spring(translateY, { toValue: 0, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[styles.container, {
        paddingBottom: insets.bottom,
        transform: [{ translateY }],
        opacity,
      }]}
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name);
        };

        const onLongPress = () => navigation.emit({ type: 'tabLongPress', target: route.key });

        return (
          <AnimatedTab
            key={route.key}
            route={route}
            index={index}
            focused={isFocused}
            onPress={onPress}
            onLongPress={onLongPress}
          />
        );
      })}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#0D0D0D',
    height: 70,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#111',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  label: {
    marginTop: 4,
    fontSize: 10,
    color: '#00FFF7',
    fontFamily: Platform.OS === 'ios' ? 'Orbitron-Bold' : 'Orbitron-Bold',
  },
});

export default CustomBottomTabBar;