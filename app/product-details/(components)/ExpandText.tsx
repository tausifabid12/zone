import Text from "@/components/ui/Text";
import { useTheme } from "@/contexts/theme.provider";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const ExpandableText = ({ text, maxLength = 100 }: any) => {
    const [expanded, setExpanded] = useState(false);
    // ========== hooks 
    const { themeColors } = useTheme()
    // If text is shorter than maxLength, no need for "View More"
    const isLongText = text.length > maxLength;
    const displayText = expanded || !isLongText ? text : text.slice(0, maxLength) + "...";

    return (
        <View>
            <Text variant="body-sm" style={{ marginTop: 8, color: themeColors?.neutral700, textAlign: 'justify' }}>
                {displayText}
            </Text>
            {isLongText && (
                <TouchableOpacity onPress={() => setExpanded(!expanded)} style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 2,
                    marginTop: 3
                    // justifyContent: 'center'
                }}>
                    <Text variant="body-sm" style={{ color: themeColors.primary600, marginTop: 5 }}>
                        {expanded ? "View Less" : "View More details"}
                    </Text>

                    <View style={{
                        marginTop: 4
                    }}>
                        {expanded ? <MaterialIcons name="arrow-drop-up" size={20} color={themeColors.primary600} /> : <MaterialIcons name="arrow-drop-down" size={20} color={themeColors.primary600} />}
                    </View>
                </TouchableOpacity>
            )}
        </View>
    );
};



export default ExpandableText