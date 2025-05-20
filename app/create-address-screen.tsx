import React, { useState, useRef, useEffect } from "react";
import {
    View,
    TextInput,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    StatusBar,
    Pressable,
} from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { useTheme } from "@/contexts/theme.provider";
import Text from "@/components/ui/Text";
// import DisplayMap from "@/components/DisplayMap";
import Navbar2 from "@/components/Navbar2";
import DisplayMap from "@/components/DisplayMap";
import ConfirmAddressModal from "@/components/ConfirmAddressModal";
import Loading from "@/components/shared/loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LocateFixed, Search } from "lucide-react-native";

const API_KEY = "ufkwRfSH67q92SA6g1yeYC7wlXERC0amFDCpA85y";
const REQUEST_ID = "XXX";

// const fetchAutocomplete = async (input: string) => {
//     try {
//         const url = `https://api.olamaps.io/places/v1/autocomplete?input=${encodeURIComponent(
//             input
//         )}&api_key=${API_KEY}`;

//         const response = await fetch(url);

//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         return await response.json();
//     } catch (error) {
//         console.error("Error fetching autocomplete data:", error);
//         return { predictions: [] };
//     }
// };

// export default function CreateAddress() {
//     const { themeColors } = useTheme();
//     const [query, setQuery] = useState("");
//     const [suggestions, setSuggestions] = useState<any[]>([]);
//     const [isVisible, setIsVisible] = useState(false);
//     const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
//     const [selectedLocation, setSelectedLocation] = useState<any>({});
//     const [markerCoordinates, setMarkerCoordinates] = useState({
//         latitude: 26.5192,
//         longitude: 85.2127,
//     });

//     useEffect(() => {
//         if (query.length > 2) {
//             if (debounceTimeout.current) {
//                 clearTimeout(debounceTimeout.current);
//             }
//             debounceTimeout.current = setTimeout(async () => {
//                 const data = await fetchAutocomplete(query);
//                 setSuggestions(data.predictions || []);
//             }, 300);
//         } else {
//             setSuggestions([]);
//         }
//         return () => debounceTimeout.current && clearTimeout(debounceTimeout.current);
//     }, [query]);

//     const handleSelectSuggestion = (suggestion: any) => {
//         setSelectedLocation(suggestion);
//         setMarkerCoordinates(suggestion.geometry.location);
//         setSuggestions([])
//     };

//     const handleLocationChange = (newCoordinates: any) => {
//         setMarkerCoordinates(newCoordinates);
//     };




//     return (
//         <>
//             <StatusBar
//                 translucent
//                 backgroundColor={themeColors.white}
//                 barStyle="dark-content"
//             />

//             <View style={{ flex: 1, backgroundColor: themeColors.background, position: 'relative' }}>
//                 <Navbar2 title="Confirm Delivery Location" />
//                 <ScrollView style={{ flex: 1, borderRightColor: 'red' }}>
//                     <View style={styles.inputContainer}>
//                         <MagnifyingGlassIcon size={18} color={themeColors.primary600} />
//                         <TextInput
//                             placeholder="Search Location, Area, Pincode"
//                             placeholderTextColor={themeColors.neutral300}
//                             style={styles.input}
//                             value={query}
//                             onChangeText={setQuery}
//                         />
//                     </View>
//                     {suggestions.length > 0 && (
//                         <FlatList
//                             data={suggestions}
//                             keyExtractor={(item) => item.place_id}
//                             renderItem={({ item }) => (
//                                 <TouchableOpacity onPress={() => handleSelectSuggestion(item)} style={styles.suggestionItem}>
//                                     <Text variant="body-sm" style={styles.suggestionText}>{item.description}</Text>
//                                 </TouchableOpacity>
//                             )}
//                             style={styles.suggestionsList}
//                         />
//                     )}
//                     <View style={styles.mapContainer}>
//                         {/* <DisplayMap
//                             selectedLocation={selectedLocation}
//                             onLocationChange={handleLocationChange}
//                         /> */}
//                     </View>
//                     <ConfirmAddressModal isModalVisible={isVisible} setModalVisible={setIsVisible} />
//                 </ScrollView>
//                 <View style={styles.buttonContainer}>
//                     <TouchableOpacity onPress={() => setIsVisible(true)} style={{
//                         borderRadius: 14,
//                         backgroundColor: "#4F46E5", // Primary color
//                         width: 380,
//                         height: 52,
//                         padding: 16,
//                         justifyContent: "center",
//                         alignItems: "center",
//                         gap: 8
//                     }}>
//                         <Text variant="caption-md" style={{ color: themeColors.white }}>
//                             Add More Address Details
//                         </Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </>
//     );
// }
















