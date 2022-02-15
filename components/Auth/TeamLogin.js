import { useContext, useState } from "react";
import { Button, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { ACTIONS } from "../../global-state/reducer";
import { Context } from "../../global-state/Store";
import { AUTH_KEY } from '@env';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const TeamLogin = ({navigation}) => {
    const [state, dispatch] = useContext(Context);
    const [teamUsername, setTeamUsername] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');

    const handleLogOut = async () => {
        try {
            await AsyncStorage.removeItem(AUTH_KEY);

            dispatch({
                type: ACTIONS.USER_LOGOUT
            });
            dispatch({
                type: ACTIONS.STACK_DECIDER_REFRESH
            });
        } catch (e) {
            console.log(e);
            setStatus('Error Logging Out');
        }
    }

    const handleJoinTeam = () => {
        setStatus('Loading...');

        axios.post('https://star-trak.herokuapp.com/team-login', {
            teamUsername,
            password,
            username: state.userInfo.username,
            firstName: state.userInfo.firstName,
            lastName: state.userInfo.lastName
        })
        .then(res => {
            if (!res.data.message) {
                axios.post('https://star-trak.herokuapp.com/update-user', {
                    key: 'teamUsername',
                    updateValue: teamUsername,
                    username: state.userInfo.username
                })
                .then(updateUserRes => {
                    if (updateUserRes.data.message) {
                        setStatus(updateUserRes.data.message);
                        return;
                    }

                    dispatch({
                        type: ACTIONS.TEAM_LOGIN,
                        teamUsername
                    });

                    dispatch({
                        type: ACTIONS.STACK_DECIDER_REFRESH
                    });
                })
                .catch(() => {
                    setStatus('An unexpected error has occurred');
                });
            } else {
                setStatus(res.data.message);
            }
        })
        .catch(() => {
            setStatus('An unexpected error has occurred');
        });
    }

    return (
        <View>
            <Text>Team Login</Text>
            <TextInput
                placeholder="Team ID"
                onChangeText={text => setTeamUsername(text)}
            />
            <TextInput
                placeholder="Password"
                onChangeText={text => setPassword(text)}
                secureTextEntry={true}
            />
            <Button
                title="Join Team"
                onPress={() => handleJoinTeam()}
            />
            <Button
                title="Log Out"
                onPress={() => handleLogOut()}
            />
            <Text onPress={() => navigation.navigate('CreateTeam')}>
                Create Team
            </Text>
            {status.length !== 0 &&

                <Text>{status}</Text>
            
            }
        </View>
    );
}