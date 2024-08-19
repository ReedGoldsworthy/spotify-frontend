// AttributeDisplay.jsx
import React, { useState } from 'react';
import AttributeBox from './AttributesBox';
import { ExpandMore, ExpandLess } from '@mui/icons-material'; // Import icons

const AttributeDisplay = ({ info }) => {
  // Destructure averages with a default empty object if undefined
  const averages = info.averages || {};
  
  // State to manage the expanded/collapsed state
  const [expanded, setExpanded] = useState(true);

  // Toggle function
  const handleToggle = () => {
    setExpanded(prevExpanded => !prevExpanded);
  };

  return (
    <div style={{ position: 'relative', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      {/* Toggle button */}
      <button
        onClick={handleToggle}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '5px',
          zIndex: 1
        }}
      >
        {expanded ? <ExpandLess fontSize="large" /> : <ExpandMore fontSize="large" />}
      </button>
      
      {/* Conditionally render content based on expanded state */}
      {expanded && (
        <>
          <AttributeBox 
            attribute={info.popularity} 
            attributeName={'Popularity'}
            attributeDescription={' measures the relative popularity of a playlist based on number of streams, trends, and engagement metrics.'}
            color={'#1E90FF'} 
            averageValue={averages.averagePopularity || 0}
          />
          <AttributeBox 
            attribute={info.acousticness} 
            attributeName={'Acousticness'}
            attributeDescription={' measures the presence of acoustic instruments and sounds in a playlist.'}
            color={'#E2C6A8'} 
            averageValue={averages.averageAcousticness || 0}
          />
          <AttributeBox 
            attribute={info.danceability} 
            attributeName={'Danceability'}
            attributeDescription={' measures how well a playlist is suited for dancing based on the rhythm, tempo and beat of its tracks'}
            color={'#9C27B0'} 
            averageValue={averages.averageDanceability || 0}
          />
          <AttributeBox 
            attribute={info.energy} 
            attributeName={'Energy'}
            attributeDescription={' measures the intensity, activity, and liveliness of a playlist. It reflects how energetic and dynamic the music is.'}
            color={'#50C878'} 
            averageValue={averages.averageEnergy || 0}
          />
          <AttributeBox 
            attribute={info.instrumentalness} 
            attributeName={'Instrumentalness'}
            attributeDescription={' measures how instrumental a playlist is. A higher value indicates a greater absence of vocals'}
            color={'#4682B4'} 
            averageValue={averages.averageInstrumentalness || 0}
          />
          <AttributeBox 
            attribute={info.valence} 
            attributeName={'Valence'}
            attributeDescription={' measures the musical positiveness or emotional quality of a track. A higher value indicates a more positive emotion'}
            color={'#ffcf40'} 
            averageValue={averages.averageValence || 0}
          />
        </>
      )}
    </div>
  );
};

export default AttributeDisplay;
