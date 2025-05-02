import Text from '@/components/ui/Text';
import { useTheme } from '@/contexts/theme.provider';
import { ICoupon } from '@/interfaces/cupon.interface';
import React from 'react';
import { Pressable, View } from 'react-native';


interface Props {
    coupon: ICoupon;
    getPaymentDetails: (couponId: string) => void
}

const CouponCard: React.FC<Props> = ({ coupon, getPaymentDetails }) => {


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
                minWidth: 300


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
                }} variant="caption-xs" >Apply </Text>

            </Pressable>


        </View>
    );
};

export default CouponCard;
