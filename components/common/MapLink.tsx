import { TextStyle } from "@expo/html-elements/build/primitives/Text"
import { useSearchStore } from "@lib/hooks/useSearchStore"
import { Location, MapUrlParams } from "@lib/types"
import { Link } from "expo-router"
import { Pressable } from "react-native"

export default function MapLink({
	location,
	children,
}: {
	location: Omit<Location, "_id" | "pinned" | "pollutionRate">
	children: React.ReactNode
}) {
	const { reset } = useSearchStore()
	return (
		<Link
			href={{
				pathname: "/(tabs)/",
				params: {
					latitude: String(location.coords.latitude),
					longitude: String(location.coords.longitude),
					title: location.name,
				} as MapUrlParams,
			}}
			asChild
		>
			<Pressable onPress={() => reset()}>{children}</Pressable>
		</Link>
	)
}
