import { StyleSheet } from "react-native";
import React, { useState } from 'react';
import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import MapView, { Marker, LatLng, Region, MapOverlay, Overlay, Heatmap, MapMarker, MarkerPressEvent, Point} from "react-native-maps";
import InteractiveMap, {MarkerData} from "../../components/InteractiveMap";
import MapPanel from "../../components/MapPanel";

export default function TabTwoScreen() {
    const initialRegion = {
        latitude: 45,
        longitude: 11,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
    
      const markers = [
        { id: 1, coordinate: { latitude: 37.78825, longitude: -122.4324 }, title: 'Marker 1' },
        // Add more markers as needed
      ];

      const [selectedMarker, setSelectedMarker] = useState<Point | undefined>(undefined);

      function onMarkerPress(event: MarkerPressEvent): void {
        setSelectedMarker(event.nativeEvent.position)
        console.log(event.nativeEvent.position)
      }
    
      function onMapPress(): void {
        setSelectedMarker(undefined);
        console.log("deselected")        
      }
      
    
    
      return (
        <View style={{ flex: 1 }}>
          <InteractiveMap initialRegion={initialRegion} markers={markers} onMarkerPress={onMarkerPress} onMapPress={onMapPress}/>
          
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

