const path = require('path');
const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

router.get('/add-product', (req, res, next) => {
  res
    .status(200)
    .sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

router.post('/add-product', (req, res, next) => {
  const {
    body: {
      product
    }
  } = req;
  console.log(product);
  res.redirect('/admin/add-product');
});

module.exports = router;
