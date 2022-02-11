import React, { useState } from "react";
import { Overlay, Icon } from "react-native-elements";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CommonButton from "../common-button/Button";

const CustomerCall = () => {
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={toggleOverlay}
        style={{
          borderRadius: 10,
          padding: 10,
          paddingHorizontal: 18,
          backgroundColor: "white",
          alignItems: "center",
        }}
      >
        <Icon name="call-outline" type="ionicon" />
      </TouchableOpacity>
      <Overlay
        overlayStyle={{ borderRadius: 14, padding: 10 }}
        isVisible={visible}
        onBackdropPress={toggleOverlay}
      >
        <View style={{ paddingTop: 15, paddingBottom: 10 }}>
          <Text style={styles.heading}>Attention!</Text>
          <Text style={styles.text}>
            Please call the customer only in an emergency
          </Text>
          <CommonButton text="Done" bgColor="#F7F7FA" onPress={toggleOverlay} />
          <CommonButton text="Call the customer" style={{ marginTop: 10 }} />
        </View>
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "ProximaNova",
    paddingHorizontal: 25,
    textAlign: "center",
    fontSize: 15,
    color: "#818C99",
    marginBottom: 20,
  },
  heading: {
    fontFamily: "ProximaNovaBold",
    marginBottom: 10,
    textAlign: "center",
    fontSize: 20,
  },
});

export default CustomerCall;
