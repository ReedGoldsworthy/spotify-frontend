import axios from "axios";
// const baseUrl = "/api/notes";
const baseUrl = "http://localhost:3001/api/login";

const getAll = async () => {
  console.log("sending request from frontend");
  return axios.get(baseUrl);
};

export default {
  getAll: getAll,
};
