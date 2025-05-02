import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Modal,
    TouchableOpacity,
    FlatList,
    ScrollView,
} from "react-native";
import { useTheme } from "@/contexts/theme.provider";
import Text from "@/components/ui/Text";
import Icon from "@/components/shared/Icon";


const FilterModal = ({ isModalVisible, setModalVisible, setFilter }: any) => {
    const { themeColors } = useTheme();

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    // Mock filter options
    const categories = ["Electronics", "Clothing", "Home Appliances", "Books", "Toys"];
    const brands = ["Brand A", "Brand B", "Brand C", "Brand D"];
    const ratings = [5, 4, 3, 2, 1];
    const discounts = ["10% or more", "20% or more", "30% or more", "50% or more"];

    // State to manage selected filters
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedRating, setSelectedRating] = useState(null);
    const [selectedDiscount, setSelectedDiscount] = useState(null);

    return (
        <View style={styles.container}>
            {/* Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={toggleModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        {/* Header */}
                        <View style={styles.modalHeader}>
                            <Text variant="caption-lg">Filter</Text>
                            <TouchableOpacity onPress={toggleModal}>
                                <Icon name='close' size={24} />
                            </TouchableOpacity>
                        </View>

                        {/* Filter Options */}
                        <ScrollView contentContainerStyle={styles.filterOptionsContainer} style={{
                            maxHeight: 400
                        }}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                // alignItems: 'center',

                            }}>

                                <View style={{
                                    padding: 16,
                                    borderRightColor: themeColors.neutral100,
                                    borderRightWidth: 1,
                                    flex: 1
                                }}>
                                    <Text variant="body-sm" style={{
                                        color: themeColors.neutral500,
                                        marginBottom: 14

                                    }}>
                                        Ratings
                                    </Text>
                                    <Text variant="body-sm" style={{
                                        color: themeColors.neutral500,
                                        marginBottom: 14

                                    }}>
                                        Category
                                    </Text>
                                </View>

                                <View style={{
                                    padding: 16,
                                    borderRightColor: themeColors.neutral100,
                                    borderRightWidth: 1,
                                    flex: 1
                                }}>
                                    {ratings.map((rating, i) => (
                                        <TouchableOpacity
                                            key={i}
                                            onPress={() => setSelectedRating(rating)}
                                            style={styles.radioContainer}
                                        >
                                            <View
                                                style={[
                                                    styles.radioCircle,
                                                    {
                                                        // backgroundColor: themeColors.neutral700
                                                    },
                                                    selectedRating === rating &&
                                                    styles.radioSelected,

                                                ]}
                                            />
                                            <Text variant="body-sm" style={{
                                                color: themeColors.neutral600
                                            }}>{rating} Stars & Up</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>

                            </View>




                            {/* 
                            <View style={styles.filterSection}>
                                <Text variant="caption-lg">Category</Text>
                                {categories.map((category) => (
                                    <TouchableOpacity
                                        key={category}
                                        onPress={() => setSelectedCategory(category)}
                                        style={[
                                            styles.option,
                                            selectedCategory === category && styles.selectedOption,
                                        ]}
                                    >
                                        <Text>{category}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <View style={styles.filterSection}>
                                <Text variant="caption-lg">Brand</Text>
                                {brands.map((brand) => (
                                    <TouchableOpacity
                                        key={brand}
                                        onPress={() => setSelectedBrand(brand)}
                                        style={[
                                            styles.option,
                                            selectedBrand === brand && styles.selectedOption,
                                        ]}
                                    >
                                        <Text>{brand}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <View style={styles.filterSection}>
                                <Text variant="caption-lg">Rating</Text>
                                {ratings.map((rating) => (
                                    <TouchableOpacity
                                        key={rating}
                                        onPress={() => setSelectedRating(rating)}
                                        style={[
                                            styles.option,
                                            selectedRating === rating && styles.selectedOption,
                                        ]}
                                    >
                                        <Text>{rating} Stars & Up</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <View style={styles.filterSection}>
                                <Text variant="caption-lg">Discount</Text>
                                {discounts.map((discount) => (
                                    <TouchableOpacity
                                        key={discount}
                                        onPress={() => setSelectedDiscount(discount)}
                                        style={[
                                            styles.option,
                                            selectedDiscount === discount && styles.selectedOption,
                                        ]}
                                    >
                                        <Text>{discount}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View> */}
                        </ScrollView>

                        {/* Footer Buttons */}
                        <View style={{
                            position: 'absolute',
                            bottom: 30,
                            width: '100%',
                            paddingHorizontal: "16"
                        }}>
                            <View style={styles.footer}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingVertical: 12,
                                    gap: 8,
                                    marginRight: 16,
                                    width: 117,
                                    justifyContent: 'center',
                                    paddingHorizontal: 6,

                                }}>
                                    <Text
                                        variant="caption-lg"

                                        style={{
                                            color: themeColors.primary600,
                                            textAlign: 'center'
                                        }}
                                    >
                                        Clear
                                    </Text>

                                </View>
                                <TouchableOpacity
                                    onPress={() => {
                                        // handleAddToCart()
                                        setModalVisible(false)
                                    }}
                                    style={styles.addItemButton}>
                                    <Text variant="caption-md" style={styles.addItemText}>
                                        Apply
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    modalContainer: {
        backgroundColor: "#ffffff",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: 16,
    },
    modalHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    filterOptionsContainer: {
        paddingBottom: 80,
    },
    filterSection: {
        marginBottom: 16,
    },
    option: {
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    selectedOption: {
        backgroundColor: "#E5E7EB",
    },

    clearButton: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
    },
    applyButton: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: "#6200ea",
        borderRadius: 8,
    },
    applyButtonText: {
        color: "#fff",
    },
    optionsContainer: {
        paddingBottom: 80,
    },
    // filterSection: {
    //     marginBottom: 24,
    // },
    sectionTitle: {
        color: "#A1A1A1",
        fontSize: 12,
        marginBottom: 12,
        fontWeight: "600",
    },
    radioContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    radioCircle: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 1,
        marginRight: 8,
    },
    radioSelected: {
        backgroundColor: "#ffffff",
    },
    radioText: {
        fontSize: 14,
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 16,
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    quantityButton: {
        padding: 10,
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
    },
    quantityNumber: {
        marginHorizontal: 12,
    },
    addItemButton: {
        flex: 1,
        backgroundColor: "#6200ea",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
    },
    addItemText: {
        color: "#fff",
    },
});

export default FilterModal;
