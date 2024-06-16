import React, { useState } from 'react';
import { registerUser } from '../utils/auth';

const Register = ({ onRegister }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const { name, email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const user = await registerUser(name, email, password);
            if (user) {
                onRegister(user);
            }
        } catch (err) {
            console.error(err);
            alert("Error: " + (err.response.data.msg || err.message));
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <div>
                <input
                    type="text"
                    placeholder="Nombre"
                    name="name"
                    value={name}
                    onChange={onChange}
                    required
                />
            </div>
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
            <input type="submit" value="Registrar" />
        </form>
    );
};

export default Register;
