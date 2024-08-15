import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import LoadingScreen from './components/loadingScreen';
import DataDisplay from './components/DataDisplay';
import Login from './components/Login';
import DataTable from './components/DataTable';
import './App.css';
import { Container, Form, Button, Row, Col } from 'react-bootstrap'; // Import necessary Bootstrap components
import loginService from './services/login';
import dataService from './services/data';
import StagedTracksTable from './components/StagedTracksTable';

const user = new URLSearchParams(window.location.search).get('user');
const access_token = new URLSearchParams(window.location.search).get('access_token');

function App() {
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
  const [playlistVisibility, setPlaylistVisibility] = useState('private'); // New state for visibility

  const updateStagedTracks = (newValue) => {
    setStagedTracks((prevStagedTracks) => {
      const existingIds = new Set(prevStagedTracks.map(item => item.id));
      const filteredNewValue = newValue.filter(item => !existingIds.has(item.id));
      const updatedStagedTracks = [...prevStagedTracks, ...filteredNewValue];
      return updatedStagedTracks;
    });
  };

  const clearStagedTracks = () => {
    setStagedTracks([])
  };

  const removeTrack = (id) => {
    setStagedTracks((prevTracks) => prevTracks.filter((track) => track.id !== id));
  };

  const handleGenreClick = async (playlist) => {
    setPlaylist(playlist);
    setLoading(true);
    
    dataService
      .getSongs(username, playlist.spotifyId)
      .then(response => {
        setSongs(response.data);
        setLoading(false);
      })
      .then(() => {
        dataService
          .getInfo(username, playlist.spotifyId)
          .then(response => {
            setInfo(response.data);
            console.log(response.data);
          });
      });
  };

  const handleNavClick = (section) => {
    setActiveSection(section);
  };

  const handleLogout = () => {
    setUsername('');
  };

  const handleCreatePlaylist = () => {
    const trackIDs = stagedTracks.map(track => track.spotifyID); // Assuming stagedTracks contains the tracks you want to add
    dataService
      .postPlaylist(username, newPlaylistName, newPlaylistDescription, playlistVisibility, trackIDs )
        .then(data => {
          // Update the playlists state to include the new playlist
          setPlaylists(prevPlaylists => [...prevPlaylists, data]);
          setNewPlaylistName('');
          setNewPlaylistDescription('')
          //add created playlist to playlists and store in DB
        }).catch(error => {
          console.error("error creating playlist", error)
        })
  };

  useEffect(() => {
    if (user) {
      setUsername(user);
      setToken(access_token);

      dataService
        .getPlaylists()
        .then(response => {
          setPlaylists(response.data);
        });
    }

    window.history.pushState({}, null, "/");
  }, [user]);

  if (!username) {
    return <Login />;
  } else {
    return (
      <div className="app-container">
       
        <div className="main-wrapper">
          <Sidebar selectedPlaylist={playlist.name} onGenreClick={handleGenreClick} songs={playlists} />
          <div className="content-wrapper">
            <Navbar 
              activeSection={activeSection} 
              onNavClick={handleNavClick} 
              handleLogout={handleLogout} 
              stagedTracksCount={stagedTracks.length} 
              clearStagedTracks={clearStagedTracks}
            />
            <Container>
              <div className="p-4">
                {activeSection === 'Track List' && playlists && (
                  <div>
                    <ul>
                      <h1 style={{ marginBottom: '20px' }}>Showing tracks for: {playlist.name}</h1>
                    </ul>
                    {loading ? <LoadingScreen /> : <DataTable data={songs} handleStagedTracks={updateStagedTracks}/>}
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
                    {loading ? <LoadingScreen/> : <DataDisplay info={info}/>}  
                  </div>
                )}
                {activeSection === 'Create' && (
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
                    <StagedTracksTable data={stagedTracks} clearStagedTracks={clearStagedTracks} removeTrack={removeTrack}/>
                  </div>
                )}
                {activeSection === 'Logout' && <div>Logout</div>}
              </div>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
