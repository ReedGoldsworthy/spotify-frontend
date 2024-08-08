import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const ArtistBox = ({ artists = [] }) => {
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
      }}
    >
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
    </Box>
  );
};

export default ArtistBox;
