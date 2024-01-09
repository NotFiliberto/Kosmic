import { LatLng } from "react-native-maps"
import { wPoint, gPoint } from "./types"

import punti from "@assets/data/valori_atlante_veneto.json"

// run with: npx tsx .\scripts\getLocation.ts

// X: lng  Y: lat 
export function getLocationByCoords ( X: number | string, Y: number | string )
{
    const x = Number( X )
    const y = Number( Y )

    const points = punti as gPoint[]
    let minDistance = -1;
    let nearestPlace;
    for ( const p of points )
    {
        // p.X and p.Y are already Number type since gPoints is such
        const distance = Math.sqrt( Math.pow( x - p.X, 2 ) + Math.pow( y - p.Y, 2 ) )
        if ( minDistance == -1 || distance < minDistance )
        {
            minDistance = distance
            nearestPlace = p
        }
	}
	// esempi di X e Y:
	// X:45.11 - Y:12.10  <-> X:12.10 - Y:45.11
    console.log("\n\nLOGNAME: ", nearestPlace, "\n\n")
    return nearestPlace as gPoint
}

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
