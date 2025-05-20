// import { useQuery } from '@/hooks/useQuery';
// import React from 'react';
// import { View, FlatList, Image, StyleSheet } from 'react-native';



// const Banners = () => {

//     const images = [
//         { id: '1', uri: 'https://via.placeholder.com/350x172?text=Image+1' },
//         { id: '2', uri: 'https://via.placeholder.com/350x172?text=Image+2' },
//         { id: '3', uri: 'https://via.placeholder.com/350x172?text=Image+3' },
//         { id: '4', uri: 'https://via.placeholder.com/350x172?text=Image+4' },
//     ];

//     return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 24, paddingLeft: 16 }}>
//             <FlatList
//                 data={images}
//                 horizontal
//                 keyExtractor={(item) => item.id}
//                 renderItem={({ item }) => (
//                     <Image
//                         source={require('../../../assets/images/banner.png')}
//                         style={{
//                             width: 300,
//                             height: 160,
//                             marginRight: 13,
//                             borderRadius: 10,
//                         }}
//                     />
//                 )}
//                 showsHorizontalScrollIndicator={false}
//             />
//         </View>
//     );
// };

// export default Banners;



import { useQuery } from '@/hooks/useQuery';
import { router } from 'expo-router';
import React from 'react';
import { View, FlatList, Image, StyleSheet, Pressable } from 'react-native';


interface IBannerData {
    data: {
        _id: string
        imageURL: string
        screenName: string
        section: string
        path: string
        eligibleCustomers: string
    }[]
}


const Banners = ({ screen, section }: { screen: string, section: string }) => {




    const { data, error, loading, refetch } = useQuery<IBannerData>(`banners`)






    // ];

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 24, paddingLeft: 16 }}>
            <FlatList
                data={data?.data?.filter(item => item?.screenName?.toLowerCase() == screen.toLowerCase() && item?.section?.toLowerCase() == section?.toLowerCase())}
                // data={images}
                horizontal
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <Pressable onPress={() => {
                        if (item.path) {
                            router.push(item?.path as any)
                        }
                    }}>
                        <Image
                            source={{ uri: item?.imageURL }}
                            // source={require(item?.uri)}
                            style={{
                                width: 300,
                                height: 160,
                                marginRight: 13,
                                borderRadius: 10,
                            }}
                        />

                    </Pressable>
                )}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

export default Banners;
