import Products from '@/components/home/quick-delivery/Products';
import Text from '@/components/ui/Text';
import { useTheme } from '@/contexts/theme.provider';
import { useQuery } from '@/hooks/useQuery';
import { IProduct } from '@/interfaces/product.interface';
import { router } from 'expo-router';
import React from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions, Pressable } from 'react-native';
import { StarIcon } from 'react-native-heroicons/solid';

// Sample data for the FlatList

interface IProductData {
    data: IProduct[];
}

const RecomendedProducts = () => {
    // ========== hooks 
    const { themeColors } = useTheme();
    const { data: products, loading: productLoading } = useQuery<IProductData>(
        `products/list?limit=5`
    );

    return (
        <View style={{ marginVertical: 32 }}>
            <Text variant="caption-md" style={{ color: themeColors.neutral600, marginBottom: 12 }}>
                Related Products
            </Text>
            <FlatList
                data={products?.data || []}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() =>
                            router.push({
                                pathname: "/product-details/product-details-screen",
                                params: { data: JSON.stringify(item) }, // Pass your params here
                            })
                        }
                        style={{
                            width: 160,
                            marginRight: 24,
                            borderRadius: 8,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                            height: 220,
                            marginBottom: 24
                        }}
                    >
                        {/* Placeholder for Image */}
                        <View
                            style={{
                                width: '100%',
                                aspectRatio: 1,
                                marginBottom: 8,
                                borderRadius: 8,
                            }}
                        >
                            <Image
                                style={{
                                    width: '100%',
                                    height: 150,
                                    borderRadius: 8,
                                }}
                                source={{ uri: item?.details?.thumbnail }}
                            />
                        </View>

                        {/* Product Details */}
                        <Text
                            variant='caption-md'
                            style={{ marginBottom: 4 }}
                            numberOfLines={2}
                        >
                            {item?.details?.title?.slice(0, 20)}
                        </Text>

                        {/* Rating and Reviews */}
                        {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text variant='caption-xs' style={{ color: themeColors.success800 }}>
                                ★ {item.rating}
                            </Text>
                            <Text variant='body-xxs' style={{ color: themeColors.neutral400, marginLeft: 4 }}>
                                (0)
                            </Text>
                        </View> */}

                        {/* Rating and Reviews */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                            {
                                [...Array(item?.rating)]?.map(item => <StarIcon key={item} size={16} color={'#FBBF24'} />)
                            }
                            {
                                [...Array(5 - item?.rating)]?.map(item => <StarIcon size={16} color={'#E5E7EB'} />)
                            }

                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: "center",
                            gap: 6
                        }}>
                            <Text variant="caption-sm-prominent" style={{ marginBottom: 16, color: themeColors.neutral800 }}>₹{item?.discountPrice}</Text>
                            <Text variant="caption-sm" style={{ marginBottom: 16, color: themeColors.neutral400, textDecorationLine: "line-through" }}>₹{item?.originalPrice}</Text>
                        </View>
                    </Pressable>
                )}
                keyExtractor={(item) => item._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        // marginVertical: 32

    },
    card: {
        width: 160,
        marginRight: 24,
        borderRadius: 8,

    },
    image: {
        width: '100%',
        height: 178,
        borderRadius: 8,
        marginBottom: 8,

    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    price: {
        fontSize: 14,
        color: '#666',
    },
});

export default RecomendedProducts;
