import axios from "axios";
// const baseUrl = "/api/notes";
const baseUrl = "http://localhost:3001/api/data/user";

const getPlaylists = () => {
  return axios.get("http://localhost:3001/api/data/playlist");
};

const getSongs = (token, playlistID) => {
  return axios
    .get(`http://localhost:3001/api/data/songs`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export default {
  getPlaylists: getPlaylists,
  getSongs: getSongs,
};
