import axios from 'axios';

export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
};

export const loadUser = async () => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/auth');
        return res.data;
    } catch (err) {
        console.error(err);
        return null;
    }
};

export const loginUser = async (email, password) => {
    try {
        const res = await axios.post('/api/auth', { email, password });
        if (res.data.token) {
            localStorage.setItem('token', res.data.token);
            setAuthToken(res.data.token);
        }
        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const registerUser = async (name, email, password) => {
    try {
        const res = await axios.post('/api/auth/register', { name, email, password });
        if (res.data.token) {
            localStorage.setItem('token', res.data.token);
            setAuthToken(res.data.token);
        }
        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const logoutUser = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
};
