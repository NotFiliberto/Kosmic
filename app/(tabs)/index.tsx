import React, { useRef } from "react"
import MapView, { MarkerPressEvent, MapPressEvent } from "react-native-maps"
import InteractiveMap from "../../components/InteractiveMap"
import { MapUrlParams, wMarker } from "@lib/types"
import { INITIAL_REGION } from "@lib/constants"
import { Keyboard, TouchableWithoutFeedback, View } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import { getLocationByCoords } from "@lib/utils"
import SearchBox from "@components/SearchBox"
import { useKeyboard } from "@react-native-community/hooks"

export default function MapScreen() {
	const router = useRouter()
	const keyboard = useKeyboard()
	const params = useLocalSearchParams<MapUrlParams>()

	const mapRef = useRef<MapView>(null)

	function onMarkerPress(event: MarkerPressEvent): void {
		//console.log(event);
	}

	function onMapPress(event: MapPressEvent) {
		Keyboard.dismiss()

		const lat = event.nativeEvent.coordinate.latitude
		const lng = event.nativeEvent.coordinate.longitude

		//TODO: ADD function to select an existing location from
		const location = getLocationByCoords(lng, lat)

		router.setParams({
			latitude: String(lat),
			longitude: String(lng),
			title: location.name, //TODO getLocationByCoords
		})
	}

	console.log({ params })

	const selectedMarker =
		params.title == undefined || params.title == ""
			? undefined
			: ({
					coordinate: {
						latitude: Number(params.latitude),
						longitude: Number(params.longitude),
					},
					title: params.title,
			  } as wMarker)

	console.log({ selectedMarker })

	return (
		<View style={{ flex: 1 }}>
			<SearchBox />
			<InteractiveMap
				initialRegion={INITIAL_REGION}
				selectedMarker={selectedMarker}
				onMarkerPress={onMarkerPress}
				onMapPress={onMapPress}
				mapRef={mapRef}
				pollRate={20}
				modal={{
					show: Object.keys(params).length === 0 ? false : true,
					onClose: () => {
						router.setParams({
							latitude: "",
							longitude: "",
							title: "",
						}) // reset

						console.log("deselected", params)
					},
				}}
			/>
		</View>
	)
}
