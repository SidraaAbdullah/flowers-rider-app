import React from "react";
import { SafeAreaView, View } from "react-native";
import OrderDetail from "../components/order-detail";
import { Buttons } from "../components/order-detail/components";
const OrderDetailScreen = () => {
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <View style={{ flex: 1, paddingVertical: 10, paddingHorizontal: 10 }}>
        <OrderDetail />
        <Buttons />
      </View>
    </SafeAreaView>
  );
};

export { OrderDetailScreen };
