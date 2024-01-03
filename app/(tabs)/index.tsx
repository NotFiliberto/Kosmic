import React, { useRef, useState } from "react"
import { getWeight, prettyLocationName } from "@lib/utils"
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
import { INITIAL_REGION } from "@lib/constants"
import { View } from "react-native"

type MapStateT = {
	region: Region
	markers: wMarker[]
	selectedMarker: wMarker | undefined
	showInfoModal: boolean
	pullutionRate: number
}

export default function MapScreen() {
	const mapRef = useRef<MapView>(null)

	const [mapState, setMapState] = useState<MapStateT>({
		region: INITIAL_REGION,
		markers: [],
		selectedMarker: undefined,
		pullutionRate: 0,
		showInfoModal: false,
	})

	const { region, markers, selectedMarker, pullutionRate, showInfoModal } =
		mapState

	function onMarkerPress(event: MarkerPressEvent): void {
		//console.log(event);
	}

	function onMapPress(event: MapPressEvent) {
		const { selectedMarker, markers, ...rest } = mapState
		setMapState({ selectedMarker: undefined, markers: [], ...rest })
		console.log("deselected")
	}

	async function onLongPress(event: LongPressEvent) {
		const lat = event.nativeEvent.coordinate.latitude
		const lng = event.nativeEvent.coordinate.longitude

		const newRegion: Region = {
			latitude: lat,
			longitude: lng,
			latitudeDelta: 3,
			longitudeDelta: 1,
		}

        //TODO: ADD function to select an existing location from 
		const dataFromMaps = await fetch(
			`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true&language=it-IT&key=${GOOGLE_MAPS_API_KEY}`
		)

		const markerName = (await dataFromMaps.json()).plus_code.compound_code
		console.log({ markerName })

		const newSelectedMarker: wMarker = {
			id: markers.length,
			coordinate: { latitude: lat, longitude: lng },
			title: prettyLocationName(markerName),
		}

		// update the state
		setMapState({
			markers: [...markers, newSelectedMarker],
			selectedMarker: newSelectedMarker,
			pullutionRate: getWeight({ latitude: lat, longitude: lng }),
			showInfoModal: true,
			region: mapState.region,
		})

		mapRef.current?.animateToRegion(newRegion)
		mapRef.current?.render()
	}

	return (
		<View style={{ flex: 1 }}>
			<InteractiveMap
				initialRegion={INITIAL_REGION}
				selectedMarker={selectedMarker}
				markers={markers}
				onMarkerPress={onMarkerPress}
				onMapPress={onMapPress}
				onLongPress={onLongPress}
				mapRef={mapRef}
				region={region}
				pollRate={pullutionRate}
				modal={{
					show: showInfoModal,
					onClose: () => {
						const { selectedMarker, showInfoModal, ...rest } =
							mapState

						setMapState({
							showInfoModal: true,
							selectedMarker: undefined,
							...rest,
						})
						console.log("deselected")
					},
				}}
			/>
		</View>
	)
}
