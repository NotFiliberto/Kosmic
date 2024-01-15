//https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true&language=it-IT&key=${GOOGLE_MAPS_API_KEY}
//https://maps.googleapis.com/maps/api/geocode/json?latlng=45.30,11.95&sensor=true&language=it-IT&key=AIzaSyDe7OrltZ0dSji5xX0VwjdZcACpHEfeWFY

import * as fs from "fs"
import { wPoint, gPoint } from "@lib/types"
import punti from "../assets/data/valori_atlante_veneto.json"
import { prettyLocationName } from "@lib/utils"

// run with:  npx tsx .\scripts\fetchAllPlaces.ts

const GOOGLE_MAPS_API_KEY = "AIzaSyDe7OrltZ0dSji5xX0VwjdZcACpHEfeWFY";
( async () => {
	const points = punti as wPoint[]

	const gPoints: gPoint[] = []

	for ( const p of points )
	{
		var lat = p.Y
		var lng = p.X
		var req = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true&language=it-IT&key=${GOOGLE_MAPS_API_KEY}`

		var dataPoint = await fetch(req)
		var pointJson = await dataPoint.json()
		var prettyName = prettyLocationName( pointJson.plus_code.compound_code )

		gPoints.push({
			FID: p.FID,
			the_geom: p.the_geom,
			X: p.X,
			Y: p.Y,
			Brightness: p.Brightness,
			Valore: p.Valore,
			name: prettyName,
		})
	}
	
	const filePath = "./scripts/valori_atlante_veneto.json"

	const jsonPoints = JSON.stringify(gPoints, null, 2)

	fs.writeFileSync(filePath, jsonPoints, "utf-8")

	console.log( "File JSON creato con successo: ${filePath}" )
	

})()
