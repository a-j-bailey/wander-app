import { Text, View } from "react-native"
import { useData } from "../hooks/useData";
import { Children, ReactElement } from "react";

const Avatar = ({
    size = 40,
    color,
    text,
    object
}: {
    size?: number
    color?: string
    text?: string
    object?: ReactElement
}) => {
    const { theme } = useData();
    return (
        <View
            style={{
                backgroundColor: color ? color : theme.ui,
                padding: (size/10),
                borderRadius: size,
                width: size,
                height: size,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {text ? 
                <Text
                    style={{
                        fontWeight: 'bold',
                        color: theme.tx_2
                    }}
                >{text}</Text>
                : object
            }
            
        </View>
    )
};

export default Avatar;
