const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const app = express();
const port = 3000;

// Middleware to serve static files
app.use(express.static('public'));
// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Home.html');
});
app.get('/api/places', async (req, res) => {
    const query = req.query.query;
    const apiKey = 'AIzaSyC29LTN638DrMA9RtoidVt8MRGIJGPBTYY'; // Replace with your actual API key
    const placeURL = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}`;

    try {
        const response = await fetch(placeURL);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching places');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
