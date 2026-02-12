import { API_URL } from '@/services/apiConfig';

export const getImageUrl = (path: string | null | undefined) => {
   
    if (!path) return '/placeholder.jpg';

    if (path.startsWith('blob:')) return path;
    if (path.startsWith('http')) return path;

    const cleanPath = path.replace(/\\/g, '/');
    const normalizedPath = cleanPath.startsWith('/') ? cleanPath.substring(1) : cleanPath;

    return `${API_URL}/${normalizedPath}`;
};