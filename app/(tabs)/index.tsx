import { StyleSheet } from "react-native"
import React, { useEffect, useRef, useState } from "react"
import EditScreenInfo from "../../components/EditScreenInfo"
import { Text, View } from "../../components/Themed"
import punti from "../../assets/data/valori_atlante_veneto.json"
const points = punti as wPoint[]
import { prettyLocationName } from "@lib/utils"
import MapView, {
	LatLng,
	Region,
	MarkerPressEvent,
	LongPressEvent,
	MapPressEvent,
} from "react-native-maps"
import InteractiveMap from "../../components/InteractiveMap"
import { wMarker, wPoint } from "@lib/types"
import { GOOGLE_MAPS_API_KEY } from "@env"

export default function MapScreen() {
	//TODO move to constants.ts
	var initialRegion = {
		latitude: 46,
		longitude: 12,
		latitudeDelta: 3,
		longitudeDelta: 1,
	}

	const [region, setRegion] = useState<Region>({
		latitude: 46,
		longitude: 12,
		latitudeDelta: 3,
		longitudeDelta: 1,
	})

	const [markers, setMarkers] = useState<wMarker[]>([])

	const [showInfoModal, setShowInfoModal] = useState(false)

	const [selectedMarker, setSelectedMarker] = useState<wMarker | undefined>(
		undefined
	)

	const mapRef = useRef<MapView>(null)

	const [pollutionRate, setPollutionRate] = useState<number>(0)

	function getWeight(pos: LatLng): number {
		var ret = 0
		console.log("pos:")
		console.log(pos.latitude.toFixed(1), pos.longitude.toFixed(1))
		for (var point of points) {
			if (
				pos.latitude.toFixed(1) == point.Y.toFixed(1) &&
				pos.longitude.toFixed(1) == point.X.toFixed(1)
			) {
				console.log("found:")
				console.log(point.Y.toFixed(1), point.X.toFixed(1))
				return point.Valore
			}
		}

		return ret
	}

	function onMarkerPress(event: MarkerPressEvent): void {
		//console.log(event);
	}

	function onMapPress(event: MapPressEvent) {
		setSelectedMarker(undefined)
		setMarkers([])
		console.log("deselected")
	}

	async function onLongPress(event: LongPressEvent) {
		var lat = event.nativeEvent.coordinate.latitude
		var lng = event.nativeEvent.coordinate.longitude

		var newRegion = {
			latitude: lat,
			longitude: lng,
			latitudeDelta: 3,
			longitudeDelta: 1,
		}

		const dataFromMaps = await fetch(
			`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true&language=it-IT&key=${GOOGLE_MAPS_API_KEY}`
		)

		const markerName = (await dataFromMaps.json()).plus_code.compound_code
		console.log({ markerName })

		var newSelectedMarker: wMarker = {
			id: markers.length,
			coordinate: { latitude: lat, longitude: lng },
			title: prettyLocationName(markerName),
		}
		/* markers.pop();
        markers.push({
            id: 1,
            coordinate: { latitude: lat, longitude: lng },
            title: "My Marker",
        }); */

		setMarkers([...markers, newSelectedMarker])
		setSelectedMarker(newSelectedMarker)

		setRegion(newRegion)

		setPollutionRate(getWeight({ latitude: lat, longitude: lng }))

		setShowInfoModal(true)

		mapRef.current?.animateToRegion(newRegion)
		mapRef.current?.render()
	}

	return (
		<View style={{ flex: 1 }}>
			<InteractiveMap
				initialRegion={initialRegion}
				selectedMarker={selectedMarker}
				markers={markers}
				onMarkerPress={onMarkerPress}
				onMapPress={onMapPress}
				onLongPress={onLongPress}
				mapRef={mapRef}
				region={region}
				pollRate={pollutionRate}
				modal={{
					show: showInfoModal,
					onClose: () => {
						setShowInfoModal(false)

						setSelectedMarker(undefined)
						console.log("deselected")
					},
				}}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 200,
		fontWeight: "bold",
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
})
