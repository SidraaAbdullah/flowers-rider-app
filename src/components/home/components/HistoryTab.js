import React from "react";
import { ScrollView } from "react-native";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { ORDER_STATUSES, windowWidth } from "../../../constants";
import colors from "../../../constants/colors";
import OrderCard from "./OrderCard";
import LottieView from "lottie-react-native";

const HistoryTab = ({ navigation, data }) => {
  return (
    <React.Fragment>
      {data.length ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {data.map((item, index) => (
            <TouchableOpacity style={styles.container}>
              <React.Fragment key={index}>
                <OrderCard item={item} />
                <View
                  style={{
                    borderTopColor: "lightgray",
                    borderTopWidth: 1,
                    borderStyle: "solid",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    paddingTop: 15,
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Icon
                      name={
                        item.status === ORDER_STATUSES.CANCELLED
                          ? "cancel"
                          : "check-circle"
                      }
                      color={
                        item.status === ORDER_STATUSES.CANCELLED
                          ? "red"
                          : colors.secondaryShade
                      }
                      type="material-icons"
                    />
                    <Text
                      style={[styles.text, { marginLeft: 10, fontSize: 16 }]}
                    >
                      Order{" "}
                      {item.status === ORDER_STATUSES.CANCELLED
                        ? "cancelled"
                        : "delivered"}
                    </Text>
                  </View>

                  {!item.status === ORDER_STATUSES.CANCELLED && (
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
          ))}
        </ScrollView>
      ) : (
        <LottieView
          source={require("../../../assets/lotties/70780-no-result-found.json")}
          autoPlay
          loop
          style={{ width: windowWidth }}
        />
      )}
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
});
