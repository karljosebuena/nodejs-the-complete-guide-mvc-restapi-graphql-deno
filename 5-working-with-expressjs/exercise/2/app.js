const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const rootDir = require('./util/path');
const AdminRouter = require('./routes/admin');
const ShopRouter = require('./routes/shop');

const PORT = 3000;
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', AdminRouter);
app.use('/shop', ShopRouter);

app.use('/', (req, res, next) => {
  console.log('page is not found?');
  res
    .status(404)
    .sendFile(path.join(rootDir, 'views', '404.html'))
});

app.listen(PORT);
