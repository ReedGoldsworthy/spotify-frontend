import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton, Divider } from '@mui/material';
import { ExpandMore, ExpandLess, ArrowLeft, ArrowRight } from '@mui/icons-material';

const ArtistBox = ({ artists = [] }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 6;
  const totalArtists = Object.values(artists).length;
  const topArtists = Object.values(artists).slice(currentIndex, currentIndex + itemsPerPage);

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
        padding: '16px',
        maxWidth: '600px',
        margin: 'auto',
        position: 'relative',
        overflow: 'hidden', // Ensure overflow is hidden for better handling of small screens
      }}
    >
      <IconButton
        onClick={() => setIsMinimized(prev => !prev)}
        sx={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          zIndex: 1,
        }}
      >
        {isMinimized ? <ExpandMore /> : <ExpandLess />}
      </IconButton>
      <Box
        sx={{
          position: 'absolute',
          top: '8px',
          left: '8px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          zIndex: 1,
          gap: '0px', // Reduced margin between arrows
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
      {!isMinimized && (
        <>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: '16px',
              mt: '20px', // Add margin top to ensure title is not overlapped
              paddingLeft: '56px', // Adjust padding to avoid overlap with the buttons
              paddingRight: '56px', // Adjust padding to avoid overlap with the buttons
            }}
          >
            <Box
              sx={{
                padding: '8px',
                borderRadius: '8px',
                display: 'inline-block',
               
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
            </Box>
          </Box>
          <Divider sx={{ borderColor: 'teal', mb: '16px', borderWidth: '5px' }} />
          <List>
            {topArtists.map((artist, index) => (
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
        </>
      )}
    </Box>
  );
};

export default ArtistBox;
