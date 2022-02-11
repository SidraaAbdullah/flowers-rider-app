import React, { useEffect, useRef, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation/RootNavigation";
import { QueryClientProvider, QueryClient } from "react-query";
import { useFonts } from "expo-font";
import {
  defaultQueryFn,
  defaultMutationFn,
  reactQueryConfig,
} from "./src/constants/index";
import AppLoading from "expo-app-loading";
import axios from "axios";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { BASE_URL } from "./src/constants/env";
import * as Notifications from "expo-notifications";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { USER_UPDATE } from "./src/queries";
import { registerForPushNotificationsAsync } from "./src/util/common";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const App = () => {
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [verify, setVerify] = useState({
    verify: false,
    isVerifyLoading: true,
  });
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        queryFn: defaultQueryFn,
        ...reactQueryConfig,
      },
      mutations: {
        mutationFn: defaultMutationFn,
      },
    },
  });

  // FOR FETCHING USER DATA ON LOADING
  useEffect(async () => {
    try {
      let user = await AsyncStorageLib.getItem("da_logIn");
      user = JSON.parse(user);
      if (user?.access_token) {
        axios.defaults.headers.common.Authorization = `bearer ${user?.access_token}`;
        axios
          .post(BASE_URL + "/verify-user")
          .then(() => {
            setVerify({ verify: true, isVerifyLoading: false });
          })
          .catch(() => {
            setVerify({ verify: false, isVerifyLoading: false });
          });
        const token = await registerForPushNotificationsAsync();
        await USER_UPDATE({
          expo_notification_token: token,
        });
        await AsyncStorageLib.setItem(
          "da_logIn",
          JSON.stringify({ ...user, expo_notification_token: token })
        );
      }
      setVerify({ verify: false, isVerifyLoading: false });

      // This listener is fired whenever a notification is received while the app is foregrounded
      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          setNotification(notification);
        });

      // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log(response);
        });
    } catch (error) {
      showMessage(error.response?.data?.message || error.toString(), "error");
    }
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const [loaded] = useFonts({
    ProximaNova: require("./src/assets/fonts/ProximaNova/ProximaNova-Regular.otf"),
    ProximaNovaBold: require("./src/assets/fonts/ProximaNova/ProximaNova-Bold.otf"),
    ProximaNovaSemiBold: require("./src/assets/fonts/ProximaNova/ProximaNova-Semibold.otf"),
  });
  if (!loaded || verify.isVerifyLoading) {
    return <AppLoading />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <FlashMessage position="top" floating={true} />
        <RootNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
};
export default App;
