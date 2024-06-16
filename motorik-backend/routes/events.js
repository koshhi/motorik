const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Event = require('../models/Event');
const multer = require('multer');
const path = require('path');

// Configurar multer para almacenamiento de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Crear evento
router.post('/create', auth, upload.single('image'), async (req, res) => {
    const { title, description, date, location, price } = req.body;
    const image = req.file ? req.file.path : '';

    try {
        let event = await Event.findOne({ title });
        if (event) {
            return res.status(400).json({ msg: 'Un evento con este título ya existe' });
        }

        const newEvent = new Event({
            title,
            description,
            date,
            location,
            price,
            image,
            owner: req.user.id
        });

        event = await newEvent.save();
        res.json(event);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Obtener los eventos del usuario
router.get('/my-events', auth, async (req, res) => {
    try {
        const events = await Event.find({ owner: req.user.id });
        res.json(events);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
