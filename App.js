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
import { BASE_URL, DRIVER_STATUS } from "./src/constants/env";
import * as Notifications from "expo-notifications";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { USER_UPDATE } from "./src/queries";
import { registerForPushNotificationsAsync } from "./src/util/common";
import * as Location from "expo-location";
import * as RootNavigation from "./src/navigation/RootNavigation";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const App = () => {
  const [notification, setNotification] = useState(false);
  const [initialScreen, setInitialScreen] = useState("");
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
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});
        if (location) {
          const { latitude, longitude, accuracy, altitude } =
            location.coords || {};
          const locationDetails = {
            latitude,
            longitude,
            accuracy,
            altitude,
          };
          await AsyncStorageLib.setItem(
            "da_location",
            JSON.stringify(locationDetails)
          );
        }
      } else {
        setInitialScreen("addLocation");
      }
      let user = await AsyncStorageLib.getItem("da_logIn");
      user = JSON.parse(user);
      // console.log("login-user::", user);
      if (user?._id) {
        axios.defaults.headers.common.Authorization = `bearer ${user?.access_token}`;
        const res = await axios.post(BASE_URL + "/verify-user", {
          type: "DRIVER",
        });
        // console.log(res.data.data);
        await AsyncStorageLib.setItem(
          "da_logIn",
          JSON.stringify({
            ...user,
            ...res.data.data,
          })
        );
      }
      let userData = await AsyncStorageLib.getItem("da_logIn");
      userData = JSON.parse(userData);
      if (userData?.status === DRIVER_STATUS.PENDING) {
        setInitialScreen("pendingScreen");
      }
      if (userData?.status === DRIVER_STATUS.ACTIVE) {
        setInitialScreen("home");
      }
      console.log(userData);
      if (userData?._id) {
        const token = await registerForPushNotificationsAsync();
        if (token) {
          // user = await AsyncStorageLib.getItem("da_logIn");
          await USER_UPDATE({
            expo_notification_token: token,
          });
          await AsyncStorageLib.setItem(
            "da_logIn",
            JSON.stringify({ ...user, expo_notification_token: token })
          );
        }
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
          setInitialScreen(response.notification.request.content.data?.path);
          RootNavigation.navigate(
            response.notification.request.content.data?.path
          );
          console.log(RootNavigation);
        });
    } catch (error) {
      setVerify({ verify: false, isVerifyLoading: false });
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
        <RootNavigator initialScreen={initialScreen} />
      </NavigationContainer>
    </QueryClientProvider>
  );
};
export default App;
