import "react-native-gesture-handler";

import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SigninScreen from "./screens/SigninScreen";
import Entypo from "@expo/vector-icons/Entypo";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./stores";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerContent from "./components/CustomDrawerContent";
import SettingScreen from "./screens/SettingScreen";
import AboutScreen from "./screens/AboutScreen";
import AnnouncementScreen from "./screens/AnnouncementScreen";
import HomeStackNavigator from "./components/HomeStackNavigator";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="stack"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
          >
            <Drawer.Screen
              name="Home"
              component={HomeStackNavigator}
              options={{
                title: "Accueil",
                headerStyle: {
                  backgroundColor: "#8E44AD",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold",
                  color: "#FFFFFF",
                },
                headerBackVisible: false,
                // headerRight: () => (
                //   <Entypo
                //     name="info-with-circle"
                //     size={24}
                //     color="white"
                //     onPress={() => alert("This is a button!")}
                //   />
                // ),
              }}
            />
            <Drawer.Screen
              name="Setting"
              component={SettingScreen}
              options={{
                title: "Réglage",
                headerStyle: {
                  backgroundColor: "#8E44AD",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold",
                  color: "#FFFFFF",
                },
                headerBackVisible: false,
                // headerRight: () => (
                //   <Entypo
                //     name="info-with-circle"
                //     size={24}
                //     color="white"
                //     onPress={() => alert("This is a button!")}
                //   />
                // ),
              }}
            />
            <Drawer.Screen
              name="About"
              component={AboutScreen}
              options={{
                title: "A propos",
                headerStyle: {
                  backgroundColor: "#8E44AD",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold",
                  color: "#FFFFFF",
                },
                headerBackVisible: false,
                // headerRight: () => (
                //   <Entypo
                //     name="info-with-circle"
                //     size={24}
                //     color="white"
                //     onPress={() => alert("This is a button!")}
                //   />
                // ),
              }}
            />
            {/* <Drawer.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Drawer.Screen name="Signin" component={SigninScreen} /> */}
          </Drawer.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
