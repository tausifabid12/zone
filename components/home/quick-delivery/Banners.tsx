import { useQuery } from '@/hooks/useQuery';
import React from 'react';
import { View, FlatList, Image, StyleSheet } from 'react-native';



const Banners = () => {

    const images = [
        { id: '1', uri: 'https://via.placeholder.com/350x172?text=Image+1' },
        { id: '2', uri: 'https://via.placeholder.com/350x172?text=Image+2' },
        { id: '3', uri: 'https://via.placeholder.com/350x172?text=Image+3' },
        { id: '4', uri: 'https://via.placeholder.com/350x172?text=Image+4' },
    ];

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 24, paddingLeft: 16 }}>
            <FlatList
                data={images}
                horizontal
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Image
                        source={require('../../../assets/images/banner.png')}
                        style={{
                            width: 300,
                            height: 160,
                            marginRight: 13,
                            borderRadius: 10,
                        }}
                    />
                )}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

export default Banners;



// import { useQuery } from '@/hooks/useQuery';
// import React from 'react';
// import { View, FlatList, Image, StyleSheet } from 'react-native';


// interface IBannerData {
//     data: {
//         _id: string
//         image: string
//         screenName: string
//         section: string
//         path: string
//         eligibleCustomers: string
//     }[]
// }


// const Banners = () => {




//     const { data, error, loading, refetch } = useQuery<IBannerData>(`banners`)





//     const images = [
//         { id: '1', uri: 'https://via.placeholder.com/350x172?text=Image+1' },
//         { id: '2', uri: 'https://via.placeholder.com/350x172?text=Image+2' },
//         { id: '3', uri: 'https://via.placeholder.com/350x172?text=Image+3' },
//         { id: '4', uri: 'https://via.placeholder.com/350x172?text=Image+4' },
//     ];

//     return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 24, paddingLeft: 16 }}>
//             <FlatList
//                 // data={data?.data}
//                 data={images}
//                 horizontal
//                 keyExtractor={(item) => item.id}
//                 renderItem={({ item }) => (
//                     <Image
//                         // source={{ uri: item?.image }}
//                         source={require(item?.uri)}
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
