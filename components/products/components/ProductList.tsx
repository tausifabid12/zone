import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IProduct } from '@/interfaces/product.interface'
import ProductCard from './ProductCard'

export default function ProductList({ data, setModalVisible, setCurrentProduct }: { data: IProduct[], setCurrentProduct: any, setModalVisible: any }) {
    return (
        <View style={{ paddingVertical: 16 }}>
            <FlatList
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
        </View>
    )
}

const styles = StyleSheet.create({})