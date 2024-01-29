import { StyleSheet, Text, TouchableHighlight, View } from "react-native"
import { useData } from "../hooks/useData";
import { TagType } from "../services/TagService";
import { Avatar } from "../components";
import { Edit, Pencil, X } from "lucide-react-native";
import { useState } from "react";

const TagView_Editing = () => {

    const { theme, activeTag } = useData()

    if (!activeTag) {
        return <Text>Please select a tag.</Text>
    }

    return (
        <View style={styles.contentContainer}>
          <View>
            <Text>Editing</Text>
          </View>
        </View>
    )
};

const TagView_Viewing = () => {

    const { theme, activeTag } = useData()

    if (!activeTag) {
        return <Text>Please select a tag.</Text>
    }

    return (
        <View style={styles.contentContainer}>
          <View>
            <Text>Viewing</Text>
          </View>
        </View>
    )
};

const TagView = ({
    edit = true
}: {
    edit: boolean
}) => {

    const { theme, activeTag, selectTag } = useData()
    const [ editing, setEditing ] = useState(edit)

    const toggleEdit = () =>{
        setEditing(!editing);
    }

    const handleCancel = () =>{
        if (editing) {
            setEditing(false);
        } else {
            selectTag(null);
        }
    }

    if (!activeTag) {
        return <Text>Please select a tag.</Text>
    }

    return (
        <View style={styles.contentContainer}>
          {/* SHEET HEADER */}
          <View style={styles.sheetHeader}>
            <View style={{display: 'flex', flexDirection: 'row', gap: 8, alignItems: 'center'}}>
                <Avatar
                    color={theme[activeTag.highlightColor]}
                    text={activeTag.emoji}
                />
                <Text style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: theme.tx
                }}>{activeTag.title}</Text>
            </View>
            <View style={{display: 'flex', flexDirection: 'row', gap: 8}}>
                {
                    !editing ? 
                        <TouchableHighlight 
                            onPress={() => toggleEdit()}
                            underlayColor={theme.bg}
                        >
                            <Avatar
                                size={24}
                                color={theme.ui}
                                object={<Pencil color={theme.tx_2} size={12}/>}
                            />
                        </TouchableHighlight>
                        : <TouchableHighlight 
                            onPress={() => toggleEdit()}
                            underlayColor={theme.bg}
                            style={{
                                backgroundColor: theme.green_2,
                                borderRadius: 20,
                                paddingHorizontal: 12,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{
                                color: theme.tx,
                                fontWeight: 'bold'
                            }}>Save</Text>
                        </TouchableHighlight>
                }
                <TouchableHighlight 
                    onPress={() => handleCancel()}
                    underlayColor={theme.bg}
                >
                    <Avatar
                        size={24}
                        color={theme.ui}
                        object={<X color={theme.tx_2} size={16}/>}
                    />
                </TouchableHighlight>
            </View>
          </View>
          <View>
            { editing ? 
                <TagView_Editing />
                : <TagView_Viewing />
            }
          </View>
        </View>
    )
};

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 0,
        padding: 20,
        paddingBottom: 30,
      },
      sheetHeader: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
        alignItems: 'center',
        paddingBottom: 8,
        borderBottomWidth: 0.2,
        borderBottomColor: 'gray',
      },
    // title: {
    //     color: `#${highlightColor}`,
    // }
});

export default TagView;
