import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useMutation } from "react-query";
import { ORDER_STATUSES } from "../../../constants";
import { CHANGE_ORDER_STATUS } from "../../../queries/driver";
import CommonButton from "../../common-button";

const Buttons = ({ order_id }) => {
  const { mutate: changeOrderStatus } = useMutation(CHANGE_ORDER_STATUS);
  const navigation = useNavigation();
  const acceptOrder = () => {
    Alert.alert("Confirm", "Are you sure you want to accept this order?", [
      {
        text: "No",
        onPress: () => navigation.goBack(),
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          changeOrderStatus(
            {
              id: order_id,
              status: ORDER_STATUSES["DRIVER-ASSIGNED"],
            },
            {
              onSuccess() {
                // Alert.alert("This order is assigned to you");
                navigation.goBack();
              },
              onError(error) {
                Alert.alert(error.response.data?.message);
                navigation.goBack();
              },
            }
          );
        },
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <CommonButton
        text="Reject"
        bgColor="#F7F7FA"
        style={{ flex: 1, marginRight: 12 }}
      />
      <CommonButton text="Accept" style={{ flex: 1 }} onPress={acceptOrder} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 10,
    flex: 1,
  },
});
export { Buttons };
