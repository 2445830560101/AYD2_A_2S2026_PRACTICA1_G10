import { API_URL, getHeaders, getFormHeaders } from './apiConfig'
import { Agent, createAdmin, createAgent } from '@/types/User'

// Mock Data
let mockup_data = <Agent[]>[
    createAdmin({
        id: 1,
        nombre_completo: 'Juan Pérez',
        correo: 'juan@gmail.com',
        password: 'hashed_password'
    }),
    createAdmin({
        id: 2,
        nombre_completo: 'María Gómez',
        correo: 'mar@gmail.com',
        password: 'hashed_password'
    })
];