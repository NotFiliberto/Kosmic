import { StyleSheet } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import MapLocationModal from "@components/common/MapLocationModal";

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tab One</Text>
            <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
            />
            <EditScreenInfo path="app/(tabs)/index.tsx" />
            <MapLocationModal
                isVisible
                locationName="Vittorio veneto"
                mapsURL="https://google.com"
                coords={{ x: 21312.232, y: 23432.123 }}
                pollutionRate={21.08}
                weatherURL="https://google.com"
                togglePin={() => {
                    console.log("handle toggle pin from modal");
                }}
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
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});
