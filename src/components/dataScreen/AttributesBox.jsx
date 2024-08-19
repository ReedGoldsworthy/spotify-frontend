import React, { useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Container, Typography, Paper, IconButton, LinearProgress } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

export default function AttributeBox({ attribute, attributeName, attributeDescription, color, averageValue }) {
  const [isMinimized, setIsMinimized] = useState(true);

  // Check if the attribute data is provided
  if (!attribute) return null;

  // Calculate progress percentage based on averageValue
  const progressPercentage = averageValue ? averageValue * 10 : 0;

  // Determine the chart width and height based on screen size
  const isSmallScreen = window.innerWidth <= 768; // You can adjust the breakpoint as needed
  const chartWidth = isSmallScreen ? 400 : 550;
  const chartHeight = isSmallScreen ? 200 : 300;

  return (
    <Container component={Paper} style={{ padding: 16, position: 'relative', marginTop: '20px' }}>
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
      {averageValue !== undefined && (
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h4" gutterBottom style={{ marginRight: '8px' }}>
              {attributeName}
            </Typography>
            <Typography variant="body2" color="textSecondary" style={{ marginLeft: '5px' }}>
              {attributeDescription}
            </Typography>
          </div>
          <Typography variant="body1" gutterBottom>
            Average Value: {averageValue.toFixed(2) * 10}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progressPercentage}
            sx={{ 
              height: 10,
              borderRadius: 5,
              backgroundColor: color + '20', // Lighten the background slightly
              '& .MuiLinearProgress-bar': {
                backgroundColor: color,
              }
            }}
          />
        </div>
      )}
      {!isMinimized && (
        <BarChart
          xAxis={[{ scaleType: 'band', data: attribute.map(item => item._id), label: attributeName }]}
          yAxis={[{ scaleType: 'linear', label: 'Number of Tracks' }]}
          series={[{ 
              data: attribute.map(item => item.count),
              color: color
           }]}
          width={chartWidth}
          height={chartHeight}
        />
      )}
    </Container>
  );
}
