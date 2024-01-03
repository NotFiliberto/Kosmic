import {
	Text,
	View,
	Dimensions,
	Image,
	ImageURISource,
	ImageSourcePropType,
} from "react-native"
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

const points = punti as wPoint[]

export type MarkerData = {
	marker: MapMarker
}

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

	const heatmapGradient = {
		colors: [
			"rgb(100, 0, 100)",
			"rgb(0, 0, 200)",
			"rgb(0, 100, 100)",
			"rgb(0, 200, 0)",
			"rgb(200, 0, 0)",
			"rgb(200, 200, 200)",
		], // Da trasparente a blu
		startPoints: [0, 0.05, 0.15, 0.3, 0.6, 0.8],
		colorMapSize: 25,
		gradientSmoothing: 0,
	}

	function getRating(score: number): string {
		var ret = "Pessima"

		if (score > 23.5) return "Ottima"
		if (score > 22.5) return "Alta"
		if (score > 21.5) return "Buona"
		if (score > 20.5) return "Mediocre"
		if (score > 19.5) return "Bassa"
		return ret
	}

	function getColorFromRating(value: number): string {
		var colorValue = ""
		if (value < 20.5) {
			colorValue = "red" // '#f2003c'
		} else if (value <= 21.5) {
			colorValue = "#ffda00"
		} else {
			colorValue = "green" // '#32cd32'
		}

		return colorValue
	}

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

	const currentLocation = locations.find(
		(l) =>
			l.coords.latitude === selectedMarker?.coordinate.latitude &&
			l.coords.longitude === selectedMarker?.coordinate.longitude
	)
	//console.log("interactiveMap: ");
	//console.log(initialRegion);

	//console.log(JSON.stringify(locations, null, 2))
	//console.log({ currentLocation })

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
					gradient={heatmapGradient}
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
