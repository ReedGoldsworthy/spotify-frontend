import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport, GridToolbarDensitySelector } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import CustomToolbar from './CustomToolbar'

const columns = [
  { field: 'name', headerName: 'Name', width: 180 },
  { field: 'artist', headerName: 'Artist', width: 180 },
  { field: 'album', headerName: 'Album', width: 200 },
  { field: 'release_date', headerName: 'Release Date', width: 100 },
  { field: 'acousticness', headerName: 'Acousticness', type: 'number', width: 100 },
  { field: 'danceability', headerName: 'Danceability', type: 'number', width: 80 },
  { field: 'duration', headerName: 'Duration', type: 'number', width: 80 },
  { field: 'energy', headerName: 'Energy', type: 'number', width: 80 },
  { field: 'instrumentalness', headerName: 'Instrumentalness', type: 'number', width: 80 },
  { field: 'valence', headerName: 'Valence', type: 'number', width: 80 },
  { field: 'popularity', headerName: 'Popularity', type: 'number', width: 80 },
  { field: 'genres', headerName: 'genres', type: 'string',hide: true,  width: 80 },
  
];

export default function DataTable({ data, handleStagedTracks }) {

  const [stagedTracks, setStagedTracks] = useState([])

  const onRowsSelectionHandler = (ids) => {
    const selectedRowsData = ids.map((id) => data.find((row) => row.id === id));
    setStagedTracks(selectedRowsData)
  };

  const handleStageClick = () => {
    handleStagedTracks(stagedTracks);
  };

   // Wrap CustomToolbar with props
   const CustomToolbarWithProps = () => <CustomToolbar onStageClick={handleStageClick} />;

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        onRowSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
        components={{ Toolbar: CustomToolbarWithProps }} // Pass component here
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
          columns: {
            columnVisibilityModel: {
              genres: false, // Initially hide the genres column
            },
          },
        }}
        slots={{ toolbar: CustomToolbarWithProps }} // Use the custom toolbar here
        pageSizeOptions={[10, 20, 50]}
        checkboxSelection
        sx={{
          '& .MuiButton-root': {
            color: 'black',
          }, // Style for all buttons inside DataGrid
        }}
        
      />
    </div>
  );
}
