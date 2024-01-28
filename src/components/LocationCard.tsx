import { StyleSheet, Text, TouchableHighlight, View } from "react-native"

const LocationCard = ({
    id,
    title,
    latitude,
    longitude,
    auid,
    address
}: {
    id?: number,
    title: string,
    latitude: number,
    longitude: number,
    auid?: number,
    address?: string
}) => {

    const onPress = (event) => {
        console.log(id);
    }

    return (
        <TouchableHighlight 
            onPress={onPress}
            underlayColor='white'
        >
            <View style={styles.container} >
                <View style={styles.imageContainer}>

                </View>
                <View style={styles.dataContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.address}>{address}</Text>
                </View>
            </View>
        </TouchableHighlight>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fafafa',
        
        // Display
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

        // Spacing
        marginVertical: 8,
        padding: 8,
        gap: 8, // flexbox gap between items

        // Border
        borderRadius: 16,
        
    },
    imageContainer: {
        backgroundColor: 'blue',
        borderRadius: 8,
        width: 56,
        height: 56
    },
    dataContainer: {
        // height: '100%',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    address: {
        fontSize: 12,
        fontWeight: '300'
    }
});

export default LocationCard;
