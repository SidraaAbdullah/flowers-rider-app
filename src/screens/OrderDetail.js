import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Alert, SafeAreaView, StyleSheet, View } from "react-native";
import { useQuery } from "react-query";
import OrderDetail from "../components/order-detail";
import { Buttons } from "../components/order-detail/components";
import { ORDER_STATUSES, USER_TYPES, windowWidth } from "../constants";
import LottieView from "lottie-react-native";
import { getSocketData } from "../hooks/socket-api";

const OrderDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { _id } = route.params;
  const {
    data: order,
    isLoading,
    isRefetching,
  } = useQuery(`/order?type=${USER_TYPES.DRIVER}&order_id=${_id}`, {
    onError: (err) => {
      Alert.alert(err.response.data?.message);
      navigation.goBack();
    },
  });

  // REACTING UPON STATUS CHANGE OF ORDER
  const getUpdatedStatus = (status, order) => {
    const data = order?.data && order?.data[0];
    if (status !== data?.status) {
      Alert.alert("Order is assigned to other driver OR cancelled!");
      navigation.goBack();
    }
  };

  // DEACTIVATING THE SCREEN WHEN ORDER IS ALREADY ASSIGNED TO DRIVER.
  useEffect(() => {
    getSocketData(`${_id}_statusUpdate`, (status) =>
      getUpdatedStatus(status, order)
    );
  }, []);

  // LOADING SCREEN WHEN FETCHING DATA
  if (isLoading || isRefetching) {
    return (
      <View style={styles.container}>
        <LottieView
          source={require("../assets/lotties/9619-loading-dots-in-yellow.json")}
          autoPlay
          loop
          style={{ width: windowWidth }}
        />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.primaryContainer}>
        <OrderDetail orderDetails={order && order.data[0]} />
        <Buttons order_id={_id} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "white", flex: 1 },
  primaryContainer: { flex: 1, paddingVertical: 10, paddingHorizontal: 10 },
});
export { OrderDetailScreen };
