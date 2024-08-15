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

const getInfo = (userID, playlistID) => {
  return axios.get(
    `http://localhost:3001/api/data/${userID}/playlist/${playlistID}/info`
  );
};

const postPlaylist = async (
  userID,
  newPlaylistName,
  newPlaylistDescription,
  playlistVisibility,
  trackIDs
) => {
  try {
    const response = await axios.post(
      `http://localhost:3001/api/data/${userID}/playlist`,
      {
        playlistName: newPlaylistName,
        playlistDescription: newPlaylistDescription,
        isPublic: playlistVisibility,
        trackIDs: trackIDs,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating playlist:", error);
    throw error;
  }
};

export default {
  getPlaylists: getPlaylists,
  getSongs: getSongs,
  getInfo: getInfo,
  postPlaylist: postPlaylist,
};
