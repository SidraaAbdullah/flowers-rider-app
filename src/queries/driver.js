import axios from "axios";
import { BASE_URL, USER_TYPES } from "../constants";

export const PATCH_DRIVER_UPDATE = async (e) => {
  const res = await axios.patch(BASE_URL + "/driver", e);
  return res.data;
};

export const DRIVER_GET = async (e) => {
  const res = await axios.get(BASE_URL + "/driver", e);
  return res.data;
};

export const CHANGE_ORDER_STATUS = async (e) => {
  const { id, status } = e;
  const res = await axios.put(BASE_URL + `/order-status/${id}`, {
    status,
    type: USER_TYPES.DRIVER,
  });
  return res.data;
};
