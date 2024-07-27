import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [

  { field: 'id', headerName: 'id', width: 140 },
  { field: 'name', headerName: 'name', width: 200 },
  { field: 'album', headerName: 'album', width: 200 },
  { field: 'spotifyID', headerName: 'spotifyID', width: 70 },
  { field: 'createdAt', headerName: 'createdAt', width: 70 },
  
  { field: 'artist', headerName: 'artist', width: 200 },
  { field: 'genre', headerName: 'genre', width: 70 },
  { field: 'release_date', headerName: 'release Date', width: 80 },
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