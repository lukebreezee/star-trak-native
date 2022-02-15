import { View } from "react-native";
import { AllProjects } from "./AllProjects";
import { MyProjects } from "./MyProjects";

export const Projects = () => {
    return (
        <View>
            <MyProjects />
            <AllProjects />
        </View>
    );
}