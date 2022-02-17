import AsyncStorageLib from "@react-native-async-storage/async-storage";
import axios from "axios";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import CommonButton from "../components/common-button";
import { BASE_URL, DRIVER_STATUS } from "../constants";
import colors from "../constants/colors";
import useLogout from "../hooks/useLogout";
import useStorage from "../hooks/useStorage";
import { showToast } from "../util/toast";

const PendingScreen = ({ navigation }) => {
  const { logout } = useLogout();
  const [user] = useStorage("da_logIn", { isObject: true });
  const handleCheckStatus = async () => {
    try {
      if (user) {
        const driver = await axios.get(BASE_URL + "/driver");
        const userData = driver.data.data[0];
        await AsyncStorageLib.setItem(
          "da_logIn",
          JSON.stringify({
            ...user,
            status: userData.status,
          })
        );
        if (userData.status === DRIVER_STATUS.ACTIVE) {
          return navigation.replace("home");
        }
        if (userData.status === DRIVER_STATUS.PENDING) {
          return showToast("You are not approved yet!", "danger");
        }
      }
    } catch (error) {
      showToast(error.toString(), "danger");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <Text>You are not approved yet, Contact our support!</Text>
      </View>
      <View style={styles.buttonStyles}>
        <CommonButton
          text="Check again"
          onPress={handleCheckStatus}
          style={{ marginBottom: 16 }}
          bgColor={colors.primaryShade}
        />
        <CommonButton
          text="Logout"
          onPress={logout}
          bgColor={colors.greyShade1}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  buttonStyles: {
    // position: "absolute",
    marginTop: "auto",
    marginHorizontal: 16,
  },
});

export { PendingScreen };
