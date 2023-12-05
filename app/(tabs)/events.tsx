import { StyleSheet } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";

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
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Eventi</Text>
            <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
            />
            <Card name="test" />
            <EditScreenInfo path="app/(tabs)/three.tsx" />
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
