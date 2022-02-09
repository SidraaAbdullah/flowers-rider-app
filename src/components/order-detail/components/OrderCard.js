import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const OrderCard = () => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={{
            uri: "https://bakeryonline.pk/wp-content/uploads/2020/08/bouquet-of-1-dozen-roses.jpg",
          }}
          style={{ width: 70, height: 70 }}
        />
        <View style={{ marginLeft: 8, flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.headingText}>Flower name</Text>
            <Text style={styles.headingText}>Rs:100</Text>
          </View>

          <Text style={styles.text}>Flower description</Text>
          <Text style={styles.text}>x1</Text>
        </View>
      </View>
    </View>
  );
};
export { OrderCard };

const styles = StyleSheet.create({
  headingText: {
    fontFamily: "ProximaNovaSemiBold",
    fontSize: 18,
    color: "black",
    marginBottom: 2,
  },
  text: {
    fontFamily: "ProximaNova",
    fontSize: 15,
    color: "#818C99",
    marginBottom: 2,
  },
  container: {
    elevation: 1,
    backgroundColor: "white",
    padding: 10,
    marginBottom: 1,
  },
});
