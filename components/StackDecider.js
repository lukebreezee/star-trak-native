import { useContext, useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { Context } from "../global-state/Store";
import { AUTH_KEY } from '@env';
import { AuthStack } from "./Auth/AuthStack";
import { ErrorScreen } from "./ErrorScreen";
import { ACTIONS } from "../global-state/reducer";
import { TeamAuthStack } from "./Auth/TeamAuthStack";
import { Tabs } from "./Tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { StatusBar } from "expo-status-bar";

export const StackDecider = () => {
    const [state, dispatch] = useContext(Context);
    const [currentNavigator, setCurrentNavigator] = useState(null);

    useEffect(async () => {
        if (currentNavigator === null) {
            setCurrentNavigator(<ActivityIndicator />);
        }

        let username;
        await AsyncStorage.getItem(AUTH_KEY)
        .then(resUsername => {
            username = resUsername;
        });

        if (username === null) {
            setCurrentNavigator(<AuthStack />);
            return;
        }

        axios.get('https://star-trak.herokuapp.com/get-user-info', {
            headers: {
                username
            }
        })
        .then(res => {
            if (res.data.message) {
                setCurrentNavigator(<ErrorScreen />);
                return;
            }

            dispatch({
                type: ACTIONS.USER_LOGIN, 
                userInfo: res.data
            });

            if (!res.data.teamUsername) {
                setCurrentNavigator(<TeamAuthStack />);
                return;
            }

            axios.post('https://star-trak.herokuapp.com/get-team-info', {
                teamUsername: res.data.teamUsername
            })
            .then(teamRes => {
                dispatch({
                    type: ACTIONS.TEAM_INFO_UPDATE,
                    teamInfo: teamRes.data
                });

                setCurrentNavigator(<Tabs />);
            });
        });
    }, [state.stackDeciderRefreshSwitch]);

    return (
        <>
            <StatusBar style="auto" />
            {currentNavigator}
        </>
    );
}