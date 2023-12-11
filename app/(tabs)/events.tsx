import { StyleSheet, View } from "react-native";

import EventCard from "../../components/common/EventCard";
import { ScrollView } from "react-native-gesture-handler";

import eventList from "../../assets/data/eventi.json";
import { Event } from "@/lib/types";

const events = eventList as unknown as Event[];
//test

export default function TabTwoScreen() {
    return (
        <ScrollView style={styles.container}>
            {events.map((event, index) => (
                <View style={{ marginBottom: 20 }} key={index}>
                    <EventCard
                        name={event.name}
                        text={event.text}
                        date={new Date(event.date)}
                        url=""
                    />
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        gap: 20,
        backgroundColor: "#fff",
    },
});
