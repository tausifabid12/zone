import Text from '@/components/ui/Text';
import { useTheme } from '@/contexts/theme.provider';
import { useQuery } from '@/hooks/useQuery';
import { IProduct } from '@/interfaces/product.interface';
import { IReview } from '@/interfaces/review.interface';
import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { CheckCircleIcon, StarIcon, ChevronLeftIcon } from 'react-native-heroicons/solid';


interface IReviewData {
    data: IReview[]
}


const CustomerReview = ({ data }: { data: IProduct }) => {


    // ========== hooks 
    const { themeColors } = useTheme()
    const { data: reviews, loading: settingLoading } = useQuery<IReviewData>(`products/reviews?productId=${data?._id}`);

    return (
        <View style={{ flex: 1 }}>



            {/* Customer Reviews */}
            <Text variant="caption-md" style={{ color: themeColors.neutral600, marginBottom: 12 }}>Customer reviews </Text>

            {/* Overall Rating */}
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>

                {
                    [...Array(data?.rating)]?.map(item => <StarIcon key={item} size={16} color={'#FBBF24'} />)
                }
                {
                    [...Array(5 - data?.rating)]?.map(item => <StarIcon size={16} color={'#E5E7EB'} />)
                }
                <Text variant="body-sm" style={{ marginLeft: 4, color: themeColors.neutral600 }}>{data?.rating} out of 5</Text>
            </View>
            {/* <Text variant="body-sm" style={{ color: themeColors.neutral500, marginBottom: 16, marginTop: 4 }}>4,462 global ratings</Text> */}

            {/* Individual Reviews */}

            {
                reviews?.data?.map((item, i) =>

                    <View key={i} style={{ marginTop: 20, borderTopColor: themeColors.neutral100, borderTopWidth: 1, paddingTop: 20 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                            {
                                item?.customer?.profileImage ?
                                    <>
                                        <Image source={{ uri: item?.customer?.profileImage }} style={{ width: 40, height: 40, borderRadius: 20, marginRight: 8 }} />
                                    </> :

                                    <></>

                            }
                            <View>
                                <Text variant="caption-sm">{item?.customer?.fullName?.firstName} <Text variant="body-sm" style={{ color: themeColors.neutral400 }}>20 December 2024</Text></Text>

                            </View>
                        </View>
                        <Text variant="body-sm" style={{ color: themeColors.neutral400, marginBottom: 8 }}>{item?.store?.name}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                            {
                                [...Array(item?.rating)]?.map(item => <StarIcon key={item} size={16} color={'#FBBF24'} />)
                            }
                            {
                                [...Array(5 - item?.rating)]?.map(item => <StarIcon size={16} color={'#E5E7EB'} />)
                            }



                            <Text variant="caption-xxs" style={{ color: themeColors.primary600, marginLeft: 8 }}>Verified Purchase</Text>
                        </View>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={{
                                marginTop: 14,
                                marginBottom: 9
                            }}>
                            {
                                item?.media?.map((photo, i) =>
                                    <Image
                                        key={i}
                                        source={{ uri: photo }}
                                        style={{
                                            backgroundColor: themeColors.neutral100,
                                            width: 142,
                                            height: 97,
                                            borderRadius: 8,
                                            marginRight: 8
                                        }} />)
                            }
                        </ScrollView>
                        <Text variant="body-md" style={{ marginBottom: 16, color: themeColors.neutral400 }}>{item?.comment}</Text>
                    </View>

                )
            }











        </View>
    );
};

export default CustomerReview;
