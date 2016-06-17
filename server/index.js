const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');

// App setup
app.use(morgan('combined'));  // HTTP request logger middleware
app.use(bodyParser.json({ type: '*/*' }));  // parse incoming request middleware
router(app);

// Server setup
const port = process.env.PORT || 8080;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening:', port);
