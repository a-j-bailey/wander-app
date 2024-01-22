import { Link } from "expo-router";
import { ChevronRight, LucideIcon, User } from "lucide-react-native";
import { ReactElement } from "react";
import { StyleSheet, Text, Touchable, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";

const ListItem = ({
    title,
    icon,
    link
}: {
    title: string
    icon: ReactElement<LucideIcon>
    link: string
}) => {
    return (
        <Link href={{pathname: link}} asChild>
            <TouchableOpacity style={styles.container}>
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <View style={styles.iconContainer}>
                        { icon }
                    </View>
                    <Text>{title}</Text>
                </View>
                <ChevronRight color={"darkgray"} style={{marginRight: 8}}/>
            </TouchableOpacity>
        </Link>
    )
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fafafa',
        borderBottomWidth: 0.2,
    },
    icon: {
        width: 24,
        height: 24,
    },
    iconContainer: {
        padding: 12,
    },
})

export default ListItem;