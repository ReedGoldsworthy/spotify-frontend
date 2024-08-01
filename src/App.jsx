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
import LoadingScreen from './components/loadingScreen';

import Login from './components/Login'
import DataTable from './components/DataTable';
import './App.css';
import { stepButtonClasses } from '@mui/material';


const user = new URLSearchParams(window.location.search).get('user')
const access_token = new URLSearchParams(window.location.search).get('access_token')

function App() {
  const [selectedPlaylists, setSelectedPlaylist] = useState([]);
  const [activeSection, setActiveSection] = useState('Track List');

  const [username, setUsername] = useState('');
  const [refresh, setRefresh] = useState('');
  const [expiresIn, setExpiresIn] = useState('');
  const [playlists, setPlaylists] = useState([]);
  const [playlistID, setPlaylistID ] = useState('')
  const [playlist, setPlaylist] = useState('');
  const [token, setToken] = useState('');
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(true)

  

  const handleGenreClick = async (playlist) => {

    setPlaylist(playlist.name)
    
    //render loading circle while playlist tracks are retrieved
    setLoading(true)
    
      //this service calls our backend with the users name and the playlist spotifyID to
      // either retrieve the playlist tracks from the DB or store them into our DB  
      dataService.getSongs(username, playlist.spotifyId)
      .then(response => {
        setSongs(response.data)
        setLoading(false)
      })
      
  };

  const handleNavClick = (section) => {
    setActiveSection(section);
  };


  const handleLogout = () => {
    setUsername('')
  };

  

  //after returning from login & authorization, sets user and retrieves user's playlists for the sidebar
  useEffect(() => {
    if (user) {
      setUsername(user)
      setToken(access_token)
  
      
      dataService
        .getPlaylists()
        .then(response => {
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
          {loading ? <LoadingScreen/> : <DataTable data={songs}/>}
        </div>
       
      </div>
    </div>
    </>

    );
    
  }
   
}

  


export default App;
