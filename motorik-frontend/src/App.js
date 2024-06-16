import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import CreateEvent from './components/CreateEvent';
import MyEvents from './components/MyEvents';
import Navbar from './components/Navbar';
import { loadUser, logoutUser } from './utils/auth';
import axios from 'axios';

const App = () => {
    const [user, setUser] = useState(null);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUserData = async () => {
            const userData = await loadUser();
            setUser(userData);
            if (userData) {
                const res = await axios.get('/api/events/my-events');
                setEvents(res.data);
            }
            setLoading(false);
        };

        loadUserData();
    }, []);

    const handleLogin = (user) => {
        setUser(user);
    };

    const handleLogout = () => {
        logoutUser();
        setUser(null);
        setEvents([]);
    };

    const handleAddEvent = (newEvent) => {
        setEvents([...events, newEvent]);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <Navbar user={user} onLogout={handleLogout} />
            <Routes>
                <Route
                    path="/"
                    element={user ? <MyEvents events={events} /> : <Navigate to="/login" />}
                />
                <Route
                    path="/login"
                    element={user ? <Navigate to="/" /> : <Auth onLogin={handleLogin} />}
                />
                <Route
                    path="/create-event"
                    element={user ? <CreateEvent onAddEvent={handleAddEvent} /> : <Navigate to="/login" />}
                />
            </Routes>
        </Router>
    );
};

export default App;
