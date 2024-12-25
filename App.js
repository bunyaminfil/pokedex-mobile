import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";

import PokemonsScreen from "./screens/Pokemons";
import PokemonDetailScreen from "./screens/PokemonDetail";
// import FavoritesContextProvider from './store/context/favorites-context';
import { store } from "./store/redux";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: "#351401" },
                headerTintColor: "white",
                sceneContainerStyle: { backgroundColor: "#3f2f25" },
                drawerContentStyle: { backgroundColor: "#351401" },
                drawerInactiveTintColor: "white",
                drawerActiveTintColor: "#351401",
                drawerActiveBackgroundColor: "#e4baa1",
            }}
        >
            <Drawer.Screen
                name="Pokemons"
                component={PokemonsScreen}
                options={{
                    title: "All Pokemons",
                    drawerIcon: ({ color, size }) => <Ionicons name="list" color={color} size={size} />,
                }}
            />
        </Drawer.Navigator>
    );
}

export default function App() {
    return (
        <>
            <StatusBar style="light" />
            {/* <FavoritesContextProvider> */}
            <Provider store={store}>
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerStyle: { backgroundColor: "#351401" },
                            headerTintColor: "white",
                            contentStyle: { backgroundColor: "#3f2f25" },
                        }}
                    >
                        <Stack.Screen
                            name="Drawer"
                            component={DrawerNavigator}
                            options={{
                                headerShown: false,
                            }}
                        />
                        <Stack.Screen
                            name="PokemonDetail"
                            component={PokemonDetailScreen}
                            options={{
                                title: "About the Pokemon",
                            }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
            {/* </FavoritesContextProvider> */}
        </>
    );
}

const styles = StyleSheet.create({
    container: {},
});
