import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton, Divider, TextField } from '@mui/material';
import { ExpandMore, ExpandLess, ArrowLeft, ArrowRight } from '@mui/icons-material';

const ArtistBox = ({ artists = [] }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  
  const itemsPerPage = 10;
  const totalArtists = Object.values(artists).length;
  const topArtists = Object.values(artists).filter(artist =>
    artist.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePrev = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - itemsPerPage, 0));
  };

  useEffect(() => {
    setCurrentIndex(0);
  }, [artists]);

  const handleNext = () => {
    setCurrentIndex(prevIndex => Math.min(prevIndex + itemsPerPage, totalArtists - itemsPerPage));
  };

  return (
    <Box
      sx={{
        border: '6px solid teal',
        borderRadius: '12px',
        maxWidth: '600px',
        margin: 'auto',
        position: 'relative',
        transition: 'max-height 0.3s ease', // Smooth transition for height change
        maxHeight: isMinimized ? '100px' : '630px', // Change height based on minimized state
        overflow: 'hidden', // Hide overflow to maintain the visual effect
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Fixed Header and Divider */}
      <Box
        sx={{
          padding: '16px',
          paddingTop: '30px', // Add padding top to ensure it's not overlapped by the buttons
          paddingBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'white', // Ensure background color is applied
          borderBottom: '5px solid teal', // Border bottom to separate header from content
          zIndex: 1,
          position: 'relative',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            fontSize: '1.5rem',
          }}
        >
          Your Top Artists For This Playlist
        </Typography>
        <TextField
          variant="outlined"
          placeholder="Search artists"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: '200px' }}
        />
        <IconButton
          onClick={() => setIsMinimized(prev => !prev)}
          sx={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            zIndex: 2,
          }}
        >
          {isMinimized ? <ExpandMore /> : <ExpandLess />}
        </IconButton>
      </Box>

 

      {/* Navigation Arrows */}
      {!isMinimized && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0 16px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <IconButton 
            onClick={handlePrev} 
            disabled={currentIndex === 0}
            sx={{ 
              fontSize: '2rem', // Increased font size for larger arrows
            }}
          >
            <ArrowLeft />
          </IconButton>
          <IconButton 
            onClick={handleNext} 
            disabled={currentIndex >= totalArtists - itemsPerPage}
            sx={{ 
              fontSize: '2rem', // Increased font size for larger arrows
            }}
          >
            <ArrowRight />
          </IconButton>
        </Box>
      )}

      {/* Scrollable Content */}
      <Box
        sx={{
          paddingTop: "20px",
          padding: '16px',
          overflowY: 'auto', // Enable vertical scrolling
          flexGrow: 1, // Allow the content to grow and fill the available space
          boxSizing: 'border-box', // Ensure padding and border are included in the height
        }}
      >
        <List>
          {topArtists.slice(currentIndex, currentIndex + itemsPerPage).map((artist, index) => (
            <ListItem 
              key={index} 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                mt: index > 0 ? '8px' : '0', // Margin between items except the first one
              }}
            >
              <ListItemAvatar>
                <Avatar 
                  src={artist.artist_image || '/default-image.png'} // Provide a default image if artist_image is not available
                  alt={artist.artist} 
                  sx={{ width: 64, height: 64 }}
                />
              </ListItemAvatar>
              <ListItemText 
                primary={
                  <Typography
                    variant="body1"
                    sx={{
                      marginLeft: '20px',
                      fontWeight: 'bold',
                      fontSize: '1.4rem', // Slightly increase the font size
                    }}
                  >
                    {artist.artist}
                  </Typography>
                }
              />
              <ListItemText 
                primary={
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '1.4rem', // Match the font size of artist.artist
                      textAlign: 'right',
                    }}
                  >
                    {`Count: ${artist.count}`}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default ArtistBox;
