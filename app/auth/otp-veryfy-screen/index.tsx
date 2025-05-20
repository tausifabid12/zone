import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/solid';
import { LinearGradient } from 'expo-linear-gradient';

const OTPVerificationScreen = ({ navigation }: any) => {
    const [otp, setOtp] = useState(['', '', '', '']); // State to handle OTP input

    // Handle OTP change
    const handleOtpChange = (text: string, index: number) => {
        const updatedOtp = [...otp];
        updatedOtp[index] = text;

        // Move focus to the next input automatically
        if (text && index < otp.length - 1) {
            const nextInput = `otp-${index + 1}`;
            // @ts-ignore
            this[nextInput]?.focus();
        }
        setOtp(updatedOtp);
    };

    return (
        <>
            <StatusBar translucent backgroundColor="white" barStyle="dark-content" />
            <View
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: 'white',
                    marginTop: 30,
                    paddingVertical: 24,
                    paddingHorizontal: 20,
                }}>
                <ChevronLeftIcon color={'#1E293B'} />
                <Text
                    style={{
                        color: '#1E293B',
                        fontSize: 18,
                        fontWeight: '500',
                        fontFamily: 'Roboto-Medium',
                    }}>
                    OTP Verification
                </Text>
                <View></View>
            </View>
            <View style={styles.container}>
                <Text style={styles.subtitle}>
                    We’ve sent a code to{' '}
                    <Text style={styles.phoneNumber}>+91-91500-64417</Text>
                </Text>

                {/* OTP Input Boxes */}
                <View style={styles.otpContainer}>
                    {otp.map((value, index) => (
                        <TextInput
                            key={index}
                            style={[styles.otpInput, value ? styles.otpInputActive : null]}
                            maxLength={1}
                            keyboardType="numeric"
                            value={value}
                            onChangeText={text => handleOtpChange(text, index)}
                        // ref={input => (this[`otp-${index}`] = input)}
                        />
                    ))}
                </View>

                {/* Resend Section */}
                <Text style={styles.resendText}>
                    Didn’t get the OTP?{' '}
                    <Text style={styles.resendLink}>Resend SMS in 20s</Text>
                </Text>
            </View>

            {/* Continue Button */}
            <View
                style={{
                    padding: 20,
                    backgroundColor: 'white',
                }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('DeliveryType')}
                    style={{
                        borderRadius: 12,
                        overflow: 'hidden',
                    }}>
                    <LinearGradient
                        colors={['#818CF8', '#4F46E5']}
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
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 52,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#1E293B',
    },
    subtitle: {
        fontSize: 16,
        color: '#64748B',
        textAlign: 'center',
        marginBottom: 28,
        fontFamily: 'Poppins-Regular',
    },
    phoneNumber: {
        color: '#1E293B',
        fontWeight: '600',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingHorizontal: 60,
    },
    otpInput: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        textAlign: 'center',
        fontSize: 18,
        color: '#000',
    },
    otpInputActive: {
        borderColor: '#6200EE', // Active border color
    },
    resendText: {
        textAlign: 'center',
        fontSize: 14,
        color: '#1E293B',
        marginBottom: 20,
        fontFamily: 'Poppins-Regular',
    },
    resendLink: {
        color: '#64748B',
        fontFamily: 'Poppins-Regular',
    },
    continueButton: {
        backgroundColor: '#6200EE',
        borderRadius: 8,
        paddingVertical: 15,
        alignItems: 'center',
    },
    continueButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default OTPVerificationScreen;
