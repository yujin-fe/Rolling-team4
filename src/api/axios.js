import axios from "axios";

const instance = axios.create({
  baseURL: "https://rolling-api.vercel.app/",
});

export default instance;
