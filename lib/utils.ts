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
