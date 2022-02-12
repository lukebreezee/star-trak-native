import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { HomeScreen } from './components/HomeScreen';
import { Login } from './components/Auth/Login';
import { Register } from './components/Auth/Register';
import { Store } from './components/global-state/Store';
import { TeamLogin } from './components/Auth/TeamLogin';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Store>
      <View style={styles.container}>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator>
            <Stack.Screen 
              name="Login"
              component={Login}
            />
            <Stack.Screen
              name="Register"
              component={Register}
            />
            <Stack.Screen
              name="TeamLogin"
              component={TeamLogin}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Store>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
