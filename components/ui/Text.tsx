import { useTheme } from '@/contexts/theme.provider';
import React from 'react';
import { Text as RNText, StyleSheet, TextProps, TextStyle, Dimensions, PixelRatio } from 'react-native';


// ========== scale function ==========
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const baseWidth = 393; // iPhone 14 Pro width
export function scaleFontSize(size: number) {
  const scale = SCREEN_WIDTH / baseWidth;
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

// ========== types ==========
type TextVariants =
  | 'display-lg'
  | 'display-md'
  | 'display-sm'
  | 'title-lg'
  | 'title-md'
  | 'title-sm'
  | 'heading-lg'
  | 'heading-md'
  | 'heading-sm'
  | 'body-xl'
  | 'body-lg'
  | 'body-md'
  | 'body-sm'
  | 'body-xs'
  | 'body-xxs'
  | 'body-2xs'
  | 'caption-xl-prominent'
  | 'caption-xl'
  | 'caption-lg-prominent'
  | 'caption-lg'
  | 'caption-md-prominent'
  | 'caption-md'
  | 'caption-sm-prominent'
  | 'caption-sm'
  | 'caption-xs-prominent'
  | 'caption-xs'
  | 'caption-xxs-prominent'
  | 'caption-2xs-prominent'
  | 'caption-xxs';

interface CustomTextProps extends TextProps {
  variant?: TextVariants;
}

// ========== typography ==========
const typography: Record<TextVariants, TextStyle> = StyleSheet.create({
  'display-lg': { fontFamily: 'Poppins_900Black', fontSize: scaleFontSize(64), fontWeight: '900', lineHeight: scaleFontSize(64), letterSpacing: -1 },
  'display-md': { fontFamily: 'Poppins_900Black', fontSize: scaleFontSize(56), fontWeight: '900', lineHeight: scaleFontSize(64), letterSpacing: -1 },
  'display-sm': { fontFamily: 'Poppins_900Black', fontSize: scaleFontSize(48), fontWeight: '900', lineHeight: scaleFontSize(56), letterSpacing: -1 },
  'title-lg': { fontFamily: 'Poppins_700Bold', fontSize: scaleFontSize(48), fontWeight: '700', lineHeight: scaleFontSize(56), letterSpacing: -1 },
  'title-md': { fontFamily: 'Poppins_700Bold', fontSize: scaleFontSize(40), fontWeight: '700', lineHeight: scaleFontSize(48), letterSpacing: -1 },
  'title-sm': { fontFamily: 'Poppins_700Bold', fontSize: scaleFontSize(36), fontWeight: '700', lineHeight: scaleFontSize(40), letterSpacing: -1 },
  'heading-lg': { fontFamily: 'Poppins_600SemiBold', fontSize: scaleFontSize(32), fontWeight: '600', lineHeight: scaleFontSize(36), letterSpacing: -0.5 },
  'heading-md': { fontFamily: 'Poppins_600SemiBold', fontSize: scaleFontSize(28), fontWeight: '600', lineHeight: scaleFontSize(32), letterSpacing: -0.5 },
  'heading-sm': { fontFamily: 'Poppins_600SemiBold', fontSize: scaleFontSize(24), fontWeight: '600', lineHeight: scaleFontSize(28), letterSpacing: -0.5 },
  'body-xl': { fontFamily: 'Poppins_400Regular', fontSize: scaleFontSize(20), fontWeight: '400', lineHeight: scaleFontSize(24), letterSpacing: -0.5 },
  'body-lg': { fontFamily: 'Poppins_400Regular', fontSize: scaleFontSize(18), fontWeight: '400', lineHeight: scaleFontSize(22), letterSpacing: -0.5 },
  'body-md': { fontFamily: 'Poppins_400Regular', fontSize: scaleFontSize(16), fontWeight: '400', lineHeight: scaleFontSize(20), letterSpacing: -0.5 },
  'body-sm': { fontFamily: 'Poppins_400Regular', fontSize: scaleFontSize(14), fontWeight: '400', lineHeight: scaleFontSize(18), letterSpacing: -0.5 },
  'body-xs': { fontFamily: 'Poppins_400Regular', fontSize: scaleFontSize(13), fontWeight: '400', lineHeight: scaleFontSize(16), letterSpacing: -0.5 },
  'body-xxs': { fontFamily: 'Poppins_400Regular', fontSize: scaleFontSize(12), fontWeight: '400', lineHeight: scaleFontSize(16), letterSpacing: -0.5 },
  'body-2xs': { fontFamily: 'Poppins_400Regular', fontSize: scaleFontSize(11), fontWeight: '400', lineHeight: scaleFontSize(16), letterSpacing: -0.5 },
  'caption-xl-prominent': { fontFamily: 'Poppins_600SemiBold', fontSize: scaleFontSize(20), fontWeight: '600', lineHeight: scaleFontSize(24), letterSpacing: -0.5 },
  'caption-xl': { fontFamily: 'Poppins_500Medium', fontSize: scaleFontSize(20), fontWeight: '500', lineHeight: scaleFontSize(24), letterSpacing: -0.5 },
  'caption-lg-prominent': { fontFamily: 'Poppins_600SemiBold', fontSize: scaleFontSize(18), fontWeight: '600', lineHeight: scaleFontSize(24), letterSpacing: -0.5 },
  'caption-lg': { fontFamily: 'Poppins_500Medium', fontSize: scaleFontSize(18), fontWeight: '500', lineHeight: scaleFontSize(24), letterSpacing: -0.5 },
  'caption-md-prominent': { fontFamily: 'Poppins_600SemiBold', fontSize: scaleFontSize(16), fontWeight: '600', lineHeight: scaleFontSize(20), letterSpacing: -0.5 },
  'caption-md': { fontFamily: 'Poppins_500Medium', fontSize: scaleFontSize(16), fontWeight: '500', lineHeight: scaleFontSize(20), letterSpacing: -0.5 },
  'caption-sm-prominent': { fontFamily: 'Poppins_600SemiBold', fontSize: scaleFontSize(14), fontWeight: '600', lineHeight: scaleFontSize(18), letterSpacing: -0.5 },
  'caption-sm': { fontFamily: 'Poppins_500Medium', fontSize: scaleFontSize(14), fontWeight: '500', lineHeight: scaleFontSize(18), letterSpacing: -0.5 },
  'caption-xs-prominent': { fontFamily: 'Poppins_600SemiBold', fontSize: scaleFontSize(13), fontWeight: '600', lineHeight: scaleFontSize(16), letterSpacing: -0.5 },
  'caption-xs': { fontFamily: 'Poppins_500Medium', fontSize: scaleFontSize(13), fontWeight: '500', lineHeight: scaleFontSize(16), letterSpacing: -0.5 },
  'caption-xxs-prominent': { fontFamily: 'Poppins_600SemiBold', fontSize: scaleFontSize(12), fontWeight: '600', lineHeight: scaleFontSize(16), letterSpacing: -0.5 },
  'caption-2xs-prominent': { fontFamily: 'Poppins_600SemiBold', fontSize: scaleFontSize(11), fontWeight: '600', lineHeight: scaleFontSize(16), letterSpacing: -0.5 },
  'caption-xxs': { fontFamily: 'Poppins_500Medium', fontSize: scaleFontSize(12), fontWeight: '500', lineHeight: scaleFontSize(16), letterSpacing: -0.5 },
});

// ========== component ==========
const Text: React.FC<CustomTextProps> = ({ variant = 'body-md', style, children, ...props }) => {
  const { themeColors } = useTheme();

  return (
    <RNText style={[typography[variant], { color: themeColors.neutral800 }, style]} {...props}>
      {children}
    </RNText>
  );
};

export default Text;
