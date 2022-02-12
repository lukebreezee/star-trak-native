import { useContext, useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Link, useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { Context } from "../global-state/Store";
import { ACTIONS } from "../global-state/reducer";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export const Login = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');
    const [state, dispatch] = useContext(Context);

    useFocusEffect(() => {
        setStatus('');

        if (state.userInfo !== null) {
            if (state.teamInfo !== null) {
                navigation.navigate('Home');
            } else {
                navigation.navigate('TeamLogin');
            }
        }
    });
    
    const handleSignIn = () => {
        setStatus('Loading...');

        axios.post('https://star-trak.herokuapp.com/login', {
            username,
            password
        })
        .then(res => {
            switch(res.data.message) {
                case 'Incorrect':
                    setStatus('Email or password is incorrect');
                    break;

                case 'Unknown':
                    setStatus('An unexpected error has occured');
                    break;

                default:
                    setStatus('');
                    dispatch({
                        type: ACTIONS.USER_LOGIN, 
                        userInfo: res.data
                    });

                    if (!res.data.teamUsername) {
                        navigation.navigate('TeamLogin');
                        return;
                    } 

                    axios.post('https://star-trak.herokuapp.com/get-team-info', {
                        teamUsername: state.userInfo.teamUsername
                    })
                    .then(res => {
                        dispatch({
                            type: ACTIONS.TEAM_INFO_UPDATE,
                            teamInfo: res.data
                        });
                        navigation.navigate('Home');
                    });
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
            <Link to={{screen: 'Register'}}>Register</Link>
        </View>
    );
}