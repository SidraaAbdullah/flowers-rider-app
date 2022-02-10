import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation/RootNavigation";
import { QueryClientProvider, QueryClient } from "react-query";
import { useFonts } from "expo-font";
import {
  defaultQueryFn,
  defaultMutationFn,
  reactQueryConfig,
} from "./src/constants/index";
import AppLoading from "expo-app-loading";
import axios from "axios";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { BASE_URL } from "./src/constants/env";
const App = () => {
  const [verify, setVerify] = useState({
    verify: false,
    isVerifyLoading: true,
  });
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        queryFn: defaultQueryFn,
        ...reactQueryConfig,
      },
      mutations: {
        mutationFn: defaultMutationFn,
      },
    },
  });
  useEffect(async () => {
    let user = await AsyncStorageLib.getItem("da_logIn");
    user = JSON.parse(user);
    if (user) {
      axios.defaults.headers.common.Authorization = `bearer ${user?.access_token}`;
      axios
        .post(BASE_URL + "/verify-user")
        .then(() => {
          console.log("res");
          setVerify({ verify: true, isVerifyLoading: false });
        })
        .catch(() => {
          setVerify({ verify: false, isVerifyLoading: false });
        });
    }
    setVerify({ verify: false, isVerifyLoading: false });
  }, []);
  const [loaded] = useFonts({
    ProximaNova: require("./src/assets/fonts/ProximaNova/ProximaNova-Regular.otf"),
    ProximaNovaBold: require("./src/assets/fonts/ProximaNova/ProximaNova-Bold.otf"),
    ProximaNovaSemiBold: require("./src/assets/fonts/ProximaNova/ProximaNova-Semibold.otf"),
  });
  if (!loaded || verify.isVerifyLoading) {
    return <AppLoading />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
};
export default App;
