import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Context } from "./global-state/Store";

export const HomeScreen = ({ navigation }) => {
    const [state, dispatch] = useContext(Context);

    return (
        <View>
            <Text>Welcome Home, {state.userInfo.firstName}</Text>
        </View>
    );
}

// const styles = StyleSheet.create({
//     home: {
//         alignSelf: 'center',
//         justifySelf: 'center'
//     }
// });