import React, { useState } from 'react';
import { loginUser, registerUser } from '../utils/auth';

const Auth = ({ onLogin }) => {
    const [isRegistering, setIsRegistering] = useState(false);
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
            if (isRegistering) {
                const user = await registerUser(name, email, password);
                if (user) {
                    onLogin(user);
                }
            } else {
                const user = await loginUser(email, password);
                if (user) {
                    onLogin(user);
                }
            }
        } catch (err) {
            console.error(err);
            alert("Error: " + (err.response.data.msg || err.message));
        }
    };

    return (
        <div>
            <h2>{isRegistering ? "Registrar" : "Iniciar Sesión"}</h2>
            <form onSubmit={onSubmit}>
                {isRegistering && (
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
                )}
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
                <input type="submit" value={isRegistering ? "Registrar" : "Iniciar Sesión"} />
            </form>
            <button onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering ? "¿Ya tienes una cuenta? Inicia Sesión" : "¿No tienes cuenta? Regístrate"}
            </button>
        </div>
    );
};

export default Auth;
