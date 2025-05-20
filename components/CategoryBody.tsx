import { Dimensions, Image, Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import { ICategory } from '@/interfaces/category.interface'
import { router } from 'expo-router'
import Text from './ui/Text';
import { useTheme } from '@/contexts/theme.provider';

export default function CategoryBody({ data }: { data: ICategory[] }) {





    // ============= ui =============

    const columns = 4;
    const itemSize = 72;
    const gap = 8; // Adjust this for spacing
    const containerPadding = 16; // Padding on left & right
    const totalSpacing = (columns - 1) * gap + containerPadding * 2;
    const screenWidth = Dimensions.get('window').width;
    const itemWidth = (screenWidth - totalSpacing) / columns;



    const { themeColors } = useTheme()


    return (
        <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            // justifyContent: 'space-between',
            marginTop: 16,
            gap: 8
        }}>
            {data && data?.map((item, index) => (
                <Pressable
                    onPress={() =>

                        router.push({
                            pathname: '/product-search-screen', params: {
                                categoryId: item?._id,
                                categoryName: item?.name
                            }
                        })}


                    key={index} style={{
                        width: itemWidth,
                        alignItems: 'center',
                        marginBottom: gap,

                    }}>
                    <View style={{
                        height: itemSize,
                        width: itemSize,
                        backgroundColor: '#F9FAFB',
                        borderRadius: 16,
                    }} >
                        <Image style={{ height: '100%', width: '100%', borderRadius: 16, }} source={{ uri: item?.image }} />


                    </View>
                    <Text variant='caption-xs' style={{
                        textAlign: 'center',
                        color: themeColors.neutral900,
                        width: itemSize,
                        marginTop: 4,
                    }}>{item?.name}
                    </Text>
                </Pressable>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({})