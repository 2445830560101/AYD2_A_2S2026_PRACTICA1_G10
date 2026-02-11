export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const getHeaders = () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    return {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
    };
};

export const getFormHeaders = () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    return {
        ...(token && { 'Authorization': `Bearer ${token}` }),
    };
};