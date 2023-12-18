import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Href, Link, LinkProps } from "expo-router";
import {
	HomeIcon,
	LucideIcon,
	MapIcon,
	NewspaperIcon,
	PinIcon,
	TestTube,
} from "lucide-react-native";
import { Text, View, StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();

type TabBarItemProps = {
	icon: React.ReactNode;
	title: string;
	href: Href<string>;
};

function TabBarItem({ icon, title, href }: TabBarItemProps) {
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
					}}
				>
					{title}
				</Text>
			</View>
		</Link>
	);
}

export default function TabsBar() {
	return (
		<View style={styles.container}>
			<TabBarItem
				icon={<PinIcon size={24} color="#fff" />}
				title="Salvati"
				href="/(tabs)/saved"
			/>
			{/* TODO: use map screen */}

			<TabBarItem
				icon={<HomeIcon size={24} color="#fff" />}
				title="Home"
				href="/(tabs)/"
			/>
			<TabBarItem
				icon={<NewspaperIcon size={24} color="#fff" />}
				title="Eventi"
				href="/(tabs)/events"
			/>
			{/* <TabBarItem
				icon={<MapIcon size={24} color="#fff" />}
				title="Map"
				href="/(tabs)/map"
			/> */}
			<TabBarItem
				icon={<TestTube size={24} color="#fff" />}
				title="test"
				href="/(tabs)/test"
			/>
		</View>
	);
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
});
