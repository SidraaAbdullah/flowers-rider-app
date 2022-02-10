import axios from "axios";
import { BASE_URL } from "../constants";

export const PATCH_DRIVER_UPDATE = async (e) => {
  const res = await axios.patch(BASE_URL + "/driver", e);
  return res.data;
};

export const DRIVER_GET = async (e) => {
  const res = await axios.get(BASE_URL + "/driver", e);
  return res.data;
};
