import React from 'react';
import { Box, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts';

const GenresBox = ({ genres }) => {
  // Calculate total count
  const total = genres.reduce((sum, genre) => sum + genre.count, 0);

  // Prepare data for the PieChart
  const data = genres.map((genre) => ({
    name: genre._id,
    value: genre.count,
    label: genre._id, // Label text will be replaced by arcLabel function
  }));

  // Custom function to format arc labels
  const arcLabel = (slice) => {
    const percentage = ((slice.value / total) * 100).toFixed(1);
    return `(${percentage}%)`;
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '600px',
        height: 'auto',
        border: '6px solid teal',
        borderRadius: '12px',
        padding: '16px',
        margin: 'auto',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden', // Hide any overflowing content
      }}
    >
      <Typography variant="h6" gutterBottom>
        Genres Distribution
      </Typography>

      <Box
        sx={{
          width: '100%', // Ensure the chart takes full width of the container
          height: 250,
          maxWidth: '100%',
          position: 'relative',
        }}
      >
        <PieChart
          series={[
            {
              data: data,
              arcLabel: arcLabel, // Use the custom arcLabel function
            },
          ]}
          width={400} // Set a fixed width
          height={250} // Set a fixed height
        />
      </Box>
    </Box>
  );
};

export default GenresBox;
