import Text from '@/components/ui/Text';
import { useTheme } from '@/contexts/theme.provider';
import { ICoupon } from '@/interfaces/cupon.interface';
import React from 'react';
import { Pressable, View } from 'react-native';
import { XMarkIcon } from 'react-native-heroicons/solid';


interface Props {
    coupon: ICoupon;
    getPaymentDetails: (couponId: string) => void
    appliedCoupon: string
}

const CouponCard: React.FC<Props> = ({ coupon, getPaymentDetails, appliedCoupon, }) => {


    const { themeColors } = useTheme()

    const getDiscountText = () => {
        return coupon.discount.type === 'percentage'
            ? `${coupon.discount.amount}% OFF`
            : `₹${coupon.discount.amount} OFF`;
    };

    return (
        <View
            style={{
                backgroundColor: '#fff',
                padding: 16,
                borderRadius: 12,
                marginVertical: 6,
                borderColor: themeColors.neutral200,
                borderWidth: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginRight: 10,
                minWidth: 300,
                position: 'relative'


            }}
        >
            <View>
                <Text variant="caption-sm-prominent" >{coupon.title} </Text>
                <Text variant="caption-sm" >{getDiscountText()}</Text>
            </View>
            <Pressable
                onPress={() => getPaymentDetails(coupon?._id)}
                style={{
                    backgroundColor: themeColors.primary50,
                    paddingHorizontal: 8,
                    paddingVertical: 3,
                    borderRadius: 100
                }}>
                <Text style={{
                    color: themeColors.primary600
                }} variant="caption-xs" >{appliedCoupon == coupon?._id ? 'Applied' : 'Apply'} </Text>

            </Pressable>

            {
                appliedCoupon == coupon?._id &&
                <Pressable
                    onPress={() => getPaymentDetails('')}
                    style={{
                        position: 'absolute',
                        top: 3,
                        right: 3,
                        backgroundColor: themeColors.error100,
                        borderRadius: 12
                    }}>
                    <XMarkIcon color={themeColors.error600} size={14} />

                </Pressable>
            }




        </View>
    );
};

export default CouponCard;
