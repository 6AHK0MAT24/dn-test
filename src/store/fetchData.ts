import axios from "axios";
import { BASE_URL } from "./constants";

export const fetchData = async () => {
  const testAwait = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Inside test await");
      }, 10000);
    });
  };

  const res = await testAwait().then(() => axios.get(BASE_URL));
  return res.data;
};
