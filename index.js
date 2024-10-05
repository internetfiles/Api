const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Proxy endpoint for TMDB API
app.get('/api/:type', async (req, res) => {
  const { type } = req.params;
  const apiKey = process.env.TMDB_API_KEY;  // TMDB API key

  try {
    const tmdbApiUrl = `https://api.themoviedb.org/3/${type}?api_key=${apiKey}`;
    const response = await axios.get(tmdbApiUrl);

    res.json(response.data);  // Send TMDB response back to the client
  } catch (error) {
    console.error('Error fetching data from TMDB:', error);
    res.status(500).json({ error: 'Failed to fetch data from TMDB' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
