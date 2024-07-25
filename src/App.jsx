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

  
// sends GET request with access token to spotify api to get playlist data
const fetchPlaylists = async (accessToken) => {
  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/playlists",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    //const songs = response.data.items.map((song) => console.log(song));
    return response.data.items
  } catch (error) {
    console.error("Error fetching Spotify profile:", error);
    throw new Error("Failed to fetch Spotify profile");
  }
};
  

  const handleGenreClick = async (playlist) => {

     //get users spotify playlists
    //  const playlists = await fetchPlaylists(token);

     // go through and save each playlist
    //  for (const playlist of playlists) {
    //    console.log(playlist)
    //  }


    setPlaylist(playlist.id)

    // dataService
    // .getPlaylists()
    // .then(response => {
    //   // console.log(response.data)
    //   const tracks = response.data.map(song => song.spotifyId)
    //   console.log(tracks)
    //   // const songs = tracks.map( (track,index) => ({
    //   //   id: index,
    //   //   playlistID,
    //   //   name: track.name,
    //   //   album: track.album.name,
    //   //   spotifyID: track.id,
    //   //   artist: track.artists[0].name,
    //   //   type: track.type,
    //   //   popularity: track.popularity,
    //   //   release_date: track.album.release_date
    //   // }) )
    
    //   })

      // try {
      //   const response = await axios.get(
      //     `https://api.spotify.com/v1/playlists/${playlist.spotifyId}/tracks`,
      //     {
      //       headers: {
      //         Authorization: `Bearer ${token}`,
      //       },
      //     }
      //   );

      //   const tracks = response.data.items.map(song => song.track);
      //   const songs = tracks.map( (track,index) => ({
      //     id: index,
      //     playlistID,
      //     name: track.name,
      //     album: track.album.name,
      //     spotifyID: track.id,
      //     artist: track.artists[0].name,
      //     type: track.type,
      //     popularity: track.popularity,
      //     release_date: track.album.release_date
      //   }) )

      //   // const songs = tracks.map()
      
      
      //   setSongs(songs)
      //   console.log(songs)
      

      // } catch (error) {
      //   console.log(error)
        
      // }

    

    
  };

  const handleNavClick = (section) => {
    setActiveSection(section);
  };


  const handleLogout = () => {
    setUsername('')
  };

  const handleClick = async () => {
    const data = await fetchPlaylists(token);
    console.log(data);
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
      <button onClick={handleClick} > Fetch playlists</button>
      
     <div className="d-flex">
      <Sidebar selectedPlaylist={playlist} onGenreClick={handleGenreClick} songs={playlists} />
      <div className="content-wrapper d-flex flex-column">
        <Navbar activeSection={activeSection} onNavClick={handleNavClick} handleLogout={handleLogout} />
        <div className="p-4">
          <h1>{activeSection}</h1>
          {/* Content based on activeSection */}
          {activeSection === 'Track List' && playlists &&  <ul>
          {
            <li>{ playlist }</li>
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
