import { Dimensions } from "react-native";

export const URL = `https://thawing-garden-60407.herokuapp.com`;
export const BASE_URL = `${URL}/api`;
export const windowWidth = Dimensions.get("screen").width;
export const windowHeight = Dimensions.get("screen").height;
export const DRIVER_STATUS = {
  PENDING: "PENDING",
  ACTIVE: "ACTIVE",
};
