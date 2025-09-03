import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

const CustomTabBar: React.FC<TabBarProps> = ({ state, descriptors, navigation }) => {
  const screenWidth = Dimensions.get('window').width;

  const getTabIcon = (routeName: string, focused: boolean) => {
    let iconName: keyof typeof Ionicons.glyphMap;
    
    switch (routeName) {
      case 'Home':
        iconName = focused ? 'home' : 'home-outline';
        break;
      case 'Profile':
        iconName = focused ? 'person' : 'person-outline';
        break;
      case 'AI':
        iconName = 'add';
        break;
      case 'Games':
        iconName = focused ? 'game-controller' : 'game-controller-outline';
        break;
      case 'Account':
        iconName = focused ? 'person-circle' : 'person-circle-outline';
        break;
      default:
        iconName = 'home-outline';
    }
    
    return iconName;
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.95)']}
        style={styles.tabBar}
      >
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel !== undefined 
            ? options.tabBarLabel 
            : options.title !== undefined 
            ? options.title 
            : route.name;

          const isFocused = state.index === index;
          const isAITab = route.name === 'AI';

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          if (isAITab) {
            return (
              <TouchableOpacity
                key={index}
                onPress={onPress}
                style={styles.aiTabContainer}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#6C63FF', '#4F46E5']}
                  style={styles.aiTab}
                >
                  <Ionicons 
                    name={getTabIcon(route.name, isFocused)} 
                    size={24} 
                    color="white" 
                  />
                </LinearGradient>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={styles.tabButton}
              activeOpacity={0.7}
            >
              <View style={[
                styles.iconContainer,
                isFocused && styles.focusedIconContainer
              ]}>
                <Ionicons 
                  name={getTabIcon(route.name, isFocused)} 
                  size={24} 
                  color={isFocused ? '#6C63FF' : '#8E8E93'} 
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabBar: {
    flexDirection: 'row',
    height: 90,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  focusedIconContainer: {
    backgroundColor: 'rgba(108, 99, 255, 0.15)',
  },
  aiTabContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20,
  },
  aiTab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6C63FF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default CustomTabBar;