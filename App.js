import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation/RootNavigation";
import { useFonts } from "expo-font";

const App = () => {
  const [loaded] = useFonts({
    ProximaNova: require("./src/assets/fonts/ProximaNova/ProximaNova-Regular.otf"),
    ProximaNovaBold: require("./src/assets/fonts/ProximaNova/ProximaNova-Bold.otf"),
    ProximaNovaSemiBold: require("./src/assets/fonts/ProximaNova/ProximaNova-Semibold.otf"),
  });
  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};
export default App;
