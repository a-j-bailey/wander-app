// import {React, useCallback} from 'react';
// import {TouchableOpacity} from 'react-native';
// import {useNavigation} from '@react-navigation/core';
// import {Ionicons} from '@expo/vector-icons';
// import Block from './Block';
// import Image from './Image';
// import Text from './Text';
// import {useTheme, useTranslation} from '../hooks/';

import { useState } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native"

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

    const onPress = (event) => {
        console.log(id);
    }

    return (
        <TouchableHighlight 
            onPress={onPress}
            underlayColor='white'
        >
            <View style={styles(highlightColor).tagContainer} >
                <Text style={styles(highlightColor).title}>{emoji} {title}</Text>
            </View>
        </TouchableHighlight>
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
    },
    title: {
        color: `#${highlightColor}`,
    }
});

export default Tag;
