import React from 'react';
import './Sidebar.css';

const genres = ['Rock', 'Pop', 'Jazz', 'Classical', 'Hip-hop', 'Electronic'];

const Sidebar = ({ selectedPlaylist, onGenreClick, songs }) => {
  return (
    <nav id="sidebar" className="p-3">
      <h4>Playlists</h4>
      <ul className="nav flex-column">
        {songs.map((song, index) => (
          <li key={index} className="nav-item d-flex align-items-center">
            <input
              type="checkbox"
              checked={selectedPlaylist === (song.id)}
               onChange={() => onGenreClick(song)}
              className="mr-2"
            />
            <span
              className="nav-link btn btn-link text-white p-0"
              onClick={() => onGenreClick(song)}
              style={{ cursor: 'pointer' }}
            >
              {song.name}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
