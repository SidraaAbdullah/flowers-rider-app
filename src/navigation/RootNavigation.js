import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTab from "./BottomTab";
import * as Screen from "../screens";

const RootNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="signUp"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="signUp" component={Screen.SignUpScreen} />
      <Stack.Screen name="signIn" component={Screen.SignInScreen} />
      <Stack.Screen name="home" component={BottomTab} />
      <Stack.Screen
        name="orderDetail"
        component={Screen.OrderDetailScreen}
        options={() => ({
          headerShown: true,
          title: "Order # 43434",
          headerTitleAlign: "center",
        })}
      />
    </Stack.Navigator>
  );
};
export default RootNavigator;
