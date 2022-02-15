import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Account } from "./Account";
import { Members } from "./Members/Members";
import { Projects } from "./Projects/Projects";
import { Tickets } from "./Tickets/Tickets";

const Tab = createBottomTabNavigator();

export const Tabs = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="Projects"
                    component={Projects}
                />
                <Tab.Screen
                    name="Tickets"
                    component={Tickets}
                />
                <Tab.Screen
                    name="Members"
                    component={Members}
                />
                <Tab.Screen
                    name="Account"
                    component={Account}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}