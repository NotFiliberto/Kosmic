import {
	Button,
	LayoutAnimation,
	ScrollView,
	StatusBar,
	StyleSheet,
} from "react-native"
import MapLocationModal from "@components/common/MapLocationModal"
import { SafeAreaView, Text, View } from "react-native"
import { useState } from "react"
import { useLocationsStorage } from "@lib/hooks/useLocationStorage"
import { SeparatorHorizontal } from "lucide-react-native"
import Location from "@components/Location"
import { GOOGLE_MAPS_API_KEY } from "@env"

const layoutAnimConfig = {
	duration: 300,
	update: {
		type: LayoutAnimation.Types.easeInEaseOut,
	},
	delete: {
		duration: 100,
		type: LayoutAnimation.Types.easeInEaseOut,
		property: LayoutAnimation.Properties.opacity,
	},
	create: {
		duration: 100,
		type: LayoutAnimation.Types.easeInEaseOut,
		property: LayoutAnimation.Properties.opacity,
	},
}

export default function Page() {
	const [locationModalVisible, setLocationModalVisible] = useState(false)

	const { locations, addLocation, removeLocation, removeAllLocations } =
		useLocationsStorage()

	console.log("maps api: ", GOOGLE_MAPS_API_KEY)

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Test Tab</Text>

			<Text>GOOGLE API KEY: {GOOGLE_MAPS_API_KEY} </Text>

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
				togglePin={( l ) => {
					console.log( "handle toggle pin from modal" )
					return true 
				}}
				onClose={() => setLocationModalVisible(false)}
			/>

			<SeparatorHorizontal />

			<Button
				title="add location"
				onPress={() => {
					addLocation({ name: "TESTING", pinned: true, value: 23.2, coords: { latitude: 0, longitude: 0} })
					LayoutAnimation.configureNext(layoutAnimConfig)
				}}
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
										onTogglePinned={() => {
											removeLocation(location)
											// after removing the item, we start animation
											LayoutAnimation.configureNext(
												layoutAnimConfig
											)
										} }
										coords={ {
                                                latitude: 0,
                                                longitude: 0
                                        } }  
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
		</SafeAreaView>
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
