// import {React, useCallback} from 'react';
// import {TouchableOpacity} from 'react-native';
// import {useNavigation} from '@react-navigation/core';
// import {Ionicons} from '@expo/vector-icons';
// import Block from './Block';
// import Image from './Image';
// import Text from './Text';
// import {useTheme, useTranslation} from '../hooks/';

import { StyleSheet, Text, View } from "react-native"

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

    console.log(title);

    return (
        <View style={styles(highlightColor).tagContainer} >
            <Text style={styles(highlightColor).title}>{emoji} {title}</Text>
        </View>
    )
};

const styles = (highlightColor) => StyleSheet.create({
    tagContainer: {
        backgroundColor: `#${highlightColor}1A`,
        
        // Spacing
        paddingVertical: 2,
        paddingHorizontal: 8,
        marginRight: 8,
        marginBottom: 8,

        // Border
        borderRadius: 16,
        borderWidth: 1,
        borderColor: `#${highlightColor}`,

        // Shadow
        shadowColor: `#${highlightColor}`,
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 4,

        // transform: [{scale: 0.9}],
    },
    title: {
        color: `#${highlightColor}`,
        filter: 'brightness(85%)',
    }
});

export default Tag;
