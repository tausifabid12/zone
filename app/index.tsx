
import Text from '@/components/ui/Text';
import { useTheme } from '@/contexts/theme.provider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import {
    StyleSheet,
    View,
    ImageBackground,
    StatusBar,
    Pressable,
    Image,
} from 'react-native';

const OnboardingScreen = () => {


    // ======= hooks
    const { themeColors } = useTheme()






    async function handleDummyLogin() {

        // // const userDataStr = await AsyncStorage.getItem('userData')
        // // const userData = JSON.parse(userDataStr as string)

        // const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendVerificationCode?key=AIzaSyB6ipqXz4bKIIjVGK_nc-La4UkiAOY6diM', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json', // or 'application/x-www-form-urlencoded'
        //     },
        //     body: JSON.stringify({
        //         "phoneNumber": "+8801318048544",
        //         "recaptchaToken": "fake-recaptcha-token"
        //     })
        // })

        // const otpData = await res.json()

        // console.log(otpData, '{{{{{{{{{{{{{')

        // if (otpData) {
        //     const sessionInfo = otpData?.sessionInfo
        //     const res2 = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPhoneNumber?key=AIzaSyB6ipqXz4bKIIjVGK_nc-La4UkiAOY6diM', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json', // or 'application/x-www-form-urlencoded'
        //         },
        //         body: JSON.stringify({
        //             "sessionInfo": sessionInfo, // Session info from the send otp api response
        //             "code": "129400" // 6 digit code
        //         })
        //     })

        //     const tokenData = await res2.json()

        //     console.log(tokenData, 'tokenDatatokenDatatokenDatatokenDatatokenData')

        //     const token = tokenData?.idToken
        //     await AsyncStorage.setItem('token', token)
        //     if (token) {


        //         console.log("here  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++")


        //         const userRes = await fetch('https://dev.zone42.in/api-main/customers/profile', {
        //             method: 'GET',
        //             headers: {
        //                 'Authorization': `Bearer ${token}`,
        //                 'Content-Type': 'application/json'
        //             }
        //         })
        //         const userData = await userRes.json()
        //         console.log("here    userData  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
        //         console.log(userData, '{{{{{{{{{{{{{{{')
        //         AsyncStorage.setItem('userData', JSON.stringify(userData?.data))
        //         router.push('/(customTab)')


        //         // await refetch()
        //         // console.log(userData, 'userData?.datauserData?.datauserData?.datauserData?.datauserData?.datauserData?.data   userData?.datauserData?.datauserData?.datauserData?.data')


        //     }



        // }

        router.push('/auth/login-screen')
    }











    // Navigate to the login screen after 3 seconds
    useEffect(() => {
        handleDummyLogin()

        // const timer = setTimeout(() => {
        //     // router.push('/auth/login-screen')
        //     router.push('/(customTab)')
        // }, 3000);
        // // Cleanup the timer when the component unmounts
        // return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="light-content"
            />
            <Pressable style={{
                flex: 1,
            }} onPress={() => router.push('/auth/login-screen')}>
                <ImageBackground
                    source={require('../assets/images/onboarding-bg.jpg')}
                    style={styles.backgroundImage}
                    resizeMode="cover">
                    <Image source={require('../assets/images/logo.png')} style={{
                        height: 120,
                        width: 130,
                        objectFit: 'contain'
                    }} />
                </ImageBackground>
            </Pressable>
        </>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

});

export default OnboardingScreen;




// import Animated, {
//   useSharedValue,
//   withTiming,
//   useAnimatedStyle,
//   Easing,
//   useAnimatedScrollHandler,
// } from 'react-native-reanimated';
// import { View, Button, StyleSheet, TouchableOpacity, Pressable, TextInput, ScrollView } from 'react-native';
// import { useTheme } from '@/contexts/theme.provider';
// import { ChevronDownIcon, UserCircleIcon } from 'react-native-heroicons/solid';
// import Text from '@/components/ui/Text';
// import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
// import { useRouter } from 'expo-router';

// export default function AnimatedStyleUpdateExample() {
//   const height = useSharedValue(208)
//   const opacity = useSharedValue(1);
//   const margin = useSharedValue(0);
//   const router = useRouter();
//   const config = {
//     duration: 500,
//     easing: Easing.bezier(0.5, 0.01, 0, 1),
//   };

//   const style = useAnimatedStyle(() => {
//     return {
//       opacity: withTiming(opacity.value, config),
//       marginTop: withTiming(margin.value, config),
//     };
//   });
//   const styleHeight = useAnimatedStyle(() => {
//     return {
//       height: withTiming(height.value, config),
//     };
//   });



//   const offsetX = useSharedValue(0);

//   const scrollHandler = useAnimatedScrollHandler({
//     onScroll: (event) => {
//       offsetX.value = event.contentOffset.y;
//       console.log(offsetX.value, '|||||||||||||||')

//       if (offsetX.value > 0) {
//         height.value = 100;
//         opacity.value = 0
//         margin.value = -60


//       } else if (offsetX.value == 0) {
//         height.value = 208;
//         opacity.value = 1
//         margin.value = 0
//       }
//     },

//   });


//   async function handleStartScrollAnimation() {
//     height.value = 100;
//     opacity.value = 0
//     margin.value = -60
//   }
//   async function handleTopScrollAnimation() {
//     height.value = 208;
//     opacity.value = 1
//     margin.value = 0
//   }





//   // ========== hooks
//   const { themeColors } = useTheme()

//   return (
//     <>


//       <Animated.View
//         style={[{
//           backgroundColor: themeColors.primary600,
//           paddingHorizontal: 16,
//           justifyContent: 'center'

//         }, styleHeight]}
//       >
//         {/* User Profile Icon and Address Section */}

//         <Animated.View
//           style={[
//             {
//               flexDirection: 'row',
//               alignItems: 'center',
//               marginBottom: 16,
//             },
//             style,
//           ]}
//         >
//           <UserCircleIcon color="#FFFFFF" size={24} />
//           <View style={{ marginLeft: 8 }}>
//             <Text
//               style={{
//                 color: '#FFFFFF',
//               }}
//             >
//               Delivering to
//             </Text>
//             <TouchableOpacity
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//               }}
//             >
//               <Text
//                 style={{
//                   color: '#FFFFFF',
//                   marginRight: 4,
//                 }}
//               >
//                 Home - No. 23, ABC Street, XYZ Area
//               </Text>
//               <ChevronDownIcon color="#FFFFFF" size={18} />
//             </TouchableOpacity>
//           </View>
//         </Animated.View>


//         {/* Search Input */}
//         <Pressable
//           onPress={() => router.push('/product-search-screen')}
//           style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//             backgroundColor: '#FFFFFF',
//             borderRadius: 12,
//             height: 52,
//             paddingHorizontal: 14
//           }}
//         >
//           <MagnifyingGlassIcon color={themeColors.neutral400} size={24} />
//           <TextInput
//             placeholder="Search Products"
//             placeholderTextColor={themeColors.neutral400}
//             readOnly
//             style={{
//               flex: 1,

//               marginLeft: 8,
//               fontSize: 17,
//               color: '#000000',
//               fontFamily: 'Poppins_400Regular',
//               marginTop: 3
//             }}
//           />
//         </Pressable>
//       </Animated.View>

//       <Animated.ScrollView
//         onScroll={scrollHandler}
//         style={{
//           flex: 1
//         }}>
//         {/* <Animated.View style={[styles.box, style]} /> */}

//         <View style={{
//           backgroundColor: 'red',
//           height: 900
//         }}>

//         </View>
//         <Button
//           title="toggle"
//           onPress={() => {
//             height.value = 100;
//             opacity.value = 0
//             margin.value = -60
//           }}
//         />
//       </Animated.ScrollView>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     // height: 1000
//   },
//   box: {
//     width: 100,
//     height: 80,
//     backgroundColor: 'black',
//     margin: 30,
//   },
// });
