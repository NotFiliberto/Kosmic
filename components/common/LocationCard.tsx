import { Pressable, StyleSheet, TouchableOpacity } from "react-native"
import { Text, View } from "../Themed"
import { useState } from "react"
import { PinIcon, PinOff } from "lucide-react-native"
import { RefreshControl } from "react-native-gesture-handler"
import React from "react"
import { Location } from "@lib/types"
import { getColorFromRating } from "@lib/utils"

export type LocationProps = Location & {
	onTogglePinned: (id: string) => void
}

function truncateNumber(num: number) {
	return Math[num < 0 ? "ceil" : "floor"](num)
}

export default function LocationCard(props: LocationProps) {
	const { _id, name, pinned, pollutionRate, onTogglePinned } = props

	const colorValue = getColorFromRating(pollutionRate)

	return (
		<View style={styles.item}>
			{/* Saved place name */}
			<Text style={styles.place}>{name}</Text>
			{/* Pollution rate */}
			<Text
				style={{
					// value style
					flex: 1,
					fontSize: 16,
					fontWeight: "600",
					color: colorValue,
					marginHorizontal: 10,
				}}
			>
				{truncateNumber(pollutionRate * 100) / 100}
			</Text>
			{/* Pressable Icon, toggles places to make them pinned or unpinned */}
			<Pressable
				onPress={() => {
					onTogglePinned(_id)
				}}
			>
				{pinned ? (
					<PinOff style={styles.icon} size={24} color={"#f2003c"} />
				) : (
					<PinIcon style={styles.icon} size={24} color={"#f2003c"} />
				)}
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	item: {
		flex: 1,
		flexDirection: "row",
		borderWidth: 4,
		borderRadius: 15,
		alignItems: "center",
		justifyContent: "space-between",
		padding: 20,
		backgroundColor: "#fff",
	},
	place: {
		flex: 2,
		fontSize: 16,
		fontWeight: "600", // Semi-bold
		marginHorizontal: 10,
		color: "#000",
		//padding: 2,
	},
	value: {
		// inside the code
	},
	icon: {
		flex: 1,
		marginHorizontal: 10,
	},
})
