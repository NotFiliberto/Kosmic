import React from "react"
import { StyleSheet, Text } from "react-native"

export type ScreenHeaderProps = {
	text: string
}

export default function ScreenHeader(props: ScreenHeaderProps) {
	return <Text style={styles.headerTextStyle}>{props.text}</Text>
}

const styles = StyleSheet.create({
	headerTextStyle: {
		fontSize: 31,
		fontWeight: "600",
		paddingHorizontal: 20,
	},
})
