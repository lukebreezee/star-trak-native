import { useContext } from "react";
import { Button, Text, View } from "react-native";
import { ACTIONS } from "../global-state/reducer";
import { Context } from "../global-state/Store";

export const TeamLogin = ({navigation}) => {
    const [state, dispatch] = useContext(Context);

    const handleLogOut = () => {
        dispatch({type: ACTIONS.USER_LOGOUT});
        navigation.navigate('Login');
    }

    return (
        <View>
            <Text>Team Login</Text>
            <Button
                title="Log Out"
                onPress={() => handleLogOut()}
            />
        </View>
    );
}