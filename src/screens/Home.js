import React, { useState } from "react";
import { Text, View, StyleSheet, Switch } from "react-native";
import { Icon } from "react-native-elements";
import Home from "../components/home/index";

const HomeScreen = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
        <View style={styles.container}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.text}>Hi, Sarmed</Text>
          </View>
          <View>
            <Icon name="bell" type="font-awesome" />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingTop: 5,
            paddingRight: 5,
          }}
        >
          <Text
            style={{ fontSize: 16, fontFamily: "ProximaNova", marginRight: 8 }}
          >
            Available for delivery
          </Text>
          <Switch
            trackColor={{ false: "#F7F7FA", true: "#FABC5A" }}
            thumbColor={isEnabled ? "white" : "#F7F7FA"}
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
          />
        </View>

        <View style={{ paddingVertical: 10 }}>
          <Home navigation={navigation} />
        </View>
      </View>
    </View>
  );
};

export { HomeScreen };

const styles = StyleSheet.create({
  text: {
    fontFamily: "ProximaNovaSemiBold",
    fontSize: 22,
  },
  container: {
    paddingVertical: 10,
    paddingHorizontal: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
