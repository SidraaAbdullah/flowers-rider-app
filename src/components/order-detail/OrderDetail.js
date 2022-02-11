import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import {
  OrderCard,
  CashDetail,
  AddressDetail,
  CustomerDetail,
} from "./components";

const OrderDetail = ({ orderDetails = {} }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1 }}>
        {(orderDetails?.products || []).map((product, index) => (
          <OrderCard details={product} key={index} />
        ))}
        {orderDetails?.special_note && (
          <View style={{ marginVertical: 7 }}>
            <Text style={styles.text}>Special Notes</Text>
            <Text style={styles.headingText}>{orderDetails?.special_note}</Text>
          </View>
        )}
        <CustomerDetail />
        <AddressDetail
          deliveryAddress={orderDetails?.deliveryAddress}
          orderDetails={orderDetails}
        />
        <CashDetail orderDetails={orderDetails} />
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
