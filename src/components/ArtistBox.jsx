import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

const ArtistBox = ({ artists = [] }) => {
  const [isMinimized, setIsMinimized] = useState(false);

  // Convert object values to an array and get the first five elements
  const topArtists = Object.values(artists).slice(0, 5);

  return (
    <Box
      sx={{
        border: '6px solid teal',
        borderRadius: '12px',
        padding: '16px',
        maxWidth: '600px',
        margin: 'auto',
        position: 'relative',
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
      {!isMinimized && (
        <>
          <Typography variant="h6" gutterBottom>
            Your Top Artists For This Playlist
          </Typography>
          <List>
            {topArtists.map((artist, index) => (
              <ListItem 
                key={index} 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between' 
                }}
              >
                <ListItemText primary={artist._id} />
                <ListItemText 
                  primary={`Count: ${artist.count}`} 
                  sx={{ textAlign: 'right' }} 
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
