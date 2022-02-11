import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const AddressDetail = ({ deliveryAddress, orderDetails }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={styles.headingText}>From</Text>
          <Text style={[styles.headingText]}>Jauhar</Text>
          <Text style={styles.text}>Vendor address</Text>
        </View>
        <Text style={styles.text}>
          {new Date(orderDetails?.createdAt).toLocaleString()}
        </Text>
      </View>
      <View style={{ marginTop: 18 }}>
        <Text style={styles.headingText}>To</Text>
        <Text
          style={[styles.headingText, { fontFamily: "ProximaNova" }]}
          numberOfLines={1}
        >
          {deliveryAddress?.address}
        </Text>
        <Text style={styles.text}>Customer address</Text>
      </View>
    </View>
  );
};
export { AddressDetail };

const styles = StyleSheet.create({
  headingText: {
    fontFamily: "ProximaNova",
    fontSize: 16,
    color: "black",
    marginBottom: 2,
  },
  text: {
    fontFamily: "ProximaNova",
    fontSize: 14,
    color: "#818C99",
  },
  container: {
    // justifyContent: "space-between",
    marginVertical: 7,
    backgroundColor: "#F7F7FA",
    borderRadius: 10,
    // flexDirection: "row",
    padding: 12,
    paddingHorizontal: 14,
  },
  icon: {
    backgroundColor: "#F7F7FA",
    marginRight: 10,
    padding: 18,
    width: 24,
    height: 16,
  },
});
