import axios from "axios";
// const baseUrl = "/api/notes";
const baseUrl = "http://localhost:3001/api/data/user";

const getPlaylists = () => {
  return axios.get("http://localhost:3001/api/data/playlist");
};

const getSongs = (userID, playlistID) => {
  return axios.get(
    `http://localhost:3001/api/data/${userID}/playlist/${playlistID}/tracks`
  );
};

export default {
  getPlaylists: getPlaylists,
  getSongs: getSongs,
};
