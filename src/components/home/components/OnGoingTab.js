import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import colors from "../../../constants/colors";
import OrderCard from "./OrderCard";
import LottieView from "lottie-react-native";
import { windowWidth } from "../../../constants";

const OnGoingTab = ({ navigation, data }) => {
  return (
    <React.Fragment>
      {!data.length ? (
        <LottieView
          source={require("../../../assets/lotties/70780-no-result-found.json")}
          autoPlay
          loop
          style={{ width: windowWidth }}
        />
      ) : (
        <ScrollView>
          {data.map((item, index) => (
            <View style={styles.container}>
              <React.Fragment key={index}>
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
            </View>
          ))}
        </ScrollView>
      )}
    </React.Fragment>
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
  },
  flex: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
});
