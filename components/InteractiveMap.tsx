import { View, Dimensions } from "react-native"
import MapView, {
	Marker,
	LatLng,
	Region,
	Heatmap,
	MapMarker,
	MarkerPressEvent,
	MapPressEvent,
	LongPressEvent,
} from "react-native-maps"
import { StyleSheet } from "react-native"
import React from "react"
import punti from "../assets/data/valori_atlante_veneto.json"
import MapLocationModal from "./common/MapLocationModal"
import { Location, Optional, wMarker, wPoint } from "@lib/types"
import { useLocationsStorage } from "@lib/hooks/useLocationStorage"
import { HEATMAP_GRADIENT } from "@lib/constants"
import { getColorFromRating, getRating } from "@lib/utils"

const points = punti as wPoint[]

interface InteractiveMapProps {
	initialRegion: Region
	markers: { id: number; coordinate: LatLng; title: string }[]
	selectedMarker: wMarker | undefined
	onMarkerPress: (event: MarkerPressEvent) => void
	onMapPress: (event: MapPressEvent) => void
	onLongPress: (event: LongPressEvent) => void
	mapRef: React.RefObject<MapView> | undefined
	region: Region
	pollRate: number
	modal: {
		show: boolean
		onClose: () => void
	}
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
	initialRegion,
	markers,
	onMarkerPress,
	onMapPress,
	onLongPress,
	mapRef,
	region,
	pollRate,
	selectedMarker,
	modal,
}) => {
	type WeightedLatLng = {
		latitude: number
		longitude: number
		weight: number
	}

	const weights: number[] = points.map((point) => point.Brightness) // Assuming weight is at index 2
	const minWeight: number = Math.min(...weights)
	const maxWeight: number = Math.max(...weights)

	//console.log('Minimum Weight:', minWeight);
	//console.log('Maximum Weight:', maxWeight);

	const adj_points: WeightedLatLng[] = points.map((p) => ({
		latitude: p.Y,
		longitude: p.X,
		weight: (p.Brightness - minWeight) / (maxWeight - minWeight),
	}))

	const rating = getRating(pollRate)
	//const prettyName = prettyLocationName(selectedMarker?.title)
	const prettyScore = Number(pollRate.toFixed(1))
	const ratingColor = getColorFromRating(pollRate)

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

	return (
		<View style={styles.container}>
			<MapView
				ref={mapRef}
				style={styles.map}
				initialRegion={initialRegion}
				showsUserLocation={true}
				showsMyLocationButton
				showsCompass
				onMarkerPress={onMarkerPress}
				onPress={onMapPress}
				onLongPress={onLongPress}
				provider="google"
			>
				{/* {markers.map((marker) => (
					<Marker
						key={marker.id}
						coordinate={marker.coordinate}
						title={marker.title}
					/>
				))} */}

				{selectedMarker && (
					<Marker
						key={selectedMarker.id}
						coordinate={selectedMarker.coordinate}
						title={selectedMarker.title}
					/>
				)}

				<Heatmap
					points={adj_points}
					opacity={0.5}
					radius={20}
					gradient={HEATMAP_GRADIENT}
					/*maxIntensity={}
                         gradientSmoothing={10}
                         heatmapMode={"POINTS_DENSITY"}*/
				/>
			</MapView>
			{selectedMarker && (
				<MapLocationModal
					isVisible={modal.show}
					location={{
						...(currentLocation && { _id: currentLocation._id }),
						name: selectedMarker.title,
						value: prettyScore,
						coords: markers[markers.length - 1].coordinate,
						pinned: currentLocation ? true : false,
					}}
					mapsURL={`https://maps.google.com/?q=${selectedMarker.coordinate.latitude}>,${selectedMarker.coordinate.longitude}`}
					comment={rating}
					commentColor={ratingColor}
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
