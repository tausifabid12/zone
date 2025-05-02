

import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { View, StyleSheet } from "react-native";

const DisplayMap = ({ selectedLocation, onLocationChange, markerCoordinates, setSelectedLatAndLon }: any) => {
    const [markerPosition, setMarkerPosition] = useState({
        latitude: 26.5192,
        longitude: 85.2127,
    });

    // Update marker when user selects a new location
    useEffect(() => {
        console.log("Updated Location:", selectedLocation?.geometry?.location);
        if (markerCoordinates?.latitude && markerCoordinates?.longitude) {

            setMarkerPosition({ latitude: markerCoordinates?.latitude, longitude: markerCoordinates?.longitude });
            setSelectedLatAndLon({ latitude: markerCoordinates?.latitude, longitude: markerCoordinates?.longitude });
        }
    }, [markerCoordinates?.latitude, markerCoordinates?.longitude]);

    const handleDragEnd = (e: any) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        setMarkerPosition({ latitude, longitude });
        setSelectedLatAndLon({ latitude, longitude });
        onLocationChange({ latitude, longitude });
    };

    const handleMapPress = (e: any) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        setMarkerPosition({ latitude, longitude });
        setSelectedLatAndLon({ latitude, longitude });
        onLocationChange({ latitude, longitude });
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={{
                    latitude: markerPosition.latitude,
                    longitude: markerPosition.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
                onPress={handleMapPress}
            >
                {markerPosition && (
                    <Marker
                        coordinate={markerPosition}
                        draggable
                        onDragEnd={handleDragEnd}
                    />
                )}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    map: {
        width: "100%",
        height: "100%",
    },
});

export default DisplayMap;




