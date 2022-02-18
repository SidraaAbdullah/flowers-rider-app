import React, { useState } from "react";
import { View, ScrollView, Alert, StyleSheet } from "react-native";
import CommonButton from "../common-button";
import Input from "../input";
import { Avatar } from "react-native-elements";
import { useMutation, useQuery } from "react-query";
import { PATCH_PROFILE_UPDATE } from "../../queries";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../../constants/colors";
import useLogout from "../../hooks/useLogout";
import { showToast } from "../../util/toast";

const Profile = ({ navigation }) => {
  const { mutate: updateDriver } = useMutation(PATCH_PROFILE_UPDATE);
  const { logout } = useLogout();
  const { data: update, refetch } = useQuery("/driver", {
    onSuccess: async (res) => {
      setEmail(res.data[0]?.email);
      setName(res.data[0]?.name);
      setNumber(res.data[0]?.phone_number);
      let user = await AsyncStorage.getItem("da_logIn");
      user = JSON.parse(user);
      await AsyncStorage.setItem(
        "da_logIn",
        JSON.stringify({
          ...user,
          ...res.data[0],
        })
      );
    },
  });
  const [email, setEmail] = useState(update?.data[0].email);
  const [name, setName] = useState(update?.data[0].name);
  const [number, setNumber] = useState(update?.data[0].phone_number);
  const handleUpdateUser = async () => {
    await updateDriver(
      { name, email, phone_number: number },
      {
        onSuccess: async (res) => {
          refetch();
          showToast("User profile has been updated.", "success");
        },
        onError: () => {
          showToast("Failed to update user profile.", "danger");
        },
      }
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          marginVertical: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar
          rounded
          size={110}
          source={{
            uri: "https://cci-research.nl/author/aya-fukami/avatar_hu3c18ec414e2e5615db7090f5d5745dd7_17253_270x270_fill_lanczos_center_2.png",
          }}
          showEditButton
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginHorizontal: 35, marginBottom: 20 }}>
          <Input
            label="Name"
            iconName="person"
            value={name}
            onChangeText={(e) => setName(e)}
            placeholder="Name"
          />
          <Input
            label="Phone Number"
            iconName="call"
            value={number}
            onChangeText={(e) => setNumber(e)}
            keyboardType="numeric"
            placeholder="Phone Number"
          />
          <Input
            label="Email"
            iconName="mail"
            value={email}
            onChangeText={(e) => setEmail(e)}
            placeholder="Email"
            keyboardType="email-address"
          />
          <View style={{ marginTop: 10 }}>
            <CommonButton text="Save" onPress={() => handleUpdateUser()} />
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonStyles}>
        <CommonButton
          text="Logout"
          onPress={logout}
          bgColor={colors.greyShade1}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyles: {
    // position: "absolute",
    marginTop: "auto",
    marginHorizontal: 16,
  },
});
export default Profile;
