import React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import colors from "../../../constants/colors";
import OrderCard from "./OrderCard";
import LottieView from "lottie-react-native";
import { windowWidth } from "../../../constants";

const OnGoingTab = ({ navigation, data }) => {
  return (
    <FlatList
      data={data}
      ListEmptyComponent={() => (
        <LottieView
          source={require("../../../assets/lotties/70780-no-result-found.json")}
          autoPlay
          loop
          style={{ width: windowWidth }}
        />
      )}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          style={styles.container}
          onPress={() => navigation.push("orderDetail", item)}
        >
          <React.Fragment>
            <OrderCard item={item} />
            <View
              style={{
                borderTopColor: "lightgray",
                borderTopWidth: 1,
                borderStyle: "solid",
                alignItems: "center",
                paddingTop: 15,
              }}
            >
              <Text style={[styles.text, { fontSize: 16 }]}>Flower</Text>
            </View>
          </React.Fragment>
        </TouchableOpacity>
      )}
      ItemSeparatorComponent={() => <View style={{ marginBottom: 16 }} />}
      keyExtractor={({ index }) => index}
    />
  );
};
export { OnGoingTab };
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
