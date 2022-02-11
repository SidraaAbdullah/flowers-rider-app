import React, { useState } from "react";
import { Icon } from "react-native-elements";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CommonButton from "../../common-button";
import CustomerCall from "../../modal/CustomerCall";

const CustomerDetail = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          setExpanded(!expanded);
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.headingText}>Customer</Text>
          <Text>
            {expanded ? (
              <Icon name="angle-down" type="font-awesome" />
            ) : (
              <Icon name="angle-up" type="font-awesome" />
            )}
          </Text>
        </View>
        {expanded && (
          <View style={{ marginTop: 5 }}>
            <View style={{ flexDirection: "row", marginVertical: 3 }}>
              <Image
                source={{
                  uri: "https://cci-research.nl/author/aya-fukami/avatar_hu3c18ec414e2e5615db7090f5d5745dd7_17253_270x270_fill_lanczos_center_2.png",
                }}
                style={{ width: 50, height: 50, borderRadius: 14 }}
              />
              <Text
                style={[styles.headingText, { marginLeft: 10, marginTop: 2 }]}
              >
                Sarmed Rizvi
              </Text>
            </View>
            <View style={{ marginTop: 5 }}>
              <CustomerCall />
            </View>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};
export { CustomerDetail };

const styles = StyleSheet.create({
  headingText: {
    fontFamily: "ProximaNova",
    fontSize: 16,
    color: "black",
  },
  text: {
    fontFamily: "ProximaNova",
    fontSize: 15,
    color: "#818C99",
  },
  container: {
    marginVertical: 7,
    padding: 12,
    paddingHorizontal: 14,
    backgroundColor: "#F7F7FA",
    borderRadius: 10,
  },
});
