import React, { useMemo } from 'react';
import { Box, Paper, Typography, Chip, CircularProgress, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { useCustomers } from '../components/CustomerContext';

const MetricCard = ({ title, value, subtitle, delay }: any) => (
    <Paper
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: 2 }}
    >
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            {title}
        </Typography>
        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', my: 1 }}>
            {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {subtitle}
        </Typography>
    </Paper>
);

const Dashboard: React.FC = () => {
    const { customers, loading } = useCustomers();

    // Lógica de cálculo de métricas
    const stats = useMemo(() => {
        if (!customers.length) return null;

        const now = new Date();
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const thisMonth = now.getMonth();
        const thisYear = now.getFullYear();

        let totalConsumption = 0;
        let newCustomersCount = 0;
        let totalScore = 0;

        // Função auxiliar para extrair data do formato MongoDB {$date: string} ou string ISO
        const parseMongoDate = (d: any) => d?.$date ? new Date(d.$date) : new Date(d);

        customers.forEach(c => {
            const createdAt = parseMongoDate(c.created_at);
            const consumption = c.consumption || 0;

            // Faturamento Total
            totalConsumption += consumption;

            // Novos Clientes (7 dias)
            if (createdAt >= sevenDaysAgo) newCustomersCount++;

            // Soma de Lead Score para média
            totalScore += (c.lead_score || 0);
        });

        // Top Clientes (Ordenados por Lead Score)
        const topCustomers = [...customers]
            .sort((a, b) => (b.lead_score || 0) - (a.lead_score || 0))
            .slice(0, 6);

        const avgTicket = totalConsumption / customers.length;
        const avgScore = totalScore / customers.length;

        return {
            totalCustomers: customers.length.toLocaleString(),
            newCustomers: `+${newCustomersCount}`,
            faturamento: `R$ ${(totalConsumption / 1000).toFixed(1)}k`,
            avgScore: avgScore.toFixed(1),
            avgTicket: `R$ ${avgTicket.toFixed(2)}`,
            topCustomers
        };
    }, [customers]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
                Overview
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3 }}>
                
                {/* Metrics Column */}
                <Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -1.5 }}>
                        <Box sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' }, px: 1.5, mb: 3 }}>
                            <MetricCard title="Total de Clientes" value={stats?.totalCustomers} subtitle="Na base de dados" delay={0.1} />
                        </Box>
                        <Box sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' }, px: 1.5, mb: 3 }}>
                            <MetricCard title="Novos Clientes" value={stats?.newCustomers} subtitle="Últimos 7 dias" delay={0.2} />
                        </Box>
                        <Box sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' }, px: 1.5, mb: 3 }}>
                            <MetricCard title="Faturamento Total" value={stats?.faturamento} subtitle="Acumulado" delay={0.3} />
                        </Box>

                        <Box sx={{ width: { xs: '100%', sm: '50%', md: '50%' }, px: 1.5, mb: 3 }}>
                            <MetricCard title="Lead Score Médio" value={stats?.avgScore} subtitle="Nível de engajamento" delay={0.4} />
                        </Box>
                        <Box sx={{ width: { xs: '100%', sm: '50%', md: '50%' }, px: 1.5, mb: 3 }}>
                            <MetricCard title="Ticket Médio" value={stats?.avgTicket} subtitle="Geral por cliente" delay={0.5} />
                        </Box>
                    </Box>
                </Box>

                {/* Top Customers Column */}
                <Box>
                    <Paper sx={{ p: 3, height: '100%', borderRadius: 2 }}>
                        <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>Top Clientes (Score)</Typography>
                        {stats?.topCustomers.map((customer, i) => (
                            <Box key={customer._id}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
                                    <Box>
                                        <Typography variant="subtitle2" sx={{ textTransform: 'capitalize' }}>
                                            {customer.name}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            Score: {customer.lead_score} • {customer.total_visits} visitas
                                        </Typography>
                                    </Box>
                                    <Chip 
                                        label={`#${i + 1}`} 
                                        size="small" 
                                        color={i < 3 ? "primary" : "default"} 
                                        variant={i < 3 ? "filled" : "outlined"} 
                                    />
                                </Box>
                                {i < 5 && <Divider sx={{ my: 1.5, opacity: 0.5 }} />}
                            </Box>
                        ))}
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;