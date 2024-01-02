export function prettyLocationName(unformattedString: string | undefined) {
	if (unformattedString == undefined) return "Undefined"
	const splitted = unformattedString.split(" ")
	splitted.shift() // remove first item
	return splitted.join(" ")
}
