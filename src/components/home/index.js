import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useQuery } from "react-query";
import { ORDER_STATUSES, USER_TYPES } from "../../constants";
import colors from "../../constants/colors";
import { getSocketData } from "../../hooks/socket-api";
import { orderTabs } from "../../util/home";
// import { NewTab, OnGoingTab, HistoryTab } from "./components";

const Home = ({ navigation }) => {
  const [tab, setTab] = useState(orderTabs[0].name);
  const [orderData, setOrderData] = useState([]);
  useQuery(`/order?type=${USER_TYPES.DRIVER}`, {
    onSuccess: (res) => {
      setOrderData(res.data || []);
    },
  });
  const isTrue = { color: "black", backgroundColor: "white" };
  const Active = orderTabs.find((item) => item.name === tab);
  const data = {
    New: orderData.filter((item) =>
      [ORDER_STATUSES["IN-PROGRESS"]].includes(item.status)
    ),
    Ongoing: orderData.filter((item) =>
      [
        ORDER_STATUSES["DRIVER-ASSIGNED"],
        ORDER_STATUSES["DRIVER-PICKED"],
      ].includes(item.status)
    ),
    History: orderData.filter((item) =>
      [ORDER_STATUSES.CANCELLED, ORDER_STATUSES.DELIVERED].includes(item.status)
    ),
  };
  const getNewOrder = (newOrder) => {
    setOrderData((prev) => {
      const filter = prev.filter((item) => item._id !== newOrder._id);
      return [newOrder, ...filter];
    });
  };
  const updateOrderStatus = (newOrder) => {
    setOrderData((orderData) => {
      const filteredOrders = orderData.filter(
        (item) => item._id !== newOrder.order_id
      );
      return filteredOrders;
    });
  };
  useEffect(() => {
    getSocketData("new_order", getNewOrder);
    getSocketData("update_status", updateOrderStatus);
  }, []);

  return (
    <View style={{ flex: 1, marginHorizontal: 16 }}>
      <View style={styles.container}>
        {orderTabs.map((item, key) => (
          <Text
            key={key}
            onPress={() => setTab(item.name)}
            style={[
              styles.text,
              tab !== item.name ? { color: colors.greyShade1 } : isTrue,
            ]}
          >
            {item.name}
          </Text>
        ))}
      </View>
      <View style={{ paddingTop: 15, flex: 1, marginBottom: 10 }}>
        <Active.Component
          navigation={navigation}
          data={data[Active.name] || []}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  text: {
    fontFamily: "ProximaNovaSemiBold",
    fontSize: 16,
    paddingVertical: 8,
    borderRadius: 10,
    paddingHorizontal: 15,
    width: "33.33%",
    textAlign: "center",
  },
  container: {
    backgroundColor: "#F7F7FA",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
});
