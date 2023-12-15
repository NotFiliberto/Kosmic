import { Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "./Themed";
import { useState } from "react";
import { PinIcon, PinOff } from "lucide-react-native";
import { RefreshControl } from "react-native-gesture-handler";
import React from "react";

type LocationProps = {
	id: string;
	name: string;
	pinned: boolean;
	value: number;
	onTogglePinned: (id: string) => void;
};

function truncateNumber(num: number) {
	return Math[num < 0 ? "ceil" : "floor"](num);
}

export default function Location(props: LocationProps) {
	const { id, name, pinned, value, onTogglePinned } = props;

	var colorValue;
	if (value < 16) {
		colorValue = "red"; // '#f2003c'
	} else if (value <= 20) {
		colorValue = "#ffda00";
	} else {
		colorValue = "green"; // '#32cd32'
	}

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
				{truncateNumber(value * 100) / 100}
			</Text>
			{/* Pressable Icon, toggles places to make them pinned or unpinned */}
			<Pressable
				onPress={() => {
					onTogglePinned(id);
				}}
			>
				{pinned ? (
					<PinOff style={styles.icon} size={24} color={"#f2003c"} />
				) : (
					<PinIcon style={styles.icon} size={24} color={"#f2003c"} />
				)}
			</Pressable>
		</View>
	);
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
		marginBottom: 20,
		backgroundColor: "#fff",
	},
	place: {
		flex: 2,
		fontSize: 16,
		fontWeight: "600", // Semi-bold
		marginHorizontal: 10,
		//padding: 2,
	},
	value: {
		// inside the code
	},
	icon: {
		flex: 1,
		marginHorizontal: 10,
	},
});
