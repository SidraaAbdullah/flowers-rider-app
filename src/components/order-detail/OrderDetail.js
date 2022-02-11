import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import {
  OrderCard,
  CashDetail,
  AddressDetail,
  CustomerDetail,
} from "./components";

const OrderDetail = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1 }}>
        <OrderCard />
        <OrderCard />
        <View style={{ marginVertical: 14 }}>
          <Text style={styles.text}>Special Notes</Text>
          <Text style={styles.headingText}>
            Can you please make the whole order without the bow.
          </Text>
        </View>
        <CustomerDetail />
        <AddressDetail />
        <CashDetail />
      </View>
    </ScrollView>
  );
};
export default OrderDetail;

const styles = StyleSheet.create({
  headingText: {
    fontFamily: "ProximaNova",
    fontSize: 15,
    color: "black",
  },
  text: {
    fontFamily: "ProximaNovaSemiBold",
    fontSize: 17,
    color: "#818C99",
    marginBottom: 4,
  },
  container: {
    elevation: 1,
    backgroundColor: "white",
    padding: 10,
    marginBottom: 1,
  },
});
