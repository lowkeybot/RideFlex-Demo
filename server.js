// Rideflex User Auth Server
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const db = new sqlite3.Database('./users.db');

// Get user info by email
app.get('/api/user', (req, res) => {
    const { email } = req.query;
    if (!email) return res.status(400).json({ error: 'Email required.' });
    db.get('SELECT id, firstName, lastName, email, phone, residentialAddress FROM users WHERE email = ?', [email], (err, user) => {
        if (err) return res.status(500).json({ error: 'Database error.' });
        if (!user) return res.status(404).json({ error: 'User not found.' });
        res.json(user);
    });
});

// Allow CORS from frontend (adjust port if needed)
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true
}));
app.use(bodyParser.json());

// Create users table if not exists
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT NOT NULL,
    password TEXT NOT NULL,
    residentialAddress TEXT NOT NULL
)`);

// Signup endpoint
app.post('/api/signup', (req, res) => {
    const { firstName, lastName, email, phone, password, residentialAddress } = req.body;
    if (!firstName || !lastName || !email || !phone || !password || !residentialAddress) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    db.run(
        'INSERT INTO users (firstName, lastName, email, phone, password, residentialAddress) VALUES (?, ?, ?, ?, ?, ?)',
        [firstName, lastName, email, phone, password, residentialAddress],
        function(err) {
            if (err) {
                if (err.code === 'SQLITE_CONSTRAINT') {
                    return res.status(409).json({ error: 'Email already exists.' });
                }
                return res.status(500).json({ error: 'Database error.' });
            }
            res.json({ success: true, userId: this.lastID });
        }
    );
});

// Login endpoint
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required.' });
    }
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
        if (err) return res.status(500).json({ error: 'Database error.' });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }
        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }
        res.json({ success: true, userId: user.id });
    });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Auth server running on port ${PORT}`);
});
