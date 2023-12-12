import {
	RefreshControl,
	StyleSheet,
	ScrollView,
	Pressable,
	Alert,
	GestureResponderEvent,
} from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import Location from "../../components/Location";

import React, { useState } from "react";
import { FlatList } from "react-native-gesture-handler";

const savedPlacesFromLocalDB = [
	{ id: "1", name: "Vittorio Veneto", value: 21.08, pinned: false },
	{ id: "2", name: "Mestre", value: 19.71, pinned: true },
	{ id: "3", name: "45.3661, 11.6649", value: 15.18, pinned: true },
	{ id: "3", name: "45.3661, 11.6649", value: 15.18, pinned: true },
	{ id: "3", name: "45.3661, 11.6649", value: 15.18, pinned: true },
	{ id: "3", name: "45.3661, 11.6649", value: 15.18, pinned: true },
];

export default function TabTwoScreen() {
	// Data for FlatList
	const [places, setPlaces] = useState<typeof savedPlacesFromLocalDB>(
		savedPlacesFromLocalDB
	);

	const handleOnPressAdd = (event: GestureResponderEvent) => {
		console.log("add location");
		//set state su places (setPlaces)
	};
	const handleTogglePin = (locationId: string) => {
		//set state su places (setPlaces)
		console.log({ locationId });
	};

	return (
		<View style={styles.container}>
			{/* Controls the generic page refresh */}

			{/* Header with button */}
			<View style={styles.header}>
				<Text style={styles.title}>Luoghi salvati</Text>
				<Pressable style={styles.button} onPress={handleOnPressAdd}>
					<Text style={styles.textButton}>Add location</Text>
				</Pressable>
			</View>
			{/* Separator*/}
			<View
				style={styles.separator}
				lightColor="#eee"
				darkColor="rgba(255,255,255,0.1)"
			/>
			{/* FlatList of Location(s) */}
			{/* 			<FlatList
				keyExtractor={(item, index) => index.toString()}
				data={places}
				extraData={places} // ultra importante per vedere quando i dati cambiano
				contentContainerStyle={{
					alignContent: "center",
					marginTop: 20,
				}}
				renderItem={({ item }) => {
					if (item.pinned == false) {
						//deleteListItem(item.id - 1)

						console.log("\nI love this\n");
					}

					return (
						<Location
							k={item.id}
							name={item.name}
							pinned={item.pinned}
							value={item.value}
							onTogglePinned={(index, value) => {
								item.pinned = value ? false : true;
							}}
						></Location>
					);
				}}
				ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
			></FlatList> */}

			<ScrollView>
				{places.map((place, index) => (
					<View style={{ marginBottom: 20 }} key={index}>
						<Location
							id={place.id}
							name={place.name}
							pinned={place.pinned}
							value={place.value}
							onTogglePinned={handleTogglePin}
						/>
					</View>
				))}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		/* alignItems: "center",
        justifyContent: "center", */
		padding: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		/* borderColor: 'orange',
        borderWidth: 4, */
		padding: 20,
	},
	button: {
		backgroundColor: "blue",
		borderColor: "grey",
		borderWidth: 4,
		borderRadius: 15,
		justifyContent: "center",
		alignItems: "center",
		padding: 3,
	},
	textButton: {
		fontSize: 20,
		fontWeight: "600",
		height: "25%",
		textAlign: "center",
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
		//color: 'white'
	},
});
