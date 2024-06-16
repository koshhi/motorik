import React from 'react';

const MyEvents = ({ events }) => {
    if (events.length === 0) {
        return <p>No tienes eventos creados.</p>;
    }

    return (
        <div>
            <h1>Mis Eventos</h1>
            {events.map(event => (
                <div key={event._id}>
                    <h2>{event.title}</h2>
                    <p>{event.description}</p>
                    <p>{event.date}</p>
                    <p>{event.location}</p>
                    <p>{event.price}</p>
                    {event.image && <img src={`/${event.image}`} alt={event.title} style={{width: '200px'}} />}
                </div>
            ))}
        </div>
    );
};

export default MyEvents;
