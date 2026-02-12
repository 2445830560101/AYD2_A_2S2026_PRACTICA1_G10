export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const getHeaders = () => {
    let token = null;
    if (typeof window !== 'undefined') {
        const user = localStorage.getItem('user');
        if (user) {
            const userData = JSON.parse(user);
            token = userData.access_token;
        }
    }
    return {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
    };
};

export const getFormHeaders = () => {
    let token = null;
    if (typeof window !== 'undefined') {
        const user = localStorage.getItem('user');
        if (user) {
            const userData = JSON.parse(user);
            token = userData.access_token;
        }
    }
    return {
        ...(token && { 'Authorization': `Bearer ${token}` }),
    };
};