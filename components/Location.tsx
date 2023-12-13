import { StyleSheet, TouchableOpacity } from "react-native";
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
	onTogglePinned: (item: { id: string; name: string; value: number; pinned: boolean } | undefined) => void;
};

function truncateNumber(num: number) {
	return Math[num < 0 ? "ceil" : "floor"](num);
}

export default function Location ( props: LocationProps )
{
	const id = props.id
	const name = props.name;
	const [pinned, setPinned] = useState(props.pinned);
	//const [value, setValue] = useState(0)
	const value = props.value;
	const onToggle = props.onTogglePinned;

	var colorValue;

	if (value < 16) {
		colorValue = "red"; // '#f2003c'
	} else if (value >= 16 && value <= 20) {
		colorValue = "#ffda00";
	} else {
		colorValue = "green"; // '#32cd32'
	}

	return (
		<View style={ styles.item } lightColor="#eee" darkColor="rgba(255,255,255,0.1)">
			{/* Item body */}
			<View style={styles.body}>
				{/* Saved place name */}
				<Text style={styles.place}>{name}</Text>
				{/* Pollution rate */}
				<Text
                    style={ {
                        flex: 1,
						fontSize: 16,
						fontWeight: "600",
						color: colorValue,
					}}
				>
					{truncateNumber(value * 100) / 100}
				</Text>
				{/* Pressable Icon, toggles places to make them pinned or unpinned */}
				<TouchableOpacity
					activeOpacity={1} //
                    onPress={ () =>
                    {
						setPinned( !pinned )
						console.log("\n\n\nprop pinned: ", !pinned, " : id=", props.id,"")
                        props.onTogglePinned( { id: id, name: name, value: value, pinned: !pinned } )
                    }}
				>
					{pinned == true ? (
						<PinIcon
							style={styles.icon}
							size={24}
							color={"#f2003c"}
						/>
					) : (
						<PinOff
							style={styles.icon}
							size={24}
							color={"#f2003c"}
						/>
					)}
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create( {
    item: {
        flex: 1,
        //marginTop: 10, // becomes 20 -> 10 under + 10 above  between 2 items
    },
	body: {
		flex: 1,
		flexDirection: "row",
		//borderColor: "white", // light: #eee, dark: rgba(255,255,255,0.1)
		borderWidth: 4,
		borderRadius: 15,
		alignItems: "center",
		justifyContent: "space-between",
        padding: 20,
        //marginBottom: 20,
	},
    place: {
        flex: 2,
		fontSize: 16,
		fontWeight: "600", // Semibold: 600
	},
    value: {
        // inside the code
    },
    icon: {
        flex: 1
    },
});
