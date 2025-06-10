import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {View, Text} from "react-native";
import LoginScreen from "./screens/LoginScreen";
import {useAppSelector} from "./app/hooks";
import {selectUser} from "./features/auth/authSlice";
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from "./screens/HomeScreen";

const Stack = createNativeStackNavigator();


export default function App() {
    const user = useAppSelector(selectUser);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                {
                    user ? <Stack.Screen name="Home" component={HomeScreen}/> :
                        <Stack.Screen name="Login"  component={LoginScreen}/>
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}

