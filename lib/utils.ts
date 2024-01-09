import { LatLng } from "react-native-maps"
import { wPoint } from "./types"

import punti from "@assets/data/valori_atlante_veneto.json"
const points = punti as wPoint[]

export function prettyLocationName(unformattedString: string | undefined) {
	if (unformattedString == undefined) return "Undefined"
	const splitted = unformattedString.split(" ")
	splitted.shift() // remove first item
	return splitted.join(" ")
}

export function getWeight(pos: LatLng): number {
	var ret = 0
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
