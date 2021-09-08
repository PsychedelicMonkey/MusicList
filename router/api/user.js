const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

router.get('/load', auth, (req, res) => {
  const { _id, firstName, lastName } = req.user;
  res.json({ _id, firstName, lastName });
});

module.exports = router;
