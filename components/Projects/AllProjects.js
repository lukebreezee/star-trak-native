import { useContext } from "react";
import { Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Context } from "../../global-state/Store";

export const AllProjects = () => {
    const [state] = useContext(Context);

    return (
        <>
            <Text>All Projects:</Text>
            <ScrollView style={{height: '12%'}}>
                {
                    state.teamInfo.projects.map((project, index) => {
                        return <Text key={index}>{project.projectName}</Text>
                    })
                }
            </ScrollView>
        </> 
    );
}