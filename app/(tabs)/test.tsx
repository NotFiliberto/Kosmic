import { Button, ScrollView, StatusBar, StyleSheet } from "react-native"
import MapLocationModal from "@components/common/MapLocationModal"
import { SafeAreaView, Text, View } from "react-native"
import { useState } from "react"
import { useLocationsStorage } from "@lib/hooks/useLocationStorage"
import { SeparatorHorizontal } from "lucide-react-native"
import Location from "@components/Location"

export default function Page() {
	const [locationModalVisible, setLocationModalVisible] = useState(false)

	const { locations, addLocation, removeLocation, removeAllLocations } =
		useLocationsStorage()

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
					console.log("handle toggle pin from modal")
				}}
				onClose={() => setLocationModalVisible(false)}
			/>

			<SeparatorHorizontal />

			<Button
				title="add location"
				onPress={() =>
					addLocation({ name: "TESTING", pinned: true, value: 23.2 })
				}
			/>

			<Button
				title="remove all locations "
				color={"red"}
				onPress={() => removeAllLocations()}
			/>

			<ScrollView
				style={{
					flex: 1,
					padding: 20,
					gap: 20,
					backgroundColor: "#fff",
				}}
			>
				{locations.map((location, index) => {
					return (
						location.pinned && (
							<View key={index} style={{ flex: 1 }}>
								{
									<Location
										id={location.id}
										name={location.name}
										pinned={location.pinned}
										value={location.value}
										onTogglePinned={() =>
											removeLocation(location)
										}
									/>
								}
							</View>
						)
					)
				})}
				<View
					style={{
						marginBottom: 120,
					}}
				/>
			</ScrollView>
		</View>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		backgroundColor: "#fff",
		paddingTop: StatusBar.currentHeight,
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
})
