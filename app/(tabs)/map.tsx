import { StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import punti from "../../assets/data/valori_atlante_veneto.json";

const points = punti as wPoint[];

import MapView, {
	LatLng,
	Region,
	MapOverlay,
	Overlay,
	Heatmap,
	MapMarker,
	MarkerPressEvent,
	Point,
	LongPressEvent,
} from "react-native-maps";
import InteractiveMap, { MarkerData } from "../../components/InteractiveMap";
import MapPanel from "../../components/MapPanel";
import { Key } from "lucide-react-native";
import { wMarker, wPoint } from "@lib/types";

export default function MapScreen() {
	var initialRegion = {
		latitude: 46,
		longitude: 12,
		latitudeDelta: 3,
		longitudeDelta: 1,
	};

	const [region, setRegion] = useState<Region>({
		latitude: 46,
		longitude: 12,
		latitudeDelta: 3,
		longitudeDelta: 1,
	});
	/* var markers = [
        {
            id: 1,
            coordinate: { latitude: 45, longitude: 12 },
            title: "Marker 1",
        },
        // Add more markers as needed
    ]; */

	const [markers, setMarkers] = useState<wMarker[]>([]);

	const [selectedMarker, setSelectedMarker] = useState<wMarker | undefined>(
		undefined
	);

	const mapRef = useRef<MapView>(null);

	const [pollutionRate, setPollutionRate] = useState<number>();

	/* useEffect(() => {
        console.log(selectedMarker);
    }, [selectedMarker]); */

	function getWeight(pos: LatLng): number {
		var ret = 0;
		console.log("pos:");
		console.log(pos.latitude.toFixed(1), pos.longitude.toFixed(1));
		for (var point of points) {
			if (
				pos.latitude.toFixed(1) == point.Y.toFixed(1) &&
				pos.longitude.toFixed(1) == point.X.toFixed(1)
			) {
				console.log("found:");
				console.log(point.Y.toFixed(1), point.X.toFixed(1));
				return point.Valore;
			}
		}

		return ret;
	}

	function onMarkerPress(event: MarkerPressEvent): void {
		//console.log(event);
	}

	function onMapPress(): void {
		setSelectedMarker(undefined);
		setMarkers([]);
		console.log("deselected");
	}

	async function onLongPress(event: LongPressEvent) {
		var lat = event.nativeEvent.coordinate.latitude;
		var lng = event.nativeEvent.coordinate.longitude;

		var newRegion = {
			latitude: lat,
			longitude: lng,
			latitudeDelta: 3,
			longitudeDelta: 1,
		};

		const dataFromMaps = await fetch(
			`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true&language=it-IT&key=AIzaSyDe7OrltZ0dSji5xX0VwjdZcACpHEfeWFY`
		);

		const markerName = (await dataFromMaps.json()).plus_code.compound_code;
		console.log({ markerName });

		var newSelectedMarker: wMarker = {
			id: markers.length,
			coordinate: { latitude: lat, longitude: lng },
			title: markerName,
		};
		/* markers.pop();
        markers.push({
            id: 1,
            coordinate: { latitude: lat, longitude: lng },
            title: "My Marker",
        }); */

		//console.log("event: ", { event });

		setMarkers([...markers, newSelectedMarker]);
		setSelectedMarker(newSelectedMarker);

		setRegion(newRegion);

		setPollutionRate(getWeight({ latitude: lat, longitude: lng }));

		//console.log(pollutionRate);

		mapRef.current?.animateToRegion(newRegion);
		mapRef.current?.render();
		//console.log(selectedMarker)
	}

	//console.log("map: ");
	//console.log(region);

	return (
		<View style={{ flex: 1 }}>
			<InteractiveMap
				initialRegion={initialRegion}
				markers={markers}
				selectedMarker={selectedMarker}
				onMarkerPress={onMarkerPress}
				onMapPress={onMapPress}
				onLongPress={onLongPress}
				mapRef={mapRef}
				region={region}
				pollRate={pollutionRate}
			/>
		</View>
	);
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
});
