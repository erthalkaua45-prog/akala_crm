import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Paper, Chip } from '@mui/material';
import { DataGrid, type GridColDef, type GridRenderCellParams } from '@mui/x-data-grid';
import CustomerPopup from '../components/CustomerPopup';

interface CustomerEvaluation {
  score: number;
  comment: string;
}


interface Customer {
  _id: string;
  name: string;
  email: string;
  whatsapp: string;
  status: boolean;
  tags: string[];
  total_orders: number;
  average_ticket: number;
  last_order_date: { $date: string };
  evaluation: CustomerEvaluation;
  male: boolean;
  origin: string;
  lead_score: number;
  customer_since: { $date: string };
  created_at: { $date: string };
  insight?: string;
  last_insight_date?: Date;
  
  __v: number;
}

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const CUSTOMERS_API_URL = '/api/customers';
  
  const fetchCustomers = useCallback(async () => {
    setIsLoading(true); // Inicia o loading
    setError(null);
    try {
      // 1. Otimização: Evitar chamadas desnecessárias se os dados já estiverem lá
      // (aqui não se aplica ao primeiro load, mas é bom para refetches)
      
      const response = await fetch(CUSTOMERS_API_URL);
      
      // Checagem de erro HTTP (ex: 404, 500)
      if (!response.ok) {
        throw new Error(`Erro ao buscar dados: ${response.statusText}`);
      }
      
      const data: Customer[] = await response.json();
      
      // 2. Performance: Adicionar uma pequena otimização aqui se necessário, 
      // como ordenar os dados antes de salvar no estado
      // Ex: data.sort((a, b) => b.total_orders - a.total_orders);
      
      setCustomers(data);

    } catch (err) {
      console.error("Falha ao carregar clientes:", err);
      // Tratamento de erro robusto para a interface
      setError('Não foi possível carregar os clientes. Tente novamente mais tarde.'); 
      setCustomers([]); // Limpa dados antigos em caso de falha
    } finally {
      setIsLoading(false); // Finaliza o loading
    }
  }, []); // Sem dependências, executa apenas no mount

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'whatsapp', headerName: 'WhatsApp', width: 150 },
    { field: 'total_orders', headerName: 'Pedidos', type: 'number', width: 100 },
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

  if (isLoading) {
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
