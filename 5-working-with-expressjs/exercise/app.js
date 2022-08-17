const express = require('express');

const PORT = 3000;
const app = express();

app.use('/users', (req, res, next) => {
  console.log('I am /users middleware');
  res.send('<h1>hellow there from /users!</h1>')
});

app.use('/', (req, res, next) => {
  console.log('I am / middleware');
  res.send('<h1>hellow there from /!</h1>')
});

app.listen(PORT);
