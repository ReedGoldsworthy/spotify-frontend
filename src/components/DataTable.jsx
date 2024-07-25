import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [

  { field: 'id', headerName: 'id', width: 140 },
  { field: 'name', headerName: 'name', width: 200 },
  { field: 'album', headerName: 'album', width: 200 },
  { field: 'spotifyID', headerName: 'spotifyID', width: 70 },
  
  { field: 'artist', headerName: 'artist', width: 200 },
  { field: 'type', headerName: 'type', width: 70 },
  { field: 'popularity', headerName: 'popularity', width: 70 },
  { field: 'release_date', headerName: 'release Date', width: 80 },

//   {
//     field: 'age',
//     headerName: 'Age',
//     type: 'number',
//     width: 90,
//   },
//   {
//     field: 'name',
//     headerName: 'name',
//     type: 'number',
//     width: 90,
//   },

//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
//   },
];


export default function DataTable({data}) {

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}