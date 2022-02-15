import { Link } from "@react-navigation/native";
import axios from "axios";
import { useContext, useState } from "react";
import { Button, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { checkEmail, checkPassword } from "../../helpers";
import { ACTIONS } from "../../global-state/reducer";
import { Context } from "../../global-state/Store";
import { AUTH_KEY } from '@env';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Register = ({navigation}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [state, dispatch] = useContext(Context);
    const [status, setStatus] = useState('');

    const handleRegister = () => {
        setStatus('Loading...');

        if (firstName.trim() === '') {
            setStatus('First name required');
            return;
        } else if (lastName.trim() === '') {
            setStatus('Last name required');
            return;
        } else if (username.trim() === '') {
            setStatus('Email required');
            return;
        } else if (password.trim() === '') {
            setStatus('Password required');
            return;
        } else if (confirmPassword.trim() === '') {
            setStatus('Please confirm your password');
            return;
        }

        if (password !== confirmPassword) {
            setStatus('Passwords must match');
            return;
        }
        
        const passwordCheck = checkPassword(password);
        if (passwordCheck !== '') {
            setStatus(passwordCheck);
            return;
        }

        if (!checkEmail(username)) {
            setStatus('Email is invalid');
            return;
        }

        axios.post('https://star-trak.herokuapp.com/register', {
            firstName,
            lastName,
            username,
            password
        })
        .then(async res => {
            switch(res.data) {
                case 'Unknown':
                    setStatus('An unexpected error has occured');
                    break;

                case 'Duplicate':
                    setStatus('An account with this email already exists');
                    break;

                default:
                    setStatus('');
                    dispatch({
                        type: ACTIONS.USER_LOGIN, 
                        userInfo: res.data
                    });

                    try {
                        await AsyncStorage.setItem(AUTH_KEY, res.data.username);
                        dispatch({
                            type: ACTIONS.STACK_DECIDER_REFRESH
                        });
                    } catch {
                        setStatus('An unexpected error has occured');
                    }
            }
        })
        .catch(() => {
            setStatus('An unexpected error has occurred');
        });
    }

    return (
        <View>
            {status.length !== 0 &&
            
                <Text>{status}</Text>
            
            }
            <Text>Please enter the following to create an account</Text>
            <TextInput
                placeholder="First Name"
                onChangeText={text => setFirstName(text)}
            />
            <TextInput
                placeholder="Last Name"
                onChangeText={text => setLastName(text)}
            />
            <TextInput
                placeholder="Email"
                onChangeText={text => setUsername(text)}
            />
            <TextInput
                placeholder="Password"
                onChangeText={text => setPassword(text)}
                secureTextEntry={true}
            />
            <TextInput
                placeholder="Confirm Password"
                onChangeText={text => setConfirmPassword(text)}
                secureTextEntry={true}
            />
            <Button 
                title="Submit" 
                onPress={() => handleRegister()}
            />
            <Link to={{screen: 'Login'}}>Back To Login</Link>
        </View>
    );
}