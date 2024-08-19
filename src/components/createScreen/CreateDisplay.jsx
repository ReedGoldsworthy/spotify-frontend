// PlaylistForm.jsx
import React from 'react';
import { Form, Button } from 'react-bootstrap';

const PlaylistForm = ({
  newPlaylistName,
  setNewPlaylistName,
  newPlaylistDescription,
  setNewPlaylistDescription,
  playlistVisibility,
  setPlaylistVisibility,
  handleCreatePlaylist,
  stagedTracks,
  clearStagedTracks,
}) => {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <Form.Control 
          type="text" 
          placeholder="Enter playlist name..." 
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <Form.Control 
          type="text" 
          placeholder="Enter description..." 
          value={newPlaylistDescription}
          onChange={(e) => setNewPlaylistDescription(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Form.Check 
            type="radio" 
            id="private" 
            name="playlistVisibility" 
            label="Private" 
            checked={playlistVisibility === 'private'}
            onChange={() => setPlaylistVisibility('private')}
            style={{ marginRight: '10px' }}
          />
          <Form.Check 
            type="radio" 
            id="public" 
            name="playlistVisibility" 
            label="Public" 
            checked={playlistVisibility === 'public'}
            onChange={() => setPlaylistVisibility('public')}
            style={{ marginRight: '10px' }}
          />
        </div>
        <Button 
          variant="primary" 
          onClick={handleCreatePlaylist}
          style={{ backgroundColor: 'teal', borderColor: 'black' }}
          disabled={stagedTracks.length === 0 || newPlaylistName.trim() === ''}
        >
          Create Playlist
        </Button>
      </div>
    
    </div>
  );
};

export default PlaylistForm;
