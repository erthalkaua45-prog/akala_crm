import { useState } from 'react';
import { Dialog, Box, Typography, Chip, Avatar, Button, Divider, IconButton, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import StarIcon from '@mui/icons-material/Star';
// import axios from 'axios';

interface CustomerPopupProps {
    open: boolean;
    onClose: () => void;
    customer: any;
}

const CustomerPopup: React.FC<CustomerPopupProps> = ({ open, onClose, customer }) => {
    const [loadingInsight, setLoadingInsight] = useState(false);
    const [insight, setInsight] = useState<any>(customer?.insight ? JSON.parse(customer.insight) : null);

    if (!customer) return null;

    const handleGenerateInsight = async () => {
        setLoadingInsight(true);
        try {
            setTimeout(() => {
                setInsight({
                    behavior_summary: "Cliente fiel com preferência por pratos veganos. Costuma pedir nos fins de semana.",
                    strategic_opportunities: ["Oferecer sobremesa vegana", "Cupom para dias de semana"],
                    next_best_action: "Enviar mensagem perguntando sobre o último pedido",
                    retention_score: 85,
                    predicted_next_order: "Sexta-feira"
                });
                setLoadingInsight(false);
            }, 2000);
        } catch (error) {
            console.error(error);
            setLoadingInsight(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: 4, bgcolor: 'background.paper' } }}>
            <Box sx={{ position: 'relative', p: 3 }}>
                <IconButton onClick={onClose} sx={{ position: 'absolute', right: 16, top: 16 }}>
                    <CloseIcon />
                </IconButton>

                {/* Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
                    <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main', fontSize: 32 }}>
                        {customer.name[0]}
                    </Avatar>
                    <Box>
                        <Typography variant="h4" fontWeight="bold">{customer.name}</Typography>
                        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                            {customer.tags.map((tag: string) => (
                                <Chip key={tag} label={tag} size="small" color="primary" variant="outlined" />
                            ))}
                        </Box>
                    </Box>
                    <Box sx={{ ml: 'auto', textAlign: 'right' }}>
                        <Typography variant="caption" color="text.secondary">Leadscore</Typography>
                        <Typography variant="h3" color="primary.main" fontWeight="bold">{customer.lead_score}</Typography>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
                    {/* Column 1: Metrics */}
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" gutterBottom>Métricas</Typography>
                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                            <Box>
                                <Typography variant="caption" color="text.secondary">Total Pedidos</Typography>
                                <Typography variant="h6">{customer.total_orders}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption" color="text.secondary">Total Visitas</Typography>
                                <Typography variant="h6">{customer.total_visits}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption" color="text.secondary">Cliente Desde</Typography>
                                <Typography variant="h6">{new Date(customer.customer_since).toLocaleDateString()}</Typography>
                            </Box>
                            {customer.last_order_date && <Box>
                                <Typography variant="caption" color="text.secondary">Último Pedido</Typography>
                                <Typography variant="h6">{new Date(customer.last_order_date).toLocaleDateString()}</Typography>
                            </Box>}
                            {customer.last_visit_date && <Box>
                                <Typography variant="caption" color="text.secondary">Última Visita</Typography>
                                <Typography variant="h6">{new Date(customer.last_visit_date).toLocaleDateString()}</Typography>
                            </Box>}
                        </Box>

                        <Box sx={{ mt: 3 }}>
                            <Typography variant="caption" color="text.secondary">Avaliação</Typography>
                            {customer.evaluation && <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <StarIcon color="warning" />
                                <Typography variant="h6">{customer.evaluation?.score}/5</Typography>
                            </Box>}
                            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                                "{customer.evaluation?.comment || 'Sem avaliação'}"
                            </Typography>
                        </Box>
                    </Box>

                    {/* Column 2: Personal Data */}
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" gutterBottom>Dados Pessoais</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <WhatsAppIcon color="success" />
                                <Typography>{customer.whatsapp}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <EmailIcon color="action" />
                                <Typography>{customer.email}</Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                Origem: {customer.origin}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Divider sx={{ my: 4 }} />

                {/* AI Insights */}
                <Box sx={{ bgcolor: 'rgba(233, 35, 164, 0.05)', p: 3, borderRadius: 4, border: '1px solid rgba(233, 35, 164, 0.2)' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <AutoAwesomeIcon color="primary" />
                            <Typography variant="h6" color="primary">Nova AI Insights</Typography>
                        </Box>
                        <Button
                            variant="outlined"
                            startIcon={loadingInsight ? <CircularProgress size={20} /> : <AutoAwesomeIcon />}
                            onClick={handleGenerateInsight}
                            disabled={loadingInsight}
                        >
                            {loadingInsight ? 'Analisando...' : 'Reanalisar IA'}
                        </Button>
                    </Box>

                    {insight ? (
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, flexWrap: 'wrap' }}>
                            <Box sx={{ width: '100%' }}>
                                <Typography variant="subtitle2" color="primary">Comportamento</Typography>
                                <Typography variant="body2">{insight.behavior_summary}</Typography>
                            </Box>
                            <Box sx={{ flex: 1, minWidth: '200px' }}>
                                <Typography variant="subtitle2" color="primary">Oportunidades</Typography>
                                <ul style={{ margin: 0, paddingLeft: 20 }}>
                                    {insight.strategic_opportunities?.map((op: string, i: number) => (
                                        <li key={i}><Typography variant="body2">{op}</Typography></li>
                                    ))}
                                </ul>
                            </Box>
                            <Box sx={{ flex: 1, minWidth: '200px' }}>
                                <Typography variant="subtitle2" color="primary">Próxima Ação</Typography>
                                <Typography variant="body2" fontWeight="bold">{insight.next_best_action}</Typography>
                            </Box>
                        </Box>
                    ) : (
                        <Typography variant="body2" color="text.secondary" align="center">
                            Clique em "Reanalisar IA" para gerar insights estratégicos.
                        </Typography>
                    )}
                </Box>
            </Box>
        </Dialog >
    );
};

export default CustomerPopup;
