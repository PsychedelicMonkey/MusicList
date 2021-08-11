const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const morgan = require('morgan');

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/albums', require('./router/api/albums'));
app.use('/api/artists', require('./router/api/artists'));

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
