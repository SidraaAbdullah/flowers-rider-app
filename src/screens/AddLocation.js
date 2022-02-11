import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

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
      <Image
        source={require("../assets/images/add_address.png")}
        style={{ height: 300, width: 300 }}
      />
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 20,
          padding: 8,
          paddingHorizontal: 20,
          backgroundColor: "#FABC5A",
          borderRadius: 8,
        }}
        onPress={() => navigation.navigate("home")}
      >
        <Text
          style={{
            fontFamily: "ProximaNova",
            fontSize: 18,
            marginRight: 8,
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
