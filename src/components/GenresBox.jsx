import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { PieChart } from '@mui/x-charts';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

const GenresBox = ({ genres, allGenres }) => {
  const [isAllGenres, setIsAllGenres] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false); // State to control minimization

  // Reset isAllGenres to false when genres or allGenres change
  useEffect(() => {
    setIsAllGenres(false);
  }, [genres, allGenres]);

  // Toggle between genres and allGenres
  const handleToggle = () => {
    setIsAllGenres(prevState => !prevState);
  };

  // Toggle minimization
  const handleMinimize = () => {
    setIsMinimized(prevState => !prevState);
  };

  // Prepare data for the PieChart
  const prepareData = (data) => {
    const total = data.reduce((sum, genre) => sum + genre.count, 0);
    return data.map((genre, index) => ({
      name: genre._id,
      value: genre.count,
      label: genre._id,
      color: `hsl(${(index * 360) / data.length}, 70%, 70%)`,
      percentage: total > 0 ? ((genre.count / total) * 100).toFixed(1) : '0.0'
    }));
  };

  // Select data based on the toggle state
  const currentData = isAllGenres ? allGenres : genres;
  const data = prepareData(currentData);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '600px',
        border: '6px solid teal',
        borderRadius: '12px',
        padding: '16px',
        margin: 'auto',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
        transition: 'height 0.3s ease', // Smooth transition
        height: isMinimized ? '60px' : 'auto', // Minimized height
      }}
    >
      {/* Toggle Button */}
      <Button
        onClick={handleToggle}
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          borderRadius: '20px', // Rounded corners
          backgroundColor: 'teal', // Teal background color
          color: 'white', // White text color
          padding: '4px 16px', // Adjust padding as needed
          '&:hover': {
            backgroundColor: 'darkcyan', // Darker teal on hover
          },
          zIndex: 1, // Ensure it is above other elements
          // Adjust the position based on screen size
          '@media (max-width: 600px)': {
            top: 8,
            left: 8,
            padding: '2px 12px',
            fontSize: '0.75rem',
          },
        }}
      >
        Toggle
      </Button>

      {/* Minimize Button */}
      <IconButton
        onClick={handleMinimize}
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 1,
          // Adjust the position based on screen size
          '@media (max-width: 600px)': {
            top: 8,
            right: 8,
          },
        }}
      >
        {isMinimized ? <ExpandMore /> : <ExpandLess />}
      </IconButton>

      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          fontSize: '1.25rem',
          display: isMinimized ? 'none' : 'block',
          // Add margin to ensure the text is not covered
          marginTop: '36px', // Adjust as needed to ensure visibility
        }}
      >
        Distribution of {isAllGenres ? 'All Genres' : 'Main Genres'}
      </Typography>

      <Box
        sx={{
          display: isMinimized ? 'none' : 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: 250,
          maxWidth: '100%',
          position: 'relative',
          padding: '16px', // Add padding around the chart
          boxSizing: 'border-box', // Ensure padding is included in total width
        }}
      >
        {/* Conditionally render PieChart for genres */}
        {!isAllGenres && (
          <Box
            sx={{
              flex: 1,
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingRight: '20px',
              overflow: 'hidden',
            }}
          >
            <PieChart 
              series={[
                {
                  data: data,
                  arcLabel: (item) => `${item.label} (${item.percentage}%)`,
                  arcLabelMinAngle: 30,
                },
              ]}
              slotProps={{ legend: { hidden: true } }}
              width={isMinimized ? 200 : 350} // Conditional width
              height={isMinimized ? 200 : 350} // Conditional height
            />
          </Box>
        )}

        {/* Conditionally render PieChart for allGenres */}
        {isAllGenres && (
          <Box
            sx={{
              flex: 1,
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingRight: '20px',
              overflow: 'hidden',
            }}
          >
            <PieChart 
              series={[
                {
                  data: data,
                  arcLabel: (item) => `${item.label} (${item.percentage}%)`,
                  arcLabelMinAngle: 30,
                },
              ]}
              slotProps={{ legend: { hidden: true } }}
              width={isMinimized ? 200 : 350} // Conditional width
              height={isMinimized ? 200 : 350} // Conditional height
            />
          </Box>
        )}

        <Box
          sx={{
            flex: 1,
            maxWidth: '100%',
            overflowY: 'auto',
            height: '100%',
            paddingLeft: 2,
            display: isMinimized ? 'none' : 'flex',
            flexDirection: 'column',
          }}
        >
          {data.map((item) => (
            <Box key={item.name} sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  backgroundColor: item.color,
                  marginRight: 1,
                }}
              />
              <Typography sx={{ fontSize: '0.875rem' }}>{item.label}: {item.percentage}%</Typography> {/* Adjusted font size */}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default GenresBox;
