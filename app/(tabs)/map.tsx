import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import MapView, {
    Marker,
    LatLng,
    Region,
    MapOverlay,
    Overlay,
    Heatmap,
    MapMarker,
    MarkerPressEvent,
    Point,
    LongPressEvent,
} from "react-native-maps";
import InteractiveMap, { MarkerData } from "../../components/InteractiveMap";
import MapPanel from "../../components/MapPanel";
import { Key } from "lucide-react-native";

export default function MapScreen() {
    const initialRegion = {
        latitude: 46,
        longitude: 12,
        latitudeDelta: 3,
        longitudeDelta: 1,
    };

    /* var markers = [
        {
            id: 1,
            coordinate: { latitude: 45, longitude: 12 },
            title: "Marker 1",
        },
        // Add more markers as needed
    ]; */

    const [markers, setMarkers] = useState<
        {
            id: number;
            coordinate: { latitude: number; longitude: number };
            title: string;
        }[]
    >([]);

    const [selectedMarker, setSelectedMarker] = useState<LatLng | undefined>(
        undefined
    );

    /* useEffect(() => {
        console.log(selectedMarker);
    }, [selectedMarker]); */

    function onMarkerPress(event: MarkerPressEvent): void {
        setSelectedMarker(event.nativeEvent.coordinate);
        //console.log(event.nativeEvent.coordinate)
    }

    function onMapPress(): void {
        setSelectedMarker(undefined);
        setMarkers([]);
        console.log("deselected");
    }

    function onLongPress(event: LongPressEvent): void {
        var lat = event.nativeEvent.coordinate.latitude;
        var lng = event.nativeEvent.coordinate.longitude;
        /* markers.pop();
        markers.push({
            id: 1,
            coordinate: { latitude: lat, longitude: lng },
            title: "My Marker",
        }); */

        setMarkers([
            {
                id: 1,
                coordinate: { latitude: lat, longitude: lng },
                title: "My Marker",
            },
        ]);
        setSelectedMarker(event.nativeEvent.coordinate);
        //console.log(selectedMarker)
    }

    console.log("map: ");
    console.log(markers);

    return (
        <View style={{ flex: 1 }}>
            <InteractiveMap
                initialRegion={initialRegion}
                markers={markers}
                onMarkerPress={onMarkerPress}
                onMapPress={onMapPress}
                onLongPress={onLongPress}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 200,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});
function setSelectedMarker(marker: MarkerData) {
    throw new Error("Function not implemented.");
}
