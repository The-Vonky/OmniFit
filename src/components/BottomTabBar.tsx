import React, { useEffect, useRef } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Animated,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const getTabIcon = ({ routeName, focused, color, size }) => {
  // Validação para evitar undefined
  const safeName = routeName || '';
  
  const icons = {
    home: ['home-outline', 'home'],
    workout: ['barbell-outline', 'barbell'],
    diet: ['restaurant-outline', 'restaurant'],
    progress: ['analytics-outline', 'analytics'],
    profile: ['person-outline', 'person'],
  };
  
  const [outline, filled] = icons[safeName] || ['ellipse-outline', 'ellipse'];
  return <Ionicons name={focused ? filled : outline} size={size} color={color} />;
};

const getTabLabel = (name) => {
  // Validação robusta para evitar charAt de undefined
  if (!name || typeof name !== 'string') {
    return 'TAB';
  }
  
  const labels = {
    home: 'HOME',
    workout: 'TREINO',
    diet: 'DIETA',
    progress: 'PROGRESSO',
    profile: 'PERFIL',
  };
  
  return labels[name] || name.toUpperCase();
};

const AnimatedTab = ({ route, focused, onPress, onLongPress }) => {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(focused ? 1 : 0)).current;

  useEffect(() => {
    if (focused) {
      Animated.parallel([
        Animated.spring(scale, { 
          toValue: 1.15, 
          useNativeDriver: true,
          tension: 100,
          friction: 8
        }),
        Animated.timing(opacity, { 
          toValue: 1, 
          duration: 300, 
          useNativeDriver: true 
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(scale, { 
          toValue: 1, 
          useNativeDriver: true,
          tension: 100,
          friction: 8
        }),
        Animated.timing(opacity, { 
          toValue: 0, 
          duration: 200, 
          useNativeDriver: true 
        }),
      ]).start();
    }
  }, [focused, scale, opacity]);

  // Validação adicional para route
  if (!route || !route.name) {
    return null;
  }

  return (
    <TouchableOpacity 
      onPress={onPress} 
      onLongPress={onLongPress} 
      style={styles.tabButton}
      activeOpacity={0.7}
    >
      <Animated.View
        style={{
          transform: [{ scale }],
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {getTabIcon({ 
          routeName: route.name, 
          focused, 
          color: focused ? '#00FFF7' : '#666', 
          size: 26 
        })}
        <Animated.Text style={[styles.label, { 
          opacity,
          color: focused ? '#00FFF7' : '#666'
        }]}>
          {getTabLabel(route.name)}
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const BottomTabBar = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();
  const translateY = useRef(new Animated.Value(50)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { 
        toValue: 1, 
        duration: 500, 
        useNativeDriver: true 
      }),
      Animated.spring(translateY, { 
        toValue: 0, 
        useNativeDriver: true,
        tension: 100,
        friction: 8
      }),
    ]).start();
  }, [opacity, translateY]);

  // Validação para state e routes
  if (!state || !state.routes || !Array.isArray(state.routes)) {
    return null;
  }

  return (
    <Animated.View
      style={[styles.container, {
        paddingBottom: Math.max(insets.bottom, 10),
        transform: [{ translateY }],
        opacity,
      }]}
    >
      {state.routes.map((route, index) => {
        // Validação adicional para cada route
        if (!route || !route.key || !route.name) {
          return null;
        }

        const isFocused = state.index === index;

        const onPress = () => {
          try {
            const event = navigation.emit({ 
              type: 'tabPress', 
              target: route.key, 
              canPreventDefault: true 
            });
            
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          } catch (error) {
            console.warn('Erro na navegação:', error);
          }
        };

        const onLongPress = () => {
          try {
            navigation.emit({ 
              type: 'tabLongPress', 
              target: route.key 
            });
          } catch (error) {
            console.warn('Erro no longPress:', error);
          }
        };

        return (
          <AnimatedTab
            key={route.key}
            route={route}
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
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
    fontFamily: Platform.OS === 'ios' ? 'Orbitron-Bold' : 'Orbitron-Bold',
    textAlign: 'center',
  },
});

export default BottomTabBar;