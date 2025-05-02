import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Pressable } from 'react-native';

// import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useTheme } from '@/contexts/theme.provider';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import * as Haptics from 'expo-haptics';
import {
  HomeIcon as HomeIconSolid,
  ShoppingCartIcon as ShoppingCartIconSolid,
  ArrowLeftIcon as ArrowLeftIconSolid,
  Squares2X2Icon as Squares2X2IconSolid,
  ArrowLeftCircleIcon as ArrowLeftCircleIconSolid,
  ChatBubbleLeftIcon,

} from 'react-native-heroicons/solid';
import { ArrowDownCircleIcon, ArrowLeftCircleIcon, ShoppingCartIcon, Squares2X2Icon } from 'react-native-heroicons/outline';


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
            height: 50,
          },
          android: {
            height: 65,
            paddingBottom: 10,
            paddingTop: 5,
            borderTopWidth: 0, // hide default border
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
      {/* <Tabs.Screen
        name="select-delivery-type"
        options={{
          title: 'Back',
          tabBarIcon: ({ color }) => <ArrowLeftCircleIcon size={22} color={color} />,
        }}
      /> */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <HomeIconSolid size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="select-category-screen"
        options={{
          title: 'Category',
          tabBarIcon: ({ color }) => <Squares2X2Icon size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart-screen"
        options={{
          title: 'cart',
          tabBarIcon: ({ color }) => <ShoppingCartIcon size={22} color={color} />,
          tabBarStyle: { display: 'none' },
        }}
      />
      {/* <Tabs.Screen
        name="cart-screen"
        options={{
          title: 'cart',
          tabBarIcon: ({ color }) => <ShoppingCartIcon size={22} color={color} />,
          tabBarStyle: { display: 'none' },
        }}
      /> */}
      <Tabs.Screen
        name="help-center-screen"
        options={{
          title: 'Support',
          tabBarIcon: ({ color }) => <FontAwesome5 name="headphones-alt" size={22} color={color} />,
          // tabBarStyle: { display: 'none' },
        }}
      />

      {/* <Tabs.Screen
        name="restaurant"
        options={{
          title: 'restaurant',
          tabBarIcon: ({ color }) => <IconSymbol size={22} name="paperplane.fill" color={themeColors.primary100} />,
        }}
      /> */}
    </Tabs>
  );
}
