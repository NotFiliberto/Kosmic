import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import { CloudSunIcon, MapIcon, PinIcon } from "lucide-react-native";
import { LatLng, Point } from "react-native-maps";
import { A } from "@expo/html-elements";

export type MapLocationModalProps = {
	isVisible: boolean;
	locationName: string;
	pollutionRate: number | undefined;
	comment: string;
	commentColor: string;
	coords: LatLng;
	mapsURL: string;
	weatherURL: string;
	togglePin: (coords: LatLng) => void;
};

//TODO add animation to this modal
export default function MapLocationModal({
	isVisible,
	coords,
	locationName,
	pollutionRate,
	comment,
	commentColor,
	mapsURL,
	weatherURL,
	togglePin,
}: MapLocationModalProps) {
	if (!isVisible) return null;
	
	
	return (
		<View style={styles.container}>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
				}}
			>
				<View style={styles.locationInfo}>
					<Text style={styles.locationName}>{locationName}</Text>
					<View style={styles.locationCoordinates}>
						<Text>{coords.latitude.toFixed(2)}</Text>
						<Text>{coords.longitude.toFixed(2)}</Text>
					</View>
				</View>
				<View style={styles.pollutionTextInfo}>
					<Text style={{...styles.lightPollutionRate, color: commentColor}}>
						{pollutionRate}
					</Text>
					<Text style={{...styles.lightPollutionValue, color: commentColor}}>
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
					<Pressable onPress={() => togglePin(coords)}>
						<PinIcon color="black" size={48} />
					</Pressable>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex" /* 
		borderColor: "red",
		borderWidth: 2, */,
		width: "90%",
		bottom: 116, // 20 from the buttom border + 76 (tabs's height) + 20 margin fro tabs
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
		lineHeight: 20,
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
		lineHeight: 39,
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
});
