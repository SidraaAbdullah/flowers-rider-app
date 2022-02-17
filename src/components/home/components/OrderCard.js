import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../../constants/colors";

const OrderCard = ({ item = {}, style }) => {
  const price = item.products.reduce(
    (acc, i) => +i.price * +i.quantity + acc,
    0
  );

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.flex, { paddingBottom: 4 }]}>
        <Text style={styles.text}>Order # {item?.uid} </Text>
        <Text style={[styles.text, { color: colors.greyShade1 }]}>
          {new Date(item.createdAt).toLocaleString()}
        </Text>
      </View>
      <Text
        style={[
          styles.text,
          {
            color: "#FF1843",
            paddingBottom: 12,
            fontFamily: "ProximaNovaSemiBold",
          },
        ]}
      >
        {item.products?.length} item
      </Text>
      <View style={styles.flex}>
        <Text style={styles.text}>Total price</Text>
        <Text style={styles.text}>{price} Rs</Text>
      </View>
    </View>
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
    borderRadius: 10,
    padding: 15,
    backgroundColor: "#F7F7FA",
  },
  flex: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
});
