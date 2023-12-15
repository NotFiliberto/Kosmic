import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

import EventCard from "../../components/common/EventCard";
import { ScrollView } from "react-native-gesture-handler";

import eventList from "../../assets/data/eventi.json";
import EventModal from "../../components/common/EventModal";
import { useState } from "react";
import { Event } from "@lib/types";

//test
const events = eventList as unknown as Event[];

export default function EventsScreen() {
    const [eventModal, setEventModal] = useState<{
        event: Event | undefined;
        show: boolean;
    }>({ event: undefined, show: false });

    const handleEventOnPress = (event: Event) => {
        setEventModal({ event: event, show: true });
    };

    const handleModalOnClose = () => {
        const { show, ...rest } = eventModal;
        setEventModal({ ...rest, show: false });
    };

    return (
        <SafeAreaView
            style={{ height: "100%", backgroundColor: "#fff", paddingTop: 100 }}
        >
            <ScrollView style={styles.container}>
                <EventModal
                    isVisible={eventModal.show}
                    event={eventModal.event}
                    onClose={handleModalOnClose}
                />

                {events.map((event, index) => (
                    <Pressable
                        style={{ marginBottom: 20 }}
                        key={index}
                        onPress={() => handleEventOnPress(event)}
                    >
                        <EventCard
                            name={event.name}
                            text={event.text}
                            date={new Date(event.date)}
                            url=""
                        />
                    </Pressable>
                ))}

                <View
                    style={{
                        marginBottom: 120,
                    }}
                />
            </ScrollView>
        </SafeAreaView>
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
