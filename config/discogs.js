const Discogs = require('disconnect').Client;

const db = new Discogs(process.env.DISCOGS_NAME, {
  consumerKey: process.env.DISCOGS_KEY,
  consumerSecret: process.env.DISCOGS_SECRET,
}).database();

module.exports = db;
