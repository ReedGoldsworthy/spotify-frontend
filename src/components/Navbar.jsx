import React from 'react';
import './Navbar.css';

const Navbar = ({ activeSection, onNavClick, handleLogout, stagedTracksCount }) => {
  return (
    <nav className="navbar navbar-expand navbar-dark">
      <div className="container-fluid">
        <ul className="navbar-nav">
          <li className="nav-item">
            <button
              className={`nav-link btn ${activeSection === 'Track List' ? 'active' : ''}`}
              onClick={() => onNavClick('Track List')}
            >
              Track List
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link btn ${activeSection === 'Data Visualization' ? 'active' : ''}`}
              onClick={() => onNavClick('Data Visualization')}
            >
              Data Visualization
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link btn ${activeSection === 'Create' ? 'active' : ''}`}
              onClick={() => onNavClick('Create')}
            >
              Create
              {stagedTracksCount > 0 && (
                <span className="indicator">{stagedTracksCount}</span>
              )}
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link btn ${activeSection === 'Logout' ? 'active' : ''}`}
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
