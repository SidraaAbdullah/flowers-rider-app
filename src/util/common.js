import { isDevice } from "expo-device";
import * as Notifications from "expo-notifications";
import { showToast } from "./toast";

export async function registerForPushNotificationsAsync() {
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
