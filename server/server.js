const express = require('express');
const app = express();
const port = 8080;
const Data = require('../database/schema.js');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/reefistry');

const db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('open', () => {
  console.log('mongoose connected successfully');
});

app.use(cors());
app.use(express.json());

// app.get('/data', (req, res) => {
//   Data.find({}, (err, data) => {
//     if (err) {console.log(err)}
//     res.send(data);
//   })
// })

app.get('/data', async function (req, res) {
  const mostRecent2 = await Data.find().sort({$natural: -1}).limit(2);
  res.send(mostRecent2);
})

app.get(`/data/:param`, async function (req, res) {
  //console.log(req.params.param);
  const mostRecent5 = await Data.find().sort({$natural: -1}).limit(5);
  res.send(mostRecent5);
})

app.post('/data', async function (req, res) {
  console.log('POST REQ');
  // console.log(req.body);
  const newData = await new Data({...req.body});
  // console.log(newData);
  await newData.save();
  res.sendStatus(201);
})

app.listen(port, () => {
  console.log(`Web server running on: http://localhost:${port}`);
});