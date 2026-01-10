import axios from "axios";
import React from "react";
const axiosInstance = axios.create({
  //baseURL: "http://localhost:3000",
  baseURL: "https://e-tuition-bd-server-mauve.vercel.app",
});
const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
