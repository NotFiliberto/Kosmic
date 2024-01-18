import {
	Pressable,
	StyleSheet,
	TextInput,
	View,
	ScrollView,
	Text,
} from "react-native"
import React, { useState } from "react"
import { ArrowRight, MapPinIcon, SearchIcon, XIcon } from "lucide-react-native"
import { Location } from "@lib/types"
import MapLink from "./common/MapLink"
import { useSearchStore } from "@lib/hooks/useSearchStore"

const locations = [
	{
		coords: {
			latitude: 45.89173106522956,
			longitude: 11.879997923970222,
		},
		name: "aaaaaaa",
	},
	{
		coords: {
			latitude: 45.89173106522956,
			longitude: 11.879997923970222,
		},
		name: "bbbbb",
	},
	{
		coords: {
			latitude: 45.89173106522956,
			longitude: 11.879997923970222,
		},
		name: "Vittorio Veneto",
	},
	{
		coords: {
			latitude: 45.89173106522956,
			longitude: 11.879997923970222,
		},
		name: "Vittorio Veneto",
	},
	{
		coords: {
			latitude: 45.89173106522956,
			longitude: 11.879997923970222,
		},
		name: "Vittorio Veneto",
	},
	{
		coords: {
			latitude: 45.89173106522956,
			longitude: 11.879997923970222,
		},
		name: "Vittorio Veneto",
	},
]

function SearchBar() {
	const { searchInput, setSearchInput, setPlacesFound, reset } =
		useSearchStore()

	const handleOnChange = (input: string) => {
		if (input === "") reset()
		else {
			setSearchInput(input)

			const filterd = locations.filter((l) =>
				l.name.toLocaleLowerCase().includes(input.toLocaleLowerCase())
			)
			setPlacesFound(filterd)
		}
	}

	return (
		<View style={searchBoxStyles.searchBarContainer}>
			<View
				style={{
					flexDirection: "row",
					gap: 8,
					alignItems: "center",
				}}
			>
				<SearchIcon size={24} color={searchBoxStyles.container.color} />
				<TextInput
					placeholder="Cerca..."
					style={searchBoxStyles.searchBarTextInput}
					value={searchInput}
					onChangeText={handleOnChange}
					returnKeyType="search"
					onTouchCancel={() => console.log("out")}
					//onSubmitEditing={() => onSearch(searchInput)}
				/>
			</View>

			{searchInput !== undefined && searchInput !== "" && (
				<Pressable onPress={() => reset()}>
					<XIcon size={24} color={searchBoxStyles.container.color} />
				</Pressable>
			)}
		</View>
	)
}

function LocationResult({
	location,
}: {
	location: Omit<Location, "_id" | "pinned" | "pollutionRate">
}) {
	return (
		<MapLink location={location}>
			<View style={searchBoxStyles.resultCard}>
				<Text
					style={{
						color: "#0f172a",
						fontSize: 25,
						fontWeight: "600",
					}}
				>
					{location.name}
				</Text>
				<Text style={{ color: "#0f172a" }}>
					{location.coords.latitude} / {location.coords.longitude}
				</Text>
				<MapPinIcon
					size={24}
					color={searchBoxStyles.container.color}
					style={{ alignSelf: "flex-end" }}
				/>
			</View>
		</MapLink>
	)
}

function ResultLocationsList() {
	const { placesFound, searchInput } = useSearchStore()

	if (
		placesFound.length === 0 &&
		searchInput !== undefined &&
		searchInput !== ""
	)
		return (
			<View
				style={{
					padding: 20,
					backgroundColor: "white",
					borderRadius: 16,
				}}
			>
				<Text style={{ color: "#0f172a" }}>Nessun luogo trovato.</Text>
			</View>
		)

	return (
		<ScrollView
			contentContainerStyle={{
				gap: 20,
				maxHeight: 380,
			}}
		>
			{placesFound.map((l, index) => (
				<LocationResult location={l} key={index} />
			))}
		</ScrollView>
	)
}

export default function SearchBox() {
	return (
		<View style={searchBoxStyles.container}>
			<SearchBar />
			<ResultLocationsList />
		</View>
	)
}

const searchBoxStyles = StyleSheet.create({
	container: {
		position: "absolute",
		width: "100%",
		zIndex: 10,
		top: 40,
		paddingHorizontal: 20,
		color: "#0f172a",
		gap: 20,
	},
	searchBarContainer: {
		padding: 16,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		//alignSelf: "flex-start",
		borderRadius: 16,
		width: "100%",
		backgroundColor: "white",
	},
	searchBarTextInput: {
		/* borderColor: "red",
		borderWidth: 2, */
		paddingVertical: 0,
		marginVertical: 0,
		width: "80%",
	},

	// Results list
	resultCard: {
		padding: 20,
		width: "100%",
		backgroundColor: "#fff",
		borderRadius: 16,
		gap: 4,
	},
})
