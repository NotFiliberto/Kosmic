import { ArrowRight } from "lucide-react-native";
import { Text, View } from "react-native";
import { EventCardProps } from "../../lib/types";

export default (props: EventCardProps) => {
    const { name, date, text } = props;

    return (
        <View
            style={{
                borderColor: "black",
                borderStyle: "solid",
                borderWidth: 4,
                borderRadius: 16,
                padding: 20,
            }}
        >
            <Text style={{ fontWeight: "600", fontSize: 25 }}>{name}</Text>
            <Text style={{ fontSize: 16 }}>
                {date.toLocaleString("it-IT", {
                    dateStyle: "full",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                })}
            </Text>
            <Text style={{ fontSize: 16 }}>
                {date.toLocaleString("it-IT", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: false,
                })}
            </Text>
            <View
                style={{
                    marginTop: 8,
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    alignItems: "flex-end",
                    gap: 8,
                }}
            >
                <Text
                    style={{
                        fontSize: 16,
                        flexGrow: 1,
                        flexShrink: 1, // per restringere il
                        flexBasis: "auto",
                    }}
                    numberOfLines={3}
                >
                    {text}
                </Text>
                <ArrowRight color="black" size={24} />
            </View>
        </View>
    );
};
