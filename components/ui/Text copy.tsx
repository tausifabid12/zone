import React from 'react';
import { Text as RNText, TextStyle, StyleSheet, TextProps } from 'react-native';

import { useTheme } from '@/contexts/theme.provider';

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
  | 'caption-xxs';

interface CustomTextProps extends TextProps {
  variant?: TextVariants;
}

const typography: Record<TextVariants, TextStyle> = StyleSheet.create({
  'display-lg': { fontFamily: 'Poppins_900Black', fontSize: 64, fontWeight: '900', lineHeight: 64, letterSpacing: -1 },
  'display-md': { fontFamily: 'Poppins_900Black', fontSize: 56, fontWeight: '900', lineHeight: 64, letterSpacing: -1 },
  'display-sm': { fontFamily: 'Poppins_900Black', fontSize: 48, fontWeight: '900', lineHeight: 56, letterSpacing: -1 },
  'title-lg': { fontFamily: 'Poppins_700Bold', fontSize: 48, fontWeight: '700', lineHeight: 56, letterSpacing: -1 },
  'title-md': { fontFamily: 'Poppins_700Bold', fontSize: 40, fontWeight: '700', lineHeight: 48, letterSpacing: -1 },
  'title-sm': { fontFamily: 'Poppins_700Bold', fontSize: 36, fontWeight: '700', lineHeight: 40, letterSpacing: -1 },
  'heading-lg': { fontFamily: 'Poppins_600SemiBold', fontSize: 32, fontWeight: '600', lineHeight: 36, letterSpacing: -0.5 },
  'heading-md': { fontFamily: 'Poppins_600SemiBold', fontSize: 28, fontWeight: '600', lineHeight: 32, letterSpacing: -0.5 },
  'heading-sm': { fontFamily: 'Poppins_600SemiBold', fontSize: 24, fontWeight: '600', lineHeight: 28, letterSpacing: -0.5 },
  'body-xl': { fontFamily: 'Poppins_400Regular', fontSize: 20, fontWeight: '400', lineHeight: 24, letterSpacing: -0.5 },
  'body-lg': { fontFamily: 'Poppins_400Regular', fontSize: 18, fontWeight: '400', lineHeight: 22, letterSpacing: -0.5 },
  'body-md': { fontFamily: 'Poppins_400Regular', fontSize: 16, fontWeight: '400', lineHeight: 20, letterSpacing: -0.5 },
  'body-sm': { fontFamily: 'Poppins_400Regular', fontSize: 14, fontWeight: '400', lineHeight: 18, letterSpacing: -0.5 },
  'body-xs': { fontFamily: 'Poppins_400Regular', fontSize: 13, fontWeight: '400', lineHeight: 16, letterSpacing: -0.5 },
  'body-xxs': { fontFamily: 'Poppins_400Regular', fontSize: 12, fontWeight: '400', lineHeight: 16, letterSpacing: -0.5 },
  'caption-xl-prominent': { fontFamily: 'Poppins_600SemiBold', fontSize: 20, fontWeight: '600', lineHeight: 24, letterSpacing: -0.5 },
  'caption-xl': { fontFamily: 'Poppins_500Medium', fontSize: 20, fontWeight: '500', lineHeight: 24, letterSpacing: -0.5 },
  'caption-lg-prominent': { fontFamily: 'Poppins_600SemiBold', fontSize: 18, fontWeight: '600', lineHeight: 24, letterSpacing: -0.5 },
  'caption-lg': { fontFamily: 'Poppins_500Medium', fontSize: 18, fontWeight: '500', lineHeight: 24, letterSpacing: -0.5 },
  'caption-md-prominent': { fontFamily: 'Poppins_600SemiBold', fontSize: 16, fontWeight: '600', lineHeight: 20, letterSpacing: -0.5 },
  'caption-md': { fontFamily: 'Poppins_500Medium', fontSize: 16, fontWeight: '500', lineHeight: 20, letterSpacing: -0.5 },
  'caption-sm-prominent': { fontFamily: 'Poppins_600SemiBold', fontSize: 14, fontWeight: '600', lineHeight: 18, letterSpacing: -0.5 },
  'caption-sm': { fontFamily: 'Poppins_500Medium', fontSize: 14, fontWeight: '500', lineHeight: 18, letterSpacing: -0.5 },
  'caption-xs-prominent': { fontFamily: 'Poppins_600SemiBold', fontSize: 13, fontWeight: '600', lineHeight: 16, letterSpacing: -0.5 },
  'caption-xs': { fontFamily: 'Poppins_500Medium', fontSize: 13, fontWeight: '500', lineHeight: 16, letterSpacing: -0.5 },
  'caption-xxs-prominent': { fontFamily: 'Poppins_600SemiBold', fontSize: 12, fontWeight: '600', lineHeight: 16, letterSpacing: -0.5 },
  'caption-xxs': { fontFamily: 'Poppins_500Medium', fontSize: 12, fontWeight: '500', lineHeight: 16, letterSpacing: -0.5 },
});

const Text: React.FC<CustomTextProps> = ({ variant = 'body-md', style, children, ...props }) => {


  // ========== hooks 
  const { themeColors } = useTheme()

  return (
    <RNText style={[typography[variant], { color: themeColors.neutral800 }, style]} {...props}>
      {children}
    </RNText>
  );
};

export default Text;
