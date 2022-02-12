import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { windowWidth } from "../constants";
import LottieView from "lottie-react-native";

const AddLocationScreen = ({ navigation }) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <LottieView
        source={require("../assets/lotties/4199-location-search.json")}
        autoPlay
        loop
        style={{ width: windowWidth }}
      />
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 20,
          marginTop: 50,
          padding: 8,
          paddingLeft: 25,
          backgroundColor: "#FABC5A",
          borderRadius: 30,
        }}
        onPress={() => navigation.navigate("home")}
      >
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
export { AddLocationScreen };
