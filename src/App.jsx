// src/App.jsx

import React, { useEffect, useState } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Navbar from './components/navbar/Navbar';
import Login from './components/login/Login';
import ContentSection from './components/ContentSection';
import './App.css';
import { Container } from 'react-bootstrap';
import dataService from './services/data';
import { 
  updateStagedTracks, 
  clearStagedTracks, 
  removeTrack, 
  handlePlaylistClick, 
  handleNavClick, 
  handleLogout, 
  handleCreatePlaylist 
} from './handlers/AppHandlers';

// Extract user and access token from URL parameters
const user = new URLSearchParams(window.location.search).get('user');
const access_token = new URLSearchParams(window.location.search).get('access_token');

function App() {
  // State variables for managing app state
  const [activeSection, setActiveSection] = useState('Track List');
  const [username, setUsername] = useState('');
  const [playlists, setPlaylists] = useState([]);
  const [playlist, setPlaylist] = useState('');
  const [token, setToken] = useState('');
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState([]);
  const [stagedTracks, setStagedTracks] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [newPlaylistDescription, setNewPlaylistDescription] = useState('');
  const [playlistVisibility, setPlaylistVisibility] = useState('private');

  // Effect to fetch playlists when user is authenticated
  useEffect(() => {
    if (user) {
      setUsername(user);
      setToken(access_token);

      dataService.getPlaylists().then(response => {
        setPlaylists(response.data);
      });
    }

    // Clean up URL after fetching user details
    window.history.pushState({}, null, "/");
  }, [user]);

  // If the user is not authenticated, show the login screen
  if (!username) {
    return <Login />;
  }

  return (
    <div className="app-container">
      <div className="main-wrapper">
        {/* Sidebar component to display and select playlists */}
        <Sidebar
          selectedPlaylist={playlist.name}
          onGenreClick={(playlist) => handlePlaylistClick(playlist, username, setPlaylist, setSongs, setLoading, dataService, setInfo)}
          songs={playlists}
        />
        <div className="content-wrapper">
          {/* Navbar component for navigation and user actions */}
          <Navbar 
            activeSection={activeSection} 
            onNavClick={(section) => handleNavClick(section, setActiveSection)} 
            handleLogout={() => handleLogout(setUsername)} 
            stagedTracksCount={stagedTracks.length} 
            clearStagedTracks={() => clearStagedTracks(setStagedTracks)}
          />
          {/* ContentSection component to display content based on the active section */}
          <ContentSection
            activeSection={activeSection}
            playlists={playlists}
            playlist={playlist}
            loading={loading}
            songs={songs}
            info={info}
            stagedTracks={stagedTracks}
            newPlaylistName={newPlaylistName}
            setNewPlaylistName={setNewPlaylistName}
            newPlaylistDescription={newPlaylistDescription}
            setNewPlaylistDescription={setNewPlaylistDescription}
            playlistVisibility={playlistVisibility}
            setPlaylistVisibility={setPlaylistVisibility}
            handleCreatePlaylist={() => handleCreatePlaylist(username, newPlaylistName, newPlaylistDescription, playlistVisibility, stagedTracks, dataService, setPlaylists, setNewPlaylistName, setNewPlaylistDescription)}
            clearStagedTracks={() => clearStagedTracks(setStagedTracks)}
            removeTrack={(id) => removeTrack(id, setStagedTracks)}
            updateStagedTracks={(newTracks) => updateStagedTracks(newTracks, setStagedTracks)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
