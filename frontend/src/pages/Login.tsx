import React, { useState } from 'react';
import { Box, Button, TextField, Paper, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Importação dos assets
import bgLogin from '../assets/bg_login.png';
import akalaLogo from '../assets/akala-logo-transparent.png';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Hardcoded auth para o protótipo
        if (email === 'sara@akala' && password === 'akala_admin') {
            localStorage.setItem('token', 'mock-token');
            navigate('/dashboard');
        } else {
            alert('Credenciais inválidas');
        }
    };

    return (
        // Wrapper para o Background Image
        <Box
            sx={{
                height: '100vh',
                width: '100vw',
                backgroundImage: `url(${bgLogin})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Container component="main" maxWidth="xs" sx={{ marginLeft: 'inherit' }}>
                <Paper
                    component={motion.div}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    elevation={10} // Aumentado para destacar do fundo
                    sx={{
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                        bgcolor: 'background.paper', // Leve transparência para elegância
                        backdropFilter: 'blur(5px)', // Efeito blur moderno
                        borderRadius: 3
                    }}
                >
                    {/* Substituição do Título pela Logo */}
                    <Box
                        component="img"
                        src={akalaLogo}
                        alt="Akala Logo"
                        sx={{
                            width: '100%',
                            maxWidth: 200, // Ajuste conforme necessário para o visual
                            mb: 4,
                        }}
                    />

                    <Box component="form" onSubmit={handleLogin} sx={{ mt: 1, width: '100%' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Endereço de E-mail"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{
                                    mb: 2, // ou mb: 3 no de baixo
                                    bgcolor: '#141519',
                                    borderRadius: 1,
                                    // Garante que o texto seja branco
                                    '& .MuiInputBase-input': { color: '#ffffff' },
                                    // Sobrescreve o Azul do Autocomplete do Navegador
                                    '& input:-webkit-autofill': {
                                        WebkitBoxShadow: '0 0 0 100px #141519 inset !important',
                                        WebkitTextFillColor: '#ffffff !important',
                                        caretColor: '#ffffff !important',
                                    },
                                    '& input:-webkit-autofill:hover': {
                                        WebkitBoxShadow: '0 0 0 100px #141519 inset !important',
                                    },
                                    '& input:-webkit-autofill:focus': {
                                        WebkitBoxShadow: '0 0 0 100px #141519 inset !important',
                                    },
                                    '& input:-webkit-autofill:active': {
                                        WebkitBoxShadow: '0 0 0 100px #141519 inset !important',
                                    },
                                    // Estilos de borda e Label
                                    // '& .MuiInputLabel-root': { color: '#888888' },
                                    // '& .MuiInputLabel-root.Mui-focused': { color: '#ffffff' },
                                    '& .MuiOutlinedInput-root': {
                                        // '& fieldset': { borderColor: '#333333' },
                                        '&:hover fieldset': { borderColor: '#E923A4' },
                                        // '&.Mui-focused fieldset': { borderColor: '#ffffff' },
                                    },
                                }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Senha"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{
                                    mb: 2, // ou mb: 3 no de baixo
                                    bgcolor: '#141519',
                                    borderRadius: 1,
                                    // Garante que o texto seja branco
                                    '& .MuiInputBase-input': { color: '#ffffff' },
                                    // Sobrescreve o Azul do Autocomplete do Navegador
                                    '& input:-webkit-autofill': {
                                        WebkitBoxShadow: '0 0 0 100px #141519 inset !important',
                                        WebkitTextFillColor: '#ffffff !important',
                                        caretColor: '#ffffff !important',
                                    },
                                    '& input:-webkit-autofill:hover': {
                                        WebkitBoxShadow: '0 0 0 100px #141519 inset !important',
                                    },
                                    '& input:-webkit-autofill:focus': {
                                        WebkitBoxShadow: '0 0 0 100px #141519 inset !important',
                                    },
                                    '& input:-webkit-autofill:active': {
                                        WebkitBoxShadow: '0 0 0 100px #141519 inset !important',
                                    },
                                    // Estilos de borda e Label
                                    // '& .MuiInputLabel-root': { color: '#888888' },
                                    // '& .MuiInputLabel-root.Mui-focused': { color: '#ffffff' },
                                    '& .MuiOutlinedInput-root': {
                                        // '& fieldset': { borderColor: '#333333' },
                                        '&:hover fieldset': { borderColor: '#E923A4' },
                                        // '&.Mui-focused fieldset': { borderColor: '#ffffff' },
                                    },
                                }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            sx={{ 
                                py: 1.5, 
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                borderRadius: 2
                            }}
                        >
                            Entrar
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default Login;
