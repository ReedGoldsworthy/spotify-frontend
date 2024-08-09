import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Container, Typography, Paper, Button, IconButton } from '@mui/material';
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

  useEffect(() => {
    // Update data based on the current dataName
    if (dataName === 'YEAR') {
      setData(years);
    } else {
      setData(transformToDecades(years));
    }
  }, [dataName, years]);

  const handleClick = () => {
    setDataName(prevDataName => (prevDataName === 'YEAR' ? 'DECADE' : 'YEAR'));
  };

  const handleMinimizeClick = () => {
    setIsMinimized(prev => !prev);
  };

  // Check if the data is available before rendering
  if (!data || !Array.isArray(data)) return null;

  return (
    <Container component={Paper} style={{ padding: 16, position: 'relative' }}>
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
          <Button onClick={handleClick} variant="contained" color="primary">
            Click me to cycle between year and decade
          </Button>
          <Typography variant="h6" gutterBottom>
            Song Count by {dataName}
          </Typography>
          <BarChart
            xAxis={[{ scaleType: 'band', data: data.map(item => item.releaseYear) }]}
            series={[{ data: data.map(item => item.count) }]}
            width={500}
            height={300}
          />
        </>
      )}
    </Container>
  );
}
