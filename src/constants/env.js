import { Dimensions } from "react-native";

export const URL = `http://192.168.100.8:8000`;
export const BASE_URL = `${URL}/api`;
export const windowWidth = Dimensions.get("screen").width;
export const windowHeight = Dimensions.get("screen").height;
export const DRIVER_STATUS = {
  PENDING: "PENDING",
  ACTIVE: "ACTIVE",
};
