import React from "react";
import SignIn from "../components/sign-in";
import { View, Image, SafeAreaView } from "react-native";
import { StyleSheet } from "react-native";
import { windowHeight } from "../constants";
import { Text } from "react-native";

const SignInScreen = () => {
  return (
    <SafeAreaView style={style.container}>
      <View style={style.topContainer}>
        <Text style={style.topText}>Driver</Text>
        <Image
          source={require("../assets/images/login.png")}
          style={style.signUpImage}
        />
      </View>
      <SignIn />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 40,
  },
  topContainer: {
    alignItems: "center",
    marginVertical: windowHeight * 0.03,
  },
  topText: { fontSize: 50, fontFamily: "ProximaNovaSemiBold" },
  signUpImage: { width: 220, height: 200 },
});

export { SignInScreen };
