import React from "react";
import SignUp from "../components/sign-up";
import { View, Image } from "react-native";

const SignUpScreen = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop: 40,
      }}
    >
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../assets/images/signup.png")}
          style={{ width: 220, height: 200 }}
        />
      </View>
      <SignUp navigation={navigation} />
    </View>
  );
};

export { SignUpScreen };
