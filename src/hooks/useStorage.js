/*
	AUTHOR: SARMED RIZVI
   SUMMARY: FOR ASYNC STORAGE VALUES
*/

import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const useStorage = (id, props = {}) => {
  const navigation = useNavigation();
  const { isObject } = props;
  const [result, setResult] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [rerun, isRerun] = useState(true);
  navigation.addListener("focus", () => {
    isRerun((prev) => !prev);
  });
  React.useEffect(() => {
    async function fetchStorage() {
      try {
        setLoading(true);
        const value = await AsyncStorage.getItem(id);
        setResult(isObject ? JSON.parse(value || "{}") : value);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
    if (id !== "") {
      fetchStorage();
    }
  }, [id, rerun]);
  return [result, loading];
};

export default useStorage;
