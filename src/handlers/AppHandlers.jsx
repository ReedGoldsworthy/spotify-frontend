// handlers/playlistHandlers.js

export const updateStagedTracks = (newValue, setStagedTracks) => {
  setStagedTracks(prevStagedTracks => {
    const existingIds = new Set(prevStagedTracks.map(item => item.id));
    const filteredNewValue = newValue.filter(item => !existingIds.has(item.id));
    return [...prevStagedTracks, ...filteredNewValue];
  });
};

export const clearStagedTracks = (setStagedTracks) => {
  setStagedTracks([]);
};

export const removeTrack = (id, setStagedTracks) => {
  setStagedTracks(prevTracks => prevTracks.filter(track => track.id !== id));
};

export const handlePlaylistClick = async (playlist, username, setPlaylist, setSongs, setLoading, dataService, setInfo) => {
  setPlaylist(playlist);
  setLoading(true);

  try {
    const songsResponse = await dataService.getSongs(username, playlist.spotifyId);
    setSongs(songsResponse.data);

    const infoResponse = await dataService.getInfo(username, playlist.spotifyId);
    setInfo(infoResponse.data);
  } finally {
    setLoading(false);
  }
};

export const handleNavClick = (section, setActiveSection) => {
  setActiveSection(section);
};

export const handleLogout = (setUsername) => {
  setUsername('');
};

export const handleCreatePlaylist = (username, newPlaylistName, newPlaylistDescription, playlistVisibility, stagedTracks, dataService, setPlaylists, setNewPlaylistName, setNewPlaylistDescription) => {
  const trackIDs = stagedTracks.map(track => track.spotifyID);

  dataService.postPlaylist(username, newPlaylistName, newPlaylistDescription, playlistVisibility, trackIDs)
    .then(data => {
      setPlaylists(prevPlaylists => [...prevPlaylists, data]);
      setNewPlaylistName('');
      setNewPlaylistDescription('');
    })
    .catch(error => {
      console.error("error creating playlist", error);
    });
};
