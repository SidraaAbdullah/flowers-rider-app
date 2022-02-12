import axios from "axios";
import { BASE_URL } from "../constants";

export const PATCH_PROFILE_UPDATE = async (e) => {
  const res = await axios.patch(BASE_URL + "/driver", e);
  return res.data;
};
