// import {React, useCallback} from 'react';
// import {TouchableOpacity} from 'react-native';
// import {useNavigation} from '@react-navigation/core';
// import {Ionicons} from '@expo/vector-icons';
// import Block from './Block';
// import Image from './Image';
// import Text from './Text';
// import {useTheme, useTranslation} from '../hooks/';

import { StyleSheet, Text, View } from "react-native"

const ProfileButton = ({
    size = 40
}: {
    size?: number
}) => {
    return (
        <View
            style={{
                backgroundColor: '#4950571a',
                padding: 4,
                borderRadius: size,
                width: size,
                height: size,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Text
                style={{
                    fontWeight: 'bold',
                    color: '#495057'
                }}
            >AB</Text>
        </View>
    )

    // return (
    //     <View style={styles(highlightColor).tagContainer} >
    //         <Text style={styles(highlightColor).title}>{emoji} {title}</Text>
    //     </View>
    // )
};

export default ProfileButton;
