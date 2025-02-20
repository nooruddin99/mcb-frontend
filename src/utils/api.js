import axios from "axios";

const api = axios.create({
  baseURL: "https://andy-game-backend.herokuapp.com",
  //   baseURL: "http://localhost:5000",
});

export default api;
