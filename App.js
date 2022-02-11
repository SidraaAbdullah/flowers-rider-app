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
import { isDevice } from "expo-device";
import { showToast } from "./src/util/toast";
import FlashMessage from "react-native-flash-message";
import { USER_UPDATE } from "./src/queries";
import { Button } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const App = () => {
  const [expoPushToken, setExpoPushToken] = useState("");
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

  useEffect(() => {
    registerForPushNotificationsAsync().then(async (token) => {
      let user = await AsyncStorageLib.getItem("da_logIn");
      axios.defaults.headers.common.Authorization = `bearer ${user?.access_token}`;
      if (user?.access_token) {
        await USER_UPDATE({
          expo_notification_token: token,
        });
      }
      console.log(token);
      setExpoPushToken(token);
    });

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

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  useEffect(async () => {
    let user = await AsyncStorageLib.getItem("da_logIn");
    user = JSON.parse(user);
    if (user) {
      axios.defaults.headers.common.Authorization = `bearer ${user?.access_token}`;
      axios
        .post(BASE_URL + "/verify-user")
        .then(() => {
          console.log("res");
          setVerify({ verify: true, isVerifyLoading: false });
        })
        .catch(() => {
          setVerify({ verify: false, isVerifyLoading: false });
        });
    }
    setVerify({ verify: false, isVerifyLoading: false });
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

async function registerForPushNotificationsAsync() {
  let token;
  if (isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      showToast("Failed to get push token for push notification!", "danger");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    showToast("Must use physical device for Push Notifications", "danger");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
