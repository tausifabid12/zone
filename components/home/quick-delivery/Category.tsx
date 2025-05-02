import { Dimensions, Image, Pressable, ScrollView, StatusBar, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import { useTheme } from '@/contexts/theme.provider';
import { router } from 'expo-router';
import Text from '@/components/ui/Text';
import { ICategory } from '@/interfaces/category.interface';
import CategoryBody from '@/components/CategoryBody';
// import CategoryBody from '@/components/CategoryBody';

const columns = 4;
const itemSize = 72;
const gap = 8; // Adjust this for spacing
const containerPadding = 16; // Padding on left & right
const totalSpacing = (columns - 1) * gap + containerPadding * 2;
const screenWidth = Dimensions.get('window').width;
const itemWidth = (screenWidth - totalSpacing) / columns;

export default function Category({ categories }: { categories: ICategory[] }) {



    console.log(categories?.length, '    categories?.data?.length              categories?.data?.length             categories?.data?.length')

    // ========== hooks 
    const { themeColors } = useTheme()


    // ============== render

    return (
        <>

            <View style={{
                flex: 1,
                paddingHorizontal: 16,
                paddingVertical: 20,
            }} >

                {/* body */}
                <View style={{
                }}>
                    <Text variant='caption-md' style={{
                        color: themeColors.neutral600,
                    }} >Categories for you</Text>
                </View>



                <CategoryBody data={categories || []} />


                {/* <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // justifyContent: 'space-between',
                    gap: 10,
                    marginTop: 20,
                    // paddingHorizontal: 16
                }}>
                    {
                        categories && categories?.map((item, index) => <Pressable
                            onPress={() =>
                                router.push({ pathname: '/product-search-screen', params: { categoryId: item?._id } })
                            }
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

                        )
                    }

                </View> */}





            </View>



        </>
    )
}

const styles = StyleSheet.create({})


