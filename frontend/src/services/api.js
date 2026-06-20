const API_URL = 'http://localhost:5000';

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
};

export const loginAPI = async (credentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });
    if (!response.ok) throw new Error('Login failed');
    const data = await response.json();
    if (data.token) localStorage.setItem('token', data.token);
    return data;
};

export const registerAPI = async (credentials) => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });
    if (!response.ok) throw new Error('Registration failed');
    const data = await response.json();
    if (data.token) localStorage.setItem('token', data.token);
    return data;
};

export const fetchTasks = async (search = '', sort = 'newest', page = 1) => {
    const response = await fetch(`${API_URL}/tasks?search=${search}&sort=${sort}&page=${page}&limit=6`, {
        headers: getHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch tasks');
    return response.json();
};

export const createTask = async (taskData) => {
    const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(taskData),
    });
    return response.json();
};

export const updateTaskStatus = async (id, status) => {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ status }),
    });
    return response.json();
};

export const deleteTask = async (id) => {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
    });
    return response.json();
};