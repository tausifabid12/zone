import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { Platform, Pressable } from 'react-native';

// import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useTheme } from '@/contexts/theme.provider';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import * as Haptics from 'expo-haptics';
import { Headphones, House, LayoutGrid, ShoppingCart } from 'lucide-react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

function HapticTab({ children, onPress, accessibilityState }: any) {
  const isSelected = accessibilityState?.selected;

  const handlePress = () => {
    if (!isSelected) {
      Haptics.selectionAsync(); // optional: gives haptic feedback when switching tab
    }
    onPress?.();
  };

  return (
    <Pressable
      onPress={handlePress}
      android_ripple={null}
      style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}
    >
      {children}
    </Pressable>
  );
}

export default function TabLayout({ children }: any) {
  const colorScheme = useColorScheme();
  const { themeColors } = useTheme();
  // const [fullAppLoading, setFullAppLoading] = useState(false)

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: themeColors.primary600,
        tabBarInactiveTintColor: themeColors.neutral600,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            height: 55,
            paddingBottom: 10,
          },
          android: {
            height: 55,
            // paddingBottom: 10,
            paddingTop: 5,

            borderTopWidth: 0,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 100, // shadow from top of the tab
            },
            shadowOpacity: 1,
            shadowRadius: 100,
            elevation: 40, // for Android
          },
          default: {
            height: 80, // Set the height for other platforms
          },
        }),
      }}


    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            focused ? <MaterialIcons name={'home-filled'} size={23} color={color} />
              : <MaterialCommunityIcons name={'home-variant-outline'} size={23} color={color} />

          ),
        }}
      />

      <Tabs.Screen
        name="select-category-screen"
        options={{
          title: 'Category',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name={focused ? 'view-grid' : 'view-grid-outline'} size={23} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="cart-screen"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name={'cart-outline'} size={23} color={color} />
          ),
          tabBarStyle: { display: 'none' },
        }}
      />

      <Tabs.Screen
        name="help-center-screen"
        options={{
          title: 'Support',
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name={'headset-mic'} size={23} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
