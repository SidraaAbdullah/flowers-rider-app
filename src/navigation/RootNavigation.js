import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTab from "./BottomTab";
import * as Screen from "../screens";
import useStorage from "../hooks/useStorage";
import AppLoading from "expo-app-loading";
import { PendingScreen } from "../screens/Pending";
import { createNavigationContainerRef } from "@react-navigation/native";
export const navigationRef = createNavigationContainerRef();
export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

const RootNavigator = ({ initialScreen }) => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName={initialScreen || "signIn"}
      screenOptions={{ headerShown: false, headerShadowVisible: false }}
    >
      <Stack.Screen name="signUp" component={Screen.SignUpScreen} />
      <Stack.Screen name="signIn" component={Screen.SignInScreen} />
      <Stack.Screen name="pendingScreen" component={PendingScreen} />
      <Stack.Screen name="home" component={BottomTab} />
      <Stack.Screen
        name="orderDetail"
        component={Screen.OrderDetailScreen}
        options={(props) => ({
          headerShown: true,
          title: `Order # ${props.route.params?.uid}`,
          headerTitleAlign: "center",
          headerBackTitle: " ",
        })}
      />
      <Stack.Screen name="addLocation" component={Screen.AddLocationScreen} />
    </Stack.Navigator>
  );
};
export default RootNavigator;
