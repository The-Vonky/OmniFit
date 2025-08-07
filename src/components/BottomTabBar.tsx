import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export type TabType = 'home' | 'workout' | 'diet' | 'progress' | 'others';

interface BottomTabBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function BottomTabBar({ activeTab, onTabChange }: BottomTabBarProps) {
  const tabs = [
    { id: 'home' as TabType, icon: 'home-outline', activeIcon: 'home', label: 'Home' },
    { id: 'workout' as TabType, icon: 'barbell-outline', activeIcon: 'barbell', label: 'Treino' },
    { id: 'diet' as TabType, icon: 'nutrition-outline', activeIcon: 'nutrition', label: 'Dieta' },
    { id: 'progress' as TabType, icon: 'trending-up-outline', activeIcon: 'trending-up', label: 'Progresso' },
    { id: 'others' as TabType, icon: 'ellipsis-horizontal-outline', activeIcon: 'ellipsis-horizontal', label: 'Outros' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const iconName = isActive ? tab.activeIcon : tab.icon;
          
          return (
            <TouchableOpacity
              key={tab.id}
              onPress={() => onTabChange(tab.id)}
              style={[
                styles.tabButton,
                isActive ? styles.activeTabButton : styles.inactiveTabButton
              ]}
              activeOpacity={0.7}
            >
              <Ionicons
                name={iconName as any}
                size={20}
                color={isActive ? '#A259FF' : '#8E8E93'}
              />
              <Text style={[
                styles.tabLabel,
                isActive ? styles.activeTabLabel : styles.inactiveTabLabel
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(26, 26, 46, 0.95)',
    borderTopWidth: 1,
    borderTopColor: '#2D2D44',
    paddingHorizontal: 16,
    paddingVertical: 8,
    // Backdrop blur effect simulation
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  tabButton: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
    minWidth: 60,
  },
  activeTabButton: {
    backgroundColor: 'rgba(162, 89, 255, 0.2)',
  },
  inactiveTabButton: {
    backgroundColor: 'transparent',
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  activeTabLabel: {
    color: '#A259FF',
  },
  inactiveTabLabel: {
    color: '#8E8E93',
  },
});

export default BottomTabBar;