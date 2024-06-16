import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ user, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/');
    };

    return (
        <nav>
            <h1>Motorik</h1>
            <div>
                {user ? (
                    <>
                        <Link to="/create-event">Crear Evento</Link>
                        <span>{user.email}</span>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
