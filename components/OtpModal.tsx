import React, { useState, useEffect } from "react";
import {
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import Modal from "react-native-modal";
import Text from "./ui/Text";
import { useTheme } from "@/contexts/theme.provider";

const OtpModal = ({ isModalVisible, setModalVisible }: any) => {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [resendTimer, setResendTimer] = useState(20);


    // ========== hooks 
    const { themeColors } = useTheme()

    // @ts-ignore
    const handleChange = (value, index) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Automatically focus on the next input if a value is entered
        if (value && index < otp.length - 1) {
            // @ts-ignore
            inputs[index + 1].focus();
        }
    };
    // @ts-ignore
    const inputs = [];

    useEffect(() => {
        // Countdown timer for the "Resend email" functionality
        const interval = setInterval(() => {
            setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Modal
            isVisible={isModalVisible}
            onBackdropPress={() => setModalVisible(false)}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            backdropOpacity={0.5}
            style={styles.modal}
        >
            <View style={styles.modalContent}>
                <Text
                    variant="body-md"
                    style={{
                        marginBottom: 28,
                        color: themeColors.neutral400
                    }} >We’ve sent a code to your email ID</Text>

                {/* OTP Input */}
                <View style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={(ref) => (inputs[index] = ref)}
                            style={[styles.otpInput, {
                                borderColor: themeColors.neutral300,

                            }]}
                            value={digit}
                            onChangeText={(value) => handleChange(value, index)}
                            keyboardType="numeric"
                            maxLength={1}
                        />
                    ))}
                </View>

                {/* Resend Email */}
                <Text variant="body-sm" style={{
                    marginBottom: 32
                }}>
                    Didn’t get the OTP?{" "}
                    {resendTimer === 0 ? (
                        <Text style={styles.resendLink}>Resend email</Text>
                    ) : (
                        <Text style={styles.timerText}>Resend email in {resendTimer}s</Text>
                    )}
                </Text>

                {/* Confirm Button */}
                <TouchableOpacity style={[styles.confirmButton, {
                    backgroundColor: themeColors.primary600,
                    alignItems: 'center',

                }]}>
                    <Text style={styles.confirmButtonText}>Confirm</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        justifyContent: "flex-end", // Makes the modal appear from the bottom
        margin: 0, // Removes the default margin around the modal
    },
    modalContent: {
        width: "100%",
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: "center",
        height: 338,
        paddingVertical: 50,
        paddingHorizontal: 16
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        color: "#4A4A4A",
        marginBottom: 30,
        textAlign: "center",
    },
    otpContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    otpInput: {
        width: 40,
        height: 40,
        borderRadius: 10,
        borderWidth: 1,
        textAlign: "center",
        fontSize: 18,
        color: "#4A4A4A",
        marginHorizontal: 5,
    },
    resendText: {
        fontSize: 14,
        color: "#4A4A4A",
        marginBottom: 30,
    },
    resendLink: {
        color: "#6C63FF",
        fontWeight: "600",
    },
    timerText: {
        color: "#A5A5A5",
    },
    confirmButton: {
        paddingVertical: 15,
        paddingHorizontal: 60,
        borderRadius: 10,
        marginBottom: 20,
        width: '100%'
    },
    confirmButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});

export default OtpModal;
