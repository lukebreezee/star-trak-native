import { useContext, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Link } from "@react-navigation/native";
import { Context } from "../../global-state/Store";
import { ACTIONS } from "../../global-state/reducer";
import { AUTH_KEY, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '@env';
import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

// GoogleSignin.configure({
//     webClientId: GOOGLE_CLIENT_ID,
//     offlineAccess: true,
// })

export const Login = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');
    const [state, dispatch] = useContext(Context);

    const handleSignIn = () => {
        setStatus('Loading...');

        axios.post('https://star-trak.herokuapp.com/login', {
            username,
            password
        })
        .then(async res => {
            switch(res.data.message) {
                case 'Incorrect':
                    setStatus('Email or password is incorrect');
                    break;

                case 'Unknown':
                    setStatus('An unexpected error has occured');
                    break;

                default:
                    dispatch({
                        type: ACTIONS.USER_LOGIN, 
                        userInfo: res.data
                    });

                    try {
                        await AsyncStorage.setItem(AUTH_KEY, res.data.username);

                        dispatch({
                            type: ACTIONS.STACK_DECIDER_REFRESH
                        });
                    } catch (e) {
                        setStatus('An unexpected error has occurred');
                        return;
                    }

                    setStatus('');

            }
        })
        .catch(() => {
            setStatus('An unexpected error has occurred');
        });
    }

    return (
        <View style={styles.container}>
            {status.length !== 0 &&
            
                <Text>{status}</Text>
            
            }
            <Text>Please Log In</Text>
            <TextInput
                placeholder="Email"
                onChangeText={text => setUsername(text)}
            />
            <TextInput
                placeholder="Password"
                onChangeText={text => setPassword(text)}
                secureTextEntry={true}
            />
            <Button
                title="Submit"
                onPress={() => handleSignIn()}
            />
            {/* <GoogleSigninButton
            /> */}
            <Link to={{screen: 'Register'}}>Register</Link>
        </View>
    );
}