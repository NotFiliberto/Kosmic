import {
	Pressable,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	Text,
	View,
} from "react-native"

import EventCard from "../../components/common/EventCard"
import { ScrollView } from "react-native-gesture-handler"

import eventList from "../../assets/data/eventi.json"
import EventModal from "../../components/common/EventModal"
import { useState } from "react"
import { Event } from "@lib/types"
import ScreenHeader from "@components/common/ScreenHeader"

//test
const events = eventList as unknown as Event[]

export default function EventsScreen() {
	const [eventModal, setEventModal] = useState<{
		event: Event | undefined
		show: boolean
	}>({ event: undefined, show: false })

	const handleEventOnPress = (event: Event) => {
		setEventModal({ event: event, show: true })
	}

	const handleModalOnClose = () => {
		const { show, ...rest } = eventModal
		setEventModal({ ...rest, show: false })
	}

	const now = Date.now()

	return (
		<SafeAreaView
			style={{
				height: "100%",
				backgroundColor: "#fff",
				paddingTop: StatusBar.currentHeight,
			}}
		>
			<ScreenHeader text="Eventi" />
			<ScrollView
				style={styles.container}
				contentContainerStyle={{
					gap: 20,
				}}
			>
				<EventModal
					isVisible={eventModal.show}
					event={eventModal.event}
					onClose={handleModalOnClose}
				/>

				{events
					.filter((e) => new Date(e.date).getTime() >= now)
					.sort(
						(a, b) =>
							new Date(a.date).getTime() -
							new Date(b.date).getTime()
					)
					.map((event, index) => (
						<Pressable
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
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#fff",
	},
})
