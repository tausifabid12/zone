import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import { IProduct } from '@/interfaces/product.interface'
import ProductCard from './ProductCard'
import Text from '@/components/ui/Text'
import { useTheme } from '@/contexts/theme.provider'

export default function ProductList({ data, setModalVisible, setCurrentProduct }: { data: IProduct[], setCurrentProduct: any, setModalVisible: any }) {

    const { themeColors } = useTheme();

    return (
        <View style={{ paddingVertical: 16 }}>


            {
                data && data?.length ? <FlatList
                    showsVerticalScrollIndicator={false}
                    data={data}
                    renderItem={({ item }) => (
                        <ProductCard
                            item={item}
                            setModalVisible={setModalVisible}
                            setCurrentProduct={setCurrentProduct}
                        />
                    )}
                    keyExtractor={(item) => item?._id}
                    contentContainerStyle={{
                        paddingBottom: 16,
                    }}
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                    removeClippedSubviews={true}
                    // bouncesZoom={true}
                    decelerationRate="fast"
                />

                    :

                    <View style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 400
                    }}>
                        <Text variant='title-md' style={{
                            color: themeColors.neutral400,
                            textAlign: 'center'
                        }}>
                            Ouch, Product not found


                        </Text>
                        <Text variant='title-md' style={{
                            color: themeColors.neutral400,
                            textAlign: 'center'
                        }}>

                            ˙◠˙


                        </Text>
                    </View>
            }

        </View>
    )
}

const styles = StyleSheet.create({})