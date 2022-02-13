import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Icon } from "react-native-elements";
import { windowWidth } from "../constants";
import LottieView from "lottie-react-native";
import * as Location from "expo-location";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { Linking } from "react-native";

const AddLocationScreen = ({ navigation }) => {
  const excessLocation = async () => {
    let locationStats = await Location.requestForegroundPermissionsAsync();
    if (locationStats.status !== "granted") {
      if (Platform.OS === "ios") {
        Alert.alert(
          "Your location is disabled, do you want to open location from settings?",
          "",
          [
            {
              text: "Yes",
              onPress: () => Linking.openURL("app-settings:"),
            },
            {
              text: "No",
            },
          ]
        );
      }
      return;
    }
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Lowest,
    });
    if (location) {
      const { latitude, longitude, accuracy, altitude } = location.coords || {};
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
    let user = await AsyncStorageLib.getItem("da_logIn");
    user = JSON.parse(user);
    if (user?.access_token) {
      navigation.navigate("home");
    } else {
      navigation.navigate("signIn");
    }
  };

  return (
    <View style={styles.container}>
      <LottieView
        source={require("../assets/lotties/4199-location-search.json")}
        autoPlay
        loop
        style={{ width: windowWidth }}
      />
      <TouchableOpacity style={styles.buttonContainer} onPress={excessLocation}>
        <Text
          style={{
            fontFamily: "ProximaNova",
            fontSize: 16,
            marginRight: 18,
            color: "black",
          }}
        >
          Please add your location
        </Text>
        <Icon name="arrow-forward" color={"black"} type="ionicon" size={30} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    marginTop: 50,
    padding: 8,
    paddingLeft: 25,
    backgroundColor: "#FABC5A",
    borderRadius: 30,
  },
});
export { AddLocationScreen };
