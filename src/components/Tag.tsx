import { StyleSheet, Text, TouchableHighlight, View } from "react-native"
import { useData } from "../hooks/useData";
import { TagType } from "../services/TagService";

const Tag = (tag: TagType) => {

    const { theme, selectTag } = useData()

    // const onPress = (event) => {
    //     console.log(id);
    // }

    return (
        <TouchableHighlight 
            onPress={() => selectTag(tag)}
            underlayColor={theme.bg}
        >
            <View style={[
                styles(tag.highlightColor).tagContainer,
                {
                    backgroundColor: theme[tag.highlightColor+'_2']+'33',
                    borderColor: theme[tag.highlightColor]
                }
            ]} >
                <Text style={{color: theme.tx}}>{tag.emoji} {tag.title}</Text>
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
