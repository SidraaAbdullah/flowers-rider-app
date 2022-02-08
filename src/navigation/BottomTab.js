import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import * as Screen from "../screens";

const App = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: true,
        headerTitleAlign: "center",
        tabBarStyle: {
          paddingBottom: 5,
        },
        tabBarIcon: ({ color, type }) => {
          let iconName;
          route.name === "Home" ? (iconName = "home") : null;
          return (
            <Icon
              type={type || "font-awesome"}
              name={iconName}
              size={25}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={Screen.HomeScreen} />
    </Tab.Navigator>
  );
};
export default App;
