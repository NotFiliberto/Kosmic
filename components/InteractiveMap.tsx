import { View, Dimensions } from "react-native"
import MapView, {
	Marker,
	Region,
	Heatmap,
	MarkerPressEvent,
	MapPressEvent,
} from "react-native-maps"
import { StyleSheet } from "react-native"
import React from "react"
import punti from "../assets/data/valori_atlante_veneto.json"
import MapLocationModal from "./common/MapLocationModal"
import { Location, Optional, wMarker, wPoint } from "@lib/types"
import { useLocationsStorage } from "@lib/hooks/useLocationStorage"
import { HEATMAP_GRADIENT } from "@lib/constants"
import { getColorFromRating, getRating, getWeight } from "@lib/utils"

// ======= Heatmap setup
const points = punti as wPoint[]
type WeightedLatLng = {
	latitude: number
	longitude: number
	weight: number
}

const weights: number[] = points.map((point) => point.Brightness) // Assuming weight is at index 2
const minWeight: number = Math.min(...weights)
const maxWeight: number = Math.max(...weights)

const adj_points: WeightedLatLng[] = points.map((p) => ({
	latitude: p.Y,
	longitude: p.X,
	weight: (p.Brightness - minWeight) / (maxWeight - minWeight),
}))
// ======= Heatmap setup

interface InteractiveMapProps {
	initialRegion: Region
	selectedMarker: wMarker | undefined
	onMarkerPress: (event: MarkerPressEvent) => void
	onMapPress: (event: MapPressEvent) => void
	//	onLongPress: (event: LongPressEvent) => void
	mapRef: React.RefObject<MapView> | undefined
	pollRate: number
	modal: {
		show: boolean
		onClose: () => void
	}
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
	initialRegion,
	onMarkerPress,
	onMapPress,
	mapRef,
	selectedMarker,
	modal,
}) => {
	const { locations, removeLocation, addLocation } = useLocationsStorage()

	const handleTogglePin = (location: Optional<Location, "_id">) => {
		if (location._id !== undefined) {
			// untoggle
			removeLocation(location as Location)
		} else {
			addLocation(location)
		}
	}

	// get current location if modal is open
	const currentLocation = locations.find(
		(l) =>
			l.coords.latitude === selectedMarker?.coordinate.latitude &&
			l.coords.longitude === selectedMarker?.coordinate.longitude
	)

	const region =
		selectedMarker &&
		({
			latitude: selectedMarker.coordinate.latitude,
			longitude: selectedMarker.coordinate.longitude,
			latitudeDelta: 3,
			longitudeDelta: 1,
		} as Region)

	const pollutionRate =
		selectedMarker &&
		Number(
			getWeight({
				latitude: selectedMarker.coordinate.latitude,
				longitude: selectedMarker.coordinate.longitude,
			}).toFixed(1)
		)
	const rating = pollutionRate ? getRating(pollutionRate) : undefined
	const ratingColor = selectedMarker && getColorFromRating(pollutionRate!)

	return (
		<View style={styles.container}>
			<MapView
				ref={mapRef}
				style={styles.map}
				initialRegion={initialRegion}
				showsUserLocation={true}
				onMarkerPress={onMarkerPress}
				onPress={onMapPress}
				//onLongPress={onLongPress}
				provider="google"
				region={region}
			>
				{selectedMarker && (
					<Marker
						coordinate={selectedMarker.coordinate}
						title={selectedMarker.title}
					/>
				)}
				<Heatmap
					points={adj_points}
					opacity={0.5}
					radius={20}
					gradient={HEATMAP_GRADIENT}
				/>
			</MapView>

			{selectedMarker && selectedMarker.title !== "" && (
				<MapLocationModal
					isVisible={modal.show}
					location={{
						...(currentLocation && { _id: currentLocation._id }),
						name: selectedMarker.title,
						value: pollutionRate!,
						coords: selectedMarker.coordinate,
						pinned: currentLocation ? true : false,
					}}
					mapsURL={`https://maps.google.com/?q=${selectedMarker.coordinate.latitude}>,${selectedMarker.coordinate.longitude}`}
					comment={rating!}
					commentColor={ratingColor!}
					weatherURL="https://3bmeteo.com"
					togglePin={handleTogglePin}
					onClose={modal.onClose}
				/>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	map: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
	},
})

export default InteractiveMap
