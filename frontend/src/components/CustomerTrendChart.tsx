import * as React from "react";
import { Box, Card, CardContent, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

export function CustomerTrendChart({ data }: { data: any[] }) {
    const [timeRange, setTimeRange] = React.useState("90d");

    // 1. Filtramos e garantimos a ORDENAÇÃO das datas (essencial para Recharts)
    const filteredData = React.useMemo(() => {
        const referenceDate = new Date();
        let daysToSubtract = 90;
        
        if (timeRange === "365d") daysToSubtract = 365;
        else if (timeRange === "180d") daysToSubtract = 180;
        else if (timeRange === "30d") daysToSubtract = 30;
        else if (timeRange === "7d") daysToSubtract = 7;

        const startDate = new Date();
        startDate.setDate(referenceDate.getDate() - daysToSubtract);
        
        return [...data]
            .filter((item) => new Date(item.date) >= startDate)
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }, [data, timeRange]);
    console.log(filteredData)

    return (
  <Card sx={{ mt: 3, borderRadius: 2 }}>
    <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="h6" fontWeight="bold">Histórico de Aquisição</Typography>
      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel>Período</InputLabel>
        <Select value={timeRange} label="Período" onChange={(e) => setTimeRange(e.target.value)}>
          <MenuItem value="7d">7 dias</MenuItem>
          <MenuItem value="30d">30 dias</MenuItem>
          <MenuItem value="90d">3 meses</MenuItem>
          <MenuItem value="365d">1 ano</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <CardContent>
      {/* Definir uma altura fixa no Box pai é o que resolve o erro de height(-1) */}
      <Box sx={{ width: '100%', height: 400 }}> 
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="colorC" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1976d2" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#1976d2" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
            <XAxis 
              dataKey="date" 
              tickFormatter={(v) => new Date(v).toLocaleDateString('pt-BR', { month: 'short' })} 
            />
            <YAxis yAxisId="left" stroke="#1976d2" />
            <YAxis yAxisId="right" orientation="right" stroke="#2e7d32" />
            <Tooltip />
            <Legend />
            <Area 
              yAxisId="left"
              type="monotone" 
              dataKey="clientes" 
              name="Novos Clientes" 
              stroke="#1976d2" 
              fill="url(#colorC)" 
            />
            <Area 
              yAxisId="right"
              type="monotone" 
              dataKey="ticketMedio" 
              name="Ticket Médio (R$)" 
              stroke="#2e7d32" 
              fill="transparent" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </CardContent>
  </Card>
);
}