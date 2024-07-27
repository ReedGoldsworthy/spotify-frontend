// import { useState, useEffect } from 'react'
import axios from 'axios'
// import Note from './components/Note'
// import Sidebar from './components/Sidebar'
// import GenreSelection from './components/GenreSelection'
import noteService from './services/notes'
import loginService from './services/login'
import dataService from './services/data'

import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Login from './components/Login'
import DataTable from './components/DataTable';
import './App.css';
import { stepButtonClasses } from '@mui/material';

const user = new URLSearchParams(window.location.search).get('user')
const access_token = new URLSearchParams(window.location.search).get('access_token')

function App() {
  const [selectedPlaylists, setSelectedPlaylist] = useState([]);
  const [activeSection, setActiveSection] = useState('Track List');

  // const refresh_token = new URLSearchParams(window.location.search).get('refresh_token');
  // const expires_in = new URLSearchParams(window.location.search).get('expires_in');

  const [username, setUsername] = useState('');
  const [refresh, setRefresh] = useState('');
  const [expiresIn, setExpiresIn] = useState('');
  const [playlists, setPlaylists] = useState([]);
  const [playlistID, setPlaylistID ] = useState('')
  const [playlist, setPlaylist] = useState('');
  const [token, setToken] = useState('');
  const [songs, setSongs] = useState([])

  

  const handleGenreClick = async (playlist) => {

    setPlaylist(playlist.name)
    

      //this service calls our backend with the playlist spotifyID to get the tracks if the playlist is in our db or 
      // to store the tracks into our db  
      dataService.getSongs(playlist.spotifyId)
      .then(response => {
        setSongs(response.data)
      })
       
  };

  const handleNavClick = (section) => {
    setActiveSection(section);
  };


  const handleLogout = () => {
    setUsername('')
  };

  

  useEffect(() => {
    if (user) {
      setUsername(user)
      setToken(access_token)
  
      
      dataService
        .getPlaylists()
        .then(response => {
          // console.log(response.data)
        setPlaylists(response.data)
    })
    }

    window.history.pushState({}, null, "/")

  }, [user])

  if (!username) {
    return <Login />
  } else {
    return (
      <>
      <h1> User: {username}</h1>
     <div className="d-flex">
      <Sidebar selectedPlaylist={playlist} onGenreClick={handleGenreClick} songs={playlists} />
      <div className="content-wrapper d-flex flex-column">
        <Navbar activeSection={activeSection} onNavClick={handleNavClick} handleLogout={handleLogout} />
        <div className="p-4">
          {/* <h1>{activeSection}</h1> */}
          {/* Content based on activeSection */}
          {activeSection === 'Track List' && playlists &&  <ul>
          {
            <h1> Showing tracks for : {playlist}</h1>
         }
        </ul>}
          {activeSection === 'Data Visualization' && <div> Access token :  </div>}
          {activeSection === 'Create' && <div>Create Content</div>}
          {activeSection === 'Logout' && <div>Logout</div>}
          <DataTable data={songs}/>
        </div>
       
      </div>
    </div>
    </>

    );
    
  }
   
}

  


export default App;
