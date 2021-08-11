const express = require('express');
const router = express.Router();
const discogs = require('../../config/discogs');

router.get('/master/:id', async (req, res) => {
  try {
    const master = await discogs.getMaster(req.params.id);
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
