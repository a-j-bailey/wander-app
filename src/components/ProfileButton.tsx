import { Text, View } from "react-native"
import { useData } from "../hooks/useData";

const ProfileButton = ({
    size = 40
}: {
    size?: number
}) => {
    const { theme } = useData();
    return (
        <View
            style={{
                backgroundColor: theme.ui,
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
                    color: theme.tx_2
                }}
            >AB</Text>
        </View>
    )
};

export default ProfileButton;
