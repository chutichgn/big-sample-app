// server.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const secret = 'MY_SUPER_SECRET_KEY'; // keep secret in env variable in production

app.use(cors()); // allow requests from webpack-dev-server
app.use(bodyParser.json());

// Login endpoint
app.post('/login', (req, res) => {

    let validUsers =  ['myself@angular.dev', 'devgal@angular.dev', 'devguy@angular.dev' ];
    const { username, password } = req.body;
    if (validUsers.includes(username) && password === 'password') {
        const token = jwt.sign({ user: username }, secret, { expiresIn: '1h' });
        res.json({ success: true, token });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Token check endpoint
app.get('/check-token', (req, res) => {
    const auth = req.headers['authorization'];
    if (!auth) return res.status(401).json({ loggedIn: false, message: 'No token' });

    const token = auth.split(' ')[1];
    jwt.verify(token, secret, (err, decoded) => {
        if (err) return res.status(401).json({ loggedIn: false, message: 'Invalid or expired token' });
        res.json({ loggedIn: true, user: decoded.user });
    });
});

// Optional logout endpoint (not strictly needed with JWT)
app.post('/logout', (req, res) => {
    // Client should just delete its token, but we return success anyway
    res.json({ success: true });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`JWT server running on http://localhost:${PORT}`));
