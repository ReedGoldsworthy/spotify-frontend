import axios from "axios";
// const baseUrl = "/api/notes";
const baseUrl = "http://localhost:3001/api/data/user";

const getPlaylists = () => {
  return axios.get("http://localhost:3001/api/data/playlist");
};

const getSongs = (playlistID) => {
  return axios.get(
    // "http://localhost:3001/api/data/playlist/1x6yGPXUrhubpiUTd45fEu"
    `http://localhost:3001/api/data/playlist/${playlistID}/tracks`
  );
};

export default {
  getPlaylists: getPlaylists,
  getSongs: getSongs,
};
