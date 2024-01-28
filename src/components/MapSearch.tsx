import { Search, X } from "lucide-react-native";
import { useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableHighlight, View } from "react-native"
import { BlurView } from "expo-blur"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";

const OpenSearch = ({ }: {}) => {
    
    return (
        <View>
            
        </View>
    )
}

const ClosedSearch = ({ }: {}) => {
    return (
        <Search color={'white'} />
    )
}

const MapSearch = ({ }: {}) => {
    const windowWidth = Dimensions.get('window').width;
    const insets = useSafeAreaInsets();
    const [open, setOpen] = useState(false);

    return (
        <View
            style={[
                outerStyles(insets.top, insets.right).outer,
                open ? {width: (
                    windowWidth // window width
                    - (insets.right * 2) // insets
                    - 16 // inner padding
                    - 4 // border
                )} : {}
            ]}>
            <TouchableHighlight
                underlayColor='white'
                style={styles.outerContainer}
            >
                <BlurView style={styles.blurContainer} intensity={open ? 50 : 10}>
                    {
                        open ? 
                        <>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Search..."
                                placeholderTextColor={'white'}
                                // onChangeText={text => setLink(text)}
                            />
                            <X
                                style={styles.button}
                                color={'white'}
                                onPress={() => setOpen(!open)}
                            />
                        </>
                        
                        : <Search
                            color={'white'}
                            onPress={() => setOpen(!open)}
                        />
                    }
                </BlurView>
            </TouchableHighlight>
        </View>
    )
};

const outerStyles = (x, y) => StyleSheet.create({
    outer: {
        position: 'absolute',
        top: (x + 10),
        right: (y + 10),
        shadowColor: `#212121`,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
})

const styles = StyleSheet.create({
    outerContainer: {
        backgroundColor: `#2121211A`,

        // Border
        borderRadius: 16,
        borderWidth: 2,
        borderColor: `#FFFFFF`,
        overflow: 'hidden',
    },
    blurContainer: {
        padding: 8,
        display: 'flex',
        flexDirection: 'row',
    },
    textInput: {
        flexGrow: 1,
    },
    button: {
        flexShrink: 1,
    }
});

export default MapSearch;
