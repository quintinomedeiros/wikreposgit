import axios from 'axios';

// Criação de uma instância do axios
export const api = axios.create({
    baseURL: 'https://api.github.com',
})