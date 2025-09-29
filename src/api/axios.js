import axios from "axios";

const instance = axios.create({
  baseURL: "https://rolling-api.vercel.app/19-4/",
});

export default instance;
