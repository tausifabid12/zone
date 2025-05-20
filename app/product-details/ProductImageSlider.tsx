import React, { useState } from 'react';
import { View, Image, TouchableOpacity, FlatList, Dimensions, Pressable } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import ImageViewing from 'react-native-image-viewing';
import { router, useRouter } from 'expo-router'; // Assuming you're using expo-router
import { IProduct } from '@/interfaces/product.interface';
import { useTheme } from '@/contexts/theme.provider';


const { width } = Dimensions.get('window');

export default function ProductImageSlider({ productDetails }: { productDetails: IProduct }) {
    const [visible, setVisible] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);


    // ========== hooks 
    const { themeColors } = useTheme()

    const images = productDetails?.details?.images || [];

    console.log(images, '{{{{{{{{{{{{{{{{')


    const openImage = (index: any) => {
        setCurrentIndex(index);
        setVisible(true);
    };

    return (
        <View style={{
            height: 350,
            width: '100%',
            borderRadius: 16,
            margin: 0,
            padding: 0,
            position: 'relative',
            marginTop: 35,
        }}>

            <FlatList
                horizontal
                pagingEnabled
                data={images}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <Pressable onPress={() => openImage(index)}>
                        <Image
                            source={{ uri: item }}
                            style={{ width, height: 350 }}
                            resizeMode="cover"
                        />

                    </Pressable>
                )}
                showsHorizontalScrollIndicator={false}
            />

            <View style={{ position: 'absolute', top: 16, left: 12 }}>
                <TouchableOpacity
                    style={{
                        backgroundColor: 'rgba(0,0,0, 0.3)',
                        borderRadius: 1000,
                        padding: 2
                    }}
                    onPress={() => router.back()}
                >
                    <Entypo name="chevron-left" size={26} color={themeColors.white} />
                </TouchableOpacity>
            </View>

            <ImageViewing
                images={images.map(url => ({ uri: url }))}
                imageIndex={currentIndex}
                visible={visible}
                onRequestClose={() => setVisible(false)}
                animationType='fade'
            // FooterComponent={}

            />
        </View>
    );
}
