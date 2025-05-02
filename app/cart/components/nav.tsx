import Text from '@/components/ui/Text';
import { useTheme } from '@/contexts/theme.provider';
import { IOrder } from '@/shared/interfaces/order.interface';
import { router } from 'expo-router';
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/solid';



const Nav = ({ paymentData }: { paymentData: any }) => {

  // ============= hooks 
  const { themeColors } = useTheme()










  // ============ render

  return (
    <View style={[styles.container, {
      backgroundColor: themeColors.white,
      marginTop: 24
    }]}>
      {/* Left Section: Back Icon and Title */}
      <View style={styles.leftSection}>
        <TouchableOpacity onPress={() => router.push('/(customTab)')} style={styles.iconButton}>
          <ChevronLeftIcon size={20} color={themeColors.neutral800} />
        </TouchableOpacity>
        <Text variant='caption-lg-prominent' style={{
          color: themeColors.neutral800
        }} >Your Cart</Text>

        {
          paymentData ? <>
            <View style={{
              backgroundColor: themeColors.success100,
              paddingHorizontal: 8,
              paddingVertical: 5,
              gap: 6,
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 16,
              borderRadius: 8

            }}>
              <Text variant='caption-xxs' style={{
                color: themeColors.success900
              }} >You Saved</Text>
              <Text variant='caption-md-prominent' style={{
                color: themeColors.success600
              }} >₹{((paymentData?.paymentInfo?.revisedCost?.totalProductCost +
                paymentData?.paymentInfo?.revisedCost?.operationalExpenses +
                paymentData?.paymentInfo?.revisedCost?.handlingFee +
                paymentData?.paymentInfo?.revisedCost?.totalDeliveryFee +
                paymentData?.paymentInfo?.revisedCost?.operationalExpenses) - paymentData?.paymentInfo?.revisedCost?.finalAmount) / 100}</Text>
            </View>
          </> : <></>
        }

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
    marginTop: 16
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
