import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Input from "../input";
import { SIGN_IN } from "../../queries";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "react-query";
import { Formik } from "formik";
import { signInInitialValues, signInValidationSchema } from "../../constants";
import CommonButton from "../common-button";
import { showToast } from "../../util/toast";
// import { addUser } from "../../../redux/actions/User";
//import { useDispatch } from "react-redux";

const SignIn = () => {
  const navigation = useNavigation();
  const { mutate: signIn } = useMutation(SIGN_IN);
  // const { cart } = route?.params || {};
  //const dispatch = useDispatch();
  // const handleAddUser = (item) => {
  //   dispatch(addUser(item));
  // };

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
        },
        onError: (e) => {
          showToast("Please enter correct email or password", "danger");
          alert();
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
          <View>
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
            {/* <TouchableOpacity
              onPress={() => navigation.navigate("forgotPassword")}
            >
              <Text style={style.text}>Forgot Password?</Text>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => navigation.navigate("signUp")}>
              <Text style={style.text}>Don't have an account? SignUp</Text>
            </TouchableOpacity>
          </View>
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
