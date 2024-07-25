const Dashboard = ({ genres, handleNavClick, handleLogout }) => {
  
  return (
    <div className="d-flex">
    <Sidebar selectedGenres={selectedGenres} onGenreClick={handleGenreClick} />
    <div className="content-wrapper d-flex flex-column">
      <Navbar activeSection={activeSection} onNavClick={handleNavClick} handleLogout={handleLogout} />
      <div className="p-4">
        <h1>{activeSection}</h1>
        {/* Content based on activeSection */}
        {activeSection === 'Track List' && <ul>
        {selectedGenres.map((genre, index) => (
          <li key={index}>{genre}</li>
        ))}
      </ul>}
        {activeSection === 'Data Visualization' && <div>Data Visualization Content</div>}
        {activeSection === 'Create' && <div>Create Content</div>}
        {activeSection === 'Logout' && <div>Logout</div>}
      </div>
    </div>
  </div>
  )
  }
  
  export default Dashboard