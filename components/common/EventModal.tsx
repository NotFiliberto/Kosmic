import { Event } from "@lib/types"
import { CrossIcon, XIcon } from "lucide-react-native"
import {
	View,
	Text,
	Pressable,
	StyleSheet,
	GestureResponderEvent,
	ScrollView,
} from "react-native"
import ReactNativeModal from "react-native-modal"

export type EventModalProps = {
	event: Event | undefined
	isVisible: boolean
	onClose: () => void
}

export default function EventModal(props: EventModalProps) {
	const { isVisible, onClose, event } = props

	if (!event || event == undefined) return null

	event.date = new Date(event.date)

	return (
		<ReactNativeModal
			animationIn="slideInUp"
			animationOut="slideOutDown"
			isVisible={isVisible}
			onBackdropPress={onClose}
			style={{ margin: 0 }}
		>
			<View style={styles.modalContent}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>{event.name}</Text>
					<Pressable onPress={onClose}>
						<XIcon name="close" color="#fff" size={22} />
					</Pressable>
				</View>
				<ScrollView>
					<View style={styles.contentContainer}>
						<Text style={{ paddingVertical: 8 }}>
							<Text style={{ fontWeight: "600" }}>
								Data evento:{" "}
							</Text>

							<Text>
								{event.date.toLocaleString("it-IT", {
									dateStyle: "full",
									month: "long",
									day: "numeric",
									year: "numeric",
								})}
							</Text>
						</Text>

						<Text style={{ fontWeight: "600" }}>Descrizione:</Text>
						<Text style={styles.eventText}>{event.text}</Text>
					</View>
				</ScrollView>
			</View>
		</ReactNativeModal>
	)
}

const styles = StyleSheet.create({
	modalContent: {
		height: "90%",
		width: "100%",
		backgroundColor: "#fff",
		borderTopRightRadius: 18,
		borderTopLeftRadius: 18,
		position: "absolute",
		bottom: 0,
	},
	titleContainer: {
		height: "8%",
		backgroundColor: "#0f172a",
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
		paddingHorizontal: 20,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	title: {
		color: "#fff",
		fontSize: 16,
	},
	pickerContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 50,
		paddingVertical: 20,
	},
	contentContainer: {
		padding: 20,
	},
	eventText: {},
})
