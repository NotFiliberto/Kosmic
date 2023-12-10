import { StyleSheet } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import InteractiveMap from "../../components/InteractiveMap";

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
    
      return (
        <View style={{ flex: 1 }}>
          <InteractiveMap initialRegion={initialRegion} markers={markers} />
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
