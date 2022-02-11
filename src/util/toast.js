import { showMessage } from "react-native-flash-message";

// SHOW TOAST/FLASH MESSAGE.
export const showToast = (message, type, duration) => {
  showMessage({
    message: message,
    type: type ? type : "default",
    duration: duration ? duration : 6000,
    icon: type ? "auto" : "info",
    textStyle: { fontFamily: "ProximaNovaSemiBold", fontSize: 14 },
    titleStyle: {},
    // style: { paddingRight: 30 },
  });
};
