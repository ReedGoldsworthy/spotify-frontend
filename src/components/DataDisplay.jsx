import React from 'react';
import ArtistBox from './ArtistBox';
import GenresBox from './GenresBox';
import YearsBox from './YearsBox';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const DataDisplay = ({ info }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mb-4">
          <ArtistBox artists={info.artists} />
        </div>
        <div className="col-md-6 mb-4">
          <GenresBox genres={info.genres} />
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
