// api/[type].js

const axios = require('axios');

module.exports = async (req, res) => {
  const { type } = req.query; // 'movie' or 'tv'
  const { endpoint } = req.query; // e.g., 'popular', 'top_rated'

  const apiKey = process.env.TMDB_API_KEY;

  if (!type || !endpoint) {
    return res.status(400).json({ error: 'Missing type or endpoint parameter' });
  }

  try {
    const tmdbApiUrl = `https://api.themoviedb.org/3/${type}/${endpoint}?api_key=${apiKey}`;
    const response = await axios.get(tmdbApiUrl);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching data from TMDB:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from TMDB' });
  }
};
