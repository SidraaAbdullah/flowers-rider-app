import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTab from "./BottomTab";
import * as Screen from "../screens";
import useStorage from "../hooks/useStorage";
import AppLoading from "expo-app-loading";

const RootNavigator = () => {
  const [user, isLoading] = useStorage("da_logIn", { isObject: true });
  const Stack = createStackNavigator();
  if (isLoading) return <AppLoading />;
  return (
    <Stack.Navigator
      initialRouteName="signIn"
      screenOptions={{ headerShown: false, headerShadowVisible: false }}
    >
      {!user.access_token && (
        <React.Fragment>
          <Stack.Screen name="signUp" component={Screen.SignUpScreen} />
          <Stack.Screen name="signIn" component={Screen.SignInScreen} />
        </React.Fragment>
      )}

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
