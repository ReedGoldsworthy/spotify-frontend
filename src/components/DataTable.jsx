import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [


  { field: 'name', headerName: 'name', width: 180 },
  { field: 'artist', headerName: 'artist', width: 180 },
  { field: 'album', headerName: 'album', width: 200 },
  { field: 'release_date', headerName: 'release Date', width: 100 },

  { field: 'acousticness', headerName: 'acousticness', width: 80 },
  { field: 'danceability', headerName: 'danceability', width: 80 },
  { field: 'duration', headerName: 'duration', width: 80 },
  { field: 'energy', headerName: 'energy', width: 80 },
  { field: 'instrumentalness', headerName: 'instrumentalness', width: 80 },
  { field: 'valence', headerName: 'valence', width: 80 },
  
  // { field: 'genres', headerName: 'genre', width: 200 },
];



export default function DataTable({data}) {

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20]}
        checkboxSelection
      />
    </div>
  );
}