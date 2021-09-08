const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

dotenv.config();
const app = express();

// Load Passport config
require('./config/passport')(passport);

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(passport.initialize());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected....'))
  .catch(err => console.log(err));

// Routes
app.use('/api/albums', require('./router/api/albums'));
app.use('/api/artists', require('./router/api/artists'));
app.use('/api/auth', require('./router/api/auth'));
app.use('/api/user', require('./router/api/user'));

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
