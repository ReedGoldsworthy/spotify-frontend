import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Container, Typography, Paper } from '@mui/material';

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


export default function YearsBox({years}) {

  const [dataName, setDataName] = useState('YEAR');
  const [data, setData] = useState(years)

  const handleClick = () => {
  
    if (dataName === "YEAR") {
      setDataName('DECADE')
      setData(transformToDecades)
    } else {
      setDataName("YEAR")
      setData(years)
    }
  }
  

  if (!years) {return}
  


// const data = transformToDecades(years);


  return (
    <>
    <Container component={Paper} style={{ padding: 16 }}>
      <button onClick={handleClick}>Click me to cycle between year and decade</button>
      <Typography variant="h6" gutterBottom>
        Song Count by {dataName}
      </Typography>
      <BarChart
        xAxis={[{ scaleType: 'band', data: data.map(item => item.releaseYear) }]}
        series={[{ data: data.map(item => item.count) }]}
        width={500}
        height={300}
      />
    </Container>
    </>
    
  );
}
