// src/components/ContentSection.jsx
import React from 'react';
import LoadingScreen from './loadingScreen';
import DataDisplay from './dataScreen/DataDisplay';
import DataTable from './tracklistScreen/DataTable';
import PlaylistForm from './createScreen/CreateDisplay';
import StagedTracksTable from './createScreen/StagedTracksTable';
import { Container } from 'react-bootstrap';

const ContentSection = ({
  activeSection,
  playlists,
  playlist,
  loading,
  songs,
  info,
  stagedTracks,
  newPlaylistName,
  setNewPlaylistName,
  newPlaylistDescription,
  setNewPlaylistDescription,
  playlistVisibility,
  setPlaylistVisibility,
  handleCreatePlaylist,
  clearStagedTracks,
  removeTrack,
  updateStagedTracks
}) => {
  return (
    <Container>
      <div className="p-4">
        {activeSection === 'Track List' && playlists && (
          <div>
            <ul>
              <h1 style={{ marginBottom: '20px' }}>Showing tracks for: {playlist.name}</h1>
            </ul>
            {loading ? <LoadingScreen /> : <DataTable data={songs} handleStagedTracks={(newTracks) => updateStagedTracks(newTracks)} />}
          </div>
        )}
        {activeSection === 'Data Visualization' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h1 style={{ margin: 0, marginRight: '35px' }}>Showing analysis for: {playlist.name}</h1>
              <div style={{ marginRight: '40px', display: 'flex' }}>
                {!loading && (
                  <>
                    <h3 style={{ marginLeft: '0px', marginRight: '15px' }}>{info.numTracks} Tracks </h3>
                    <h3>{info.numArtists} Artists </h3>
                  </>
                )}
              </div>
            </div>
            {loading ? <LoadingScreen /> : <DataDisplay info={info} />}  
          </div>
        )}
        {activeSection === 'Create' && (
          <div>
            <PlaylistForm
              newPlaylistName={newPlaylistName}
              setNewPlaylistName={setNewPlaylistName}
              newPlaylistDescription={newPlaylistDescription}
              setNewPlaylistDescription={setNewPlaylistDescription}
              playlistVisibility={playlistVisibility}
              setPlaylistVisibility={setPlaylistVisibility}
              handleCreatePlaylist={handleCreatePlaylist}
              stagedTracks={stagedTracks}
              clearStagedTracks={clearStagedTracks}
            />
            <StagedTracksTable
              data={stagedTracks}
              clearStagedTracks={clearStagedTracks}
              removeTrack={removeTrack}
            />
          </div>
        )}
        {activeSection === 'Logout' && <div>Logout</div>}
      </div>
    </Container>
  );
};

export default ContentSection;
