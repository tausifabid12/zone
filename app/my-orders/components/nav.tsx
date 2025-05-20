import Text from '@/components/ui/Text';
import { useTheme } from '@/contexts/theme.provider';
import { IOrder } from '@/shared/interfaces/order.interface';
import { router } from 'expo-router';
import { goBack } from 'expo-router/build/global-state/routing';
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/solid';



const Nav = ({ data }: { data: IOrder }) => {

  // ============= hooks 
  const { themeColors } = useTheme()










  // ============ render

  return (
    <View style={[styles.container, {
      backgroundColor: themeColors.white
    }]}>
      {/* Left Section: Back Icon and Title */}
      <View style={styles.leftSection}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <ChevronLeftIcon size={20} color={themeColors.neutral800} />
        </TouchableOpacity>
        <View>
          <Text variant='caption-lg' style={{
            color: themeColors.neutral800
          }} >Order# {data?._id}</Text>
          <Text variant='body-sm' style={{
            color: themeColors.neutral500
          }} >{data?.products?.length} items</Text>
        </View>

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

export default Nav;
