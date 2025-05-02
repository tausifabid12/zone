import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Appearance, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeMode = 'light' | 'dark';

interface ThemeColors {
  primary50: string;
  primary100: string;
  primary200: string;
  primary300: string;
  primary400: string;
  primary500: string;
  primary600: string;
  primary700: string;
  primary800: string;
  primary900: string;
  secondary50: string;
  secondary100: string;
  secondary200: string;
  secondary300: string;
  secondary400: string;
  secondary500: string;
  secondary600: string;
  secondary700: string;
  secondary800: string;
  secondary900: string;
  neutral50: string;
  neutral100: string;
  neutral200: string;
  neutral300: string;
  neutral400: string;
  neutral500: string;
  neutral600: string;
  neutral700: string;
  neutral800: string;
  neutral900: string;
  success50: string;
  success100: string;
  success200: string;
  success300: string;
  success400: string;
  success500: string;
  success600: string;
  success700: string;
  success800: string;
  success900: string;
  warning50: string;
  warning100: string;
  warning200: string;
  warning300: string;
  warning400: string;
  warning500: string;
  warning600: string;
  warning700: string;
  warning800: string;
  warning900: string;
  error50: string;
  error100: string;
  error200: string;
  error300: string;
  error400: string;
  error500: string;
  error600: string;
  error700: string;
  error800: string;
  error900: string;
  info50: string;
  info100: string;
  info200: string;
  info300: string;
  info400: string;
  info500: string;
  info600: string;
  info700: string;
  info800: string;
  info900: string;
  info950: string
  background: string;
  text: string;
  white: string;
  orange900: string

}

interface ThemeContextType {
  theme: ThemeMode;
  themeColors: ThemeColors;
  toggleTheme: () => void;
}

const Colors = {
  light: {
    primary50: '#EEF2FF',
    primary100: '#E0E7FF',
    primary200: '#C7D2FE',
    primary300: '#A5B4FC',
    primary400: '#818CF8',
    primary500: '#6366F1',
    primary600: '#4F46E5',
    primary700: '#4338CA',
    primary800: '#3730A3',
    primary900: '#312E81',
    secondary50: '#F2F2F1',
    secondary100: '#DAD7D4',
    secondary200: '#BCAFA2',
    secondary300: '#AB947D',
    secondary400: '#A4876B',
    secondary500: '#92775E',
    secondary600: '#7D6855',
    secondary700: '#69554C',
    secondary800: '#423836',
    secondary900: '#201D1C',
    neutral50: '#F8FAFC',
    neutral100: '#F1F5F9',
    neutral200: '#E2E8F0',
    neutral300: '#CBD5E1',
    neutral400: '#94A3B8',
    neutral500: '#64748B',
    neutral600: '#475569',
    neutral700: '#334155',
    neutral800: '#1E293B',
    neutral900: '#0F172A',
    success50: '#F0FDF4',
    success100: '#DCFCE7',
    success200: '#BBF7D0',
    success300: '#86EFAC',
    success400: '#4ADE80',
    success500: '#22C55E',
    success600: '#16A34A',
    success700: '#166534',
    success800: '#15803D',
    success900: '#14532D',
    warning50: '#FFFBEB',
    warning100: '#FEF3C7',
    warning200: '#FDE68A',
    warning300: '#FCD34D',
    warning400: '#FBBF24',
    warning500: '#F59E0B',
    warning600: '#D97706',
    warning700: '#B45309',
    warning800: '#92400E',
    warning900: '#78350F',
    error50: '#FEF2F2',
    error100: '#FEE2E2',
    error200: '#FECACA',
    error300: '#FCA5A5',
    error400: '#F87171',
    error500: '#EF4444',
    error600: '#DC2626',
    error700: '#B91C1C',
    error800: '#991B1B',
    error900: '#7F1D1D',
    info50: '#EFF6FF',
    info100: '#DBEAFE',
    info200: '#BFDBFE',
    info300: '#93C5FD',
    info400: '#60A5FA',
    info500: '#3B82F6',
    info600: '#2563EB',
    info700: '#1D4ED8',
    info800: '#1E40AF',
    info900: '#1E3A8A',
    info950: '#172554',
    background: '#FFFFFF',
    text: '#000000',
    white: '#FFFFFF',
    orange900: '#FF8C01'
  },
  dark: {
    primary50: '#EEF2FF',
    primary100: '#E0E7FF',
    primary200: '#C7D2FE',
    primary300: '#A5B4FC',
    primary400: '#818CF8',
    primary500: '#6366F1',
    primary600: '#4F46E5',
    primary700: '#4338CA',
    primary800: '#3730A3',
    primary900: '#312E81',
    secondary50: '#F2F2F1',
    secondary100: '#DAD7D4',
    secondary200: '#BCAFA2',
    secondary300: '#AB947D',
    secondary400: '#A4876B',
    secondary500: '#92775E',
    secondary600: '#7D6855',
    secondary700: '#69554C',
    secondary800: '#423836',
    secondary900: '#201D1C',
    neutral50: '#F8FAFC',
    neutral100: '#F1F5F9',
    neutral200: '#E2E8F0',
    neutral300: '#CBD5E1',
    neutral400: '#94A3B8',
    neutral500: '#64748B',
    neutral600: '#475569',
    neutral700: '#334155',
    neutral800: '#1E293B',
    neutral900: '#0F172A',
    success50: '#F0FDF4',
    success100: '#DCFCE7',
    success200: '#BBF7D0',
    success300: '#86EFAC',
    success400: '#4ADE80',
    success500: '#22C55E',
    success600: '#16A34A',
    success700: '#166534',
    success800: '#15803D',
    success900: '#14532D',
    warning50: '#FFFBEB',
    warning100: '#FEF3C7',
    warning200: '#FDE68A',
    warning300: '#FCD34D',
    warning400: '#FBBF24',
    warning500: '#F59E0B',
    warning600: '#D97706',
    warning700: '#B45309',
    warning800: '#92400E',
    warning900: '#78350F',
    error50: '#FEF2F2',
    error100: '#FEE2E2',
    error200: '#FECACA',
    error300: '#FCA5A5',
    error400: '#F87171',
    error500: '#EF4444',
    error600: '#DC2626',
    error700: '#B91C1C',
    error800: '#991B1B',
    error900: '#7F1D1D',
    info50: '#EFF6FF',
    info100: '#DBEAFE',
    info200: '#BFDBFE',
    info300: '#93C5FD',
    info400: '#60A5FA',
    info500: '#3B82F6',
    info600: '#2563EB',
    info700: '#1D4ED8',
    info800: '#1E40AF',
    info900: '#1E3A8A',
    info950: '#172554',
    background: '#FFFFFF',
    text: '#000000',
    white: '#FFFFFF',
    orange900: '#FF8C01'
  },
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeMode>('light');
  const themeColors = Colors[theme];

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('theme');
        if (storedTheme === 'light' || storedTheme === 'dark') {
          setTheme(storedTheme);
        } else {
          setTheme(systemTheme || 'light');
        }
      } catch (error) {
        console.error('Failed to load theme:', error);
      }
    };
    loadTheme();
  }, [systemTheme]);

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    await AsyncStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, themeColors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
