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
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={Screen.HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon type="font-awesome" name={"home"} size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Screen.ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              type="font-awesome"
              name="user-circle"
              size={25}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default App;
