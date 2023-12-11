import { StyleSheet } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import Location from "../../components/Location";

import { useState } from 'react'
import { FlatList } from "react-native-gesture-handler";

type CardProps = {
    name: string;
    qta?: number;
};

const Card = function ({ name, qta }: CardProps) {
    return (
        <>
            <Text>
                {name} - {qta}
            </Text>
        </>
    );
};

export default function TabTwoScreen() {

    // Data for FlatList
    const [Places, setPlaces] = useState([
        { key: '1', name: "Vittorio Veneto", 
          value: 21.08, pinned: false },
        { key: '2', name: "Mestre", 
          value: 19.71, pinned: false },
        { key: '3', name: "45.3661, 11.6649", 
          value: 15.18, pinned: false },
    ])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Luoghi salvati</Text>
            <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
            />
            <FlatList
            keyExtractor={(item, index) => index.toString() }
            data={Places}
            renderItem={ ( { item } ) => (
                <Location
                name={ item.name }
                pinned={ item.pinned } 
                value={ item.value }
                ></Location>
            )}
            ItemSeparatorComponent={() => <View style={{height: 20}} />}
            >
            </FlatList>
            <Card name="test" />
            <EditScreenInfo path="app/(tabs)/three.tsx" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        /* alignItems: "center",
        justifyContent: "center", */
        padding: 20,
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
