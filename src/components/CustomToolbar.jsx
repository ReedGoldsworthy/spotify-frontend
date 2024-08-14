import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport, GridToolbarDensitySelector } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';

// custom toolbar component for data table
const CustomToolbar = ({onStageClick}) => {
  
    return (
      <GridToolbarContainer
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          flexWrap: 'nowrap',
          justifyContent: 'flex-start', // Align items to the start of the container
          overflow: 'hidden', // Prevent scrollbars from appearing
        }}
      >
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        <Button
          variant="outlined"
          onClick={onStageClick}
          sx={{
            color: 'text.primary',
            borderColor: 'divider',
            '&:hover': {
              borderColor: 'primary.main',
              backgroundColor: 'action.hover',
            },
            '&.MuiButton-outlined': {
              borderWidth: 1,
            },
          }}
        >
          Stage
        </Button>
      </GridToolbarContainer>
    );
  };

  export default CustomToolbar