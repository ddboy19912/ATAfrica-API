const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
require('dotenv/config');

const path = require('path');

const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, '/public')));

app.use(express.json());
var database;

app.get('/', (req, res) => {
  res.send('Welcome to MongoDB Api');
});

app.get('/api/books', (req, res) => {
  database
    .collection('ATAfrica2')
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

app.listen(process.env.PORT || 8080, () => {
  MongoClient.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    (error, result) => {
      if (error) throw error;
      database = result.db('Test');
      console.log('Connection Successful');
    }
  );
});
