import React from 'react';
import { View, StyleSheet, Pressable, ViewStyle } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

interface TooltipProps {
    visible: boolean;
    onClose: () => void; // 👈 add onClose callback
    top?: number | string;
    left?: number | string;
    children: React.ReactNode;
    style?: ViewStyle;
}

const Tooltip: React.FC<TooltipProps> = ({ visible, onClose, top = '40%', left = '40%', children, style }) => {
    if (!visible) return null;

    return (
        <Pressable
            style={StyleSheet.absoluteFillObject}
            onPress={onClose}
        >
            <Animated.View
                entering={FadeIn.duration(300)}
                exiting={FadeOut.duration(200)}
                //@ts-ignore
                style={[styles.tooltip, { top, left }, style]}
                onStartShouldSetResponder={() => true} // 👈 important: block touches inside tooltip
            >
                {children}
            </Animated.View>
        </Pressable>
    );
};

export default Tooltip;

const styles = StyleSheet.create({
    tooltip: {
        position: 'absolute',
        alignSelf: 'center',
        padding: 10,
        borderRadius: 8,
        zIndex: 10,
    },
});
