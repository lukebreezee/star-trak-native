import { useContext } from "react";
import { Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Context } from "../../global-state/Store";

export const MyProjects = () => {
    const [state, dispatch] = useContext(Context);

    const userProjects = state.teamInfo.projects.filter(project => {
        const username = state.userInfo.username;

        const userIsCreator = project.creator === username;
        const userIsAssigned = project.selectedMembers.indexOf(username) === -1;

        if (userIsCreator || userIsAssigned) {
            return true;
        }

        return false;
    });

    return (
        <>
            <Text>My Projects:</Text>
            <ScrollView style={{height: '12%'}}>
                {
                    userProjects.map((project, index) => {
                        return <Text key={index}>{project.projectName}</Text>
                    })
                }
            </ScrollView>
        </>
    );
}