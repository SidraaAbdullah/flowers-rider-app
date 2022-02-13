import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Input from "../input";
import { SIGN_IN, USER_UPDATE } from "../../queries";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "react-query";
import { Formik } from "formik";
import { signInInitialValues, signInValidationSchema } from "../../constants";
import CommonButton from "../common-button";
import { showToast } from "../../util/toast";
import { registerForPushNotificationsAsync } from "../../util/common";

const SignIn = () => {
  const navigation = useNavigation();
  const { mutate: signIn } = useMutation(SIGN_IN);

  const handleLogin = async (values) => {
    await signIn(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: async (res) => {
          axios.defaults.headers.common.Authorization = `bearer ${res.data?.access_token}`;
          await AsyncStorage.setItem("da_logIn", JSON.stringify(res.data));
          navigation.replace("home");
          showToast("Successful login", "success");
          const token = await registerForPushNotificationsAsync();
          await USER_UPDATE({
            expo_notification_token: token,
          });
        },
        onError: (e) => {
          showToast("Please enter correct email or password", "danger");
        },
      }
    );
  };

  return (
    <View style={style.container}>
      <Formik
        initialValues={signInInitialValues}
        validationSchema={signInValidationSchema}
        onSubmit={(values, { resetForm }) => handleLogin(values, resetForm)}
      >
        {({
          values,
          handleChange,
          handleBlur,
          errors,
          touched,
          handleSubmit,
        }) => (
          <React.Fragment>
            <Input
              label="Email"
              iconName="mail"
              placeholder="Email"
              keyboardType="email-address"
              name={"email"}
              value={values["email"]}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              error={errors["email"]}
              touched={touched["email"]}
            />
            <Input
              label="Password"
              iconName="lock-closed"
              placeholder="Password"
              secureTextEntry={true}
              name={"password"}
              value={values["password"]}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              error={errors["password"]}
              touched={touched["password"]}
            />
            <View style={{ marginVertical: 10 }}>
              <CommonButton onPress={() => handleSubmit()} text=" LOG IN" />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("signUp")}>
              <Text style={style.text}>Don't have an account? SignUp</Text>
            </TouchableOpacity>
          </React.Fragment>
        )}
      </Formik>
    </View>
  );
};
export default SignIn;

export const style = StyleSheet.create({
  container: {
    paddingHorizontal: 35,
  },
  text: {
    color: "gray",
    textAlign: "center",
    marginTop: 5,
    fontSize: 15,
    fontFamily: "ProximaNova",
  },
});
