import React, { useState } from 'react';
import { Box, Typography, Paper, Chip } from '@mui/material';
import { DataGrid, type GridColDef, type GridRenderCellParams } from '@mui/x-data-grid';
import CustomerPopup from '../components/CustomerPopup';
import { useCustomers } from '../components/CustomerContext';

const Customers: React.FC = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const { customers, loading, error } = useCustomers();
    
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'whatsapp', headerName: 'WhatsApp', width: 150 },
    { field: 'total_orders', headerName: 'Pedidos', type: 'number', width: 100 },
    { field: 'total_visits', headerName: 'Visitas', type: 'number', width: 100 },
    {
      field: 'average_ticket',
      headerName: 'Ticket Médio',
      width: 130,
      renderCell: (params: GridRenderCellParams) => `R$ ${params.value.toFixed(2)}`
    },
    {
      field: 'lead_score',
      headerName: 'Score',
      type: 'number',
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <Typography fontWeight="bold" color={params.value > 80 ? 'primary.main' : 'text.primary'}>
          {params.value}
        </Typography>
      )
    },
    {
      field: 'tags',
      headerName: 'Tags',
      width: 250,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: 'flex', gap: 0.5, overflow: 'hidden' }}>
          {params.value.map((tag: string) => (
            <Chip key={tag} label={tag} size="small" variant="outlined" />
          ))}
        </Box>
      )
    },
  ];

  if (loading) {
    return <div>Carregando clientes...</div>; // Renderização de loading rápido
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }
  
  if (customers.length === 0) {
    return <div>Nenhum cliente encontrado.</div>;
  }

  return (
    <Box sx={{ height: 'calc(100vh - 100px)' }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Clientes
      </Typography>

      <Paper sx={{ height: '100%', width: '100%', p: 2 }}>
        <DataGrid
          rows={customers}
          columns={columns}
          getRowId={(row) => row._id}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 20, 50]}
          checkboxSelection
          onRowClick={(params) => setSelectedCustomer(params.row)}
          sx={{
            border: 'none',
            '& .MuiDataGrid-cell:focus': { outline: 'none' },
          }}
        />
      </Paper>

      <CustomerPopup
        open={!!selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
        customer={selectedCustomer}
      />
    </Box>
  );
};

export default Customers;