// API fetch function














// |||||||||||||||||||||||||||||||||||



// \\\\\\\\\\\\\\\\\

// const fetchAutocomplete = async (input: string) => {
//     try {
//         const url = `https://api.olamaps.io/places/v1/autocomplete?input=${encodeURIComponent(input)}&api_key=${API_KEY}`;
//         const response = await fetch(url);

//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         return await response.json();
//     } catch (error) {
//         console.error("Error fetching autocomplete data:", error);
//         return { predictions: [] };
//     }
// };


const fetchAutocomplete = async (input: string) => {
    try {
        const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=AIzaSyCIfqQB-NJIFyNoWUWZPy4xhqeCBRvQM-c`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching autocomplete data:", error);
        return { predictions: [] };
    }
};

const useDebouncedAutocomplete = (query: string) => {
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (query.length > 2) {
            if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
            debounceTimeout.current = setTimeout(async () => {
                const data = await fetchAutocomplete(query);

                console.log(data, '|||||||||||||||||||||||||||||||')
                setSuggestions(data.predictions || []);
            }, 300);
        } else {
            setSuggestions([]);
        }

        return () => {
            if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
        };
    }, [query]);

    return suggestions;
};




export default function CreateAddress() {
    const { themeColors } = useTheme();
    const [query, setQuery] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<any>({});
    const [loading, setLoading] = useState(false)
    const [markerCoordinates, setMarkerCoordinates] = useState({
        latitude: 26.5192,
        longitude: 85.2127,
        state: '',
        city: ''
    });

    const [selectedLatAndLon, setSelectedLatAndLon] = useState({
        latitude: 0,
        longitude: 0,
    })

    const suggestionsFromHook = useDebouncedAutocomplete(query);
    const [suggestions, setSuggestions] = useState<any[]>([]);

    useEffect(() => {
        if (!isSelected) {
            setSuggestions(suggestionsFromHook);
        }
    }, [suggestionsFromHook, isSelected]);

    const handleSelectSuggestion = (suggestion: any) => {
        setSelectedLocation(suggestion);

        setQuery(suggestion?.description);
        setIsSelected(true); // Hide suggestions
    };



    // console.log(suggestions[0], 'selectedLocation     selectedLocation    selectedLocation   selectedLocation')




    const fetchPlaceDetails = async (placeId: string) => {
        try {
            const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=AIzaSyCIfqQB-NJIFyNoWUWZPy4xhqeCBRvQM-c`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            const location = data.result.geometry.location;
            const components = data.result.address_components;

            const getComponent = (type: string) =>
                components.find((c: any) => c.types.includes(type))?.long_name;


            setMarkerCoordinates({
                latitude: location.lat,
                longitude: location.lng,
                city: getComponent("locality") || getComponent("administrative_area_level_2"),
                state: getComponent("administrative_area_level_1"),
            })

            // return };
        } catch (error) {
            console.error("Error fetching place details:", error);
            return null;
        }
    };


    async function getCurrentLatLon() {
        const strLocation = await AsyncStorage.getItem('userLocation');
        const location = JSON.parse(strLocation as string);

        setMarkerCoordinates({ ...markerCoordinates, latitude: location?.lat, longitude: location?.lon })
    }


    useEffect(() => {
        if (selectedLocation?.place_id) {
            fetchPlaceDetails(selectedLocation?.place_id)
        }
    }, [
        selectedLocation
    ])



    useEffect(() => {
        getCurrentLatLon()
    },
        [])


    if (loading) {
        return <Loading />
    }


    const handleLocationChange = (newCoordinates: any) => {
        setMarkerCoordinates(newCoordinates);
    };

    return (
        <>
            <StatusBar
                translucent
                backgroundColor={themeColors.white}
                barStyle="dark-content"
            />
            <View style={{ flex: 1, backgroundColor: themeColors.background, position: "relative" }}>
                <Navbar2 title="Confirm Delivery Location" />
                <ScrollView style={{ flex: 1, position: 'relative' }}>
                    <View style={styles.inputContainer}>
                        <Search size={20} color={themeColors.primary600} />
                        <TextInput
                            placeholder="Search Location, Area, Pincode"
                            placeholderTextColor={themeColors.neutral300}
                            style={styles.input}
                            value={query}
                            onChangeText={(text) => {
                                setQuery(text);
                                setIsSelected(false); // Show suggestions again
                            }}
                        />

                    </View>
                    <Pressable

                        onPress={() => getCurrentLatLon()}
                        style={{
                            paddingTop: 8,
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 6,
                            marginTop: -14,
                            paddingLeft: 17,
                            paddingBottom: 8
                        }}>
                        <LocateFixed color={themeColors.primary600} size={20} />
                        <Text variant="caption-sm" style={{
                            color: themeColors.primary600
                        }}>
                            Use Current Location
                        </Text>

                    </Pressable>

                    {suggestions.length > 0 && !isSelected && (
                        <FlatList
                            data={suggestions}
                            keyExtractor={(item) => item.place_id}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handleSelectSuggestion(item)} style={styles.suggestionItem}>
                                    <Text variant="body-sm" style={styles.suggestionText}>{item.description}</Text>
                                </TouchableOpacity>
                            )}
                            style={styles.suggestionsList}
                        />
                    )}

                    <View style={styles.mapContainer}>
                        <DisplayMap selectedLocation={selectedLocation} setSelectedLatAndLon={setSelectedLatAndLon} markerCoordinates={markerCoordinates} onLocationChange={handleLocationChange} />
                    </View>


                    <Pressable
                        style={{
                            backgroundColor: themeColors.background,
                            padding: 4,
                            position: 'absolute',
                            bottom: 30,
                            right: 30,
                            zIndex: 5000

                        }}
                        onPress={() => getCurrentLatLon()}
                    >
                        <LocateFixed size={20} color={themeColors.neutral400} />
                    </Pressable>

                    <ConfirmAddressModal isModalVisible={isVisible} selectedLocation={selectedLocation} setModalVisible={setIsVisible} markerCoordinates={markerCoordinates} setLoading={setLoading} selectedLatAndLon={selectedLatAndLon} />
                </ScrollView>

                <View style={{ padding: 16 }}>
                    <TouchableOpacity
                        onPress={() => setIsVisible(true)}
                        style={{
                            borderRadius: 14,
                            backgroundColor: "#4F46E5",
                            width: '100%',
                            height: 52,
                            padding: 16,
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 8,
                        }}
                    >
                        <Text variant="caption-md" style={{ color: themeColors.white }}>
                            Add More Address Details
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}


const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        paddingHorizontal: 12,
        margin: 16,
        gap: 6
    },
    input: {
        height: 40,
        flex: 1,
        color: "#333",
    },
    suggestionsList: {
        backgroundColor: "white",
        marginTop: 8,
        borderRadius: 10,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    suggestionItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
    },
    suggestionText: {
        color: "#333",
    },
    mapContainer: {
        flex: 1,
        width: "100%",
        height: 820,
        position: 'relative',
        zIndex: -100
    },
    buttonContainer: {
        paddingHorizontal: 16,
        paddingBottom: 20,
        paddingTop: 20,
        backgroundColor: "transparent",
        position: 'absolute',
        width: '100%',
        bottom: 20,
        borderRightColor: 'red',
        alignItems: 'center',
        justifyContent: 'center'
        // borderRightColor: 'red'
    },
    button: {
        backgroundColor: "#007AFF",
        alignItems: "center",
        justifyContent: "center",
        height: 52,
        borderRadius: 14,
    },
});