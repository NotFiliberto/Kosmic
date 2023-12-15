export type Event = {
	name: string;
	date: Date;
	text: string;
	url: string;
};

export type EventCardProps = Event;

export type wPoint = {
	X: number;
	Y: number;
	Brightness: number;
	Valore: number;
};
export type wMarker = {
	id: number;
	coordinate: { latitude: number; longitude: number };
	title: string;
};
