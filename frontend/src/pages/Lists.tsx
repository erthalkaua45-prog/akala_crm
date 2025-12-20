import React, { useMemo } from 'react';
import { Box, Typography, Paper, Chip, Button, IconButton, Divider } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import GroupIcon from '@mui/icons-material/Group';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WarningIcon from '@mui/icons-material/Warning';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import { useCustomers } from '../components/CustomerContext';
import type { Customer } from '../types';

interface ListsProps {
    customers: Customer[];
}

const Lists: React.FC<ListsProps> = () => {
    const { customers } = useCustomers();
    const segments = useMemo(() => {
        const now = new Date();
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

        // Inicializadores de contagem
        let topSpenders = 0;
        let novosClientes = 0;
        let emRisco = 0;
        let novosFans = 0;
        let fans10Plus = 0;
        let superFans = 0;

        customers.forEach(c => {
            const totalInteractions = (c.total_visits || 0) + (c.total_orders || 0);
            const sinceDate = new Date(c.customer_since.$date);
            const lastDate = c.last_visit_date.$date ? new Date(c.last_visit_date.$date) : null;

            // 1. Top Spenders (> R$ 100)
            if (c.average_ticket > 100) topSpenders++;

            // 2. Novos Clientes (Cadastrados nos últimos 7 dias)
            if (sinceDate >= sevenDaysAgo) novosClientes++;

            // 3. Em Risco (Sem atividade há > 30 dias)
            if (lastDate && lastDate < thirtyDaysAgo) emRisco++;

            // 4. Novos Fans (Até 5 interações)
            if (totalInteractions > 0 && totalInteractions <= 5) novosFans++;

            // 5. Fans 10+ (Entre 6 e 10 interações - Ajustado para não sobrepor)
            if (totalInteractions > 5 && totalInteractions <= 10) fans10Plus++;

            // 6. Super Fans (> 10 interações)
            if (totalInteractions > 10) superFans++;
        });

        return [
            { id: '1', name: 'Top Spenders', desc: 'Ticket médio > R$ 100', count: topSpenders, tags: ['lucrativo'], icon: <TrendingUpIcon />, color: '#4caf50' },
            { id: '2', name: 'Novos Clientes', desc: 'Últimos 7 dias', count: novosClientes, tags: ['recente'], icon: <GroupIcon />, color: '#03a9f4' },
            { id: '3', name: 'Em Risco', desc: 'Inativos há +30 dias', count: emRisco, tags: ['churn'], icon: <WarningIcon />, color: '#ff9800' },
            { id: '4', name: 'Novos Fans', desc: 'Até 5 visitas/pedidos', count: novosFans, tags: ['promessa'], icon: <FavoriteIcon />, color: '#e91e63' },
            { id: '5', name: 'Fans 10+', desc: 'Entre 6 e 10 visitas/pedidos', count: fans10Plus, tags: ['fiel'], icon: <StarIcon />, color: '#9c27b0' },
            { id: '6', name: 'Super Fans', desc: 'Mais de 10 visitas/pedidos', count: superFans, tags: ['vip'], icon: <StarIcon />, color: '#f44336' },
        ];
    }, [customers]);

    return (
        <Box sx={{ p: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Listas de Segmentação</Typography>
                <Button variant="contained" startIcon={<AddIcon />}>Nova Lista</Button>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(3, 1fr)' }, gap: 3 }}>
                {segments.map((list) => (
                    <Paper key={list.id} sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider', '&:hover': { boxShadow: 4 } }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Box sx={{ p: 1, borderRadius: 2, bgcolor: `${list.color}15`, color: list.color, display: 'flex' }}>
                                {list.icon}
                            </Box>
                            <IconButton size="small"><MoreVertIcon /></IconButton>
                        </Box>
                        
                        <Typography variant="h6" fontWeight="bold">{list.name}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>{list.desc}</Typography>
                        
                        <Divider sx={{ mb: 2 }} />
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', gap: 0.5 }}>
                                {list.tags.map(t => <Chip key={t} label={t} size="small" sx={{ fontSize: '0.65rem' }} />)}
                            </Box>
                            <Typography variant="h6" color="primary.main" sx={{ fontWeight: 'bold' }}>
                                {list.count.toLocaleString()}
                            </Typography>
                        </Box>
                    </Paper>
                ))}
            </Box>
        </Box>
    );
};

export default Lists;