// server.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const secret = 'MY_SUPER_SECRET_KEY'; // keep secret in env variable in production

app.use(cors()); // allow requests from webpack-dev-server
app.use(bodyParser.json());

// Login endpoint
app.post('/login', (req, res) => {

    const {username, password} = req.body;
    const file = path.join(__dirname, 'users.json');
    const users = JSON.parse(fs.readFileSync(file, 'utf8'));

    const user = users.find(u => String(u.name) === username);
    if (!user) {
        res.status(401).json({success: false, message: 'Invalid credentials'});
    }
    else if( password === user.password) {
        const token = jwt.sign({user: username}, secret, {expiresIn: '1h'});
        res.json({success: true, token});
    }
});

// Token check endpoint
app.get('/check-token', (req, res) => {
    const auth = req.headers['authorization'];
    if (!auth) return res.status(401).json({loggedIn: false, message: 'No token'});

    const token = auth.split(' ')[1];
    jwt.verify(token, secret, (err, decoded) => {
        if (err) return res.status(401).json({loggedIn: false, message: 'Invalid or expired token'});
        res.json({loggedIn: true, user: decoded.user});
    });
});

// Optional logout endpoint (not strictly needed with JWT)
app.post('/logout', (req, res) => {
    // Client should just delete its token, but we return success anyway
    res.json({success: true});
});

// --- Dummy users API ---
app.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const file = path.join(__dirname, 'users.json');
    const users = JSON.parse(fs.readFileSync(file, 'utf8'));

    const user = users.find(u => String(u.id) === userId);
    if (!user) {
        return res.status(404).json({message: 'User not found'});
    }

    res.json(user);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`JWT server running on http://localhost:${PORT}`));
