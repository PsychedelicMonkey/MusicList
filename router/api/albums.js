const express = require('express');
const router = express.Router();
const discogs = require('../../config/discogs');
const redis = require('../../config/redis');
const { cache } = require('../../middleware/redis');

router.get('/master/:id', cache, async (req, res) => {
  const { id } = req.params;

  try {
    const master = await discogs.getMaster(id);

    redis.setex(id, 3600, JSON.stringify(master));

    res.json(master);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/search', async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ msg: 'Please enter a search term' });
  }

  try {
    const albums = await discogs.search({ q: query, type: 'master', format: 'album' });
    res.json(albums);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
