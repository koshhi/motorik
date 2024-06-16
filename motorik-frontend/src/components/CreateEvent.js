import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateEvent = ({ onAddEvent }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        price: ''
    });
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { title, description, date, location, price } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onFileChange = e => setImage(e.target.files[0]);


    const onSubmit = async e => {
        e.preventDefault();
        setError('');

        const eventData = new FormData();
        eventData.append('title', title);
        eventData.append('description', description);
        eventData.append('date', date);
        eventData.append('location', location);
        eventData.append('price', price);
        if (image) {
            eventData.append('image', image);
        }

        try {
            const res = await axios.post('/api/events/create', eventData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            onAddEvent(res.data);
            navigate('/');
        } catch (err) {
            if (err.response && err.response.data && err.response.data.msg) {
                setError(err.response.data.msg);
            } else {
                console.error(err);
                setError('Error al crear el evento');
            }
        }
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="Título"
                        name="title"
                        value={title}
                        onChange={onChange}
                        required
                    />
                </div>
                <div>
                    <textarea
                        placeholder="Descripción"
                        name="description"
                        value={description}
                        onChange={onChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="date"
                        name="date"
                        value={date}
                        onChange={onChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Ubicación"
                        name="location"
                        value={location}
                        onChange={onChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="number"
                        placeholder="Precio"
                        name="price"
                        value={price}
                        onChange={onChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="file"
                        name="image"
                        onChange={onFileChange}
                    />
                </div>
                <input type="submit" value="Crear Evento" />
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default CreateEvent;