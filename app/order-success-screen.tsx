import Navbar2 from '@/components/Navbar2';
import Text from '@/components/ui/Text';
import { useTheme } from '@/contexts/theme.provider';
import { router } from 'expo-router';
import React from 'react';
import { View, StyleSheet, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
// Assuming your Text component is saved here
import { ChevronLeftIcon, ChevronRightIcon } from 'react-native-heroicons/outline';
import OrderSuccess from './cart/components/order-success-box';


const OrderListScreen = () => {
    const recentOrders = [
        { id: '1', image: "" },
        { id: '2', image: "" },
        { id: '3', image: "" },
        { id: '4', image: "" },
        { id: '5', image: "" },
    ];
    // ========== hooks 
    const { themeColors } = useTheme()
    const faqItems = [
        'Pricing & Fees',
        'Delivery Options & Timing',
        'Order Tracking & Updates',
        'Payment & Refunds',
        'Product Availability & Returns',
    ];

    return (
        <>
            {/* <Navbar2
                title="Help Center"

            /> */}

            <View style={{
                backgroundColor: themeColors.white,
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 42
            }}>
                <ChevronLeftIcon color="black" size={24} />
                <TouchableOpacity
                    onPress={() => router.push('/my-orders/my-orders-screen')}

                    style={styles.orderDetailsButton}>
                    <View style={{
                        gap: 2
                    }}>
                        <Text variant="caption-md">Order# 89249812</Text>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 8
                        }}>
                            <Text variant="body-sm">5 Items</Text>
                            <Text variant="body-sm">• ₹7620</Text>
                        </View>
                    </View>

                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={[styles.container, {
                    backgroundColor: themeColors.neutral50
                }]}>
                {/* ============================================================== */}

                <View style={{
                    borderWidth: 0.5,
                    borderColor: themeColors.neutral200,
                    borderRadius: 16,
                    backgroundColor: themeColors.white
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                        padding: 14,
                    }}>
                        {
                            [...Array(4)]?.map(item => <Image source={{ uri: "https://mtek3d.com/wp-content/uploads/2018/01/image-placeholder-500x500.jpg" }} style={styles.orderImage} />)
                        }

                    </View>
                    <TouchableOpacity
                        onPress={() => router.push('/my-orders/my-orders-screen')}

                        style={styles.orderDetailsButton}>
                        <View style={{
                            gap: 2
                        }}>
                            <Text variant="caption-md">Order# 89249812</Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 8
                            }}>
                                <Text variant="body-sm">5 Items</Text>
                                <Text variant="body-sm">• ₹7620</Text>
                            </View>
                        </View>
                        <ChevronRightIcon color="black" size={24} />
                    </TouchableOpacity>
                </View>

                <OrderSuccess />


                {/* ======================= */}
                {/* <BillSummery /> */}

                <View style={{
                    paddingBottom: 50
                }}>

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
