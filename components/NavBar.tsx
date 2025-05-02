import { useTheme } from '@/contexts/theme.provider';
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import Text from './ui/Text';

interface NavbarProps {
  title: string;
  showGoBack?: boolean;
  onGoBack?: () => void;
  endIcons?: {
    icon: React.ReactNode;
    onPress: () => void;
  }[]; // Each icon has an associated onPress function
}

const Navbar: React.FC<NavbarProps> = ({
  title,
  showGoBack = false,
  onGoBack,
  endIcons = []
}) => {

  // ============= hooks 
  const { themeColors } = useTheme()










  // ============ render

  return (
    <View style={[styles.container, {
      backgroundColor: themeColors.primary600
    }]}>
      {/* Left Section: Back Icon and Title */}
      <View style={styles.leftSection}>
        {showGoBack && (
          <TouchableOpacity onPress={onGoBack} style={styles.iconButton}>
            <ChevronLeftIcon size={24} color="black" />
          </TouchableOpacity>
        )}
        <Text variant='caption-lg' style={{
          color: themeColors.white,
          textAlign: 'left'
        }} >{title}</Text>
      </View>


      {/* Right Section: Multiple Icons */}
      <View style={styles.rightSection}>
        {endIcons.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={item.onPress}
            style={styles.iconButton}
          >
            {item.icon}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default Navbar;
