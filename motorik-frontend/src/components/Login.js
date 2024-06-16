import React, { useState } from 'react';
import { loginUser } from '../utils/auth';

const Login = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const user = await loginUser(email, password);
            if (user) {
                onLogin(user);
            } else {
                alert("Login failed");
            }
        } catch (err) {
            alert("Error: " + err.response.data.msg || err.message);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <div>
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    required
                />
            </div>
            <div>
                <input
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    value={password}
                    onChange={onChange}
                    required
                />
            </div>
            <input type="submit" value="Iniciar Sesión" />
        </form>
    );
};

export default Login;
