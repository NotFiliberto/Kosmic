import { Button, StatusBar, StyleSheet } from "react-native";
import MapLocationModal from "@components/common/MapLocationModal";
import { SafeAreaView, Text, View } from "react-native";
import { useState } from "react";

export default function Page() {
	const [locationModalVisible, setLocationModalVisible] = useState(true);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Test Tab</Text>

			<Text>Vtesto a caso</Text>

			<Button
				title="show modal"
				onPress={() => setLocationModalVisible(true)}
			/>

			<MapLocationModal
				isVisible={locationModalVisible}
				locationName={"Vittorio veneto"}
				mapsURL={`https://maps.google.com/?q=${234}>,${3242}`}
				coords={{ latitude: 23.21, longitude: 23.23 }}
				pollutionRate={23}
				comment={"Buono"}
				commentColor={"green"}
				weatherURL="https://3bmeteo.com"
				togglePin={() => {
					console.log("handle toggle pin from modal");
				}}
				onClose={() => setLocationModalVisible(false)}
			/>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingTop: StatusBar.currentHeight,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#000",
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
});
