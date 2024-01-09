import * as fs from "fs"
import punti from "../assets/data/valori_atlante_veneto.json"
import { gPoint } from "@lib/types"

// run with: npx tsx .\scripts\getLocation.ts


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
        const distance = Math.sqrt( Math.pow( x - p.X, 2 ) - Math.pow( y - p.Y, 2 ) )
        if ( minDistance == -1 || distance < minDistance )
        {
            minDistance = distance
            nearestPlace = p
        }
    }
    console.log(nearestPlace?.name)
    return nearestPlace as gPoint
}

// esempi di X e Y:
// X:45.11 - Y:12.10  <-> X:12.10 - Y:45.11
//getLocationByCoords(12.10, 45.11)