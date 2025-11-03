const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Android Expert | BLE & IoT Specialist',
        page: 'home'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects', {
        title: 'My Projects | Android Developer',
        page: 'projects'
    });
});

app.get('/experience', (req, res) => {
    res.render('experience', {
        title: 'Experience | Corporate Android Developer',
        page: 'experience'
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Contact Me | Android Developer',
        page: 'contact'
    });
});

app.post('/contact', (req, res) => {
    // Handle contact form submission
    const { name, email, message } = req.body;
    console.log('Contact form submission:', { name, email, message });
    res.json({ success: true, message: 'Thank you for your message!' });
});

app.listen(PORT, () => {
    console.log(`🚀 Portfolio server running on http://localhost:${PORT}`);
});