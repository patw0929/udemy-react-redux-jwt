const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

// DB setup
mongoose.connect('mongodb://localhost:auth/udemy_react_redux_jwt');

// App setup
app.use(morgan('combined'));  // HTTP request logger middleware
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));  // parse incoming request middleware
router(app);

// Server setup
const port = process.env.PORT || 8888;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening:', port);
