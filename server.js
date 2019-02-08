const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json())
app.route('/')
  .get((req, res) => {
    res.send('Ok');
  })

const items = require('./routers/api/items')
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/mern_todo', {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('MongoDB connected')
  })
  .catch((err) => {
    console.log(err)
  })


app.use('/api/items', items);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('Port openend at', port);
})