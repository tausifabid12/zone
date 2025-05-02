// import React from 'react';
// import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

// const Loading = ({ message = 'Loading...', size = 'large', color = '#3498db' }) => {
//     return (
//         <View style={styles.container}>
//             <ActivityIndicator size={size} color={color} />
//             <Text style={styles.text}>{message}</Text>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(0, 0, 0, 0.1)',
//     },
//     text: {
//         marginTop: 10,
//         fontSize: 16,
//         color: '#333',
//     },
// });

// export default Loading;


// App.tsx or any screen component
import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export default function App() {
    return (
        <View style={styles.container}>
            <LottieView
                source={require('../../assets/y5XlS02dYP.json')}
                autoPlay
                loop
                style={{ width: 450, height: 450 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        bottom: 0,
        zIndex: 1000000000,
        backgroundColor: 'white'
    },
});
