import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, Text, useColorScheme } from "react-native";

import { HomeIcon, MapIcon, NewspaperIcon, PinIcon } from "lucide-react-native";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#fff",
                tabBarInactiveTintColor: "#fff",
                tabBarStyle: {
                    backgroundColor: "#0f172a",
                    height: 76,
                    borderRadius: 16,
                    marginHorizontal: 20,
                    marginBottom: 20,
                    paddingVertical: 16,
                },

                tabBarLabel({ focused, children }) {
                    return (
                        <Text
                            style={{
                                fontSize: 14,
                                fontWeight: "bold",
                                paddingTop: 4,
                                paddingBottom: 16,
                                color: "#fff",
                                textDecorationLine: focused
                                    ? "underline"
                                    : "none",
                            }}
                        >
                            {children}
                        </Text>
                    );
                },
            }}
        >
            {/* <Tabs.Screen
                name="index"
                options={{
                    title: "Tab One",
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="code" color={color} />
                    ),
                    headerRight: () => (
                        <Link href="/modal" asChild>
                            <Pressable>
                                {({ pressed }) => (
                                    <FontAwesome
                                        name="info-circle"
                                        size={25}
                                        color={
                                            Colors[colorScheme ?? "light"].text
                                        }
                                        style={{
                                            marginRight: 15,
                                            opacity: pressed ? 0.5 : 1,
                                        }}
                                    />
                                )}
                            </Pressable>
                        </Link>
                    ),
                }}
            /> */}

            <Tabs.Screen
                name="saved"
                options={{
                    title: "Salvati",
                    tabBarIcon: ({ color }) => (
                        <PinIcon size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                        <HomeIcon size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="events"
                options={{
                    title: "Eventi",
                    tabBarIcon: ({ color }) => (
                        <NewspaperIcon size={24} color={color} />
                    ),
                }}
            />

            {/* //TODO: TESTING, set this to default screen */}
            <Tabs.Screen
                name="map"
                options={{
                    title: "Mappa",
                    tabBarIcon: ({ color }) => (
                        <MapIcon size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
