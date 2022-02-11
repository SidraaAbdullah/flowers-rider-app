import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Picker } from "native-base";
const CustomerDetail = () => {
  return (
    <Picker
      mode="dropdown"
      iosHeader="Jour de la semaine"
      style={{ height: 50, paddingHorizontal: 8, width: "100%" }}
      textStyle={{ width: "100%" }}
    >
      <Picker.Item label={"monday"} value={"Monday"} />
      <Picker.Item label={"tuesday"} value={"Tuesday"} />
      <Picker.Item label={"wednesday"} value={"Wednesday"} />
      <Picker.Item label={"thursday"} value={"Thursday"} />
      <Picker.Item label={"friday"} value={"Friday"} />
      <Picker.Item label={"saturday"} value={"Saturday"} />
      <Picker.Item label={"sunday"} value={"Sunday"} />
    </Picker>
  );
};
export { CustomerDetail };

const styles = StyleSheet.create({
  headingText: {
    fontFamily: "ProximaNova",
    fontSize: 16,
    color: "black",
    marginBottom: 2,
  },
  text: {
    fontFamily: "ProximaNova",
    fontSize: 15,
    color: "#818C99",
    marginBottom: 2,
  },
  container: {
    marginBottom: 14,
  },
  icon: {
    backgroundColor: "#F7F7FA",
    marginRight: 10,
    padding: 18,
    width: 24,
    height: 16,
  },
});
