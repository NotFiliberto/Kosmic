import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import { Href, Link, LinkProps, usePathname } from "expo-router"
import {
	HomeIcon,
	LucideIcon,
	MapIcon,
	NewspaperIcon,
	PinIcon,
	TestTube,
} from "lucide-react-native"
import { useState } from "react"
import { Text, View, StyleSheet, Pressable } from "react-native"

const Tab = createBottomTabNavigator()

type TabBarItemProps = {
	icon: React.ReactNode
	title: string
	href: Href<string>
	selected?: boolean
}

function TabBarItem({ icon, title, href, selected = false }: TabBarItemProps) {
	return (
		<Link replace href={href}>
			<View
				style={{
					alignItems: "center",
				}}
			>
				{icon}
				<Text
					style={{
						color: styles.container.color,
						fontSize: 14,
						fontWeight: "bold",
						textDecorationLine: selected ? "underline" : "none",
					}}
				>
					{title}
				</Text>
			</View>
		</Link>
	)
}

type TabBarItem = Omit<TabBarItemProps, "onPress">
const tabs: TabBarItem[] = [
	{
		icon: <PinIcon size={24} color="#fff" />,
		title: "Salvati",
		href: "/(tabs)/saved",
	},
	{
		icon: <HomeIcon size={24} color="#fff" />,
		title: "Home",
		href: "/(tabs)/",
	},
	{
		icon: <NewspaperIcon size={24} color="#fff" />,
		title: "Eventi",
		href: "/(tabs)/events",
	},
	{
		icon: <TestTube size={24} color="#fff" />,
		title: "Test",
		href: "/(tabs)/test",
	},
]

export default function TabsBar() {
	const pathname = usePathname()

	return (
		<View style={styles.container}>
			{tabs.map((tab, index) => (
				<TabBarItem
					{...tab}
					selected={tab.href.endsWith(pathname)}
					key={index}
				/>
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
		justifyContent: "space-between",
		flexDirection: "row",
		color: "#fff",
		backgroundColor: "#0f172a",
		borderRadius: 16,
		width: "90%",
		position: "absolute",
		bottom: 20,
		marginHorizontal: 20,
	},
})
