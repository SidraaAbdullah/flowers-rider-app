import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

const CashDetail = ({ orderDetails }) => {
  return (
    <View style={styles.container}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}
      >
        <Icon style={styles.icon} name="bicycle" type="ionicon" color="#FABC5A" />
        <Text style={styles.headingText}>Cash on delivery</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon style={styles.icon} name="card" type="ionicon" color="#FABC5A" />
        <View style={{ justifyContent: "center" }}>
          <Text style={styles.headingText}>
            Rs: {orderDetails?.delivery_charges}
          </Text>
          <Text style={styles.text}>Delivery charges</Text>
        </View>
      </View>
    </View>
  );
};
export { CashDetail };

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
    padding: 8,
    borderRadius: 10,
  },
});
