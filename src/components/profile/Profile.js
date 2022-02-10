import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import CommonButton from "../common-button";
import Input from "../input";
import { Avatar } from "react-native-elements";
// import { useMutation } from "react-query";
// import { UPDATE_USER_PROFILE } from "../../../queries";
// import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  //   const navigation = useNavigation();
  //   const { mutate: updateUser } = useMutation(UPDATE_USER_PROFILE);
  const [email, setEmail] = useState("sidraabdullah56@gmail.com");
  const [name, setName] = useState("Sidra Abdullah");
  const [number, setNumber] = useState("090078601");
  //   const handleUpdateUser = async () => {
  //     await updateUser(
  //       { name, email, phone_number: number },
  //       {
  //         onSuccess: () => {
  //           Alert.alert("User profile has been updated.", "", [
  //             {
  //               text: "OK",
  //               onPress: () => navigation.navigate("profile"),
  //             },
  //           ]);
  //         },
  //         onError: () => {
  //           Alert.alert("Failed to update user profile.");
  //         },
  //       }
  //     );
  //   };
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
            <CommonButton
              text="Save"
              //   onPress={() => handleUpdateUser()}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default Profile;
