import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import type { Customer } from '../types';

interface CustomerContextData {
    customers: Customer[];
    loading: boolean;
    error: boolean;
    refreshData: () => Promise<void>;
}

const CustomerContext = createContext<CustomerContextData>({} as CustomerContextData);

export const CustomerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [customers, setCustomers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const refreshData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('https://apps-akala-backend.ptiotg.easypanel.host/api/customers', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCustomers(response.data);
        } catch (error) {
            setError(true);
            console.error("Erro ao carregar clientes", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) refreshData();
    }, []);

    // Memoizamos o valor para evitar re-renderizações desnecessárias nos componentes que consomem o context
    const value = useMemo(() => ({
        customers,
        loading,
        error,
        refreshData
    }), [customers, loading]);

    return (
        <CustomerContext.Provider value={value}>
            {children}
        </CustomerContext.Provider>
    );
};

// Hook personalizado para facilitar o uso
export const useCustomers = () => useContext(CustomerContext);
