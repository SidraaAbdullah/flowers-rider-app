import React from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import OrderCard from "./OrderCard";
import LottieView from "lottie-react-native";
import { windowWidth } from "../../../constants";

const NewTab = ({ navigation, data }) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.push("orderDetail", item)}>
          <OrderCard item={item} />
        </TouchableOpacity>
      )}
      ItemSeparatorComponent={() => <View style={{ marginBottom: 16 }} />}
      keyExtractor={({ index }) => index}
      ListEmptyComponent={() => (
        <LottieView
          source={require("../../../assets/lotties/70780-no-result-found.json")}
          autoPlay
          loop
          style={{ width: windowWidth }}
        />
      )}
    />
  );
};
export { NewTab };
const styles = StyleSheet.create({});
