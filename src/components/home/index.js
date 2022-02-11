import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useQuery } from "react-query";
import { ORDER_STATUSES, USER_TYPES, windowWidth } from "../../constants";
import colors from "../../constants/colors";
import { getSocketData } from "../../hooks/socket-api";
import { orderTabs } from "../../util/home";
import LottieView from "lottie-react-native";

const Home = ({ navigation }) => {
  const [tab, setTab] = useState(orderTabs[0].name);
  const [orderData, setOrderData] = useState([]);
  const { isLoading, isRefetching, refetch } = useQuery(
    `/order?type=${USER_TYPES.DRIVER}`,
    {
      onSuccess: (res) => {
        setOrderData(res.data || []);
      },
    }
  );
  navigation.addListener("focus", () => {
    refetch();
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

  useEffect(() => {
    refetch();
  }, [tab]);

  return (
    <View style={styles.superContainer}>
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
      <View style={styles.mainContainer}>
        {isLoading || isRefetching ? (
          <LottieView
            source={require("../../assets/lotties/9619-loading-dots-in-yellow.json")}
            autoPlay
            loop
            style={{ width: windowWidth }}
          />
        ) : (
          <Active.Component
            navigation={navigation}
            data={data[Active.name] || []}
          />
        )}
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
  superContainer: { flex: 1, marginHorizontal: 16 },
  mainContainer: { paddingTop: 15, flex: 1, marginBottom: 10 },
});
