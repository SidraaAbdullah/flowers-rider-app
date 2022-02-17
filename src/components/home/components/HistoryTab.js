import React from "react";
import { ScrollView } from "react-native";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { ORDER_STATUSES, windowWidth } from "../../../constants";
import colors from "../../../constants/colors";
import OrderCard from "./OrderCard";
import LottieView from "lottie-react-native";
import { FlatList } from "react-native";

const HistoryTab = ({ data, navigation }) => {
  const details = {
    [ORDER_STATUSES.CANCELLED]: {
      name: "cancelled",
      color: "red",
      iconName: "cancel",
    },
    [ORDER_STATUSES.DELIVERED]: {
      name: "delivered",
      color: colors.secondaryShade,
      iconName: "check-circle",
    },
  };
  return (
    <React.Fragment>
      <FlatList
        keyExtractor={({ index }) => index}
        data={data}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.container}
            key={index}
            onPress={() => navigation.push("orderDetail", item)}
          >
            <React.Fragment>
              <OrderCard item={item} />
              <View style={styles.bottomContainer}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Icon
                    name={details[item.status].iconName}
                    color={details[item.status].color}
                    type="material-icons"
                  />
                  <Text style={[styles.text, { marginLeft: 10, fontSize: 16 }]}>
                    Order {details[item.status].name}
                  </Text>
                </View>
                {!(item.status === ORDER_STATUSES.CANCELLED) && (
                  <View style={{ flexDirection: "row" }}>
                    <Icon name="star" color="#FABC5A" type="font-awesome" />
                    <Icon name="star" color="#FABC5A" type="font-awesome" />
                    <Icon name="star" color="#FABC5A" type="font-awesome" />
                    <Icon name="star" color="#FABC5A" type="font-awesome" />
                    <Icon name="star" color="lightgray" type="font-awesome" />
                  </View>
                )}
              </View>
            </React.Fragment>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <LottieView
            source={require("../../../assets/lotties/70780-no-result-found.json")}
            autoPlay
            loop
            style={{ width: windowWidth }}
          />
        )}
      />
    </React.Fragment>
  );
};
export { HistoryTab };

const styles = StyleSheet.create({
  text: {
    fontFamily: "ProximaNova",
    fontSize: 15,
    color: "black",
  },
  container: {
    backgroundColor: colors.greyShade2,
    paddingBottom: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  flex: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  bottomContainer: {
    borderTopColor: "lightgray",
    borderTopWidth: 1,
    borderStyle: "solid",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 15,
  },
});
