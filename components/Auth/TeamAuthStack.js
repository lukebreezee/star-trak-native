import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { TeamLogin } from "./TeamLogin";
import { CreateTeam } from './CreateTeam';

const TeamAuthStackNav = createNativeStackNavigator();

export const TeamAuthStack = () => {
    return (
        <NavigationContainer>
            <TeamAuthStackNav.Navigator>
                <TeamAuthStackNav.Screen
                    name="TeamLogin"
                    component={TeamLogin}
                />
                <TeamAuthStackNav.Screen
                    name="CreateTeam"
                    component={CreateTeam}
                />
            </TeamAuthStackNav.Navigator>
        </NavigationContainer>
    );
}