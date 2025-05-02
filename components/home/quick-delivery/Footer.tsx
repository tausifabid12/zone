import { StyleSheet, View } from 'react-native'
import React from 'react'
import Text from '@/components/ui/Text'
import { useTheme } from '@/contexts/theme.provider'

export default function Footer() {
    // ========== hooks 
    const { themeColors } = useTheme()

    return (
        <View style={{
            paddingVertical: 64,
            paddingHorizontal: 16,
            backgroundColor: themeColors.neutral100
        }}>
            <Text variant='title-sm'
                style={{
                    color: themeColors.neutral400,
                    width: 220,
                    marginBottom: 24
                }} >App’s Great Tagline
            </Text>

            <Text variant='caption-xl-prominent'
                style={{
                    color: themeColors.neutral400,
                    width: 220
                }} >Zone ♡e</Text>
        </View>
    )
}

const styles = StyleSheet.create({})