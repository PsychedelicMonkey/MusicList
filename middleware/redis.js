const redis = require('../config/redis');

module.exports = {
  cache: (req, res, next) => {
    const { id } = req.params;

    redis.get(id, (err, data) => {
      if (err) throw err;

      if (data !== null) {
        res.json(JSON.parse(data));
      } else {
        next();
      }
    });
  }
}
