// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
app.use(bodyParser.json());
app.use(session({ secret: 'yourSecret', resave: false, saveUninitialized: true }));

mongoose.connect('mongodb://localhost:27017/progressionApp', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    progress: { type: Number, default: 0 }
});

const User = mongoose.model('User', userSchema);

// Route pour inscription
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    req.session.userId = user._id;
    res.send('Inscription réussie');
});

// Route pour connexion
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) return res.send('Utilisateur ou mot de passe incorrect');
    req.session.userId = user._id;
    res.send('Connexion réussie');
});

// Route pour récupérer la progression
app.get('/progress', async (req, res) => {
    if (!req.session.userId) return res.send('Non connecté');
    const user = await User.findById(req.session.userId);
    res.json({ progress: user.progress });
});

// Route pour mettre à jour la progression
app.post('/progress', async (req, res) => {
    if (!req.session.userId) return res.send('Non connecté');
    const { progress } = req.body;
    await User.findByIdAndUpdate(req.session.userId, { progress });
    res.send('Progression mise à jour');
});

app.listen(3000, () => console.log('Server started on http://localhost:3000'));
