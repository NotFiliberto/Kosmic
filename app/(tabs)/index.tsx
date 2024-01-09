import React, { useRef } from "react"
import MapView, { MarkerPressEvent, MapPressEvent } from "react-native-maps"
import InteractiveMap from "../../components/InteractiveMap"
import { MapUrlParams, wMarker } from "@lib/types"
import { INITIAL_REGION } from "@lib/constants"
import { View } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"

export default function MapScreen() {
	const router = useRouter()
	const params = useLocalSearchParams<MapUrlParams>()

	const mapRef = useRef<MapView>(null)

	function onMarkerPress(event: MarkerPressEvent): void {
		//console.log(event);
	}

	function onMapPress(event: MapPressEvent) {
		const lat = event.nativeEvent.coordinate.latitude
		const lng = event.nativeEvent.coordinate.longitude

		//TODO: ADD function to select an existing location from

		router.setParams({
			latitude: String(lat),
			longitude: String(lng),
			title: "<test>", //TODO getLocationByCoords
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
