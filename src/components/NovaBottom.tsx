import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Image, ImageSourcePropType } from 'react-native';

// Types for better code maintainability and TypeScript support
interface TabItem {
    id: string;
    icon: ImageSourcePropType;
    onPress: () => void;
}

interface BottomTabBarProps {
    tabs: TabItem[];
    activeTabId?: string;
    backgroundImage?: ImageSourcePropType;
}

/**
 * BottomTabBar Component
 * 
 * A reusable bottom navigation component that displays tabs with icons.
 * Supports custom background image and active state styling.
 * 
 * @param tabs - Array of tab items with id, icon, and onPress function
 * @param activeTabId - ID of the currently active tab (optional)
 * @param backgroundImage - Custom background image for the tab bar (optional)
 */
const BottomTabBar: React.FC<BottomTabBarProps> = ({
    tabs,
    activeTabId,
    backgroundImage
}) => {

    /**
     * Renders individual tab item
     * @param tab - Tab item to render
     * @param index - Index of the tab for key prop
     */
    const renderTabItem = (tab: TabItem, index: number) => {
        const isActive = tab.id === activeTabId;

        return (
            <TouchableOpacity
                key={tab.id}
                style={[
                    styles.tabItem,
                    isActive && styles.activeTabItem
                ]}
                onPress={tab.onPress}
                activeOpacity={0.7}
            >
                <Image
                    source={tab.icon}
                    style={[
                        styles.tabIcon,
                        isActive && styles.activeTabIcon
                    ]}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {/* Background image if provided */}
            {backgroundImage && (
                <Image
                    source={backgroundImage}
                    style={styles.backgroundImage}
                    resizeMode="cover"
                />
            )}

            {/* Tab items container */}
            <View style={styles.tabsContainer}>
                {tabs.map((tab, index) => renderTabItem(tab, index))}
            </View>
        </View>
    );
};

// Stylesheet with responsive design considerations
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: TAB_BAR_HEIGHT,
        backgroundColor: DEFAULT_BACKGROUND_COLOR,
    },

    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },

    tabsContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: HORIZONTAL_PADDING,
        paddingBottom: BOTTOM_PADDING,
    },

    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: TAB_ITEM_VERTICAL_PADDING,
    },

    activeTabItem: {
        transform: [{ scale: ACTIVE_SCALE }],
    },

    tabIcon: {
        width: ICON_SIZE,
        height: ICON_SIZE,
        tintColor: INACTIVE_TINT_COLOR,
    },

    activeTabIcon: {
        tintColor: ACTIVE_TINT_COLOR,
    },
});

// Constants for better maintainability
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TAB_BAR_HEIGHT = 80;
const ICON_SIZE = 24;
const HORIZONTAL_PADDING = 20;
const BOTTOM_PADDING = 20;
const TAB_ITEM_VERTICAL_PADDING = 10;
const ACTIVE_SCALE = 1.1;

// Color constants
const DEFAULT_BACKGROUND_COLOR = '#2A2A2A';
const ACTIVE_TINT_COLOR = '#00FF88';
const INACTIVE_TINT_COLOR = '#8E8E93';

export default BottomTabBar;