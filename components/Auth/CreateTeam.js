import axios from "axios";
import { useContext, useState } from "react";
import { Button, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { checkPassword } from "../../helpers";
import { ACTIONS } from "../../global-state/reducer";
import { Context } from "../../global-state/Store";

export const CreateTeam = ({navigation}) => {
    const [state, dispatch] = useContext(Context);
    const [teamName, setTeamName] = useState('');
    const [teamId, setTeamId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [status, setStatus] = useState('');

    const handleCreateTeam = () => {
        setStatus('Loading...');

        if (teamName.length > 20) {
            setStatus('Team name cannot be more than 20 characters');
            return;
        }
        if (teamId.length > 15) {
            setStatus('Team ID cannot be more than 15 characters');
            return;
        }
        if (/\s/.test(teamId)) {
            setStatus('Team ID cannot contain a space');
            return;
        }
        if (password !== confirmPassword) {
            setStatus('Passwords must match');
            return;
        }

        const passwordCheck = checkPassword(password);

        if (passwordCheck.length !== 0) {
            setStatus(passwordCheck);
            return;
        }

        axios.post('https://star-trak.herokuapp.com/create-team', {
            teamName,
            username: teamId,
            password,
            members: [
                {
                    username: state.userInfo.username,
                    role: 'admin',
                    firstName: state.userInfo.firstName,
                    lastName: state.userInfo.lastName
                }
            ]
        })
        .then(res => {
            switch(res.data) {
                case 'Unknown':
                    setStatus('An unexpected error has occurred');
                    break;

                case 'Duplicate':
                    setStatus('A team with this ID already exists');
                    break;

                default: 
                    axios.post('https://star-trak.herokuapp.com/update-user', {
                        key: 'teamUsername',
                        updateValue: res.data.username,
                        username: state.userInfo.username
                    })
                    .then(res => {
                        if (res.data.message) {
                            setStatus(res.data.message);
                        } else {
                            dispatch({
                                type: ACTIONS.TEAM_LOGIN,
                                teamUsername: res.data.teamUsername
                            });

                            dispatch({
                                type: ACTIONS.STACK_DECIDER_REFRESH
                            });
                        }
                    });
            }
        })
        .catch(() => {
            setStatus('An unexpected error has occurred');
        });
    }

    return (
        <View>
            <TextInput
                placeholder="Team Name"
                onChangeText={text => setTeamName(text)}
            />
            <TextInput
                placeholder="Team ID"
                onChangeText={text => setTeamId(text)}
            />
            <TextInput
                placeholder="Team Password"
                onChangeText={text => setPassword(text)}
                secureTextEntry={true}
            />
            <TextInput
                placeholder="Confirm Team Password"
                onChangeText={text => setConfirmPassword(text)}
                secureTextEntry={true}
            />
            <Button
                title="Submit"
                onPress={() => handleCreateTeam()}
            />
            {status.length !== 0 &&
            
                <Text>{status}</Text>
            
            }
        </View>
    );
}