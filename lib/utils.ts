import { LatLng } from "react-native-maps"
import { wPoint, gPoint, Location } from "./types"
import punti from "@assets/data/valori_atlante_veneto.json"
import { GOOGLE_MAPS_API_KEY } from "@env"

export function getLocationByCoords(X: number | string, Y: number | string) {
	const x = Number(X)
	const y = Number(Y)

	const points = punti as gPoint[]
	let nearestPlace = points[0]
	let minDistance = Math.sqrt(
		Math.pow(x - nearestPlace.X, 2) + Math.pow(y - nearestPlace.Y, 2)
	)
	for (const p of points) {
		// p.X and p.Y are already Number type since gPoints is such
		const distance = Math.sqrt(Math.pow(x - p.X, 2) + Math.pow(y - p.Y, 2))
		if (distance < minDistance) {
			minDistance = distance
			nearestPlace = p
		}
	}

	return nearestPlace as gPoint
}
type SearchLocationResult = {
	name: string
	geometry: { location: { lat: number; lng: number } }
}

async function findByName(name: string) {
	const req = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${name}&radius=50000&key=${GOOGLE_MAPS_API_KEY}`
	var response = await fetch(req)
	var locations = (await response.json()).results as SearchLocationResult[]
	return locations.map((l) => {
		return {
			name: l.name,
			coords: {
				latitude: l.geometry.location.lat,
				longitude: l.geometry.location.lng,
			},
		} as Omit<Location, "_id" | "pinned" | "pollutionRate">
	})
}

;(async () => {
	const result = await findByName(" Pad ")
	console.log(result)
})()

export function prettyLocationName(unformattedString: string | undefined) {
	if (unformattedString == undefined) return "Undefined"
	const splitted = unformattedString.split(" ")
	splitted.shift() // remove first item
	return splitted.join(" ")
}

export function getWeight(pos: LatLng): number {
	var ret = 0
	const points = punti as wPoint[]
	//console.log("pos:")
	//console.log(pos.latitude.toFixed(1), pos.longitude.toFixed(1))
	for (var point of points) {
		if (
			pos.latitude.toFixed(1) == point.Y.toFixed(1) &&
			pos.longitude.toFixed(1) == point.X.toFixed(1)
		) {
			//console.log("found:")
			//console.log(point.Y.toFixed(1), point.X.toFixed(1))
			return point.Valore
		}
	}

	return ret
}

export function getRating(score: number): string {
	if (score > 23.5) return "Ottima"
	if (score > 22.5) return "Alta"
	if (score > 21.5) return "Buona"
	if (score > 20.5) return "Mediocre"
	if (score > 19.5) return "Bassa"
	return "Pessima"
}

export function getColorFromRating(value: number): string {
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
