import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AnnouncementScreen from "../screens/AnnouncementScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeStack"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Announcement"
        component={AnnouncementScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
