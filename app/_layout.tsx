// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { StatusBar } from 'expo-status-bar';
// import { useEffect } from 'react';
// import 'react-native-reanimated';

// import { useColorScheme } from '@/hooks/useColorScheme';

// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//   });

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);

//   if (!loaded) {
//     return null;
//   }

//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <Stack>
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen name="+not-found" />
//       </Stack>
//       <StatusBar style="auto" />
//     </ThemeProvider>
//   );
// }








// import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemeProvider } from '@/contexts/theme.provider';
import { WishlistProvider } from '@/contexts/wishlist.context';
import { CartProvider } from '@/contexts/cart.context';
import AuthProvider from '@/contexts/auth.context';
import { useFonts, Poppins_100Thin, Poppins_200ExtraLight, Poppins_300Light, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold, Poppins_800ExtraBold, Poppins_900Black } from '@expo-google-fonts/poppins';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@/hooks/useQuery';
import { ISettings } from '@/interfaces/settings.interface';
// import { useQuery } from '@/hooks/useQuery';
// import { ISettings } from '@/interfaces/settings.interface';

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();




interface ISettingData {
  data: ISettings
}





export default function RootLayout() {

  const [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
  });

  // if (!fontsLoaded) {
  //   return 
  // }


  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false)

  // =============== hooks ========================
  const { data: settings, loading: settingLoading } = useQuery<ISettingData>('settings');




  async function getCurrentLocation() {
    setLoading(true)

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    console.log('location , """""""""""""""""""""" locationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocationlocation', location)

    await AsyncStorage.setItem('userLocation', JSON.stringify({
      lat: location?.coords?.latitude,
      lon: location?.coords?.longitude
    }));
    setLocation(location);

    setLoading(false)
  }


  async function saveSettingData() {
    if (settings) {
      console.log(settings?.data, "settingssettingssettingssettingssettingssettingssettingssettingssettingssettingssettingssettings")
      AsyncStorage.setItem('settings', JSON.stringify(settings?.data))
    }
  }

  useEffect(() => {
    getCurrentLocation();
  }, []);


  useEffect(() => {
    saveSettingData()
  }, [settings])





  //======================= render =======================
  return (
    <>
      <ThemeProvider>
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <Stack
                screenOptions={{
                  headerShown: false,
                  statusBarAnimation: 'slide',
                  // animation: 'slide_from_right',
                  // // @ts-ignore
                  // transitionSpec: {
                  //   open: {
                  //     animation: 'timing',
                  //     config: {
                  //       duration: 1,
                  //     },
                  //   },
                  //   close: {
                  //     animation: 'timing',
                  //     config: {
                  //       duration: 1,
                  //     },
                  //   },
                  // },

                }}
              >
                {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
                <Stack.Screen name="+not-found" />
              </Stack>
              <StatusBar style="auto" />
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}
