import React from "react";
import SignUp from "../components/sign-up";
import { View, Image, Text, SafeAreaView, StyleSheet } from "react-native";
import { windowHeight } from "../constants";

const SignUpScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={style.container}>
      <View style={style.topContainer}>
        <Text style={style.topText}>Driver</Text>
        <Image
          source={require("../assets/images/signup.png")}
          style={style.signUpImage}
        />
      </View>
      <SignUp navigation={navigation} />
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

export { SignUpScreen };
