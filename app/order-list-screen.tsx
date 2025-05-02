import Navbar2 from '@/components/Navbar2';
import Loading from '@/components/shared/loading';
import Text from '@/components/ui/Text';
import { useTheme } from '@/contexts/theme.provider';
import { useQuery } from '@/hooks/useQuery';
import { IOrder } from '@/shared/interfaces/order.interface';
import { loadAsync } from 'expo-font';
import { router } from 'expo-router';
import React from 'react';
import { View, StyleSheet, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
// Assuming your Text component is saved here
import { ChevronRightIcon } from 'react-native-heroicons/outline';




interface IOrderData {
    data: IOrder[]
}



const OrderListScreen = () => {

    // ========================= get orders
    const { data: orderData, loading: userLoading, refetch } = useQuery<IOrderData>('orders');











    // ========== hooks 
    const { themeColors } = useTheme()
    const faqItems = [
        'Pricing & Fees',
        'Delivery Options & Timing',
        'Order Tracking & Updates',
        'Payment & Refunds',
        'Product Availability & Returns',
    ];


    // if (userLoading) {
    //     return <Loading />
    // }

    return (
        <>
            <Navbar2
                title="Your Orders"

            />
            <ScrollView style={{
                flex: 1
            }}>
                <View style={styles.container}>



                    <Text variant="body-xxs" style={styles.subHeader}>RECENT ORDERS</Text>
                    {
                        orderData?.data?.map((item, i) =>
                            <View
                                key={i}
                                style={{
                                    borderWidth: 0.5,
                                    borderColor: themeColors.neutral200,
                                    borderRadius: 16,
                                    marginBottom: 10
                                }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 10,
                                    padding: 14,
                                }}>
                                    {
                                        [...Array(4)]?.map(item => <Image source={{ uri: item?.line_items?.[0]?.image_url }} style={styles.orderImage} />)
                                    }

                                </View>
                                <TouchableOpacity
                                    onPress={() => router.push({ pathname: "/my-orders/my-orders-screen", params: { data: JSON.stringify(item) } })}

                                    style={styles.orderDetailsButton}>
                                    <View style={{
                                        gap: 2
                                    }}>
                                        <Text variant="caption-md">Order# {item?.receipt}</Text>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            gap: 8
                                        }}>
                                            <Text variant="body-sm">{item?.products?.length} Items</Text>
                                            <Text variant="body-sm">• ₹{item?.paymentInfo?.revisedCost?.finalAmount}</Text>
                                        </View>
                                    </View>
                                    <ChevronRightIcon color="black" size={24} />
                                </TouchableOpacity>
                            </View>)
                    }




                    <Text variant="body-xxs" style={styles.subHeader}>FREQUENTLY ASKED QUESTIONS</Text>

                    {faqItems.map((item, index) => (
                        <TouchableOpacity
                            onPress={() => router.push('/faq-screen')}
                            key={index} style={styles.faqItem}>
                            <Text variant="body-md">{item}</Text>
                            <ChevronRightIcon color={themeColors.neutral400} size={20} />
                        </TouchableOpacity>
                    ))}
                </View>

            </ScrollView>
        </>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    header: {
        textAlign: 'center',
        marginBottom: 24,
    },
    subHeader: {
        color: 'gray',
        marginTop: 24,
        marginBottom: 8,
    },
    orderList: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    orderImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 8,
    },
    orderDetailsButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 8,
        padding: 16,
    },
    faqItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,

    },
});

export default OrderListScreen;
