import React from "react";
import SignIn from "../components/sign-in";
import { View, Image } from "react-native";

const SignInScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        marginVertical: 30,
      }}
    >
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../assets/images/login.png")}
          style={{ width: 300, height: 250 }}
        />
      </View>
      <SignIn />
    </View>
  );
};

export { SignInScreen };
