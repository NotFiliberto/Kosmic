import { Pressable, StyleSheet, View } from "react-native";

import EventCard from "../../components/common/EventCard";
import { ScrollView } from "react-native-gesture-handler";

import eventList from "../../assets/data/eventi.json";
import { Event } from "@/lib/types";
import EventModal from "../../components/common/EventModal";
import { useState } from "react";

//test
const events = eventList as unknown as Event[];

export default function EventScreen() {
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
