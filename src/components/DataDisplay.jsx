// DataDisplay.jsx
import React from 'react';
import ArtistBox from './ArtistBox';
import GenresBox from './GenresBox';
import YearsBox from './YearsBox';
import AttributeDisplay from './AttributeDisplay';
import 'bootstrap/dist/css/bootstrap.min.css';

const DataDisplay = ({ info }) => {
  const parentGenres = info.parentGenres ?? [];
  const allGenres = info.allGenres ?? [];

  return (
    <div className="container" style={{ background: 'white', borderRadius: '8px', padding: '20px' }}>
      <div className="row">
        <div className="col-lg-6 mb-4">
          <div style={{ marginBottom: '20px' }}>
            <GenresBox genres={parentGenres.slice(0,30)} allGenres={allGenres.slice(0,30)} />
          </div>
          <div>
            <ArtistBox artists={info.artists} />
          </div>
        </div>
        <div className="col-lg-6 mb-4">
          <AttributeDisplay info={info} />
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
