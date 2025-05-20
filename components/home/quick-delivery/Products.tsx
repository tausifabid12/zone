import Text from '@/components/ui/Text';
import { useTheme } from '@/contexts/theme.provider';
import { IProduct } from '@/interfaces/product.interface';
import { router } from 'expo-router';
import React from 'react';
import { View, FlatList, Image, Pressable } from 'react-native';
import { StarIcon } from 'react-native-heroicons/solid';

const Products = ({ products }: any) => {






    // ========== hooks 
    const { themeColors } = useTheme()



    // Render item for FlatList
    const renderItem = ({ item }: { item: IProduct }) => (
        <Pressable

            onPress={() => router.push({
                pathname: "/product-details/product-details-screen",
                params: { data: JSON.stringify(item) }, // Pass your params here
            })}


            style={{
                width: 160,
                marginRight: 24,
                borderRadius: 8,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                height: 200,
                marginBottom: 24

            }}
        >
            {/* Placeholder for Image */}
            <View
                style={{
                    width: '100%',
                    aspectRatio: 1,
                    marginBottom: 8,
                    // backgroundColor: themeColors.neutral100,
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

                style={{
                    marginBottom: 4,
                }}
                numberOfLines={2}
            >
                {item?.details?.title?.slice(0, 16)}..
            </Text>

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
    );

    return (
        <>
            <Text variant='caption-md' style={{
                paddingTop: 16,
                paddingHorizontal: 16,
                color: themeColors.neutral600
            }}>
                Related Products
            </Text>
            {
                products?.length ? <>


                    <FlatList
                        data={products}
                        keyExtractor={(item) => item._id}
                        renderItem={renderItem}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16, paddingTop: 12 }}
                    />
                </> : <></>
            }

        </>
    );
};

export default Products;
