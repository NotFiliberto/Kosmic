import { Pressable, StyleSheet } from "react-native"
import { Text, View } from "../../components/Themed"
import { CloudSunIcon, MapIcon, PinIcon } from "lucide-react-native"
import { LatLng, Point } from "react-native-maps"
import { A } from "@expo/html-elements"
import ReactNativeModal from "react-native-modal"
import { Location, Optional } from "@lib/types"

export type MapLocationModalProps = {
	isVisible: boolean
	location: Optional<Location, "_id">
	comment: string
	commentColor: string
	mapsURL: string
	weatherURL: string
	togglePin: (location: Optional<Location, "_id">) => void
	onClose: () => void
}

//TODO add animation to this modal
export default function MapLocationModal({
	isVisible,
	location,
	comment,
	commentColor,
	mapsURL,
	weatherURL,
	togglePin,
	onClose,
}: MapLocationModalProps) {
	if (!isVisible) return null

	return (
		<ReactNativeModal
			animationIn="slideInUp"
			animationOut="slideOutDown"
			isVisible={isVisible}
			onBackdropPress={onClose}
			backdropOpacity={0.5}
			hideModalContentWhileAnimating={true}
			style={styles.modalContainer}
		>
			<View style={styles.container}>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
					}}
				>
					<View style={styles.locationInfo}>
						<Text style={styles.locationName}>{location.name}</Text>
						<View style={styles.locationCoordinates}>
							<Text>{location.coords.latitude.toFixed(2)}</Text>
							<Text>{location.coords.longitude.toFixed(2)}</Text>
						</View>
					</View>
					<View style={styles.pollutionTextInfo}>
						<Text
							style={{
								...styles.lightPollutionRate,
								color: commentColor,
							}}
						>
							{location.value}
						</Text>
						<Text
							style={{
								...styles.lightPollutionValue,
								color: commentColor,
							}}
						>
							{comment}
						</Text>
					</View>
				</View>
				<View style={styles.ctas}>
					<A href={mapsURL}>
						<MapIcon color="black" size={48} />
					</A>
					<View style={{ flexDirection: "row", gap: 24 }}>
						<A href={weatherURL}>
							<CloudSunIcon color="black" size={48} />
						</A>
						<Pressable onPress={() => togglePin(location)}>
							{location.pinned ? (
								<PinIcon color="black" fill="black" size={48} />
							) : (
								<PinIcon color="black" size={48} />
							)}
						</Pressable>
					</View>
				</View>
			</View>
		</ReactNativeModal>
	)
}

const styles = StyleSheet.create({
	modalContainer: {
		position: "relative",
		width: "90%",
		height: "100%",
	},

	container: {
		display: "flex",
		width: "100%",
		bottom: 96, // 20 from the buttom border + 76 (tabs's height) + 20 margin fro tabs
		position: "absolute",
		borderRadius: 16,
		padding: 20,
	},
	locationInfo: {},
	pollutionTextInfo: {
		alignItems: "flex-end",
	},
	locationName: {
		fontSize: 20,
		//lineHeight: 20,
		fontWeight: "600" /* 
		borderColor: "red",
		borderWidth: 2, */,
		maxWidth: 150, // TODO change and find a better solution
	},
	locationCoordinates: {
		paddingTop: 8,
	},

	lightPollutionRate: {
		fontSize: 39,
		fontWeight: "600",
		//lineHeight: 39,
		color: "#166534",
	},
	lightPollutionValue: {
		fontSize: 25,
		fontWeight: "600",
		color: "#166534",
	},
	ctas: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingTop: 12,
	},
})
