import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    StyleSheet,
    View,
    ViewStyle,
    StyleProp,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const SCREEN_WIDTH = Dimensions.get('window').width;

type Dimension = number | `${number}%`;

type SkeletonLoaderProps = {
    width?: Dimension;
    height?: Dimension;
    borderRadius?: number;
    style?: StyleProp<ViewStyle>;
};

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
    width = '100%',
    height = 100,
    borderRadius = 10,
    style,
}) => {
    const shimmerValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(shimmerValue, {
                toValue: 1,
                duration: 1200,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const translateX = shimmerValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-SCREEN_WIDTH, SCREEN_WIDTH],
    });

    return (
        <View
            style={[
                styles.container,
                {
                    width,
                    height,
                    borderRadius,
                } as ViewStyle, // 👈 cast to ViewStyle to satisfy TypeScript
                style,
            ]}
        >
            <Animated.View
                style={[
                    StyleSheet.absoluteFillObject,
                    {
                        transform: [{ translateX }],
                    },
                ]}
            >
                <LinearGradient
                    colors={['#e0e0e0', '#f5f5f5', '#e0e0e0']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={StyleSheet.absoluteFill}
                />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e0e0e0',
        overflow: 'hidden',
    },
});

export default SkeletonLoader;
