import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

const HistoryTab = ({ navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("orderDetail")}
      style={styles.container}
    >
      <View>
        <View style={[styles.flex, { paddingBottom: 4 }]}>
          <Text style={styles.text}>Order # 42356 </Text>
          <Text style={[styles.text, { color: "#818C99" }]}>Feb 2, 1:00</Text>
        </View>
        <Text style={[styles.text, { color: "#0E5561", paddingBottom: 12 }]}>
          9 item
        </Text>
        <View style={[styles.flex, { paddingBottom: 4 }]}>
          <Text style={styles.text}>Delivery date & time </Text>
          <Text style={styles.text}>Feb 4, 10:00</Text>
        </View>
        <View style={[styles.flex, { paddingBottom: 15 }]}>
          <Text style={styles.text}>Delivery charges </Text>
          <Text style={styles.text}>$4</Text>
        </View>
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
            <Icon name="check-circle" color="#0E5561" type="font-awesome" />
            <Text style={[styles.text, { marginLeft: 10, fontSize: 16 }]}>
              Order delivered
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Icon name="star" color="#FABC5A" type="font-awesome" />
            <Icon name="star" color="#FABC5A" type="font-awesome" />
            <Icon name="star" color="#FABC5A" type="font-awesome" />
            <Icon name="star" color="#FABC5A" type="font-awesome" />
            <Icon name="star" color="lightgray" type="font-awesome" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
    backgroundColor: "#F7F7FA",
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
  },
  flex: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
});
