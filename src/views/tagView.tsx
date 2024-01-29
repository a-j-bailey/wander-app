import { SafeAreaView, StyleSheet, Text, TouchableHighlight, View } from "react-native"
import { useData } from "../hooks/useData";
import { TagType } from "../services/TagService";
import { Avatar } from "../components";
import { Pencil, X } from "lucide-react-native";
import { useEffect, useState } from "react";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";

const TagView_Editing = ({
    tagData,
    setFormData
}: {
    tagData: TagType
    setFormData: (payload: TagType) => void;
}) => {

    const { theme, activeTag } = useData()

    const changeColor = (colorName: string) => {
        setFormData({
            ...tagData,
            highlightColor: colorName
        })
    }

    if (!activeTag) {
        return <Text>Please select a tag.</Text>
    }

    const colors = [
        'red',
        'orange',
        'yellow',
        'green',
        'cyan',
        'blue',
        'purple',
        'magenta',
    ]

    return (
        <View style={{
            paddingVertical: 16,
            alignItems: 'center',
            gap: 16
        }}>
            <Avatar
                size={64}
                color={theme[tagData.highlightColor]}
                object={<BottomSheetTextInput
                    style={{
                        fontSize: 32,
                    }}
                    value={tagData.emoji}
                    onChangeText={(value: string) => setFormData({
                        ...tagData,
                        emoji: value
                    })}
                    placeholder="?"
                />}
            />
            <BottomSheetTextInput
                style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: theme.tx
                }}
                onChangeText={(value: string) => setFormData({
                    ...tagData,
                    title: value
                })}
                value={tagData.title}
                placeholderTextColor={theme.ui_3}
                placeholder="A good name goes here..."
            />
            {/* COLOR PICKER */}
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 8,
                alignItems: 'flex-start',
                width: '100%',
            }}>
                {
                    colors.map((color) => (
                        <TouchableHighlight 
                            onPress={() => changeColor(color)}
                            underlayColor={theme.bg}
                            key={color}
                        >
                            <View style={{
                                width: 24,
                                height: 24,
                                borderRadius: 24,
                                backgroundColor: theme[color],
                                borderColor: theme[color+'_2'],
                                borderWidth: (tagData.highlightColor == color) ? 4 : 0,
                            }}/>
                        </TouchableHighlight>
                    ))
                }
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

const TagView = () => {
    const [ formData, setFormData ] = useState<TagType>({
        id: null,
        title: '',
        emoji: '',
        highlightColor: '',
    })

    const { theme, activeTag, selectTag } = useData();
    const [ editing, setEditing ] = useState(false);

    useEffect(() => {
        if (activeTag) {
            setFormData(activeTag);
        }
    }, [editing, activeTag])

    useEffect(() => {
        console.log('EDITING: ', editing)
        if (activeTag && activeTag.id == null) {
            setEditing(true);
        } else {
            setEditing(false);
        }
    }, [activeTag]);

    const toggleEdit = () =>{
        if (editing) {
            console.log('SAVE:');
            // TODO: Save updated entry.
        }
        setEditing(!editing);
    }

    const handleCancel = () =>{
        if (editing) {
            setFormData({
                id: null,
                title: '',
                emoji: '',
                highlightColor: '',
            })
            setEditing(false);
        } else {
            selectTag(null);
        }
    }

    if (!activeTag) {
        return <Text>Please select a tag.</Text>
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.contentContainer}>
                {/* SHEET HEADER */}
                <View style={styles.sheetHeader}>
                    <View style={{display: 'flex', flexDirection: 'row', gap: 8, alignItems: 'center'}}>
                        {(activeTag && activeTag.id != null) && 
                        <>
                            <Avatar
                                color={theme[activeTag.highlightColor]}
                                text={activeTag.emoji}
                            />
                            <Text style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: theme.tx
                            }}>{activeTag.title}</Text>
                        </>
                        }
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
                { editing ? 
                    <TagView_Editing 
                        tagData={formData}
                        setFormData={setFormData}
                    />
                    : <TagView_Viewing />
                }
            </View>
        </SafeAreaView>
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
    },
    // title: {
    //     color: `#${highlightColor}`,
    // }
});

const formStyles = StyleSheet.create({
    label: {

    },
    formRow: {

    },
    textField: {

    }
});

export default TagView;
