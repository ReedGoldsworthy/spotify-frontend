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
        <div className="col-md-6 mb-4">
          <ArtistBox artists={info.artists} />
          <p></p>
          <GenresBox style={{}} genres={info.genres} />
        </div>
        <div className="col-md-6 mb-4">
          <div className="row">
        <div className="col-12">
          <AttributeBox 
          attribute={info.acousticness} 
          attributeName={'Acousticness'}
          attributeDescription={' measures the presence of acoustic instruments and sounds in a track.'}
          color={'#E2C6A8'} 
          averageValue={info.averages.averageAcousticness}

          />
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <AttributeBox 
          attribute={info.danceability} 
          attributeName={'Danceability'}
          attributeDescription={' measures how well a playlist is suited for dancing based on the rhythm, tempo and beat of its tracks'}
          color={'#9C27B0'} 
          averageValue={info.averages.averageDanceability}
          />
        </div>
      </div>
      

      <div className="row">
        <div className="col-12">
          <AttributeBox 
          attribute={info.energy} 
          attributeName={'Energy'}
          attributeDescription={' measures the intensity, activity, and liveliness of a playlist. It reflects how energetic and dynamic the music is.'}
          color={'#50C878'} 
          averageValue={info.averages.averageEnergy}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <AttributeBox 
          attribute={info.instrumentalness} 
          attributeName={'Instrumentalness'}
          attributeDescription={' measures how instrumental a playlist is. A higher vlaue indicates a greater absence of vocals'}
          color={'#4682B4'} 
          averageValue={info.averages.averageInstrumentalness}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <AttributeBox 
          attribute={info.valence} 
          attributeName={'Valence'}
          attributeDescription={' measures the musical positiveness or emotional quality of a track. A higher value indicates a more positive emotion'}
          color={'#ffcf40'} 
          averageValue={info.averages.averageValence}
          />
        </div>
      </div>

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
