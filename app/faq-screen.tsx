import Navbar2 from '@/components/Navbar2';
import Text from '@/components/ui/Text';
import { useTheme } from '@/contexts/theme.provider';
import React, { useState } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import { ChevronDownIcon, ChevronUpIcon } from 'react-native-heroicons/outline'; // Use Heroicons package

const PricingAndFeesScreen = () => {
    const [expandedSections, setExpandedSections] = useState<any>({});



    // ========== hooks 
    const { themeColors } = useTheme()

    const toggleSection = (key: any) => {
        setExpandedSections((prev: any) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const faqData = [
        {
            question: 'Why is there an additional delivery fee?',
            answer:
                'The delivery fee covers the cost of getting your order to you quickly and safely. It varies based on the delivery speed and distance.',
        },
        {
            question: 'Are delivery fees the same for all products?',
            answer: 'Delivery fees may vary based on the size and weight of the product.',
        },
        {
            question: 'Can I see the delivery fee before placing my order?',
            answer:
                'Yes, the delivery fee will be displayed at checkout before you confirm your order.',
        },
        {
            question: 'Are there any hidden fees?',
            answer:
                'No, we believe in transparency. All fees are shown upfront before you complete your order.',
        },
    ];

    return (
        <>
            <Navbar2
                title="Pricing & Fees"

            />
            <View style={[styles.container, {
                backgroundColor: themeColors.background
            }]}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>

                    {faqData.map((item, index) => (
                        <View key={index} style={styles.faqItem}>
                            <TouchableOpacity
                                style={styles.faqHeader}
                                onPress={() => toggleSection(index)}
                            >
                                <Text variant="body-sm">{item.question}</Text>
                                {expandedSections[index] ? (
                                    <ChevronUpIcon size={18} color="#000" />
                                ) : (
                                    <ChevronDownIcon size={18} color="#000" />
                                )}
                            </TouchableOpacity>
                            {expandedSections[index] && (
                                <Text variant="body-sm" style={styles.answer}>
                                    {item.answer}
                                </Text>
                            )}
                        </View>
                    ))}

                </ScrollView>
                <View style={{
                    paddingBottom: 38
                }}>
                    <Text variant="caption-md" style={{
                        textAlign: 'center',
                        color: themeColors.primary600
                    }}>
                        Still Need Help? <Text variant="caption-md-prominent" style={{
                            color: themeColors.primary600
                        }}>Chat with Us</Text>
                    </Text>
                </View>
            </View></>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        paddingHorizontal: 16,
        paddingVertical: 20
    },
    header: {
        marginBottom: 24,
    },
    faqItem: {
        marginBottom: 16,
    },
    faqHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,

    },
    answer: {
        marginTop: 8,
        color: '#666',
    },
    helpLink: {
        marginTop: 32,
        textAlign: 'center',
        color: '#666',
    },
    chatLink: {
        color: '#0056FF',
        fontWeight: '600',
    },
});

export default PricingAndFeesScreen;
