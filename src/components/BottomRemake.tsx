import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TabItem {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  activeIcon?: keyof typeof Ionicons.glyphMap;
}

interface BottomTabBarProps {
  onTabPress?: (tabId: string) => void;
  activeTab?: string;
}

const BottomTabBar: React.FC<BottomTabBarProps> = ({ 
  onTabPress, 
  activeTab: controlledActiveTab 
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState('home');
  
  // Use controlled activeTab if provided, otherwise use internal state
  const activeTab = controlledActiveTab || internalActiveTab;

  const tabs: TabItem[] = [
    { id: 'home', icon: 'home-outline', activeIcon: 'home' },
    { id: 'fitness', icon: 'fitness-outline', activeIcon: 'fitness' },
    { id: 'camera', icon: 'camera-outline', activeIcon: 'camera' },
    { id: 'restaurant', icon: 'restaurant-outline', activeIcon: 'restaurant' },
    { id: 'person', icon: 'person-outline', activeIcon: 'person' },
  ];

  const handleTabPress = (tabId: string) => {
    if (!controlledActiveTab) {
      setInternalActiveTab(tabId);
    }
    onTabPress?.(tabId);
  };

  const getTabStyle = (tabId: string) => {
    const isActive = activeTab === tabId;
    return [
      styles.tab,
      isActive && styles.activeTab
    ];
  };

  const getIconColor = (tabId: string) => {
    const isActive = activeTab === tabId;
    return isActive ? '#4ADE80' : '#6B7280';
  };

  const getIconName = (tab: TabItem) => {
    const isActive = activeTab === tab.id;
    return isActive && tab.activeIcon ? tab.activeIcon : tab.icon;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={getTabStyle(tab.id)}
            onPress={() => handleTabPress(tab.id)}
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>
              <Ionicons
                name={getIconName(tab)}
                size={24}
                color={getIconColor(tab.id)}
              />
              {activeTab === tab.id && <View style={styles.activeIndicator} />}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#1F2937',
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#1F2937',
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  activeTab: {
    // Adicione estilos específicos para a aba ativa se necessário
  },
  iconContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    top: -6,
    width: 32,
    height: 3,
    backgroundColor: '#FBBF24',
    borderRadius: 2,
  },
});

export default BottomTabBar;