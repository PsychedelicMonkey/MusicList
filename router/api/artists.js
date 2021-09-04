const express = require('express');
const router = express.Router();
const discogs = require('../../config/discogs');
const redis = require('../../config/redis');
const { cache } = require('../../middleware/redis');

router.get('/:id', cache, async (req, res) => {
  const { id } = req.params;

  try {
    const artist = await discogs.getArtist(id);

    redis.setex(id, 3600, JSON.stringify(artist));

    res.json(artist);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/:id/releases', async (req, res) => {
  try {
    const releases = await discogs.getArtistReleases(req.params.id, { sort: 'year', sort_order: 'desc' });
    res.json(releases);
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
    const artists = await discogs.search({ q: query, type: 'artist' });
    res.json(artists);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
