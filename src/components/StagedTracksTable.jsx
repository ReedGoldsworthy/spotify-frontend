import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import CustomToolbar from './CustomToolbar';

export default function StagedTracksTable({ data, handleStagedTracks, removeTrack }) {
  const handleRemove = (id) => {
    removeTrack(id); // Calls removeTrack from the parent component
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'artist', headerName: 'Artist', width: 180 },
    { field: 'album', headerName: 'Album', width: 200 },
    
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleRemove(params.row.id)}
          sx={{ backgroundColor: 'teal', '&:hover': { backgroundColor: 'darkcyan' } }}
        >
          Remove
        </Button>
      ),
    },
  ];

  const CustomToolbarWithProps = () => <CustomToolbar onStageClick={() => handleStagedTracks(data)} />;

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
        pageSizeOptions={[10, 20, 50]}
        checkboxSelection
        components={{ Toolbar: CustomToolbarWithProps }}
        sx={{
          '& .MuiButton-root': {
            color: 'black',
          }, // Additional styling if needed
        }}
      />
    </div>
  );
}
