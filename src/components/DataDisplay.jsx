import React from 'react';
import ArtistBox from './ArtistBox';
import GenresBox from './GenresBox';
import YearsBox from './YearsBox';
import AttributeBox from './AttributesBox';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const DataDisplay = ({ info }) => {
  return (
    <div className="container">
      <div className="row">
        {/* Stacks vertically on smaller screens */}
        <div className="col-lg-6 mb-4">
        <div style={{ marginBottom: '20px' }}>
          <GenresBox genres={info.parentGenres} />
           
          </div>
          <div>
          <ArtistBox artists={info.artists} />
          </div>
        </div>
        
        <div className="col-lg-6 mb-4">
          <AttributeBox 
            attribute={info.popularity} 
            attributeName={'Popularity'}
            attributeDescription={' measures the relative popularity of a playlist based on number of streams, trends, and engagement metrics.'}
            color={'#1E90FF'} 
            averageValue={info.averages.averagePopularity}
          />
          <AttributeBox 
            attribute={info.acousticness} 
            attributeName={'Acousticness'}
            attributeDescription={' measures the presence of acoustic instruments and sounds in a playlist.'}
            color={'#E2C6A8'} 
            averageValue={info.averages.averageAcousticness}
          />
          <AttributeBox 
            attribute={info.danceability} 
            attributeName={'Danceability'}
            attributeDescription={' measures how well a playlist is suited for dancing based on the rhythm, tempo and beat of its tracks'}
            color={'#9C27B0'} 
            averageValue={info.averages.averageDanceability}
          />
          <AttributeBox 
            attribute={info.energy} 
            attributeName={'Energy'}
            attributeDescription={' measures the intensity, activity, and liveliness of a playlist. It reflects how energetic and dynamic the music is.'}
            color={'#50C878'} 
            averageValue={info.averages.averageEnergy}
          />
          <AttributeBox 
            attribute={info.instrumentalness} 
            attributeName={'Instrumentalness'}
            attributeDescription={' measures how instrumental a playlist is. A higher value indicates a greater absence of vocals'}
            color={'#4682B4'} 
            averageValue={info.averages.averageInstrumentalness}
          />
          <AttributeBox 
            attribute={info.valence} 
            attributeName={'Valence'}
            attributeDescription={' measures the musical positiveness or emotional quality of a track. A higher value indicates a more positive emotion'}
            color={'#ffcf40'} 
            averageValue={info.averages.averageValence}
          />
        </div>
      </div>
      
      <div className="row">
        <div className="col-12">
          <YearsBox years={info.years} />
        </div>
      </div>
    </div>
  );
};

export default DataDisplay;
