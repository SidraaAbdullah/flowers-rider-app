import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

const CommonButton = ({ onPress, bgColor, text, width, style, textStyles }) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: bgColor || "#FABC5A", width: width || "100%" },
        style,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, textStyles]}>{text}</Text>
    </TouchableOpacity>
  );
};
export default CommonButton;

const styles = StyleSheet.create({
  text: {
    fontFamily: "ProximaNovaSemiBold",
    fontSize: 15,
    color: "black",
    textAlign: "center",
  },
  container: {
    borderRadius: 10,
    padding: 14,
  },
});
