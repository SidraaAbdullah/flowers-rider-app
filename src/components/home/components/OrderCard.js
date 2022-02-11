import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../../constants/colors";

const OrderCard = ({ item = {}, style, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <View>
        <View style={[styles.flex, { paddingBottom: 4 }]}>
          <Text style={styles.text}>Order # {item?.uid} </Text>
          <Text style={[styles.text, { color: colors.greyShade1 }]}>
            {new Date(item.createdAt).toLocaleString()}
          </Text>
        </View>
        <Text
          style={[
            styles.text,
            { color: colors.primaryShade, paddingBottom: 12 , fontFamily:'ProximaNovaSemiBold'},
          ]}
        >
          {item.products?.length} item
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
    </TouchableOpacity>
  );
};

export default OrderCard;
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
