import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Container, Typography, Paper, Button, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

const transformToDecades = (years) => {
  const decades = {};

  years.forEach(({ releaseYear, count }) => {
    const decade = Math.floor(releaseYear / 10) * 10;
    if (!decades[decade]) {
      decades[decade] = 0;
    }
    decades[decade] += count;
  });

  return Object.entries(decades).map(([decade, count]) => ({
    releaseYear: `${decade}s`,
    count,
  }));
};

export default function YearsBox({ years }) {
  const [dataName, setDataName] = useState('YEAR');
  const [data, setData] = useState([]);
  const [isMinimized, setIsMinimized] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    // Update data based on the current dataName
    if (dataName === 'YEAR') {
      setData(years);
    } else {
      setData(transformToDecades(years));
    }
  }, [dataName, years]);

  const handleToggleClick = () => {
    setDataName(prevDataName => (prevDataName === 'YEAR' ? 'DECADE' : 'YEAR'));
  };

  const handleMinimizeClick = () => {
    setIsMinimized(prev => !prev);
  };

  // Check if the data is available before rendering
  if (!data || !Array.isArray(data)) return null;

  return (
    <Container
      component={Paper}
      sx={{
        padding: 2,
        position: 'relative',
        border: '6px solid teal', // Add teal border
        borderRadius: '12px', // Optional: rounded corners for the border
      }}
    >
      {/* New Toggle Button */}
      <Button
        onClick={handleToggleClick}
        sx={{
          position: 'absolute',
          top: '8px',
          left: '8px', // Position it to the top-left
          zIndex: 1,
          borderRadius: '20px', // Rounded corners
          backgroundColor: 'teal', // Teal background color
          color: 'white', // White text color
          padding: '4px 16px', // Adjust padding as needed
          '&:hover': {
            backgroundColor: 'darkcyan', // Darker teal on hover
          },
        }}
      >
        Toggle
      </Button>
      {/* Existing Minimize Button */}
      <IconButton
        onClick={handleMinimizeClick}
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
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '1.5rem',
              marginTop: '40px', // Add margin to avoid overlap with the buttons
            }}
          >
            Song Count by {dataName}
          </Typography>
          <BarChart
            xAxis={[{ scaleType: 'band', data: data.map(item => item.releaseYear) }]}
            series={[{ data: data.map(item => item.count) }]}
            width={isSmallScreen ? 400 : 600}
            height={300}
          />
        </>
      )}
    </Container>
  );
}
