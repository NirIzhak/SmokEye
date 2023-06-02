require('dotenv').config();
const express = require('express');
const path = require('node:path');
const cors = require('cors');
const port =process.env.PORT || 3000;

//creating server
const app = express();
server.use(express.json());
app.use(cors());

//creating routes
//1.users
server.use('/api/users', require('./routes/users.route'));
app.get('/', (req, res) => {})
server.use('/api/users/:email/:password', require('./routes/users.route'));
app.get('/', (req, res) => {})
server.use('/api/users/:user', require('./routes/users.route'));
app.get('/', (req, res) => {})
//2.reports
server.use('/api/reports', require('./routes/reports.route'));
app.get('/', (req, res) => {})
server.use('/api/reports/:report', require('./routes/reports.route'));
app.get('/', (req, res) => {})
server.use('/api/reports/:city', require('./routes/reports.route'));
app.get('/', (req, res) => {})
//3.info
server.use('/api/info', require('./routes/info.route'));
app.get('/', (req, res) => {})
server.use('/api/info/:id', require('./routes/info.route'));
app.get('/', (req, res) => {})

//turn server
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})