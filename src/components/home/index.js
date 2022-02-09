import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { NewTab, OnGoingTab, HistoryTab } from "./components";

const Home = ({ navigation }) => {
  const [tab, setTab] = useState("new");
  const isTrue = { color: "black", backgroundColor: "white" };
  let newStyle = tab != "new" ? { color: "#818C99" } : isTrue;
  let onGoingStyle = tab != "onGoing" ? { color: "#818C99" } : isTrue;
  let historyStyle = tab != "history" ? { color: "#818C99" } : isTrue;
  return (
    <View>
      <View style={styles.container}>
        <Text onPress={() => setTab("new")} style={[styles.text, newStyle]}>
          New
        </Text>
        <Text
          onPress={() => setTab("onGoing")}
          style={[styles.text, onGoingStyle]}
        >
          Ongoing
        </Text>
        <Text
          onPress={() => setTab("history")}
          style={[styles.text, historyStyle]}
        >
          History
        </Text>
      </View>
      <ScrollView>
        <View style={{ paddingTop: 15 }}>
          {tab === "new" ? (
            <NewTab navigation={navigation} />
          ) : tab === "onGoing" ? (
            <OnGoingTab navigation={navigation} />
          ) : tab === "history" ? (
            <HistoryTab navigation={navigation} />
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  text: {
    fontFamily: "ProximaNovaSemiBold",
    fontSize: 16,
    paddingVertical: 8,
    borderRadius: 10,
    paddingHorizontal: 15,
    width: "33.33%",
    textAlign: "center",
  },
  container: {
    backgroundColor: "#F7F7FA",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
});
