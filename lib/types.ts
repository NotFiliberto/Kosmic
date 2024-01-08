import { LocationProps } from "@components/common/LocationCard"
import { LatLng } from "react-native-maps"

export type Event = {
	name: string
	date: Date
	text: string
	url: string
}

export type EventCardProps = Event

export type wPoint = {
	FID: string
	the_geom: string
	X: number
	Y: number
	Brightness: number
	Valore: number
}
export type wMarker = {
	id: number
	coordinate: { latitude: number; longitude: number }
	title: string
}

export type Location = {
	_id: string
	name: string
	coords: LatLng
	value: number
	pinned: boolean
}

// do not change these
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
