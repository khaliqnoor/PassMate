import axios from "axios";

export const createApi = (token, userId) => {
  return axios.create({
    baseURL: "http://localhost:3000/api/passwords",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      userid: userId
    }
  });
};