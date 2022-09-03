import axios from "axios";
import { REST_API_URL } from "../constants/api";

const axiosInstance = axios.create({
  baseURL: REST_API_URL,
  timeout: 5000,
  headers: {
    "Accept-Version": 1,
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json; charset=utf-8",
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udCBFbmQgNzEiLCJIZXRIYW5TdHJpbmciOiIyOS8xMi8yMDIyIiwiSGV0SGFuVGltZSI6IjE2NzIyNzIwMDAwMDAiLCJuYmYiOjE2NDU5ODEyMDAsImV4cCI6MTY3MjQxOTYwMH0.SZe3CJl1OkNH-0zfzqOV0CSC8WZ6q2hw64UykpCytT0",
    Authorization: `Bearer ${
      typeof window !== "undefined" ? localStorage.getItem("access_token") : ""
    }`,
  },
});

export default axiosInstance;
