import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 35,
  },
  input: {
    height: 40,
    marginVertical: 3,
    marginBottom: 12,
    borderWidth: 1,
    borderRadius: 60,
    padding: 10,
    paddingLeft: 35,
    width: "100%",
    borderStyle: "dashed",
    borderColor: "gray",
  },
  sectionStyle: {
    position: "relative",
  },
  imageStyle: {
    position: "absolute",
    top: 13,
    left: 12,
    textAlign: "center",
  },
  label: {
    marginLeft: 4,
    fontFamily: "ProximaNovaSemiBold",
  },
});
