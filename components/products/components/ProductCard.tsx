import Icon from '@/components/shared/Icon'
import SkeletonLoader from '@/components/shared/SkeletonLoader'
import Text from '@/components/ui/Text'
import { useCart } from '@/contexts/cart.context'
import { useTheme } from '@/contexts/theme.provider'
import { useWishlist } from '@/contexts/wishlist.context'
import { IProduct } from '@/interfaces/product.interface'
import { router } from 'expo-router'
import React, { useMemo } from 'react'
import { Image, TouchableOpacity, View, Text as RNText, StyleSheet, Pressable } from 'react-native'
import { BookmarkIcon } from 'react-native-heroicons/outline'
import { BookmarkIcon as SolidBookMark, StarIcon } from 'react-native-heroicons/solid'

export default function ProductCard({ item, setModalVisible, setCurrentProduct }: { item: IProduct, setCurrentProduct: any, setModalVisible: any }) {

    const { addToCart, cart, updateQuantity } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();
    const { themeColors } = useTheme()

    const title = useMemo(() => {
        return item?.details?.title?.length > 40
            ? `${item?.details?.title.slice(0, 40)} ...`
            : `${item?.details?.title}`;
    }, [item?.details?.title]);



    return (
        <>

            <View style={styles.productCard}>
                <Pressable

                    onPress={() =>
                        router.push({
                            pathname: "/product-details/product-details-screen",
                            params: { data: JSON.stringify(item) }, // Pass your params here
                        })
                    }

                    style={styles.productInfo}>
                    <View style={{
                        flexDirection: 'row',
                        gap: 12
                    }}>
                        {/* Quick Tag */}
                        {item.deliveryOptions?.quick && (
                            <Text variant="caption-xxs-prominent" style={styles.quickTag}>
                                ⚡ Quick
                            </Text>
                        )}
                        {item.deliveryOptions?.sameDay && (
                            <Text variant="caption-xxs-prominent" style={{
                                color: themeColors.neutral900
                            }}>
                                Same Day
                            </Text>
                        )}
                    </View>

                    {/* Product Name */}
                    <Text variant="caption-md" style={styles.productName}>
                        {title}
                    </Text>

                    {/* Rating */}
                    <View style={styles.ratingContainer}>

                        <Text variant="caption-xs" style={[styles.ratingText,
                        {
                            color: themeColors.success800
                        }
                        ]}>
                            {item.rating}{" "}
                        </Text>
                        <View style={{
                            marginTop: -3
                        }}>
                            <StarIcon color={themeColors.success700} size={15} />
                        </View>
                    </View>

                    {/* Price */}
                    <View style={{
                        flexDirection: 'row',
                        alignItems: "center",
                        gap: 6
                    }}>
                        <Text variant="caption-md-prominent" style={{ marginBottom: 16, color: themeColors.neutral800 }}>₹{item?.discountPrice}</Text>
                        <Text variant="caption-md" style={{ marginBottom: 16, color: themeColors.neutral400, textDecorationLine: "line-through" }}>₹{item?.originalPrice}</Text>
                    </View>


                    {/* Buttons */}
                    {
                        item?.details?.title ? <>
                            <View style={styles.actionButtons}>
                                <TouchableOpacity
                                    onPress={() => toggleWishlist(item)}
                                    style={[styles.saveButton, {
                                        borderRadius: 8
                                    }]}>
                                    {/* <Icon size={20} name="bookmark" /> */}
                                    {
                                        isInWishlist(item?._id) ? <SolidBookMark color="#FF4D4D" size={20} /> : <BookmarkIcon color="#FF4D4D" size={20} />
                                    }

                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() =>
                                        router.push({
                                            pathname: "/product-details/product-details-screen",
                                            params: { data: JSON.stringify(item) }, // Pass your params here
                                        })
                                    }
                                    style={styles.detailsButton}>
                                    <Text variant="body-xs" style={{
                                        color: themeColors.neutral600
                                    }} >
                                        More Details {">"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </> : <></>
                    }

                </Pressable>


                {/* Product Image & Add Button */}
                {
                    item?.details?.title ? <>
                        <View style={styles.productImageContainer}>
                            <Pressable
                                onPress={() =>
                                    router.push({
                                        pathname: "/product-details/product-details-screen",
                                        params: { data: JSON.stringify(item) }, // Pass your params here
                                    })
                                }
                                style={{
                                    backgroundColor: themeColors.neutral100,
                                    width: 140,
                                    alignItems: 'center',
                                    borderRadius: 16,
                                    height: 137,
                                    justifyContent: 'center'
                                }}>
                                <Image
                                    source={{ uri: item?.details?.thumbnail || '' }}
                                    style={styles.productImage}
                                    resizeMode="contain"
                                />
                            </Pressable>
                            <View style={{
                                // backgroundColor: 'red',
                                // marginTop: -60
                            }}>
                                {
                                    cart?.find(p => p?.product?._id == item?._id) ? <>
                                        <View
                                            // onPress={() => {
                                            //     setCurrentProduct(item)
                                            //     setModalVisible(true)
                                            // }}
                                            style={{
                                                backgroundColor: themeColors.background,
                                                elevation: 30,
                                                borderRadius: 8,
                                                borderWidth: 0.5,
                                                borderColor: themeColors.neutral200,

                                                width: 106,
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                marginTop: -20,
                                                shadowColor: '#F1F5F9',
                                                shadowOffset: { width: 0, height: 8 },
                                                shadowOpacity: 0.1,
                                                shadowRadius: 8,
                                                flexDirection: 'row',
                                                // paddingHorizontal: 16

                                            }}>
                                            <Pressable
                                                style={{
                                                    paddingLeft: 16,
                                                    paddingVertical: 8,
                                                }}
                                                onPress={() => {
                                                    // @ts-ignore
                                                    updateQuantity(item?._id, item?.variants[0]?.name, (cart?.find(p => p?.product?._id == item?._id)?.quantity - 1))
                                                }}>
                                                <Icon name='minus' size={16} />
                                            </Pressable>

                                            <Text variant="caption-md-prominent" style={{
                                                marginTop: 2
                                            }} >{cart?.find(p => p?.product?._id == item?._id)?.quantity}</Text>
                                            <Pressable
                                                style={{
                                                    paddingRight: 16,
                                                    paddingVertical: 8,
                                                }}
                                                onPress={() => {

                                                    // @ts-ignore
                                                    updateQuantity(item?._id, item?.variants[0]?.name, (cart?.find(p => p?.product?._id == item?._id)?.quantity + 1))
                                                }}>
                                                <Icon name='plus' size={16} />
                                            </Pressable>
                                        </View>

                                    </> : <>

                                        <TouchableOpacity
                                            onPress={() => {
                                                setCurrentProduct(item)
                                                setModalVisible(true)
                                            }}
                                            style={{
                                                backgroundColor: themeColors.background,
                                                elevation: 30,
                                                borderRadius: 8,
                                                borderWidth: 0.5,
                                                borderColor: themeColors.neutral200,
                                                paddingVertical: 8,
                                                width: 106,
                                                alignItems: 'center',
                                                justifyContent: 'center',

                                                shadowColor: '#F1F5F9',
                                                shadowOffset: { width: 0, height: 8 },
                                                shadowOpacity: 0.1,
                                                shadowRadius: 8,
                                                marginTop: -12
                                            }}>
                                            <Text variant="caption-md-prominent" style={{
                                                color: themeColors.primary600
                                            }}>
                                                ADD
                                            </Text>
                                        </TouchableOpacity>
                                    </>
                                }
                            </View>

                        </View>
                    </> : <>

                    </>
                }

            </View>

        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 16,

    },
    header: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#F0F0F0",
        marginBottom: 8,
    },
    listContainer: {
        paddingBottom: 16,
    },
    productCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#FFFFFF",
        paddingVertical: 16,
        marginBottom: 8,
        borderRadius: 8,
        borderBottomWidth: 1,
        borderColor: "#F0F0F0",
        paddingBottom: 20
    },
    productInfo: {
        flex: 1,
        marginRight: 16,
    },
    quickTag: {
        color: "#FF9900",
        fontWeight: "600",
        marginBottom: 4,
    },
    productName: {
        color: "#333333",
        fontWeight: "600",
        marginBottom: 8,
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    ratingText: {
        marginLeft: 4,
        color: "#333333",
    },
    price: {
        color: "#333333",
        fontWeight: "600",
        marginBottom: 16,
    },
    actionButtons: {
        flexDirection: "row",
        alignItems: "center",
    },
    saveButton: {
        marginRight: 8,
        backgroundColor: '#FEF2F2',
        padding: 3,
        borderRadius: 8
    },
    detailsButton: {
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: "#D9D9D9",
        borderRadius: 8,
    },
    detailsButtonText: {
        color: "#6C63FF",
        fontWeight: "600",
    },
    productImageContainer: {
        justifyContent: "space-between",
        alignItems: "center",
    },
    productImage: {
        width: '100%',
        height: '100%',
        // marginBottom: 8,
        objectFit: 'cover',
        borderRadius: 16,

    },
    addButton: {
        backgroundColor: "#FFFFFF",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 16,

    },
    addButtonText: {
        color: "#FFFFFF",
        fontWeight: "600",
    },
});
