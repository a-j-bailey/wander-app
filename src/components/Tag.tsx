import { StyleSheet, Text, TouchableHighlight, View } from "react-native"
import { useData } from "../hooks/useData";

const Tag = ({
    id,
    title,
    emoji,
    highlightColor
}: {
    id: number,
    title: string,
    emoji: string,
    highlightColor: string
}) => {

    const { theme } = useData()

    const onPress = (event) => {
        console.log(id);
    }

    return (
        <TouchableHighlight 
            onPress={onPress}
            underlayColor={theme.bg}
        >
            <View style={[
                styles(highlightColor).tagContainer,
                {
                    backgroundColor: theme[highlightColor+'_2']+'33',
                    borderColor: theme[highlightColor]
                }
            ]} >
                <Text style={{color: theme.tx}}>{emoji} {title}</Text>
            </View>
        </TouchableHighlight>
    )
};

const styles = (highlightColor) => StyleSheet.create({
    tagContainer: {
        // Spacing
        paddingVertical: 2,
        paddingHorizontal: 8,
        marginRight: 8,
        marginBottom: 8,

        // Border
        borderRadius: 16,
        borderWidth: 1,
        // borderColor: `#${highlightColor}`,
    },
    // title: {
    //     color: `#${highlightColor}`,
    // }
});

export default Tag;
