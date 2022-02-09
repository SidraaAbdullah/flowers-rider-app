import { BASE_URL } from "../constants";
import axios from "axios";

export const reactQueryConfig = {
  refetchOnWindowFocus: false,
  cacheTime: "Infinity",
  refetchOnReconnect: true,
  retry: 0,
};

// Define a default query function that will receive the query key
export const defaultQueryFn = async ({ queryKey }) => {
  const { data } = await axios.get(`${BASE_URL}${queryKey}`);
  return data;
};

// Define a default mutation function that will receive the query key
export const defaultMutationFn = async ({ queryKey }) => {
  const { data } = await axios.post(`${BASE_URL}${queryKey}`);
  return data;
};
