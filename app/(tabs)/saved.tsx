import {
	StyleSheet,
	ScrollView,
	SafeAreaView,
	Pressable,
	LayoutAnimation,
} from "react-native"

import { View, Text } from "../../components/Themed"

import React, { useEffect, useState } from "react"

import LocationCard from "@components/common/LocationCard"
import { useLocationsStorage } from "@lib/hooks/useLocationStorage"
import ScreenHeader from "@components/common/ScreenHeader"

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

export default function LocationScreen() {
	const { locations, addLocation, removeLocation, removeAllLocations } =
		useLocationsStorage()

	return (
		<SafeAreaView style={styles.safe}>
			<ScreenHeader text="I miei luoghi" />
			<View style={styles.header}>
				<Pressable
					style={[
						styles.button_storage,
						{ backgroundColor: "lightgreen" },
					]}
					onPress={() => removeAllLocations()}
				>
					<Text style={styles.text_button_storage}>
						REMOVE ALL LOCAL
					</Text>
				</Pressable>
				<Pressable
					style={[
						styles.button_storage,
						{ backgroundColor: "lightblue" },
					]}
					onPress={() => {
						//addLocation({ name: "TESTING", pinned: true, value: 23.2, coords })
						LayoutAnimation.configureNext(layoutAnimConfig)
					}}
				>
					<Text style={styles.text_button_storage}>ADD PLACE</Text>
				</Pressable>
			</View>
			<ScrollView style={styles.container}>
				{locations &&
					locations.map((location, index) => {
						return (
							location.pinned && (
								<View style={styles.item} key={index}>
									{
										<LocationCard
											_id={location._id}
											name={location.name}
											pinned={location.pinned}
											value={location.value}
											onTogglePinned={() => {
												removeLocation(location)
												// after removing the item, we start animation
												LayoutAnimation.configureNext(
													layoutAnimConfig
												)
											}}
											coords={location.coords}
										/>
									}
								</View>
							)
						)
					})}
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	safe: {
		flex: 1,
		backgroundColor: "#fff",
		paddingTop: 40,
		/* borderWidth: 2,
        borderColor: 'red', */
		paddingBottom: 95,
		gap: 10,
	},
	container: {
		flex: 1,
		paddingHorizontal: 20,
		gap: 20,
		backgroundColor: "#fff",
	},
	item: {
		flex: 1,
	},
	header: {
		paddingHorizontal: 20,
		gap: 10,
		paddingBottom: 10,
	},
	button_storage: {
		//width: 200,
		borderRadius: 15,
	},
	text_button_storage: {
		textAlign: "center",
		fontSize: 20,
		fontWeight: "bold",
		padding: 5,
	},
})
