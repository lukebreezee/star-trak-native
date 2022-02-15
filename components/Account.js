import { useContext, useState } from "react";
import { Button, Text, View } from "react-native";
import { Context } from "../global-state/Store";
import { AUTH_KEY } from '@env';
import { ACTIONS } from "../global-state/reducer";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Account = () => {
    const [state, dispatch] = useContext(Context);
    const [status, setStatus] = useState('');

    const handleLogOut = async () => {
        try {
            await AsyncStorage.removeItem(AUTH_KEY);

            dispatch({
                type: ACTIONS.STACK_DECIDER_REFRESH
            });
        } catch {
            setStatus('Error Logging Out');
        }
    }

    return (
        <View>
            <Text>Account</Text>
            <Button
                title="Log Out"
                onPress={() => handleLogOut()}
            />
            {status.length !== 0 &&
            
                <Text>{status}</Text>
            
            }
        </View>
    );
}