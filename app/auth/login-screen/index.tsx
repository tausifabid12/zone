import {
    ImageBackground,
    Keyboard,
    KeyboardAvoidingView,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';
import { XCircleIcon } from 'react-native-heroicons/micro';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginScreen({ navigation }: any) {
    // =========== states==============

    const [phone, setPhone] = useState('');
    // Animation shared values
    const height = useSharedValue(400);
    const paddingBottom = useSharedValue(62);
    const opacity = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        height: height.value,
        // borderRadius: 10,
    }));

    const handlePress = () => {
        height.value = withSpring(240, {
            mass: 1,
            damping: 80,
            stiffness: 320,
        });
        paddingBottom.value = withSpring(26, {
            mass: 1,
            damping: 80,
            stiffness: 320,
        });
    };

    useEffect(() => {
        const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
            // Reverse the animation when the keyboard hides
            height.value = withSpring(400, {
                mass: 1,
                damping: 80,
                stiffness: 320,
            });
            paddingBottom.value = withSpring(62, {
                mass: 1,
                damping: 80,
                stiffness: 320,
            });
        });

        return () => {
            keyboardHideListener.remove();
        };
    }, []);

    const animatedStyleBtn = useAnimatedStyle(() => ({
        marginBottom: opacity.value,
    }));
    const animatedStyleText = useAnimatedStyle(() => ({
        paddingBottom: paddingBottom.value,
    }));

    return (
        <View
            style={{
                backgroundColor: 'white',
                flex: 1,
                position: 'relative',
            }}>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <Animated.View style={[animatedStyle]}>
                    <ImageBackground
                        source={require('../../../assets/images/top-banner.png')}
                        style={[styles.backgroundImage]}
                        resizeMode="cover">
                        <Animated.View style={[styles.overlay, animatedStyleText]}>
                            <Text style={styles.centerText}>
                                Everything you need from shops near you!
                            </Text>
                        </Animated.View>
                    </ImageBackground>
                </Animated.View>
                <KeyboardAvoidingView>
                    <View style={styles.formContainer}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignContent: 'center',
                                justifyContent: 'center',
                                gap: 14,
                                marginBottom: 20,
                            }}>
                            <View
                                style={{
                                    height: 1,
                                    backgroundColor: '#E2E8F0',
                                    flexGrow: 1,
                                    marginTop: 14,
                                }}
                            />
                            <Text style={styles.loginTitle}>Log in or signup</Text>
                            <View
                                style={{
                                    height: 1,
                                    backgroundColor: '#E2E8F0',
                                    flexGrow: 1,
                                    marginTop: 14,
                                }}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.countryCode}>+91</Text>
                            <TextInput
                                onPress={handlePress}
                                style={{
                                    flex: 1,
                                    fontSize: 16,
                                    color: '#1E293B',
                                    fontFamily: 'Poppins-Regular',
                                }}
                                placeholder="Enter your mobile number"
                                keyboardType="phone-pad"
                                maxLength={10}
                                placeholderTextColor={'#CBD5E1'}
                                value={phone}
                                onChangeText={setPhone}
                            />
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>

            <View
                style={[
                    {
                        width: '100%',
                        paddingHorizontal: 20,
                        paddingBottom: 20,
                        backgroundColor: 'transparent',
                    },
                    animatedStyleBtn,
                ]}>
                <View
                    style={{
                        marginTop: 140,
                    }}></View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('OTPVerificationScreen')}
                    style={{
                        borderRadius: 12,
                        overflow: 'hidden', // Ensure gradient respects the border radius
                    }}>
                    <LinearGradient
                        colors={
                            phone?.length == 10
                                ? ['#818CF8', '#4F46E5']
                                : ['#F1F5F9', '#F1F5F9']
                        } // Gradient colors
                        style={{
                            paddingVertical: 15,
                            paddingHorizontal: 30,
                            borderRadius: 12,
                            alignItems: 'center',
                        }}>
                        <Text
                            style={{
                                color: '#fff',
                                fontSize: 16,
                                fontWeight: 'bold',
                            }}>
                            Continue
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>

            </View>

            {/* skip btn */}
            <View
                style={{
                    paddingVertical: 8,
                    paddingHorizontal: 20,
                    position: 'absolute',
                    top: 60,
                    right: 16,
                    backgroundColor: '#00000040',
                    borderRadius: 9999999,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Text
                    style={{
                        fontFamily: 'Poppins-Regular',
                        letterSpacing: -0.5,
                        color: 'white',
                        fontSize: 14,
                        lineHeight: 20,
                    }}>
                    Skip
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    centerText: {
        fontSize: 24,
        color: '#fff',
        fontWeight: '500',
        textAlign: 'center',
    },
    formContainer: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        position: 'relative',
        marginTop: 32,
        minHeight: '40%',
    },
    loginTitle: {
        fontSize: 18,
        fontFamily: 'Poppins-Regular',
        fontWeight: '400',
        color: '#64748B',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#CBD5E1',
        borderRadius: 14,
        width: '100%',
        paddingHorizontal: 16,
        marginBottom: 20,
        backgroundColor: '#FFF',
        elevation: 4,
        shadowRadius: 6,
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: '#F1F5F9',
        paddingTop: 4,
        height: 58,

    },
    countryCode: {
        fontSize: 16,
        color: '#1E293B',
        fontFamily: 'Poppins-Medium',
        marginRight: 8,
    },
    continueButton: {
        width: '100%',
        borderRadius: 14,
        paddingVertical: 16,
        alignItems: 'center',
        marginBottom: 10,
    },
    continueButtonText: {
        fontSize: 16,
        color: '#CBD5E1',
        fontFamily: 'Poppins-Bold',
    },
    agreementText: {
        fontSize: 12,
        color: '#808080',
        textAlign: 'center',
        fontFamily: 'Poppins-Black',
    },
    linkText: {
        color: '#000',
        fontFamily: 'Poppins-Bold',
    },
});
