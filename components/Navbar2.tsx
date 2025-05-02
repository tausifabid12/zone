import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/contexts/theme.provider'
import Text from './ui/Text'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { router } from 'expo-router'

export default function Navbar2({ title }: any) {


    // ============= hooks 
    const { themeColors } = useTheme()

    return (
        <View style={{
            width: '100%',
            backgroundColor: themeColors.background,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            paddingVertical: 14,
            marginTop: 24
        }}>

            <TouchableOpacity onPress={() => router.back()} >
                <ChevronLeftIcon size={24} color="black" />
            </TouchableOpacity>
            <Text variant='caption-lg' style={{

            }} >{title}</Text>

            <View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({})