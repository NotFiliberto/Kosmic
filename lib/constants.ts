export const INITIAL_REGION = {
	latitude: 46,
	longitude: 12,
	latitudeDelta: 3,
	longitudeDelta: 1,
}

export const HEATMAP_GRADIENT = {
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
