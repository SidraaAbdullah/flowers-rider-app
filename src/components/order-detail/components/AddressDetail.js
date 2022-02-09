import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const AddressDetail = () => {
  return (
    <View style={styles.container}>
      <View>
        <View>
          <Text style={styles.headingText}>From</Text>
          <Text style={[styles.headingText, { fontFamily: "ProximaNova" }]}>
            Jauhar
          </Text>
          <Text style={styles.text}>Vendor address</Text>
        </View>
        <View style={{ marginTop: 18 }}>
          <Text style={styles.headingText}>To</Text>
          <Text style={[styles.headingText, { fontFamily: "ProximaNova" }]}>
            Gulshan
          </Text>
          <Text style={styles.text}>Customer address</Text>
        </View>
      </View>
      <View>
        <Text style={styles.text}>Feb 09, 2022</Text>
      </View>
    </View>
  );
};
export { AddressDetail };

const styles = StyleSheet.create({
  headingText: {
    fontFamily: "ProximaNovaBold",
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
    justifyContent: "space-between",
    marginBottom: 14,
    backgroundColor: "#F7F7FA",
    borderRadius: 10,
    flexDirection: "row",
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
