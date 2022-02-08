import React from "react";
import { Text, View, StyleSheet } from "react-native";

const NewTab = () => {
  return (
    <View style={styles.container}>
      <View>
        <View style={[styles.flex, { paddingBottom: 4 }]}>
          <Text style={styles.text}>Order # 42356 </Text>
          <Text style={[styles.text, { color: "#818C99" }]}>Feb 2, 1:00</Text>
        </View>
        <Text style={[styles.text, { color: "#0E5561", paddingBottom: 12 }]}>
          9 item
        </Text>
        <View style={[styles.flex, { paddingBottom: 4 }]}>
          <Text style={styles.text}>Delivery date & time </Text>
          <Text style={styles.text}>Feb 4, 10:00</Text>
        </View>
        <View style={styles.flex}>
          <Text style={styles.text}>Delivery charges </Text>
          <Text style={styles.text}>$4</Text>
        </View>
      </View>
    </View>
  );
};
export { NewTab };
const styles = StyleSheet.create({
  text: {
    fontFamily: "ProximaNova",
    fontSize: 15,
    color: "black",
  },
  container: {
    backgroundColor: "#F7F7FA",
    borderRadius: 10,
    padding: 15,
  },
  flex: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
});
