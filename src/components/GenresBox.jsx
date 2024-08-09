import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

const GenresBox = ({ genres = [] }) => {
  const [isMinimized, setIsMinimized] = useState(false);

  // Convert object values to an array and get the first five elements
  const topGenres = Object.values(genres).slice(0, 5);

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
      <Box sx={{ position: 'relative' }}>
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
              Your Top Genres For This Playlist
            </Typography>
            <List>
              {topGenres.map((genre, index) => (
                <ListItem 
                  key={index} 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between' 
                  }}
                >
                  <ListItemText primary={genre._id} />
                  <ListItemText 
                    primary={`Count: ${genre.count}`} 
                    sx={{ textAlign: 'right' }} 
                  />
                </ListItem>
              ))}
            </List>
          </>
        )}
      </Box>
    </Box>
  );
};

export default GenresBox;
