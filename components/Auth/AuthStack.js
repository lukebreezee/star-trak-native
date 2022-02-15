import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { Login } from "./Login";
import { Register } from './Register';

const AuthStackNav = createNativeStackNavigator();

export const AuthStack = () => {
    return (
        <View style={{flex: 1}}>
        <NavigationContainer>
            <StatusBar style="auto" />
            <AuthStackNav.Navigator>
            <AuthStackNav.Screen 
                name="Login"
                component={Login}
            />
            <AuthStackNav.Screen
                name="Register"
                component={Register}
            />
            {/* <AuthStackNav.Screen
                name="TeamLogin"
                component={TeamLogin}
            />
            <AuthStackNav.Screen
                name="CreateTeam"
                component={CreateTeam}
            />
            <AuthStackNav.Screen
                name="Tabs"
                component={Tabs}
            /> */}
            </AuthStackNav.Navigator>
        </NavigationContainer>
        </View>
    );
}