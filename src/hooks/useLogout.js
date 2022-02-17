import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default () => {
  const navigation = useNavigation();
  return {
    logout: async () => {
      await AsyncStorageLib.removeItem("da_logIn");
      navigation.replace("signIn");
    },
  };
};
