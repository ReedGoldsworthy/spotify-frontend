import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import LoadingScreen from './components/loadingScreen';
import DataDisplay from './components/DataDisplay';
import Login from './components/Login';
import DataTable from './components/DataTable';
import './App.css';
import { Container } from 'react-bootstrap';
import loginService from './services/login';
import dataService from './services/data';

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
  const [stagedTracks, setStagedTracks] = useState([]); // Fixed initialization

  const updateStagedTracks = (newValue) => {
    setStagedTracks((prevStagedTracks) => {
      // Convert the current stagedTracks to a Set of IDs for quick lookup
      const existingIds = new Set(prevStagedTracks.map(item => item.id));
  
      // Filter newValue to include only items not in stagedTracks
      const filteredNewValue = newValue.filter(item => !existingIds.has(item.id));
  
      // Append the new items to the existing stagedTracks
      const updatedStagedTracks = [...prevStagedTracks, ...filteredNewValue];
  
      console.log(updatedStagedTracks); // Log updated value for debugging
      return updatedStagedTracks;
    });
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
        {/* <h1>User: {stagedTracks}</h1> */}
        <div className="main-wrapper">
          <Sidebar selectedPlaylist={playlist.name} onGenreClick={handleGenreClick} songs={playlists} />
          <div className="content-wrapper">
          <Navbar 
            activeSection={activeSection} 
            onNavClick={handleNavClick} 
            handleLogout={handleLogout} 
            stagedTracksCount={stagedTracks.length} // Pass the length of stagedTracks
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
                        <h3 style={{ marginLeft: '0px', marginRight: '15px' }}>{info.numTracks} Tracks </h3>
                        <h3>{info.numArtists} Artists </h3>
                      </div>
                    </div>
                    <DataDisplay info={info} />
                  </div>
                )}
                {activeSection === 'Create' && <div>Create Content {token}</div>}
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
