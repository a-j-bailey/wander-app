import { Text, View } from "react-native"

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
