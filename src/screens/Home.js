import React, { useState } from "react";
import { Text, View, StyleSheet, Switch } from "react-native";
import { Icon } from "react-native-elements";
import { useMutation, useQuery } from "react-query";
import Home from "../components/home/index";
import useStorage from "../hooks/useStorage";
import { PATCH_DRIVER_UPDATE } from "../queries/driver";

const HomeScreen = ({ navigation }) => {
  const { mutate: patchUpdateDelivery } = useMutation(PATCH_DRIVER_UPDATE);
  const [user, loading] = useStorage("da_logIn", { isObject: true });
  const [isEnabled, setIsEnabled] = useState(false);
  const { isLoading: driverLoad } = useQuery("/driver", {
    onSuccess: (res) => {
      setIsEnabled(res.data[0] && res.data[0].availableForDelivery);
    },
  });
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const handleAvailableDelivery = () => {
    toggleSwitch();
    patchUpdateDelivery(
      {
        availableForDelivery: !isEnabled,
      },
      {
        onError: (err) => {
          console.log(err.response.data.message);
        },
      }
    );
  };
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
        <View style={styles.container}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.text}>Hi, {user.name}</Text>
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
          {!driverLoad && (
            <React.Fragment>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "ProximaNova",
                  marginRight: 20,
                }}
              >
                Available for delivery
              </Text>
              <Switch
                trackColor={{ false: "#F7F7FA", true: "#FABC5A" }}
                thumbColor={isEnabled ? "white" : "#F7F7FA"}
                onValueChange={handleAvailableDelivery}
                value={isEnabled}
              />
            </React.Fragment>
          )}
        </View>
      </View>
      <Home navigation={navigation} />
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
