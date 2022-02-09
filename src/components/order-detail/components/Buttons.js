import React from "react";
import { View } from "react-native";
import CommonButton from "../../common-button";

const Buttons = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
      }}
    >
      <CommonButton text="Reject" bgColor="#F7F7FA" width="48%" />
      <CommonButton text="Accept" width="48%" />
    </View>
  );
};
export { Buttons };
