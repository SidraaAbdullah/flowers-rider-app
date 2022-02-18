import React from "react";
import { StyleSheet, View, Text, ScrollView, Alert } from "react-native";
import { useMutation } from "react-query";
import { ORDER_STATUSES } from "../../constants";
import { CHANGE_ORDER_STATUS } from "../../queries/driver";
import {
  OrderCard,
  CashDetail,
  AddressDetail,
  CustomerDetail,
} from "./components";
import { useNavigation } from "@react-navigation/native";
import CommonButton from "../common-button";
import colors from "../../constants/colors";
import { showToast } from "../../util/toast";

const OrderDetail = ({ orderDetails = {} }) => {
  const { mutate: changeOrderStatus } = useMutation(CHANGE_ORDER_STATUS);
  const navigation = useNavigation();
  const acceptOrder = (status) => {
    changeOrderStatus(
      {
        id: orderDetails._id,
        status: status,
      },
      {
        onSuccess(res) {
          showToast(res.message, "success");
          navigation.goBack();
        },
        onError(error) {
          showToast(error.response.data?.message, "danger");
          navigation.goBack();
        },
      }
    );
  };
  return (
    <React.Fragment>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1 }}>
          {(orderDetails?.products || []).map((product, index) => (
            <OrderCard details={product} key={index} />
          ))}
          {orderDetails?.special_note && (
            <View style={{ marginVertical: 7 }}>
              <Text style={styles.text}>Special Notes</Text>
              <Text style={styles.headingText}>
                {orderDetails?.special_note}
              </Text>
            </View>
          )}
          <CustomerDetail customerDetail={orderDetails.user_id} />
          <AddressDetail
            deliveryAddress={orderDetails?.deliveryAddress}
            orderDetails={orderDetails}
          />
          <CashDetail orderDetails={orderDetails} />
        </View>
      </ScrollView>
      {orderDetails.status === ORDER_STATUSES["IN-PROGRESS"] && (
        <CommonButton
          text="Accept"
          onPress={() => acceptOrder(ORDER_STATUSES["DRIVER-ASSIGNED"])}
        />
      )}
      {orderDetails.status === ORDER_STATUSES["DRIVER-ASSIGNED"] && (
        <CommonButton
          text="On the way"
          onPress={() => acceptOrder(ORDER_STATUSES["DRIVER-PICKED"])}
          bgColor={colors.secondaryShade}
          textStyles={{ color: "white" }}
        />
      )}
      {orderDetails.status === ORDER_STATUSES["DRIVER-PICKED"] && (
        <CommonButton
          text="Delivered"
          onPress={() => acceptOrder(ORDER_STATUSES.DELIVERED)}
        />
      )}
      {/* {orderDetails.status === ORDER_STATUSES.DELIVERED && (
        <CommonButton
          text="Delivered"
          onPress={acceptOrder}
          bgColor={colors.secondaryShade}
        />
      )}
      {orderDetails.status === ORDER_STATUSES.CANCELLED && (
        <CommonButton text="Delivered" onPress={acceptOrder} />
      )} */}
    </React.Fragment>
  );
};
export default OrderDetail;

const styles = StyleSheet.create({
  headingText: {
    fontFamily: "ProximaNova",
    fontSize: 15,
    color: "black",
  },
  text: {
    fontFamily: "ProximaNovaSemiBold",
    fontSize: 17,
    color: "#818C99",
    marginBottom: 4,
  },
  container: {
    elevation: 1,
    backgroundColor: "white",
    padding: 10,
    marginBottom: 1,
  },
});
