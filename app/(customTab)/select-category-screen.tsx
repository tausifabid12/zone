import { Dimensions, Image, Pressable, ScrollView, StatusBar, StyleSheet, TextInput, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useTheme } from '@/contexts/theme.provider';
import { router, useFocusEffect } from 'expo-router';
import Text from '@/components/ui/Text';
import { useQuery } from '@/hooks/useQuery';
import { ICategory } from '@/interfaces/category.interface';
import Loading from '@/components/shared/loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

import SkeletonLoader from '@/components/shared/SkeletonLoader';
import CategoryBody from '@/components/CategoryBody';
import Navbar2 from '@/components/Navbar2';



interface Idata {
    data: ICategory[]
}


export default function SelectCategory() {

    const [searchText, setSearchText] = useState('')
    // ========== hooks
    const { themeColors } = useTheme()
    const { data, error, loading, refetch } = useQuery<Idata>(`products/categories?searchTerm=${searchText}`);





    useEffect(() => {
        if (searchText) {
            refetch()
        }
    }, [searchText])



    useFocusEffect(
        useCallback(() => {
            StatusBar.setBackgroundColor(themeColors.white);
            StatusBar.setBarStyle('dark-content');
        }, [])
    );










    // ============== render

    return (
        <>
            <StatusBar
                translucent
                backgroundColor={themeColors.white}
                barStyle="dark-content"
            />

            <Navbar2
                title="All Categories"

            />


            <ScrollView style={{
                flex: 1,
                backgroundColor: themeColors.background,
                padding: 16,
                marginTop: 0
            }} >
                {/* <Text variant='caption-lg' style={{
                    textAlign: 'center',
                    color: themeColors.neutral900,

                }}>
                  
                </Text> */}

                <View style={{
                    paddingBottom: 10,
                    position: 'relative',
                    zIndex: 100000,
                    marginTop: -7
                    // paddingTop: 10
                }}>
                    <TextInput
                        placeholder="Search Categories"
                        placeholderTextColor={themeColors.neutral400}
                        defaultValue={searchText}
                        onChangeText={(e) => setSearchText(e)}
                        style={{
                            flex: 1,

                            marginLeft: 8,
                            fontSize: 13,
                            color: '#000000',
                            fontFamily: 'Poppins_400Regular',
                            borderRadius: 15,
                            height: 45,
                            borderWidth: 0.4,
                            borderColor: themeColors.neutral300,
                            paddingHorizontal: 16,

                        }}
                    />
                </View>

                {
                    loading ?
                        <>
                            <View style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                // justifyContent: 'space-between',
                                marginTop: 24,
                                gap: 8
                            }}>

                                {
                                    [...Array(34)]?.map(item =>
                                        <SkeletonLoader key={item} width={(Dimensions.get('window').width - ((4 - 1) * 8 + 16 * 2)) / 4} height={80} borderRadius={10} />)
                                }

                            </View>
                        </> :
                        <>

                            <CategoryBody data={data?.data || []} />
                            {/* <CategoryBody data={data?.data || []} /> */}

                        </>
                }





                <View style={{
                    paddingBottom: 40
                }}>

                </View>


            </ScrollView>

            {/* <BottomTab /> */}

        </>
    )
}

const styles = StyleSheet.create({})





