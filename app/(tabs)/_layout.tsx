import { Tabs } from "expo-router"
import { Pressable, Text, useColorScheme } from "react-native"

export default function TabLayout() {
	const colorScheme = useColorScheme()

	return (
		<Tabs
			screenOptions={{
				tabBarStyle: {
					display: "none",
				},
				headerShown: false,
			}}
		></Tabs>
	)
}
